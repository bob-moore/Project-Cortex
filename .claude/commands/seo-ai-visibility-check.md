---
description: "Run bounded, explicitly scoped AI/search visibility observations with source, approval, and reproducibility labels."
---

# seo-ai-visibility-check

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/seo-ai-visibility-check/workflow.md` and its contract at `.agents/workflows/seo-ai-visibility-check/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
