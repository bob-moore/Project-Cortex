#!/usr/bin/env node
/**
 * Codex PreToolUse hook — optional graphify guard wrapper.
 *
 * The previous Codex config called graphify directly from an absolute user-local
 * path. In Codex sandboxes that path can be unavailable, causing code 127 before
 * tool execution. This wrapper keeps graphify optional: if the CLI is not
 * available, the hook exits 0 silently; if it is available, stdin is forwarded
 * to `graphify hook-check` and graphify's exit code is preserved.
 *
 * No path is hardcoded here — set GRAPHIFY_BIN to skip the PATH probe, or just
 * make sure `graphify` resolves via PATH.
 */

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const GRAPHIFY_BIN_ENV = "GRAPHIFY_BIN";

function readStdin(): string {
	try {
		return readFileSync(0, "utf8");
	} catch {
		return "";
	}
}

function resolveGraphify(): string | null {
	const override = process.env[GRAPHIFY_BIN_ENV];
	if (override && existsSync(override)) return override;
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
