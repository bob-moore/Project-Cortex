# SEO Link-Building Opportunities

## Invocation

- Canonical workflow: `seo-link-building-opportunities`
- Runtime adapters may expose this as `/seo-link-building-opportunities`,
  `seo-link-building-opportunities`, or another runtime-native trigger.

## Purpose

Turn approved backlink, content, topic, brand, market, and competitor evidence
into an ethical, prioritized link-building opportunity queue with required assets,
relationship readiness, owners, and approvals. This workflow never performs
outreach or link acquisition.

## Required Context

- `harness/manual.md`, `harness/operator.md`, and `harness/user.md`
- `.agents/disciplines/seo/contract.json`, `modes.md`, and `rubric.md`
- `.agents/skills/seo-link-building-opportunities/SKILL.md`
- `.agents/skills/seo-backlink-audit/SKILL.md`
- `.agents/skills/seo-topic-cluster/SKILL.md`
- `.agents/skills/seo-content-brief/SKILL.md`
- Client/project/prospect Brand, Voice, Stack, offer, audience, PR,
  partnership, content, and approved competitor context

## Workflow

1. Resolve client/project/prospect, domain, offer, audience, market, target
   pages, business goal, and planning horizon.
2. Load approved backlink-audit, content, topic-cluster, Brand, PR,
   partnership, and competitor-comparison artifacts.
3. Check availability of DataForSEO, Moz, Bing Webmaster, Common Crawl,
   first-party records, approved market research, and manual/source evidence.
4. Use only approved integration/tool surfaces. Do not reveal credentials,
   install, authenticate, purchase, contact, or mutate.
5. Identify editorial/resource, partnership, original-data/digital-PR, expert,
   industry/community, supplier/client, and unlinked-mention opportunities.
6. Score topical relevance, audience value, editorial fit, destination
   usefulness, evidence strength, effort, relationship readiness, risk, and time
   horizon. Domain authority alone is insufficient.
7. Specify the asset, proof, relationship, or editorial reason required before
   each opportunity is actionable.
8. Route asset creation to Writing/Design, partnership decisions to Strategy,
   outreach for explicit approval, and broken/lost links to `seo-link-reclaim`.
9. Apply `seo-quality-gate` in `reporting` mode.
10. Save the durable artifact using project/client/prospect routing and review
    frontmatter used by `seo-content-brief`.

## Approval Gates

- `external_read`: ask before current provider, market, publisher, or external
  page reads.
- `provider_data`: paid or credentialed calls require applicable approval.
- `vault_write`: save only to a resolved context when authorized.
- `outreach`: contact, submit, or pitch actions require a separate approved
  workflow and are out of scope here.
- `external_mutation` and `production`: out of scope.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when the artifact requires User inspection.
- No outreach, link creation, CMS, code, publishing, provider, or production writes.

## Verification

- Domain, targets, market, audience, goal, horizon, and research date are
  explicit.
- Source status, freshness, and evidence labels are recorded.
- Each opportunity has relevance, destination, editorial rationale, evidence,
  effort, risk, and owner.
- Domain authority alone did not determine priority.
- Required asset/proof and relationship basis are explicit.
- No spam, private-network, paid-link, exchange, concealment, or guaranteed
  outcome recommendation is present.
- Outreach and asset handoffs preserve Strategy, Writing, Design, and approval
  ownership.
- `seo-quality-gate` passes or is explicitly deferred with an actionable reason.
- Changed Markdown/frontmatter and Home review registration are verified.

## Return Format

Return:

- **Done**: scope, source status, artifact path, opportunities, and gate
- **Evidence**: sources, dates, relationships, assets, and limitations
- **Open Items**: approvals, assumptions, or verification needs
- **Next**: smallest approved asset, strategy, or outreach-planning action

## Related Roles

- `strategist`
- `writer`
- `designer`
- `verifier`
