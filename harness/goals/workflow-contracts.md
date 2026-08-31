---
description: All canonical workflows keep valid machine-readable contracts.
tags:
  - harness
  - goal
predicate: node .agents/scripts/verify-workflows.mjs
born: 2026-07-28
status: satisfied
last-pass: 2026-08-07
on_violation: Wake the user; do not continue structural workflow changes until contracts validate.
retire_when: Retire only if canonical workflows stop using contract.json files.
---

# Workflow Contracts

Every canonical workflow must have a valid `workflow.md` and `contract.json`.

