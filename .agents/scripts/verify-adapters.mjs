#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const commandRoot = path.join(root, '.claude', 'commands');
const claudeAgentsRoot = path.join(root, '.claude', 'agents');
const claudeSkillsRoot = path.join(root, '.claude', 'skills');
const workflowRoot = path.join(root, '.agents', 'workflows');
const rolesRoot = path.join(root, '.agents', 'roles');
const skillRoot = path.join(root, '.agents', 'skills');
const failures = [];

function fail(file, message) {
  failures.push(`${path.relative(root, file)}: ${message}`);
}

function listRoleNames() {
  return fs.readdirSync(rolesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => fs.existsSync(path.join(rolesRoot, entry.name, 'contract.json')))
    .map((entry) => entry.name)
    .sort();
}

function walkMarkdown(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkMarkdown(file));
    if (entry.isFile() && entry.name.endsWith('.md')) files.push(file);
  }
  return files.sort();
}

const workflowNames = fs.readdirSync(workflowRoot, { withFileTypes: true })
  .filter((item) => item.isDirectory() && fs.existsSync(path.join(workflowRoot, item.name, 'contract.json')))
  .map((item) => item.name)
  .sort();
const expectedClaudeCommandFiles = new Set(workflowNames.map((name) => `${name}.md`));

for (const file of fs.readdirSync(commandRoot).filter((name) => name.endsWith('.md')).sort()) {
  if (!expectedClaudeCommandFiles.has(file)) {
    fail(path.join(commandRoot, file), 'extra active Claude command adapter without canonical workflow contract');
    continue;
  }

  const name = file.replace(/\.md$/, '');
  const commandFile = path.join(commandRoot, file);
  const workflowFile = path.join(workflowRoot, name, 'workflow.md');
  const command = fs.readFileSync(commandFile, 'utf8');
  const lines = command.trimEnd().split(/\n/);

  if (!fs.existsSync(workflowFile)) fail(commandFile, `missing canonical workflow ${path.relative(root, workflowFile)}`);
  if (!command.includes('This is a Claude Code command adapter.')) fail(commandFile, 'missing thin adapter marker');
  if (!command.includes(`.agents/workflows/${name}/workflow.md`)) fail(commandFile, 'does not point to canonical workflow spec');
  if (!command.includes(`.agents/workflows/${name}/contract.json`)) fail(commandFile, 'does not point to canonical workflow contract');
  if (!command.includes('$ARGUMENTS')) fail(commandFile, 'does not pass $ARGUMENTS through');
  if (lines.length > 30) fail(commandFile, `adapter too long: ${lines.length} lines`);

  const stalePatterns = [
    /brain\//,
    /Dashboard\.md/,
    /\.claude\/agents/,
    /\.claude\/scripts/,
    /AskUserQuestion/,
    /mcp__claude_ai/
  ];
  for (const pattern of stalePatterns) {
    if (pattern.test(command)) fail(commandFile, `stale adapter content matched ${pattern}`);
  }
}

for (const workflowName of workflowNames) {
  const commandFile = path.join(commandRoot, `${workflowName}.md`);
  if (!fs.existsSync(commandFile)) {
    fail(commandFile, 'missing Claude workflow command adapter');
  }

  const skillName = `workflow-${workflowName}`;
  const skillFile = path.join(skillRoot, skillName, 'SKILL.md');
  if (!fs.existsSync(skillFile)) {
    fail(skillFile, 'missing Codex workflow skill adapter');
    continue;
  }

  const skill = fs.readFileSync(skillFile, 'utf8');
  if (!skill.startsWith('---\n')) fail(skillFile, 'missing frontmatter');
  if (!skill.includes(`name: ${skillName}`)) fail(skillFile, 'frontmatter name mismatch');
  if (!skill.includes(`.agents/workflows/${workflowName}/workflow.md`)) fail(skillFile, 'does not point to canonical workflow spec');
  if (!skill.includes(`.agents/workflows/${workflowName}/contract.json`)) fail(skillFile, 'does not point to workflow contract');
  if (!skill.includes('canonical workflow spec wins')) fail(skillFile, 'missing canonical precedence rule');
}

const roleNames = listRoleNames();
for (const file of walkMarkdown(claudeAgentsRoot)) {
  fail(file, 'active Claude agent adapters are disabled; roles must resolve through canonical .agents/roles contracts');
}

if (fs.existsSync(claudeSkillsRoot)) {
  fail(claudeSkillsRoot, 'Claude skill adapters are disabled; canonical skills must live only in .agents/skills');
}

for (const roleName of roleNames) {
  const skillName = `role-${roleName}`;
  const codexSkill = path.join(skillRoot, skillName, 'SKILL.md');
  if (!fs.existsSync(codexSkill)) {
    fail(codexSkill, 'missing Codex role skill adapter');
  } else {
    const skill = fs.readFileSync(codexSkill, 'utf8');
    if (!skill.startsWith('---\n')) fail(codexSkill, 'missing frontmatter');
    if (!skill.includes(`name: ${skillName}`)) fail(codexSkill, 'frontmatter name mismatch');
    if (!skill.includes(`.agents/roles/${roleName}/contract.json`)) fail(codexSkill, 'does not point to role contract');
    if (!skill.includes(`.agents/roles/${roleName}/role.md`)) fail(codexSkill, 'does not point to role description');
    if (!skill.includes('the canonical role contract wins')) fail(codexSkill, 'missing canonical precedence rule');
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('PASS verify-adapters');
