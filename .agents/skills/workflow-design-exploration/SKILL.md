---
name: workflow-design-exploration
description: "Create a bounded redesign or prototype artifact with current-system evidence and explicit approval before implementation. Use when the user asks to run design-exploration, /design-exploration, or this vault workflow."
---

# workflow-design-exploration

Execute the canonical workflow `design-exploration`.

1. Read `.agents/workflows/design-exploration/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/design-exploration/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
