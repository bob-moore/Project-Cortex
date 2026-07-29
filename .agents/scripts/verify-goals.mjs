#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const goalsRoot = path.join(root, 'harness', 'goals');
const ledgerPath = path.join(root, 'harness', 'ledgers', 'goal-ledger.tsv');

function ensureLedger() {
  fs.mkdirSync(path.dirname(ledgerPath), { recursive: true });
  if (!fs.existsSync(ledgerPath)) fs.writeFileSync(ledgerPath, 'timestamp\tgoal\tresult\tduration_ms\n');
}

function parseFrontmatter(text) {
  if (!text.startsWith('---\n')) return null;
  const end = text.indexOf('\n---\n', 4);
  if (end === -1) return null;
  const raw = text.slice(4, end).split(/\n/);
  const data = {};
  for (const line of raw) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (match) data[match[1]] = match[2].replace(/^"|"$/g, '');
  }
  return { data, start: 0, end: end + 5 };
}

function replaceField(text, key, value) {
  const pattern = new RegExp(`^${key}:.*$`, 'm');
  if (pattern.test(text)) return text.replace(pattern, `${key}: ${value}`);
  return text.replace(/^---\n/, `---\n${key}: ${value}\n`);
}

ensureLedger();
const results = [];

for (const file of fs.readdirSync(goalsRoot).filter((name) => name.endsWith('.md') && name !== 'README.md').sort()) {
  const fullPath = path.join(goalsRoot, file);
  let text = fs.readFileSync(fullPath, 'utf8');
  const frontmatter = parseFrontmatter(text);
  if (!frontmatter) {
    results.push({ goal: file, result: 'FAIL', message: 'missing frontmatter', duration: 0 });
    continue;
  }

  const goal = path.basename(file, '.md');
  if (frontmatter.data.status === 'retired') continue;
  const predicate = frontmatter.data.predicate;
  if (!predicate) {
    results.push({ goal, result: 'FAIL', message: 'missing predicate', duration: 0 });
    continue;
  }

  const started = Date.now();
  const result = spawnSync('bash', ['-lc', predicate], {
    cwd: root,
    encoding: 'utf8',
    timeout: 60000
  });
  const duration = Date.now() - started;
  const passed = result.status === 0;
  const status = passed ? 'satisfied' : 'violated';
  const ledgerResult = passed ? 'pass' : 'FAIL';

  text = replaceField(text, 'status', status);
  if (passed) text = replaceField(text, 'last-pass', new Date().toISOString().slice(0, 10));
  fs.writeFileSync(fullPath, text);
  fs.appendFileSync(ledgerPath, `${new Date().toISOString()}\t${goal}\t${ledgerResult}\t${duration}\n`);

  results.push({
    goal,
    result: ledgerResult,
    message: passed ? 'predicate passed' : (result.stderr || result.stdout || 'predicate failed').trim(),
    duration
  });
}

const failures = results.filter((item) => item.result !== 'pass');
for (const item of results) console.log(`${item.result}\t${item.goal}\t${item.duration}ms\t${item.message}`);

if (failures.length) process.exit(1);
console.log('PASS verify-goals');

