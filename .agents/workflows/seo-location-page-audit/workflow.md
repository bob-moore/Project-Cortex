# SEO Location Page Audit

## Invocation

- Canonical workflow: `seo-location-page-audit`

## Purpose

Audit location and service-area pages for useful local value, legitimate business
purpose, intent fit, facts, internal links, schema evidence, and doorway risk.
No page, CMS, schema, code, or production mutation occurs.

## Required Context

- `.agents/workflows/seo-location-page-audit/contract.json`
- `.agents/skills/seo-location-page-audit/SKILL.md`
- `.agents/skills/seo-local-audit/SKILL.md`
- `.agents/skills/seo-content-audit/SKILL.md`
- `.agents/skills/seo-quality-gate/SKILL.md`
- Client/project/prospect business records, locations, service areas, pages,
  Brand context, local evidence, and approved query scope

## Workflow

1. Resolve business type, locations, service areas, market, language, URL/query
   scope, and audit date.
2. Load business records, local/maps/citation/review artifacts, crawl evidence,
   page content, internal links, analytics/GSC, and Brand context.
3. Ask before live external provider or page reads.
4. Assess fact accuracy, unique local usefulness, service-area intent, business
   purpose, query/page fit, content quality, links, conversion paths, schema,
   duplication, thinness, and doorway risk.
5. Label source, date, evidence type, confidence, and limitations.
6. Recommend keep, improve, merge, redirect-review, noindex-review, or
   retire-review only with evidence and owner; do not make changes.
7. Route copy to Writing, schema/code to Development, URL/CMS actions to
   WordPress, and business decisions to Strategy.
8. Apply `seo-quality-gate` in `local-seo` mode and save the routed artifact.

## Approval Gates

- `external_read`: ask before live external provider or page reads.
- `provider_data`: paid or credentialed calls require approval.
- `vault_write`: save only to resolved context.
- `external_mutation`: URL, redirect, canonical, indexability, schema, CMS,
  code, copy, and production changes are out of scope.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when required.
- No URL, redirect, canonical, indexability, schema, CMS, code, copy, or
  production writes.

## Verification

- Business type, locations, service areas, market, language, scope, date, and
  page set are explicit.
- Facts, evidence, unique value, intent fit, duplication/thinness, and doorway
  risk are distinct and source-labeled.
- Recommendations have evidence, owner, and recheck.
- Copy, schema, CMS, Development, Writing, and Strategy handoffs are explicit.
- No doorway-page, mutation, or outcome guarantee is made.
- `seo-quality-gate` passes or is explicitly deferred.

## Return Format

Return **Done**, **Evidence**, **Open Items**, and **Next**.

## Related Roles

- `strategist`
- `writer`
- `verifier`
- `developer`
- `wordpress-operator`
