# SEO Local Audit

## Invocation

- Canonical workflow: `seo-local-audit`
- Runtime adapters may expose this as `/seo-local-audit`, `seo-local-audit`, or
  another runtime-native trigger.

## Purpose

Audit local search readiness for local businesses, service-area businesses,
brick-and-mortar locations, and hybrid organizations. Distinguish website facts,
first-party business records, provider observations, third-party listings,
and recommendations.

## Required Context

- `harness/manual.md`, `harness/operator.md`, and `harness/user.md`
- `.agents/disciplines/seo/contract.json`, `modes.md`, and `rubric.md`
- `.agents/skills/seo-local-audit/SKILL.md`
- `.agents/skills/seo-quality-gate/SKILL.md`
- Client/project/prospect Brand, Voice, Stack, website, business records,
  locations, service areas, local pages, and approved local research

## Workflow

1. Resolve client/project/prospect, business type, primary locations, service
   areas, market, language, target pages, and audit date.
2. Load approved Brand, Stack, website, Google Business Profile/Maps exports,
   first-party business records, review/citation records, and local keyword/SERP
   evidence.
3. Check availability of Google Business Profile/Maps, GSC, GA4, DataForSEO,
   SE Ranking, Bing Places/Webmaster, approved directories, and manual
   observation.
4. Ask before live external provider, maps, listing, review, or directory
   reads. Do not change listings, profiles, citations, reviews, CMS, code, or
   production.
5. Assess identity, NAP, hours, service areas, category alignment, local intent,
   location-page fit, local schema facts, review signals, citations, internal
   links, and conversion paths.
6. Separate confirmed business facts, first-party data, provider observations,
   third-party listing data, heuristics, and recommendations.
7. Route listing/profile work to the owning operator, page work to SEO/Writing,
   schema/code to Development, and review operations to Strategy/approved
   customer-operations workflows.
8. Apply `seo-quality-gate` in `local-seo` mode.
9. Save the durable artifact using project/client/prospect routing and review
   frontmatter used by `seo-content-brief`.

## Approval Gates

- `external_read`: ask before live provider, maps, listing, review, or directory
  reads.
- `provider_data`: paid or credentialed calls require applicable approval.
- `vault_write`: save only to a resolved context when authorized.
- `external_mutation` and `production`: listings, profiles, reviews, citations,
  CMS, code, schema, and publishing are out of scope.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when the artifact requires User inspection.
- No listing, profile, review, citation, CMS, code, schema, provider, or
  production writes.

## Verification

- Business type, locations, service areas, market, language, pages, date, and
  scope are explicit.
- Source status, freshness, and evidence labels are recorded.
- NAP and business facts are not invented or silently normalized.
- Website facts, first-party records, provider observations, and third-party
  listings remain distinct.
- Local intent, page fit, review/citation observations, and actions are explicit.
- No local ranking, map-pack, call, lead, or revenue guarantee is made.
- `seo-quality-gate` passes or is explicitly deferred with an actionable reason.
- Changed Markdown/frontmatter and Home review registration are verified.

## Return Format

Return:

- **Done**: scope, source status, artifact path, findings, and gate
- **Evidence**: locations, records, listings, dates, observations, and limits
- **Open Items**: approvals, assumptions, or verification needs
- **Next**: smallest listing, page, strategy, or verification action

## Related Roles

- `strategist`
- `verifier`
- `writer`
- `developer`
- `wordpress-operator`
