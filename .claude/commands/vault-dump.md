---
description: "Freeform capture mode. Dump anything — conversations, decisions, incidents, wins, thoughts — and I'll route it all to the right notes with proper templates, frontmatter, and wikilinks."
---

# vault-dump

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/vault-dump/workflow.md` and its contract at `.agents/workflows/vault-dump/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
