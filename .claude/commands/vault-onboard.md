---
description: "First-run conversational onboarding: establish user, goals, operator, vault-local operational integration profile, and dependency readiness without storing credentials or assuming runtime-specific connections."
---

# vault-onboard

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/vault-onboard/workflow.md` and its contract at `.agents/workflows/vault-onboard/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
