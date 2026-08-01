# SEO Backlink Audit

## Invocation

- Canonical workflow: `seo-backlink-audit`
- Runtime adapters may expose this as `/seo-backlink-audit`,
  `seo-backlink-audit`, or another runtime-native trigger.

## Purpose

Audit a bounded external-link profile and produce source-labeled findings about
referring domains, backlinks, anchor text, placements, link attributes,
relevance, freshness, quality signals, and reclaim candidates. This workflow
never buys links, contacts publishers, changes disavowals, or mutates
production.

## Required Context

- `harness/manual.md`, `harness/operator.md`, and `harness/user.md`
- `.agents/disciplines/seo/contract.json`, `modes.md`, and `rubric.md`
- `.agents/skills/seo-backlink-audit/SKILL.md`
- `.agents/skills/seo-quality-gate/SKILL.md`
- Client/project/prospect Brand, Voice, Stack, domain, target pages, market,
  business goals, and approved provider context

## Workflow

1. Resolve client/project/prospect, domain, target pages, market, date range,
   provider scope, and audit date.
2. Run bounded availability checks for DataForSEO, Moz, Bing Webmaster, Common
   Crawl, first-party exports, and manual/source evidence.
3. Use only approved integration/tool surfaces. Do not reveal credentials,
   install, authenticate, purchase, or mutate.
4. Record metrics with source, collection date, index freshness, scope, sample
   limits, and provider methodology when known.
5. Classify links by target, source domain/page, placement, follow/nofollow or
   equivalent attributes, anchor, topical relationship, geography,
   brand/entity relationship, and observed status.
6. Separate confirmed observations, provider estimates, crawl evidence,
   third-party studies, heuristics, hypotheses, and recommendations.
7. Assess relevance, editorial context, placement, destination fit, diversity,
   anchor distribution, suspicious patterns, lost/broken signals, and reclaim
   candidates. A provider score alone is not a toxic-link finding.
8. Route acquisition opportunities to `seo-link-building-opportunities`,
   competitor comparisons to `seo-competitor-backlink-gap`, and recoverable
   links to `seo-link-reclaim`.
9. Apply `seo-quality-gate` in `reporting` mode.
10. Save the durable artifact using project/client/prospect routing and review
    frontmatter used by `seo-content-brief`.

## Approval Gates

- `external_read`: ask before live provider, Common Crawl, or external page
  reads.
- `provider_data`: paid or credentialed calls require applicable approval.
- `vault_write`: save only to a resolved context when authorized.
- `external_mutation` and `production`: link buying, outreach, disavowal,
  redirects, CMS, code, publishing, and provider configuration are out of scope.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when the artifact requires User inspection.
- No provider, CMS, code, outreach, disavowal, publishing, or production writes.

## Verification

- Domain, target pages, market, date range, provider scope, and audit date are
  explicit.
- Provider status and freshness are recorded for every declared source.
- Counts and metrics are source-labeled and not presented as universal truth.
- Link quality findings use context and more than one signal where appropriate.
- Missing, sampled, stale, or partial data is visible before conclusions.
- No toxic-link, ranking, traffic, authority, revenue, or conversion guarantee
  is made.
- Handoffs to opportunity, competitor-comparison, and reclaim workflows are
  explicit.
- `seo-quality-gate` passes or is explicitly deferred with an actionable reason.
- Changed Markdown/frontmatter and Home review registration are verified.

## Return Format

Return:

- **Done**: scope, provider statuses, artifact path, findings, and gate
- **Evidence**: sources, dates, metrics, samples, observations, and limits
- **Open Items**: approvals, assumptions, or verification needs
- **Next**: smallest opportunity, comparison, reclaim, or verification action

## Related Roles

- `strategist`
- `verifier`
- `developer`
- `wordpress-operator`
