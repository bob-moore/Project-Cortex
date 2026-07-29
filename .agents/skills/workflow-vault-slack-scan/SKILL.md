---
name: workflow-vault-slack-scan
description: "Deep scan Slack channels, DMs, and threads for a person or project and turn the evidence into vault-ready context. Use when the user asks to run vault-slack-scan, /vault-slack-scan, or this vault workflow."
---

# workflow-vault-slack-scan

Execute the canonical workflow `vault-slack-scan`.

1. Read `.agents/workflows/vault-slack-scan/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/vault-slack-scan/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
