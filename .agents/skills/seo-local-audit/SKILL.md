---
name: seo-local-audit
description: "Use when auditing local SEO for businesses, service areas, NAP consistency, local landing pages, reviews, citations, and local-intent evidence."
---

# SEO Local Audit

Audit local search readiness for local businesses, service-area businesses,
brick-and-mortar locations, and hybrid organizations. Preserve the distinction
between website facts, first-party business records, provider observations,
third-party listings, and recommendations.

## Operating Contract

1. Resolve client/project/prospect, business type, primary locations, service
   areas, market, language, target pages, and audit date.
2. Load approved Brand, Stack, website, Google Business Profile/Maps exports,
   first-party business records, review records, citation records, and local
   keyword/SERP evidence.
3. Check source availability at run time: Google Business Profile/Maps,
   Google Search Console, GA4, DataForSEO, SE Ranking, Bing Places/Webmaster,
   approved directories, and manual observation.
4. Ask before live external provider, maps, listing, review, or directory reads.
   Do not change listings, profiles, citations, reviews, CMS, code, or
   production.
5. Assess business identity, NAP, hours, service areas, category alignment,
   local intent, location-page fit, local schema facts, review signals,
   citations, internal links, and conversion paths.
6. Separate confirmed business facts, first-party data, provider observations,
   third-party listing data, heuristics, and recommendations.
7. Route listing/profile work to the owning operator, page work to SEO/Writing,
   schema/code to Development, and review operations to Strategy/approved
   customer-operations workflows.
8. Apply `seo-quality-gate` in `local-seo` mode.

## Output

```text
# SEO Local Audit: [Context]

## Contract
- Client/project/prospect:
- Business type:
- Primary locations:
- Service areas:
- Market/language:
- Audit date:

## Source Status
| Source | Status | Scope | Evidence label | Freshness/limits |

## Business Identity And NAP
| Field | Website | First-party record | Listing/provider | Status | Action |

## Local Search Fit
| Query/intent | Target page/listing | Evidence | Fit | Recommendation |

## Location And Service-Area Review
| Location/area | Evidence | Page/listing | Confidence | Action |

## Reviews And Citations
| Source | Status | Evidence/date | Relevance | Handoff |

## Priority Actions
| Priority | Action | Owner | Evidence | Recheck |

## Quality Gate
- Verdict:
- Blocking findings:
- Recheck method:
```

## Boundaries

- Do not invent addresses, hours, service areas, categories, reviews, or
  business facts.
- Do not promise local rankings, map-pack placement, calls, leads, or revenue.
- Do not change GBP/Maps, listings, reviews, citations, CMS, code, schema, or
  production.
- Do not treat third-party directory data as authoritative without verification.
- Do not recommend doorway location pages without quality and business purpose.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric wins.
