---
name: workflow-seo-ecommerce-audit
description: "Audit ecommerce product, collection, marketplace, inventory, pricing, review, template, and indexability evidence."
---

# workflow-seo-ecommerce-audit

Execute `seo-ecommerce-audit`.

1. Read `.agents/workflows/seo-ecommerce-audit/contract.json` and `.agents/workflows/seo-ecommerce-audit/workflow.md`.
2. Read `.agents/skills/seo-ecommerce-audit/SKILL.md` and the related ecommerce/programmatic quality skills.
3. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
4. Ask before live external reads and preserve the no-mutation boundary.
5. Return Done, Evidence, Open Items, and Next only after the workflow contract and quality gate are complete or explicitly blocked.

The canonical workflow spec wins if this skill conflicts with it.
