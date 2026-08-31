---
description: "Create a bounded redesign or prototype artifact with current-system evidence and explicit approval before implementation."
---

# design-exploration

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/design-exploration/workflow.md` and its contract at `.agents/workflows/design-exploration/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
