---
name: workflow-seo-schema
description: "Detect and structurally validate JSON-LD in supplied page evidence without generating production schema. Use when the user asks to run seo-schema, /seo-schema, or this vault workflow."
---

# workflow-seo-schema

Execute the canonical workflow `seo-schema`.

1. Read `.agents/workflows/seo-schema/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/seo-schema/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
