---
description: Canonical development discipline contract, modes, skill map, and quality gate.
tags:
  - harness
  - discipline
  - development
---

# Development Discipline

This directory is the canonical discipline layer for version-controlled
software work.

Development is not the same as WordPress site operation, production deployment,
or live platform administration. It defines how the `developer` role,
repository-local instructions, implementation skills, platform development
skills, tests, and verification gates fit together.

## Discipline Rule

Separate six concepts:

- **Role**: `developer` owns repository implementation, tests, build/lint fixes,
  and code-facing evidence.
- **Repository**: the real source tree may live outside this vault and carries
  its own instructions, scripts, manifests, and conventions.
- **Workflow**: a bounded task with acceptance criteria, approval gates, checks,
  and return contract.
- **Skill**: reusable procedure, platform guidance, specialist reference, or
  quality gate.
- **Discipline**: the canonical map of development modes, ownership boundaries,
  rubrics, and import decisions.
- **Adapter**: runtime discovery wrapper only.

Developer does not mutate live WordPress state, publish, deploy to production,
create secrets, or close its own work without the parent workflow or verifier.

## Files

- `contract.json`: machine-readable discipline contract.
- `modes.md`: development modes and ownership boundaries.
- `platforms.md`: staged Astro and WordPress code-development import map.
- `skill-map.json`: disposition of development source material.
- `rubric.md`: canonical development quality gate.

## Current Canonical Skills

- `developer-delivery`: core repository implementation loop for resolving the
  target repo, protecting dirty work, implementing the smallest complete
  change, running checks, inspecting the diff, and returning evidence.
- `code-review`: Verifier-owned, read-only review of an explicit diff against
  acceptance criteria, repository conventions, regression risk, and applicable
  security concerns.
- `git-procedures`: detailed Git workspace-isolation and merge/rebase
  conflict-resolution mechanics supporting `developer-delivery` 4c.
- `acceptance-test-builder`: builds or audits an explicit regression contract
  and boundary-ranked proof strategy, supporting `developer-delivery` 4b.
- `skill-doc-refresh`: bounded refresh of one Developer/platform skill's source
  map and durable guidance from repository and official-doc evidence.
- `astro`: Astro source, config, adapters, content collections, and build
  workflow guidance.
- `wordpress-router` and `wp-project-triage`: WordPress repository
  classification and routing.
- `wp-block-development`, `wp-block-themes`, `wordpress-block-theming`,
  `wp-plugin-development`, `wp-rest-api`, `wp-interactivity-api`,
  `wp-abilities-api`, `wp-abilities-audit`, `wp-abilities-verify`,
  `wp-phpstan`, `wp-playground`, `wp-plugin-directory-guidelines`, and `wpds`:
  WordPress code-development and repository specialist skills.

## Methodology Rule

Start in the real repository. Read repository instructions and manifests before
editing. Preserve unrelated dirty work. Make surgical changes. Define
acceptance criteria. Verify with project-native checks. Report failures, skipped
checks, and approval-gated next actions plainly.

## Expansion Roadmap

The Developer role is still being expanded beyond the core delivery loop. Track
remaining specialist surfaces and the proposed documentation-curation model in
`harness/roadmaps/developer-role-expansion.md`.

The documentation-curation model treats tools such as Context7 as refresh-time
evidence sources for skill/source-map maintenance, not as startup context or an
always-on dependency for every coding task.

Use `skill-doc-refresh` for a bounded stale-doc, version/API, or provider
behavior question. It updates one skill's compact source map and only
source-proven durable guidance; normal implementation work does not load live
documentation by default.
