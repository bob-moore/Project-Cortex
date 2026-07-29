#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const rolesRoot = path.join(root, '.agents', 'roles');
const workflowsRoot = path.join(root, '.agents', 'workflows');
const failures = [];

const requiredKeys = [
  'name',
  'version',
  'summary',
  'owns',
  'does_not_own',
  'approval_classes',
  'writes',
  'external_reads',
  'external_mutations',
  'required_context',
  'verification_obligations',
  'return_contract',
  'parent_closure_required'
];

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

function fail(file, message) {
  failures.push(`${path.relative(root, file)}: ${message}`);
}

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

const roleNames = new Set();

for (const entry of fs.readdirSync(rolesRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const name = entry.name;
  const dir = path.join(rolesRoot, name);
  const roleFile = path.join(dir, 'role.md');
  const contractFile = path.join(dir, 'contract.json');

  if (!fs.existsSync(roleFile)) fail(roleFile, 'missing role.md');
  if (!fs.existsSync(contractFile)) {
    fail(contractFile, 'missing contract.json');
    continue;
  }

  let contract;
  try {
    contract = JSON.parse(fs.readFileSync(contractFile, 'utf8'));
  } catch (error) {
    fail(contractFile, `invalid JSON: ${error.message}`);
    continue;
  }

  for (const key of requiredKeys) {
    if (!(key in contract)) fail(contractFile, `missing key ${key}`);
  }

  if (contract.name !== name) fail(contractFile, `name must equal directory ${name}`);
  if (!Number.isInteger(contract.version) || contract.version < 1) fail(contractFile, 'version must be a positive integer');
  if (typeof contract.summary !== 'string' || !contract.summary.trim()) fail(contractFile, 'summary must be a non-empty string');
  if (contract.parent_closure_required !== true) fail(contractFile, 'parent_closure_required must be true');

  for (const key of ['owns', 'does_not_own', 'approval_classes', 'writes', 'external_reads', 'external_mutations', 'required_context', 'verification_obligations', 'return_contract']) {
    if (!isStringArray(contract[key])) fail(contractFile, `${key} must be an array of strings`);
  }

  for (const key of ['owns', 'approval_classes', 'verification_obligations', 'return_contract']) {
    if (Array.isArray(contract[key]) && contract[key].length === 0) fail(contractFile, `${key} must not be empty`);
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

  roleNames.add(name);
}

for (const entry of fs.readdirSync(workflowsRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const contractFile = path.join(workflowsRoot, entry.name, 'contract.json');
  if (!fs.existsSync(contractFile)) continue;
  const workflow = JSON.parse(fs.readFileSync(contractFile, 'utf8'));
  for (const role of workflow.related_roles || []) {
    if (!roleNames.has(role)) fail(contractFile, `related role has no contract: ${role}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('PASS verify-roles');

