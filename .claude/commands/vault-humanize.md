---
description: "Voice-calibrated editing — makes agent-drafted text sound like you wrote it, not like AI wrote it."
---

# vault-humanize

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/vault-humanize/workflow.md` and its contract at `.agents/workflows/vault-humanize/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
