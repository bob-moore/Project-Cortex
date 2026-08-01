---
name: developer-delivery
description: "Use when implementing, debugging, refactoring, testing, reviewing, or revising version-controlled software in a real repository. Applies the canonical Development discipline to resolve the target repo, read repo instructions, protect dirty work, make surgical changes, run project-native checks, inspect the final diff, and return evidence without mutating WordPress state, remotes, deployments, or external systems unless approved."
---

# Developer Delivery

Use this skill as the core repository implementation loop for Developer work.

## Operating Contract

1. Read `.agents/disciplines/development/contract.json`.
2. Read `.agents/disciplines/development/modes.md`.
3. Read `.agents/disciplines/development/rubric.md`.
4. Identify the development mode, repository, branch, worktree state, target
   outcome, acceptance criteria, and approval boundary.
5. For client-specific work, read `Clients/<Client>/<Client> Stack.md` and any
   approved Design, Copy, Accessibility, SEO, or project artifacts that
   constrain the implementation.
6. In the target repository, read repository-local instructions and manifests
   before editing.
7. Preserve pre-existing dirty work and report overlap.
8. Do not mutate live WordPress state, external systems, remotes, deployments,
   databases, secrets, or production unless explicitly approved.

## Workflow

### 1. Resolve The Target

Confirm:

- repository path
- branch and worktree status
- repository instructions
- package/build/test manifests
- environment constraints
- approval-gated actions

If the repository cannot be proven, stop with the exact missing prerequisite.

### 2. Classify The Work

Choose the narrowest mode:

- `implementation`
- `bug-diagnosis`
- `refactor`
- `test-build-lint`
- `code-review`
- `architecture-audit`
- `dependency-maintenance`
- `performance-remediation`
- `platform-development`

Load platform or specialist skills only when the inspected repo and task justify
them.

### 3. Build Acceptance Criteria

Capture:

```text
Desired outcome:
Acceptance criteria:
Out of scope:
Likely files/surfaces:
Validation commands:
Approval-gated actions:
Open assumptions:
```

Use repository inspection before asking for clarification when inspection can
answer safely.

### 4. Implement Surgically

- Make the minimum coherent change that satisfies the criteria.
- Match existing style and patterns.
- Add or update tests when behavior changes and the repo supports it.
- Avoid speculative abstractions and drive-by cleanup.
- Remove only unused code introduced by your own change unless cleanup is in
  scope.

For bugs, reproduce or directly inspect before patching. For performance,
measure before optimizing.

### 4a. Diagnose Before Fixing

For `bug-diagnosis`, establish a tight feedback loop before proposing a fix:

1. Capture the reported symptom, triggering inputs, environment, and recent
   relevant changes.
2. Build and run the narrowest red-capable proof: a focused test, CLI/API call,
   browser path, replayed input, or measured timing harness.
3. Confirm it exercises the reported failure; reduce it until each remaining
   input or step is load-bearing.
4. When the failure spans multiple components (CI → build → sign, API →
   service → database), instrument each boundary — log what enters and exits,
   verify config/environment propagation — in one pass before guessing which
   layer is at fault. Run once to see where it actually breaks, then
   investigate that component specifically.
5. Compare the failing path with a working path: locate similar working code
   elsewhere in the same codebase, read the reference implementation
   completely (not skimmed), and enumerate every difference — inputs,
   dependencies, config, assumptions — however small. Don't assume a
   difference "can't matter" without checking.
6. State a falsifiable hypothesis and test one variable at a time. Do not stack
   speculative fixes.
7. Add temporary diagnostics only when they distinguish hypotheses; tag and
   remove them before completion.

If no safe red-capable feedback loop can be established, report what was tried,
the missing artifact/access, and the smallest next diagnostic step. If repeated
root-cause fixes expose new systemic coupling, stop and escalate the
architecture concern rather than continuing trial-and-error patches.

### 4b. Select Test Evidence by Proof Boundary

For behavior changes, choose the highest reliable boundary that proves the
protected outcome without making the test unsafe or non-repeatable:

- unit/component test for isolated deterministic logic;
- integration/contract test for collaborator, persistence, or protocol behavior;
- API, CLI, replay, or browser evidence for user- or system-observed outcomes;
- measured profile/benchmark for performance claims;
- manual or environment evidence only when automation cannot safely prove the
  behavior, with the limitation stated.

Use test-first/red-green when the repository and task support it. Do not impose
it on generated, configuration-only, exploratory, legacy, UI-heavy, or
otherwise unsuitable work; instead record the closest credible proof and why a
stronger automated boundary was unavailable. Never derive an oracle only from
the implementation under test.

When the task needs an explicit regression contract first — actors, business
invariants, KPIs/thresholds, and a boundary-ranked proof strategy, not just a
single test — use `acceptance-test-builder`.

### 4c. Keep Git Integration Safe

Before starting significant repository work, detect whether the checkout is a
linked worktree or submodule, inspect the branch and dirty state, and honor
repository and User worktree policy. Do not create a worktree, alter
`.gitignore`, install dependencies, commit, push, open a PR, merge, rebase, tag,
or release merely because a procedure mentions it.

When an active merge or rebase conflict exists, first identify the operation,
conflicted paths, conflict class, and required behavior. Apply only the
smallest approved resolution; preserve user work; run focused checks; inspect
the resolution diff; then report whether the operation is ready to continue,
must be aborted, or needs an owner decision. Remote, merge, and publication
actions remain explicit approvals.

For the detailed mechanics — worktree-vs-submodule detection commands,
directory-selection order, and the AUTO/JUDGMENT conflict-classification
rubric — use `git-procedures`.

### 5. Verify

Run the strongest relevant checks that exist:

- targeted tests
- affected suite
- lint/static analysis/typecheck
- build
- runtime smoke test
- browser or API check when required

Report exact pass/fail results. Explain skipped checks.

### 6. Inspect The Final Diff

Check:

- changed files are in scope
- no secrets or credentials
- no unrelated generated artifacts
- no accidental formatting sweep
- no tests weakened to fake success
- no production or WordPress-state mutation exceeded approval

### 7. Return Evidence

Return:

```text
Status: implemented | blocked | needs-revision
Repository:
Branch:
Mode:
Files changed:
Behavior changed:
Tests/checks:
Acceptance results:
Skipped checks:
Remaining uncertainty:
Approval-gated next action:
Candidate Stack/project updates:
Next owner:
```

The parent workflow or Verifier owns closure.

## Platform Routing

WordPress code:

- Start with project-local `wordpress-router` and `wp-project-triage` skills.
- Route PHP, JS, CSS, block, theme, plugin, REST, Interactivity API, PHPStan,
  build tooling, and repository-owned `theme.json` to Developer.
- Route pages, posts, media, Site Editor state, Global Styles, settings,
  redirects, users, options, database, and other mutable site state to
  WordPress Operator.

Astro:

- Use project-local `astro` when its inspected framework/API surface applies.
- Prefer repo-local scripts and config over generic examples.
- Check current official docs when API or adapter behavior may have changed.

## Source Notes

This skill incorporates selected root-cause, test-evidence, and Git-safety
methods reviewed from staged development sources. The local Development
discipline remains canonical.

2026-08-01: Section 4a enriched with pattern-analysis and multi-component
evidence-gathering techniques from `stash/development/superpowers/skills/systematic-debugging`.
Git conflict/worktree mechanics detailed further in the new `git-procedures`
skill, which this section's mode routes to.

