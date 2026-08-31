---
name: workflow-seo-review-signals
description: "Assess approved local review evidence for volume, recency, relevance, sentiment themes, response coverage, and safe operational handoffs. Use when the user asks to run seo-review-signals, /seo-review-signals, or this vault workflow."
---

# workflow-seo-review-signals

Execute the canonical workflow `seo-review-signals`.

1. Read `.agents/workflows/seo-review-signals/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/seo-review-signals/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
