---
description: "Apply a contiguous Project Cortex changelog chain to a consuming vault with dry-run planning, explicit confirmations, local-override protection, and update receipts."
---

# update-harness

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/update-harness/workflow.md` and its contract at `.agents/workflows/update-harness/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
