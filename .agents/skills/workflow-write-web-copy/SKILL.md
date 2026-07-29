---
name: workflow-write-web-copy
description: "Create standard or promotional website copy through the canonical writing discipline with claim handling and readiness checks. Use when the user asks to run write-web-copy, /write-web-copy, or this vault workflow."
---

# workflow-write-web-copy

Execute the canonical workflow `write-web-copy`.

1. Read `.agents/workflows/write-web-copy/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/write-web-copy/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
