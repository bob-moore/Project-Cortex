---
name: seo-competitor-backlink-gap
description: "Use when comparing a target domain's backlink and referring-domain profile with explicitly approved competitors to identify evidence-backed authority opportunities."
---

# SEO Competitor Backlink Comparison

Compare a target domain with explicitly selected competitors using approved
backlink/provider evidence. Identify shared, competitor-only, and target-only
link patterns, then route plausible opportunities to link-building planning.
This workflow does not contact competitors, publishers, or acquire links.

## Operating Contract

1. Resolve target domain, explicitly named competitors, client/project/prospect,
   market, target pages, date range, and comparison scope.
2. Ask before live competitor/provider reads unless the user has already
   explicitly approved this comparison in the current workflow.
3. Check availability of DataForSEO, Moz, Bing Webmaster, Common Crawl,
   first-party exports, and manual/source evidence.
4. Record each domain, source, collection date, index freshness, scope, sample
   limits, and provider methodology when known.
5. Compare referring domains, backlink types, target pages, anchor patterns,
   topical relevance, link context, and linkable asset patterns.
6. Separate shared patterns from competitor-only observations and hypotheses.
   Provider metrics do not prove editorial value or ranking advantage.
7. Prioritize opportunities by relevance, audience value, editorial plausibility,
   target-page usefulness, evidence strength, effort, risk, and relationship
   readiness.
8. Route plausible opportunities to `seo-link-building-opportunities`, assets
   to Writing/Design, and any reclaim candidates to `seo-link-reclaim`.
9. Apply `seo-quality-gate` in `reporting` mode.

## Output

```text
# SEO Competitor Backlink Comparison: [Context]

## Contract
- Target domain:
- Competitors:
- Client/project/prospect:
- Market:
- Date range:
- Comparison date:

## Provider Status
| Source | Status | Domains/scope | Evidence label | Freshness/limits |

## Profile Comparison
| Domain | Referring domains | Backlinks | Target pages | Source/date | Limitation |

## Shared And Distinct Sources
| Source domain | Target | Competitor(s) | Context/relevance | Evidence | Action |

## Asset And Page Patterns
| Competitor asset/page | Link pattern | Target analogue | Evidence | Opportunity |

## Prioritized Opportunities
| Priority | Opportunity | Target page/asset | Evidence | Effort | Risk | Handoff |

## Boundaries And Confidence
- ...

## Quality Gate
- Verdict:
- Blocking findings:
- Recheck method:
```

## Boundaries

- Do not scrape or contact competitors.
- Do not treat competitor links as automatically relevant or desirable.
- Do not infer ranking causation from backlink differences.
- Do not call provider metrics complete or current without freshness and scope.
- Do not recommend spam, paid-link schemes, private networks, exchanges, or
  copied competitor assets.
- Do not contact publishers, perform outreach, buy links, or mutate production.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric wins.
