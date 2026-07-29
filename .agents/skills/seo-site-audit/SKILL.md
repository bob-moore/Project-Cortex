---
name: seo-site-audit
description: "Use for a bounded site-wide SEO audit that combines technical crawl evidence, page samples, and Phase 3 gap checks."
---

# SEO Site Audit

Execute the canonical `seo-site-audit` workflow.

1. Read `.agents/workflows/seo-site-audit/contract.json` and `workflow.md`.
2. Apply `seo-foundation`, `seo-technical-audit`, `seo-page-audit`, and the
   applicable sitemap/schema/images/hreflang/robots/metadata/headers checks.
3. Preserve one evidence root with caps, raw output, normalized packets,
   partial states, and affected URL samples.
4. Apply `seo-quality-gate` before returning findings as ready.

This skill does not publish, mutate a CMS, change code, submit URLs, use paid
providers, or enable credentials.
