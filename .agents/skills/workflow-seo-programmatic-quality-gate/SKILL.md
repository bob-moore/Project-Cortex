---
name: workflow-seo-programmatic-quality-gate
description: "Block unsafe scaled SEO recommendations until samples, information gain, business purpose, uniqueness, evidence, and controls are verified. Use when the user asks to run seo-programmatic-quality-gate, /seo-programmatic-quality-gate, or this vault workflow."
---

# workflow-seo-programmatic-quality-gate

Execute the canonical workflow `seo-programmatic-quality-gate`.

1. Read `.agents/workflows/seo-programmatic-quality-gate/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/seo-programmatic-quality-gate/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
