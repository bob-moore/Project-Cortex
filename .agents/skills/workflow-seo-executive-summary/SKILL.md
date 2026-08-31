---
name: workflow-seo-executive-summary
description: "Produce a client-readable decision summary from approved SEO evidence with source labels, limitations, next actions, and no unsupported business claims. Use when the user asks to run seo-executive-summary, /seo-executive-summary, or this vault workflow."
---

# workflow-seo-executive-summary

Execute the canonical workflow `seo-executive-summary`.

1. Read `.agents/workflows/seo-executive-summary/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/seo-executive-summary/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
