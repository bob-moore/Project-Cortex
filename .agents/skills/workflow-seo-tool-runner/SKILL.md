---
name: workflow-seo-tool-runner
description: "Select, plan, or run approved neutral CLI tools for bounded SEO evidence collection using the canonical registry and evidence schema."
---

# workflow-seo-tool-runner

Execute `seo-tool-runner`.

1. Read `.agents/workflows/seo-tool-runner/contract.json` and `.agents/workflows/seo-tool-runner/workflow.md`.
2. Read `.agents/skills/seo-tool-runner/SKILL.md`, `.agents/disciplines/seo/contract.json`, `.agents/disciplines/seo/modes.md`, and `.agents/disciplines/seo/rubric.md`.
3. Follow `harness/policies/contract.md`, `harness/policies/approvals.md`, and `harness/policies/done.md`.
4. Preserve source labels, approval gates, limitations, and no-mutation boundaries.
5. Return Done, Evidence, Open Items, and Next only after the canonical workflow is complete or explicitly blocked.

The canonical workflow spec wins if this skill conflicts with it.
