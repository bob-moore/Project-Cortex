---
description: "Research and narrow a visual direction through an evidence-backed moodboard, annotated references, anti-SaaS checks, and explicit alternatives before design implementation."
---

# design-research

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/design-research/workflow.md` and its contract at `.agents/workflows/design-research/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
