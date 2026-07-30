#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const checks = [
  ['workflow contracts', ['node', '.agents/scripts/verify-workflows.mjs']],
  ['role contracts', ['node', '.agents/scripts/verify-roles.mjs']],
  ['discipline contracts', ['node', '.agents/scripts/verify-disciplines.mjs']],
  ['runtime adapters', ['node', '.agents/scripts/verify-adapters.mjs']],
  ['runtime hooks', ['node', '.agents/scripts/verify-hooks.mjs']],
  ['qmd runtime hygiene', ['node', '.agents/scripts/verify-qmd-runtime.mjs']],
  ['vault structure', ['node', '.agents/scripts/verify-vault.mjs']]
];

const failures = [];

for (const [label, command] of checks) {
  const result = spawnSync(command[0], command.slice(1), {
    cwd: root,
    encoding: 'utf8'
  });

  if (result.stdout.trim()) process.stdout.write(`${result.stdout.trim()}\n`);
  if (result.stderr.trim()) process.stderr.write(`${result.stderr.trim()}\n`);
  if (result.status !== 0) failures.push(label);
}

if (failures.length) {
  console.error(`FAIL gate: ${failures.join(', ')}`);
  process.exit(1);
}

console.log('PASS gate');
