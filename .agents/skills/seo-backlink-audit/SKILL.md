---
name: seo-backlink-audit
description: "Use when auditing a site's external link profile, referring domains, anchor text, link attributes, authority signals, and backlink evidence with provider and freshness labels."
---

# SEO Backlink Audit

Audit a bounded external-link profile using approved provider data, first-party
records, crawl evidence, Common Crawl, and manual/source evidence. Produce an
evidence-backed assessment and action queue; do not purchase links, contact
publishers, change pages, or mutate production.

## Operating Contract

1. Resolve client/project/prospect, domain, target pages, market, date range,
   provider scope, and audit date.
2. At run time, check availability of declared sources: DataForSEO, Moz, Bing
   Webmaster, Common Crawl, first-party exports, and manual/source evidence.
3. Use only approved integration/tool surfaces. Do not reveal credentials,
   install, authenticate, purchase, or mutate anything.
4. Record backlink and referring-domain counts with source, collection date,
   index freshness, scope, sample limits, and provider methodology when known.
5. Classify links by target URL, source domain, source page, link location,
   follow/nofollow or equivalent attributes, anchor text, topical relationship,
   geography, brand/entity relationship, and observed status.
6. Separate confirmed observations, provider estimates, crawl evidence,
   third-party studies, heuristics, hypotheses, and recommendations.
7. Assess relevance, editorial context, link placement, destination fit,
   diversity, anchor distribution, suspicious patterns, lost/broken signals,
   and reclaim or review candidates. Do not label a link toxic from a single
   metric or provider score.
8. Route acquisition opportunities to `seo-link-building-opportunities`,
   competitor comparison to `seo-competitor-backlink-gap`, and recoverable links
   to `seo-link-reclaim`.
9. Apply `seo-quality-gate` in `reporting` mode.

## Output

```text
# SEO Backlink Audit: [Context]

## Contract
- Client/project/prospect:
- Domain:
- Target pages:
- Market:
- Date range:
- Audit date:

## Provider Status
| Source | Status | Scope | Evidence label | Freshness/limits |

## Link Profile Summary
| Metric | Value | Source/date | Scope | Limitation |

## Referring Domains
| Domain | Target(s) | Context | Relevance | Link status | Evidence |

## Anchor And Placement Profile
| Anchor/category | Count/share | Source | Interpretation | Confidence |

## Quality And Risk Review
| Source/link | Signal | Evidence | Interpretation | Action |

## Lost, Broken, Or Reclaim Candidates
| Source URL | Target URL | Signal | Verification | Handoff |

## Recommendations
| Priority | Action | Rationale | Owner | Recheck |

## Quality Gate
- Verdict:
- Blocking findings:
- Provider freshness:
- Recheck method:
```

## Boundaries

- Do not equate authority metrics with ranking outcomes.
- Do not call a link toxic, manipulative, or harmful from a single score or
  unsupported pattern.
- Do not fabricate links or provider counts when a source is unavailable.
- Do not buy links, request placement, send outreach, change disavowals, edit
  CMS/code, redirect URLs, or publish.
- Do not expose credentials or store provider secrets.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric wins.
