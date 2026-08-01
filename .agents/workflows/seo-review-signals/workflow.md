# SEO Review Signals

## Invocation

- Canonical workflow: `seo-review-signals`

## Purpose

Assess approved review evidence for volume, recency, relevance, sentiment themes,
response coverage, unresolved issues, and safe operational handoffs. No review
creation, suppression, response posting, or platform mutation occurs.

## Required Context

- `.agents/workflows/seo-review-signals/contract.json`
- `.agents/skills/seo-review-signals/SKILL.md`
- `.agents/skills/seo-local-audit/SKILL.md`
- `.agents/skills/seo-quality-gate/SKILL.md`
- Client/project/prospect customer-experience and approved review context

## Workflow

1. Resolve business, locations, service areas, market, language, platforms,
   date range, and scope.
2. Load approved review exports, platform data, operations records, customer-
   experience context, and local audit artifacts.
3. Ask before live review-platform, maps, directory, or provider reads.
4. Assess volume, recency, rating distribution, relevance, recurring themes,
   response coverage, unresolved issues, and evidence limits.
5. Label source, date, sample scope, sentiment method, and confidence.
6. Route themes to Strategy/customer operations, response guidance to the owner,
   and content themes to SEO/Writing.
7. Apply `seo-quality-gate` in `local-seo` mode and save the routed artifact.

## Approval Gates

- `external_read`: ask before live review-platform, maps, directory, or provider reads.
- `provider_data`: paid or credentialed calls require approval.
- `vault_write`: save only to resolved context.
- `external_mutation`: review creation, suppression, manipulation, response posting,
  profile changes, CMS, code, and production are out of scope.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when required.
- No review, profile, platform, CMS, code, or production writes.

## Verification

- Business scope, platforms, date range, source status, sample, method, and
  confidence are explicit.
- Privacy boundaries are preserved: no private reviewer identity or protected
  trait is inferred.
- Observations do not identify private reviewers or infer protected traits.
- Themes and handoffs have evidence, owner, and recheck.
- No review manipulation or outcome guarantee occurred.
- `seo-quality-gate` passes or is explicitly deferred.

## Return Format

Return **Done**, **Evidence**, **Open Items**, and **Next**.

## Related Roles

- `strategist`
- `verifier`
- `writer`
