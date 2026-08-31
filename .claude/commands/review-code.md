---
description: "Independently review a bounded repository diff, branch, or work in progress against explicit requirements and regression risk."
---

# review-code

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/review-code/workflow.md` and its contract at `.agents/workflows/review-code/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
