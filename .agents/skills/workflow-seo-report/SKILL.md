---
name: workflow-seo-report
description: "Produce a complete Markdown report from approved SEO evidence with source labels, limitations, next actions, and no unsupported business claims. Use when the user asks to run seo-report, /seo-report, or this vault workflow."
---

# workflow-seo-report

Execute the canonical workflow `seo-report`.

1. Read `.agents/workflows/seo-report/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/seo-report/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
