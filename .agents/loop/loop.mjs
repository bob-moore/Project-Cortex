#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const dryRun = process.argv.includes('--dry-run');

function run(label, command) {
  const result = spawnSync(command[0], command.slice(1), {
    cwd: process.cwd(),
    encoding: 'utf8'
  });
  if (result.stdout.trim()) process.stdout.write(`${result.stdout.trim()}\n`);
  if (result.stderr.trim()) process.stderr.write(`${result.stderr.trim()}\n`);
  if (result.status !== 0) {
    console.error(`FAIL loop preflight: ${label}`);
    process.exit(result.status || 1);
  }
}

run('gate', ['node', '.agents/scripts/gate.mjs']);
run('budget', ['node', '.agents/scripts/cost-check.mjs', '--budget', '5']);

if (!dryRun) {
  console.error('loop is scaffold-only; run with --dry-run until unattended execution is approved');
  process.exit(2);
}

console.log('PASS loop dry-run');

