---
description: "Assess approved local review evidence for volume, recency, relevance, sentiment themes, response coverage, and safe operational handoffs."
---

# seo-review-signals

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/seo-review-signals/workflow.md` and its contract at `.agents/workflows/seo-review-signals/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
