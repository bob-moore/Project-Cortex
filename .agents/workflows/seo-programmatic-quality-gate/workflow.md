# SEO Programmatic Quality Gate

## Invocation

- Canonical workflow: `seo-programmatic-quality-gate`

## Purpose

Block unsafe scaled SEO recommendations until template samples, information gain,
business purpose, uniqueness, evidence, crawl/index safety, approvals, and
recheck criteria are explicit.

## Required Context

- `.agents/workflows/seo-programmatic-quality-gate/contract.json`
- `.agents/skills/seo-programmatic-quality-gate/SKILL.md`
- `.agents/skills/seo-ecommerce-audit/SKILL.md`
- `.agents/skills/seo-collection-page-audit/SKILL.md`
- `.agents/skills/seo-faceted-navigation-audit/SKILL.md`
- `.agents/skills/seo-quality-gate/SKILL.md`

## Workflow

1. Resolve project, template family, page count/range, data source, markets,
   query evidence, business purpose, owners, and launch/prune scope.
2. Load representative samples and approved keyword/SERP, content, ecommerce,
   local, technical, schema, analytics/GSC, and audit artifacts.
3. Require bounded representative samples before any scale recommendation.
4. Check information gain, facts, intent, variance, duplicate/thin/doorway risk,
   links, canonical/indexability, rendering, conversion purpose, maintenance,
   rollback, and prune controls.
5. Label claims and record blocked evidence, assumptions, and limits.
6. Return `PASS`, `PASS_WITH_CONDITIONS`, `BLOCK`, or `DEFERRED` with conditions,
   approvals, and recheck method.
7. Apply `seo-quality-gate` in `programmatic-seo` mode and save the artifact.

## Output

Use the contract's Programmatic Quality Gate format with Contract, Evidence
Register, Gate Checks, Verdict, Handoffs, and the required verdict enum.

## Approval Gates

- `external_read`: ask before live provider, page, analytics, catalog, or crawl reads.
- `provider_data`: paid or credentialed calls require approval.
- `vault_write`: save only to resolved context.
- `external_mutation` and `production`: generation, publishing, template, CMS, code, and production changes are out of scope.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when required.
- No page generation, publishing, template, CMS, code, or production writes.

## Verification

- Representative sample, template family, data source, page range, purpose,
  evidence, information gain, uniqueness, risk, owner, and recheck are explicit.
- Missing samples, facts, purpose, information gain, controls, or rollback block.
- Verdict is one of PASS, PASS_WITH_CONDITIONS, BLOCK, or DEFERRED.
- No pages are generated or published.
- `seo-quality-gate` passes or is explicitly deferred.

## Return Format

Return **Done**, **Evidence**, **Open Items**, and **Next**.

## Related Roles

- `strategist`
- `writer`
- `developer`
- `wordpress-operator`
- `verifier`
