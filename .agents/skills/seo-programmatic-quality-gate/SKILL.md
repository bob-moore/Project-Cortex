---
name: seo-programmatic-quality-gate
description: "Use before approving scaled SEO pages, templates, facets, collections, locations, or product expansions to block thin, duplicate, doorway, low-information, or unsupported programmatic recommendations."
---

# SEO Programmatic Quality Gate

Block scaled SEO recommendations unless the proposed template family has
verified business purpose, information gain, uniqueness, evidence, crawl/index
safety, and owner approval.

## Operating Contract

1. Resolve project, template family, page count/range, data source, markets,
   query evidence, business purpose, owners, and launch/prune scope.
2. Load approved sample pages/data, keyword/SERP, content, ecommerce/local,
   technical, schema, analytics/GSC, and prior audit artifacts.
3. Require a bounded representative sample before any scale recommendation.
4. Check unique value, information gain, factual completeness, intent fit,
   template variance, duplicate/thin risk, doorway risk, internal links,
   canonical/indexability controls, rendering, conversion purpose, maintenance,
   and rollback/prune plan.
5. Label every claim and record blocked evidence, assumptions, and limits.
6. Return `PASS`, `PASS_WITH_CONDITIONS`, `BLOCK`, or `DEFERRED` with explicit
   conditions and recheck method.
7. Apply `seo-quality-gate` in `programmatic-seo` mode.

## Output

```text
# SEO Programmatic Quality Gate: [Context]
## Contract
- Template family/page range/data source/market/scope:
## Evidence Register
| Claim/finding | Source tier | Source/date/sample | Confidence | Limitation |
## Gate Checks
| Check | Evidence | Result | Blocking reason/condition |
## Verdict
- PASS / PASS_WITH_CONDITIONS / BLOCK / DEFERRED:
- Conditions:
- Required approvals:
- Recheck method:
## Handoffs
| Action | Owner | Evidence | Recheck |
```

## Blocking Rules

- Block without representative samples.
- Block thin, duplicate, doorway, fabricated, or unsupported pages.
- Block when information gain or business purpose is absent.
- Block when facts, inventory, pricing, locations, products, or query demand are
  invented or unverified.
- Block when crawl/indexation, canonical, rendering, or rollback controls are
  unknown for the proposed scale.
- Never generate pages, publish content, change templates, or mutate production.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric wins.
