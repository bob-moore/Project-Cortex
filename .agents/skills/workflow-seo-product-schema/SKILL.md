---
name: workflow-seo-product-schema
description: "Audit product, offer, review, aggregate rating, availability, identifier, variant, and merchant schema facts."
---

# workflow-seo-product-schema

Execute `seo-product-schema`.

1. Read `.agents/workflows/seo-product-schema/contract.json` and `.agents/workflows/seo-product-schema/workflow.md`.
2. Read `.agents/skills/seo-product-schema/SKILL.md` and the related ecommerce/programmatic quality skills.
3. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
4. Ask before live external reads and preserve the no-mutation boundary.
5. Return Done, Evidence, Open Items, and Next only after the workflow contract and quality gate are complete or explicitly blocked.

The canonical workflow spec wins if this skill conflicts with it.
