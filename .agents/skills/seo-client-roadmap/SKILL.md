---
name: seo-client-roadmap
description: "Produce a sequenced client roadmap from approved SEO evidence with source labels, limitations, next actions, and no unsupported business claims."
---

# SEO Client Roadmap

Produce a sequenced client roadmap from approved evidence. Markdown is the source of truth; optional HTML/PDF is presentation only.

## Operating Contract

1. Resolve client/project/site, reporting period, market/language/device, included workflows, approved evidence bundle, output path, and neutral or client-brand mode.
2. Preserve source labels, dates, freshness, credential/tool/access status, skipped sections, partial states, and limitations.
3. Ask before live reads, external provider calls, or mutations; report generation does not fetch data by implication.
4. Separate observed facts, interpretation, recommendations, assumptions, and unknowns.
5. Route actions to explicit owners with evidence, dependency, approval, risk, and recheck fields.
6. Apply `seo-quality-gate` in `reporting` mode.

## Required Checks

- outcomes, phases, dependencies, owners, approvals, evidence prerequisites, rechecks, definition of done, and status.
- Neutral or client-branded language; no imported promotional language.
- No ranking, traffic, leads, revenue, rich-result, or recovery guarantee.
- No invented data, dates, budgets, staffing, approvals, sources, freshness, or outcomes.

## Output

```text
# SEO Client Roadmap: [Client/Project]
## Report Contract
- Period/scope/market/language/device/brand mode/evidence cutoff:
## Executive Or Decision Context
- ...
## Evidence Register
| Claim/finding | Source tier | Source/date | Confidence | Limitation |
## Findings / Actions / Roadmap / Scorecard
| Item | Evidence | Owner | Status | Recheck |
## Limitations And Skipped Sections
- ...
## Next Actions
- ...
## Quality Gate
- Verdict:
- Open items:
```

## Boundaries

- Do not invent metrics, findings, sources, dates, approvals, owners, budgets, delivery commitments, business outcomes, or completed work.
- Do not silently omit unavailable, stale, partial, or blocked evidence.
- Do not mutate CMS, analytics, providers, code, SEO, or production.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric wins.
