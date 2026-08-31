---
description: "Define DataForSEO provider evidence with explicit source status, freshness, scope, and limitations."
---

# seo-dataforseo

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/seo-dataforseo/workflow.md` and its contract at `.agents/workflows/seo-dataforseo/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
