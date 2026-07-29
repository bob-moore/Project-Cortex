---
description: "Deep scan a peer's GitHub PRs for review preparation and save structured evidence under `reviews/evidence/`."
---

# vault-peer-scan

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/vault-peer-scan/workflow.md` and its contract at `.agents/workflows/vault-peer-scan/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
