# v0.1.0 — Draft distribution substrate

This draft establishes the mechanics for explicit release validation, contiguous changelog planning, safe local-override detection, receipts, and contribution/update workflows.

It is not a blanket synchronization of any contributing vault. Each operation in `changelog.yaml` is the update set; Git history is only review evidence.

## Compatibility

- Existing local modifications are skipped and recorded as unresolved overrides.
- `delete` and `migrate` operations require explicit confirmation.
- No client, task, diary, ledger, Graphify, credential, or machine-local material is part of this release.
