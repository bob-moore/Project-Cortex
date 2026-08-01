---
description: "Audit approved maps and local-listing evidence for identity, categories, service areas, local-pack signals, and landing-page fit."
---

# seo-maps-audit

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/seo-maps-audit/workflow.md` and its contract at `.agents/workflows/seo-maps-audit/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
