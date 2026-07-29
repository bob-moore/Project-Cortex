---
description: "Weekly synthesis — cross-session review of vault activity, North Star alignment, patterns, candidate review evidence, and forward priorities."
---

# vault-weekly

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/vault-weekly/workflow.md` and its contract at `.agents/workflows/vault-weekly/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
