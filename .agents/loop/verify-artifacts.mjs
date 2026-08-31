#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const schemaPath = path.join(root, '.agents', 'schemas', 'artifact-identity.schema.json');
const ledgerPath = path.join(root, 'harness', 'ledgers', 'artifacts.tsv');
const failures = [];

if (!fs.existsSync(schemaPath)) failures.push('missing artifact identity schema');
if (!fs.existsSync(ledgerPath)) failures.push('missing artifact ledger');

const rows = [];
if (fs.existsSync(ledgerPath)) {
  const lines = fs.readFileSync(ledgerPath, 'utf8').trim().split(/\r?\n/);
  const header = lines.shift()?.split('\t') ?? [];
  for (const line of lines) {
    const values = line.split('\t');
    if (values.length !== header.length) failures.push(`artifact row has ${values.length} fields, expected ${header.length}: ${values[0]}`);
    const row = Object.fromEntries(header.map((key, index) => [key, values[index] ?? '']));
    rows.push(row);
  }
}

const ids = new Set();
for (const row of rows) {
  if (!row.artifact_id) failures.push('artifact row missing artifact_id');
  if (ids.has(row.artifact_id)) failures.push(`duplicate artifact_id: ${row.artifact_id}`);
  ids.add(row.artifact_id);
  if (!['candidate', 'final', 'superseded', 'invalidated'].includes(row.state)) failures.push(`invalid state: ${row.artifact_id}`);
  if (!['sha256', 'git-commit', 'build-id', 'url-state', 'composite'].includes(row.identity_method)) failures.push(`invalid identity method: ${row.artifact_id}`);
  if (!row.identity_value) failures.push(`missing identity value: ${row.artifact_id}`);
  if (!/^\d{4}-\d{2}-\d{2}T/.test(row.created_at)) failures.push(`invalid created_at: ${row.artifact_id}`);
  if (row.supersedes && row.supersedes !== 'none' && !ids.has(row.supersedes) && !rows.some((candidate) => candidate.artifact_id === row.supersedes)) failures.push(`unknown supersedes target: ${row.artifact_id}`);
}

const workflow = JSON.parse(fs.readFileSync(path.join(root, '.agents', 'workflows', 'deliver-web-change', 'contract.json'), 'utf8'));
const parent = workflow.execution?.stages?.find((stage) => stage.id === 'parent-gate');
if (!parent?.verification?.some((item) => /artifact hash|artifact identity/i.test(item))) failures.push('parent-gate lacks artifact identity verification obligation');
if (!workflow.inputs?.some((item) => /artifact identity/i.test(item))) failures.push('workflow inputs lack artifact identity requirement');
if (!workflow.done_when?.some((item) => /final artifact state/i.test(item))) failures.push('workflow done_when lacks final artifact state binding');

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`PASS verify-artifacts rows=${rows.length}`);
