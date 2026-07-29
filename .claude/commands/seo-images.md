---
description: "Inspect image markup for alt text and layout-related attributes without editing assets."
---

# seo-images

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/seo-images/workflow.md` and its contract at `.agents/workflows/seo-images/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
