# SEO Images

## Purpose

Inspect image markup for alt text, dimensions, and inventory evidence. This is
not an image rewrite, optimization deployment, or accessibility compliance
verdict.

## Invocation

- Canonical workflow: `seo-images`
- Runtime adapters may expose `/seo-images` or `seo-images`.

## Required Context

- Read the harness manual, SEO discipline contract, modes, rubric, tool README,
  and evidence schema.
- Read client Brand, Stack, page context, and image requirements when present.

## Workflow

1. Define target, page/template scope, environment, and output path.
2. Obtain external-read approval for a live page.
3. Run `python3 .agents/tools/seo/gap-check.py --mode images --target ...`.
4. Review image count, omitted alt attributes, empty decorative alt values, and
   missing dimensions. Do not infer byte weight, intrinsic dimensions, lazy
   loading behavior, or legal accessibility compliance from markup alone.
5. Apply `seo-quality-gate` and hand copy, asset, code, or CMS changes to the
   appropriate role.

## Writes

- Scoped evidence under `reviews/evidence/seo/` or an approved path.

## Approval Gates

- Live reads and evidence writes require their applicable approvals.
- Image edits, content edits, code changes, CMS changes, and deployment are
  separate actions.

## Verification

- Source and image inventory are recorded.
- Empty decorative alt and omitted alt are not collapsed.
- Markup evidence is not overstated as performance or compliance evidence.
- Quality gate passes or is deferred with reason.

## Return Format

- **Done**: scope, inventory, and evidence path
- **Evidence**: image findings and raw references
- **Open Items**: asset context, measurements, or approvals still needed
- **Next**: writer/developer/WordPress handoff or recheck

## Related Roles

- `strategist`
- `developer`
- `verifier`
- `writer`
- `wordpress-operator`
