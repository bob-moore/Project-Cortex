#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const ledgerPath = path.join(root, 'harness', 'ledgers', 'usage.tsv');
const header = 'timestamp\tstage\truntime\tworkflow\testimated_usd\tnote\n';

function ensureLedger() {
  fs.mkdirSync(path.dirname(ledgerPath), { recursive: true });
  if (!fs.existsSync(ledgerPath)) fs.writeFileSync(ledgerPath, header);
}

function arg(name, fallback = '') {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? fallback : process.argv[index + 1] || fallback;
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

ensureLedger();

if (process.argv.includes('--log')) {
  const row = [
    new Date().toISOString(),
    arg('stage'),
    arg('runtime'),
    arg('workflow'),
    arg('usd', '0'),
    arg('note').replace(/\s+/g, ' ').trim()
  ];
  fs.appendFileSync(ledgerPath, `${row.join('\t')}\n`);
  console.log(`logged cost ${row[4]}`);
  process.exit(0);
}

const budget = Number(arg('budget', '5'));
const today = todayIsoDate();
const rows = fs.readFileSync(ledgerPath, 'utf8').trimEnd().split(/\n/).slice(1).filter(Boolean);
let spent = 0;

for (const line of rows) {
  const [timestamp, , , , usd] = line.split(/\t/);
  if (timestamp.startsWith(today)) spent += Number(usd || 0);
}

if (process.argv.includes('--report')) {
  console.log(`today_usd\t${spent.toFixed(2)}`);
  console.log(`budget_usd\t${budget.toFixed(2)}`);
  process.exit(0);
}

if (spent >= budget) {
  console.error(`budget breached: spent $${spent.toFixed(2)} of $${budget.toFixed(2)}`);
  process.exit(1);
}

console.log(`PASS budget: spent $${spent.toFixed(2)} of $${budget.toFixed(2)}`);

