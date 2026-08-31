---
description: "Evaluate an SEO artifact against the canonical discipline rubric without producing or mutating findings."
---

# seo-quality-gate

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/seo-quality-gate/workflow.md` and its contract at `.agents/workflows/seo-quality-gate/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
