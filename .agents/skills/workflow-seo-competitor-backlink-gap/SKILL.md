---
name: workflow-seo-competitor-backlink-gap
description: "Compare a target domain with explicitly selected competitors using approved backlink evidence and route plausible authority opportunities. Use when the user asks to run seo-competitor-backlink-gap, /seo-competitor-backlink-gap, or this vault workflow."
---

# workflow-seo-competitor-backlink-gap

Execute the canonical workflow `seo-competitor-backlink-gap`.

1. Read `.agents/workflows/seo-competitor-backlink-gap/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/seo-competitor-backlink-gap/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
