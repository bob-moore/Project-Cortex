#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const disciplinesRoot = path.join(root, '.agents', 'disciplines');
const skillsRoot = path.join(root, '.agents', 'skills');
const failures = [];

function fail(file, message) {
  failures.push(`${path.relative(root, file)}: ${message}`);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    fail(file, `invalid JSON: ${error.message}`);
    return null;
  }
}

function requireStringArray(file, object, key, min = 0) {
  const value = object[key];
  if (!Array.isArray(value) || !value.every((item) => typeof item === 'string')) {
    fail(file, `${key} must be an array of strings`);
    return [];
  }
  if (value.length < min) fail(file, `${key} must contain at least ${min} item(s)`);
  return value;
}

if (!fs.existsSync(disciplinesRoot)) {
  fail(disciplinesRoot, 'missing disciplines directory');
} else {
  for (const entry of fs.readdirSync(disciplinesRoot, { withFileTypes: true }).filter((item) => item.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
    const dir = path.join(disciplinesRoot, entry.name);
    const contractFile = path.join(dir, 'contract.json');
    const readmeFile = path.join(dir, 'README.md');
    const modesFile = path.join(dir, 'modes.md');
    const rubricFile = path.join(dir, 'rubric.md');
    const skillMapFile = path.join(dir, 'skill-map.json');

    for (const file of [contractFile, readmeFile, modesFile, rubricFile, skillMapFile]) {
      if (!fs.existsSync(file)) fail(file, 'missing discipline file');
    }

    if (!fs.existsSync(contractFile)) continue;
    const contract = readJson(contractFile);
    if (!contract) continue;

    if (contract.name !== entry.name) fail(contractFile, `name must equal directory ${entry.name}`);
    if (!Number.isInteger(contract.version) || contract.version < 1) fail(contractFile, 'version must be a positive integer');
    if (typeof contract.summary !== 'string' || !contract.summary.trim()) fail(contractFile, 'summary must be a non-empty string');
    if (typeof contract.canonical_quality_gate !== 'string') fail(contractFile, 'canonical_quality_gate must be a string');
    if (typeof contract.canonical_skill_map !== 'string') fail(contractFile, 'canonical_skill_map must be a string');
    if (typeof contract.canonical_modes !== 'string') fail(contractFile, 'canonical_modes must be a string');

    const activeSkills = requireStringArray(contractFile, contract, 'active_canonical_skills', 1);
    requireStringArray(contractFile, contract, 'owner_roles', 1);
    requireStringArray(contractFile, contract, 'supporting_roles');
    requireStringArray(contractFile, contract, 'approval_classes', 1);
    requireStringArray(contractFile, contract, 'blocking_rules', 1);
    requireStringArray(contractFile, contract, 'verification_predicates', 1);

    for (const skill of activeSkills) {
      const skillFile = path.join(skillsRoot, skill, 'SKILL.md');
      if (!fs.existsSync(skillFile)) fail(skillFile, `active discipline skill missing for ${entry.name}`);
    }

    if (fs.existsSync(skillMapFile)) {
      const skillMap = readJson(skillMapFile);
      if (skillMap) {
        if (skillMap.discipline !== entry.name) fail(skillMapFile, `discipline must equal ${entry.name}`);
        const mapActiveSkills = requireStringArray(skillMapFile, skillMap, 'active_canonical_skills', 1);
        for (const skill of mapActiveSkills) {
          if (!activeSkills.includes(skill)) fail(skillMapFile, `active skill ${skill} missing from contract`);
        }
      }
    }
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('PASS verify-disciplines');
