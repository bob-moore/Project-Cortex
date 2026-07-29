---
description: "Process all unread items in inbox/ — reads each file, classifies content (meeting notes/transcripts and anything else dropped there), routes to the right vault notes, then clears the inbox."
---

# vault-intake

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/vault-intake/workflow.md` and its contract at `.agents/workflows/vault-intake/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
