---
name: workflow-seo-programmatic-quality-gate
description: "Block unsafe scaled SEO recommendations until samples, information gain, business purpose, uniqueness, evidence, and controls are verified."
---

# workflow-seo-programmatic-quality-gate

Execute `seo-programmatic-quality-gate`.

1. Read `.agents/workflows/seo-programmatic-quality-gate/contract.json` and `.agents/workflows/seo-programmatic-quality-gate/workflow.md`.
2. Read `.agents/skills/seo-programmatic-quality-gate/SKILL.md` and the related ecommerce/programmatic quality skills.
3. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
4. Ask before live external reads and preserve the no-mutation boundary.
5. Return Done, Evidence, Open Items, and Next only after the workflow contract and quality gate are complete or explicitly blocked.

The canonical workflow spec wins if this skill conflicts with it.
