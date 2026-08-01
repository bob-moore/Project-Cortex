#!/usr/bin/env node
/**
 * Read-only cross-surface runtime hygiene check.
 *
 * This intentionally reports warnings for optional local tools and failures for
 * broken repository contracts. It never rebuilds QMD/graphify or writes config.
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import {
  readQmdIndex,
  resolveQmdEntry,
} from '../hooks/scripts/qmd-mcp.mjs';

const root = process.cwd();
const failures = [];
const warnings = [];

function pass(message) {
  console.log(`PASS ${message}`);
}

function warn(message) {
  warnings.push(message);
  console.log(`WARN ${message}`);
}

function fail(message) {
  failures.push(message);
  console.log(`FAIL ${message}`);
}

function run(command, args, options = {}) {
  return spawnSync(command, args, {
    cwd: root,
    encoding: 'utf8',
    timeout: options.timeout ?? 30000,
    env: options.env ?? process.env,
  });
}

function runVerifier(label, script) {
  const result = run(process.execPath, [script]);
  if (result.error?.code === 'ENOENT') {
    fail(`${label}: node is unavailable`);
    return;
  }
  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || '').trim().split('\n').slice(-3).join(' | ');
    fail(`${label}: ${detail || `exit ${result.status}`}`);
    return;
  }
  pass(label);
}

function readManifest() {
  const file = path.join(root, 'vault-manifest.json');
  try {
    const raw = fs.readFileSync(file, 'utf8');
    const parsed = JSON.parse(raw);
    const index = readQmdIndex(raw);
    if (!index) {
      fail('vault-manifest.json has no valid qmd_index');
      return null;
    }
    if (typeof parsed.qmd_context !== 'string' || parsed.qmd_context.trim() === '') {
      fail('vault-manifest.json has no qmd_context');
    } else {
      pass(`manifest qmd_index=${index}`);
    }
    return index;
  } catch (error) {
    fail(`vault-manifest.json: ${error.message}`);
    return null;
  }
}

function checkQmdStorage(index) {
  if (!index) return null;
  const expected = path.join(root, 'tmp', 'qmd', `${index}.sqlite`);
  const parent = path.dirname(expected);
  if (path.dirname(expected) !== path.join(root, 'tmp', 'qmd')) {
    fail(`QMD path escaped vault-local tmp/qmd: ${expected}`);
    return null;
  }
  if (!fs.existsSync(parent)) {
    warn(`QMD parent is absent; rebuild path is recoverable: ${path.relative(root, parent)}/`);
  } else {
    try {
      fs.accessSync(parent, fs.constants.W_OK);
      pass(`QMD parent writable ${path.relative(root, parent)}/`);
    } catch {
      fail(`QMD parent is not writable: ${path.relative(root, parent)}/`);
    }
  }

  const ignoreChecks = [
    ['tmp/qmd/runtime-hygiene.sqlite', 'QMD database path'],
    ['tmp/hook-logs/runtime-hygiene.log', 'hook diagnostic path'],
  ];
  for (const [candidate, label] of ignoreChecks) {
    const result = run('git', ['check-ignore', '--no-index', '-q', candidate]);
    if (result.status === 0) pass(`${label} is git-ignored`);
    else fail(`${label} is not git-ignored: ${candidate}`);
  }

  if (!fs.existsSync(expected)) {
    warn(`QMD database is absent; status probe skipped: ${path.relative(root, expected)}`);
    return expected;
  }

  const entry = resolveQmdEntry();
  if (!entry) {
    warn('qmd executable is unavailable; QMD status probe skipped');
    return expected;
  }
  const result = run(process.execPath, [entry, '--index', index, 'status'], {
    env: { ...process.env, INDEX_PATH: expected },
  });
  if (result.status === 0) pass(`QMD status opens ${path.relative(root, expected)}`);
  else {
    const detail = (result.stderr || result.stdout || '').trim().split('\n').slice(-2).join(' | ');
    fail(`QMD status could not open ${path.relative(root, expected)}: ${detail || `exit ${result.status}`}`);
  }
  return expected;
}

function checkGraphifyScope() {
  const ignoreFile = path.join(root, '.graphifyignore');
  if (!fs.existsSync(ignoreFile)) {
    fail('.graphifyignore is missing');
    return;
  }
  const ignoreText = fs.readFileSync(ignoreFile, 'utf8');
  for (const required of ['.obsidian/', 'graphify-out/', 'node_modules/', 'tmp/', '.git/']) {
    if (!ignoreText.split(/\r?\n/).some((line) => line.trim() === required)) {
      fail(`.graphifyignore is missing ${required}`);
    }
  }
  pass('graphify ignore scope includes generated/runtime/vendor paths');

  if (!fs.existsSync(path.join(root, 'graphify-out', 'graph.json'))) {
    warn('graphify graph is absent; focused graph query skipped');
    return;
  }
  const result = run('graphify', ['query', 'harness runtime hygiene', '--budget', '120']);
  if (result.error?.code === 'ENOENT') {
    warn('graphify executable is unavailable; focused graph query skipped');
    return;
  }
  if (result.status !== 0) {
    warn(`graphify focused query unavailable: ${(result.stderr || '').trim() || `exit ${result.status}`}`);
    return;
  }
  const output = result.stdout || '';
  const forbidden = ['.obsidian/plugins/', 'node_modules/', 'graphify-out/'];
  const found = forbidden.filter((needle) => output.includes(needle));
  if (found.length) fail(`graphify query returned ignored paths: ${found.join(', ')}`);
  else if (!/src=harness\//.test(output)) warn('graphify query returned no harness source node');
  else pass('graphify focused query is scoped to harness/code concepts');
}

function main() {
  if (!process.argv.includes('--check')) {
    console.error('Usage: node .agents/scripts/runtime-hygiene.mjs --check');
    process.exit(2);
  }

  const index = readManifest();
  checkQmdStorage(index);
  runVerifier('adapter protocol verification', '.agents/scripts/verify-hooks.mjs');
  runVerifier('startup context verification', '.agents/scripts/verify-startup-context.mjs');
  checkGraphifyScope();

  console.log(`SUMMARY runtime hygiene failures=${failures.length} warnings=${warnings.length}`);
  if (failures.length) process.exit(1);
}

main();
