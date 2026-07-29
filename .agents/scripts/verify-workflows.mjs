#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const workflowsRoot = path.join(root, '.agents', 'workflows');

const requiredSections = [
  '## Purpose',
  '## Invocation',
  '## Required Context',
  '## Workflow',
  '## Writes',
  '## Approval Gates',
  '## Verification',
  '## Return Format',
  '## Related Roles'
];

const requiredContractKeys = [
  'name',
  'version',
  'summary',
  'aliases',
  'risk_tier',
  'approval_classes',
  'inputs',
  'writes',
  'external_reads',
  'external_mutations',
  'approval_gates',
  'done_when',
  'verification',
  'return_contract',
  'related_roles'
];

const riskTiers = new Set(['low', 'medium', 'high', 'critical']);
const approvalClasses = new Set([
  'read_only',
  'vault_write',
  'adapter_write',
  'external_read',
  'external_mutation',
  'destructive',
  'production',
  'secret'
]);

const failures = [];

function fail(file, message) {
  failures.push(`${path.relative(root, file)}: ${message}`);
}

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

for (const entry of fs.readdirSync(workflowsRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const name = entry.name;
  const dir = path.join(workflowsRoot, name);
  const workflowFile = path.join(dir, 'workflow.md');
  const contractFile = path.join(dir, 'contract.json');

  if (!fs.existsSync(workflowFile)) {
    fail(workflowFile, 'missing workflow.md');
    continue;
  }

  if (!fs.existsSync(contractFile)) {
    fail(contractFile, 'missing contract.json');
    continue;
  }

  const workflow = fs.readFileSync(workflowFile, 'utf8');
  for (const section of requiredSections) {
    if (!workflow.includes(section)) fail(workflowFile, `missing section ${section}`);
  }

  let contract;
  try {
    contract = JSON.parse(fs.readFileSync(contractFile, 'utf8'));
  } catch (error) {
    fail(contractFile, `invalid JSON: ${error.message}`);
    continue;
  }

  for (const key of requiredContractKeys) {
    if (!(key in contract)) fail(contractFile, `missing key ${key}`);
  }

  if (contract.name !== name) fail(contractFile, `name must equal directory ${name}`);
  if (!Number.isInteger(contract.version) || contract.version < 1) fail(contractFile, 'version must be a positive integer');
  if (typeof contract.summary !== 'string' || !contract.summary.trim()) fail(contractFile, 'summary must be a non-empty string');
  if (!riskTiers.has(contract.risk_tier)) fail(contractFile, `invalid risk_tier ${contract.risk_tier}`);

  for (const key of ['aliases', 'approval_classes', 'inputs', 'writes', 'external_reads', 'external_mutations', 'approval_gates', 'done_when', 'verification', 'return_contract', 'related_roles']) {
    if (!isStringArray(contract[key])) fail(contractFile, `${key} must be an array of strings`);
  }

  if (Array.isArray(contract.approval_classes)) {
    for (const approvalClass of contract.approval_classes) {
      if (!approvalClasses.has(approvalClass)) fail(contractFile, `invalid approval class ${approvalClass}`);
    }
  }

  if (Array.isArray(contract.external_reads) && contract.external_reads.length > 0 && !contract.approval_classes.includes('external_read')) {
    fail(contractFile, 'external_reads require approval class external_read');
  }

  if (Array.isArray(contract.external_mutations) && contract.external_mutations.length > 0) {
    const hasMutationClass = contract.approval_classes.includes('external_mutation') || contract.approval_classes.includes('production');
    if (!hasMutationClass) fail(contractFile, 'external_mutations require approval class external_mutation or production');
  }

  if (contract.approval_classes.includes('secret') && contract.risk_tier !== 'critical') {
    fail(contractFile, 'secret approval class requires critical risk_tier');
  }

  for (const key of ['approval_classes', 'approval_gates', 'done_when', 'verification', 'return_contract']) {
    if (Array.isArray(contract[key]) && contract[key].length === 0) fail(contractFile, `${key} must not be empty`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('PASS verify-workflows');
