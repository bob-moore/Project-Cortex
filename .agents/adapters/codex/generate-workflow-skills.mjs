#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const workflowsRoot = path.join(root, '.agents', 'workflows');
const skillsRoot = path.join(root, '.agents', 'skills');

function loadContract(name) {
  return JSON.parse(fs.readFileSync(path.join(workflowsRoot, name, 'contract.json'), 'utf8'));
}

function skillFor(workflowName, contract) {
  const skillName = `workflow-${workflowName}`;
  const workflowPath = `.agents/workflows/${workflowName}/workflow.md`;
  const contractPath = `.agents/workflows/${workflowName}/contract.json`;
  const description = `${contract.summary} Use when the user asks to run ${workflowName}, /${workflowName}, or this vault workflow.`;

  return [
    '---',
    `name: ${skillName}`,
    `description: ${JSON.stringify(description)}`,
    '---',
    '',
    `# ${skillName}`,
    '',
    `Execute the canonical workflow \`${workflowName}\`.`,
    '',
    `1. Read \`${contractPath}\` for risk tier, approval classes, writes, done conditions, verification, and return contract.`,
    `2. Read \`${workflowPath}\` for the human-readable workflow procedure.`,
    "3. Treat the user's prompt as workflow input.",
    '4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.',
    '5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.',
    '',
    'If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.',
    ''
  ].join('\n');
}

const workflowNames = fs.readdirSync(workflowsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .filter((entry) => fs.existsSync(path.join(workflowsRoot, entry.name, 'contract.json')))
  .map((entry) => entry.name)
  .sort();

for (const workflowName of workflowNames) {
  const contract = loadContract(workflowName);
  const skillName = `workflow-${workflowName}`;
  const dir = path.join(skillsRoot, skillName);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'SKILL.md'), skillFor(workflowName, contract));
}

console.log(`Generated ${workflowNames.length} Codex workflow skills.`);
