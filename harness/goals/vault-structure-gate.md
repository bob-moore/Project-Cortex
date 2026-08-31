---
description: Core vault structure keeps passing the deterministic vault check.
tags:
  - harness
  - goal
predicate: node .agents/scripts/verify-vault.mjs
born: 2026-07-28
status: satisfied
last-pass: 2026-08-07
on_violation: Wake the user; fix the structural regression or explicitly retire the predicate.
retire_when: Retire only if the vault structure convention is replaced.
---

# Vault Structure Gate

Core vault files, policy files, QMD index identity, and the single-Home
entry-surface decision remain valid.
