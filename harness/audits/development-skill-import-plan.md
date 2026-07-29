---
description: "Import plan for development skill packs and global development capabilities."
tags:
  - harness
  - audit
  - development
  - skills
status: implemented
created: 2026-07-29
updated: 2026-07-29
---

# Development Skill Import Plan

## Scope

Plan the Development bucket after the Design import pass.

Development in this vault covers distinct surfaces:

1. General development practices and repository implementation discipline.
2. Platform-specific development, currently WordPress and Astro.
3. WordPress operation through MCP, REST, WP-CLI, browser, WPRemote, Novamira,
   and other adapters.
4. Supporting specialties such as git procedures, Cloudflare, performance,
   dependency work, architecture review, and testing.

Code does not normally live inside this vault. Development skills must assume
the real code repository may be elsewhere and may carry its own `AGENTS.md`,
`CLAUDE.md`, framework config, commands, scripts, and local conventions. Those
repository-local instructions govern implementation details after the vault has
resolved the client, project, Stack note, and approval boundary.

## Source Inventory

## Implementation Status

Completed on 2026-07-29:

- Added `.agents/disciplines/development/` with `README.md`,
  `contract.json`, `modes.md`, `rubric.md`, and `skill-map.json`.
- Added `.agents/skills/developer-delivery/SKILL.md` as the core
  repository-implementation loop.
- Updated `.agents/roles/developer/` with Development discipline context,
  repository-local instruction priority, WordPress code/state boundaries, and
  Astro source boundaries.
- Added `.agents/disciplines/development/platforms.md` to stage Astro and
  WordPress code-development imports.
- Added `harness/audits/wordpress-operations-mcp-import-plan.md` as the
  separate WordPress operation/MCP planning track.
- Imported the global Astro skill into `.agents/skills/astro/`.
- Imported global WordPress code-development skills into `.agents/skills/`:
  `wordpress-router`, `wp-project-triage`, `wp-block-development`,
  `wp-block-themes`, `wordpress-block-theming`, `wp-plugin-development`,
  `wp-rest-api`, `wp-interactivity-api`, `wp-abilities-api`,
  `wp-abilities-audit`, `wp-abilities-verify`, `wp-phpstan`, `wp-playground`,
  `wp-plugin-directory-guidelines`, and `wpds`.
- Activated those platform skills in the Development discipline contract and
  skill map.

Still deferred:

- Add git, Cloudflare, dependency, performance, and release specialties.
- Add debugging, code review, acceptance-test, architecture-audit, and
  test-strategy specialists.
- Build workflows around the imported WordPress/Astro skills once the role
  contracts have stabilized.

## Next Development Slice

Use this as the next work order after context cleanup.

Goal: extend the Development bucket with general specialist skills that support
ordinary repository work without importing broad external packs wholesale.

Priority candidates now visible in the global skill library:

| Priority | Source | Target | Disposition |
|---:|---|---|---|
| 1 | `/Users/bobmoore/.agents/skills/diagnosing-bugs` | `debugging` or `bug-diagnosis` | Adapt into the Development `bug-diagnosis` mode. |
| 2 | `/Users/bobmoore/.agents/skills/code-review` | `code-review` | Adapt as a findings-first review skill with Verifier boundary. |
| 3 | `/Users/bobmoore/.agents/skills/acceptance-test-builder` | `acceptance-test-builder` | Adapt as acceptance criteria and test evidence support. |
| 4 | `/Users/bobmoore/.agents/skills/dependency-upgrader` | `dependency-maintenance` | Adapt with changelog, lockfile, rollback, and affected-check rules. |
| 5 | `/Users/bobmoore/.agents/skills/resolving-merge-conflicts` | `git-procedures` | Fold into git procedures with branch/dirty-work protection. |
| 6 | `/Users/bobmoore/.agents/skills/performance-optimizer` and `/Users/bobmoore/.agents/skills/performance` | `performance-remediation` | Adapt only measured/profiling guidance; avoid generic optimization. |
| 7 | `/Users/bobmoore/.agents/skills/release-publisher` | `release-handoff` | Adapt cautiously; publishing/deployment remains approval-gated. |
| 8 | `/Users/bobmoore/.agents/skills/architecture-auditor` and `/Users/bobmoore/.agents/skills/codebase-auditor` | `architecture-audit` | Adapt as read-first audit guidance, not mutation authority. |
| 9 | `/Users/bobmoore/.agents/skills/test-strategy-planner` and `/Users/bobmoore/.agents/skills/test-suite-auditor` | `test-strategy` | Defer unless testing work becomes recurring. |

Cloudflare remains a gap: no current global `cloudflare` skill was found in
the quick source check. Build it from local patterns or live client need when
the first Cloudflare task appears.

Recommended implementation shape:

1. Inventory each source skill and classify content as active procedure,
   discipline reference, workflow candidate, or discard.
2. Add active skills only for recurring bounded work: likely `debugging`,
   `code-review`, `acceptance-test-builder`, `dependency-maintenance`,
   `git-procedures`, and maybe `performance-remediation`.
3. Keep release/deployment and Cloudflare behind explicit approval classes and
   do not enable publishing or production mutation from a general skill.
4. Update `.agents/disciplines/development/contract.json`,
   `modes.md`, `skill-map.json`, `.agents/manifest.yaml`, `harness/skills.md`,
   and this plan.
5. Validate with `node .agents/scripts/gate.mjs`, JSON/frontmatter checks, and
   `git diff --check`.

## Source Inventory

### Stash Source

`stash/development/andrej-karpathy-skills`

- Contains one portable skill: `karpathy-guidelines`.
- Contains a nested `.git` directory; do not move it into `.agents/`.
- Best use: extract into Development discipline practice/rubric guidance:
  assumptions, simplicity, surgical changes, and verifiable success criteria.

### Global General Development Skills

High-value sources:

| Source | Recommended disposition |
|---|---|
| `developer` | Adapt into canonical Developer role, not a duplicate skill. |
| `developer-delivery` | Promote as the core project-local implementation skill. |
| `diagnosing-bugs` | Future specialist skill or reference for debugging mode. |
| `code-review` | Future review workflow/skill, likely with Verifier boundary. |
| `codebase-auditor` | Future architecture/health audit lane. |
| `architecture-auditor` | Future architecture audit/reference lane. |
| `acceptance-test-builder` | Future testing/acceptance evidence skill. |
| `test-strategy-planner` | Future test-planning reference. |
| `test-suite-auditor` | Future test-confidence audit. |
| `dependency-upgrader` | Future dependency maintenance skill. |
| `performance-optimizer` | Future measured optimization skill. |
| `resolving-merge-conflicts` | Future git specialty skill. |

Do not copy these wholesale. Adapt only when a recurring workflow needs them.

### Global Platform Development Skills

Astro:

- `astro`

WordPress code-facing:

- `wordpress-router`
- `wp-project-triage`
- `wp-block-development`
- `wp-block-themes`
- `wp-plugin-development`
- `wp-rest-api`
- `wp-interactivity-api`
- `wp-abilities-api`
- `wp-abilities-audit`
- `wp-abilities-verify`
- `wp-phpstan`
- `wp-performance`
- `wp-playground`
- `wp-plugin-directory-guidelines` when present
- `wpds` when WordPress Design System work is relevant

Imported active on 2026-07-29.

The WordPress router and triage skills appear to depend on scripts/references
inside their global skill folders. Importing them requires preserving those
dependencies or adapting them into this vault's `.agents/tools/` layer.

### Global WordPress Operation Skills

WordPress state and operations:

- `wordpress-operator`
- `wordpress-site-operations`
- `wp-wpcli-and-ops`
- `wp-redirection`
- `wp-migratedb-pro`
- `wpremote-api` was referenced in prior plans but was not present in the
  readable global `.agents/skills` directory during the 2026-07-29 import
- `wordpress-block-theming` only when its FSE guidance does not conflict with
  `wp-block-themes`

These belong primarily to the `wordpress-operator` role and the
`wordpress-operations` discipline, not to the Developer role. They can read or
mutate live state and therefore require stronger environment, approval,
before-state, rendered verification, and rollback boundaries.

## Canonical Development Shape

Recommended first-pass canonical layer:

- `.agents/disciplines/development/`
- `.agents/skills/developer-delivery/`
- updates to `.agents/roles/developer/`

Development discipline files should follow the existing discipline shape:

- `README.md`
- `contract.json`
- `modes.md`
- `rubric.md`
- `skill-map.json`

## Development Modes

Initial mode map:

| Mode | Owner | Notes |
|---|---|---|
| `implementation` | Developer | Bounded version-controlled changes in the real repository. |
| `bug-diagnosis` | Developer | Reproduce or inspect before fixing; avoid speculative patches. |
| `refactor` | Developer | Only when explicitly in scope; preserve behavior with tests/checks. |
| `test-build-lint` | Developer | Repository-native tests, builds, static analysis, and smoke checks. |
| `code-review` | Verifier/Developer | Findings-first review, separate from producer self-approval. |
| `architecture-audit` | Developer/Verifier | Structure and dependency review without immediate mutation unless scoped. |
| `dependency-maintenance` | Developer | Explicit dependency changes with rollback-aware verification. |
| `performance-remediation` | Developer | Measured bottleneck before optimization. |
| `platform-development` | Developer | WordPress and Astro source changes, routed through platform skills. |

## Practice Extraction From Karpathy Guidelines

Extract into `.agents/disciplines/development/rubric.md` and
`modes.md`, not as a separate active always-on skill.

Principles:

- Surface assumptions and confusion before coding.
- Choose the minimum code that solves the scoped problem.
- Keep changes surgical and trace every changed line to the request.
- Define verifiable success criteria and loop until checks prove the result.

Local adaptation:

- Do not stop at a plan when direct implementation is feasible.
- Do not ask for clarification when repository inspection can answer safely.
- Preserve unrelated dirty work.
- Use repository-local instructions and commands after resolving the target.
- Report tests not run and why.

## Platform Import Plan

### Astro

Recommended target:

- `.agents/skills/astro/`

Disposition:

- Imported active from global `astro`.
- Keep it as a platform development skill used by Developer.
- Because Astro docs and APIs change, require official docs lookup when current
  API details matter; otherwise rely on repository-local config and commands.
- Do not let generic Astro examples override the target repo's scripts,
  integrations, routes, or deployment adapter.

### WordPress Code Development

Recommended target group:

- `.agents/skills/wordpress-router/`
- `.agents/skills/wp-project-triage/`
- selected `wp-*` code skills as needed

First import priority:

1. `wordpress-router`
2. `wp-project-triage`
3. `wp-block-development`
4. `wp-block-themes`
5. `wp-plugin-development`
6. `wp-rest-api`
7. `wp-interactivity-api`
8. `wp-phpstan`

Specialist imports:

- `wp-abilities-*`
- `wp-playground`
- `wp-performance`
- `wp-plugin-directory-guidelines`
- `wpds`

All listed WordPress code-development skills above were imported active on
2026-07-29.

Adaptation requirements:

- Keep code-facing WordPress skills under Developer.
- Route database/content/site-state changes to WordPress Operator.
- Preserve detector scripts and schemas if importing `wp-project-triage`.
- Avoid version claims that are likely to drift without current verification.
- Use repo-local `AGENTS.md`, composer/npm scripts, wp-env, and wrappers first.

## WordPress Operation / MCP Track

Implemented target:

- `.agents/disciplines/wordpress-operations/`, separate from the core
  Development discipline.

Sources:

- global `wordpress-operator`
- global `wordpress-site-operations`
- global `wp-wpcli-and-ops`
- global `wp-redirection`
- global `wp-migratedb-pro`
- global `wpremote-api` was not present at import time
- existing `.agents/roles/wordpress-operator/`
- project-local WordPress MCP access memories and runbooks

Required boundaries:

- exact client/site/environment before mutation
- adapter identity: MCP, REST, WP-CLI wrapper, browser, WPRemote, Novamira, or
  project tooling
- before-state capture
- scoped mutation only
- read-back of stored state
- rendered verification when visible
- rollback path
- production/admin/destructive approval gates
- no secrets in `.agents/`, `harness/`, root docs, or manifests

MCP-specific operation should prove access through a reversible safe read or
bounded operation in the target project, not by assuming global MCP availability.

## Supporting Specialty Backlog

Likely future skills or references:

- `git-procedures`: branch state, dirty work, merge/rebase conflicts, commits,
  PRs, push approvals, and release tags.
- `cloudflare`: DNS, cache, Workers/Pages, redirects, Turnstile, WAF, and
  deployment verification with approval gates.
- `dependency-maintenance`: package updates, changelogs, breaking changes,
  lockfiles, rollback.
- `performance-remediation`: measured bottleneck, profiling, keep/discard
  experiments.
- `security-review`: threat modeling, secrets, authz/authn, escaping,
  capabilities, dependency advisories.
- `release-handoff`: build artifacts, changelog, deployment boundary, rollback.

## Proposed Implementation Order

1. Add `.agents/disciplines/development/`.
2. Promote `.agents/skills/developer-delivery/` from the global source.
3. Update Developer role contract and role text.
4. Create platform import plans for Astro and WordPress code.
5. Separately create a WordPress operations/MCP plan or discipline.
6. Import Astro and the first WordPress router/triage slice.
7. Validate with `node .agents/scripts/gate.mjs` and `git diff --check`.

## Verification Plan

- `node .agents/scripts/gate.mjs`
- `git diff --check`
- local skill frontmatter check for newly added skills
- manual review that code-facing and mutable WordPress-state boundaries remain
  separate
- manual review that repository-local instructions remain higher priority for
  implementation details

## Related

- [[harness/audits/role-skill-porting-buckets|Role And Skill Porting Buckets]]
- [[harness/skills|Skills]]
- [[harness/manual|Harness Manual]]
