---
description: "Audit existing content for SEO query and SERP fit, freshness, decay signals, overlap, and refresh or consolidation recommendations."
---

# seo-content-audit

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/seo-content-audit/workflow.md` and its contract at `.agents/workflows/seo-content-audit/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
