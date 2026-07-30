#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import {
  qmdEnvForVaultIndex,
  resolveVaultLocalQmdSqlitePath,
} from '../hooks/scripts/qmd-mcp.mjs';

const root = process.cwd();
const failures = [];

function fail(message) {
  failures.push(message);
}

function assertEqual(actual, expected, label) {
  if (actual !== expected) fail(`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

function assert(condition, label) {
  if (!condition) fail(label);
}

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'project-cortex-qmd-'));
try {
  const expectedPath = path.join(tempRoot, 'tmp', 'qmd', 'agency-vault-harness.sqlite');
  assertEqual(
    resolveVaultLocalQmdSqlitePath(tempRoot, 'agency-vault-harness'),
    expectedPath,
    'qmd-mcp vault-local sqlite path',
  );

  const inherited = { PATH: process.env.PATH ?? '' };
  const derived = qmdEnvForVaultIndex(inherited, 'agency-vault-harness', tempRoot);
  assertEqual(derived.INDEX_PATH, expectedPath, 'qmd-mcp derived INDEX_PATH');
  assert(fs.existsSync(path.dirname(expectedPath)), 'qmd-mcp creates tmp/qmd parent');
  assertEqual(inherited.INDEX_PATH, undefined, 'qmd-mcp does not mutate input env');

  const overrideEnv = { INDEX_PATH: '/custom/index.sqlite' };
  const preserved = qmdEnvForVaultIndex(overrideEnv, 'agency-vault-harness', tempRoot);
  assertEqual(preserved.INDEX_PATH, '/custom/index.sqlite', 'qmd-mcp preserves existing INDEX_PATH');

  const nullIndex = qmdEnvForVaultIndex(inherited, null, tempRoot);
  assertEqual(nullIndex.INDEX_PATH, undefined, 'qmd-mcp leaves env unchanged without qmd_index');

  const tsProbe = spawnSync(
    process.execPath,
    [
      '--disable-warning=ExperimentalWarning',
      '--experimental-strip-types',
      '--input-type=module',
      '-e',
      `import fs from 'node:fs';\nimport path from 'node:path';\nimport { qmdEnvForVaultIndex, resolveVaultLocalQmdSqlitePath } from ${JSON.stringify(pathToFileUrl(path.join(root, '.agents/hooks/scripts/lib/qmd.ts')))};\nconst root = ${JSON.stringify(tempRoot)};\nconst expected = path.join(root, 'tmp', 'qmd', 'agency-vault-harness.sqlite');\nif (resolveVaultLocalQmdSqlitePath(root, 'agency-vault-harness') !== expected) throw new Error('bad ts helper path');\nconst env = qmdEnvForVaultIndex({}, 'agency-vault-harness', root);\nif (env.INDEX_PATH !== expected) throw new Error('bad ts helper env');\nif (!fs.existsSync(path.dirname(expected))) throw new Error('ts helper did not create parent');\nconst preserved = qmdEnvForVaultIndex({ INDEX_PATH: '/custom/index.sqlite' }, 'agency-vault-harness', root);\nif (preserved.INDEX_PATH !== '/custom/index.sqlite') throw new Error('ts helper clobbered override');`,
    ],
    { cwd: root, encoding: 'utf8' },
  );
  if (tsProbe.status !== 0) {
    fail(`lib/qmd.ts probe failed: ${(tsProbe.stderr || tsProbe.stdout || '').trim()}`);
  }
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('PASS verify-qmd-runtime');

function pathToFileUrl(filePath) {
  return new URL(`file://${path.resolve(filePath)}`).href;
}
