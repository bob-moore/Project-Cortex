---
name: workflow-seo-aeo-audit
description: "Audit answer-engine and SERP answer-feature readiness with source labels and no unsupported placement or visibility claims."
---

# workflow-seo-aeo-audit

Execute `seo-aeo-audit`.

1. Read `.agents/workflows/seo-aeo-audit/contract.json` and `.agents/workflows/seo-aeo-audit/workflow.md`.
2. Read `.agents/skills/seo-aeo-audit/SKILL.md`, `.agents/skills/seo-serp-intent/SKILL.md`, `.agents/skills/seo-content-audit/SKILL.md`, and `.agents/skills/seo-quality-gate/SKILL.md`.
3. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
4. Ask before live SERP, provider, answer-engine, or page reads. Do not invent answer features or make content, schema, CMS, code, or production changes.
5. Return Done, Evidence, Open Items, and Next only after source tiers, answer-feature evidence, answerability, handoffs, and quality gate are complete or explicitly blocked.

The canonical workflow spec wins if this skill conflicts with it.
