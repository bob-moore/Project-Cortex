---
name: workflow-seo-aeo-audit
description: "Audit answer-engine and SERP answer-feature readiness with source labels and no unsupported placement or visibility claims. Use when the user asks to run seo-aeo-audit, /seo-aeo-audit, or this vault workflow."
---

# workflow-seo-aeo-audit

Execute the canonical workflow `seo-aeo-audit`.

1. Read `.agents/workflows/seo-aeo-audit/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/seo-aeo-audit/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
