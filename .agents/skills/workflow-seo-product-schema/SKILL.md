---
name: workflow-seo-product-schema
description: "Audit product, offer, review, aggregate rating, availability, identifier, variant, and merchant schema facts. Use when the user asks to run seo-product-schema, /seo-product-schema, or this vault workflow."
---

# workflow-seo-product-schema

Execute the canonical workflow `seo-product-schema`.

1. Read `.agents/workflows/seo-product-schema/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/seo-product-schema/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
