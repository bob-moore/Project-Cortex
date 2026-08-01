---
name: workflow-seo-dataforseo
description: "Define bounded DataForSEO evidence handling with provider availability, credential, quota, freshness, market, language, device, and methodology labels."
---

# workflow-seo-dataforseo

Execute `seo-dataforseo`.

1. Read `.agents/workflows/seo-dataforseo/contract.json` and `.agents/workflows/seo-dataforseo/workflow.md`.
2. Read `.agents/skills/seo-dataforseo/SKILL.md` and `.agents/skills/seo-quality-gate/SKILL.md`.
3. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
4. Ask before live external reads or paid/credentialed calls; do not mutate analytics, providers, CMS, code, SEO, or production.
5. Return Done, Evidence, Open Items, and Next only after source status, freshness, scope, limitations, and quality gate are complete or explicitly blocked.

The canonical workflow spec wins if this skill conflicts with it.
