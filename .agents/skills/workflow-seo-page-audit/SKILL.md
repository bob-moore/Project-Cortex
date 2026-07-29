---
name: workflow-seo-page-audit
description: "Execute the canonical seo-page-audit workflow for bounded single-page SEO evidence collection."
---

# workflow-seo-page-audit

Execute the canonical workflow `seo-page-audit`.

1. Read `.agents/workflows/seo-page-audit/contract.json` for scope, approvals,
   writes, done conditions, verification, and return contract.
2. Read `.agents/workflows/seo-page-audit/workflow.md` for the procedure.
3. Apply `seo-foundation`, `seo-tool-runner`, and `seo-quality-gate` in that
   order.
4. Do not report done until the workflow verification requirements pass or a
   blocker is explicitly reported.

If this skill conflicts with the canonical workflow spec, the canonical workflow spec wins.
