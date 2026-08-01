---
description: "Morning kickoff. Pull Monday.com status for the User's tasks, retrieve calendar evidence through Composio, load today's context, review yesterday, surface open tasks, and identify priorities."
---

# vault-standup

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/vault-standup/workflow.md` and its contract at `.agents/workflows/vault-standup/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
