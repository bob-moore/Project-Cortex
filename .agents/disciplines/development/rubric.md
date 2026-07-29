---
description: Canonical development quality gate and scoring rubric.
tags:
  - harness
  - discipline
  - development
  - rubric
---

# Development Quality Gate

Use this rubric before treating repository work as ready for parent
verification, handoff, commit, PR, deployment, or WordPress-operation follow-up.

This is a quality gate, not a producer persona. Developer may run the first
checks, but the parent workflow or Verifier owns closure when independent
verification is required.

## Blocking Findings

Any blocking finding prevents a ready/done claim regardless of score:

- Target repository, branch, or environment was not identified.
- Repository instructions or manifests were ignored when present.
- Starting dirty work was not inspected or was overwritten.
- Scope expanded through unrelated refactor, formatting, dependency upgrade, or
  cleanup.
- Tests were changed to fake success or failing coverage was deleted without
  explicit scope.
- Required checks were skipped without explanation.
- Production, deployment, external, remote, destructive, database, or
  WordPress-state mutation occurred without approval.
- Secrets were requested, created, printed, stored, or exposed unsafely.
- User-visible implementation contradicts approved Design, Copy, Accessibility,
  SEO, Stack, or strategy context.
- Completion is claimed from a process exit, generated handoff, or producer
  confidence without acceptance evidence.

## Evidence Labels

Label material judgments:

- `authority`: user request, workflow contract, repo instructions, approved
  artifact, or Stack note.
- `repo-fact`: inspected source/config/manifest/script/test/worktree evidence.
- `runtime-fact`: command output, test/build/lint/static-analysis/browser/API
  result.
- `measured`: profile, benchmark, timing, coverage, size, or deterministic
  measurement.
- `judged`: engineering assessment against this rubric.
- `assumed`: not verified; must be surfaced as an open item.
- `blocked`: could not be checked; report what would unblock it.

## Score

Score to 100 only after blocking findings are handled.

| Category | Points | What Good Looks Like |
|---|---:|---|
| Contract and Scope | 15 | Target repo, branch, mode, acceptance criteria, out-of-scope boundaries, and approval gates are explicit. |
| Repository Fit | 15 | Existing architecture, style, instructions, manifests, and neighboring code are respected. |
| Change Quality | 20 | Smallest complete coherent diff; no speculative abstractions, drive-by cleanup, or unrelated churn. |
| Verification Evidence | 20 | Relevant tests/build/lint/static/runtime checks run with exact results, or skipped checks explained. |
| Safety and Ownership | 15 | Secrets, production, remotes, destructive actions, WordPress state, and external systems stay within approval boundaries. |
| Handoff Quality | 15 | Files changed, behavior changed, acceptance results, failures, uncertainty, and next owner are clear. |

## Rating Bands

| Score | Rating | Meaning |
|---:|---|---|
| 90-100 | Ready | Strong evidence for parent verification or requested handoff. |
| 80-89 | Usable | Minor gaps remain but no blocker. |
| 70-79 | Needs Revision | Material fixes or additional checks needed. |
| 60-69 | Weak | Rework implementation plan or evidence. |
| <60 | Blocked/Rebuild | Do not proceed without major correction. |

## Mode Modifiers

- `implementation`: acceptance criteria map to code and checks; final diff is
  inspected.
- `bug-diagnosis`: reproduction or direct inspection precedes fix; root cause is
  stated with evidence.
- `refactor`: behavior-preserving checks run before/after where possible.
- `test-build-lint`: commands are project-native and outputs are reported
  exactly.
- `code-review`: findings lead; severity and file references are concrete.
- `architecture-audit`: broad recommendations are grounded in actual structure,
  dependencies, and contracts.
- `dependency-maintenance`: breaking changes, lockfiles, rollback, and affected
  tests are addressed.
- `performance-remediation`: bottleneck is measured; experiments are kept only
  if evidence supports them.
- `platform-development`: relevant WordPress or Astro platform rules are applied
  without overriding repo-local conventions.

## Report Shape

Return:

```text
Development Quality Gate
Mode:
Repository:
Verdict: pass | revise | blocked
Score: N/100

Blocking Findings:
- ...

Score Breakdown:
- Contract and Scope: N/15
- Repository Fit: N/15
- Change Quality: N/20
- Verification Evidence: N/20
- Safety and Ownership: N/15
- Handoff Quality: N/15

Evidence:
- ...

Skipped Checks:
- ...

Open Items:
- ...

Next:
- ...
```

