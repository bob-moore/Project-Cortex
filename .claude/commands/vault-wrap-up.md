---
description: "Run an end-of-session vault review: modified files, note quality, indexes, memory updates, and workflow improvements."
---

# vault-wrap-up

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/vault-wrap-up/workflow.md` and its contract at `.agents/workflows/vault-wrap-up/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
