---
description: Canonical roles remain bounded capability contracts with valid workflow references.
tags:
  - harness
  - goal
predicate: node .agents/scripts/verify-roles.mjs
born: 2026-07-28
status: satisfied
last-pass: 2026-08-07
on_violation: Wake the user; repair role contracts or workflow role references before dispatching roles.
retire_when: Retire only if canonical roles are removed from the methodology.
---

# Role Contracts

Every `.agents/roles/<role>/contract.json` must validate, and workflow
`related_roles` must point to existing canonical roles.

