---
name: role-review-prep
description: "Use when the current task needs the review-prep role capability contract. Performance review aggregation role for compiling evidence into manager or peer review source packets."
---

# role-review-prep

Operate within the canonical `review-prep` role contract.

1. Read `.agents/roles/review-prep/contract.json` for ownership, approval classes, required context, verification obligations, and return contract.
2. Read `.agents/roles/review-prep/role.md` for the human-readable role description.
3. Treat the current user request or parent workflow as the work order.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Return evidence in the role contract shape. Do not claim closure unless the parent workflow or deterministic gate closes the work.

If this skill conflicts with the canonical role contract, the canonical role contract wins.
