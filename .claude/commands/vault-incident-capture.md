---
description: "Capture an incident from Slack channels, DMs, and threads into structured vault notes with timeline, people, analysis, and evidence."
---

# vault-incident-capture

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/vault-incident-capture/workflow.md` and its contract at `.agents/workflows/vault-incident-capture/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
