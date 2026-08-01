# SEO Maps Audit

## Invocation

- Canonical workflow: `seo-maps-audit`

## Purpose

Audit approved Google Business Profile/Maps, local-pack, map visibility,
category, service-area, and geo-grid evidence without changing listings or
profiles.

## Required Context

- `harness/manual.md`, `harness/operator.md`, and `harness/user.md`
- `.agents/disciplines/seo/contract.json`, `modes.md`, and `rubric.md`
- `.agents/skills/seo-maps-audit/SKILL.md`
- `.agents/skills/seo-local-audit/SKILL.md`
- Client/project/prospect business records, locations, service areas, target
  queries, local pages, and approved maps/provider context

## Workflow

1. Resolve business locations, service areas, market, language, target queries,
   device, date, and map scope.
2. Load approved records, GBP/Maps exports, local SERP observations,
   DataForSEO/SE Ranking maps data, Bing Places/Webmaster data, and local audit
   context.
3. Check source availability and ask before live maps, listing, provider, or
   directory reads.
4. Assess identity, categories, hours, service areas, completeness, local-pack
   signals, query/location coverage, landing-page fit, reviews, and geo-grid
   limits.
5. Separate facts, first-party records, map observations, provider data,
   listings, heuristics, and recommendations.
6. Route profile/listing work to the owning operator, page/schema work to SEO or
   Development, and review operations to approved Strategy workflows.
7. Apply `seo-quality-gate` in `local-seo` mode.
8. Save the durable artifact using project/client/prospect routing and review
   frontmatter used by `seo-content-brief`.

## Approval Gates

- `external_read`: ask before live maps, listing, provider, or directory reads.
- `provider_data`: paid or credentialed calls require applicable approval.
- `vault_write`: save only to a resolved context when authorized.
- `external_mutation` and `production`: profiles, listings, reviews, citations,
  CMS, schema, code, and publishing are out of scope.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when review is required.
- No profile, listing, review, citation, CMS, schema, code, provider, or
  production writes.

## Verification

- Location, service-area, query, device, market, language, date, and scope are
  explicit.
- Source status, freshness, and provider/grid limits are recorded.
- Business facts and observations remain distinct.
- Map/local-pack signals have evidence and confidence.
- Landing-page fit and owners are explicit.
- No map-pack, ranking, call, lead, or revenue guarantee is made.
- `seo-quality-gate` passes or is explicitly deferred with an actionable reason.
- Changed Markdown/frontmatter and Home review registration are verified.

## Return Format

Return:

- **Done**: scope, source status, artifact, actions, and gate
- **Evidence**: locations, queries, observations, dates, and limits
- **Open Items**: approvals or verification needs
- **Next**: smallest listing, page, strategy, or verification action

## Related Roles

- `strategist`
- `verifier`
- `developer`
- `wordpress-operator`
