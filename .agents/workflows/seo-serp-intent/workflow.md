# SEO SERP Intent

## Invocation

- Canonical workflow: `seo-serp-intent`
- Runtime adapters may expose this as `/seo-serp-intent`, `seo-serp-intent`, or
  another runtime-native trigger.

## Purpose

Analyze a bounded query set and its search-result pages to classify intent,
understand SERP composition, evaluate existing-page fit, and recommend page or
content types. Ranking-page inspection is included in the approved SERP-intent
run and does not require a separate competitor-analysis approval.

## Required Context

- `harness/manual.md`, `harness/operator.md`, and `harness/user.md`
- `.agents/disciplines/seo/contract.json`, `modes.md`, and `rubric.md`
- `.agents/skills/seo-foundation/SKILL.md`
- `.agents/skills/seo-serp-intent/SKILL.md`
- `.agents/skills/seo-keyword-research/SKILL.md` when a keyword artifact exists
- Client/project/prospect onboarding, Brand, Voice, Stack, website, audience,
  market, and relevant content context

## Workflow

1. Resolve the client/project/prospect, domain, query set, market, location,
   language, device, search engine, date, and freshness target.
2. Use the approved `seo-keyword-research` artifact when available. Otherwise
   accept a User-provided query set or bounded seed-derived set.
3. Run a bounded availability check for DataForSEO, SE Ranking, Google/Bing
   observation, and User-provided SERP exports.
4. Use only approved integration/tool surfaces. Do not reveal credentials,
   install, authenticate, purchase, or mutate anything.
5. Ask for normal `external_read` approval before live SERP observation. Once
   approved, read ranking-page content as part of this workflow; do not ask for
   a second competitor-analysis approval.
6. Record query, source, timestamp, market, location, language, device, search
   engine, result depth, personalization/localization limits, and provider
   status.
7. Classify intent from result composition: informational, commercial
   investigation, transactional, navigational, local/service-area,
   support/post-purchase, or mixed.
8. Record result/page types, SERP features, local/map signals, freshness,
   commercial signals, result overlap, content angle, and page-type expectation.
9. Compare the target domain and existing pages against observed intent.
10. Recommend page/content type and route the handoff to
    `seo-content-brief`, `seo-content-audit`, or `seo-strategy-roadmap`.
11. Apply `seo-quality-gate` in `keyword-research` mode.
12. Save the durable artifact using the project/client/prospect routing and
    review frontmatter used by `seo-content-brief`.

## Approval Gates

- `external_read`: ask before live SERP observation or ranking-page reads.
- `provider_data`: paid or credentialed calls require applicable approval;
  availability checks remain bounded and read-only.
- `vault_write`: save only to a resolved context when authorized.
- `external_mutation` and `production`: out of scope.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when the artifact requires User inspection.
- No provider configuration, CMS, repository, production, or publishing writes.

## Verification

- Query set, client context, domain, market, location, language, device, search
  engine, date, and result depth are explicit.
- Provider status is recorded for each declared source.
- Live SERP and ranking-page reads had external-read approval.
- Intent is based on observed SERP composition, not query text alone.
- Result types, SERP features, local/freshness signals, and overlap are labeled.
- Existing-page fit and recommended page type are explicit.
- Observations, provider data, heuristics, hypotheses, and recommendations are
  distinct.
- No ranking, traffic, revenue, conversion, or AI-visibility guarantee is made.
- `seo-quality-gate` passes or is explicitly deferred with an actionable reason.
- Changed Markdown/frontmatter and Home review registration are verified.

## Return Format

Return:

- **Done**: scope, provider statuses, artifact path, recommendations, and gate
- **Evidence**: queries, sources, timestamps, SERP observations, and limits
- **Open Items**: approvals or User decisions before the next handoff
- **Next**: the smallest content-brief, content-audit, or strategy action

## Related Roles

- `strategist`
- `writer`
- `verifier`
