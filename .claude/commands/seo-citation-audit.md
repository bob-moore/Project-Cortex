---
description: "Audit approved local citation evidence for NAP, category, URL, ownership, relevance, indexability, duplicates, freshness, and correction priority."
---

# seo-citation-audit

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/seo-citation-audit/workflow.md` and its contract at `.agents/workflows/seo-citation-audit/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
