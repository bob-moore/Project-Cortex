import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  applyPlan,
  planUpdate,
  resolveReleaseChain,
  validateRelease
} from './harness-release.mjs';

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cortex-release-'));
  const core = path.join(root, 'core');
  const target = path.join(root, 'target');
  writeJson(path.join(core, 'core-managed-paths.yaml'), {
    schema_version: 1,
    managed_paths: [
      { path: '.agents/', ownership: 'core' },
      { path: '.claude/', ownership: 'generated' },
      { path: 'Tasks/README.md', ownership: 'template' },
      { path: 'harness/session-diary/README.md', ownership: 'core' }
    ],
    excluded_paths: ['Tasks/', 'harness/session-diary/', 'graphify-out/'],
    portable_exceptions: ['Tasks/README.md', 'harness/session-diary/README.md']
  });
  writeJson(path.join(core, 'changelogs', 'v0.1.0', 'changelog.yaml'), {
    version: 'v0.1.0', previous_version: 'v0.0.0', release_type: 'feature',
    changes: [
      { id: 'add-workflow', action: 'add', source: '.agents/workflows/demo.md', target: '.agents/workflows/demo.md' },
      { id: 'generate-adapter', action: 'regenerate', command: 'node generator.mjs' }
    ],
    verification: []
  });
  writeJson(path.join(core, 'changelogs', 'v0.2.0', 'changelog.yaml'), {
    version: 'v0.2.0', previous_version: 'v0.1.0', release_type: 'feature',
    changes: [{ id: 'replace-workflow', action: 'update', source: '.agents/workflows/demo-v2.md', target: '.agents/workflows/demo.md' }],
    verification: []
  });
  fs.mkdirSync(path.join(core, '.agents', 'workflows'), { recursive: true });
  fs.writeFileSync(path.join(core, '.agents', 'workflows', 'demo.md'), 'one\n');
  fs.writeFileSync(path.join(core, '.agents', 'workflows', 'demo-v2.md'), 'two\n');
  return { root, core, target };
}

test('resolveReleaseChain returns only contiguous declared releases', () => {
  const { core } = fixture();
  assert.deepEqual(resolveReleaseChain(core, 'v0.0.0', 'v0.2.0').map((release) => release.version), ['v0.1.0', 'v0.2.0']);
});

test('validateRelease rejects an instance-only target', () => {
  const { core } = fixture();
  const release = JSON.parse(fs.readFileSync(path.join(core, 'changelogs', 'v0.1.0', 'changelog.yaml')));
  release.changes[0].target = 'Tasks/leak.md';
  assert.throws(() => validateRelease(core, release), /explicitly excluded/);
});

test('validateRelease allows only declared portable documents under excluded roots', () => {
  const { core } = fixture();
  const release = JSON.parse(fs.readFileSync(path.join(core, 'changelogs', 'v0.1.0', 'changelog.yaml')));
  release.changes[0].source = 'Tasks/README.md';
  release.changes[0].target = 'Tasks/README.md';
  fs.mkdirSync(path.join(core, 'Tasks'), { recursive: true });
  fs.writeFileSync(path.join(core, 'Tasks', 'README.md'), 'portable contract\n');
  assert.doesNotThrow(() => validateRelease(core, release));
  release.changes[0].target = 'Tasks/2026-08-31-instance-task.md';
  assert.throws(() => validateRelease(core, release), /explicitly excluded/);
});

test('planUpdate skips a locally modified managed file', () => {
  const { core, target } = fixture();
  fs.mkdirSync(path.join(target, '.agents', 'workflows'), { recursive: true });
  fs.writeFileSync(path.join(target, '.agents', 'workflows', 'demo.md'), 'local\n');
  const plan = planUpdate({ coreRoot: core, targetRoot: target, fromVersion: 'v0.1.0', toVersion: 'v0.2.0' });
  assert.equal(plan.operations[0].disposition, 'skip-override');
});

test('applyPlan changes only declared operations and writes a receipt', () => {
  const { core, target } = fixture();
  const plan = planUpdate({ coreRoot: core, targetRoot: target, fromVersion: 'v0.0.0', toVersion: 'v0.1.0' });
  const result = applyPlan(plan, { confirmDestructive: false, runCommand: () => ({ status: 0 }) });
  assert.equal(fs.readFileSync(path.join(target, '.agents', 'workflows', 'demo.md'), 'utf8'), 'one\n');
  assert.ok(fs.existsSync(result.receiptPath));
  assert.equal(fs.existsSync(path.join(target, 'Tasks', 'leak.md')), false);
});
