#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const eventsPath = path.join(root, '.agents', 'hooks', 'events.json');
const failures = [];

const runtimes = {
  claude: {
    projectEnv: 'CLAUDE_PROJECT_DIR',
    config: path.join(root, '.claude', 'settings.json'),
    timeoutUnit: 'seconds'
  },
  codex: {
    projectEnv: 'CODEX_PROJECT_DIR',
    config: path.join(root, '.codex', 'hooks.json'),
    timeoutUnit: 'seconds'
  },
  gemini: {
    projectEnv: 'GEMINI_PROJECT_DIR',
    config: path.join(root, '.gemini', 'settings.json'),
    timeoutUnit: 'milliseconds'
  }
};

function fail(file, message) {
  failures.push(`${path.relative(root, file)}: ${message}`);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    fail(file, `invalid JSON: ${error.message}`);
    return null;
  }
}

function timeoutFor(runtime, seconds) {
  return runtimes[runtime].timeoutUnit === 'milliseconds' ? seconds * 1000 : seconds;
}

function expectedCommand(runtime, scriptRoot, script) {
  const envName = runtimes[runtime].projectEnv;
  return `node --disable-warning=ExperimentalWarning --experimental-strip-types "\${${envName}:-.}/${scriptRoot}/${script}"`;
}

const events = readJson(eventsPath);
if (events) {
  if (events.version !== 1) fail(eventsPath, 'version must be 1');
  if (events.script_root !== '.agents/hooks/scripts') fail(eventsPath, 'script_root must be .agents/hooks/scripts');
  if (!Array.isArray(events.hooks)) fail(eventsPath, 'hooks must be an array');

  for (const hook of events.hooks || []) {
    const hookFile = path.join(root, events.script_root, hook.script || '');
    if (!hook.id) fail(eventsPath, 'hook missing id');
    if (!hook.script) fail(eventsPath, `hook ${hook.id || '(unknown)'} missing script`);
    if (hook.script && !fs.existsSync(hookFile)) fail(hookFile, `missing script for hook ${hook.id}`);
    if (!Number.isInteger(hook.timeout_seconds) || hook.timeout_seconds < 1) fail(eventsPath, `hook ${hook.id || hook.script} has invalid timeout_seconds`);
    if (!hook.runtimes || typeof hook.runtimes !== 'object') fail(eventsPath, `hook ${hook.id || hook.script} missing runtimes`);
  }

  for (const [runtime, runtimeDef] of Object.entries(runtimes)) {
    const config = readJson(runtimeDef.config);
    if (!config) continue;
    if (!config.hooks || typeof config.hooks !== 'object') fail(runtimeDef.config, 'missing hooks object');
    const configText = fs.readFileSync(runtimeDef.config, 'utf8');
    if (configText.includes('.claude/scripts/')) fail(runtimeDef.config, 'must not point at .claude/scripts');
    if (configText.includes('.claude/skills/')) fail(runtimeDef.config, 'must not point at .claude/skills');
    if (configText.includes('/Users/')) fail(runtimeDef.config, 'must not point directly at user-local absolute paths');
    if (/graphify\s+hook-(check|guard)/.test(configText)) fail(runtimeDef.config, 'graphify hooks must route through canonical wrapper scripts');

    const expectedCommands = new Set();

    for (const hook of events.hooks || []) {
      const runtimeSpec = hook.runtimes?.[runtime];
      if (!runtimeSpec) continue;
      const eventEntries = config.hooks?.[runtimeSpec.event];
      if (!Array.isArray(eventEntries)) {
        fail(runtimeDef.config, `missing event ${runtimeSpec.event} for hook ${hook.id}`);
        continue;
      }

      const entry = eventEntries.find((item) => (item.matcher ?? null) === (runtimeSpec.matcher ?? null));
      if (!entry) {
        fail(runtimeDef.config, `missing matcher ${runtimeSpec.matcher || '(none)'} for hook ${hook.id}`);
        continue;
      }

      const command = expectedCommand(runtime, events.script_root, hook.script);
      expectedCommands.add(command);
      const found = Array.isArray(entry.hooks) && entry.hooks.some((item) =>
        item.type === 'command' &&
        item.command === command &&
        item.timeout === timeoutFor(runtime, hook.timeout_seconds)
      );
      if (!found) fail(runtimeDef.config, `missing generated command for hook ${hook.id}`);
    }

    for (const [eventName, entries] of Object.entries(config.hooks || {})) {
      if (!Array.isArray(entries)) continue;
      for (const entry of entries) {
        for (const hook of entry.hooks || []) {
          if (hook.type === 'command' && !expectedCommands.has(hook.command)) {
            fail(runtimeDef.config, `unexpected non-generated hook command for ${eventName}: ${hook.command}`);
          }
        }
      }
    }
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('PASS verify-hooks');
