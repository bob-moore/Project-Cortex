/**
 * Type declarations for qmd-mcp.mjs so TypeScript tests can import it.
 * The runtime file is plain ESM JS (.mjs) to avoid a build step; this file
 * mirrors its public exports for `tsc --noEmit`.
 */

/**
 * Locate @tobilu/qmd's real JS entrypoint. Returns an absolute path when
 * resolvable, null when not.
 */
export function resolveQmdEntry(): string | null;

/**
 * Resolve the vault root directory from a `file://` URL and optional env.
 * The env argument is read for `CLAUDE_PROJECT_DIR` (Claude Code's
 * project-dir signal); when absent, the root is computed from the URL.
 */
export function resolveVaultRoot(
	metaUrl: string,
	env?: NodeJS.ProcessEnv,
): string;

/**
 * Extract the `qmd_index` string from a vault-manifest.json source.
 * Returns the named index or null when absent, malformed, or empty.
 */
export function readQmdIndex(manifestJson: string | null): string | null;

/**
 * Derive the vault-local SQLite store path for a named QMD index.
 */
export function resolveVaultLocalQmdSqlitePath(
	vaultRoot: string,
	indexName: string,
): string;

/**
 * Build a QMD process environment, preserving an existing INDEX_PATH override.
 */
export function qmdEnvForVaultIndex(
	env: NodeJS.ProcessEnv,
	indexName: string | null,
	vaultRoot: string,
): NodeJS.ProcessEnv;

/**
 * Build the (command, args, shell) tuple the spawn layer should invoke.
 * When `qmdIndex` is a non-empty string, `--index <name>` is prepended to
 * the mcp subcommand.
 */
export function buildLaunchCommand(
	entry: string | null,
	extraArgs?: readonly string[],
	qmdIndex?: string | null,
): {
	readonly cmd: string;
	readonly args: readonly string[];
	readonly shell: boolean;
};
