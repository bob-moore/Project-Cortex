---
name: workflow-vault-onboard
description: "First-run conversational onboarding: establish user, goals, operator, vault-local operational integration profile, and dependency readiness without storing credentials or assuming runtime-specific connections. Use when the user asks to run vault-onboard, /vault-onboard, or this vault workflow."
---

# workflow-vault-onboard

Execute the canonical workflow `vault-onboard`.

1. Read `.agents/workflows/vault-onboard/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/vault-onboard/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
