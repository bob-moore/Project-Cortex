---
description: Claude vault commands remain thin adapters to canonical workflows.
tags:
  - harness
  - goal
predicate: node .agents/scripts/verify-adapters.mjs
born: 2026-07-28
status: satisfied
last-pass: 2026-08-07
on_violation: Wake the user; regenerate or repair Claude command adapters before relying on them.
retire_when: Retire only if Claude command adapters are removed or replaced by another adapter mechanism.
---

# Claude Vault Command Adapters

Every `.claude/commands/vault-*.md` file must point to its matching canonical
workflow spec under `.agents/workflows/`.

