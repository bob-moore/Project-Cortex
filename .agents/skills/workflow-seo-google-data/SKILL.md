---
name: workflow-seo-google-data
description: "Define bounded Google SEO data collection for GSC, GA4, PSI, CrUX, URL Inspection, and Indexing API with status and freshness labels."
---

# workflow-seo-google-data

Execute `seo-google-data`.

1. Read `.agents/workflows/seo-google-data/contract.json` and `.agents/workflows/seo-google-data/workflow.md`.
2. Read `.agents/skills/seo-google-data/SKILL.md` and `.agents/skills/seo-quality-gate/SKILL.md`.
3. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
4. Ask before live external reads or paid/credentialed calls; do not mutate analytics, providers, CMS, code, SEO, or production.
5. Return Done, Evidence, Open Items, and Next only after source status, freshness, scope, limitations, and quality gate are complete or explicitly blocked.

The canonical workflow spec wins if this skill conflicts with it.
