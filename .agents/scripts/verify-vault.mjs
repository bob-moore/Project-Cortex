#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];

function fail(file, message) {
  failures.push(`${file}: ${message}`);
}

for (const file of ['AGENTS.md', 'CLAUDE.md', 'GEMINI.md', 'Home.md', 'Journal/README.md', 'harness/manual.md', 'harness/operational-methodology.md', '.agents/manifest.yaml', 'vault-manifest.json']) {
  if (!fs.existsSync(path.join(root, file))) fail(file, 'missing required file');
}

if (fs.existsSync(path.join(root, 'Dashboard.md'))) fail('Dashboard.md', 'Dashboard.md should not exist; Home.md is the entry surface');

function verifyProjectFolders(statusDir) {
  const dir = path.join(root, 'Projects', statusDir);
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.join('Projects', statusDir, entry.name);
    if (entry.isFile() && entry.name.endsWith('.md')) {
      fail(rel, `project notes must live under Projects/${statusDir}/<Project>/`);
    }
    if (!entry.isDirectory()) continue;
    const mainNote = path.join(dir, entry.name, `${entry.name}.md`);
    if (!fs.existsSync(mainNote)) {
      fail(path.relative(root, mainNote), 'missing same-named project entry note');
    }
  }
}

verifyProjectFolders('active');

try {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'vault-manifest.json'), 'utf8'));
if (manifest.qmd_index !== 'agency-vault-harness') fail('vault-manifest.json', 'qmd_index must be agency-vault-harness');
  if (!manifest.qmd_context || !manifest.qmd_context.includes('.agents/')) fail('vault-manifest.json', 'qmd_context should describe .agents/');
} catch (error) {
  fail('vault-manifest.json', `invalid JSON: ${error.message}`);
}

for (const file of ['harness/policies/contract.md', 'harness/policies/approvals.md', 'harness/policies/done.md']) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    fail(file, 'missing policy');
    continue;
  }
  const text = fs.readFileSync(fullPath, 'utf8');
  if (!text.startsWith('---\n')) fail(file, 'missing frontmatter');
  if (!text.includes('tags:')) fail(file, 'missing tags');
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('PASS verify-vault');
