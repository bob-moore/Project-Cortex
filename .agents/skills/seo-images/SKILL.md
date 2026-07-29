---
name: seo-images
description: "Use to inspect image markup for alt text and layout-related attributes without editing assets."
---

# SEO Images

Execute `seo-images` and run:

`python3 .agents/tools/seo/gap-check.py --mode images --target <path-or-url>`

Distinguish omitted alt from intentional empty decorative alt. Treat dimensions
as markup evidence only; do not claim byte weight, intrinsic performance, or
legal compliance without separate evidence. Apply `seo-quality-gate`.
