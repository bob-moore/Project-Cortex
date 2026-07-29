#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const ledgerPath = path.join(root, 'harness', 'ledgers', 'dispatch.tsv');
const header = 'timestamp\tworkflow\truntime\trole\tapproval_class\taction\tresult\tevidence\n';

function arg(name, fallback = '') {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? fallback : process.argv[index + 1] || fallback;
}

fs.mkdirSync(path.dirname(ledgerPath), { recursive: true });
if (!fs.existsSync(ledgerPath)) fs.writeFileSync(ledgerPath, header);

const row = [
  new Date().toISOString(),
  arg('workflow'),
  arg('runtime'),
  arg('role'),
  arg('approval-class'),
  arg('action'),
  arg('result'),
  arg('evidence').replace(/\s+/g, ' ').trim()
];

if (!row[1] || !row[2] || !row[5] || !row[6]) {
  console.error('usage: log-dispatch.mjs --workflow <name> --runtime <runtime> --action <action> --result <result> [--role <role>] [--approval-class <class>] [--evidence <text>]');
  process.exit(2);
}

fs.appendFileSync(ledgerPath, `${row.join('\t')}\n`);
console.log(`logged dispatch ${row[1]} ${row[6]}`);

