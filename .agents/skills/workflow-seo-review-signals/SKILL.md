---
name: workflow-seo-review-signals
description: "Assess approved local review evidence for volume, recency, relevance, sentiment themes, response coverage, and safe operational handoffs."
---

# workflow-seo-review-signals

Execute `seo-review-signals`.

1. Read `.agents/workflows/seo-review-signals/contract.json` and `.agents/workflows/seo-review-signals/workflow.md`.
2. Read `.agents/skills/seo-review-signals/SKILL.md`, `.agents/skills/seo-local-audit/SKILL.md`, and `.agents/skills/seo-quality-gate/SKILL.md`.
3. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
4. Ask before live review-platform, maps, directory, or provider reads. Do not create, suppress, manipulate, respond to, or mutate reviews or platforms.
5. Return Done, Evidence, Open Items, and Next only after review scope, source status, sample/method, confidence, themes, handoffs, and quality gate are complete or explicitly blocked.

The canonical workflow spec wins if this skill conflicts with it.
