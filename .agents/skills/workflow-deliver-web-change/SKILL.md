---
name: workflow-deliver-web-change
description: "Deliver a bounded user-visible repository change through Designer specification, Developer implementation, rendered Designer review, and fresh-context Verifier review, with evidence bound to the final artifact state before closure. Use when the user asks to run deliver-web-change, /deliver-web-change, or this vault workflow."
---

# workflow-deliver-web-change

Execute the canonical workflow `deliver-web-change`.

1. Read `.agents/workflows/deliver-web-change/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/deliver-web-change/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
