---
description: "First-run conversational onboarding: interview the user via the grilling skill to fill harness/user.md, harness/north-star.md, and their org/people/ Voice section; define the Operator's name and stance in harness/operator.md; then run the dependency check from harness/dependencies.md with per-item approved installs."
---

# vault-onboard

This is a Claude Code command adapter.

Read and execute the canonical workflow spec at `.agents/workflows/vault-onboard/workflow.md` and its contract at `.agents/workflows/vault-onboard/contract.json`.

Pass the user's command arguments through as workflow input:

```text
$ARGUMENTS
```

Follow the workflow's required context, approval gates, verification gates, and return format. If this adapter conflicts with the canonical workflow spec, the canonical workflow spec wins.
