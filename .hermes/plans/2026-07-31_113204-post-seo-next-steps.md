# Post-SEO Harness Next Steps Implementation Plan

> **For Hermes:** Execute in coherent slices with repository-native verification after each slice.

**Goal:** Close the accepted SEO Phase 3 work cleanly, remove stale test-case references, and continue finishing the SEO role through its strategy, content, authority, local, advanced-search, data, monitoring, and reporting lanes.

**Architecture:** Keep `.agents/` as canonical runtime machinery and `harness/` as durable operating knowledge. Treat the accepted Phase 3 implementation as the foundation for Phase 4+; do not move to Design, Development, or General Marketing until the SEO role has reached an explicitly accepted stopping point.

**Tech Stack:** Markdown/frontmatter, JSON contracts, Node gate scripts, Graphify, existing `.agents/` workflows and skills.

---

## Decision Summary

1. Treat SEO Phase 3 as accepted and continue SEO as the active implementation lane.
2. Remove stale references to the deleted `afistfullofdollars` evidence from resume/context notes.
3. Reconcile roadmap and status notes so they describe the actual state.
4. Build the SEO Phase 4 strategy/content interface first.
5. Continue through backlink, local, advanced search, ecommerce/programmatic, data/drift, and reporting lanes in bounded slices.
6. Defer Design, Development, and General Marketing until the SEO role is explicitly accepted or a new priority is chosen.
7. Run SEO workflows against a real client/site or deliberately ephemeral fixture; generated review artifacts must link from `Home.md` and use `attention_status`.

---

## Task 1: Reconcile SEO closure and remove stale references

**Objective:** Make the durable vault context reflect that the accepted Phase 3 audit is complete and its test evidence is gone.

**Files:**
- Modify: `harness/resume/2026-07-29-seo-skill-stash.md`
- Modify: `harness/roadmaps/seo.md`
- Inspect: `harness/audits/seo-skill-inventory.md`
- Inspect: `.agents/workflows/seo-site-audit/workflow.md`

**Steps:**
1. Remove or rewrite validation commands that reference deleted `reviews/evidence/seo/2026-07-28-afistfullofdollars-site-audit/...` paths.
2. Replace them with fixture-based commands under `.agents/tools/seo/fixtures/` or describe the live audit validation without retaining a client/test URL.
3. Mark the implemented Phase 3 scope as accepted/paused in the roadmap while preserving future Phase 4+ work as deferred.
4. Record the reusable report/review-queue convention without naming the deleted test site.
5. Run JSON validation, the repository gate, `git diff --check`, and `graphify update .`.

**Acceptance:** No durable harness or active graph source references the deleted test site; SEO Phase 3 is described as accepted and SEO remains the active lane.

---

## Task 2: Build the SEO strategy/content interface

**Objective:** Add the first post-audit SEO workflow: evidence-backed content briefs with explicit writing handoff.

**Files:**
- Create or modify: `.agents/skills/seo-content-brief/`
- Create or modify: `.agents/workflows/seo-content-brief/`
- Modify: `.agents/disciplines/seo/contract.json`
- Modify: `.agents/skills/seo-quality-gate/SKILL.md`
- Inspect: `.agents/disciplines/writing/`
- Inspect: `.agents/workflows/write-web-copy/`
- Inspect: `harness/audits/seo-skill-inventory.md`

**Steps:**
1. Define the brief input schema: target page/type, audience, query/intent evidence, competitors, claims, sources, and constraints.
2. Separate observed search/page evidence from heuristics and hypotheses.
3. Define the handoff to Writing without bypassing Writing quality gates.
4. Add approval and paid-data gates before keyword/SERP provider calls.
5. Verify that missing Brand, Voice, offer, and client context remain visible.

**Acceptance:** One bounded `seo-content-brief` workflow produces a source-labeled brief and a valid Writing handoff without claiming unverified ranking or SERP facts.

---

## Task 3: Add keyword/SERP intent and strategy roadmap support

**Objective:** Extend the content brief into intent analysis and an actionable SEO strategy roadmap.

**Likely files:**
- Create or modify: `.agents/skills/seo-keyword-research/`
- Create or modify: `.agents/skills/seo-serp-intent/`
- Create or modify: `.agents/skills/seo-strategy-roadmap/`
- Create or modify: `.agents/workflows/seo-keyword-research/`
- Create or modify: `.agents/workflows/seo-strategy-roadmap/`
- Modify: `harness/roadmaps/seo.md`

**Steps:**
1. Define the evidence boundary for free versus paid keyword/SERP data.
2. Keep intent, SERP observations, competitor comparisons, and hypotheses distinct.
3. Produce a prioritized strategy roadmap with page-type and Writing handoffs.
4. Run quality-gate checks for unsupported volume, difficulty, ranking, and visibility claims.

**Acceptance:** SEO can produce an evidence-labeled strategy roadmap from an approved brief without overclaiming volatile search data.

---

## Task 4: Continue SEO through authority, local, and advanced search lanes

**Objective:** Add bounded workflows for backlink opportunities, local SEO, and GEO/AEO/SXO without conflating provider data and heuristics.

**Files:**
- Modify as needed: `.agents/skills/seo-backlink-audit/`
- Modify as needed: `.agents/skills/seo-local-audit/`
- Modify as needed: `.agents/skills/seo-geo-audit/`
- Modify as needed: `.agents/workflows/`
- Modify: `.agents/disciplines/seo/`
- Modify: `harness/roadmaps/seo.md`

**Steps:**
1. Establish provider and source-tier requirements for backlink/local/AI-search claims.
2. Add explicit cost and credential approval gates for DataForSEO, maps, or Google data.
3. Keep website-observed facts, provider observations, studies, heuristics, and hypotheses distinct.
4. Run targeted quality-gate and contract checks for each workflow.

**Acceptance:** Each added SEO lane has bounded evidence, source labels, approval gates, and a client-safe output contract.

---

## Task 5: Add SEO data, drift, and reporting closure

**Objective:** Finish the reusable SEO operating loop with approved data integrations, baselines, monitoring, and client/operator reports.

**Files:**
- Create or modify: `.agents/skills/seo-google-data/`
- Create or modify: `.agents/skills/seo-dataforseo/`
- Create or modify: `.agents/skills/seo-drift-baseline/`
- Create or modify: `.agents/skills/seo-report/`
- Create or modify: `.agents/workflows/`
- Modify: `.agents/tools/seo/`
- Modify: `harness/roadmaps/seo.md`

**Steps:**
1. Keep credential presence, tool availability, and data freshness separate.
2. Add baseline/compare semantics for deployment and content drift.
3. Produce neutral/client-branded reports with limitations, evidence labels, and next actions.
4. Verify generated reports register on Home and are deleted when they are disposable test artifacts.

**Acceptance:** SEO has a repeatable evidence-to-report loop with approved integrations, drift handling, and review-queue cleanup.

---

## Ongoing Review-Artifact Convention

For any generated artifact that requires User review:

- Add frontmatter with `attention_status: needs-review` and `attention_type: review`.
- Add a direct link under the `Review Queue` section in `Home.md`.
- On review, set the source status to `reviewed`, `dismissed`, or `converted`.
- Remove the direct Home queue link during `vault-wrap-up`; retain the artifact only when it is durable and useful.
- Delete disposable test evidence immediately after acceptance rather than promoting it into vault memory.

---

## Verification

After each implementation slice:

```bash
node .agents/scripts/gate.mjs
git diff --check
graphify update .
```

For JSON/contract changes:

```bash
python3 -m json.tool <path> >/dev/null
```

For generated artifacts, verify Home registration, frontmatter status, duplicate prevention, and cleanup behavior with an isolated temporary fixture rather than retaining client/test evidence.

## Risks and Tradeoffs

- Do not resume SEO Phase 4 merely because the Phase 3 tool suite now works; the current decision is to shift focus.
- Do not use a fake client artifact as durable validation evidence.
- Design research may expose missing Brand/Voice/Design Token inputs; flag those gaps instead of guessing.
- Keep generated Graphify caches and historical snapshots from becoming a substitute for canonical vault knowledge.
- Preserve the user's approval boundary before any external mutation, CMS change, code handoff, or paid-data call.
