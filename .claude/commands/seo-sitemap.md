---
description: "Inspect and validate a sitemap or sitemap index without mutating the site."
---

# seo-sitemap

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/seo-sitemap/workflow.md` and its contract at `.agents/workflows/seo-sitemap/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
