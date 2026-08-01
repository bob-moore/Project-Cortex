---
name: seo-keyword-research
description: "Use when SEO needs source-labeled keyword discovery, expansion, clustering, intent mapping, demand evidence, or content opportunity prioritization."
---

# SEO Keyword Research

Produce an evidence-backed keyword and topic opportunity set for SEO strategy,
content briefs, refreshes, or roadmaps. Reuse
`.agents/skills/keyword-research-and-clustering/SKILL.md` for expansion,
clustering, funnel mapping, and prioritization; this skill adds the SEO-specific
provider, evidence, approval, and handoff contract.

## Operating Contract

1. Resolve client/project/prospect, domain or existing page, audience, offer,
   business goal, market, geography, language, device, and research date.
2. Collect seed topics from the User prompt, Brand/Voice, offer, customer pains,
   sales language, existing pages, existing content, and approved competitor
   inputs.
3. At run time, perform a bounded availability check for each declared source:
   GA4, Google Search Console, Google Keyword Planner, DataForSEO, SE Ranking,
   other User-declared providers, manual Google/Bing observation, search
   suggestions, and competitor-page analysis.
4. A provider availability check may inspect only the approved integration or
   tool surface and must not reveal credentials. Do not install, authenticate,
   purchase, or mutate anything.
5. Use every available approved source that is relevant. DataForSEO and SE
   Ranking are first-class process options even when they are not connected in a
   particular run.
6. Label every volume, difficulty, CPC, traffic estimate, ranking observation,
   SERP observation, and intent judgment by source type, date, market, language,
   device, and freshness.
7. Keep first-party data, provider estimates, manual observation, competitor
   evidence, heuristics, hypotheses, and assumptions distinct.
8. Expand seeds, remove irrelevant terms, cluster related queries, classify
   intent, map funnel stage, and recommend content/page roles.
9. Prioritize by business relevance, intent and conversion fit, audience need,
   strategic importance, demand evidence, feasibility, and then provider
   estimates. Never let volume alone determine priority.
10. Ask before competitor-page analysis or current external SERP observation.
11. Hand content opportunities to `seo-content-brief`; hand copy production to
    Writing. Do not write final copy or metadata.
12. Apply `seo-quality-gate` in `keyword-research` mode.

## Provider Status

Return a provider-status table for every run:

| Source | Status | Scope | Evidence label | Notes |
| --- | --- | --- | --- | --- |
| GA4/GSC | available / unavailable / not requested | ... | first-party-data | ... |
| Google Keyword Planner | available / unavailable / not requested | ... | vendor-data | ... |
| DataForSEO | available / unavailable / not requested | ... | vendor-data | ... |
| SE Ranking | available / unavailable / not requested | ... | vendor-data | ... |
| Other declared provider | available / unavailable / not requested | ... | vendor-data | ... |
| Manual/search observation | available / unavailable / not requested | ... | observed-page | ... |

`unavailable` is runtime state for the research run, not a strategy conclusion.
Do not fabricate results for an unavailable source.

## Output

```text
# SEO Keyword Research: [Context]

## Contract
- Client/project/prospect:
- Domain/page:
- Market/geography/language/device:
- Research date:
- Business goal:
- Desired action:

## Provider Status
| Source | Status | Scope | Evidence label | Notes |

## Seeds And Method
- Seed sources:
- Expansion method:
- SERP/competitor approval:

## Priority Opportunities
| Topic/query | Cluster | Intent | Funnel stage | Evidence | Priority | Recommended asset |

## Cluster Map
| Cluster | Primary topic | Supporting queries | Intent | Page/content role | Handoff |

## Excluded Terms
- Term — reason

## Evidence Decisions
- ...

## Handoff
- SEO content brief:
- Writing:
- Strategy:

## Verification
- SEO quality gate:
- Refresh/research date:
```

## Boundaries

- Do not blindly assume provider installation, credentials, API access, or data
  freshness.
- Do not run paid or credentialed calls without the applicable approval.
- Do not treat provider metrics as measured truth.
- Do not promise rankings, traffic, revenue, conversions, or AI visibility.
- Do not perform competitor research without asking first.
- Do not turn semantic similarity into proof of shared SERP intent.
- Do not produce final copy, final title tags, or final meta descriptions.
- Do not publish, modify CMS state, change code, or mutate production.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric
wins.
