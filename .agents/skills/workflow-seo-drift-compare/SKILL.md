---
name: workflow-seo-drift-compare
description: "Compare approved SEO drift baselines and after-state snapshots, separating observed changes from hypotheses and confounders."
---

# workflow-seo-drift-compare

Execute `seo-drift-compare`.

1. Read `.agents/workflows/seo-drift-compare/contract.json` and `.agents/workflows/seo-drift-compare/workflow.md`.
2. Read `.agents/skills/seo-drift-compare/SKILL.md` and `.agents/skills/seo-quality-gate/SKILL.md`.
3. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
4. Ask before live external reads or paid/credentialed calls; do not mutate analytics, providers, CMS, code, SEO, or production.
5. Return Done, Evidence, Open Items, and Next only after source status, freshness, scope, limitations, and quality gate are complete or explicitly blocked.

The canonical workflow spec wins if this skill conflicts with it.
