---
name: acceptance-test-builder
description: "Use when a task needs an explicit regression contract before or instead of a single test: defining test strategy, missing acceptance/integration coverage, KPIs and thresholds, or a strategy-only audit of what proof exists and what's missing. Supports developer-delivery's 4b (test-evidence selection) with the fuller contract-building workflow that section only summarizes."
---

# Acceptance Test Builder

Build or audit the regression contract for a piece of behavior: what must
always hold, in terms an actor or business rule cares about — not files,
coverage percentages, or internal call counts. Use this before implementing
when the proof strategy itself is the open question, or standalone when asked
to define missing test coverage or audit existing coverage for gaps.

## Operating Contract

1. Read `.agents/disciplines/development/contract.json`, `modes.md`, and
   `rubric.md`.
2. Inspect the repository for facts (existing tests, fixtures, CI config,
   frameworks in use) before asking questions; ask only for business
   decisions that inspection cannot resolve.
3. Never invent a metric, threshold, or business rule — record it as a gap
   instead.
4. This skill does not implement or approve production code changes; it
   defines and can build the test/proof layer. Route implementation of the
   underlying behavior change to `developer-delivery`.

## Step 1 — Define the Regression Contract

Establish, from inspection and/or the User:

```text
Actors and goals:
Externally observable outcomes:
Business rules / invariants that must never change:
Critical paths and edge cases (rejection, timeout, retry, permission, concurrency, partial-failure):
Current baseline vs. intended behavior change:
KPIs (window, data set, acceptable variance, threshold) — only if real ones exist or are explicitly given:
Systems crossed, production-like data needs, and what the available environment can actually provide:
```

Do not fabricate a KPI or threshold to fill the template. An empty field
labeled as a gap is more honest than an invented number.

## Step 2 — Choose the Proof Boundary

Prefer the highest reliable boundary that proves the protected outcome,
matching `developer-delivery` 4b's boundary ranking:

1. black-box test through the public API, UI, job, event, or CLI;
2. deep integration test against the real database, queue, connector, or
   protocol (see `references/integration-patterns.md` for database/migration
   isolation strategy);
3. contract, replay, property, or characterization test for narrower risks;
4. unit test for isolated rules where a wider test would add no additional
   confidence.

Mock only beyond the verified boundary — not the boundary itself. When proving
a process manager, worker, container entrypoint, or deployed artifact, exercise
the real container/OS image rather than only a host process, and verify worker
replacement, signal handling, and graceful shutdown where those apply.

## Step 3 — Strategy-Only Output

When asked for strategy or an audit rather than implementation, stop here and
return:

```text
Regression contract: (from Step 1)
Prioritized scenarios:
Proof method per scenario: (from Step 2)
Blind spots: what this test set would NOT catch
```

Judge existing or proposed tests by failures they would actually catch, not
by assertion count or coverage percentage.

## Step 4 — Implement (When Asked)

Follow the target repository's existing test layout and conventions read
during `developer-delivery`'s repository resolution step. Add the smallest
test that proves the contracted behavior:

1. Write the test first; observe it fail for the expected reason.
2. Make only the approved source change.
3. Observe the test pass.
4. Assert outcomes, state, events, metrics, and error contracts — not that a
   particular internal method was called.
5. Run the focused test and the relevant surrounding suite; report exact
   results.

## Required Output

```text
Mode: strategy-only | implemented
Regression contract:
Proof boundary chosen and why:
Blind spots / gaps:
Tests added or audited:
Results:
Next owner:
```

## Boundaries

- Do not point a test at a production system or production data without
  explicit User confirmation.
- Do not weaken, delete, or skip existing coverage to make a suite pass.
- Do not claim a behavior is proven by a boundary weaker than what Step 2
  selected without stating the limitation.

## Source Notes

Adapted from `stash/development/development-skills/skills/create-test` and its
`references/integration-patterns.md`. Supports `developer-delivery` section 4b,
which owns the summary-level test-evidence-selection procedure.
