---
name: workflow-seo-weekly-monitor
description: "Define recurring read-only SEO monitoring with sources, freshness, thresholds, stale-data handling, escalation, and retention."
---

# workflow-seo-weekly-monitor

Execute `seo-weekly-monitor`.

1. Read `.agents/workflows/seo-weekly-monitor/contract.json` and `.agents/workflows/seo-weekly-monitor/workflow.md`.
2. Read `.agents/skills/seo-weekly-monitor/SKILL.md` and `.agents/skills/seo-quality-gate/SKILL.md`.
3. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
4. Ask before live external reads or paid/credentialed calls; do not mutate analytics, providers, CMS, code, SEO, or production.
5. Return Done, Evidence, Open Items, and Next only after source status, freshness, scope, limitations, and quality gate are complete or explicitly blocked.

The canonical workflow spec wins if this skill conflicts with it.
