# SEO Collection Page Audit

## Invocation

- Canonical workflow: `seo-collection-page-audit`

## Purpose

Audit ecommerce collection/category pages for intent, assortment relevance,
information gain, unique value, pagination, filters, links, and template risk.

## Required Context

- `.agents/workflows/seo-collection-page-audit/contract.json`
- `.agents/skills/seo-collection-page-audit/SKILL.md`
- `.agents/skills/seo-ecommerce-audit/SKILL.md`
- `.agents/skills/seo-quality-gate/SKILL.md`

## Workflow

1. Resolve catalog, hierarchy, markets, query/page scope, platform, date, and
   template family.
2. Load product/collection data, keyword/SERP, crawl, analytics/GSC, links,
   filters, Brand, and merchandising evidence.
3. Ask before live provider, page, analytics, or catalog reads.
4. Assess intent, assortment, information gain, copy, pagination, filters,
   canonicals, links, conversion path, duplicate/thin risk, and purpose.
5. Label source, date, confidence, limits, and owner.
6. Route content to Writing, templates/code to Development, catalog decisions to
   Commerce/Strategy, and crawl controls to WordPress.
7. Apply `seo-quality-gate` in `programmatic-seo` mode and save the artifact.

## Output

Use the contract's Collection Page Audit format with Contract, Evidence
Register, Collection Findings, Priority Queue, and Quality Gate sections.

## Approval Gates

- `external_read`: ask before live provider, page, analytics, or catalog reads.
- `provider_data`: paid or credentialed calls require approval.
- `vault_write`: save only to resolved context.
- `external_mutation`: pages, filters, canonicals, URLs, CMS, code, and production changes are out of scope.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when required.
- No page, filter, canonical, URL, CMS, code, or production writes.

## Verification

- Catalog, hierarchy, template, source tiers, information gain, risks, owners, and rechecks are explicit.
- No product, assortment, price, inventory, or query demand is invented.
- Scaled recommendations have information-gain and business-purpose evidence.
- `seo-quality-gate` passes or is explicitly deferred.

## Return Format

Return **Done**, **Evidence**, **Open Items**, and **Next**.

## Related Roles

- `strategist`
- `writer`
- `developer`
- `wordpress-operator`
- `verifier`
