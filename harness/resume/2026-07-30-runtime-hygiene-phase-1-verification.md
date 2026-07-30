---
description: Cross-runtime verification note for Runtime Hygiene Phase 1 vault-local QMD storage.
tags:
  - harness
  - resume
  - runtime-hygiene
  - qmd
status: complete
created: 2026-07-30
---

# Runtime Hygiene Phase 1 Verification

## Outcome

Runtime Hygiene Phase 1 was verified across Claude, Codex, Gemini, and Hermes.
The original QMD global-cache failure mode is resolved for the checked runtimes:
QMD can read and write the vault-local SQLite store under ignored `tmp/qmd/`
without requiring writable access to `~/.cache/qmd`.

## Verified Criteria

- `node .agents/scripts/gate.mjs` passes and includes
  `PASS verify-qmd-runtime`.
- `tmp/qmd/agency-vault-harness.sqlite` is ignored by git.
- QMD collection inspection works with:
  `INDEX_PATH="$PWD/tmp/qmd/agency-vault-harness.sqlite" qmd --index agency-vault-harness collection show agency-vault-harness`.
- QMD update works against the vault-local store.
- No `.obsidian/` deletion is expected or part of the fix.

## Follow-up

Codex still reports hook failures outside the QMD storage issue, including a
`PreToolUse hook (failed)` with exit code 127 in this harness. That belongs to
Runtime Hygiene Phase 2 adapter protocol/path compatibility work.
