---
name: workflow-vault-intake
description: "Process all unread items in inbox/ — reads each file, classifies content (meeting notes/transcripts and anything else dropped there), routes to the right vault notes, then clears the inbox. Use when the user asks to run vault-intake, /vault-intake, or this vault workflow."
---

# workflow-vault-intake

Execute the canonical workflow `vault-intake`.

1. Read `.agents/workflows/vault-intake/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/vault-intake/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
