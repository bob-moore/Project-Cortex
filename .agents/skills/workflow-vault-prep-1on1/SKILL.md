---
name: workflow-vault-prep-1on1
description: "Prep for an upcoming 1:1 — load person context, surface open items, suggest agenda based on vault state. Use when the user asks to run vault-prep-1on1, /vault-prep-1on1, or this vault workflow."
---

# workflow-vault-prep-1on1

Execute the canonical workflow `vault-prep-1on1`.

1. Read `.agents/workflows/vault-prep-1on1/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/vault-prep-1on1/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
