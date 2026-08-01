---
name: seo-collection-page-audit
description: "Use when auditing ecommerce collection/category pages for intent fit, merchandising value, information gain, duplicate/thin risk, pagination, and template quality."
---

# SEO Collection Page Audit

Audit collection and category templates for search usefulness and legitimate
commerce purpose. No page generation or CMS changes.

## Operating Contract

1. Resolve catalog, collection hierarchy, markets, query/page scope, platform,
   date, and template family.
2. Load approved product/collection data, keyword/SERP, crawl, analytics/GSC,
   internal links, filters, Brand, and merchandising evidence.
3. Ask before live provider, page, analytics, or catalog reads.
4. Assess intent/page fit, assortment relevance, information gain, unique copy,
   pagination, filters, canonicals, internal links, conversion path, duplicate/
   thin risk, and business purpose.
5. Label source, date, confidence, limits, and owner.
6. Route content to Writing, template/code to Development, catalog decisions to
   Commerce/Strategy, and crawl controls to WordPress.
7. Apply `seo-quality-gate` in `programmatic-seo` mode.

## Output

```text
# SEO Collection Page Audit: [Context]
## Contract
- Catalog/hierarchy/markets/platform/date/scope:
## Evidence Register
| Finding | Source tier | Source/date | Confidence | Limitation |
## Collection Findings
| URL/template | Intent/assortment | Information gain | Duplication/thinness | Action |
## Priority Queue
| Priority | Action | Owner | Evidence | Recheck |
## Quality Gate
- Verdict:
- Blocking findings:
- Recheck method:
```

## Boundaries

- Do not invent products, assortment, price, inventory, or query demand.
- Do not recommend scaled pages without information-gain and business-purpose evidence.
- Do not change pages, filters, canonicals, URLs, CMS, code, or production.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric wins.
