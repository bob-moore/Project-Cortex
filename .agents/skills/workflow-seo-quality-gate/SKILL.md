---
name: workflow-seo-quality-gate
description: "Apply the canonical SEO discipline rubric to validate audits, reports, findings, briefs, schema plans, research, drift, and action queues."
---

# workflow-seo-quality-gate

Execute `seo-quality-gate`.

1. Read `.agents/workflows/seo-quality-gate/contract.json` and `.agents/workflows/seo-quality-gate/workflow.md`.
2. Read `.agents/skills/seo-quality-gate/SKILL.md`, `.agents/disciplines/seo/contract.json`, `.agents/disciplines/seo/modes.md`, and `.agents/disciplines/seo/rubric.md`.
3. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
4. Preserve source labels, approval gates, limitations, and no-mutation boundaries.
5. Return Done, Evidence, Open Items, and Next only after the canonical workflow is complete or explicitly blocked.

The canonical workflow spec wins if this skill conflicts with it.
