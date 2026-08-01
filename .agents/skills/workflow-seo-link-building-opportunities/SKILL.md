---
name: workflow-seo-link-building-opportunities
description: "Turn approved backlink, content, topic, brand, and market evidence into ethical, prioritized link-building opportunities without outreach or link acquisition. Use when the user asks to run seo-link-building-opportunities, /seo-link-building-opportunities, or this vault workflow."
---

# workflow-seo-link-building-opportunities

Execute the canonical workflow `seo-link-building-opportunities`.

1. Read `.agents/workflows/seo-link-building-opportunities/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/seo-link-building-opportunities/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
