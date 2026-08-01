# SEO Executive Summary

## Invocation

- Canonical workflow: `seo-executive-summary`

## Purpose

Produce a client-readable decision summary from approved SEO evidence. Markdown is the source of truth; optional HTML/PDF is presentation only.

## Required Context

- `.agents/workflows/seo-executive-summary/contract.json`
- `.agents/skills/seo-executive-summary/SKILL.md`
- `.agents/skills/seo-quality-gate/SKILL.md`

## Workflow

1. Resolve client/project/site, reporting period, market/language/device, included workflows, evidence bundle, output path, and brand mode.
2. Confirm evidence cutoff, source labels, freshness, credential/tool/access status, skipped sections, partial states, and limitations.
3. Ask before live reads or mutations; report generation does not fetch data by implication.
4. Separate facts, interpretation, recommendations, assumptions, and unknowns.
5. Preserve links to evidence and route actions, owners, dependencies, approvals, risks, statuses, and rechecks.
6. Apply `seo-quality-gate` in `reporting` mode and save Markdown; generate optional HTML/PDF only as a downstream presentation.

## Output

Use the contract format with Report Contract, Evidence Register, findings/decisions, limitations/skipped sections, next actions, and Quality Gate.

## Approval Gates

- `external_read`: ask before live external reads.
- `provider_data`: paid or credentialed calls require approval.
- `vault_write`: save only to resolved context and approved report paths.
- `external_mutation`: CMS, analytics, provider, code, SEO, and production mutations are out of scope.

## Writes

- Approved Markdown report or reporting artifact.
- Optional derived HTML/PDF presentation.
- Home review link when required.
- No secrets, CMS, analytics, provider, code, SEO, or production writes.

## Verification

- Scope, period, evidence cutoff, source labels, freshness, limitations, and skipped sections are visible.
- Facts, interpretations, recommendations, assumptions, and unknowns are separated.
- No unsupported business or performance guarantee exists.
- Owners, approvals, dependencies, statuses, and rechecks are explicit where applicable.
- Markdown is the source of truth; presentation output does not add findings.
- `seo-quality-gate` passes or is explicitly deferred.

## Return Format

Return **Done**, **Evidence**, **Open Items**, and **Next**.

## Related Roles

- `strategist`
- `writer`
- `developer`
- `verifier`
