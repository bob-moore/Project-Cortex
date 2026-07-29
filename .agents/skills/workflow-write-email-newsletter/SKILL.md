---
name: workflow-write-email-newsletter
description: "Draft email and newsletter copy with explicit intent profiles, claim handling, and a hard no-send boundary. Use when the user asks to run write-email-newsletter, /write-email-newsletter, or this vault workflow."
---

# workflow-write-email-newsletter

Execute the canonical workflow `write-email-newsletter`.

1. Read `.agents/workflows/write-email-newsletter/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/write-email-newsletter/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
