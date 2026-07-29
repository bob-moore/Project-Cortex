---
name: workflow-vault-peer-scan
description: "Deep scan a peer's GitHub PRs for review preparation and save structured evidence under `reviews/evidence/`. Use when the user asks to run vault-peer-scan, /vault-peer-scan, or this vault workflow."
---

# workflow-vault-peer-scan

Execute the canonical workflow `vault-peer-scan`.

1. Read `.agents/workflows/vault-peer-scan/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/vault-peer-scan/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
