---
name: seo-page-audit
description: "Use for a bounded single-page SEO audit that selects neutral CLI evidence tools, preserves raw output, and hands interpreted findings to seo-quality-gate."
---

# SEO Page Audit

Execute the canonical `seo-page-audit` workflow.

1. Read `.agents/workflows/seo-page-audit/contract.json` and `workflow.md`.
2. Apply `seo-foundation` to make target, environment, evidence, and approval
   boundaries explicit.
3. Use `seo-tool-runner` and `.agents/tools/seo/run-tool.mjs` for command
   planning and bounded execution.
4. Preserve raw stdout, stderr, metadata, exit status, skipped checks, and
   tool-specific limitations.
5. Interpret findings with evidence labels; do not convert lab scores or
   validators into ranking guarantees.
6. Apply `seo-quality-gate` before returning the audit as ready.

This skill does not publish, mutate a CMS, change code, submit URLs, use paid
providers, or enable credentials.
