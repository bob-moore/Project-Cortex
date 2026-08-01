---
name: seo-serp-intent
description: "Use when analyzing search-result pages to classify query intent, SERP composition, ranking page types, result overlap, and recommended content/page fit."
---

# SEO SERP Intent

Analyze a bounded set of queries and their search-result pages to determine what
searchers and search engines appear to expect. The workflow may inspect ranking
page content as part of the approved SERP-intent run; it does not require a
separate competitor-analysis approval.

## Operating Contract

1. Resolve client/project/prospect, domain, query set, market, location,
   language, device, search engine, date, and freshness target.
2. Prefer the query set produced by `seo-keyword-research`. Accept a
   User-provided query list or a bounded set derived from an approved seed.
3. At run time, check availability of the declared SERP sources: DataForSEO,
   SE Ranking, Google/Bing observation, or User-provided SERP exports.
4. Use only approved provider/tool surfaces. Do not reveal credentials, install,
   authenticate, purchase, or mutate anything.
5. Ask for the normal `external_read` approval before live SERP observation.
   Once approved, reading ranking-page content is part of this workflow and
   does not require a second competitor-analysis approval.
6. Record query, source, collection timestamp, market, location, language,
   device, search engine, result depth, personalization/localization limits,
   and provider status.
7. Classify intent from the observed result composition, not from the keyword
   string alone:
   informational, commercial investigation, transactional, navigational,
   local/service-area, support/post-purchase, or mixed.
8. Record dominant result/page types, SERP features, local/map signals, result
   overlap, content angle, and page-type expectations.
9. Compare the target domain and existing pages against observed intent. Keep
   observations, provider metrics, heuristics, and recommendations distinct.
10. Recommend a page/content type and handoff to `seo-content-brief`,
    `seo-content-audit`, or `seo-strategy-roadmap`.
11. Apply `seo-quality-gate` in `keyword-research` mode.

## Intent Signals

Use the complete SERP composition, including:

- Result/page types: guide, article, service page, product, category,
  comparison, directory, local business, video, forum, tool, calculator, or
  official resource
- SERP features: featured snippet, PAA, local pack/maps, shopping, video,
  news, image results, knowledge panel, sitelinks, and review signals
- Language and framing of titles/snippets
- Freshness and date sensitivity
- Geographic modifiers and local intent
- Commercial signals: pricing, reviews, comparisons, providers, booking, quote,
  purchase, or sign-up language
- Result overlap across related queries
- Content depth, format, and likely user task

## Output

```text
# SEO SERP Intent: [Context]

## Contract
- Client/project/prospect:
- Domain:
- Market/location/language/device:
- Search engine:
- Collection date:
- Query scope:

## Provider Status
| Source | Status | Scope | Evidence label | Notes |

## Intent Map
| Query | Dominant intent | Secondary intent | Confidence | Evidence |

## SERP Composition
| Query | Dominant result types | SERP features | Freshness/local signals | Page-type expectation |

## Result Overlap
| Query group | Shared result URLs/domains | Overlap interpretation | Evidence |

## Existing-Page Fit
| Query | Existing page | Fit | Required change or new asset | Evidence |

## Recommendations
| Priority | Query/cluster | Recommended asset | Rationale | Handoff |

## Evidence Decisions
- ...

## Verification
- SEO quality gate:
- SERP refresh date:
- Recheck method:
```

## Boundaries

- Do not infer intent from the query string alone.
- Do not treat ranking position, result count, volume, or provider metrics as a
  guarantee of traffic, rankings, conversions, or revenue.
- Do not present one SERP snapshot as permanent truth.
- Do not mix localized, personalized, device-specific, and provider results
  without labeling the difference.
- Do not perform live SERP reads without external-read approval.
- Do not make production, CMS, code, publishing, or provider configuration
  changes.
- Do not write final copy, title tags, or meta descriptions.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric
wins.
