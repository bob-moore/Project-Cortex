---
description: "Identify broken, lost, redirected, orphaned, or unlinked external-link candidates and route safe reclaim recommendations."
---

# seo-link-reclaim

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/seo-link-reclaim/workflow.md` and its contract at `.agents/workflows/seo-link-reclaim/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
