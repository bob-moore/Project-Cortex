---
name: seo-tool-runner
description: "Use when an SEO task needs a neutral CLI tool selected, planned, or run for evidence collection, including SiteOne Crawler, Unlighthouse, Lighthouse, linkinator, lychee, html-validate, vnu, or pa11y. Applies the canonical SEO tool registry and evidence schema."
---

# SEO Tool Runner

Use this skill to select, plan, or run neutral CLI tools for SEO evidence
collection.

This skill is read-only by default. It does not install tools, run paid
providers, use credentials, mutate CMS state, submit URLs, change production, or
publish reports.

## Procedure

1. Read `.agents/disciplines/seo/contract.json`.
2. Read `.agents/disciplines/seo/modes.md`.
3. Read `.agents/tools/seo/README.md`.
4. Read `.agents/tools/seo/tool-registry.json`.
5. Identify the SEO mode and evidence need.
6. Select the smallest tool set that can answer the question.
7. Check approval class:
   - local file checks are usually `read_only`
   - live URL crawls are `external_read`
   - installs, paid calls, credentials, CMS writes, and production changes are
     not part of this skill
8. If the tool is installed and approval scope allows it, run a bounded command.
9. Preserve raw output and normalize important findings to the shape in
   `.agents/tools/seo/evidence-schema.json` when producing a durable artifact.
10. Run `seo-quality-gate` before treating findings as ready.

## Tool Preference

Prefer the registry order for each lane:

- `siteone-crawler`: broad crawl and technical SEO evidence.
- `unlighthouse`: site-wide Lighthouse-style lab evidence.
- `lighthouse`: single-page lab evidence.
- `linkinator`: focused link validation.
- `lychee`: repository, Markdown, HTML, or CI-style link validation.
- `html-validate`: local HTML/template validation.
- `vnu`: full-document HTML conformance.
- `pa11y`: accessibility-adjacent page checks.

## Output Shape

For planning:

```text
SEO Tool Plan
Mode:
Evidence Need:
Approval Class:
Selected Tool(s):
Command Shape:
Output Path:
Limits:
Open Items:
```

For completed local evidence collection:

```text
SEO Tool Evidence
Mode:
Tool:
Target:
Data Status:
Artifacts:
Limits:
Findings:
Verification:
Quality Gate:
```

## Rules

- Do not install missing tools without approval.
- Do not turn lab, crawler, validator, or accessibility output into ranking
  claims.
- Do not hide failed, blocked, partial, or skipped checks.
- Do not store secrets in commands, logs, reports, `.agents/`, or `harness/`.
- Use the evidence output path from `.agents/tools/seo/README.md` unless the
  user gives a scoped alternative.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric
wins.
