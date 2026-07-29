---
description: "Draft a self-review from vault evidence, candidate review notes, and project outcomes for a target review cycle."
---

# vault-self-review

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/vault-self-review/workflow.md` and its contract at `.agents/workflows/vault-self-review/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
