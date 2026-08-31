---
name: workflow-seo-action-plan
description: "Produce a evidence-backed prioritized action plan from approved SEO evidence with source labels, limitations, next actions, and no unsupported business claims. Use when the user asks to run seo-action-plan, /seo-action-plan, or this vault workflow."
---

# workflow-seo-action-plan

Execute the canonical workflow `seo-action-plan`.

1. Read `.agents/workflows/seo-action-plan/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/seo-action-plan/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
