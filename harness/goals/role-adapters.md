---
description: Runtime role adapter surfaces remain generated from canonical role contracts.
tags:
  - harness
  - goal
predicate: node .agents/scripts/verify-adapters.mjs
born: 2026-07-28
status: satisfied
last-pass: 2026-07-29
on_violation: Wake the user; regenerate Codex role skills or repair adapter verifier rules before dispatching roles.
retire_when: Retire only if runtime role adapter surfaces are removed from the methodology.
---

# Role Adapter Surfaces

Codex role skill adapters must point to `.agents/roles/<role>/contract.json`
and `role.md`. Claude-native role agents are intentionally absent in this
methodology.

Runtime adapter files must not duplicate role behavior or create active roles
without canonical contracts.
