---
description: "Audit answer-engine and SERP answer-feature readiness with source labels and no unsupported placement or visibility claims."
---

# seo-aeo-audit

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/seo-aeo-audit/workflow.md` and its contract at `.agents/workflows/seo-aeo-audit/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
