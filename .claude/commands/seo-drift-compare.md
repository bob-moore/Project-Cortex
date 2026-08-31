---
description: "Define approved before/after SEO snapshot comparison with explicit source status, freshness, scope, and limitations."
---

# seo-drift-compare

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/seo-drift-compare/workflow.md` and its contract at `.agents/workflows/seo-drift-compare/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
