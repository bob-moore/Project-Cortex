---
name: seo-foundation
description: "Use when an SEO task needs the canonical source hierarchy, evidence labels, approval boundaries, scoring policy, or cross-discipline handoff rules before audit, research, reporting, schema, local SEO, AI search, or content-brief work."
---

# SEO Foundation

Use this skill as the shared foundation for SEO work that needs evidence-safe
analysis, source labels, approval boundaries, and defensible handoffs.

This skill does not replace mode-specific SEO skills or future tool wrappers.
Apply it before SEO audits, reports, briefs, research, schema work, local SEO,
AI-search checks, programmatic SEO decisions, or drift monitoring. Apply
`seo-quality-gate` before claiming an SEO artifact is ready.

## Operating Contract

Start with vault context and evidence boundaries.

1. Identify the SEO mode from `.agents/disciplines/seo/modes.md`.
2. Identify the client, site, target market, environment, date range, and
   requested artifact from the prompt or nearby vault notes.
3. For client-specific work, read available Brand, Voice, Stack, project, and
   prior audit notes before interpreting findings.
4. Separate observed facts, first-party data, official docs, vendor data,
   third-party studies, heuristics, hypotheses, user-provided facts, and
   assumptions.
5. Check approval class before any external read, paid provider call, live
   crawl, external mutation, production change, or secret handling.
6. Do not promise rankings, traffic, indexing, revenue, or AI citations.

For tool-backed SEO work, read `.agents/tools/seo/README.md` and
`.agents/tools/seo/tool-registry.json` before selecting or running a CLI tool.

## Foundation Pass

Capture the working SEO contract in compact form:

```text
SEO mode:
Client/site:
Target market:
Environment:
Date range:
Evidence available:
Evidence missing:
Approval boundary:
Tool/provider assumptions:
Cross-discipline handoff:
Open risks:
```

## Source Hierarchy

Use the strongest available source for each claim:

1. Directly observed page, file, response, rendered DOM, or server log.
2. First-party data such as Search Console, GA4, CMS records, or owned exports.
3. Official platform documentation.
4. Vendor data or provider output.
5. Third-party studies and industry research.
6. Internal heuristics and scoring rules.
7. Hypotheses and assumptions.

Do not collapse weaker evidence into stronger language. Vendor metrics are
estimates unless the provider explicitly supplies measured first-party data.

## Evidence Labels

Use the labels from `.agents/disciplines/seo/modes.md`:

- `observed-page`
- `crawl-output`
- `first-party-data`
- `official-doc`
- `vendor-data`
- `third-party-study`
- `heuristic`
- `hypothesis`
- `user-provided`
- `assumed`

## Approval Boundaries

Allowed without further approval when scoped:

- read vault files
- inspect local source files
- summarize existing reports
- validate existing local artifacts
- create or update scoped harness notes

Requires the relevant approval gate:

- credentialed external reads
- paid provider calls
- live crawls with material cost, load, or client risk
- external mutations
- production or CMS changes
- redirect, robots, sitemap, schema, analytics, tracking, or deployment changes
- secret handling

## CLI Tool Contracts

Use `.agents/tools/seo/tool-registry.json` to select neutral CLI evidence
collectors before considering imported SEO scripts. Prefer mature tools for
their lane:

- `siteone-crawler` for broad technical crawl evidence.
- `unlighthouse` or `lighthouse` for lab performance and Lighthouse category
  evidence.
- `linkinator` or `lychee` for focused link validation.
- `html-validate` or `vnu` for HTML validation.
- `pa11y` for accessibility-adjacent page evidence.

Preserve raw output, normalize summaries to
`.agents/tools/seo/evidence-schema.json`, and keep limitations visible.

## Cross-Discipline Handoff

- Writing owns copy, articles, metadata prose, and content rewrites after SEO
  supplies evidence and requirements.
- Developer owns code changes.
- WordPress operator owns mutable WordPress state.
- Strategist owns positioning and roadmap decisions.
- Verifier owns readiness gates when independent closure is required.

## Output Rules

Return the SEO artifact plus compact working notes when uncertainty is material:

```text
SEO Notes:
- Mode:
- Evidence:
- Approval boundary:
- Assumptions:
- Handoff:
- Recommended quality gate:
```

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric
wins.
