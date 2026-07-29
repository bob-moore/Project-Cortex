---
name: workflow-repurpose-content
description: "Turn an existing source artifact into derivative outputs while preserving evidence, context, and approval boundaries. Use when the user asks to run repurpose-content, /repurpose-content, or this vault workflow."
---

# workflow-repurpose-content

Execute the canonical workflow `repurpose-content`.

1. Read `.agents/workflows/repurpose-content/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/repurpose-content/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
