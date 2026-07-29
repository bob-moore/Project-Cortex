---
name: workflow-vault-humanize
description: "Voice-calibrated editing — makes agent-drafted text sound like you wrote it, not like AI wrote it. Use when the user asks to run vault-humanize, /vault-humanize, or this vault workflow."
---

# workflow-vault-humanize

Execute the canonical workflow `vault-humanize`.

1. Read `.agents/workflows/vault-humanize/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/vault-humanize/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
