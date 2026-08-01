---
name: seo-action-plan
description: "Produce a evidence-backed prioritized action plan from approved SEO evidence with source labels, limitations, next actions, and no unsupported business claims."
---

# SEO Action Plan

Produce a evidence-backed prioritized action plan from approved evidence. Markdown is the source of truth; optional HTML/PDF is presentation only.

## Operating Contract

1. Resolve client/project/site, reporting period, market/language/device, included workflows, approved evidence bundle, output path, and neutral or client-brand mode.
2. Preserve source labels, dates, freshness, credential/tool/access status, skipped sections, partial states, and limitations.
3. Ask before live reads, external provider calls, or mutations; report generation does not fetch data by implication.
4. Separate observed facts, interpretation, recommendations, assumptions, and unknowns.
5. Route actions to explicit owners with evidence, dependency, approval, risk, and recheck fields.
6. Apply `seo-quality-gate` in `reporting` mode.

## Required Checks

- finding links, priority, owner, rationale, dependency, approval, risk, verification, status, and target-date discipline.
- Neutral or client-branded language; no imported promotional language.
- No ranking, traffic, leads, revenue, rich-result, or recovery guarantee.
- No invented data, dates, budgets, staffing, approvals, sources, freshness, or outcomes.

## Output

```text
# SEO Action Plan: [Client/Project]
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
