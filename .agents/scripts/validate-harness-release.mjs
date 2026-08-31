#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { loadRelease, validateRelease } from './lib/harness-release.mjs';

const args = process.argv.slice(2);
const versionIndex = args.indexOf('--version');
const version = versionIndex >= 0 ? args[versionIndex + 1] : null;
const root = process.cwd();

if (!version) {
  console.error('Usage: node .agents/scripts/validate-harness-release.mjs --version vX.Y.Z');
  process.exit(1);
}

try {
  const coreVersion = JSON.parse(fs.readFileSync(path.join(root, 'core-version.yaml'), 'utf8'));
  if (coreVersion.version !== version) throw new Error(`core version ${coreVersion.version} does not match requested ${version}`);
  const release = validateRelease(root, loadRelease(root, version));
  if (release.version !== version) throw new Error(`release declares ${release.version}, expected ${version}`);
  console.log(`PASS release ${version}: ${release.changes.length} declared operations`);
} catch (error) {
  console.error(`FAIL release validation: ${error.message}`);
  process.exit(1);
}
