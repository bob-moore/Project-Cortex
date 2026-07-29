---
description: "Audit and update an existing long-form article with preservation, claim handling, and readiness checks."
---

# refresh-article

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/refresh-article/workflow.md` and its contract at `.agents/workflows/refresh-article/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
