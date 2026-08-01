---
name: workflow-seo-keyword-research
description: "Research, expand, cluster, and prioritize SEO keywords and topics with runtime provider availability checks and source-labeled intent evidence. Use when the user asks to run seo-keyword-research, /seo-keyword-research, or this vault workflow."
---

# workflow-seo-keyword-research

Execute the canonical workflow `seo-keyword-research`.

1. Read `.agents/workflows/seo-keyword-research/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/seo-keyword-research/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
