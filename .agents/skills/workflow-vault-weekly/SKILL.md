---
name: workflow-vault-weekly
description: "Weekly synthesis — cross-session review of vault activity, North Star alignment, patterns, candidate review evidence, and forward priorities. Use when the user asks to run vault-weekly, /vault-weekly, or this vault workflow."
---

# workflow-vault-weekly

Execute the canonical workflow `vault-weekly`.

1. Read `.agents/workflows/vault-weekly/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/vault-weekly/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
