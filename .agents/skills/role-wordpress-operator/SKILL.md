---
name: role-wordpress-operator
description: "Use when the current task needs the wordpress-operator role capability contract. Mutable WordPress state role for pages, posts, media, navigation, settings, forms, redirects, users, and Site Editor state."
---

# role-wordpress-operator

Operate within the canonical `wordpress-operator` role contract.

1. Read `.agents/roles/wordpress-operator/contract.json` for ownership, approval classes, required context, verification obligations, and return contract.
2. Read `.agents/roles/wordpress-operator/role.md` for the human-readable role description.
3. Read `.agents/disciplines/wordpress-operations/contract.json`, `modes.md`, and `rubric.md`.
4. Treat the current user request or parent workflow as the work order.
5. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
6. Return evidence in the role contract shape. Do not claim closure unless the parent workflow or deterministic gate closes the work.

If this skill conflicts with the canonical role contract, the canonical role contract wins.
