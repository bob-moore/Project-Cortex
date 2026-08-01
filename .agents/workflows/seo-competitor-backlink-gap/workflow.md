# SEO Competitor Backlink Comparison

## Invocation

- Canonical workflow: `seo-competitor-backlink-gap`
- Runtime adapters may expose this as `/seo-competitor-backlink-gap`,
  `seo-competitor-backlink-gap`, or another runtime-native trigger.

## Purpose

Compare a target domain with explicitly selected competitors using approved
backlink/provider evidence. Identify shared, competitor-only, and target-only
patterns and route plausible opportunities to link-building planning. This
workflow does not contact competitors, publishers, or acquire links.

## Required Context

- `harness/manual.md`, `harness/operator.md`, and `harness/user.md`
- `.agents/disciplines/seo/contract.json`, `modes.md`, and `rubric.md`
- `.agents/skills/seo-competitor-backlink-gap/SKILL.md`
- `.agents/skills/seo-backlink-audit/SKILL.md`
- `.agents/skills/seo-link-building-opportunities/SKILL.md`
- Client/project/prospect Brand, Voice, Stack, domain, target pages, market,
  business goal, and explicitly approved competitor context

## Workflow

1. Resolve target domain, explicitly named competitors, client/project/prospect,
   market, target pages, date range, and comparison scope.
2. Ask before live competitor/provider reads unless the User explicitly approved
   this comparison in the current workflow.
3. Check availability of DataForSEO, Moz, Bing Webmaster, Common Crawl,
   first-party exports, and manual/source evidence.
4. Record each domain, source, collection date, index freshness, scope, sample
   limits, and provider methodology when known.
5. Compare referring domains, backlink types, target pages, anchor patterns,
   topical relevance, link context, and linkable asset patterns.
6. Separate shared patterns from competitor-only observations and hypotheses.
   Provider metrics do not prove editorial value or ranking advantage.
7. Prioritize opportunities by relevance, audience value, editorial plausibility,
   target-page usefulness, evidence strength, effort, risk, and relationship
   readiness.
8. Route opportunities to `seo-link-building-opportunities`, assets to
   Writing/Design, and reclaim candidates to `seo-link-reclaim`.
9. Apply `seo-quality-gate` in `reporting` mode.
10. Save the durable artifact using project/client/prospect routing and review
    frontmatter used by `seo-content-brief`.

## Approval Gates

- `external_read`: ask before live competitor/provider, Common Crawl, publisher,
  or external page reads unless explicitly approved in the current workflow.
- `provider_data`: paid or credentialed calls require applicable approval.
- `vault_write`: save only to a resolved context when authorized.
- `outreach`: out of scope; contact or pitch actions require a separate approved
  workflow.
- `external_mutation` and `production`: out of scope.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when the artifact requires User inspection.
- No competitor contact, outreach, link acquisition, CMS, code, publishing,
  provider, or production writes.

## Verification

- Target and competitors are explicitly named and comparison scope is clear.
- Provider status, freshness, source, and sample limits are recorded.
- Shared and distinct patterns are source-labeled.
- Provider metrics are not treated as complete or causal ranking evidence.
- Opportunities have relevance, destination, evidence, effort, risk, and owner.
- No competitor scraping/contact, copied assets, spam, paid-link, exchange,
  private-network, or guaranteed-outcome recommendation is present.
- `seo-quality-gate` passes or is explicitly deferred with an actionable reason.
- Changed Markdown/frontmatter and Home review registration are verified.

## Return Format

Return:

- **Done**: scope, provider statuses, artifact path, comparison, and gate
- **Evidence**: domains, sources, dates, patterns, samples, and limitations
- **Open Items**: approvals, assumptions, or verification needs
- **Next**: smallest opportunity, asset, or strategy handoff

## Related Roles

- `strategist`
- `verifier`
- `writer`
- `designer`
