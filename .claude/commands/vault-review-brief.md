---
description: "Generate a review context-transfer brief from vault data for manager or peer audiences."
---

# vault-review-brief

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/vault-review-brief/workflow.md` and its contract at `.agents/workflows/vault-review-brief/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
