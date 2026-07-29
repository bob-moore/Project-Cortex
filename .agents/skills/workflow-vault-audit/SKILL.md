---
name: workflow-vault-audit
description: "Deep structural audit of the vault: indexes, folder placement, frontmatter, links, Bases, and consistency. Use when the user asks to run vault-audit, /vault-audit, or this vault workflow."
---

# workflow-vault-audit

Execute the canonical workflow `vault-audit`.

1. Read `.agents/workflows/vault-audit/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/vault-audit/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
