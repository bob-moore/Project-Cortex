---
description: Marketing modes and boundaries for research, strategy, analytics, CRO, channels, and attribution.
tags:
  - harness
  - discipline
  - marketing
---

# Marketing Modes

## Universal Inputs

For client-specific work, resolve:

- client and project
- `Clients/<Client>/<Client> Brand.md`
- `Clients/<Client>/<Client> Voice.md`
- `Clients/<Client>/<Client> Stack.md` when site, analytics, CRM, email,
  social, automation, or implementation context matters
- target market, geography, language, audience, date range, and decision to be
  made
- available evidence: analytics export, Search Console export, CRM/funnel data,
  campaign data, customer interviews, prior strategy, competitor list, or live
  research sources

If a missing input materially changes the recommendation, label the assumption
or stop before producing a confident plan.

## Modes

| Mode | Owns | Typical Output | Quality Emphasis |
|---|---|---|---|
| `market-research` | Market sizing, customer research, trends, TAM/SAM/SOM, opportunity framing. | Research memo, opportunity map, assumptions ledger. | Dated sources, bounded claims, source-quality labels. |
| `keyword-research` | Keyword expansion, clustering, intent, funnel-stage mapping, content opportunities. | Keyword clusters, intent map, prioritized opportunity list. | Provider estimates labeled, SERP intent checked, SEO boundary clear. |
| `competitive-research` | Competitor categories, positioning, pricing/features, review mining, battlecards. | Competitor matrix, positioning map, battlecard, comparison brief. | Honest comparison, primary sources, no invented competitor claims. |
| `strategy` | ICP, positioning, messaging hierarchy, channel strategy, growth loops, free-tool strategy. | Strategy memo, channel plan, positioning document, prioritization. | Explicit tradeoffs, no tactic soup, evidence-backed choices. |
| `analytics` | Tracking plans, funnel interpretation, attribution, ROI, campaign measurement. | Tracking plan, funnel diagnosis, metrics readout, measurement plan. | Source system named, window declared, limits and privacy respected. |
| `cro` | Marketing page/form diagnosis and conversion hypotheses. | CRO audit, prioritized fixes, test hypotheses, handoff to implementers. | Analytics + heuristic evidence, implementation routed correctly. |
| `channel-planning` | Email, newsletter, social, YouTube, and owned-channel strategy. | Channel role, cadence, content pillars, measurement approach. | Strategy owns channel decisions; Writer drafts copy; ops are bounded. |
| `social-operations` | Organic social channel calendars, cadence, engagement plan, graphics specs, and measurement. | Social operating plan, calendar shape, handoff package. | No posting, scheduling, replies, DMs, or account mutation without approval. |
| `newsletter-operations` | Newsletter sourcing, curation, cadence, subscriber growth, archive strategy, and metrics. | Newsletter operating plan, sourcing rules, growth plan, handoff package. | No sending, scheduling, list import, template mutation, or ESP changes without approval. |
| `email-deliverability` | Sender domain health, SPF/DKIM/DMARC/MX, blacklist checks, inbox placement symptoms. | DNS/reputation audit and prioritized fixes. | Read-only checks first; DNS/ESP changes are approval-gated. |
| `email-quality` | Pre-send email program safety, consent, suppression, claims, message match, and outcome evidence. | SHIP/FIX/BLOCK/UNDECIDED verdict. | Gate sends without sending or mutating systems. |
| `attribution` | UTM conventions and campaign tracking links. | UTM links, naming table, campaign documentation. | Consistency, no internal UTMs, analytics compatibility. |

## Channel Boundary

Email and social are fundamental marketing channels:

- Marketing owns why the channel exists, who it serves, cadence, offer role,
  channel fit, success metrics, and how it connects to the broader strategy.
- Writer owns email/newsletter copy and social post drafts through
  `email-newsletter` and `social-shortform`.
- `social-channel-operations` owns social channel calendars, engagement plans,
  platform operating notes, and measurement handoff.
- `newsletter-channel-operations` owns newsletter sourcing, cadence, subscriber
  growth, archive strategy, and engagement metrics.
- `email-deliverability` owns read-only technical deliverability audits.
- `email-quality-auditor` owns pre-send quality and compliance gates.
- Sending, scheduling, importing contacts, changing ESP settings, or posting
  externally requires explicit external mutation approval.

YouTube research is a market and channel-research input unless recurring
YouTube operations justify a standalone skill later.

Free-tool strategy is a marketing-strategy mode, not a separate active skill.

Marketing automation is deferred indefinitely for now. Record it as a gap when
needed, but do not activate platform workflow guidance until capacity and
approval boundaries are mature enough for it.

## Adjacent Discipline Boundaries

- Writing: final copy, article briefs/outlines/drafts, emails, newsletters,
  social posts, editing, and repurposing.
- SEO: technical SEO, page audits, sitemap/schema/image/hreflang work, and
  SEO quality gates. Marketing can request keyword/SERP research and use SEO
  evidence, but SEO owns technical readiness.
- Design: visual direction, page design, prototypes, design tokens, and
  rendered conformance.
- Development: version-controlled implementation and analytics/tag code.
- WordPress Operator: mutable WordPress state, forms, redirects, settings,
  pages, posts, and plugin configuration.
