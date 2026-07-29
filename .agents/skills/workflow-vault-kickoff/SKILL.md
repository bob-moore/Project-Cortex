---
name: workflow-vault-kickoff
description: "Client work kickoff. Pulls a Monday.com + vault workload briefing, then directly dispatches the selected Strategist, Writer, Designer, Developer, or WordPress Operator and retains verification/revision ownership until the work is complete. Use when the user asks to run vault-kickoff, /vault-kickoff, or this vault workflow."
---

# workflow-vault-kickoff

Execute the canonical workflow `vault-kickoff`.

1. Read `.agents/workflows/vault-kickoff/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/vault-kickoff/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
