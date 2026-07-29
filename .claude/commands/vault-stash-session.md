---
description: "Create a compact resume note for continuing paused or interrupted vault work in a later runtime session."
---

# vault-stash-session

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/vault-stash-session/workflow.md` and its contract at `.agents/workflows/vault-stash-session/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
