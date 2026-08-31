#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];
const requiredFiles = [
  '.agents/loop/dispatcher-contract.json',
  'harness/policies/contract.md',
  'harness/policies/approvals.md',
  'harness/policies/budget.md',
  'harness/runbooks/alarms.md',
  'harness/ledgers/goal-ledger.tsv',
  'harness/ledgers/usage.tsv'
];

for (const relative of requiredFiles) {
  if (!fs.existsSync(path.join(root, relative))) failures.push(`missing ${relative}`);
}

const contractPath = path.join(root, '.agents/loop/dispatcher-contract.json');
if (fs.existsSync(contractPath)) {
  let contract;
  try {
    contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
  } catch (error) {
    failures.push(`invalid dispatcher contract: ${error.message}`);
    contract = null;
  }
  if (contract) {
    if (contract.status !== 'scaffold-only') failures.push('dispatcher must remain scaffold-only');
    if (contract.schedule?.recurring_enabled !== false) failures.push('recurring scheduling must remain disabled');
    if (contract.schedule?.max_runs_per_day !== 0) failures.push('max_runs_per_day must remain 0 until activation');
    if (contract.approval?.default_action !== 'stop') failures.push('default action must be stop');
    if (contract.failure?.retry_limit !== 2) failures.push('retry_limit must be 2');
  }
}

const trustPath = path.join(root, 'harness/ledgers/trust.tsv');
if (!fs.existsSync(trustPath)) failures.push('missing harness/ledgers/trust.tsv');
else if (fs.readFileSync(trustPath, 'utf8').trim().split(/\r?\n/).length < 2) failures.push('trust ledger has no history');

const dispatchPath = path.join(root, 'harness/ledgers/dispatch.tsv');
if (!fs.existsSync(dispatchPath)) failures.push('missing harness/ledgers/dispatch.tsv');

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('PASS verify-dispatcher scaffold-only');
