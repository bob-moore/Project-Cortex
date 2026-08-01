---
name: workflow-seo-monitoring-pack
description: "Package recurring SEO signals, drift, alerts, source freshness, actions, limitations, escalation, and next runs into a scorecard."
---

# workflow-seo-monitoring-pack

Execute `seo-monitoring-pack`.

1. Read `.agents/workflows/seo-monitoring-pack/contract.json` and `.agents/workflows/seo-monitoring-pack/workflow.md`.
2. Read `.agents/skills/seo-monitoring-pack/SKILL.md` and `.agents/skills/seo-quality-gate/SKILL.md`.
3. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
4. Use approved evidence only; ask before live reads or mutations. Markdown is the source of truth; optional HTML/PDF is presentation only.
5. Return Done, Evidence, Open Items, and Next only after source labels, limitations, actions/rechecks, and reporting quality gate are complete or explicitly blocked.

The canonical workflow spec wins if this skill conflicts with it.
