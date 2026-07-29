---
description: Alarm runbook for gate failures, standing goal violations, budget breaches, and adapter drift.
tags:
  - harness
  - runbook
---

# Alarms

Use this runbook when a gate, goal, budget, adapter, or trust check fails.

## Gate Fails

Signal:

```bash
node .agents/scripts/gate.mjs
```

Action:

1. Read the failing script output.
2. Fix the smallest structural issue.
3. Re-run the specific failing check.
4. Re-run `node .agents/scripts/gate.mjs`.
5. Do not report structural work as done until the gate passes or the blocker
   is explicitly reported.

## Standing Goal Violated

Signal:

```bash
node .agents/scripts/verify-goals.mjs
```

Action:

1. Open the violated goal under `harness/goals/`.
2. Read `on_violation`.
3. Identify the first failing predicate.
4. Fix through the normal workflow path, not directly inside the goal verifier.
5. Re-run `node .agents/scripts/verify-goals.mjs`.
6. Retire a goal only with user approval.

## Budget Breach

Signal:

```bash
node .agents/scripts/cost-check.mjs --budget <amount>
```

Action:

1. Run `node .agents/scripts/cost-check.mjs --report`.
2. Identify which stage or runtime increased cost.
3. Lower cadence, change routing, or stop the loop.
4. Do not raise the budget as the first fix.

## Adapter Drift

Signal:

```bash
node .agents/scripts/verify-adapters.mjs
```

Action:

1. Confirm whether the canonical workflow changed or the adapter was hand-edited.
2. If the canonical workflow is correct, regenerate adapters.
3. For Claude vault commands, run:

   ```bash
   node .agents/adapters/claude/generate-commands.mjs
   ```

4. Re-run `node .agents/scripts/verify-adapters.mjs`.

## Trust Demotion

Signal:

```bash
node .agents/scripts/trust-ledger.mjs --render
```

Action:

1. Read the last failures for the workflow, skill, role, or adapter.
2. Treat repeated failure as a contract/spec problem first.
3. Keep the subject in `watch` until verified passes rebuild confidence.
4. Do not promote trust manually to bypass a failing gate.

## Loop Refuses To Run

Signal:

```bash
node .agents/loop/loop.mjs --dry-run
```

Action:

1. Fix gate failures first.
2. Fix budget failures second.
3. Confirm runbooks and policies are current.
4. Keep scheduled execution disabled unless the user explicitly enables it.

