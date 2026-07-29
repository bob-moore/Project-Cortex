---
name: workflow-vault-self-review
description: "Draft a self-review from vault evidence, candidate review notes, and project outcomes for a target review cycle. Use when the user asks to run vault-self-review, /vault-self-review, or this vault workflow."
---

# workflow-vault-self-review

Execute the canonical workflow `vault-self-review`.

1. Read `.agents/workflows/vault-self-review/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/vault-self-review/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
