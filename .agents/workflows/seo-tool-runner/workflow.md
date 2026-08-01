# SEO Tool Runner

## Invocation

- Canonical workflow: `seo-tool-runner`

## Purpose

Select, plan, or run bounded neutral CLI tools for approved SEO evidence collection.

## Required Context

- `.agents/skills/seo-tool-runner/SKILL.md`
- `.agents/disciplines/seo/contract.json`
- `.agents/disciplines/seo/modes.md`
- `.agents/disciplines/seo/rubric.md`

## Workflow

1. Resolve SEO mode, client/site, market, environment, date range, evidence, and requested artifact.
2. Preserve source hierarchy, evidence labels, approval classes, limitations, and cross-discipline handoffs.
3. Ask before external reads, paid provider calls, live crawls, secret handling, or mutations.
4. Select the smallest approved neutral CLI tool set, preserve raw output, and normalize durable evidence.
5. Return the canonical output and an explicit blocked/partial state when required.

## Output

Tool plan or evidence shape with mode, evidence need, approval class, selected tools, command shape, output path, limits, findings, verification, and quality gate.

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
