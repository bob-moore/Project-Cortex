---
description: "Answer a freeform operational evidence request about Bob's calendar, email, or Monday.com workload without making planning decisions."
---

# assistant

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/assistant/workflow.md` and its contract at `.agents/workflows/assistant/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
