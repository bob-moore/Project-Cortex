---
name: workflow-seo-action-plan
description: "Convert verified SEO findings into prioritized, assignable actions with dependencies, approvals, risks, and rechecks."
---

# workflow-seo-action-plan

Execute `seo-action-plan`.

1. Read `.agents/workflows/seo-action-plan/contract.json` and `.agents/workflows/seo-action-plan/workflow.md`.
2. Read `.agents/skills/seo-action-plan/SKILL.md` and `.agents/skills/seo-quality-gate/SKILL.md`.
3. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
4. Use approved evidence only; ask before live reads or mutations. Markdown is the source of truth; optional HTML/PDF is presentation only.
5. Return Done, Evidence, Open Items, and Next only after source labels, limitations, actions/rechecks, and reporting quality gate are complete or explicitly blocked.

The canonical workflow spec wins if this skill conflicts with it.
