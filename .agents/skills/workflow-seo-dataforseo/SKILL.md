---
name: workflow-seo-dataforseo
description: "Define DataForSEO provider evidence with explicit source status, freshness, scope, and limitations. Use when the user asks to run seo-dataforseo, /seo-dataforseo, or this vault workflow."
---

# workflow-seo-dataforseo

Execute the canonical workflow `seo-dataforseo`.

1. Read `.agents/workflows/seo-dataforseo/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/seo-dataforseo/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
