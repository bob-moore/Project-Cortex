---
description: "Block unsafe scaled SEO recommendations until samples, information gain, business purpose, uniqueness, evidence, and controls are verified."
---

# seo-programmatic-quality-gate

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/seo-programmatic-quality-gate/workflow.md` and its contract at `.agents/workflows/seo-programmatic-quality-gate/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
