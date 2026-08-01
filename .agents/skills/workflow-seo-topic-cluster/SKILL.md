---
name: workflow-seo-topic-cluster
description: "Turn keyword, SERP-intent, and content-audit evidence into topic clusters, hub/spoke architecture, page roles, boundaries, and internal-link recommendations. Use when the user asks to run seo-topic-cluster, /seo-topic-cluster, or this vault workflow."
---

# workflow-seo-topic-cluster

Execute the canonical workflow `seo-topic-cluster`.

1. Read `.agents/workflows/seo-topic-cluster/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/seo-topic-cluster/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
