---
name: workflow-seo-collection-page-audit
description: "Audit ecommerce collection/category pages for intent, assortment relevance, information gain, unique value, pagination, filters, and template risk."
---

# workflow-seo-collection-page-audit

Execute `seo-collection-page-audit`.

1. Read `.agents/workflows/seo-collection-page-audit/contract.json` and `.agents/workflows/seo-collection-page-audit/workflow.md`.
2. Read `.agents/skills/seo-collection-page-audit/SKILL.md` and the related ecommerce/programmatic quality skills.
3. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
4. Ask before live external reads and preserve the no-mutation boundary.
5. Return Done, Evidence, Open Items, and Next only after the workflow contract and quality gate are complete or explicitly blocked.

The canonical workflow spec wins if this skill conflicts with it.
