---
name: workflow-seo-faceted-navigation-audit
description: "Audit ecommerce facets, parameters, crawl paths, canonicals, indexation, links, and crawl traps at explicit sample scope. Use when the user asks to run seo-faceted-navigation-audit, /seo-faceted-navigation-audit, or this vault workflow."
---

# workflow-seo-faceted-navigation-audit

Execute the canonical workflow `seo-faceted-navigation-audit`.

1. Read `.agents/workflows/seo-faceted-navigation-audit/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/seo-faceted-navigation-audit/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
