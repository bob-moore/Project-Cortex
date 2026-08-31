---
description: "Prepare a portable upstream contribution proposal and draft changelog operations without promoting instance context."
---

# prepare-harness-changelog

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/prepare-harness-changelog/workflow.md` and its contract at `.agents/workflows/prepare-harness-changelog/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
