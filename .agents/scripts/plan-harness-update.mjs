#!/usr/bin/env node
import { planUpdate } from './lib/harness-release.mjs';

const args = process.argv.slice(2);
function value(flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : null;
}
const targetRoot = value('--target');
const fromVersion = value('--from');
const toVersion = value('--to');
if (!targetRoot || !fromVersion || !toVersion) {
  console.error('Usage: node .agents/scripts/plan-harness-update.mjs --target <vault> --from vX.Y.Z --to vX.Y.Z');
  process.exit(1);
}
try {
  console.log(JSON.stringify(planUpdate({ coreRoot: process.cwd(), targetRoot, fromVersion, toVersion }), null, 2));
} catch (error) {
  console.error(`FAIL update plan: ${error.message}`);
  process.exit(1);
}
