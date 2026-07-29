#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const ledgerPath = process.env.HARNESS_TRUST_LEDGER || path.join(root, 'harness', 'ledgers', 'trust.tsv');
const header = ['subject', 'type', 'runs', 'passes', 'fails', 'tier', 'last_result', 'last_checked'];

function ensureLedger() {
  fs.mkdirSync(path.dirname(ledgerPath), { recursive: true });
  if (!fs.existsSync(ledgerPath)) fs.writeFileSync(ledgerPath, `${header.join('\t')}\n`);
}

function tierFor(runs, passes) {
  const rate = runs > 0 ? passes / runs : 0;
  if (runs >= 20 && rate >= 0.95) return 'auto';
  if (runs >= 10 && rate >= 0.9) return 'queue';
  return 'watch';
}

function readRows() {
  ensureLedger();
  const lines = fs.readFileSync(ledgerPath, 'utf8').trimEnd().split(/\n/).filter(Boolean);
  return lines.slice(1).map((line) => {
    const cells = line.split(/\t/);
    return Object.fromEntries(header.map((key, index) => [key, cells[index] || '']));
  });
}

function writeRows(rows) {
  const lines = [header.join('\t')];
  for (const row of rows) lines.push(header.map((key) => row[key] ?? '').join('\t'));
  fs.writeFileSync(ledgerPath, `${lines.join('\n')}\n`);
}

function render(rows) {
  if (!rows.length) {
    console.log('trust ledger empty');
    return;
  }
  console.log(header.join('\t'));
  for (const row of rows) console.log(header.map((key) => row[key] ?? '').join('\t'));
}

const [command, subject, result, type = 'workflow'] = process.argv.slice(2);
const rows = readRows();

if (!command || command === '--render') {
  render(rows);
  process.exit(0);
}

if (command === '--tier') {
  const row = rows.find((item) => item.subject === subject);
  console.log(row ? row.tier : 'watch');
  process.exit(0);
}

if (command === '--record') {
  if (!subject || !['pass', 'fail'].includes(result)) {
    console.error('usage: trust-ledger.mjs --record <subject> <pass|fail> [type]');
    process.exit(2);
  }

  let row = rows.find((item) => item.subject === subject);
  if (!row) {
    row = {
      subject,
      type,
      runs: '0',
      passes: '0',
      fails: '0',
      tier: 'watch',
      last_result: '',
      last_checked: ''
    };
    rows.push(row);
  }

  const runs = Number(row.runs) + 1;
  const passes = Number(row.passes) + (result === 'pass' ? 1 : 0);
  const fails = Number(row.fails) + (result === 'fail' ? 1 : 0);

  row.type = type;
  row.runs = String(runs);
  row.passes = String(passes);
  row.fails = String(fails);
  row.tier = tierFor(runs, passes);
  row.last_result = result;
  row.last_checked = new Date().toISOString();

  writeRows(rows.sort((a, b) => a.subject.localeCompare(b.subject)));
  console.log(`${subject}\t${row.tier}\t${runs}\t${passes}\t${fails}`);
  process.exit(0);
}

console.error('usage: trust-ledger.mjs [--render|--tier <subject>|--record <subject> <pass|fail> [type]]');
process.exit(2);

