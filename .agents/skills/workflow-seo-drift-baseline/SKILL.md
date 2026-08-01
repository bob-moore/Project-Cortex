---
name: workflow-seo-drift-baseline
description: "Create approved pre-change SEO drift baselines with explicit scope, evidence paths, freshness, sampling, and reproducibility."
---

# workflow-seo-drift-baseline

Execute `seo-drift-baseline`.

1. Read `.agents/workflows/seo-drift-baseline/contract.json` and `.agents/workflows/seo-drift-baseline/workflow.md`.
2. Read `.agents/skills/seo-drift-baseline/SKILL.md` and `.agents/skills/seo-quality-gate/SKILL.md`.
3. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
4. Ask before live external reads or paid/credentialed calls; do not mutate analytics, providers, CMS, code, SEO, or production.
5. Return Done, Evidence, Open Items, and Next only after source status, freshness, scope, limitations, and quality gate are complete or explicitly blocked.

The canonical workflow spec wins if this skill conflicts with it.
