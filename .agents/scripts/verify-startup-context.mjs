#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const failures = [];

function fail(message) {
  failures.push(message);
}

const result = spawnSync(
  'node',
  [
    '--disable-warning=ExperimentalWarning',
    '--experimental-strip-types',
    '.agents/hooks/scripts/session-start.ts'
  ],
  {
    cwd: root,
    encoding: 'utf8',
    timeout: 30000,
    env: {
      ...process.env,
      CODEX_PROJECT_DIR: root,
    }
  }
);

const output = result.stdout ?? '';
const stderr = result.stderr ?? '';
if (result.status !== 0) fail(`SessionStart exited ${result.status}: ${stderr.trim()}`);
if (stderr.trim()) fail(`SessionStart wrote stderr: ${stderr.trim()}`);

const chars = Buffer.byteLength(output, 'utf8');
const words = output.trim() ? output.trim().split(/\s+/).length : 0;
const lines = output ? output.split(/\r?\n/).length - 1 : 0;

if (chars > 8000) fail(`SessionStart output too large: ${chars} chars > 8000`);
if (words > 2000) fail(`SessionStart output too large: ${words} words > 2000`);
if (lines > 250) fail(`SessionStart output too large: ${lines} lines > 250`);

const forbidden = [
  '### Vault File Listing',
  'graphify-out/',
  '.obsidian/plugins/',
  'node_modules/',
  'GRAPH_REPORT.md',
  './Clients/',
  './Projects/',
];
for (const needle of forbidden) {
  if (output.includes(needle)) fail(`SessionStart output contains forbidden bulk path/section: ${needle}`);
}

const required = [
  '### Retrieval Map',
  'Use QMD for vault text recall.',
  'Use graphify for code/concept relationships.',
  'Use search_files/read_file for source-of-truth checks.',
];
for (const needle of required) {
  if (!output.includes(needle)) fail(`SessionStart output missing retrieval guidance: ${needle}`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`PASS verify-startup-context chars=${chars} words=${words} lines=${lines}`);
