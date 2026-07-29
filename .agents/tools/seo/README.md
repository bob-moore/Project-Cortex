---
description: Canonical SEO CLI tool contracts, evidence output rules, and selection guidance.
tags:
  - agents
  - tools
  - seo
---

# SEO Tool Contracts

This directory defines the neutral CLI/tool layer for SEO evidence collection.
It does not store credentials and does not install tools automatically.

Use these contracts after `seo-foundation` identifies mode, scope, approval
class, and evidence needs. Tool output must pass `seo-quality-gate` before it
is treated as a ready SEO artifact.

## Files

- `tool-registry.json`: machine-readable tool selection and safety metadata.
- `evidence-schema.json`: normalized shape for SEO evidence packets.
- `run-tool.mjs`: registry-driven runner that captures raw output and writes a
  schema-shaped evidence packet.
- `gap-check.py`: bounded structural checks for sitemap XML, JSON-LD, image
  markup, hreflang links, robots.txt, metadata/indexability, and security
  headers.

## Default Evidence Path

Write tool output to a scoped evidence folder, unless the user chooses another
path:

```text
reviews/evidence/seo/YYYY-MM-DD-<site-or-project>-<scope>/
```

Keep raw tool output and normalized summaries separate:

```text
raw/<tool>/
normalized/<tool>.json
summary.md
```

## Approval Boundary

Read-only local file inspection can proceed when scoped. Live URL crawls are
external reads and must stay bounded. Do not run paid provider calls,
credentialed APIs, CMS writes, redirects, sitemap submissions, robots changes,
analytics changes, or production changes from this layer.

Do not install dependencies without approval. If a tool is missing, report the
missing command and the intended command shape.

## Runner

From the vault root, plan or run a bounded tool invocation:

```bash
node .agents/tools/seo/run-tool.mjs \
  --tool linkinator \
  --target https://example.com \
  --mode page-audit \
  --output-dir reviews/evidence/seo/2026-07-28-example-page \
  --dry-run
```

Remove `--dry-run` only after the external-read approval and crawl bounds are
clear. The runner writes `raw/<tool>/` and `normalized/<tool>.json`, preserves
nonzero exits as `partial` or `blocked`, and never enables uploads, credentials,
or mutations. Tool-specific interpretation remains a separate quality-gated
step.

For Phase 3 structural checks, use the gap analyzer against a local artifact or
an approved URL:

```bash
python3 .agents/tools/seo/gap-check.py \
  --mode schema \
  --target path/to/page.html \
  --output-dir reviews/evidence/seo/2026-07-28-example-schema
```

Supported modes are `sitemap`, `schema`, `images`, `hreflang`, `robots`,
`metadata`, and `headers`. The analyzer caps input at 10 MiB, preserves raw
input and metadata, preserves fetched response headers when available, and
reports structural observations without generating or deploying changes.

## Tool Selection

| Need | Preferred Tool | Notes |
|---|---|---|
| Broad site crawl and technical SEO evidence | `siteone-crawler` | First broad crawler for crawlability, metadata, links, security, accessibility-adjacent, performance-adjacent, sitemap, and reporting evidence. |
| Site-wide Lighthouse-style lab evidence | `unlighthouse` | Use for multi-page performance and Lighthouse checks. Lab evidence only. |
| Single-page Lighthouse lab evidence | `lighthouse` | Use for one URL or before/after checks on a small URL set. |
| Focused link validation | `linkinator` | Good for a URL, sitemap-derived list, local HTML, or docs site when the question is link health. |
| Repository or Markdown link validation | `lychee` | Useful for local Markdown/HTML/source-link checks and CI-style link validation. |
| Local HTML/template validation | `html-validate` | Best for local generated HTML, components, and template output before deploy. |
| Full-document HTML conformance | `vnu` | Use when HTML conformance matters; keep Java/runtime setup outside the contract. |
| Accessibility-adjacent page checks | `pa11y` | Report as accessibility/UX-adjacent evidence, not direct SEO ranking proof. |

## Normalization Rules

Every tool-backed finding should preserve:

- tool id and version when available
- command intent and bounded scope
- started and completed timestamps when available
- target URL, local path, sitemap, or URL list
- output artifacts
- data status: `complete`, `partial`, `failed`, `blocked`, or `not-run`
- limitations, skipped checks, page limits, caps, blocked requests, and errors
- finding source references back to raw output
- suggested verification method

## Do Not Claim

- A clean crawl is not proof of indexing, rankings, traffic, conversions, or AI
  citations.
- Lab performance is not field performance.
- Accessibility-adjacent findings are not legal compliance conclusions.
- Link-check success only covers the checked scope and time.
- Missing data is not zero.
