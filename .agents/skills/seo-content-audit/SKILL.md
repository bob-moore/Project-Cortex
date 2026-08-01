---
name: seo-content-audit
description: "Use when auditing existing content for SEO query fit, SERP alignment, decay, overlap, freshness, internal linking, business alignment, and refresh or consolidation recommendations."
---

# SEO Content Audit

Audit existing pages and content assets against approved keyword research,
SERP-intent evidence, first-party performance data, page evidence, and business
strategy. Produce an evidence-backed action queue and handoff; do not rewrite or
publish content.

## Operating Contract

1. Resolve client/project/prospect, domain, page/content inventory, market,
   language, device, date range, and audit scope.
2. Read the target content and relevant Brand, Voice, offer, audience, project,
   and content-strategy context before judging fit.
3. Use `seo-keyword-research` and `seo-serp-intent` outputs when available.
   Accept approved first-party exports, provider data, crawl results, or
   User-provided observations when those artifacts are absent.
4. At run time, check availability of declared sources: GA4, Google Search
   Console, DataForSEO, SE Ranking, crawls, CMS exports, and approved other
   providers. Do not reveal credentials or probe arbitrary services.
5. Ask before live external reads, provider calls, current SERP observation, or
   reading external ranking pages. Vault-local content and approved artifacts
   may be read within scope.
6. Assess each asset for query/page fit, intent alignment, topical coverage,
   usefulness, freshness, claim risk, structure, internal links, conversion
   alignment, cannibalization signals, and technical/content dependencies.
7. Distinguish measured decay from a hypothesis. Do not infer decay from age or
   traffic alone.
8. Recommend one action: keep, monitor, refresh, expand, consolidate, redirect
   candidate, repurpose, or retire candidate. Recommendations are not CMS or
   publishing actions.
9. Route refresh work to `seo-content-brief` and `article-refresh`; route new
   content opportunities to `seo-content-brief`; route implementation issues to
   the developer or WordPress workflow.
10. Apply `seo-quality-gate` in `content-brief` or `keyword-research` mode as
    appropriate.

## Evidence Categories

- `first-party-data`: GA4, GSC, server logs, CMS, or owned analytics
- `vendor-data`: DataForSEO, SE Ranking, or other approved provider
- `observed-page`: inspected content, links, metadata, or rendered page
- `crawl-output`: bounded crawl or inventory result
- `user-provided`: client or User context and observations
- `heuristic`: internal scoring or action rule
- `hypothesis`: plausible explanation requiring verification
- `assumed`: explicit unverified operating assumption

## Output

```text
# SEO Content Audit: [Context]

## Contract
- Client/project/prospect:
- Domain:
- Scope:
- Market/language/device:
- Date range:
- Audit date:

## Provider Status
| Source | Status | Scope | Evidence label | Notes |

## Content Inventory
| URL/asset | Type | Purpose | Primary query/cluster | Business action | Status |

## Audit Findings
| URL/asset | Finding | Evidence | Confidence | Impact | Recommended action |

## Query And Intent Fit
| URL/asset | Query/cluster | SERP intent | Page fit | Coverage | Recommendation |

## Decay And Freshness
| URL/asset | Signal | Evidence/date | Interpretation | Verification |

## Overlap And Consolidation
| Asset group | Overlap evidence | Risk | Recommendation | Confidence |

## Refresh Handoff
| Asset | Keep | Change | Add | Verify | Handoff |

## Quality Gate
- Verdict:
- Score:
- Blocking findings:
- Recheck method:

## Review
- Artifact path:
- Home review link:
- Next action:
```

## Boundaries

- Do not equate lower traffic, age, or ranking movement with proven content
  decay without comparable evidence.
- Do not treat semantic similarity as proof of cannibalization or shared SERP
  intent without first-party or provider evidence.
- Do not recommend deletion, redirect, consolidation, or publishing as if it
  already occurred.
- Do not write final article prose, web copy, title tags, or meta descriptions.
- Do not mutate CMS, code, repository, analytics, providers, or production.
- Do not promise rankings, traffic, revenue, conversions, or AI visibility.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric wins.
