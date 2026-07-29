---
name: workflow-assistant
description: "Answer a freeform operational evidence request about Bob's calendar, email, or Monday.com workload without making planning decisions. Use when the user asks to run assistant, /assistant, or this vault workflow."
---

# workflow-assistant

Execute the canonical workflow `assistant`.

1. Read `.agents/workflows/assistant/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/assistant/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
