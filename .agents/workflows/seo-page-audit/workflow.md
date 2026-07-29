# SEO Page Audit

## Purpose

Run a bounded audit of one page or one local HTML artifact, preserving raw tool
evidence and returning findings that can pass the canonical SEO quality gate.

## Invocation

- Canonical workflow: `seo-page-audit`
- Runtime adapters may expose this as `/seo-page-audit`, `seo-page-audit`, or a
  runtime-native trigger. The behavior belongs here.

## Required Context

- Start with `harness/manual.md`, `harness/operator.md`, and `harness/user.md`.
- Read `.agents/disciplines/seo/contract.json`, `modes.md`, and `rubric.md`.
- Read `.agents/tools/seo/README.md`, `tool-registry.json`, and
  `evidence-schema.json`.
- For client work, read available Brand, Voice, Stack, project, and prior audit
  notes before interpreting page findings.

## Workflow

1. Build the task contract: target, client/project, page type, environment,
   market, requested scope, evidence output path, and approval boundary.
2. Classify the target as a local artifact or live URL. A live URL is an
   `external_read` and must be approved before execution.
3. Select the smallest suitable tool set: SiteOne with `--single-page` for
   broad page evidence, Lighthouse for lab evidence, linkinator for focused
   links, html-validate or vnu for local HTML, and pa11y only when targeted
   accessibility-adjacent evidence is requested.
4. Run selected commands through
   `node .agents/tools/seo/run-tool.mjs`, with a bounded output root and
   timeout. Use `--dry-run` while the target or approval boundary is unresolved.
5. Inspect raw stdout, stderr, run metadata, and normalized packets. Convert
   material observations into findings with evidence labels and source refs;
   do not treat an empty packet as proof of a clean page.
6. Apply `seo-quality-gate` to the interpreted findings. Mark missing,
   partial, blocked, sampled, or unavailable evidence explicitly.
7. Return the evidence root, findings, limitations, quality-gate result, open
   approvals, and the smallest next handoff.

## Writes

- `reviews/evidence/seo/<date>-<site-or-project>-<scope>/`
- Another user-approved evidence path when `vault_write` allows it.
- This workflow does not edit client site code, CMS state, redirects, robots,
  sitemaps, schema, analytics, or production.

## Approval Gates

- Ask before reading a live URL or linked assets.
- Ask before creating evidence files when `vault_write` is not already allowed.
- Keep crawl scope, timeout, route count, rendering mode, and skipped checks in
  the evidence packet.
- Never enable uploads, credentials, paid APIs, CMS writes, or deployment from
  this workflow.

## Verification

- Target, page type, environment, and scope are explicit.
- Every finding has a source reference and evidence label.
- Raw output and normalized packets exist for each attempted tool.
- Nonzero exits, blocked browser runs, and missing data remain visible.
- `seo-quality-gate` passes or is deferred with a stated reason.
- Recommendations requiring writing, development, WordPress, design, or
  production work are handed off rather than executed here.

## Return Format

Return:

- **Done**: audit scope, evidence root, tools run, and quality-gate state
- **Evidence**: observed findings, labels, raw artifact paths, and limitations
- **Open Items**: approvals, unavailable tools, partial checks, and proof gaps
- **Next**: smallest implementation or handoff step

## Related Roles

- `strategist`
- `developer`
- `verifier`
- `writer`
- `wordpress-operator`
