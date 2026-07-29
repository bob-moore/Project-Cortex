---
name: workflow-refresh-article
description: "Audit and update an existing long-form article with preservation, claim handling, and readiness checks. Use when the user asks to run refresh-article, /refresh-article, or this vault workflow."
---

# workflow-refresh-article

Execute the canonical workflow `refresh-article`.

1. Read `.agents/workflows/refresh-article/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/refresh-article/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
