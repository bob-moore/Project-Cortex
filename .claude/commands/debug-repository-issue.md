---
description: "Diagnose and fix a bounded repository failure through reproduction, root-cause analysis, implementation, and independent verification."
---

# debug-repository-issue

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/debug-repository-issue/workflow.md` and its contract at `.agents/workflows/debug-repository-issue/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
