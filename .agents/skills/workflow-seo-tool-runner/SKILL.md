---
name: workflow-seo-tool-runner
description: "Select, plan, or run bounded neutral CLI tools for approved SEO evidence collection. Use when the user asks to run seo-tool-runner, /seo-tool-runner, or this vault workflow."
---

# workflow-seo-tool-runner

Execute the canonical workflow `seo-tool-runner`.

1. Read `.agents/workflows/seo-tool-runner/contract.json` for risk tier, approval classes, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/seo-tool-runner/workflow.md` for the human-readable workflow procedure.
3. Treat the user's prompt as workflow input.
4. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
5. Do not report done until the workflow verification requirements are satisfied or a blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
