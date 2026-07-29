---
description: "Turn a 1:1 transcript, notes, or summary into a structured vault note with takeaways, quotes, action items, and related context."
---

# vault-capture-1on1

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/vault-capture-1on1/workflow.md` and its contract at `.agents/workflows/vault-capture-1on1/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
