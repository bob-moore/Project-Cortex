---
name: workflow-vault-review-brief
description: "Generate a review context-transfer brief from vault data for manager or peer audiences. Use when the user asks to run vault-review-brief, /vault-review-brief, or this vault workflow."
---

# workflow-vault-review-brief

Execute the canonical workflow `vault-review-brief`.

1. Read `.agents/workflows/vault-review-brief/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/vault-review-brief/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
