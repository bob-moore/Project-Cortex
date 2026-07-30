#!/usr/bin/env node
/**
 * SessionStart hook — inject vault context into the agent's first turn.
 *
 * Emits a markdown block on stdout with: date header, operator/user context,
 * north-star excerpt, harness topic index, recent git changes
 * (last 48h), open tasks aggregated from Projects/active/ project folders and the vault
 * root, active work listing, and a full vault markdown file listing.
 *
 * Also persists VAULT_PATH to CLAUDE_ENV_FILE when Claude Code provides it.
 */

import {
	readFileSync,
	appendFileSync,
	readdirSync,
	type Dirent,
} from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
	take,
	formatDateHeader,
	formatActiveWork,
	formatRecentChanges,
	isSkippedPath,
	extractFrontmatterField,
	formatBrainIndex,
	stripFrontmatter,
	hasBrainContent,
	parseQmdIndex,
	qmdArgsWithIndex,
	parseInfraRootFilenames,
	isInfraFilename,
	isMarkdownFilename,
	collectOpenTasks,
} from "./lib/session-start.ts";
import {
	buildQmdCommand,
	qmdEnvForVaultIndex,
	resolveQmdEntry,
} from "./lib/qmd.ts";

function readManifestRaw(): string | null {
	try {
		return readFileSync("vault-manifest.json", { encoding: "utf-8" });
	} catch {
		return null;
	}
}

const cwd =
	process.env["CLAUDE_PROJECT_DIR"] ??
	process.env["CODEX_PROJECT_DIR"] ??
	process.env["GEMINI_PROJECT_DIR"] ??
	process.cwd();
process.chdir(cwd);

// Persist vault path for any downstream shell consumers (Claude Code feature)
const envFile = process.env["CLAUDE_ENV_FILE"];
if (envFile) {
	try {
		appendFileSync(envFile, `export VAULT_PATH="${cwd}"\n`);
	} catch {
		/* best-effort — session continues even if persistence fails */
	}
}

// Manifest is read once and reused: QMD's named index, the infrastructure
// allowlist for openTasks(), and any future manifest-driven sections all
// derive from the same source. Both helpers tolerate a null source so a
// missing/malformed manifest degrades quietly.
const manifestJson = readManifestRaw();
const infraRootFilenames = parseInfraRootFilenames(manifestJson);

// Incremental QMD re-index. Truly fire-and-forget: detached, unref'd,
// ignore-all-streams. The hook's own work (file walks, git log, context
// emission) is independent of this index update, so blocking on qmd's
// startup (notably slow on Windows × Node 24 cold start, where it can
// approach 10s before the actual update work begins) is wasted user
// latency. Scope to this vault's named index when the manifest declares
// one; fall back silently for forks that haven't adopted `qmd_index`.
// Route through `buildQmdCommand` so the shim-bypass logic that fixes
// the MCP wrapper applies here too.
const qmdIndex = parseQmdIndex(manifestJson);
const qmdUpdate = buildQmdCommand(
	resolveQmdEntry(),
	qmdArgsWithIndex(qmdIndex, ["update"]),
);
// `cwd: tmpdir()` keeps the detached child from holding the vault dir as
// its working directory. `qmd update --index <name>` reads collection
// paths from YAML, so cwd is irrelevant to the work; pinning it to the OS
// tmpdir means `rm -rf` of the vault (or a test cleanup) never races a
// stale qmd handle on Windows.
const qmdChild = spawn(qmdUpdate.cmd, qmdUpdate.args as string[], {
	stdio: "ignore",
	shell: qmdUpdate.shell,
	detached: true,
	windowsHide: true,
	cwd: tmpdir(),
	env: qmdEnvForVaultIndex(process.env, qmdIndex, cwd),
});
// Silence the spawn-error event so a missing qmd doesn't crash the hook;
// qmd is optional and the hook already degrades when it's not installed.
qmdChild.on("error", () => undefined);
qmdChild.unref();

type CmdResult =
	| { readonly kind: "ok"; readonly stdout: string }
	| { readonly kind: "missing" }
	| { readonly kind: "failed" };

function runCmd(
	cmd: string,
	args: readonly string[],
	timeoutMs = 5_000,
): CmdResult {
	const r = spawnSync(cmd, args as string[], {
		encoding: "utf-8",
		timeout: timeoutMs,
	});
	if (
		r.error &&
		(r.error as NodeJS.ErrnoException).code === "ENOENT"
	) {
		return { kind: "missing" };
	}
	if (r.status !== 0) return { kind: "failed" };
	return { kind: "ok", stdout: r.stdout ?? "" };
}


function northStar(): string {
	try {
		return take(readFileSync("harness/north-star.md", { encoding: "utf-8" }), 30);
	} catch {
		return "(not found)";
	}
}

function operatorContext(): string {
	try {
		return take(
			readFileSync("harness/operator.md", { encoding: "utf-8" }),
			30,
		);
	} catch {
		return "(not found)";
	}
}

function userContext(): string {
	try {
		return take(readFileSync("harness/user.md", { encoding: "utf-8" }), 30);
	} catch {
		return "(not found)";
	}
}

function recentChanges(): string {
	const r = runCmd("git", [
		"log",
		"--oneline",
		"--since=48 hours ago",
		"--no-merges",
	]);
	if (r.kind !== "ok") return "(no git history)";
	return formatRecentChanges(r.stdout, 15);
}

function readMarkdownSource(
	path: string,
): { path: string; content: string } | null {
	try {
		return { path, content: readFileSync(path, { encoding: "utf-8" }) };
	} catch {
		return null;
	}
}

function listMarkdownSources(
	dir: string,
	pathFor: (name: string) => string,
	skip: (name: string) => boolean = () => false,
): { path: string; content: string }[] {
	let entries: Dirent[];
	try {
		entries = readdirSync(dir, { withFileTypes: true });
	} catch {
		return [];
	}
	const sources: { path: string; content: string }[] = [];
	for (const e of entries) {
		if (!e.isFile() || !isMarkdownFilename(e.name) || skip(e.name)) continue;
		const src = readMarkdownSource(pathFor(e.name));
		if (src !== null) sources.push(src);
	}
	return sources;
}

function listMarkdownSourcesRecursive(
	dir: string,
	pathFor: (name: string) => string,
): { path: string; content: string }[] {
	let entries: Dirent[];
	try {
		entries = readdirSync(dir, { withFileTypes: true });
	} catch {
		return [];
	}
	const sources: { path: string; content: string }[] = [];
	for (const e of entries) {
		const rel = e.name;
		const full = `${dir}/${rel}`;
		if (e.isDirectory()) {
			sources.push(
				...listMarkdownSourcesRecursive(full, (name) => pathFor(`${rel}/${name}`)),
			);
			continue;
		}
		if (!e.isFile() || !isMarkdownFilename(e.name)) continue;
		const src = readMarkdownSource(pathFor(rel));
		if (src !== null) sources.push(src);
	}
	return sources;
}

function listClientMarkdownSources(): { path: string; content: string }[] {
	// Clients/<Client>/<Client>.md holds Open Items directly for retainer-only
	// clients that don't have a separate bounded Projects/active/ note. One
	// level deep per client subfolder; this also picks up Brand/Voice/Stack
	// files, which is harmless (no `- [ ]` lines to match) rather than worth
	// filtering out by filename.
	let clientDirs: Dirent[];
	try {
		clientDirs = readdirSync("Clients", { withFileTypes: true });
	} catch {
		return [];
	}
	const sources: { path: string; content: string }[] = [];
	for (const d of clientDirs) {
		if (!d.isDirectory()) continue;
		sources.push(
			...listMarkdownSources(
				`Clients/${d.name}`,
				(name) => `Clients/${d.name}/${name}`,
			),
		);
	}
	return sources;
}

function openTasks(): string {
	// Filesystem scan, not `obsidian tasks daily todo` (#83 — that CLI flashes
	// the Electron app on macOS). Order matters: bounded project tasks in
	// Projects/active/ project folders surface first, then client tasks (retainer clients
	// with no bounded project keep their Open Items on Clients/<Client>/
	// directly), then vault-root notes (which is where daily notes live by
	// Obsidian's default — empirically the dominant task store in user vaults).
	// Infra files (AGENTS.md, README.*.md, …) are excluded so the section is
	// user content only. Paths use forward slashes so the output reads the same
	// in runtime context on any OS.
	const sources = [
		...listMarkdownSourcesRecursive(
			"Projects/active",
			(name) => `Projects/active/${name}`,
		),
		...listClientMarkdownSources(),
		...listMarkdownSources(
			".",
			(name) => name,
			(name) => isInfraFilename(name, infraRootFilenames),
		),
	];
	return collectOpenTasks(sources, 10);
}

function harnessIndex(): string {
	let entries: Dirent[];
	try {
		entries = readdirSync("harness", { withFileTypes: true });
	} catch {
		return "(none)";
	}
	const files = entries
		.filter((e) => e.isFile() && isMarkdownFilename(e.name))
		.map((e) => e.name)
		.sort();
	const parsed = files.map((f) => {
		const name = f.replace(/\.md$/i, "");
		let description: string | null = null;
		let hasContent = false;
		try {
			const content = readFileSync(join("harness", f), { encoding: "utf-8" });
			description = extractFrontmatterField(content, "description");
			hasContent = hasBrainContent(stripFrontmatter(content));
		} catch {
			/* unreadable file → show name with no description, treat as empty */
		}
		return { name, description, hasContent };
	});
	return formatBrainIndex(parsed);
}

function activeWork(): string {
	let entries: Dirent[];
	try {
		entries = readdirSync("Projects/active", { withFileTypes: true });
	} catch {
		return "(none)";
	}
	const names = entries
		.flatMap((e) => {
			if (e.isFile() && isMarkdownFilename(e.name)) return [e.name];
			if (!e.isDirectory()) return [];
			const projectRoot = `Projects/active/${e.name}/${e.name}.md`;
			try {
				readFileSync(projectRoot, { encoding: "utf-8" });
				return [`${e.name}.md`];
			} catch {
				return [`${e.name}.md`];
			}
		})
		.sort();
	return formatActiveWork(names, 10);
}

const SKIP_PREFIXES: readonly string[] = [
	".git",
	".obsidian",
	"assets",
	".claude",
	".codex",
	".gemini",
	".hermes",
	".agents/hooks/scripts/tests",
];

function listMd(): string[] {
	const results: string[] = [];
	function walk(dir: string): void {
		let entries: Dirent[];
		try {
			entries = readdirSync(dir, { withFileTypes: true });
		} catch {
			return;
		}
		for (const e of entries) {
			const full = dir === "." ? e.name : join(dir, e.name);
			if (isSkippedPath(full, SKIP_PREFIXES)) continue;
			if (e.isDirectory()) walk(full);
			else if (e.isFile() && isMarkdownFilename(e.name)) results.push(`./${full}`);
		}
	}
	walk(".");
	return results.sort();
}

const sections = [
	"## Session Context",
	"",
	"### Date",
	formatDateHeader(new Date()),
	"",
	"### Operator Context",
	operatorContext(),
	"",
	"### User Context",
	userContext(),
	"",
	"### North Star (current goals)",
	northStar(),
	"",
	"### Harness Topics (read on demand)",
	harnessIndex(),
	"",
	"### Recent Changes (last 48h)",
	recentChanges(),
	"",
	"### Open Tasks",
	openTasks(),
	"",
	"### Active Work",
	activeWork(),
	"",
	"### Vault File Listing",
	listMd().join("\n"),
];

process.stdout.write(sections.join("\n") + "\n");
