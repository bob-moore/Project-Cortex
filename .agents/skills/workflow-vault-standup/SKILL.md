---
name: workflow-vault-standup
description: "Morning kickoff. Pull Monday.com status for the User's tasks, retrieve calendar evidence through Composio, load today's context, review yesterday, surface open tasks, and identify priorities. Use when the user asks to run vault-standup, /vault-standup, or this vault workflow."
---

# workflow-vault-standup

Execute the canonical workflow `vault-standup`.

1. Read `.agents/workflows/vault-standup/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/vault-standup/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
