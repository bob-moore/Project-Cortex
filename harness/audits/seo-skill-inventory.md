---
description: Inventory of SEO capabilities across imported packages and preferred neutral tooling.
tags:
  - harness
  - audit
  - seo
  - inventory
---

# SEO Skill Inventory

## Purpose

SEO is a primary use case for this vault. The canonical SEO surface should be a
full agency-grade suite, not a thin audit wrapper.

This inventory normalizes the imported SEO packages into capability areas so
the harness can rebuild SEO one area at a time without accepting any one
runtime-specific package wholesale.

## Sources Inspected

| Source | Role |
|---|---|
| `.claude/skills/seo*` | Legacy Claude-shaped SEO package and references. |
| `stash/Agentic-SEO-Skill` | Multi-runtime LLM-first SEO package with broad deterministic script inventory. |
| `stash/codex-seo` | Codex-shaped implementation reference with wrappers, smoke tests, cache contracts, and agents. |
| SiteOne Crawler | Preferred neutral crawler and broad audit execution tool. |
| Unlighthouse/Lighthouse | Preferred neutral performance, CWV, and Lighthouse evidence tool. |
| linkinator | Preferred focused broken-link checker. |
| lychee | Optional repository, Markdown, HTML, and CI-style link checker. |
| html-validate | Optional local HTML/template validation tool. |
| vnu | Optional full-document HTML conformance validator. |
| pa11y | Optional accessibility-adjacent page evidence tool. |

## Capability Matrix

| Capability | Source Coverage | Preferred Canonical Backing | Gap/Risk |
|---|---|---|---|
| SEO foundation and audit rubric | Agentic, Claude, Codex | Harness-owned `seo-foundation` and `seo-quality-gate` | Must define evidence labels, source hierarchy, scoring, and approval rules before other SEO skills. |
| Full-site audit orchestration | Claude, Agentic, Codex | Harness workflow using SiteOne plus selected specialist checks | Existing packages assume subagents or package-specific output directories. |
| Single-page audit | Claude, Agentic, Codex | Harness workflow using SiteOne/page fetch plus specialist checks | Needs clear split between observed facts and recommendations. |
| Technical SEO | Claude, Agentic, Codex | SiteOne plus selected scripts for canonicals, robots, redirects, JS rendering, indexability | Needs current primary-source verification for platform-specific claims. |
| Crawl/indexability matrix | Agentic, Codex | SiteOne plus selected Agentic scripts | SiteOne may cover most crawl evidence, but indexability verdict logic needs harness-owned scoring. |
| Robots and AI crawler policy | Claude, Agentic, Codex | SiteOne plus selected scripts and verified references | AI crawler guidance is volatile; claims need source-tier labels. |
| XML sitemap audit/generation | Claude, Agentic, Codex, SiteOne | SiteOne plus selected sitemap validation scripts | Generation should be bounded and project-owned; lastmod rules need verified guidance. |
| Hreflang/international SEO | Claude, Agentic, Codex | Selected imported scripts and primary-source references | Neutral tools are unlikely to cover this deeply. |
| Schema detection/validation | Claude, Agentic, Codex | Selected scripts plus `schema-dts` for TS projects | Google rich-result eligibility is volatile; generation must avoid false facts. |
| Product/review/video schema | Agentic, Claude, Codex | Selected schema scripts plus project implementation context | Needs type-specific verification and implementation gate. |
| On-page metadata/headings | Claude, Agentic, Codex, SiteOne | SiteOne plus harness scoring | Needs mode-aware scoring by page type. |
| OpenGraph/social metadata | Agentic, SiteOne | SiteOne plus Agentic `social_meta.py` ideas | Useful for website QA, not pure ranking. |
| Image SEO | Claude, Agentic, Codex, SiteOne | SiteOne plus selected image inventory checks | Need separate performance, accessibility, and image-search concerns. |
| Performance/CWV | Claude, Agentic, Codex, Unlighthouse/Lighthouse | Unlighthouse/Lighthouse, PageSpeed/CrUX where available | Field data requires Google API availability; lab data must not be overclaimed. |
| Accessibility-adjacent SEO | Agentic, SiteOne | SiteOne, possibly Pa11y later | Must not collapse accessibility compliance into SEO score without clear labeling. |
| Security headers / HTTPS | Agentic, SiteOne | SiteOne plus selected security-header checks | Should be reported as trust/UX/technical hygiene, not direct ranking claims. |
| Internal links | Claude, Agentic, Codex, SiteOne | SiteOne plus selected internal-link scripts | Needs crawl depth and site-size boundaries. |
| Broken links | Agentic, SiteOne, linkinator | linkinator and/or SiteOne | linkinator is simpler for focused checks; SiteOne better for broad crawl reports. |
| Repository/source link checks | Neutral CLI expansion | lychee | Useful before crawl/deploy for Markdown, generated docs, and source files; does not prove rendered navigation. |
| HTML/template validation | Neutral CLI expansion | html-validate and/or vnu | Validation failures can affect quality and parsing, but are not ranking proof. |
| Accessibility-adjacent targeted checks | Agentic, SiteOne, Pa11y | SiteOne broad checks plus pa11y for selected URLs | Must not collapse accessibility output into legal compliance or direct SEO ranking claims. |
| Redirect chains | Agentic, SiteOne | SiteOne plus selected redirect checker | Useful for migrations and backlink reclaim. |
| Backlink profile | Claude, Codex, Agentic partial | DataForSEO/Moz/Bing/Common Crawl wrappers | Neutral tools do not cover backlink intelligence. This is a major gap lane. |
| Link-building opportunity finding | Claude, Agentic partial | Harness workflow using DataForSEO/search/manual evidence | Must avoid low-quality/spam recommendations. |
| Competitor analysis | Claude, Agentic, Codex | DataForSEO/search plus harness strategy workflow | Needs source citations and bounded competitor set. |
| Keyword research and volume | Claude, Codex | DataForSEO/Google Ads where available; otherwise evidence-limited research | Paid/API cost gates required. |
| SERP analysis and intent | Claude, Codex, Agentic partial | DataForSEO/search plus harness scoring | Live SERP data may be paid or browser-limited. |
| Topic clustering / hub-spoke | Claude, Codex, Agentic | Harness strategy skill using SERP overlap when data exists | Do not treat semantic similarity as SERP proof. |
| SEO strategy/roadmap | Claude, Agentic, Codex | Harness workflow with client/project context | Needs integration with website planning and writing disciplines. |
| SEO content brief | Claude, Agentic, Codex | SEO brief skill handing off to writing discipline | SEO should brief writing, not replace writer quality gates. |
| Article/blog SEO | Agentic, writing discipline, Claude | Writing discipline plus SEO evidence checks | Keep editorial quality and SEO optimization separate but connected. |
| Content quality/E-E-A-T | Claude, Agentic, Codex | Writing quality gate plus SEO source/evidence layer | E-E-A-T scoring is heuristic; source labels required. |
| Content decay/freshness | Agentic, Claude partial | Search Console/GA4 plus content refresh workflow | Needs real performance data or clear hypothesis label. |
| GEO / AI search visibility | Claude, Agentic, Codex | Harness strategy mode with strict source-tier labels | Highly volatile; avoid treating vendor studies as law. |
| AEO / featured answers | Agentic, Claude via strategy | Harness strategy/content mode | Needs separation from GEO and standard SEO. |
| SXO / intent-page fit | Claude, Codex | Harness UX/content strategy mode | Mostly interpretive; should be evidence-backed. |
| Local SEO | Claude, Codex, Agentic | Harness local SEO workflow plus project/client context | Major capability lane: GBP, NAP, reviews, service areas, citations, location pages. |
| Maps/geo-grid/review intelligence | Claude, Codex | DataForSEO/maps providers where configured | Paid/API cost gate and credentials boundary required. |
| Ecommerce SEO | Claude, Codex | Selected scripts plus platform-specific project context | Needs product schema, marketplace, collection/faceted navigation checks. |
| Programmatic SEO | Claude, Agentic, Codex | Harness strategy/technical/content gate | Needs hard quality gates before generation at scale. |
| Visual/above-the-fold checks | Claude, Agentic, Codex, SiteOne | SiteOne browser mode plus optional Playwright scripts | Useful, but should not require package-specific browser installs by default. |
| SEO image generation | Claude, Codex | Separate design/media workflow, not core SEO audit | Requires explicit generation approval and cost/provider controls. |
| Google APIs: GSC, GA4, URL Inspection, CrUX, PSI, Indexing | Claude, Codex, Agentic partial | Project-local credentials and harness data-source wrappers | Major integration lane; never infer access from config alone. |
| DataForSEO | Claude, Codex | Optional project/user configured MCP or CLI wrapper with cost gate | Major paid-data lane; approval and budget policy required. |
| Firecrawl | Codex | Optional crawler provider | SiteOne may reduce need; keep as optional provider only. |
| GitHub SEO | Agentic | Optional repository discoverability workflow | Useful for product/open-source repos, not core client website SEO. |
| Drift monitoring | Claude, Codex | Harness workflow with project-owned baselines | Strong fit for deployment checks and recurring audits. |
| Reports and dashboards | Claude, Agentic, Codex, SiteOne | Harness output contract plus SiteOne/selected generators | Reports must be neutral/client-branded and evidence-backed. |
| Finding verifier | Agentic, Codex | Harness `seo-quality-gate` | This should be canonical before large audit reports. |

## Key Gaps In Neutral Tooling

SiteOne, Unlighthouse, and linkinator give a strong execution base, but they do
not cover the full agency SEO suite.

Major gaps to fill:

- backlink profile analysis and link-building opportunity discovery
- keyword research, volume, difficulty, SERP intent, and live SERP evidence
- Google Search Console, GA4, URL Inspection, CrUX history, and Indexing API
- DataForSEO cost-aware paid-data workflows
- local SEO beyond crawl evidence: GBP, maps, citations, reviews, service areas
- GEO/AEO/SXO strategy and AI-search visibility methodology
- SEO content briefs and content refresh decisions tied to performance data
- ecommerce-specific checks, product schema, marketplace intelligence, faceted
  navigation, and collection pages
- programmatic SEO quality gates
- hreflang and international SEO
- drift baselines and deployment comparison
- report synthesis and finding verification

## Current Implementation Status

Status: SEO tract complete through Phase 10; all planned phases accepted and verified.

Active canonical layer:

- `seo-foundation`
- `seo-quality-gate`
- `seo-tool-runner`
- `seo-page-audit`
- `seo-technical-audit`
- `seo-site-audit`
- `seo-sitemap`
- `seo-schema`
- `seo-images`
- `seo-hreflang`
- `seo-content-brief`
- `seo-content-audit`
- `seo-keyword-research`
- `seo-serp-intent`
- `seo-topic-cluster`
- `seo-strategy-roadmap`
- `seo-backlink-audit`
- `seo-link-building-opportunities`
- `seo-competitor-backlink-gap`
- `seo-link-reclaim`
- `seo-local-audit`
- `seo-maps-audit`
- `seo-citation-audit`
- `seo-review-signals`
- `seo-location-page-audit`

Recent Phase 3 specialist expansion:

- `.agents/tools/seo/gap-check.py` now supports `sitemap`, `schema`, `images`,
  `hreflang`, `robots`, `metadata`, and `headers`.
- The new `robots`, `metadata`, and `headers` modes are part of the accepted
  Phase 3 specialist layer. Disposable live-audit evidence is not retained in the
  vault after review.

Historical SEO lanes after Phase 4:

- Backlinks and authority.
- Local SEO and maps.
- GEO/AEO/SXO and AI visibility.
- Ecommerce and programmatic SEO.
- Google/DataForSEO integrations.
- Drift monitoring and recurring reports.
- Client-facing reporting and automation.

Completion status:

Phase 4 strategy/content-interface implementation is complete. Phases 5 through
10 are complete and verified, including backlink, local, advanced search,
ecommerce/programmatic, data/drift, monitoring, and reporting workflows.

Disposable live-audit evidence is not retained under `reviews/evidence/seo`.
Future SEO work should be maintenance, evidence refreshes, adapter repairs, or
explicitly approved new phase work rather than implied continuation.

## Canonical Build Principle

Use neutral tools for evidence collection wherever they are mature. Use imported
SEO packages as source material for missing checks, scoring rules, wrappers,
and report structure. Promote only the parts that can be expressed in the
vault's contract-first, approval-gated, verified methodology.
