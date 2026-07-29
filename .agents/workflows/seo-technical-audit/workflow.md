# SEO Technical Audit

## Purpose

Run a bounded site-level technical SEO audit that preserves crawl evidence,
limits, failures, and specialist checks before recommendations are made.

## Invocation

- Canonical workflow: `seo-technical-audit`
- Runtime adapters may expose this as `/seo-technical-audit`,
  `seo-technical-audit`, or a runtime-native trigger. The behavior belongs
  here.

## Required Context

- Start with `harness/manual.md`, `harness/operator.md`, and `harness/user.md`.
- Read `.agents/disciplines/seo/contract.json`, `modes.md`, and `rubric.md`.
- Read `.agents/tools/seo/README.md`, `tool-registry.json`, and
  `evidence-schema.json`.
- For client work, read available Brand, Voice, Stack, project, deployment,
  sitemap, robots, and prior audit notes before interpreting findings.

## Workflow

1. Build the task contract: site, client/project, environment, market, target
   scope, page cap, depth cap, device/rendering profile, output path, and
   approval boundary.
2. Classify the target as a local artifact or live site. A live crawl is an
   `external_read` and must be approved before execution.
3. Run SiteOne as the primary crawler through the wrapper with explicit
   `--max-pages` and `--max-depth` values. Preserve robots, sitemap, blocked
   requests, skipped URLs, response errors, and crawl configuration.
4. Add only the smallest useful specialists:
   - `unlighthouse` for a deliberately scoped site-wide lab sample.
   - `linkinator` for focused link validation when the crawler output needs an
     independent check.
   - `lychee` for local source/Markdown/HTML link checks.
   - `html-validate` or `vnu` for local/generated HTML conformance.
   - `gap-check.py` for sitemap, robots, metadata/indexability, response
     headers, schema, image, and hreflang structural checks.
5. Inspect raw stdout, stderr, metadata, and normalized packets. Build an
   affected-URL sample for each material issue; do not convert missing routes
   into clean results.
6. Apply `seo-quality-gate` in `technical-audit` mode. Mark sampled, capped,
   stale, blocked, unavailable, and partial evidence explicitly.
7. Hand off code, CMS, redirect, robots, sitemap, schema, content, or
   production changes to the appropriate workflow and role.
8. Return the evidence root, crawl limits, findings, quality-gate result, open
   approvals, and the smallest next action.

## Writes

- `reviews/evidence/seo/<date>-<site-or-project>-technical-audit/`
- Another user-approved evidence path when `vault_write` allows it.
- This workflow does not edit site code, CMS state, redirects, robots,
  sitemaps, schema, analytics, or production.

## Approval Gates

- Ask before crawling a live site or linked assets.
- Ask before creating evidence files when `vault_write` is not already allowed.
- Require explicit page and depth caps; refuse an unbounded production crawl.
- Never enable uploads, credentials, paid APIs, CMS writes, or deployment.

## Verification

- Site, environment, market, crawl cap, depth cap, and date are explicit.
- The primary crawler command records the same caps in run metadata.
- Raw output and normalized packets exist for each attempted tool.
- Robots, sitemap completeness, metadata/indexability exceptions, response
  headers, blocked requests, skipped checks, and affected URL samples are
  visible where applicable.
- Nonzero exits and unavailable specialist checks remain visible.
- `seo-quality-gate` passes or is deferred with a stated reason.

## Return Format

Return:

- **Done**: audit scope, caps, evidence root, tools, and quality-gate state
- **Evidence**: crawl findings, labels, affected URL samples, artifacts, and limits
- **Open Items**: approvals, missing data, partial checks, and proof gaps
- **Next**: smallest implementation or handoff step

## Related Roles

- `strategist`
- `developer`
- `verifier`
- `writer`
- `wordpress-operator`
