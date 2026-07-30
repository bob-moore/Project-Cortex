/**
 * Cross-platform QMD invocation helpers.
 *
 * Bare `spawnSync("qmd", ...)` fails on Windows because npm installs qmd as a
 * .cmd/.ps1 shim that Node's spawn can't resolve without routing through the
 * platform shell — and even with `shell: true` the .cmd shim itself depends
 * on /bin/sh via %_prog%, which fails on stock Windows without Git Bash.
 *
 * Rather than scatter platform-conditional `shell: process.platform === "win32"`
 * flags across every qmd call, these helpers resolve @tobilu/qmd's real JS
 * entry and let callers spawn it with the current Node binary. No shell, no
 * shim, same code path on Windows, macOS, and Linux.
 *
 * Shared with `.agents/hooks/scripts/qmd-mcp.mjs` by duplicated implementation —
 * that file is .mjs (MCP servers run as their own entry), so it can't import
 * this .ts helper at Node's `--experimental-strip-types` runtime. The two
 * copies are asserted independently: `tests/qmd.test.ts` locks this file's
 * `resolveQmdEntry` + `buildQmdCommand` shape, and `tests/qmd-mcp.test.ts`
 * locks the .mjs wrapper's equivalents. Drift between the two shows up as
 * a test failure on the CI matrix rather than a silent platform bug.
 */

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, realpathSync } from "node:fs";
import { createRequire } from "node:module";
import { delimiter, dirname, isAbsolute, join } from "node:path";

const require = createRequire(import.meta.url);

/**
 * Walk upward from a resolved binary's real path looking for the
 * `@tobilu/qmd` package root (a directory whose `package.json` declares
 * that name). Bounded to a handful of levels — real npm installs never
 * nest a bin file more than 2-3 directories under the package root, so
 * this can't walk into unrelated ancestor directories.
 */
function findPackageRoot(fromDir: string, maxLevels = 5): string | null {
	let dir = fromDir;
	for (let i = 0; i < maxLevels; i++) {
		const pkgJsonPath = join(dir, "package.json");
		if (existsSync(pkgJsonPath)) {
			try {
				const pkg = JSON.parse(readFileSync(pkgJsonPath, "utf8")) as {
					name?: unknown;
				};
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
function resolveQmdEntryViaPath(): string | null {
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

			let real: string;
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
 * resolvable, null when not. A null return signals the caller to fall back
 * to invoking `qmd` directly via the platform shell (last-resort path for
 * non-npm installs).
 */
export function resolveQmdEntry(): string | null {
	try {
		return require.resolve("@tobilu/qmd/dist/cli/qmd.js");
	} catch {}

	// Fallback for global npm installs that aren't on this package's resolution
	// path — ask npm directly where global packages live. Bounded timeout so a
	// hung npm process can't block a fire-and-forget hook indefinitely.
	//
	// Single-string command with `shell: true` rather than args+shell so this
	// stays clean on Node 24, which emits DEP0190 when args are passed with
	// shell:true (the args get concatenated into the shell command unescaped,
	// a real injection risk in the general case). Our command is a literal
	// constant — no user input — so the concatenated form is safe.
	const npmRoot = spawnSync("npm root -g", {
		shell: true,
		encoding: "utf8",
		timeout: 3000,
	});
	if (!npmRoot.error && npmRoot.signal === null && npmRoot.status === 0) {
		const root = (npmRoot.stdout ?? "").trim();
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
 * Build the (command, args, shell) tuple for a qmd invocation. When an
 * entrypoint resolves, `process.execPath` runs it directly with no shell
 * (identical on every platform). When it doesn't, fall back to `qmd` via
 * the platform shell — best-effort for non-npm installs.
 *
 * The shell-fallback path returns the whole invocation in `cmd` with an
 * empty `args` so callers spawn it as a single shell command, not as
 * `args` concatenated with `shell:true` — which Node 24 deprecates
 * (DEP0190) because args+shell concatenation is an injection risk in
 * the general case. Our subcommand args are typically literal constants,
 * but we route through the safe form everywhere so a future caller can't
 * accidentally introduce a shell-injection vector.
 */
export function buildQmdCommand(
	entry: string | null,
	subcommandArgs: readonly string[],
): {
	readonly cmd: string;
	readonly args: readonly string[];
	readonly shell: boolean;
} {
	return entry !== null
		? {
				cmd: process.execPath,
				args: [entry, ...subcommandArgs],
				shell: false,
			}
		: {
				cmd: ["qmd", ...subcommandArgs].join(" "),
				args: [],
				shell: true,
			};
}

/**
 * Derive this vault's writable QMD SQLite store path from the vault root and
 * validated qmd_index. Keeping the database under ignored `tmp/qmd/` avoids
 * Codex/other runtime sandbox failures against global user cache locations and
 * keeps same-named indexes isolated per vault.
 */
export function resolveVaultLocalQmdSqlitePath(
	vaultRoot: string,
	indexName: string,
): string {
	return join(vaultRoot, "tmp", "qmd", `${indexName}.sqlite`);
}

/**
 * Build the environment for a QMD process. If the caller or user already set
 * INDEX_PATH, preserve it exactly. Otherwise, when a named index is available,
 * create `tmp/qmd/` and point QMD at the vault-local SQLite file.
 */
export function qmdEnvForVaultIndex(
	env: NodeJS.ProcessEnv,
	indexName: string | null,
	vaultRoot: string,
): NodeJS.ProcessEnv {
	if (env["INDEX_PATH"] || indexName === null) return env;
	const indexPath = resolveVaultLocalQmdSqlitePath(vaultRoot, indexName);
	try {
		mkdirSync(dirname(indexPath), { recursive: true });
	} catch {
		/* qmd will report the real storage failure; do not fall back to ~/.cache */
	}
	return { ...env, INDEX_PATH: indexPath };
}
