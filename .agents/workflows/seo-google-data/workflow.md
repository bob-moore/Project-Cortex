# Google SEO data

## Invocation

- Canonical workflow: `seo-google-data`

## Purpose

Define bounded GSC, GA4, PageSpeed Insights, CrUX, URL Inspection, and Indexing API with explicit source status, freshness, scope, and limitations.

## Required Context

- `.agents/workflows/seo-google-data/contract.json`
- `.agents/skills/seo-google-data/SKILL.md`
- `.agents/skills/seo-quality-gate/SKILL.md`

## Workflow

1. Resolve project/client/property, scope, date/timezone, sources, caps, and approved evidence path.
2. Separate credential presence, tool availability, access result, freshness, and scope.
3. Ask before live external reads, paid/credentialed calls, or mutations.
4. Preserve approved evidence and label source tiers, partial states, and limitations.
5. Record unavailable, stale, failed, and partial sources explicitly.
6. Apply the required quality-gate mode and save the artifact.

## Output

Use the contract format with Contract, Source Or Run Status, Evidence Register, Findings/Snapshots/Signals, limitations, handoffs, and Quality Gate.

## Approval Gates

- `external_read`: ask before live external reads.
- `provider_data`: paid or credentialed calls require approval.
- `vault_write`: save only to resolved context and approved evidence paths.
- `external_mutation`: analytics, provider, CMS, code, SEO, and production mutations are out of scope.

## Writes

- Approved project/client/prospect evidence artifact or baseline/compare/monitor path.
- No secret, provider, analytics, CMS, code, or production writes.

## Verification

- Credential presence, tool availability, access, freshness, scope, and limits are separate.
- Metrics, snapshots, deltas, alerts, and source results are not fabricated.
- Partial/stale/unavailable states are visible.
- Quality gate passes or is explicitly deferred.

## Return Format

Return **Done**, **Evidence**, **Open Items**, and **Next**.

## Related Roles

- `strategist`
- `developer`
- `verifier`
- `wordpress-operator`
