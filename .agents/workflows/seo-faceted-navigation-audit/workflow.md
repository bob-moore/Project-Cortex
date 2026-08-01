# SEO Faceted Navigation Audit

## Invocation

- Canonical workflow: `seo-faceted-navigation-audit`

## Purpose

Audit ecommerce facets, parameters, crawl paths, canonicals, indexation, links,
and crawl traps at explicit sample scope.

## Required Context

- `.agents/workflows/seo-faceted-navigation-audit/contract.json`
- `.agents/skills/seo-faceted-navigation-audit/SKILL.md`
- `.agents/skills/seo-ecommerce-audit/SKILL.md`
- `.agents/skills/seo-quality-gate/SKILL.md`

## Workflow

1. Resolve domain, platform, catalog, facet families, parameters, crawl caps,
   markets, date, and scope.
2. Load crawl, logs, GSC, analytics, sitemap, robots, canonical, links,
   templates, and catalog evidence.
3. Ask before live page, crawl, log, provider, or catalog reads.
4. Assess expansion, traps, duplicate/thin pages, indexability, canonicals,
   parameters, links, pagination, sitemap exposure, and demand.
5. Label source, sample, freshness, confidence, and limits.
6. Route controls to Development/WordPress, content to Writing, and catalog/facet
   decisions to Strategy/Commerce.
7. Apply `seo-quality-gate` in `programmatic-seo` mode and save the artifact.

## Output

Use the contract's Faceted Navigation Audit format with Contract, Evidence
Register, Facet Findings, Priority Queue, and Quality Gate sections.

## Approval Gates

- `external_read`: ask before live page, crawl, log, provider, or catalog reads.
- `provider_data`: paid or credentialed calls require approval.
- `vault_write`: save only to resolved context.
- `external_mutation`: robots, canonicals, parameters, sitemaps, CMS, code, and production changes are out of scope.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when required.
- No robots, canonicals, parameters, sitemaps, CMS, code, or production writes.

## Verification

- Domain, platform, facets, caps, sample, freshness, source tiers, risks, owners, and rechecks are explicit.
- Complete crawl/index behavior is not claimed from bounded samples.
- Mass indexation recommendations require information-gain and business-purpose evidence.
- `seo-quality-gate` passes or is explicitly deferred.

## Return Format

Return **Done**, **Evidence**, **Open Items**, and **Next**.

## Related Roles

- `strategist`
- `developer`
- `writer`
- `wordpress-operator`
- `verifier`
