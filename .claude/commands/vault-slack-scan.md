---
description: "Deep scan Slack channels, DMs, and threads for a person or project and turn the evidence into vault-ready context."
---

# vault-slack-scan

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/vault-slack-scan/workflow.md` and its contract at `.agents/workflows/vault-slack-scan/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
