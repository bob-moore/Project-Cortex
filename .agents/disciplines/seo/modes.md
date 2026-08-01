---
description: SEO modes and ownership boundaries for the canonical SEO discipline.
tags:
  - harness
  - discipline
  - seo
---

# SEO Modes

SEO modes determine which evidence, tools, roles, references, and quality checks
apply. They do not grant permission to mutate external systems.

## Universal Inputs

For client-specific work, read available:

- `Clients/<Client>/<Client> Brand.md`
- `Clients/<Client>/<Client> Voice.md`
- `Clients/<Client>/<Client> Stack.md`
- relevant project notes, briefs, audits, Search Console or analytics exports,
  crawl outputs, and deployment context

If substantial onboarding context is missing, stop durable brief or strategy
production and run the significant onboarding intake. Do not turn missing
context into durable gap notes; resume once the required context is supplied.

## Modes

| Mode | Owns | Typical Output | Evidence Emphasis |
|---|---|---|---|
| `foundation` | Source hierarchy, evidence labels, approval boundaries, score policy, and cross-discipline handoff. | Operating notes, finding labels, report contract, open items. | Clear separation of observed facts, provider estimates, heuristics, and assumptions. |
| `page-audit` | One URL or one local page artifact. | Page findings, fix queue, verification steps. | Direct page fetch, rendered or source HTML, metadata, headings, links, schema, indexability signals. |
| `technical-audit` | Site crawl, robots, sitemaps, canonicals, redirects, performance, rendering, broken links, security-adjacent and accessibility-adjacent SEO checks. | Technical audit, issue queue, deployment-sensitive risks. | Bounded crawl scope, tool limits, affected URL samples, reproducible verification. |
| `keyword-research` | Keyword, SERP, intent, competitor, and demand research. | Keyword set, intent map, competitor shortlist, source-labeled opportunity list. | Provider estimates, live SERP evidence, Search Console data, cost and freshness labels. |
| `content-brief` | SEO brief or refresh recommendation handed to writing. | SEO brief, refresh brief, title/meta direction, internal-link suggestions. | First-party performance data, SERP intent, page evidence, writing handoff requirements. |
| `schema` | Structured data detection, validation, generation guidance, and implementation handoff. | Schema plan, JSON-LD draft, validation notes, implementation checklist. | Page facts, organization facts, official docs, validator output, no invented entity facts. |
| `local-seo` | Local business, GBP, NAP, reviews, service areas, citations, maps evidence, and location-page risks. | Local audit, citation list, location-page recommendations. | Website evidence, provider/API evidence, GBP facts, third-party study labels. |
| `ai-search` | AEO, GEO, AI readiness, AI referrals, prompt observations, AI crawler policy, and citation visibility. | AI search readiness report, observation log, action queue. | Technical readiness, observed referrals or prompt samples, volatile-source labels, no citation guarantees. |
| `programmatic-seo` | Template families, indexability at scale, matrix opportunities, duplicate/thin-page risk, and expansion gates. | Template audit, opportunity matrix, launch or prune recommendation. | First-party query data, sampled template evidence, quality gate, no automatic page generation. |
| `drift-monitoring` | Pre/post deploy or recurring SEO baselines. | Baseline, comparison report, regression queue. | Same-scope comparisons, timestamped outputs, changed URLs, verification replay. |
| `reporting` | Client-ready or executive SEO reporting. | Monthly report, action plan, status memo, evidence appendix. | Data status, provider boundaries, caveats, skipped sections, decisions and next actions. |

## Non-SEO Boundaries

- Copy, article drafts, metadata prose, and content rewrites belong to the
  writing discipline after SEO supplies evidence and brief requirements.
- Code changes belong to the developer role or a project-specific development
  workflow.
- Mutable WordPress state belongs to the wordpress-operator role and requires
  the correct live-state approval boundary.
- Publishing, redirects, robots changes, sitemap deployment, schema deployment,
  IndexNow submission, analytics changes, and provider configuration are
  external mutation or production actions.
- Visual asset generation belongs to the design/media workflow unless the SEO
  task only needs alt text, image inventory, or image brief requirements.

## Evidence Source Tiers

Use these labels in SEO work:

- `observed-page`: directly inspected page, response, rendered DOM, or file.
- `crawl-output`: bounded crawler or link checker output.
- `first-party-data`: Search Console, GA4, server logs, CMS records, or owned
  analytics exports.
- `official-doc`: search engine, platform, schema.org, or browser vendor docs.
- `vendor-data`: DataForSEO, Semrush, Ahrefs, Moz, Bing Webmaster, or similar.
- `third-party-study`: industry study, benchmark, or research publication.
- `heuristic`: internal scoring or prioritization rule.
- `hypothesis`: plausible explanation or recommendation not yet verified.
- `user-provided`: supplied directly by Bob, client notes, or project context.
- `assumed`: required to proceed but not verified.

## Approval Notes

Read-only file inspection and local validation can proceed when scoped. Paid
provider calls, credentialed external reads, live site mutations, production
changes, and secret handling require the relevant approval policy.
