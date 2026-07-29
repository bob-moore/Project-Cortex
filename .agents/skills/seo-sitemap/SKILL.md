---
name: seo-sitemap
description: "Use to inspect a sitemap or sitemap index with bounded, read-only evidence collection."
---

# SEO Sitemap

Execute `seo-sitemap` and run:

`python3 .agents/tools/seo/gap-check.py --mode sitemap --target <path-or-url>`

Preserve parser errors, entry counts, duplicate and missing loc findings, input
limits, and approval class. Do not generate, submit, or replace sitemaps.
Apply `seo-quality-gate` in technical-audit mode before claiming readiness.
