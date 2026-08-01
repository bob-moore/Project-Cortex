---
name: workflow-vault-onboard
description: "First-run conversational onboarding: interview the user via the grilling skill to fill harness/user.md, harness/north-star.md, and their org/people/ Voice section; define the Operator's name and stance in harness/operator.md; then run the dependency check from harness/dependencies.md with per-item approved installs. Use when the user asks to run vault-onboard, /vault-onboard, or this vault workflow."
---

# workflow-vault-onboard

Execute the canonical workflow `vault-onboard`.

1. Read `.agents/workflows/vault-onboard/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/vault-onboard/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
