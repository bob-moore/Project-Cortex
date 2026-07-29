---
name: seo-schema
description: "Use to detect and structurally inspect JSON-LD in page evidence without deploying schema."
---

# SEO Schema

Execute `seo-schema` and run:

`python3 .agents/tools/seo/gap-check.py --mode schema --target <path-or-url>`

Preserve invalid JSON, observed `@type` values, source facts, and parser
limits. Do not invent entity facts or promise rich-result eligibility. Apply
`seo-quality-gate` in schema mode and hand implementation work to the developer
or WordPress operator.
