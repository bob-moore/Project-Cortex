---
description: "Turn an existing source artifact into derivative outputs while preserving evidence, context, and approval boundaries."
---

# repurpose-content

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/repurpose-content/workflow.md` and its contract at `.agents/workflows/repurpose-content/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
