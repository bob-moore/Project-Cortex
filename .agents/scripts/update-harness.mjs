#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { applyPlan, planUpdate } from './lib/harness-release.mjs';

const args = process.argv.slice(2);
function value(flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : null;
}
const targetRoot = value('--target');
const fromVersion = value('--from');
const toVersion = value('--to');
const dryRun = args.includes('--dry-run');
const confirmDestructive = args.includes('--confirm-destructive');
if (!targetRoot || !fromVersion || !toVersion) {
  console.error('Usage: node .agents/scripts/update-harness.mjs --target <vault> --from vX.Y.Z --to vX.Y.Z [--dry-run] [--confirm-destructive]');
  process.exit(1);
}
try {
  const plan = planUpdate({ coreRoot: process.cwd(), targetRoot, fromVersion, toVersion });
  if (dryRun) {
    console.log(JSON.stringify(plan, null, 2));
    process.exit(0);
  }
  const result = applyPlan(plan, {
    confirmDestructive,
    runCommand(command, cwd) {
      return spawnSync(command, { cwd, shell: true, stdio: 'inherit' });
    }
  });
  console.log(`PASS update ${fromVersion} -> ${toVersion}; receipt=${result.receiptPath}; status=${result.receipt.status}`);
} catch (error) {
  console.error(`FAIL harness update: ${error.message}`);
  process.exit(1);
}
