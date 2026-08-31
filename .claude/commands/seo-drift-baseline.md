---
description: "Define approved pre-change SEO snapshots with explicit source status, freshness, scope, and limitations."
---

# seo-drift-baseline

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/seo-drift-baseline/workflow.md` and its contract at `.agents/workflows/seo-drift-baseline/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
