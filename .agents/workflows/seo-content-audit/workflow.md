# SEO Content Audit

## Invocation

- Canonical workflow: `seo-content-audit`
- Runtime adapters may expose this as `/seo-content-audit`,
  `seo-content-audit`, or another runtime-native trigger.

## Purpose

Audit existing content for query and SERP fit, freshness, decay signals,
topical coverage, overlap, internal-link and conversion alignment, and business
fit. Produce an evidence-backed action queue and refresh handoff without writing
or publishing final content.

## Required Context

- `harness/manual.md`, `harness/operator.md`, and `harness/user.md`
- `.agents/disciplines/seo/contract.json`, `modes.md`, and `rubric.md`
- `.agents/skills/seo-content-audit/SKILL.md`
- `.agents/skills/seo-content-brief/SKILL.md`
- `.agents/skills/seo-keyword-research/SKILL.md`
- `.agents/skills/seo-serp-intent/SKILL.md`
- `.agents/skills/article-refresh/SKILL.md` for the Writing handoff boundary
- Client/project/prospect Brand, Voice, Stack, offer, audience, site, content,
  analytics, and approved research context

## Workflow

1. Resolve client/project/prospect, domain, content inventory, scope, market,
   language, device, date range, and audit date.
2. Read local target content and relevant context before judging usefulness,
   voice, claims, business fit, or freshness.
3. Load keyword and SERP-intent artifacts when available. Accept approved
   first-party exports, provider data, crawl results, CMS exports, or User
   observations when those artifacts are the declared source.
4. Run bounded availability checks for GA4, Google Search Console, DataForSEO,
   SE Ranking, crawls, CMS exports, and other User-declared providers. Do not
   reveal credentials or probe arbitrary services.
5. Ask before live external reads, provider calls, current SERP observation, or
   external ranking-page reads. Local vault content and approved artifacts are
   read within scope.
6. Assess query/page fit, intent alignment, topical coverage, usefulness,
   freshness, claim risk, structure, internal links, conversion alignment,
   overlap/cannibalization signals, and implementation dependencies.
7. Distinguish measured decay from hypotheses. Age, low traffic, or movement
   alone is not proof of decay.
8. Assign one action: keep, monitor, refresh, expand, consolidate, redirect
   candidate, repurpose, or retire candidate.
9. Route refresh recommendations to `seo-content-brief` and `article-refresh`;
   route new opportunities to `seo-content-brief`; route implementation issues
   to developer or WordPress workflows.
10. Apply `seo-quality-gate` in the relevant SEO mode.
11. Save the durable artifact using project/client/prospect routing and review
    frontmatter used by `seo-content-brief`.

## Approval Gates

- `external_read`: ask before current external content, SERP, or provider reads.
- `provider_data`: paid or credentialed calls require applicable approval;
  availability checks remain bounded and read-only.
- `vault_write`: save only to a resolved context when authorized.
- `external_mutation` and `production`: out of scope.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when the artifact requires User inspection.
- No CMS, repository, provider, analytics, code, publishing, or production writes.

## Verification

- Scope, content inventory, domain, market, language, device, date range, and
  audit date are explicit.
- Provider status is recorded for each declared source.
- Local content and relevant client context were inspected before conclusions.
- Keyword and SERP evidence is source-labeled and date-scoped.
- Decay is measured or marked as a hypothesis; age alone is not treated as
  evidence.
- Semantic similarity is not called cannibalization without supporting evidence.
- Each asset has a recommended action and rationale.
- Refresh and new-content handoffs are explicit and preserve Writing ownership.
- No deletion, redirect, CMS, code, publishing, or production action occurred.
- `seo-quality-gate` passes or is explicitly deferred with an actionable reason.
- Changed Markdown/frontmatter and Home review registration are verified.

## Return Format

Return:

- **Done**: scope, provider statuses, artifact path, action queue, and gate
- **Evidence**: sources, dates, page observations, metrics, and limitations
- **Open Items**: approvals, assumptions, or verification needs
- **Next**: smallest brief, refresh, Writing, or implementation handoff

## Related Roles

- `strategist`
- `writer`
- `verifier`
- `developer`
- `wordpress-operator`
