---
description: Roadmap for rebuilding a full SEO discipline and tool suite.
tags:
  - harness
  - roadmap
  - seo
---

# SEO Roadmap

## North Star

Build a full agency-grade SEO discipline for the vault.

The canonical SEO system should support technical audits, page audits,
full-site audits, keyword and SERP research, backlink analysis and link-building
opportunity discovery, local SEO, maps intelligence, schema, sitemap,
international SEO, ecommerce, programmatic SEO, content briefs, GEO/AEO/SXO,
drift monitoring, and executive reporting.

Do not adopt Claude SEO, Codex SEO, Agentic SEO, or any other package wholesale.
Use them as source material. Canonical behavior belongs in `.agents/` and
operational methodology belongs in `harness/`.

## Operating Principles

- Evidence first: every finding must cite observed page, crawl, API, tool, or
  documented source evidence.
- Source-tier labels are required for volatile SEO claims: official docs,
  vendor docs, tool output, third-party study, heuristic, or hypothesis.
- Paid-data calls require cost estimates and approval gates.
- Credentials stay external and project-local where possible.
- SEO content work briefs the writing discipline; it does not bypass writing
  gates.
- Generated schema, sitemap changes, CMS edits, or code changes require the
  appropriate mutation workflow and approval.
- Scores are directional summaries, not proof.
- Reports must preserve unknowns and environment limitations.

## Preferred Tool Stack

| Tool | Canonical Use |
|---|---|
| SiteOne Crawler | Broad site crawl, SEO/OpenGraph, security, accessibility, performance, broken links, sitemap generation, browser rendering, CI gates, markdown export. |
| Unlighthouse/Lighthouse | Site-wide Lighthouse and CWV-oriented lab evidence. |
| linkinator | Focused broken-link validation. |
| lychee | Repository, Markdown, HTML, and CI-style link validation where a browser crawl is unnecessary. |
| html-validate | Local generated HTML, template, and component validation before deploy. |
| vnu | Full-document HTML conformance checks for URLs or generated files. |
| pa11y | Targeted accessibility-adjacent page evidence that must remain separate from SEO ranking claims. |
| DataForSEO | Optional paid SERP, keyword, backlink, maps, listing, ecommerce, and AI visibility data. |
| Google APIs | Optional GSC, GA4, URL Inspection, PageSpeed, CrUX, Indexing, YouTube, and Knowledge Graph evidence. |
| Selected imported Python scripts | Only for gaps not covered well by neutral tools. |

## Build Phases

### Phase 1: Discipline Foundation

Goal: make SEO a canonical discipline without activating the full suite.

Deliverables:

- `.agents/disciplines/seo/README.md`
- `.agents/disciplines/seo/contract.json`
- `.agents/disciplines/seo/modes.md`
- `.agents/disciplines/seo/rubric.md`
- `.agents/disciplines/seo/skill-map.json`
- `seo-foundation` skill
- `seo-quality-gate` skill

Scope:

- evidence labels
- source hierarchy
- scoring policy
- approval classes
- report structure
- interaction with writing, developer, wordpress-operator, strategist, and
  verifier roles

Exit criteria:

- `node .agents/scripts/verify-disciplines.mjs` validates SEO.
- The SEO quality gate can evaluate a finding list without running external
  tools.

### Phase 2: Neutral Tool Wrappers

Goal: establish canonical evidence collection before custom SEO logic.

Deliverables:

- `.agents/tools/seo/README.md`
- CLI tool registry for SiteOne, Unlighthouse, Lighthouse, linkinator, lychee,
  html-validate, vnu, and pa11y
- tool output normalization format
- evidence output path convention

Scope:

- read-only audits only
- no paid APIs
- no credentialed calls
- no CMS or code mutation

Exit criteria:

- A bounded page/site audit can collect crawl, metadata, links, performance,
  and report artifacts into a project evidence folder.

Current implementation status:

- Added `.agents/tools/seo/README.md` for tool selection and evidence output
  rules.
- Added `.agents/tools/seo/tool-registry.json` for neutral CLI tool metadata.
- Added `.agents/tools/seo/evidence-schema.json` for normalized evidence
  packets.
- Added `seo-tool-runner` as the active skill for selecting, planning, and
  running approved neutral CLI tools through those contracts.
- Added `.agents/tools/seo/run-tool.mjs` as the thin registry-driven runner.
- The runner supports dry-run planning, bounded process timeouts, raw
  stdout/stderr capture, exit-status preservation, and schema-shaped evidence
  packets.
- Tool-specific finding interpretation remains open; the runner intentionally
  does not turn raw output into ranking claims or an all-clear.

Phase 2 is implementation-complete for the neutral execution layer. Phase 3
starts with page and technical audit workflows that interpret these artifacts.

### Phase 3: Page And Technical SEO

Goal: support high-quality single-page and technical SEO audits.

Canonical skills/workflows:

- `seo-page-audit`
- `seo-technical-audit`
- `seo-site-audit` initial version
- `seo-sitemap`
- `seo-schema`
- `seo-images`
- `seo-hreflang`

Scope:

- on-page metadata
- headings and information hierarchy
- crawlability and indexability
- robots and x-robots headers
- canonical tags
- sitemap discovery and validation
- structured data detection and generation guidance
- image alt text, dimensions, weight, and lazy loading
- performance/CWV lab evidence
- security and accessibility-adjacent findings with clear labels

Exit criteria:

- A site can be audited using SiteOne, Unlighthouse, and linkinator plus
  selected gap scripts.
- Findings pass `seo-quality-gate` before final report.

### Phase 4: SEO Strategy And Content Interface

Goal: connect SEO research to strategy and writing without collapsing the two.

Canonical skills/workflows:

- `seo-content-brief`
- `seo-content-audit`
- `seo-keyword-research`
- `seo-serp-intent`
- `seo-topic-cluster`
- `seo-strategy-roadmap`
- integration with `write-article`, `refresh-article`, and `write-web-copy`

Scope:

- keyword research and intent
- SERP analysis
- competitor page analysis
- topic clusters and hub-spoke architecture
- content decay and refresh candidates
- SEO briefs that hand off to writing
- page-type specific scoring

Exit criteria:

- SEO can produce a brief, strategy, or refresh recommendation with source
  labels and writing handoff requirements.

### Phase 5: Backlinks And Authority

Goal: make backlink building/finding a first-class SEO lane.

Canonical skills/workflows:

- `seo-backlink-audit`
- `seo-link-building-opportunities`
- `seo-competitor-backlink-gap`
- `seo-link-reclaim`

Scope:

- DataForSEO, Moz, Bing Webmaster, Common Crawl, and manual/source evidence
- referring domains
- anchor text distribution
- toxic/spam indicators
- competitor gaps
- broken backlink reclaim
- local and industry citation opportunities

Exit criteria:

- Backlink findings distinguish confirmed provider data from low-confidence
  crawl or search evidence.
- Paid calls run through budget and approval gates.

### Phase 6: Local SEO And Maps

Goal: support local service, brick-and-mortar, hybrid, and multi-location SEO.

Canonical skills/workflows:

- `seo-local-audit`
- `seo-maps-audit`
- `seo-citation-audit`
- `seo-review-signals`
- `seo-location-page-audit`

Scope:

- GBP signals
- NAP consistency
- service areas
- reviews and owner responses
- local schema
- citations and directories
- maps/geo-grid intelligence where provider access exists
- doorway/location-page risk

Exit criteria:

- Local findings are evidence-backed and separate website-observed facts from
  provider/API facts and third-party ranking-factor studies.

### Phase 7: Advanced Search Surfaces

Goal: cover AI/search-experience strategy without overclaiming.

Canonical skills/workflows:

- `seo-geo-audit`
- `seo-aeo-audit`
- `seo-sxo-audit`
- `seo-ai-visibility-check`

Scope:

- AI Overview / AI Mode readiness
- ChatGPT/Perplexity visibility where measurable
- answer blocks, featured snippets, PAA, knowledge panels
- citation readiness
- intent/page-type mismatch
- entity clarity

Exit criteria:

- Every claim in this lane has a source-tier label.
- Vendor studies and heuristics cannot become confirmed findings without
  supporting evidence.

### Phase 8: Ecommerce And Programmatic SEO

Goal: support complex site models that are common in agency work.

Canonical skills/workflows:

- `seo-ecommerce-audit`
- `seo-product-schema`
- `seo-collection-page-audit`
- `seo-faceted-navigation-audit`
- `seo-programmatic-quality-gate`

Scope:

- product pages
- collection/category pages
- review and product schema
- marketplace intelligence where provider access exists
- faceted navigation and crawl traps
- scaled page templates
- information gain and duplicate-content gates

Exit criteria:

- The harness can block risky programmatic SEO recommendations before content
  or pages are generated at scale.

### Phase 9: Data Integrations And Drift

Goal: connect SEO to durable measurement and deployment checks.

Canonical skills/workflows:

- `seo-google-data`
- `seo-dataforseo`
- `seo-drift-baseline`
- `seo-drift-compare`
- `seo-weekly-monitor`

Scope:

- Google Search Console
- GA4
- PageSpeed Insights and CrUX
- URL Inspection
- Indexing API where appropriate
- DataForSEO
- drift snapshots before/after deployments
- recurring monitoring reports

Exit criteria:

- Credential presence, tool availability, and data freshness are reported
  separately.
- Drift baselines live in documented project/vault evidence paths.

### Phase 10: Reporting And Automation

Goal: produce reusable client-facing and operator-facing SEO outputs.

Canonical skills/workflows:

- `seo-report`
- `seo-action-plan`
- `seo-executive-summary`
- `seo-client-roadmap`
- `seo-monitoring-pack`

Scope:

- markdown report
- action plan
- technical appendix
- evidence bundle
- client-friendly summary
- recurring scorecard
- optional HTML/PDF report generation

Exit criteria:

- Reports are neutral or client-branded.
- No imported package promotional language remains.
- Every report has environment limitations, source labels, and next actions.

## Priority Order

1. `seo-foundation`
2. `seo-quality-gate`
3. neutral tool wrappers: SiteOne, Unlighthouse, linkinator
4. `seo-page-audit`
5. `seo-technical-audit`
6. `seo-site-audit`
7. `seo-schema`, `seo-sitemap`, `seo-images`
8. `seo-content-brief` and writing handoff
9. `seo-keyword-research` and `seo-serp-intent`
10. `seo-backlink-audit` and link-building workflows
11. `seo-local-audit` and maps/citations workflows
12. GEO/AEO/SXO workflows
13. ecommerce/programmatic workflows
14. Google/DataForSEO integrations
15. drift monitoring and recurring reports

## Current Status

Status: paused/stashed as of 2026-07-29.

The SEO package imports remain source material. The canonical foundation,
quality gate, neutral tool registry, and registry-driven execution wrapper are
active and validated. The page-audit, technical-audit, site-audit, sitemap,
schema, image, and hreflang workflows and skills are now created.
Deterministic gap analyzers produce structural evidence for sitemap, JSON-LD,
image markup, hreflang, robots.txt, metadata/indexability, and response headers.
Phase 3 remains open only for broader site-report synthesis and specialist
coverage to be validated through real project evidence.

SEO is intentionally stashed while the harness finishes less intensive
role/skill porting for design, development, and general marketing. Resume from
[[harness/resume/2026-07-29-seo-skill-stash|2026-07-29 SEO Skill Stash]] before
adding Phase 4 strategy/content-interface work.
