---
description: "Client work kickoff. Pulls a Monday.com + vault workload briefing, then directly dispatches the selected Strategist, Writer, Designer, Developer, or WordPress Operator and retains verification/revision ownership until the work is complete."
---

# vault-kickoff

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/vault-kickoff/workflow.md` and its contract at `.agents/workflows/vault-kickoff/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
