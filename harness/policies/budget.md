---
description: Budget policy for runtime and automation work.
tags:
  - harness
  - policy
---

# Budget Policy

Budget is a gate, not an after-action surprise.

## Current State

This prototype tracks estimated cost manually or by script. Runtime-specific
actual usage can be added later when each runtime exposes reliable usage data.

## Rules

- Quiet scans should use low-cost tooling when possible.
- Expensive runtimes should be reserved for planning, verification, taste, or
  high-risk decisions.
- Unattended loops must have a daily budget before they are enabled.
- Budget breach wakes the user.
- Cost logs belong in `harness/ledgers/usage.tsv`.

## Default Daily Cap

Prototype default: `$5.00` per day for unattended loops.

