---
description: "Audit product, offer, review, aggregate rating, availability, identifier, variant, and merchant schema facts."
---

# seo-product-schema

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/seo-product-schema/workflow.md` and its contract at `.agents/workflows/seo-product-schema/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
