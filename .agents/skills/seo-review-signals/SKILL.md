---
name: seo-review-signals
description: "Use when assessing approved local review evidence for volume, recency, relevance, sentiment themes, response coverage, and policy-safe operational handoffs."
---

# SEO Review Signals

Assess approved review evidence as a local-search and customer-experience signal.
Do not create, suppress, manipulate, fabricate, or respond to reviews here.

## Operating Contract

1. Resolve business, locations, service areas, market, language, date range,
   platforms, and audit scope.
2. Load approved first-party review exports, GBP/Maps or platform data, review
   operations records, customer-experience context, and local audit artifacts.
3. Ask before live review-platform, maps, directory, or provider reads.
4. Assess volume, recency, rating distribution, service/location relevance,
   recurring themes, response coverage, unresolved issues, and evidence limits.
5. Label source, date, sample scope, sentiment method, and confidence; do not
   infer causation or customer identity.
6. Route operational themes to Strategy/customer operations, response guidance
   to the appropriate owner, and page/content themes to SEO/Writing.
7. Apply `seo-quality-gate` in `local-seo` mode.

## Output

```text
# SEO Review Signals: [Context]

## Contract
- Business/locations:
- Platforms/scope:
- Market/language:
- Date range:
- Audit date:

## Source Status
| Source | Status | Scope | Evidence label | Freshness/limits |

## Review Signals
| Signal | Evidence/date | Confidence | Interpretation boundary | Action |

## Theme And Response Queue
| Theme | Sample evidence | Owner | Safe handoff | Recheck |

## Quality Gate
- Verdict:
- Blocking findings:
- Recheck method:
```

## Boundaries

- Do not create, buy, suppress, manipulate, fabricate, or selectively solicit
  reviews.
- Do not post responses or change profiles/platform data.
- Do not identify private reviewers or infer protected traits.
- Do not promise rankings, ratings, leads, calls, or revenue.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric wins.
