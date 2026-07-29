---
description: "Resume note for the paused SEO skill and matrix work after Phase 3 specialist expansion."
tags:
  - harness
  - resume
  - seo
status: active
created: 2026-07-29
---

# SEO Skill Stash Resume

## Resume Prompt

Start with:

```text
Resume SEO skill work. Read this note first: harness/resume/2026-07-29-seo-skill-stash.md
```

## Objective

Pause SEO work after the Phase 3 technical/page audit layer and preserve the
current implementation state so the harness can shift to less intensive
role/skill porting: design, development, and general marketing.

## Current State

- SEO is an active canonical discipline, but it is intentionally stashed as of
  2026-07-29.
- Active SEO skills: `seo-foundation`, `seo-quality-gate`, `seo-tool-runner`,
  `seo-page-audit`, `seo-technical-audit`, `seo-site-audit`, `seo-sitemap`,
  `seo-schema`, `seo-images`, and `seo-hreflang`.
- Phase 3 now includes deterministic gap checks for `sitemap`, `schema`,
  `images`, `hreflang`, `robots`, `metadata`, and `headers`.
- The latest specialist expansion added `robots`, `metadata`, and `headers`
  modes to `.agents/tools/seo/gap-check.py` plus smoke fixtures.
- The remaining SEO matrix is mostly future work: strategy/content interface,
  backlinks, local/maps, GEO/AEO/SXO, ecommerce/programmatic, Google/DataForSEO
  integrations, drift, and reporting.
- Ads are out of the current porting scope. Legacy `.claude/skills/ads*`
  material may be scrubbed rather than ported. Build a paid ads role from
  scratch only when Bob explicitly prompts for it.

## Changed Files

Current uncommitted SEO files:

- `.agents/skills/seo-site-audit/SKILL.md`
- `.agents/skills/seo-technical-audit/SKILL.md`
- `.agents/tools/seo/README.md`
- `.agents/tools/seo/gap-check.py`
- `.agents/tools/seo/fixtures/smoke-headers.txt`
- `.agents/tools/seo/fixtures/smoke-metadata.html`
- `.agents/tools/seo/fixtures/smoke-robots.txt`
- `.agents/workflows/seo-site-audit/contract.json`
- `.agents/workflows/seo-site-audit/workflow.md`
- `.agents/workflows/seo-technical-audit/contract.json`
- `.agents/workflows/seo-technical-audit/workflow.md`
- `harness/roadmaps/seo.md`
- `harness/audits/seo-skill-inventory.md`

This stash note and the porting bucket audit were added after the SEO tool
changes.

## Decisions

- Pause SEO now rather than continue into Phase 4.
- Do not port paid ads wholesale. Treat legacy Ads skills as disposable source
  material and rebuild a paid ads role from scratch later.
- Next porting focus: design, development, and general marketing.
- Do not turn crawler/tool evidence into ranking, traffic, indexing, or AI
  visibility guarantees.
- Keep canonical behavior in `.agents/`; keep durable operating knowledge in
  `harness/`.

## Must Read First

- `harness/manual.md`
- `harness/roadmaps/seo.md`
- `harness/audits/seo-skill-inventory.md`
- `harness/audits/role-skill-porting-buckets.md`
- `.agents/disciplines/seo/README.md`
- `.agents/tools/seo/README.md`
- `.agents/tools/seo/gap-check.py`

## Validation

Completed before this stash:

```text
python3 .agents/tools/seo/gap-check.py --mode metadata --target reviews/evidence/seo/2026-07-28-afistfullofdollars-site-audit/raw/siteone-crawler/report.json --output-dir /tmp/projectcortex-seo-gap-siteone-metadata
python3 .agents/tools/seo/gap-check.py --mode headers --target reviews/evidence/seo/2026-07-28-afistfullofdollars-site-audit/raw/siteone-crawler/report.json --output-dir /tmp/projectcortex-seo-gap-siteone-headers
python3 .agents/tools/seo/gap-check.py --mode robots --target .agents/tools/seo/fixtures/smoke-robots.txt --output-dir /tmp/projectcortex-seo-gap-robots
python3 .agents/tools/seo/gap-check.py --mode headers --target .agents/tools/seo/fixtures/smoke-headers.txt --output-dir /tmp/projectcortex-seo-gap-headers
python3 .agents/tools/seo/gap-check.py --mode metadata --target .agents/tools/seo/fixtures/smoke-metadata.html --output-dir /tmp/projectcortex-seo-gap-metadata
node .agents/scripts/gate.mjs
git diff --check
env PYTHONPYCACHEPREFIX=/tmp/projectcortex-pycache python3 -m py_compile .agents/tools/seo/gap-check.py
```

Observed results: targeted checks completed, the harness gate passed, diff
whitespace was clean, and Python compilation passed with bytecode redirected to
`/tmp`.

## Blockers And Risks

- SEO Phase 3 is not committed yet in this workspace.
- Phase 3 still needs broader report synthesis and one more real-evidence pass
  before it should be called fully closed.
- Future SEO phases involve volatile provider/platform claims and must use
  source-tier labels and approval gates.
- Paid Ads should not be ported from the legacy tree; rebuild later from first
  principles.

## Next Action

Leave SEO alone for now. Continue with
[[harness/audits/role-skill-porting-buckets|role and skill porting buckets]]:
design first, development second, and general marketing third unless Bob gives a
different order.

