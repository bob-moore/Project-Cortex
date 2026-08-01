---
name: workflow-seo-executive-summary
description: "Produce a client-readable SEO decision summary that separates facts, interpretation, recommendations, assumptions, and unknowns."
---

# workflow-seo-executive-summary

Execute `seo-executive-summary`.

1. Read `.agents/workflows/seo-executive-summary/contract.json` and `.agents/workflows/seo-executive-summary/workflow.md`.
2. Read `.agents/skills/seo-executive-summary/SKILL.md` and `.agents/skills/seo-quality-gate/SKILL.md`.
3. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
4. Use approved evidence only; ask before live reads or mutations. Markdown is the source of truth; optional HTML/PDF is presentation only.
5. Return Done, Evidence, Open Items, and Next only after source labels, limitations, actions/rechecks, and reporting quality gate are complete or explicitly blocked.

The canonical workflow spec wins if this skill conflicts with it.
