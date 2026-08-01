# SEO Topic Cluster

## Invocation

- Canonical workflow: `seo-topic-cluster`
- Runtime adapters may expose this as `/seo-topic-cluster`, `seo-topic-cluster`,
  or another runtime-native trigger.

## Purpose

Turn approved keyword, SERP-intent, and content-audit evidence into topic
clusters, hub/spoke architecture, page roles, boundaries, internal-link
recommendations, and prioritized handoffs. This workflow does not write or
implement final content or links.

## Required Context

- `harness/manual.md`, `harness/operator.md`, and `harness/user.md`
- `.agents/disciplines/seo/contract.json`, `modes.md`, and `rubric.md`
- `.agents/skills/seo-topic-cluster/SKILL.md`
- `.agents/skills/seo-keyword-research/SKILL.md`
- `.agents/skills/seo-serp-intent/SKILL.md`
- `.agents/skills/seo-content-audit/SKILL.md`
- `.agents/skills/seo-content-brief/SKILL.md`
- Client/project/prospect Brand, Voice, Stack, offer, audience, content, and
  approved strategy context

## Workflow

1. Resolve client/project/prospect, domain, audience, offer, market, language,
   device, business goal, and architecture scope.
2. Load approved keyword, SERP-intent, and content-audit artifacts. If an input
   artifact is absent, use only an explicit User-provided source or state that
   the cluster plan is provisional.
3. Group by user need, SERP intent, business relationship, and page role. Do not
   group solely by lexical similarity or embeddings.
4. Assign hub/pillar, spoke/supporting page, service/product, comparison,
   glossary, local, tool, or refresh role only when evidence supports it.
5. Check existing pages for overlap, intent conflict, coverage, and internal-link
   opportunities. Semantic similarity is a signal, not proof of cannibalization.
6. Define cluster boundaries, primary topic, supporting queries, page role,
   funnel relationship, conversion path, link direction, and priority.
7. Preserve source, date, market, language, device, evidence type, and confidence
   for material decisions.
8. Route new page opportunities to `seo-content-brief`, refresh candidates to
   `seo-content-audit` and `article-refresh`, and final copy to Writing.
9. Apply `seo-quality-gate` in the relevant SEO mode.
10. Save the durable artifact using project/client/prospect routing and review
    frontmatter used by `seo-content-brief`.

## Approval Gates

- `vault_read`: local project, client, prospect, and approved artifact reads.
- `external_read`: ask before current external SERP, ranking-page, or provider
  reads not already approved in the source artifacts.
- `vault_write`: save only to a resolved context when authorized.
- `external_mutation` and `production`: out of scope.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when the artifact requires User inspection.
- No CMS, repository, code, link implementation, publishing, or production writes.

## Verification

- Scope, domain, audience, offer, market, language, device, goal, and date are
  explicit.
- Input artifacts and source status are recorded.
- Clusters are based on user need, intent, business relationship, and page role.
- Page roles and hub/spoke relationships have evidence-backed rationale.
- Semantic similarity is not presented as proof of cannibalization.
- Existing/new/refresh decisions and internal-link recommendations are explicit.
- New-page and refresh handoffs preserve SEO/Writing ownership boundaries.
- No final copy, metadata prose, CMS, code, link, or production mutation occurred.
- `seo-quality-gate` passes or is explicitly deferred with an actionable reason.
- Changed Markdown/frontmatter and Home review registration are verified.

## Return Format

Return:

- **Done**: cluster scope, artifact path, architecture, handoffs, and gate
- **Evidence**: source artifacts, dates, intent, boundaries, and confidence
- **Open Items**: approvals, assumptions, or verification needs
- **Next**: smallest brief, refresh, Writing, or implementation handoff

## Related Roles

- `strategist`
- `writer`
- `verifier`
- `developer`
- `wordpress-operator`
