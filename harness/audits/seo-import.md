---
description: Audit of imported SEO skill packages before canonical harness porting.
tags:
  - harness
  - audit
  - seo
---

# SEO Import Audit

## Scope

Audited the imported SEO package family under `.claude/skills/seo` and
`.claude/skills/seo-*`.

This audit covers migration strategy only. It does not validate the current
truth of SEO platform claims, vendor limits, Google documentation changes, or
third-party research cited by the package.

## Inventory

The imported SEO surface is broad:

- `seo`: umbrella command/router, shared Python runtime, scripts, references,
  hooks, requirements, report generation, and shared scoring ideas.
- Site/page analysis: `seo-audit`, `seo-page`, `seo-technical`,
  `seo-content`, `seo-images`, `seo-schema`, `seo-sitemap`, `seo-hreflang`.
- Strategy and growth: `seo-plan`, `seo-cluster`, `seo-content-brief`,
  `seo-competitor-pages`, `seo-programmatic`, `seo-sxo`.
- Local and AI-search: `seo-local`, `seo-maps`, `seo-geo`.
- Data and monitoring: `seo-google`, `seo-dataforseo`, `seo-backlinks`,
  `seo-drift`, `seo-ecommerce`, `seo-flow`, `seo-image-gen`.

The imported source also includes a Python tool bundle in
`.claude/skills/seo/scripts/`, a shell launcher at
`.claude/skills/seo/bin/claude-seo`, reference notes, templates, and local
ignored runtime artifacts such as `.venv` and Playwright browser files.

Credential scan note: narrow token/key patterns did not find tracked Google or
DataForSEO secret material in the SEO import. The package does include helper
code and documentation for external credential paths and environment variables.

## Strengths

The packages are materially useful and should not be discarded wholesale.

- Strong task coverage: technical audits, page audits, schema, sitemap, local,
  Google API reporting, DataForSEO, backlink analysis, content briefs, GEO,
  drift monitoring, and strategic planning.
- Good operational instincts: cost checks before paid DataForSEO calls,
  credential-tier detection for Google APIs, SSRF-safe URL fetching, structured
  error handling, and local drift baselines.
- Useful output patterns: scorecards, issue severity, deliverable bundles,
  explicit remediation, and report-generation flows.
- Useful discipline boundaries are present in pieces: content brief generation,
  evidence expectations, E-E-A-T checks, schema validation, local-business
  detection, and technical crawl/indexability checks.
- Licensing is mostly straightforward: imported SEO skills are marked MIT, and
  FLOW prompt files carry source/license attribution.

## Methodology Conflicts

These packages should not be activated as-is.

- Claude-specific paths are embedded throughout: `.claude/skills/seo/bin/claude-seo`,
  `.claude/skills/*`, `.claude` plugin metadata, and Claude-branded runtime
  messages.
- The command model assumes `/seo ...` slash commands rather than canonical
  workflow resolution.
- Several skills assume subagent dispatch. The current vault methodology does
  not rely on runtime-native subagents.
- Outputs write to arbitrary current directories or hidden cache paths instead
  of project-scoped evidence folders inside the vault or client project.
- Credentials are treated as package-local operational setup. In this vault,
  credentials must remain external and project-local where relevant.
- Report templates contain Claude SEO branding and promotional/footer language.
  Canonical outputs should be client/work-product branded or neutral.
- Some referenced specialist skills are absent locally, including
  `seo-firecrawl`, `seo-performance`, `seo-signals`, and `seo-visual`.
- SEO writing, SEO content briefs, web copy, article drafting, and promotional
  copy overlap with the canonical writing discipline. SEO should inform briefs
  and optimization, not become an uncontrolled parallel writer.

## Verification Risks

The package includes many time-sensitive platform claims. These must be checked
against primary or official sources before becoming canonical guidance.

Examples requiring verification before promotion:

- current Google rich-result support and schema deprecations
- Search Console and GA4 reporting behavior for AI surfaces
- Google crawler documentation migrations and crawler identity tables
- Lighthouse, PageSpeed Insights, and CrUX behavior/version details
- Indexing API supported content types and quota limits
- local SEO ranking-factor percentages from third-party studies
- GEO/AI-search citation statistics and llms.txt claims
- DataForSEO endpoint names, costs, and rate limits
- RSL and AI licensing adoption claims

Canonical SEO docs should separate:

- official platform documentation
- tool output
- vendor documentation
- third-party studies
- internal heuristic scoring
- unverified or trend-level observations

## Recommended Canonical Shape

Do not port this as 24 independent first-class skills.

Create a smaller canonical SEO discipline with explicit modes, then map the
legacy package into that discipline.

Recommended discipline files:

- `.agents/disciplines/seo/README.md`
- `.agents/disciplines/seo/contract.json`
- `.agents/disciplines/seo/modes.md`
- `.agents/disciplines/seo/rubric.md`
- `.agents/disciplines/seo/skill-map.json`

Recommended initial canonical skills:

- `seo-foundation`: source hierarchy, evidence labels, SEO principles, scoring
  rules, and approval boundaries.
- `seo-page-audit`: single-page analysis and recommendations.
- `seo-technical-audit`: crawlability, indexability, performance signals,
  rendering, robots, sitemaps, canonicals, and deployment-sensitive checks.
- `seo-schema`: structured data detection, validation, and generation.
- `seo-local`: local business analysis, GBP/NAP/reviews/location-page logic.
- `seo-data-sources`: Google, DataForSEO, backlinks, API tiers, cost gates,
  credentials, and source confidence.
- `seo-drift`: baseline and compare workflow for pre/post deploy SEO changes.
- `seo-content-brief`: SEO research brief handoff to the writing discipline.

Recommended workflows:

- `seo-site-audit`: full-site audit with approval-gated crawling and paid-data
  checks.
- `seo-page-audit`: single URL audit.
- `seo-technical-check`: technical and deployment-sensitive SEO review.
- `seo-local-audit`: local business and map-pack readiness review.
- `seo-content-brief`: research-backed brief that hands off to writing.
- `seo-drift-check`: baseline/compare flow for deployment or traffic-drop
  investigations.

## Tooling Recommendation

Prefer mature, runtime-neutral tooling for the canonical execution layer:

- `siteone-crawler` for broad site crawling, SEO/OpenGraph, security,
  accessibility, performance, broken links, sitemap generation, browser
  rendering, CI gates, reports, and markdown export.
- `unlighthouse` for site-wide Lighthouse scanning, Core Web Vitals-oriented
  evidence, sampling, and deploy gates.
- `linkinator` for focused broken-link checking with structured output.

The imported SEO Python tooling should be treated as secondary source material
unless it provides a check that the neutral tools cannot cover.

If selected Python tooling is kept, move it out of `.claude` before canonical
use.

Recommended target:

- `.agents/tools/seo/`

Required changes:

- rename `claude-seo` to a neutral launcher
- remove Claude plugin/runtime assumptions
- store tool state under a project-approved path or user cache with explicit
  documentation
- make credential discovery read-only by default
- preserve SSRF-safe fetch behavior
- preserve DataForSEO cost checks
- preserve API-key redaction
- remove branded/promotional report footers
- keep generated outputs in client/project evidence folders unless the user
  explicitly chooses another path

## Porting Decision

Status: useful source material, not active canonical behavior.

Next step: create the canonical SEO discipline scaffold, then port one mode at
a time. Start with `seo-foundation` and `seo-page-audit` because they establish
the evidence and scoring boundary before paid APIs, live crawl depth, local SEO,
or drift storage are introduced.

## Stash Package Review

Additional SEO packages were inspected under ignored `stash/` source-material
checkouts:

- `stash/Agentic-SEO-Skill`
- `stash/codex-seo`

`Agentic-SEO-Skill` is the more useful reference package for this vault. It is
still LLM/agent-skill shaped, but it is multi-runtime rather than Claude-only,
has a focused audit rubric, includes 89 small deterministic scripts, and adds
checks not present in the current Claude SEO import: broken links, redirects,
security headers, canonical checks, duplicate content, robots path tests,
readability, social metadata, JavaScript rendering, indexability matrix, local
SEO, GitHub SEO, and report verification.

`codex-seo` is the stronger Codex-specific implementation reference. It adds a
deterministic workflow wrapper, smoke-suite structure, environment verification,
standardized output directories, `.seo-cache`, and cleaner credential/cache
paths. However, it is explicitly Codex-shaped, includes TOML specialist agents,
inherits substantial Claude SEO material, and still assumes its own runtime
model rather than this vault's canonical workflow/discipline model.

Credential scan note: tight secret patterns found no tracked Google,
DataForSEO, GitHub, OAuth, service-account, or private-key material in either
stash package. They include credential templates and setup paths only.

Recommended disposition:

- Do not install either package into `.agents/skills` directly.
- Use `Agentic-SEO-Skill` as the first source for check inventory and audit
  rubric ideas.
- Use `codex-seo` as a reference for wrapper shape, smoke tests, cache
  contracts, and environment verification.
- Use SiteOne Crawler, Unlighthouse, and linkinator as the preferred canonical
  external tools.
- Port only narrow scripts that survive comparison against the neutral tools.
