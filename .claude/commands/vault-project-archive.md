---
description: "Archive a completed project or ended client relationship while preserving indexes, status, and retrieval paths."
---

# vault-project-archive

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/vault-project-archive/workflow.md` and its contract at `.agents/workflows/vault-project-archive/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
