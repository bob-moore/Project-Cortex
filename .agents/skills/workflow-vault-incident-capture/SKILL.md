---
name: workflow-vault-incident-capture
description: "Capture an incident from Slack channels, DMs, and threads into structured vault notes with timeline, people, analysis, and evidence. Use when the user asks to run vault-incident-capture, /vault-incident-capture, or this vault workflow."
---

# workflow-vault-incident-capture

Execute the canonical workflow `vault-incident-capture`.

1. Read `.agents/workflows/vault-incident-capture/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/vault-incident-capture/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
