---
description: Runtime routing and dispatch policy for agent work in this vault.
tags:
  - harness
  - policy
---

# Runtime Routing Policy

Runtime choice is part of the work contract. Do not treat one runtime as trusted
for every task.

## Routing Factors

Choose runtime and role based on:

- task type
- required tools
- context size
- approval class
- trust tier for the workflow or skill
- cost sensitivity
- verification needs

## Default Rules

- Resolve the workflow before choosing runtime, role, model, or tool path.
- Use the active runtime for ordinary interactive vault work.
- Use the cheapest adequate runtime for large read-only scans.
- Use high-taste or high-judgment runtimes for final review of user-visible
  copy, design, architecture, or production-risk decisions.
- Use `developer` for version-controlled code.
- Use `wordpress-operator` for mutable WordPress state.
- Use explicit user approval before switching into a runtime/tool path that
  changes the approval class.
- Do not use native subagents, profiles, or cheaper-model workers as a bypass
  around workflow contracts, approval policy, or verification.

## Dispatch Ledger

Record significant workflow dispatches in `harness/ledgers/dispatch.tsv`.

Required fields:

- timestamp
- workflow
- runtime
- role
- approval_class
- action
- result
- evidence
