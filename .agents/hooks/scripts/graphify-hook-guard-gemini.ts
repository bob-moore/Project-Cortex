#!/usr/bin/env node
/**
 * Gemini BeforeTool hook — optional graphify guard wrapper.
 *
 * Keeps generated Gemini hook config free of user-local absolute graphify paths.
 * If graphify is unavailable in the runtime, the hook exits 0 silently.
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

const result = spawnSync(graphify, ["hook-guard", "gemini"], {
	input: readStdin(),
	encoding: "utf8",
	stdio: ["pipe", "inherit", "inherit"],
});

if ((result.error as NodeJS.ErrnoException | undefined)?.code === "ENOENT") {
	process.exit(0);
}
if (result.error) process.exit(1);
process.exit(result.status ?? 0);
