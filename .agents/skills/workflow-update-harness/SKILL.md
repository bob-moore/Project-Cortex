---
name: workflow-update-harness
description: "Apply a contiguous Project Cortex changelog chain to a consuming vault with dry-run planning, explicit confirmations, local-override protection, and update receipts. Use when the user asks to run update-harness, /update-harness, or this vault workflow."
---

# workflow-update-harness

Execute the canonical workflow `update-harness`.

1. Read `.agents/workflows/update-harness/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/update-harness/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
