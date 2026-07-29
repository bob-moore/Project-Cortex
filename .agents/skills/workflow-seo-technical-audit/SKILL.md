---
name: workflow-seo-technical-audit
description: "Execute the canonical seo-technical-audit workflow for bounded site-level SEO evidence collection."
---

# workflow-seo-technical-audit

Execute the canonical workflow `seo-technical-audit`.

1. Read `.agents/workflows/seo-technical-audit/contract.json` for scope,
   approvals, writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/seo-technical-audit/workflow.md` for the procedure.
3. Apply `seo-foundation`, `seo-tool-runner`, and `seo-quality-gate` in that
   order.
4. Do not report done until the workflow verification requirements pass or a
   blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
