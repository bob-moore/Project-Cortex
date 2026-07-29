---
name: seo-technical-audit
description: "Use for bounded site-level technical SEO audits with explicit crawl caps, preserved crawler evidence, and quality-gated findings."
---

# SEO Technical Audit

Execute the canonical `seo-technical-audit` workflow.

1. Read `.agents/workflows/seo-technical-audit/contract.json` and
   `workflow.md`.
2. Apply `seo-foundation` to define site, environment, evidence, and approval
   boundaries.
3. Use `seo-tool-runner` and `.agents/tools/seo/run-tool.mjs` with explicit
   `--max-pages` and `--max-depth` bounds.
4. Preserve raw output, limits, skipped checks, partial states, blocked
   requests, robots/sitemap details, metadata/indexability exceptions,
   response-header evidence, and affected URL samples.
5. Interpret findings with evidence labels and apply `seo-quality-gate` in
   `technical-audit` mode.

This skill does not crawl unbounded production sites, publish, mutate a CMS,
change code, submit URLs, use paid providers, or enable credentials.
