---
name: workflow-seo-maps-audit
description: "Audit approved maps and local-listing evidence for identity, categories, service areas, local-pack signals, and landing-page fit. Use when the user asks to run seo-maps-audit, /seo-maps-audit, or this vault workflow."
---

# workflow-seo-maps-audit

Execute the canonical workflow `seo-maps-audit`.

1. Read `.agents/workflows/seo-maps-audit/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/seo-maps-audit/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
