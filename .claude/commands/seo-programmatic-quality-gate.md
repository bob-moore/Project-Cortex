---
description: "Block unsafe scaled SEO recommendations until samples, information gain, business purpose, uniqueness, evidence, and controls are verified."
---

# seo-programmatic-quality-gate

This is a Claude Code command adapter.

Read and execute `.agents/workflows/seo-programmatic-quality-gate/workflow.md` and `.agents/workflows/seo-programmatic-quality-gate/contract.json`.

Pass `$ARGUMENTS` through as workflow input. Read and execute the canonical workflow and contract. Require representative samples and return PASS, PASS_WITH_CONDITIONS, BLOCK, or DEFERRED. Do not generate pages, publish, or mutate templates, CMS, code, or production. The canonical workflow spec wins if this adapter conflicts with it.
