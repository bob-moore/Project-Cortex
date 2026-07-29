---
name: workflow-vault-stash-session
description: "Create a compact resume note for continuing paused or interrupted vault work in a later runtime session. Use when the user asks to run vault-stash-session, /vault-stash-session, or this vault workflow."
---

# workflow-vault-stash-session

Execute the canonical workflow `vault-stash-session`.

1. Read `.agents/workflows/vault-stash-session/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/vault-stash-session/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
