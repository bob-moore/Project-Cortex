# SEO Hreflang

## Purpose

Inspect hreflang alternate-link markup as international SEO evidence. It does
not change locale routing, redirects, canonicals, CMS state, or deployment.

## Invocation

- Canonical workflow: `seo-hreflang`
- Runtime adapters may expose `/seo-hreflang` or `seo-hreflang`.

## Required Context

- Read the harness manual, SEO discipline contract, modes, rubric, tool README,
  and evidence schema.
- Read client locale, domain, routing, Stack, and deployment context when
  available.

## Workflow

1. Define page, locale set, environment, client/project, and output path.
2. Obtain external-read approval for a live page.
3. Run `python3 .agents/tools/seo/gap-check.py --mode hreflang --target ...`.
4. Review observed language-region codes, duplicate codes, missing href values,
   and absence. A single-page check cannot prove reciprocal coverage or locale
   intent.
5. Apply `seo-quality-gate` and hand routing or implementation work to
   developer/WordPress operator.

## Writes

- Scoped evidence under `reviews/evidence/seo/` or an approved path.

## Approval Gates

- Live reads and evidence writes require their applicable approvals.
- Routing, redirects, canonical changes, CMS edits, and deployment are
  separate actions.

## Verification

- Codes and hrefs are source-referenced.
- Reciprocity and language targeting are not claimed from one page.
- Quality gate passes or is deferred with reason.

## Return Format

- **Done**: locale scope, parser status, and evidence path
- **Evidence**: observed codes, findings, and raw references
- **Open Items**: reciprocal pages, locale intent, or implementation approvals
- **Next**: international routing handoff or recheck

## Related Roles

- `strategist`
- `developer`
- `verifier`
- `wordpress-operator`
