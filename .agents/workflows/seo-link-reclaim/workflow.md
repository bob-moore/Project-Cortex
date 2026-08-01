# SEO Link Reclaim

## Invocation

- Canonical workflow: `seo-link-reclaim`
- Runtime adapters may expose this as `/seo-link-reclaim`, `seo-link-reclaim`,
  or another runtime-native trigger.

## Purpose

Identify broken, lost, redirected, orphaned, or unlinked external-link candidates
from approved evidence and route safe reclaim recommendations to the owning
implementation workflow. This workflow does not change redirects, pages, CMS,
code, disavowals, or contact external parties.

## Required Context

- `harness/manual.md`, `harness/operator.md`, and `harness/user.md`
- `.agents/disciplines/seo/contract.json`, `modes.md`, and `rubric.md`
- `.agents/skills/seo-link-reclaim/SKILL.md`
- `.agents/skills/seo-backlink-audit/SKILL.md`
- Client/project/prospect Brand, Voice, Stack, domain, target pages, market,
  redirect, CMS, crawl, analytics, and approved provider context

## Workflow

1. Resolve client/project/prospect, domain, affected target pages, market, date
   range, and reclaim scope.
2. Load approved backlink-audit, competitor-comparison, crawl, redirect, CMS,
   server-log, analytics, and User-provided evidence.
3. Check availability of DataForSEO, Moz, Bing Webmaster, Common Crawl,
   crawlers, first-party exports, CMS/redirect records, and manual/source
   evidence.
4. Record source URL, target URL, historical/current status, link or mention
   evidence, collection date, freshness, and verification method.
5. Classify broken target, changed destination, redirect chain, lost backlink,
   unlinked mention, orphaned asset, or monitor-only signal.
6. Recommend the least-destructive next action: restore destination, correct a
   valid redirect, update an internal target, request relationship follow-up,
   prepare an outreach brief, or monitor. Do not assume outreach is warranted.
7. Route redirect/CMS work to WordPress, code changes to Development, content
   changes to Writing, relationship decisions to Strategy, and outreach to an
   explicitly approved workflow.
8. Apply `seo-quality-gate` in `reporting` mode.
9. Save the durable artifact using project/client/prospect routing and review
   frontmatter used by `seo-content-brief`.

## Approval Gates

- `external_read`: ask before live provider, Common Crawl, external page, or
  publisher reads.
- `provider_data`: paid or credentialed calls require applicable approval.
- `vault_write`: save only to a resolved context when authorized.
- `outreach`: contact or pitch actions require a separate approved workflow.
- `external_mutation` and `production`: redirects, CMS, code, disavowals,
  publishing, and production changes are out of scope.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when the artifact requires User inspection.
- No redirect, CMS, code, disavowal, outreach, publishing, provider, or
  production writes.

## Verification

- Domain, target pages, market, date range, and scope are explicit.
- Source status, freshness, historical/current status, and verification method
  are recorded.
- Missing provider data is not presented as proof that a link never existed.
- Each candidate has evidence, least-destructive action, owner, and recheck.
- Redirect, CMS, Development, Writing, Strategy, and outreach handoffs are
  explicit.
- No external contact, production mutation, or outcome guarantee occurred.
- `seo-quality-gate` passes or is explicitly deferred with an actionable reason.
- Changed Markdown/frontmatter and Home review registration are verified.

## Return Format

Return:

- **Done**: scope, source status, artifact path, reclaim queue, and gate
- **Evidence**: URLs, statuses, dates, observations, and limitations
- **Open Items**: approvals, assumptions, or verification needs
- **Next**: smallest approved implementation, relationship, or verification action

## Related Roles

- `strategist`
- `writer`
- `verifier`
- `developer`
- `wordpress-operator`
