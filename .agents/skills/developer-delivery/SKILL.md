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

- Start with future project-local WordPress router/triage skills once imported.
- Route PHP, JS, CSS, block, theme, plugin, REST, Interactivity API, PHPStan,
  build tooling, and repository-owned `theme.json` to Developer.
- Route pages, posts, media, Site Editor state, Global Styles, settings,
  redirects, users, options, database, and other mutable site state to
  WordPress Operator.

Astro:

- Use future project-local `astro` once imported.
- Prefer repo-local scripts and config over generic examples.
- Check current official docs when API or adapter behavior may have changed.

## Source Notes

This skill adapts `/Users/bobmoore/.agents/skills/developer-delivery` and the
Karpathy-inspired guidance staged under `stash/development/andrej-karpathy-skills`.

