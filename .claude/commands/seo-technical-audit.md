---
description: "Run a bounded site-level technical SEO evidence audit and return quality-gated findings."
---

# seo-technical-audit

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/seo-technical-audit/workflow.md` and its contract at `.agents/workflows/seo-technical-audit/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
