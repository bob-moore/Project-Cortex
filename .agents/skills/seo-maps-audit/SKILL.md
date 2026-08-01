---
name: seo-maps-audit
description: "Use when auditing Google Business Profile/Maps, local-pack evidence, map visibility, categories, service areas, and geo-grid observations."
---

# SEO Maps Audit

Audit approved maps and local-listing evidence without changing profiles,
listings, reviews, categories, service areas, or production.

## Operating Contract

1. Resolve client/project/prospect, business locations, service areas, market,
   language, target queries, device, date, and map scope.
2. Load approved business records, GBP/Maps exports, local SERP observations,
   DataForSEO/SE Ranking maps data, Bing Places/Webmaster data, and local audit
   context.
3. Check source availability at run time and ask before live maps, listing,
   provider, or directory reads.
4. Assess identity, categories, hours, service areas, profile completeness,
   local-pack/map signals, query/location coverage, landing-page fit, review
   signals, and geo-grid/provider limits.
5. Separate business facts, first-party records, observed maps, provider data,
   third-party listings, heuristics, and recommendations.
6. Route profile/listing work to the owning operator, page/schema work to SEO or
   Development, and review operations to approved Strategy workflows.
7. Apply `seo-quality-gate` in `local-seo` mode.

## Output

```text
# SEO Maps Audit: [Context]

## Contract
- Client/project/prospect:
- Business/location scope:
- Market/language/device:
- Query set:
- Audit date:

## Source Status
| Source | Status | Scope | Evidence label | Freshness/limits |

## Profile And Map Signals
| Location/profile | Field/signal | Evidence | Status | Action |

## Query/Location Observations
| Query | Location/device | Map/local-pack observation | Source/date | Confidence |

## Landing-Page Fit
| Location/query | Page | Evidence | Fit | Handoff |

## Priority Actions
| Priority | Action | Owner | Evidence | Recheck |

## Quality Gate
- Verdict:
- Blocking findings:
- Recheck method:
```

## Boundaries

- Do not invent business facts or promise map-pack/ranking outcomes.
- Do not change GBP/Maps, categories, hours, service areas, reviews, citations,
  CMS, schema, code, or production.
- Do not treat a geo-grid/provider snapshot as universal visibility.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric wins.
