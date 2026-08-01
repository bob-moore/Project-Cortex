---
name: workflow-seo-foundation
description: "Use the canonical SEO source hierarchy, evidence labels, approval boundaries, scoring policy, and cross-discipline handoffs."
---

# workflow-seo-foundation

Execute `seo-foundation`.

1. Read `.agents/workflows/seo-foundation/contract.json` and `.agents/workflows/seo-foundation/workflow.md`.
2. Read `.agents/skills/seo-foundation/SKILL.md`, `.agents/disciplines/seo/contract.json`, `.agents/disciplines/seo/modes.md`, and `.agents/disciplines/seo/rubric.md`.
3. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
4. Preserve source labels, approval gates, limitations, and no-mutation boundaries.
5. Return Done, Evidence, Open Items, and Next only after the canonical workflow is complete or explicitly blocked.

The canonical workflow spec wins if this skill conflicts with it.
