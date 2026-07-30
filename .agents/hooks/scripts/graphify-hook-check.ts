#!/usr/bin/env node
/**
 * Codex PreToolUse hook — optional graphify guard wrapper.
 *
 * The previous Codex config called graphify directly from an absolute user-local
 * path. In Codex sandboxes that path can be unavailable, causing code 127 before
 * tool execution. This wrapper keeps graphify optional: if the CLI is not
 * available, the hook exits 0 silently; if it is available, stdin is forwarded
 * to `graphify hook-check` and graphify's exit code is preserved.
 */

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const FALLBACK_GRAPHIFY = "/Users/bobmoore/.local/bin/graphify";

function readStdin(): string {
	try {
		return readFileSync(0, "utf8");
	} catch {
		return "";
	}
}

function resolveGraphify(): string | null {
	if (existsSync(FALLBACK_GRAPHIFY)) return FALLBACK_GRAPHIFY;
	const probe = spawnSync("command -v graphify", {
		shell: true,
		encoding: "utf8",
		stdio: ["ignore", "pipe", "ignore"],
	});
	const found = (probe.stdout ?? "").trim();
	return probe.status === 0 && found ? found : null;
}

const graphify = resolveGraphify();
if (graphify === null) process.exit(0);

const result = spawnSync(graphify, ["hook-check"], {
	input: readStdin(),
	encoding: "utf8",
	stdio: ["pipe", "inherit", "inherit"],
});

if ((result.error as NodeJS.ErrnoException | undefined)?.code === "ENOENT") {
	process.exit(0);
}
if (result.error) process.exit(1);
process.exit(result.status ?? 0);
