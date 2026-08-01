---
name: seo-product-schema
description: "Use when auditing product, offer, review, aggregate rating, availability, variant, and merchant schema against verified ecommerce facts."
---

# SEO Product Schema

Audit structured-data facts and validation evidence. No markup or production edits.

## Operating Contract

1. Resolve catalog, product/variant scope, markets, currencies, date, and URLs.
2. Load first-party product, price, availability, identifier, review, feed,
   template, and approved validation evidence.
3. Ask before live page, validator, provider, or catalog reads.
4. Compare Product, Offer, AggregateRating, Review, Organization, Breadcrumb,
   and variant facts with visible/first-party facts.
5. Label observed, first-party, validator, provider, vendor-study, heuristic,
   and recommendation evidence.
6. Route fixes to Development/WordPress and product facts to Commerce/Strategy.
7. Apply `seo-quality-gate` in `programmatic-seo` mode.

## Output

```text
# SEO Product Schema: [Context]
## Contract
- Catalog/markets/currencies/date/scope:
## Evidence Register
| Finding | Source tier | Source/date | Confidence | Limitation |
## Schema Findings
| URL/product | Type/property | Expected fact | Observed fact | Evidence | Action |
## Priority Queue
| Priority | Action | Owner | Evidence | Recheck |
## Quality Gate
- Verdict:
- Blocking findings:
- Recheck method:
```

## Boundaries

- Do not invent price, availability, reviews, ratings, identifiers, offers, or variants.
- Do not promise rich results, rankings, sales, traffic, or revenue.
- Do not edit schema, templates, CMS, code, feeds, or production.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric wins.
