# SEO Ecommerce Audit

## Invocation

- Canonical workflow: `seo-ecommerce-audit`

## Purpose

Audit ecommerce product, collection, marketplace, inventory, pricing, review,
template, and indexability evidence without catalog or production mutation.

## Required Context

- `.agents/workflows/seo-ecommerce-audit/contract.json`
- `.agents/skills/seo-ecommerce-audit/SKILL.md`
- `.agents/skills/seo-quality-gate/SKILL.md`
- Client/project/prospect commerce model, catalog, platform, templates,
  markets, feeds, analytics, GSC, schema, reviews, Brand, and approved research

## Workflow

1. Resolve commerce model, catalog scope, markets, languages, currencies,
   inventory/pricing rules, platform, date, and URL set.
2. Load approved catalog, templates, analytics/GSC, crawl, schema, review, feed,
   Brand, and marketplace evidence.
3. Ask before live provider, marketplace, page, analytics, or catalog reads.
4. Assess product/collection intent, indexability, canonicals, pagination,
   variants, availability, pricing, reviews, schema, links, filters, duplicate/
   thin risk, and conversion handoffs.
5. Label facts, first-party, provider, marketplace, vendor-study, heuristic,
   and recommendation evidence.
6. Route schema/code to Development, copy to Writing, commerce decisions to
   Strategy/Commerce, and template/crawl work to WordPress.
7. Apply `seo-quality-gate` in `programmatic-seo` mode and save the artifact.

## Output

Use the contract's Ecommerce Audit format with Contract, Evidence Register,
Product And Collection Findings, Priority Queue, and Quality Gate sections.

## Approval Gates

- `external_read`: ask before live provider, marketplace, page, analytics, or catalog reads.
- `provider_data`: paid or credentialed calls require approval.
- `vault_write`: save only to resolved context.
- `external_mutation`: catalog, feed, schema, canonical, URL, CMS, code, and production changes are out of scope.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when required.
- No catalog, feed, schema, canonical, URL, CMS, code, or production writes.

## Verification

- Commerce scope, source tiers, freshness, facts, risks, owners, and rechecks are explicit.
- Inventory, pricing, reviews, offers, and marketplace facts are not invented.
- Scaled-page recommendations require programmatic quality-gate evidence.
- No rich-result, ranking, sales, traffic, or revenue guarantee is made.
- `seo-quality-gate` passes or is explicitly deferred.

## Return Format

Return **Done**, **Evidence**, **Open Items**, and **Next**.

## Related Roles

- `strategist`
- `writer`
- `developer`
- `wordpress-operator`
- `verifier`
