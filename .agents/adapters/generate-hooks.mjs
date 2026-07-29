#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const eventsPath = path.join(root, '.agents', 'hooks', 'events.json');
const events = JSON.parse(fs.readFileSync(eventsPath, 'utf8'));

const runtimes = {
  claude: {
    projectEnv: 'CLAUDE_PROJECT_DIR',
    output: path.join(root, '.claude', 'settings.json'),
    timeoutUnit: 'seconds'
  },
  codex: {
    projectEnv: 'CODEX_PROJECT_DIR',
    output: path.join(root, '.codex', 'hooks.json'),
    timeoutUnit: 'seconds'
  },
  gemini: {
    projectEnv: 'GEMINI_PROJECT_DIR',
    output: path.join(root, '.gemini', 'settings.json'),
    timeoutUnit: 'milliseconds'
  }
};

function timeoutFor(runtime, seconds) {
  return runtimes[runtime].timeoutUnit === 'milliseconds' ? seconds * 1000 : seconds;
}

function commandFor(runtime, script) {
  const envName = runtimes[runtime].projectEnv;
  return `node --disable-warning=ExperimentalWarning --experimental-strip-types "\${${envName}:-.}/${events.script_root}/${script}"`;
}

function addHook(config, event, matcher, hook) {
  const bucket = config.hooks[event] ?? [];
  let entry = bucket.find((item) => (item.matcher ?? null) === (matcher ?? null));
  if (!entry) {
    entry = matcher ? { matcher, hooks: [] } : { hooks: [] };
    bucket.push(entry);
  }
  entry.hooks.push(hook);
  config.hooks[event] = bucket;
}

for (const runtime of Object.keys(runtimes)) {
  const config = { hooks: {} };

  for (const hook of events.hooks) {
    const runtimeSpec = hook.runtimes[runtime];
    if (!runtimeSpec) continue;
    addHook(config, runtimeSpec.event, runtimeSpec.matcher, {
      type: 'command',
      command: commandFor(runtime, hook.script),
      timeout: timeoutFor(runtime, hook.timeout_seconds)
    });
  }

  fs.mkdirSync(path.dirname(runtimes[runtime].output), { recursive: true });
  fs.writeFileSync(runtimes[runtime].output, `${JSON.stringify(config, null, 2)}\n`);
}

console.log('Generated hook configs for Claude, Codex, and Gemini.');
