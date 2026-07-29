---
description: "Create standard or promotional website copy through the canonical writing discipline with claim handling and readiness checks."
---

# write-web-copy

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/write-web-copy/workflow.md` and its contract at `.agents/workflows/write-web-copy/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
