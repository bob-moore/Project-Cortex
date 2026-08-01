---
name: seo-link-building-opportunities
description: "Use when turning approved backlink, content, topic, brand, and market evidence into ethical, prioritized link-building opportunities without performing outreach or link acquisition."
---

# SEO Link-Building Opportunities

Identify and prioritize plausible, relevant, ethical authority-building opportunities
from approved evidence. Produce an opportunity queue, required asset briefs, and
owner handoffs. This workflow does not contact publishers, buy links, or create
links.

## Operating Contract

1. Resolve client/project/prospect, domain, offer, audience, market, target
   pages, business goal, and planning horizon.
2. Load approved backlink-audit, content, topic-cluster, Brand, PR, partnership,
   and competitor-comparison artifacts.
3. Check declared source availability at run time: DataForSEO, Moz, Bing
   Webmaster, Common Crawl, first-party records, approved market research, and
   manual/source evidence.
4. Use only approved integration/tool surfaces. Do not reveal credentials,
   install, authenticate, purchase, contact, or mutate.
5. Identify opportunity types such as editorial/resource citations,
   partnerships, original data or digital PR, expert contribution, industry or
   community references, supplier/client relationships, and unlinked brand
   mentions.
6. Score opportunities by topical relevance, audience value, editorial fit,
   destination usefulness, evidence strength, effort, relationship readiness,
   risk, and likely time horizon. Do not score by domain authority alone.
7. Specify the asset, proof, relationship, or editorial reason required before
   an opportunity is actionable.
8. Route content asset creation to Writing/Design, partnership decisions to
   Strategy, and any outreach plan for explicit approval. Route broken/lost
   links to `seo-link-reclaim`.
9. Apply `seo-quality-gate` in `reporting` mode.

## Output

```text
# SEO Link-Building Opportunities: [Context]

## Contract
- Client/project/prospect:
- Domain:
- Target pages:
- Market/audience:
- Planning horizon:
- Research date:

## Source Status
| Source | Status | Scope | Evidence label | Freshness/limits |

## Opportunity Queue
| Priority | Opportunity | Target asset/page | Evidence | Editorial rationale | Effort | Risk | Owner |

## Required Assets Or Proof
| Opportunity | Asset/proof needed | Source/owner | Approval |

## Relationship And Outreach Readiness
| Opportunity | Existing relationship | Contact basis | Readiness | Approval needed |

## Handoffs
- Writing:
- Design:
- Strategy:
- SEO:
- Outreach approval:

## Quality Gate
- Verdict:
- Blocking findings:
- Recheck method:
```

## Boundaries

- Do not buy, exchange, automate, or conceal links.
- Do not recommend irrelevant placements, private-network schemes, spam,
  comment flooding, or guaranteed editorial outcomes.
- Do not call an opportunity confirmed without evidence of relevance, asset fit,
  or relationship basis.
- Do not contact publishers, send outreach, publish assets, or change links.
- Do not promise rankings, authority, traffic, revenue, or conversions.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric wins.
