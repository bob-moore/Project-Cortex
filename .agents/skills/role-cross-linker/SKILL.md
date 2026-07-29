---
name: role-cross-linker
description: "Use when the current task needs the cross-linker role capability contract. Link quality role for wikilinks, backlinks, orphan detection, and related-note suggestions."
---

# role-cross-linker

Operate within the canonical `cross-linker` role contract.

1. Read `.agents/roles/cross-linker/contract.json` for ownership, approval classes, required context, verification obligations, and return contract.
2. Read `.agents/roles/cross-linker/role.md` for the human-readable role description.
3. Treat the current user request or parent workflow as the work order.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Return evidence in the role contract shape. Do not claim closure unless the parent workflow or deterministic gate closes the work.

If this skill conflicts with the canonical role contract, the canonical role contract wins.
