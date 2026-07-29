---
description: Canonical SEO discipline contract, modes, skill map, and quality gate.
tags:
  - harness
  - discipline
  - seo
---

# SEO Discipline

This directory is the canonical discipline layer for SEO.

The SEO discipline is not a crawler, vendor integration, Claude command pack,
or one-off checklist. It defines how SEO skills, future SEO workflows, tools,
source evidence, approval gates, and verification gates fit together.

## Discipline Rule

Separate four concepts:

- **Role**: a role performs bounded work such as strategy, writing,
  development, WordPress operation, or verification.
- **Workflow**: a bounded SEO task with inputs, approval gates, evidence
  outputs, done predicates, and return contract.
- **Skill**: reusable procedure, reference bundle, or quality gate.
- **Tool**: deterministic or provider-backed evidence collection.

Imported `.claude/skills/seo*`, `stash/Agentic-SEO-Skill`, `stash/codex-seo`,
and `stash/seo` are source material. They are not active canonical behavior
until this discipline maps them into a canonical skill, workflow, tool wrapper,
or reference file.

## Files

- `contract.json`: machine-readable discipline contract.
- `modes.md`: SEO modes and ownership boundaries.
- `skill-map.json`: disposition of existing SEO source material.
- `rubric.md`: canonical SEO quality gate.

## Current Canonical Skills

- `seo-foundation`: defines source hierarchy, evidence labels, approval
  boundaries, score limits, and cross-discipline handoff rules.
- `seo-quality-gate`: evaluates SEO findings, reports, briefs, or action queues
  against the canonical rubric before they are treated as ready.
- `seo-tool-runner`: selects, plans, and runs approved neutral CLI tools through
  `.agents/tools/seo/` contracts and evidence normalization rules.
- `seo-page-audit`: coordinates bounded single-page evidence collection and
  quality-gated findings through the page-audit workflow.
- `seo-technical-audit`: coordinates bounded site-level crawling, specialist
  checks, explicit limits, and quality-gated technical findings.
- `seo-site-audit`: composes the page, technical, sitemap, schema, image, and
  hreflang evidence passes into one bounded site evidence bundle.
- `seo-sitemap`, `seo-schema`, `seo-images`, and `seo-hreflang`: provide the
  Phase 3 deterministic structural gap checks and role handoffs.

## Methodology Rule

SEO findings must distinguish observed evidence from interpretation. Tool
output, official documentation, vendor data, third-party studies, internal
heuristics, and hypotheses must remain labeled separately.
