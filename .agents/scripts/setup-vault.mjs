#!/usr/bin/env node
/**
 * setup-vault.mjs — mechanical first-run precondition for a fresh vault.
 *
 * Deliberately separate from the conversational `vault-onboard` workflow:
 * this script makes no judgment calls. It exists so a freshly cloned vault
 * gets a working, uniquely-named QMD index without anyone having to hand-edit
 * `vault-manifest.json` first.
 *
 * Steps:
 *   1. If `vault-manifest.json.qmd_index` is still the shipped sentinel
 *      "__UNSET__", replace it with the current directory's basename,
 *      sanitized to a valid qmd index (matches the QMD_INDEX_PATTERN in
 *      .agents/hooks/scripts/lib/session-start.ts). Already-configured
 *      vaults are left untouched — this step is a no-op on re-run.
 *   2. Run scripts/qmd-bootstrap.ts to register and build the (empty) index.
 *   3. Run the full gate as a sanity check.
 *
 * Usage:
 *   node --experimental-strip-types .agents/scripts/setup-vault.mjs
 */

import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const manifestPath = path.join(root, 'vault-manifest.json');
const SENTINEL = '__UNSET__';

function slugify(name) {
  let slug = name.toLowerCase().replace(/[^a-z0-9._-]/g, '-');
  slug = slug.replace(/^[^a-z0-9]+/, '');
  return slug || 'vault';
}

function run(description, command, args) {
  process.stdout.write(`→ ${description}\n`);
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit' });
  if (result.status !== 0) {
    process.stderr.write(`\n✗ Failed during: ${description}\n`);
    process.exit(result.status ?? 1);
  }
}

if (!existsSync(manifestPath)) {
  process.stderr.write('vault-manifest.json missing. Run from the vault root.\n');
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

if (manifest.qmd_index === SENTINEL) {
  const slug = slugify(path.basename(root));
  process.stdout.write(`→ Setting qmd_index to '${slug}' (from directory name)\n`);
  manifest.qmd_index = slug;
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
} else {
  process.stdout.write(`→ qmd_index already set to '${manifest.qmd_index}' — skipping\n`);
}

run(
  'Bootstrapping QMD index',
  'node',
  ['--disable-warning=ExperimentalWarning', '--experimental-strip-types', 'scripts/qmd-bootstrap.ts']
);

run('Running the gate', 'node', ['.agents/scripts/gate.mjs']);

process.stdout.write('\n✓ Vault setup complete. Run /vault-onboard next.\n');
