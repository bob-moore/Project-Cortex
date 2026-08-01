---
name: workflow-seo-ai-visibility-check
description: "Run bounded, explicitly scoped AI/search visibility observations with source, approval, and reproducibility labels."
---

# workflow-seo-ai-visibility-check

Execute `seo-ai-visibility-check`.

1. Read `.agents/workflows/seo-ai-visibility-check/contract.json` and `.agents/workflows/seo-ai-visibility-check/workflow.md`.
2. Read `.agents/skills/seo-ai-visibility-check/SKILL.md`, `.agents/skills/seo-geo-audit/SKILL.md`, `.agents/skills/seo-aeo-audit/SKILL.md`, and `.agents/skills/seo-quality-gate/SKILL.md`.
3. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
4. Ask before live AI/search/provider/page reads and record approval. Do not fabricate outputs or make provider, content, code, analytics, or production changes.
5. Return Done, Evidence, Open Items, and Next only after engine/model scope, approval, observation log, reproducibility, limitations, handoffs, and quality gate are complete or explicitly blocked.

The canonical workflow spec wins if this skill conflicts with it.
