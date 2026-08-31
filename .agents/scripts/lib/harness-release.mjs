import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const ACTIONS = new Set(['add', 'update', 'delete', 'migrate', 'regenerate']);

function readYamlJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function exists(file) {
  return fs.existsSync(file);
}

function hashFile(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function ensureInside(root, relativePath) {
  if (typeof relativePath !== 'string' || !relativePath || path.isAbsolute(relativePath)) throw new Error(`invalid relative path: ${relativePath}`);
  const resolved = path.resolve(root, relativePath);
  if (!resolved.startsWith(`${path.resolve(root)}${path.sep}`)) throw new Error(`path escapes root: ${relativePath}`);
  return resolved;
}

function normalizePath(value) {
  return value.replaceAll('\\', '/');
}

function under(value, declared) {
  const current = normalizePath(value);
  const root = normalizePath(declared);
  return root.endsWith('/') ? current.startsWith(root) : current === root || current.startsWith(`${root}/`);
}

function exact(value, declared) {
  return normalizePath(value) === normalizePath(declared);
}

export function loadManagedPaths(coreRoot) {
  const manifest = readYamlJson(path.join(coreRoot, 'core-managed-paths.yaml'));
  if (!Array.isArray(manifest.managed_paths) || !Array.isArray(manifest.excluded_paths)) throw new Error('managed-path manifest is malformed');
  if (manifest.portable_exceptions !== undefined && !Array.isArray(manifest.portable_exceptions)) throw new Error('portable exceptions must be an array');
  return manifest;
}

function assertManaged(coreRoot, relativePath) {
  const manifest = loadManagedPaths(coreRoot);
  const portable = (manifest.portable_exceptions ?? []).some((entry) => exact(relativePath, entry));
  if (manifest.excluded_paths.some((excluded) => under(relativePath, excluded)) && !portable) throw new Error(`path is explicitly excluded: ${relativePath}`);
  if (!manifest.managed_paths.some((entry) => under(relativePath, entry.path))) throw new Error(`path is not a managed path: ${relativePath}`);
}

function releaseFile(coreRoot, version) {
  return path.join(coreRoot, 'changelogs', version, 'changelog.yaml');
}

export function loadRelease(coreRoot, version) {
  const file = releaseFile(coreRoot, version);
  if (!exists(file)) throw new Error(`missing changelog for ${version}`);
  return readYamlJson(file);
}

export function validateRelease(coreRoot, release) {
  if (!release || typeof release !== 'object') throw new Error('release must be an object');
  for (const key of ['version', 'previous_version', 'release_type', 'changes', 'verification']) {
    if (!(key in release)) throw new Error(`release missing ${key}`);
  }
  if (!Array.isArray(release.changes) || !Array.isArray(release.verification)) throw new Error('release changes and verification must be arrays');
  const ids = new Set();
  for (const operation of release.changes) {
    if (!operation.id || ids.has(operation.id)) throw new Error(`operation id must be unique: ${operation.id}`);
    ids.add(operation.id);
    if (!ACTIONS.has(operation.action)) throw new Error(`unsupported operation action: ${operation.action}`);
    if (operation.action === 'regenerate') {
      if (typeof operation.command !== 'string' || !operation.command.trim()) throw new Error(`regenerate operation ${operation.id} needs command`);
      continue;
    }
    if (typeof operation.target !== 'string') throw new Error(`operation ${operation.id} needs target`);
    assertManaged(coreRoot, operation.target);
    if (operation.action === 'delete') continue;
    if (typeof operation.source !== 'string') throw new Error(`operation ${operation.id} needs source`);
    assertManaged(coreRoot, operation.source);
    const source = ensureInside(coreRoot, operation.source);
    if (!exists(source)) throw new Error(`operation source missing: ${operation.source}`);
    if (operation.action === 'migrate' && operation.requires_confirmation !== true) throw new Error(`migration ${operation.id} must require confirmation`);
  }
  return release;
}

export function resolveReleaseChain(coreRoot, fromVersion, toVersion) {
  if (fromVersion === toVersion) return [];
  const reversed = [];
  let cursor = toVersion;
  const seen = new Set();
  while (cursor !== fromVersion) {
    if (seen.has(cursor)) throw new Error(`cyclic changelog chain at ${cursor}`);
    seen.add(cursor);
    const release = validateRelease(coreRoot, loadRelease(coreRoot, cursor));
    reversed.push(release);
    cursor = release.previous_version;
    if (!cursor) throw new Error(`discontinuous changelog chain before ${toVersion}`);
  }
  return reversed.reverse();
}

function expectedHashes(coreRoot, fromVersion) {
  const hashes = new Map();
  for (const release of resolveReleaseChain(coreRoot, 'v0.0.0', fromVersion)) {
    for (const operation of release.changes) {
      if (!operation.target || operation.action === 'regenerate') continue;
      if (operation.action === 'delete') hashes.delete(operation.target);
      else hashes.set(operation.target, hashFile(ensureInside(coreRoot, operation.source)));
    }
  }
  return hashes;
}

export function planUpdate({ coreRoot, targetRoot, fromVersion, toVersion }) {
  const releases = resolveReleaseChain(coreRoot, fromVersion, toVersion);
  const expected = expectedHashes(coreRoot, fromVersion);
  const operations = [];
  for (const release of releases) {
    for (const change of release.changes) {
      const operation = { ...change, release: release.version, disposition: 'apply' };
      if (change.action === 'regenerate') {
        operations.push(operation);
        continue;
      }
      const target = ensureInside(targetRoot, change.target);
      const priorHash = expected.get(change.target);
      if (exists(target) && priorHash && hashFile(target) !== priorHash) operation.disposition = 'skip-override';
      if (['delete', 'migrate'].includes(change.action)) operation.disposition = operation.disposition === 'skip-override' ? 'skip-override' : 'confirmation-required';
      operations.push(operation);
      if (change.action === 'delete') expected.delete(change.target);
      else if (change.source) expected.set(change.target, hashFile(ensureInside(coreRoot, change.source)));
    }
  }
  return { coreRoot, targetRoot, fromVersion, toVersion, operations };
}

function copyFile(source, target) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

export function applyPlan(plan, { confirmDestructive = false, runCommand = () => ({ status: 0 }) } = {}) {
  const receipt = { schema_version: 1, from_version: plan.fromVersion, to_version: plan.toVersion, operations: [], status: 'success' };
  for (const operation of plan.operations) {
    const entry = { id: operation.id, release: operation.release, action: operation.action, disposition: operation.disposition };
    if (operation.disposition === 'skip-override') {
      receipt.operations.push(entry);
      receipt.status = 'partial';
      continue;
    }
    if (operation.disposition === 'confirmation-required' && !confirmDestructive) throw new Error(`operation requires confirmation: ${operation.id}`);
    if (operation.action === 'regenerate') {
      const result = runCommand(operation.command, plan.targetRoot);
      if (result.status !== 0) throw new Error(`regeneration failed: ${operation.id}`);
    } else {
      const target = ensureInside(plan.targetRoot, operation.target);
      if (operation.action === 'delete') fs.rmSync(target, { force: true });
      else copyFile(ensureInside(plan.coreRoot, operation.source), target);
    }
    receipt.operations.push(entry);
  }
  const harnessDir = path.join(plan.targetRoot, '.harness');
  fs.mkdirSync(path.join(harnessDir, 'update-receipts'), { recursive: true });
  fs.writeFileSync(path.join(harnessDir, 'core-version.yaml'), `${JSON.stringify({ version: plan.toVersion }, null, 2)}\n`);
  const receiptPath = path.join(harnessDir, 'update-receipts', `${plan.toVersion.replaceAll('.', '_')}.json`);
  fs.writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
  return { receiptPath, receipt };
}
