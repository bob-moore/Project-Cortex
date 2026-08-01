---
description: "Produce a complete Markdown SEO report from approved evidence with optional presentation output."
---

# seo-report

This is a Claude Code command adapter.

Read and execute `.agents/workflows/seo-report/workflow.md` and `.agents/workflows/seo-report/contract.json`.

Pass `$ARGUMENTS` through as workflow input. Use approved evidence only, preserve source labels and limitations, and treat Markdown as the source of truth. Ask before live reads or mutations. The canonical workflow spec wins if this adapter conflicts with it.
