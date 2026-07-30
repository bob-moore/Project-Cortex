#!/usr/bin/env node
/**
 * Codex Stop hook — silent variant of stop-checklist.
 *
 * Codex treats Stop hook stdout as protocol-sensitive, so this hook must not
 * print the human-readable checklist used by Claude/Gemini. It still triggers
 * the same debounced QMD refresh so retrieval is current for the next session.
 */

import { dirname, join, resolve as resolvePath } from "node:path";
import { fileURLToPath } from "node:url";
import { readStdinJson } from "./lib/hook-io.ts";
import { triggerDebouncedRefresh } from "./lib/qmd-refresh.ts";

const DEBOUNCE_MS = 30_000;
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const SENTINEL_PATH =
	process.env["QMD_REFRESH_SENTINEL"] ??
	join(SCRIPT_DIR, ".qmd-refresh-sentinel");
const WORKER_PATH = resolvePath(SCRIPT_DIR, "qmd-refresh-run.ts");

type HookInput = {
	readonly stop_hook_active?: unknown;
};

const input = await readStdinJson<HookInput>();
if (input?.stop_hook_active === true) process.exit(0);

triggerDebouncedRefresh({
	sentinelPath: SENTINEL_PATH,
	workerPath: WORKER_PATH,
	debounceMs: DEBOUNCE_MS,
	logPrefix: "codex-stop",
});

process.exit(0);
