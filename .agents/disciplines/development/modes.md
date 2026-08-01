---
description: Development modes and boundaries for the canonical development discipline.
tags:
  - harness
  - discipline
  - development
---

# Development Modes

Development modes determine which skills, context, and verification checks
apply to repository work.

## Universal Inputs

For client-specific work, resolve:

- client and project
- `Clients/<Client>/<Client> Stack.md`
- target repository path and branch
- repository `AGENTS.md`, `CLAUDE.md`, or other instructions
- package/build/test manifests
- approved design, copy, accessibility, SEO, or strategy artifacts when they
  constrain implementation
- approval boundary for dependency, remote, deployment, production, or external
  actions

If the repository cannot be proven from context, report the missing prerequisite
instead of guessing.

## Repository Evidence Ledger

Keep these evidence categories separate:

| Category | Meaning |
|---|---|
| `authority` | User request, workflow contract, repo instructions, client Stack, approved artifact. |
| `repo-fact` | Directly inspected source, config, manifest, script, test, branch, or file. |
| `runtime-fact` | Observed command output, test result, build result, browser/API response. |
| `proposal` | Candidate implementation or follow-up needing approval. |
| `gap` | Missing or contradictory context that blocks a defensible change. |

## Modes

| Mode | Owns | Typical Output | Quality Emphasis |
|---|---|---|---|
| `implementation` | Bounded version-controlled feature/fix. | Diff, tests/checks, evidence report. | Smallest complete change, repo style, acceptance evidence. |
| `bug-diagnosis` | Broken, failing, throwing, or slow behavior. | Reproduction, root cause, fix or blocker. | Inspect/reproduce before patching; avoid speculative fixes. |
| `refactor` | Behavior-preserving structure change explicitly in scope. | Diff plus before/after checks. | Preserve behavior; no hidden feature work. |
| `test-build-lint` | Project-native verification. | Test/build/lint/static-analysis output. | Real commands, exact results, skipped checks explained. |
| `code-review` | Review of a branch, PR, or WIP diff. | Findings-first review. | Bugs, regressions, missing tests, contract mismatch. |
| `architecture-audit` | Structure, boundaries, dependencies, config ownership. | Audit findings and recommendations. | Evidence before broad redesign. |
| `dependency-maintenance` | Package upgrades and lockfile changes. | Updated deps plus rollback-aware verification. | Changelog/breaking-change awareness; targeted checks. |
| `performance-remediation` | Measured bottleneck remediation. | Measurement, experiment, diff, result. | Profile before optimizing; keep/discard experiments. |
| `platform-development` | WordPress or Astro source changes. | Platform-routed implementation evidence. | Platform skill plus repo-local conventions. |

## Supporting Procedures

`developer-delivery` owns compact procedures that apply inside the modes above:

- **root-cause diagnosis:** create a tight, red-capable feedback loop; minimise
  the repro; test one falsifiable hypothesis at a time; fix the cause; preserve
  the regression proof; and escalate repeated systemic failure rather than
  stacking guesses.
- **test evidence:** select the highest reliable proof boundary for the
  protected outcome. Prefer test-first when it fits the repository and task;
  otherwise state the strongest credible automated, runtime, or manual proof
  and its limitation.
- **Git integration:** inspect worktree/submodule, branch, and dirty state;
  preserve unrelated work; classify conflicts before editing; and require
  explicit approval for remote, merge, publication, or release actions.

## Platform Boundaries

WordPress:

- Code-facing themes, plugins, blocks, REST, Interactivity API, PHPStan, build
  tooling, and repository-owned `theme.json` route to Developer.
- Mutable pages, posts, media, Site Editor state, navigation, Global Styles,
  plugin settings, redirects, users, options, and database state route to
  WordPress Operator.

Astro:

- Components, layouts, pages, content collections, integrations, adapters,
  styling, builds, and deployment config route to Developer.
- Content/business copy still follows Writer/Strategist/Designer boundaries
  when not purely implementation.

## Karpathy Practice Layer

Apply these to non-trivial code work:

- Surface assumptions and confusion before coding.
- Prefer the minimum code that solves the scoped problem.
- Touch only what the request requires.
- Match existing repo style.
- Remove only unused code introduced by your own change unless cleanup is in
  scope.
- Define success criteria and verify them with real checks.

Use judgment for trivial one-line changes, but keep the same boundaries.

