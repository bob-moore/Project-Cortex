---
description: "Prep for an upcoming 1:1 — load person context, surface open items, suggest agenda based on vault state."
---

# vault-prep-1on1

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/vault-prep-1on1/workflow.md` and its contract at `.agents/workflows/vault-prep-1on1/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
