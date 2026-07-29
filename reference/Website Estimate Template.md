---
date: 2026-07-17
description: "How Bob builds website-build estimates — Drive locations, the $180/hr blended rate (stable since 2023), current template structure, and comparable-scope reference points."
tags:
  - reference
---

# Website Estimate Template

Reviewed 2026-07-17 while prepping the [[Aalair Home Care Needs Analysis|Aalair Home Care]] estimate — full sweep of Bob's [estimates Drive folder](https://drive.google.com/drive/folders/1clxE0yBhag9cNJkDDJxZTt9zScZrVVWJ?usp=drive_link) and the current [starting template](https://docs.google.com/spreadsheets/d/1kYVQwfTlzCqlMutgOMYj5a7JfLsUPEj2RFdxGhabE_Q/edit?usp=sharing) (`_New Template`, Jan 2026).

## The rate

**$180/hr blended, unchanged for 3+ years.** Every estimate sampled — from a May 2023 "BASE Estimate" through the June 2026 Brunsell estimate — divides out to exactly $180/hr (cost ÷ total hours) regardless of project size or era. Stable enough to treat as the default for new estimates unless deliberately deviating.

## Current template structure (4 tabs)

1. **Cost Breakdown** — Phase / % of hours / Hrs / Cost, five fixed phases: Theme Development (coding), Content & Information Design, Visual Design, Project Management, Testing/QA/Launch & Misc. Totals at the bottom.
2. **Architecture Breakdown** — Page Title/Level rows × Development/Design/Content hours, one row per page group, summed to a subtotal.
3. **Views & Features** — Design Hrs / Development Hrs per feature: Global Theme Elements, Archive Layout, Singular Page Layout, Singular Post Layout, Error Catch (404), Forms & Lead Collection (with a named sub-list per form). Extended per-project as needed — e.g. Educated Mortgage added a "Calculators" row (6 dev hrs), People4Pulse added "Payment Gateway Implementation" (2 dev hrs).
4. **Sitemap** — URL / Title columns for the final page list.

**Housekeeping flag:** the current template's Views & Features tab still has real leftover data from a past client (named forms like "Ask a Mechanic Form," "Careers Form") — clear these before reusing it for a new estimate.

## Format drift across older estimates

The skeleton above (Theme Dev / Content Design / Visual Design / PM / QA phases + the fixed feature rows) repeats across nearly every estimate from 2024 onward — it's a real standard, not just this one file. Confirmed drift on older ones (per "not all will have the same format"):
- **May 2023 "BASE Estimate"** uses a **Templated vs. Custom Design** two-tier comparison instead of a single build — design/dev/content/PM/QA hours roughly double (or more) for "custom" vs. "templated."
- **Estimates through 2024** sometimes combine cost into Development/Design/**Content & SEO** rather than separating Content from Visual Design.

## Hosting/maintenance and SEO/CRO are never in this spreadsheet

Checked every sample — none price hosting/maintenance or SEO/CRO retainers alongside the build. **This template is build-hours only.** Confirmed by Aalair's own discovery call, where the MWFM team itself framed the proposal as three separate line items ("Website build / Hosting and maintenance / SEO/CRO").

**Why: SEO/CRO is quoted by a different department, not Bob** (per Bob, 2026-07-17):
- **SEO baseline is a fixed price — $1,700/month, with few exceptions.** Not hourly, not scoped per-project like the build. Bob doesn't quote this line himself; it's the other department's standard rate.
- **CRO dev work is the one carve-out Bob personally quotes** — but only *"if they aren't getting a new site."* When a prospect is doing a full rebuild (like Aalair), the new site itself absorbs what CRO dev work would otherwise fix, so no separate CRO dev line gets added on top of the $1,700/mo SEO baseline. CRO dev work as its own quoted line only applies to prospects/clients who are **not** rebuilding — enhancement-only engagements on an existing site.
- **Hosting/maintenance** pricing source is still unconfirmed — not covered by this research pass, ask Bob directly when quoting.

## Comparable-scope reference points (one-time build hours, at $180/hr)

| Estimate | Hours | Cost | Scope |
|---|---|---|---|
| Generic Small Website | 34 | $6,120 | baseline small site |
| Madison Medispa | 39.5–48 | $7,110–$8,640 | ~38 pages, light per-page effort (0.5–0.75 hr/page) |
| People4Pulse | 49 | $8,820 | nonprofit, content pages + blog import |
| Brunsell Lumber | 93.5 | $16,830 | large established site, ~37 pages + 66 legacy blog posts |
| Educated Mortgage | 103.5 | $18,630 | financial services, ~38 pages incl. calculators feature |
| BASE Estimate (2023) "Custom" tier | 208 | $37,440 | upper-bound custom-design reference |

For a moderate-page-count build with heavier-than-usual Content & Information Design hours (copywriting/positioning-driven, not just page-filling) and real accessibility/ADA requirements, expect the build alone to land somewhere in the Madison Medispa–to–Brunsell range ($8,000–$17,000), skewed toward the content-design phase rather than pure coding — this is the working estimate for [[Aalair Home Care Needs Analysis|Aalair Home Care]].

## Related

- [[Aalair Home Care Needs Analysis]] — first prospect this research fed into
- [[Prospects/Index|Prospects Index]]
