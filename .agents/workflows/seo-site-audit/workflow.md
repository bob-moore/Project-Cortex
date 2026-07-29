# SEO Site Audit

## Purpose

Orchestrate a bounded site audit from the technical crawler, selected lab and
link checks, and the Phase 3 gap analyzers.

## Invocation

- Canonical workflow: `seo-site-audit`
- Runtime adapters may expose `/seo-site-audit` or `seo-site-audit`.

## Required Context

- Read `harness/manual.md`, `harness/operator.md`, and `harness/user.md`.
- Read the SEO discipline contract, modes, rubric, tool registry, and evidence
  schema.
- Read client Brand, Voice, Stack, project, deployment, robots, sitemap, and
  prior audit context when available.

## Workflow

1. Define site, environment, market, date, page cap, depth cap, device profile,
   specialist checks, output root, and approval boundary.
2. Run `seo-technical-audit` as the primary evidence pass.
3. Run `seo-page-audit` for representative or priority URLs when page-level
   evidence is needed.
4. Run `gap-check.py` for sitemap, schema, images, hreflang, robots, metadata,
   and headers against local artifacts, crawler reports, or approved fetched
   sources. Mark unavailable checks explicitly.
5. Preserve raw tool output, normalized packets, caps, failures, skipped checks,
   and affected URL samples in one evidence bundle.
6. Interpret findings and apply `seo-quality-gate` in `technical-audit` mode.
7. Return findings and handoffs. Do not edit code, CMS state, redirects,
   robots, sitemaps, schema, analytics, or production.

## Writes

- `reviews/evidence/seo/<date>-<site-or-project>-site-audit/`
- Another user-approved evidence path when `vault_write` allows it.

## Approval Gates

- Live crawls and fetched assets require `external_read` approval.
- Evidence creation requires `vault_write` approval when not already granted.
- Page and depth caps are mandatory for live sites.
- Paid APIs, credentials, uploads, and mutations are out of scope.

## Verification

- Primary crawl and specialist commands are recorded with limits and exit states.
- Phase 3 checks are complete, not applicable, or explicitly blocked.
- Raw and normalized artifacts are present and source-referenced.
- Missing or partial evidence is never called clean.
- Quality gate passes or is deferred with reason.

## Return Format

- **Done**: bounded scope, evidence bundle, tools, and gate state
- **Evidence**: findings, labels, affected URLs, artifacts, and limitations
- **Open Items**: approvals, missing checks, partial data, and proof gaps
- **Next**: smallest handoff or verification replay

## Related Roles

- `strategist`
- `developer`
- `verifier`
- `writer`
- `wordpress-operator`
