# SEO Product Schema

## Invocation

- Canonical workflow: `seo-product-schema`

## Purpose

Audit Product, Offer, Review, AggregateRating, availability, identifier,
variant, and merchant structured-data facts against verified evidence.

## Required Context

- `.agents/workflows/seo-product-schema/contract.json`
- `.agents/skills/seo-product-schema/SKILL.md`
- `.agents/skills/seo-ecommerce-audit/SKILL.md`
- `.agents/skills/seo-quality-gate/SKILL.md`

## Workflow

1. Resolve catalog, product/variant scope, markets, currencies, date, and URLs.
2. Load first-party product, price, availability, identifier, review, feed,
   template, and approved validation evidence.
3. Ask before live page, validator, provider, or catalog reads.
4. Compare schema types/properties with visible and first-party facts.
5. Label observed, first-party, validator, provider, vendor-study, heuristic,
   and recommendation evidence.
6. Route fixes to Development/WordPress and facts to Commerce/Strategy.
7. Apply `seo-quality-gate` in `programmatic-seo` mode and save the artifact.

## Output

Use the contract's Product Schema format with Contract, Evidence Register,
Schema Findings, Priority Queue, and Quality Gate sections.

## Approval Gates

- `external_read`: ask before live page, validator, provider, or catalog reads.
- `provider_data`: paid or credentialed calls require approval.
- `vault_write`: save only to resolved context.
- `external_mutation`: schema, templates, CMS, code, feeds, and production changes are out of scope.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when required.
- No schema, template, CMS, code, feed, or production writes.

## Verification

- Product facts, schema properties, evidence, confidence, owners, and rechecks are explicit.
- No price, availability, review, rating, identifier, offer, or variant is invented.
- No rich-result, ranking, sales, traffic, or revenue guarantee is made.
- `seo-quality-gate` passes or is explicitly deferred.

## Return Format

Return **Done**, **Evidence**, **Open Items**, and **Next**.

## Related Roles

- `strategist`
- `developer`
- `wordpress-operator`
- `verifier`
