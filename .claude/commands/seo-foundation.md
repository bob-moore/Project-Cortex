---
description: "Prepare the canonical SEO evidence, approval, mode, and handoff contract before mode-specific work."
---

# seo-foundation

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/seo-foundation/workflow.md` and its contract at `.agents/workflows/seo-foundation/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
