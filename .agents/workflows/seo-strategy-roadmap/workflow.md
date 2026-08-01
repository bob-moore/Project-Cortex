# SEO Strategy Roadmap

## Invocation

- Canonical workflow: `seo-strategy-roadmap`
- Runtime adapters may expose this as `/seo-strategy-roadmap`,
  `seo-strategy-roadmap`, or another runtime-native trigger.

## Purpose

Sequence approved SEO evidence and business priorities into a strategy roadmap
with initiatives, owners, dependencies, effort bands, review cadence, and
verification methods. Preserve ownership boundaries across SEO, Strategy,
Writing, Development, WordPress, and verification.

## Required Context

- `harness/manual.md`, `harness/operator.md`, and `harness/user.md`
- `.agents/disciplines/seo/contract.json`, `modes.md`, and `rubric.md`
- `.agents/skills/seo-strategy-roadmap/SKILL.md`
- `.agents/skills/seo-keyword-research/SKILL.md`
- `.agents/skills/seo-serp-intent/SKILL.md`
- `.agents/skills/seo-content-audit/SKILL.md`
- `.agents/skills/seo-topic-cluster/SKILL.md`
- `.agents/skills/seo-content-brief/SKILL.md`
- relevant technical/page audits, analytics, Brand, Voice, Stack, offer,
  audience, project, client, prospect, and business-strategy context

## Workflow

1. Resolve client/project/prospect, domain, business goal, offer, audience,
   market, language, device, current state, planning horizon, and capacity.
2. Load approved keyword, SERP-intent, content-audit, topic-cluster,
   technical/page-audit, analytics, and business-context artifacts.
3. Register each source with date, scope, evidence label, freshness, and limits.
4. Define strategic objectives tied to business goals and user value.
5. Convert evidence into initiatives with affected assets, owner role,
   dependency, effort band, priority, review point, and verification method.
6. Prioritize by business relevance, user value, intent/conversion fit, evidence
   strength, strategic leverage, feasibility, effort, and dependencies.
7. Sequence initiatives into Now, Next, Later, and Recurring for the approved
   planning horizon. This is a planning recommendation, not a delivery promise.
8. Route final copy to Writing, implementation to Development, CMS changes to
   WordPress, and independent checks to verification.
9. Define measurement and recheck methods without promising outcomes.
10. Apply `seo-quality-gate` in `reporting` or the relevant SEO mode.
11. Save the durable artifact using project/client/prospect routing and review
    frontmatter used by `seo-content-brief`.

## Approval Gates

- `vault_read`: local context and approved research artifacts.
- `external_read`: ask before current external/provider reads not covered by
  approved artifacts.
- `vault_write`: save only to a resolved context when authorized.
- `external_mutation` and `production`: out of scope.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when the artifact requires User inspection.
- No copy, code, CMS, publishing, provider configuration, or production writes.

## Verification

- Business goal, offer, audience, market, language, device, horizon, capacity,
  and roadmap date are explicit.
- Evidence register preserves source, date, scope, label, freshness, and limits.
- Strategic objectives connect to business and user outcomes without guarantees.
- Initiatives have affected assets, owner, dependencies, effort, priority,
  review point, and verification method.
- Now/Next/Later/Recurring sequence is traceable to evidence and decisions.
- Writing, Development, WordPress, and verification handoffs are explicit.
- No final copy, code, CMS, publishing, provider, or production mutation occurred.
- `seo-quality-gate` passes or is explicitly deferred with an actionable reason.
- Changed Markdown/frontmatter and Home review registration are verified.

## Return Format

Return:

- **Done**: roadmap scope, artifact path, priorities, handoffs, and gate
- **Evidence**: sources, dates, decisions, dependencies, and limitations
- **Open Items**: approvals, assumptions, or User decisions
- **Next**: smallest approved execution or review action

## Related Roles

- `strategist`
- `writer`
- `verifier`
- `developer`
- `wordpress-operator`
