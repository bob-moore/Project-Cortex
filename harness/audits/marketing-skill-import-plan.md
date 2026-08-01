---
description: "Import plan and implementation record for the General Marketing skill bucket."
tags:
  - harness
  - audit
  - marketing
  - skills
status: implemented
created: 2026-07-29
updated: 2026-07-29
---

# Marketing Skill Import Plan

## Scope

Build the General Marketing layer after Design and Development.

Priority order from Bob:

1. Keyword research.
2. Market research.
3. Marketing strategy.
4. Analytics.
5. CRO.
6. Social and email as fundamental strategy channels.

Paid Ads remains excluded and should be rebuilt from scratch only when Bob asks
for a paid ads role.

## Implemented First Pass

Added `.agents/disciplines/marketing/`:

- `README.md`
- `contract.json`
- `modes.md`
- `rubric.md`
- `skill-map.json`

Added active skills:

- `.agents/skills/market-research/`
- `.agents/skills/keyword-research-and-clustering/`
- `.agents/skills/competitor-analysis/`
- `.agents/skills/marketing-strategy/`
- `.agents/skills/marketing-analytics/`
- `.agents/skills/conversion-rate-optimization/`
- `.agents/skills/utm-builder/`
- `.agents/skills/social-channel-operations/`
- `.agents/skills/newsletter-channel-operations/`
- `.agents/skills/email-deliverability/`
- `.agents/skills/email-quality-auditor/`

Updated:

- `.agents/roles/strategist/`
- `.agents/skills/role-strategist/`
- `harness/skills.md`
- `harness/audits/role-skill-porting-buckets.md`

## Source Dispositions

| Source | Target | Disposition |
|---|---|---|
| `market-research-analysis` | `market-research` | Adapted active. |
| `keyword-research-and-clustering` | same name | Adapted active. |
| `competitor-analysis` | same name | Adapted active. |
| `marketing-strategy` | same name | Adapted active. |
| `data-and-funnel-analytics` | `marketing-analytics` | Adapted active. |
| `conversion-rate-optimization` | same name | Adapted active. |
| `utm-builder` | same name | Adapted active. |
| `growth-strategy` | `marketing-strategy` | Folded. |
| `free-tool-strategy` | `marketing-strategy` | Folded. |
| `youtube-research` | `market-research` | Folded as research input. |
| `content-strategy-and-planning` | Marketing, Writing, SEO | Split reference. |
| `social-media-management` | `social-channel-operations` | Adapted active. |
| `newsletter-management` | `newsletter-channel-operations` | Adapted active. |
| `email-deliverability` | same name | Adapted active. |
| `email-quality-auditor` | same name | Adapted active. |

## Boundaries

- Marketing owns research, strategy, measurement, channel decisions, CRO
  diagnosis, and attribution conventions.
- Writer owns final copy and drafts.
- SEO owns technical SEO and SEO readiness gates.
- Designer owns visual direction and rendered design conformance.
- Developer owns code and analytics/tag implementation.
- WordPress Operator owns mutable site state, forms, settings, redirects, and
  publishing/configuration.
- External sends, scheduling, analytics publication, and CRM/ESP mutation
  require explicit approval.

## Next

1. Wire recurring marketing workflows only after repeated task shapes are clear.
2. Add social/email platform-specific source notes only when real client work
   exposes a need.
