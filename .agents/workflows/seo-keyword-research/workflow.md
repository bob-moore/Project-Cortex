# SEO Keyword Research

## Invocation

- Canonical workflow: `seo-keyword-research`
- Runtime adapters may expose this as `/seo-keyword-research`,
  `seo-keyword-research`, or another runtime-native trigger.

## Purpose

Create a source-labeled keyword, intent, cluster, and opportunity artifact for
SEO strategy and content planning. The workflow reuses the marketing
keyword-research-and-clustering method while applying the canonical SEO evidence
and approval contract.

## Required Context

- `harness/manual.md`, `harness/operator.md`, and `harness/user.md`
- `.agents/disciplines/seo/contract.json`, `modes.md`, and `rubric.md`
- `.agents/skills/seo-foundation/SKILL.md`
- `.agents/skills/seo-keyword-research/SKILL.md`
- `.agents/skills/keyword-research-and-clustering/SKILL.md`
- Client/project/prospect onboarding, Brand, Voice, Stack, website, audience,
  market, offer, and prior content context

## Workflow

1. Resolve the client, project, or prospect and the approved output context.
2. Capture domain or page, audience, offer, business goal, desired action,
   market/geography, language, device, research date, and seed topics.
3. Run the bounded provider-availability check against the approved integration
   surface for GA4, Google Search Console, Google Keyword Planner, DataForSEO,
   SE Ranking, and any other User-declared provider. Include manual/search
   observation and competitor analysis as explicit source options.
4. Do not reveal secrets or probe arbitrary files, credentials, endpoints, or
   undeclared services. Do not install, authenticate, purchase, or mutate.
5. Use available approved sources. DataForSEO and SE Ranking remain in the
   canonical provider matrix whether or not they are connected for this run.
6. Ask before current external SERP observation or competitor-page analysis.
7. Expand seeds from approved sources, remove terms outside the offer/audience,
   cluster related terms, classify search intent, map funnel stage, and assign
   a content/page role.
8. Prioritize by business relevance, intent/conversion fit, audience need,
   strategic importance, demand evidence, feasibility, then provider estimates.
9. Preserve source type, collection date, market, language, device, freshness,
   and limitations for each material result.
10. Hand page/content opportunities to `seo-content-brief`; hand final copy to
    the Writing discipline. Do not write final metadata or prose.
11. Apply `seo-quality-gate` in `keyword-research` mode.
12. Save the durable artifact using the same project/client/prospect routing and
    review frontmatter as `seo-content-brief`.

## Approval Gates

- `external_read`: ask before live SERP, competitor-page, or external source
  observation.
- `provider_data`: paid or credentialed provider calls require applicable
  approval; availability checks must be read-only and bounded.
- `vault_write`: save only to a resolved context when authorized.
- `external_mutation` and `production`: out of scope.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when the artifact requires User inspection.
- No provider configuration, CMS, repository, production, or publishing writes.

## Verification

- Client/project/prospect, domain/page, market, language, device, date, goal,
  and seed scope are explicit.
- Provider status is recorded for each declared source.
- Data source labels distinguish first-party data, provider estimates, manual
  observations, competitor evidence, heuristics, hypotheses, and assumptions.
- Volume, difficulty, CPC, traffic, rankings, and SERP observations are not
  presented as exact truth.
- Search intent is distinct from funnel stage and business objective.
- Clusters have primary topic, supporting queries, recommended role, and
  priority rationale.
- Competitor analysis was approved before external reading.
- Handoff to SEO content brief, Writing, and Strategy is explicit.
- No final copy, metadata prose, publishing, CMS, code, or production mutation
  was performed.
- `seo-quality-gate` passes or is explicitly deferred with an actionable reason.
- Changed Markdown/frontmatter and Home review registration are verified.

## Return Format

Return:

- **Done**: research scope, provider statuses, artifact path, and gate state
- **Evidence**: sources, dates, market/device, observations, and limitations
- **Open Items**: approvals or User decisions before the next handoff
- **Next**: the smallest content-brief, Writing, or strategy action

## Related Roles

- `strategist`
- `writer`
- `verifier`
