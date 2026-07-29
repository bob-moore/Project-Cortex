---
description: Deferred harness capabilities and maturity checkpoints.
tags:
  - harness
  - roadmap
---

# Roadmap

This note tracks deferred architecture work that should remain visible but is
not part of the current operating contract.

## Deferred Architecture

### SEO Discipline And Tool Suite

Status: planned

SEO is a primary vault capability. Track the full rebuild in
`harness/roadmaps/seo.md` and the source-package inventory in
`harness/audits/seo-skill-inventory.md`.

The rebuild should preserve the full SEO suite: technical/site/page audits,
backlinks and link-building, local/maps, schema, sitemap, performance, content
briefs, keyword/SERP research, GEO/AEO/SXO, ecommerce, programmatic SEO,
Google/DataForSEO integrations, drift monitoring, and reporting.

Do not install any imported SEO package wholesale. Use mature neutral tools
where they fit, and port missing capabilities one at a time through canonical
discipline, workflow, skill, and tool contracts.

### Runtime-Neutral Dispatcher

Status: deferred

Review trigger:

- After 2026-10-28, or
- after 30 meaningful workflow dispatches are logged in
  `harness/ledgers/dispatch.tsv`, or
- when the operator explicitly asks to revisit automation.

Intent:

Build a harder dispatcher that resolves workflow matches, chooses runtime and
role, applies approval/budget/trust policy, dispatches bounded work orders, and
requires independent verification before closure.

Current state:

- `.agents/loop/` is scaffold-only.
- `node .agents/loop/loop.mjs --dry-run` may run preflight checks.
- Non-dry-run loop execution is intentionally disabled.
- Native runtime subagents, profiles, or cheaper-model workers are not part of
  the active methodology.

Maturity criteria before implementation:

- The workflow registry has been used in normal work long enough to reveal real
  routing patterns.
- `harness/ledgers/dispatch.tsv` contains enough examples to identify common
  workflows, approval classes, failure modes, and verification needs.
- The trust ledger distinguishes workflows, skills, roles, and adapters with
  useful pass/fail history.
- The budget policy has an operator-approved cap for automated runs.
- Alarm runbooks cover workflow mismatch, failed verification, budget breach,
  adapter drift, and loop preflight failure.
- The dispatcher can be tested in dry-run mode against prior dispatch ledger
  entries before it can execute live work.

Non-goals:

- Do not recreate Claude-specific subagent architecture as the source of truth.
- Do not enable unattended mutation.
- Do not let model cost optimization override workflow contracts, approval
  policy, or verification.
