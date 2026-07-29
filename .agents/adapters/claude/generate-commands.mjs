#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const workflowsRoot = path.join(root, '.agents', 'workflows');
const commandsRoot = path.join(root, '.claude', 'commands');

function loadContract(name) {
  return JSON.parse(fs.readFileSync(path.join(workflowsRoot, name, 'contract.json'), 'utf8'));
}

function wrapperFor(name, contract) {
  const workflowPath = `.agents/workflows/${name}/workflow.md`;
  const contractPath = `.agents/workflows/${name}/contract.json`;
  const description = JSON.stringify(contract.summary);
  return `---\ndescription: ${description}\n---\n\n# ${name}\n\nThis is a Claude Code command adapter.\n\nRead and execute the canonical workflow spec at \`${workflowPath}\` and its contract at \`${contractPath}\`.\n\nPass the user's command arguments through as workflow input:\n\n\`\`\`text\n$ARGUMENTS\n\`\`\`\n\nFollow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.\n`;
}

const workflowNames = fs.readdirSync(workflowsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .filter((entry) => fs.existsSync(path.join(workflowsRoot, entry.name, 'contract.json')))
  .map((entry) => entry.name)
  .sort();

fs.mkdirSync(commandsRoot, { recursive: true });

for (const name of workflowNames) {
  const contract = loadContract(name);
  fs.writeFileSync(path.join(commandsRoot, `${name}.md`), wrapperFor(name, contract));
}

console.log(`Generated ${workflowNames.length} Claude command adapters.`);
