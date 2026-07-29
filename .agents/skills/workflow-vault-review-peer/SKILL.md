---
name: workflow-vault-review-peer
description: "Draft a peer review from vault evidence while preserving the required review-tool structure and character limits. Use when the user asks to run vault-review-peer, /vault-review-peer, or this vault workflow."
---

# workflow-vault-review-peer

Execute the canonical workflow `vault-review-peer`.

1. Read `.agents/workflows/vault-review-peer/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/vault-review-peer/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
