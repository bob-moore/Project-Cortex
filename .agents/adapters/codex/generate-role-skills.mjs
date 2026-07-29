#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const rolesRoot = path.join(root, '.agents', 'roles');
const skillsRoot = path.join(root, '.agents', 'skills');

function loadContract(name) {
  return JSON.parse(fs.readFileSync(path.join(rolesRoot, name, 'contract.json'), 'utf8'));
}

function roleNames() {
  return fs.readdirSync(rolesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => fs.existsSync(path.join(rolesRoot, entry.name, 'contract.json')))
    .map((entry) => entry.name)
    .sort();
}

function skillFor(roleName, contract) {
  const skillName = `role-${roleName}`;
  const contractPath = `.agents/roles/${roleName}/contract.json`;
  const rolePath = `.agents/roles/${roleName}/role.md`;
  const description = `Use when the current task needs the ${roleName} role capability contract. ${contract.summary}`;

  return [
    '---',
    `name: ${skillName}`,
    `description: ${JSON.stringify(description)}`,
    '---',
    '',
    `# ${skillName}`,
    '',
    `Operate within the canonical \`${roleName}\` role contract.`,
    '',
    `1. Read \`${contractPath}\` for ownership, approval classes, required context, verification obligations, and return contract.`,
    `2. Read \`${rolePath}\` for the human-readable role description.`,
    '3. Treat the current user request or parent workflow as the work order.',
    '4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.',
    '5. Return evidence in the role contract shape. Do not claim closure unless the parent workflow or deterministic gate closes the work.',
    '',
    'If this skill conflicts with the canonical role contract, the canonical role contract wins.',
    ''
  ].join('\n');
}

const names = roleNames();
for (const roleName of names) {
  const skillName = `role-${roleName}`;
  const dir = path.join(skillsRoot, skillName);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'SKILL.md'), skillFor(roleName, loadContract(roleName)));
}

console.log(`Generated ${names.length} Codex role skills.`);
