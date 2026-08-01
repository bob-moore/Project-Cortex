---
name: workflow-design-research
description: "Research and narrow a visual direction through an evidence-backed moodboard, annotated references, anti-SaaS checks, and explicit alternatives before design implementation. Use when the user asks to run design-research, /design-research, or this vault workflow."
---

# workflow-design-research

Execute the canonical workflow `design-research`.

1. Read `.agents/workflows/design-research/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/design-research/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
