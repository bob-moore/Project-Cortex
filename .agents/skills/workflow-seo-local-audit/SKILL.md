---
name: workflow-seo-local-audit
description: "Audit local SEO for business identity, NAP, service areas, local intent, location pages, reviews, citations, and local evidence. Use when the user asks to run seo-local-audit, /seo-local-audit, or this vault workflow."
---

# workflow-seo-local-audit

Execute the canonical workflow `seo-local-audit`.

1. Read `.agents/workflows/seo-local-audit/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/seo-local-audit/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
