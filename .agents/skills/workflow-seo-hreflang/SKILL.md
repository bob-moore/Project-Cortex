---
name: workflow-seo-hreflang
description: "Inspect hreflang alternate links for structural evidence without changing international routing. Use when the user asks to run seo-hreflang, /seo-hreflang, or this vault workflow."
---

# workflow-seo-hreflang

Execute the canonical workflow `seo-hreflang`.

1. Read `.agents/workflows/seo-hreflang/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/seo-hreflang/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
