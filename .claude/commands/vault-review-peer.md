---
description: "Draft a peer review from vault evidence while preserving the required review-tool structure and character limits."
---

# vault-review-peer

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/vault-review-peer/workflow.md` and its contract at `.agents/workflows/vault-review-peer/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
