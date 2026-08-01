---
description: "Audit bounded external-link profiles with source-labeled provider, crawl, first-party, and manual evidence."
---

# seo-backlink-audit

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/seo-backlink-audit/workflow.md` and its contract at `.agents/workflows/seo-backlink-audit/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
