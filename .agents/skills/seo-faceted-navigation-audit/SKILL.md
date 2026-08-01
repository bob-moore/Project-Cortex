---
name: seo-faceted-navigation-audit
description: "Use when auditing ecommerce facets, filters, parameters, crawl paths, canonicals, indexation, and crawl traps."
---

# SEO Faceted Navigation Audit

Audit faceted navigation and URL parameter behavior at bounded sample scope.
No robots, canonicals, CMS, code, or production changes.

## Operating Contract

1. Resolve domain, platform, catalog, facet families, URL parameters, crawl
   caps, markets, date, and scope.
2. Load approved crawl, logs, GSC, analytics, sitemap, robots, canonical,
   internal-link, template, and catalog evidence.
3. Ask before live page, crawl, log, provider, or catalog reads.
4. Assess combinatorial expansion, crawl traps, duplicate/thin pages,
   indexability, canonicals, parameter handling, internal links, pagination,
   sitemap exposure, and legitimate search demand.
5. Label source, sample, freshness, confidence, and limits.
6. Route crawl controls to Development/WordPress, content decisions to Writing,
   and catalog/facet decisions to Strategy/Commerce.
7. Apply `seo-quality-gate` in `programmatic-seo` mode.

## Output

```text
# SEO Faceted Navigation Audit: [Context]
## Contract
- Domain/platform/catalog/facets/caps/date/scope:
## Evidence Register
| Finding | Source tier | Source/date/sample | Confidence | Limitation |
## Facet Findings
| Facet/parameter | Expansion | Crawl/index state | Duplicate/thin risk | Action |
## Priority Queue
| Priority | Action | Owner | Evidence | Recheck |
## Quality Gate
- Verdict:
- Blocking findings:
- Recheck method:
```

## Boundaries

- Do not infer complete crawl or index behavior from an unbounded sample.
- Do not invent demand, crawl data, URLs, or search value.
- Do not change robots, canonicals, parameters, sitemaps, CMS, code, or production.
- Do not recommend mass indexation without information gain and business purpose.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric wins.
