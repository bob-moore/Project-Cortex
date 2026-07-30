#!/usr/bin/env node
/**
 * qmd-mcp.mjs — cross-platform MCP launcher for QMD.
 *
 * Does three things no bare `qmd mcp` invocation can do:
 *
 *   1. Bypass the Windows .cmd/.ps1 shim. Claude Code spawns MCP servers
 *      without a shell, and even `shell: true` isn't enough: the shim
 *      delegates to /bin/sh via %_prog%, which fails on stock Windows without
 *      Git Bash's sh.exe on PATH. We resolve @tobilu/qmd/dist/cli/qmd.js and
 *      spawn it with the current Node binary — no shell, no shim, same code
 *      path on every platform.
 *
 *   2. Scope the MCP server to this vault's named index. If vault-manifest.json
 *      declares a `qmd_index`, pass `--index <name>` so the MCP reads the same
 *      SQLite store as the SessionStart hook and the CLI.
 *
 *   3. Work around a qmd 2.1.0 bug. `qmd --index <name> mcp` currently ignores
 *      the --index flag (mcp/server.js calls getDefaultDbPath() without the
 *      configured name). Setting INDEX_PATH forces the correct SQLite path
 *      regardless — store.js honors INDEX_PATH unconditionally. We keep
 *      --index on argv too so a future qmd fix works without a wrapper change.
 *
 * Fallback: if @tobilu/qmd isn't resolvable, fall through to a bare `qmd`
 * command with shell: true so non-npm installations still have a chance to
 * work. When an index is configured, the INDEX_PATH env var still applies.
 */

import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, realpathSync } from "node:fs";
import { delimiter, dirname, isAbsolute, join, resolve } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);

/**
 * Resolve the wrapper's vault root from a `file://` URL and optional env
 * override. Kept as a pure helper (both inputs passed in) so tests can lock
 * the path math without depending on the current process's working directory
 * or runtime project-dir env vars. Layout assumption: the wrapper lives at
 * `<vault>/.agents/hooks/scripts/qmd-mcp.mjs`, so the vault root is three
 * levels up.
 */
export function resolveVaultRoot(metaUrl, env = process.env) {
	const envRoot =
		env["CLAUDE_PROJECT_DIR"] ??
		env["CODEX_PROJECT_DIR"] ??
		env["GEMINI_PROJECT_DIR"];
	if (envRoot && isAbsolute(envRoot)) return envRoot;
	return resolve(dirname(fileURLToPath(metaUrl)), "..", "..", "..");
}

// Resolved once at module load. Manifest lookups use this instead of the
// current working directory, so a drifted MCP-host CWD can't silently break
// per-vault isolation.
const VAULT_ROOT = resolveVaultRoot(import.meta.url);

/**
 * Walk upward from a resolved binary's real path looking for the
 * `@tobilu/qmd` package root (a directory whose `package.json` declares
 * that name). Bounded to a handful of levels — real npm installs never
 * nest a bin file more than 2-3 directories under the package root, so
 * this can't walk into unrelated ancestor directories.
 */
function findPackageRoot(fromDir, maxLevels = 5) {
	let dir = fromDir;
	for (let i = 0; i < maxLevels; i++) {
		const pkgJsonPath = join(dir, "package.json");
		if (existsSync(pkgJsonPath)) {
			try {
				const pkg = JSON.parse(readFileSync(pkgJsonPath, "utf8"));
				if (pkg.name === "@tobilu/qmd") return dir;
			} catch {
				/* malformed package.json — keep walking up */
			}
		}
		const parent = dirname(dir);
		if (parent === dir) break; // reached filesystem root
		dir = parent;
	}
	return null;
}

/**
 * Locate @tobilu/qmd's real JS entrypoint by walking PATH for the `qmd`
 * executable, then walking up from its real (symlink-resolved) location to
 * find the package root, independent of prefix layout assumptions.
 *
 * This exists because `npm root -g` (the other fallback below) can report
 * a *different* prefix than the one that actually put `qmd` on PATH — a
 * real, observed mismatch under nvm, where the active version's own
 * `bin/` is what's on PATH, but a plain `npm root -g` subshell can resolve
 * against a separately-configured prefix (e.g. an `npm_config_prefix` or
 * `~/.npmrc` override) that has nothing installed. Version managers
 * (nvm, volta, asdf) are common enough that this isn't an edge case.
 */
function resolveQmdEntryViaPath() {
	const pathEnv = process.env.PATH ?? "";
	const dirs = pathEnv.split(delimiter).filter(Boolean);
	const exeNames =
		process.platform === "win32"
			? ["qmd.cmd", "qmd.ps1", "qmd.exe", "qmd"]
			: ["qmd"];

	for (const dir of dirs) {
		for (const name of exeNames) {
			const candidate = join(dir, name);
			if (!existsSync(candidate)) continue;

			let real;
			try {
				real = realpathSync(candidate);
			} catch {
				real = candidate;
			}

			const packageRoot = findPackageRoot(dirname(real));
			if (packageRoot === null) continue;

			const entry = join(packageRoot, "dist", "cli", "qmd.js");
			if (existsSync(entry)) return entry;
		}
	}
	return null;
}

/**
 * Locate @tobilu/qmd's real JS entrypoint. Returns an absolute path when
 * resolvable, null when not. Exported so the cross-platform test matrix can
 * verify resolution works on Windows, macOS, and Linux without having to
 * spawn the wrapper itself.
 */
export function resolveQmdEntry() {
	try {
		return require.resolve("@tobilu/qmd/dist/cli/qmd.js");
	} catch {}

	// Fallback for global npm installs that aren't on this package's resolution
	// path — ask npm directly where global packages live. Bounded timeout so a
	// hung npm process can't block MCP server startup indefinitely.
	//
	// Single-string command with shell:true rather than args+shell so this
	// stays clean on Node 24 (DEP0190 — args concatenated with shell:true is
	// an injection risk in the general case; our command is a literal
	// constant so the concatenated form is safe).
	const npmRoot = spawnSync("npm root -g", {
		shell: true,
		encoding: "utf8",
		timeout: 3000,
	});
	if (!npmRoot.error && npmRoot.signal === null && npmRoot.status === 0) {
		// Guard against success-with-empty-stdout or a relative path — either
		// would make join() produce a path anchored at cwd, and existsSync
		// could then match a local folder by accident.
		const root = npmRoot.stdout.trim();
		if (root !== "" && isAbsolute(root)) {
			const entry = join(root, "@tobilu", "qmd", "dist", "cli", "qmd.js");
			if (existsSync(entry)) return entry;
		}
	}

	// Last resort: derive the entry from wherever PATH actually resolves
	// `qmd` to, independent of what npm's own prefix config claims.
	return resolveQmdEntryViaPath();
}

/**
 * Restricted character set for `qmd_index`. Duplicated from
 * `lib/session-start.ts:QMD_INDEX_PATTERN` (this file is .mjs and can't
 * import from the .ts lib at strip-types runtime). The shape is asserted
 * by the tests — alnum + dot + dash + underscore, must start with alnum.
 * Rejects path separators, parent-dir refs, whitespace, empty strings.
 */
const QMD_INDEX_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

/**
 * Extract the `qmd_index` string from a vault-manifest.json source. Returns
 * the configured named index (so QMD's storage is scoped to this vault) or
 * null when the manifest is absent, malformed, missing the field, or the
 * value fails validation.
 *
 * Kept as a pure helper so tests can pass fixture strings. A null return
 * means "use QMD's default global index" — backwards-compatible with forks
 * that haven't adopted the field yet.
 */
export function readQmdIndex(manifestJson) {
	if (manifestJson === null) return null;
	try {
		const parsed = JSON.parse(manifestJson);
		if (
			parsed !== null &&
			typeof parsed === "object" &&
			typeof parsed.qmd_index === "string" &&
			QMD_INDEX_PATTERN.test(parsed.qmd_index)
		) {
			return parsed.qmd_index;
		}
	} catch {
		/* malformed manifest → treat as missing */
	}
	return null;
}

/**
 * Derive this vault's writable QMD SQLite store path from the vault root and
 * validated qmd_index. Keeping the database under ignored `tmp/qmd/` avoids
 * Codex/other runtime sandbox failures against global user cache locations and
 * keeps same-named indexes isolated per vault.
 */
export function resolveVaultLocalQmdSqlitePath(vaultRoot, indexName) {
	return join(vaultRoot, "tmp", "qmd", `${indexName}.sqlite`);
}

/**
 * Build the environment for a QMD process. If the caller or user already set
 * INDEX_PATH, preserve it exactly. Otherwise, when a named index is available,
 * create `tmp/qmd/` and point QMD at the vault-local SQLite file.
 */
export function qmdEnvForVaultIndex(env, indexName, vaultRoot) {
	if (env["INDEX_PATH"] || indexName === null) return env;
	const indexPath = resolveVaultLocalQmdSqlitePath(vaultRoot, indexName);
	try {
		mkdirSync(dirname(indexPath), { recursive: true });
	} catch {
		/* qmd will report the real storage failure; do not fall back to ~/.cache */
	}
	return { ...env, INDEX_PATH: indexPath };
}

/**
 * Build the (command, args, shell) tuple the spawn layer should invoke.
 * When `qmdIndex` is a non-empty string, `--index <name>` is prepended to
 * the mcp subcommand; otherwise the invocation matches the pre-per-vault
 * shape for backward compatibility.
 *
 * The shell-fallback path folds args into a single command string so the
 * spawn site uses shell:true WITHOUT args, dodging Node 24's DEP0190
 * deprecation of the args+shell concatenation pattern.
 */
export function buildLaunchCommand(entry, extraArgs = [], qmdIndex = null) {
	const mcpArgs = qmdIndex ? ["--index", qmdIndex, "mcp"] : ["mcp"];
	const qmdArgs = [...mcpArgs, ...extraArgs];
	return entry
		? { cmd: process.execPath, args: [entry, ...qmdArgs], shell: false }
		: { cmd: ["qmd", ...qmdArgs].join(" "), args: [], shell: true };
}

function readManifestRaw() {
	try {
		return readFileSync(join(VAULT_ROOT, "vault-manifest.json"), {
			encoding: "utf-8",
		});
	} catch {
		return null;
	}
}

function runAsMcp() {
	const qmdIndex = readQmdIndex(readManifestRaw());

	if (qmdIndex && !process.env["INDEX_PATH"]) {
		// Apply the qmd 2.1.0 MCP bug workaround: pin the SQLite store to the
		// named index. Don't clobber a user-supplied INDEX_PATH.
		process.env["INDEX_PATH"] = qmdEnvForVaultIndex(
			process.env,
			qmdIndex,
			VAULT_ROOT,
		)["INDEX_PATH"];
	}

	const entry = resolveQmdEntry();
	const { cmd, args, shell } = buildLaunchCommand(
		entry,
		process.argv.slice(2),
		qmdIndex,
	);

	const child = spawn(cmd, args, { stdio: "inherit", shell });

	// spawn() emits 'error' when the command can't be invoked at all (e.g., qmd
	// not on PATH in the fallback branch). Without a handler Node would crash
	// with a stack trace — write a concise message and exit cleanly instead.
	child.on("error", (err) => {
		process.stderr.write(
			`qmd-mcp: failed to start qmd: ${err.message}\n`,
		);
		process.exit(1);
	});

	child.on("exit", (code, signal) => {
		if (signal !== null) {
			// Re-raise the signal against ourselves so the parent sees the same
			// termination cause. Some POSIX signals (SIGKILL, SIGSTOP) or names
			// unknown on this platform will cause process.kill to throw — in
			// that case fall back to a conventional non-zero exit.
			try {
				process.kill(process.pid, signal);
			} catch {
				process.exit(1);
			}
			return;
		}
		process.exit(code ?? 0);
	});
}

// Only spawn a child when this file is the actual entry point. Importing it
// from tests (to exercise the pure helpers in isolation) must not trigger a
// spawn.
const entryUrl = process.argv[1]
	? pathToFileURL(process.argv[1]).href
	: null;
if (entryUrl === import.meta.url) {
	runAsMcp();
}
