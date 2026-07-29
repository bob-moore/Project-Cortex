# SEO Schema

## Purpose

Detect and structurally inspect JSON-LD in page evidence. It does not generate,
deploy, or promise rich-result eligibility.

## Invocation

- Canonical workflow: `seo-schema`
- Runtime adapters may expose `/seo-schema` or `seo-schema`.

## Required Context

- Read the harness manual, SEO discipline contract, modes, rubric, tool README,
  and evidence schema.
- Read client Stack and implementation context before recommending code or CMS
  changes.

## Workflow

1. Define target, page type, environment, schema scope, and output path.
2. Obtain external-read approval for a live page.
3. Run `python3 .agents/tools/seo/gap-check.py --mode schema --target ...`.
4. Review JSON-LD parse status, observed `@type` values, invalid scripts, and
   source facts. Treat missing JSON-LD as an observation, not automatically a
   defect.
5. Apply `seo-quality-gate` in schema mode and hand implementation work to
   developer or WordPress operator.

## Writes

- Scoped evidence under `reviews/evidence/seo/` or an approved path.

## Approval Gates

- Live reads and evidence writes require their applicable approvals.
- Schema generation, CMS edits, code changes, and production deployment are
  separate actions.

## Verification

- JSON syntax and observed types are source-referenced.
- Entity facts are not invented and rich-result eligibility is not promised.
- Quality gate passes or is deferred with reason.

## Return Format

- **Done**: schema scope, parser status, and evidence path
- **Evidence**: observed types, parse findings, and raw references
- **Open Items**: missing facts, invalid scripts, or implementation approvals
- **Next**: developer/WordPress handoff or recheck

## Related Roles

- `strategist`
- `developer`
- `verifier`
- `wordpress-operator`
