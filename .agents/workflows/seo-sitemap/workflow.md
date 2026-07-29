# SEO Sitemap

## Purpose

Inspect a sitemap or sitemap index as bounded technical evidence. This workflow
does not generate, publish, submit, or replace sitemap files.

## Invocation

- Canonical workflow: `seo-sitemap`
- Runtime adapters may expose `/seo-sitemap` or `seo-sitemap`.

## Required Context

- Read the harness manual, SEO discipline contract, modes, rubric, tool README,
  and evidence schema.
- Read Stack and prior sitemap/deployment notes for client work.

## Workflow

1. Identify target, environment, client/project, date, and evidence path.
2. Obtain external-read approval for a live sitemap.
3. Run `python3 .agents/tools/seo/gap-check.py --mode sitemap --target ...`.
4. Review root type, entry count, missing loc values, duplicates, parse errors,
   and source limitations.
5. Apply `seo-quality-gate` in technical-audit mode and return findings.

## Writes

- Scoped evidence under `reviews/evidence/seo/` or an approved path.

## Approval Gates

- Live reads and evidence writes require their applicable approvals.
- Sitemap generation, submission, redirects, robots, and production changes
  are out of scope.

## Verification

- Source, input cap, parser status, and raw input are recorded.
- Missing data is not treated as zero or all-clear.
- Quality gate passes or is deferred with reason.

## Return Format

- **Done**: source, parser status, and evidence path
- **Evidence**: sitemap findings and raw references
- **Open Items**: malformed, blocked, or incomplete evidence
- **Next**: verification or handoff

## Related Roles

- `strategist`
- `developer`
- `verifier`
- `wordpress-operator`
