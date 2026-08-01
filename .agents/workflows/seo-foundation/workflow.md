# SEO Foundation

## Invocation

- Canonical workflow: `seo-foundation`

## Purpose

Prepare the canonical SEO evidence, approval, mode, and handoff contract before mode-specific work.

## Required Context

- `.agents/skills/seo-foundation/SKILL.md`
- `.agents/disciplines/seo/contract.json`
- `.agents/disciplines/seo/modes.md`
- `.agents/disciplines/seo/rubric.md`

## Workflow

1. Resolve SEO mode, client/site, market, environment, date range, evidence, and requested artifact.
2. Preserve source hierarchy, evidence labels, approval classes, limitations, and cross-discipline handoffs.
3. Ask before external reads, paid provider calls, live crawls, secret handling, or mutations.
4. Evaluate the artifact or establish the foundation contract without inventing evidence or silently mutating other disciplines.
5. Return the canonical output and an explicit blocked/partial state when required.

## Output

SEO mode, client/site, market, environment, date range, evidence available/missing, approval boundary, tool assumptions, handoff, and open risks.

## Approval Gates

- `external_read`: ask before live URLs, crawls, providers, or credentialed sources.
- `provider_data`: paid or credentialed calls require approval.
- `vault_write`: save only to resolved context and approved evidence paths.
- `external_mutation`: CMS, code, analytics, provider, SEO, and production mutation is out of scope.

## Writes

- Scoped foundation, gate, plan, or evidence artifact when authorized.
- No secrets or unapproved external mutations.

## Verification

- Mode, scope, sources, labels, approvals, limitations, and handoffs are explicit.
- Missing, partial, capped, stale, blocked, or unavailable evidence is visible.
- No ranking, traffic, indexing, revenue, or AI-citation guarantee is made.

## Return Format

Return **Done**, **Evidence**, **Open Items**, and **Next**.

## Related Roles

- `strategist`
- `developer`
- `verifier`
