---
description: "Produce a complete Markdown report from approved SEO evidence with source labels, limitations, next actions, and no unsupported business claims."
---

# seo-report

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/seo-report/workflow.md` and its contract at `.agents/workflows/seo-report/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
