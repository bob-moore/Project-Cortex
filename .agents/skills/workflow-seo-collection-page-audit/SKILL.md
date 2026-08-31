---
name: workflow-seo-collection-page-audit
description: "Audit ecommerce collection/category pages for intent, assortment relevance, information gain, unique value, pagination, filters, and template risk. Use when the user asks to run seo-collection-page-audit, /seo-collection-page-audit, or this vault workflow."
---

# workflow-seo-collection-page-audit

Execute the canonical workflow `seo-collection-page-audit`.

1. Read `.agents/workflows/seo-collection-page-audit/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/seo-collection-page-audit/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
