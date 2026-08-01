---
description: "Produce a client-readable SEO decision summary that separates facts, interpretation, recommendations, assumptions, and unknowns."
---

# seo-executive-summary

This is a Claude Code command adapter.

Read and execute `.agents/workflows/seo-executive-summary/workflow.md` and `.agents/workflows/seo-executive-summary/contract.json`.

Pass `$ARGUMENTS` through as workflow input. Use approved evidence only, preserve source labels and limitations, and treat Markdown as the source of truth. Ask before live reads or mutations. The canonical workflow spec wins if this adapter conflicts with it.
