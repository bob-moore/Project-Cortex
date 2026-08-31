---
description: "Deliver a bounded user-visible repository change through Designer specification, Developer implementation, rendered Designer review, and fresh-context Verifier review, with evidence bound to the final artifact state before closure."
---

# deliver-web-change

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/deliver-web-change/workflow.md` and its contract at `.agents/workflows/deliver-web-change/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
