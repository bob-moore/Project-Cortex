---
description: "Select, plan, or run bounded neutral CLI tools for approved SEO evidence collection."
---

# seo-tool-runner

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/seo-tool-runner/workflow.md` and its contract at `.agents/workflows/seo-tool-runner/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
