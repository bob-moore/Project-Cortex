---
name: seo-topic-cluster
description: "Use when turning approved keyword, SERP-intent, and content-audit evidence into topic clusters, hub/spoke architecture, page roles, and internal-link recommendations."
---

# SEO Topic Cluster

Translate source-labeled SEO research into a coherent topic and page architecture.
Use this skill for hub/spoke planning, cluster boundaries, page roles, overlap
control, internal-link recommendations, and prioritization. Do not draft final
content or implement links.

## Operating Contract

1. Resolve client/project/prospect, domain, audience, offer, market, language,
   device, business goal, and architecture scope.
2. Load approved `seo-keyword-research`, `seo-serp-intent`, and
   `seo-content-audit` artifacts when available.
3. Cluster by user need, SERP intent, business relationship, and page role; do
   not cluster solely by lexical similarity or embeddings.
4. Assign hub/pillar, spoke/supporting page, service/product, comparison,
   glossary, local, tool, or refresh role only when evidence supports it.
5. Check existing pages for overlap, intent conflict, missing coverage, and
   internal-link opportunities. Treat semantic similarity as a signal, not proof
   of cannibalization.
6. Define cluster boundaries, primary topic, supporting queries, page role,
   funnel relationship, conversion path, link direction, and priority.
7. Preserve source, date, market, language, device, evidence type, and
   confidence for material decisions.
8. Hand page opportunities to `seo-content-brief`, refresh candidates to
   `seo-content-audit` and `article-refresh`, and final copy to Writing.
9. Apply `seo-quality-gate` in `keyword-research` or `content-brief` mode.

## Output

```text
# SEO Topic Cluster: [Context]

## Contract
- Client/project/prospect:
- Domain:
- Market/language/device:
- Business goal:
- Architecture scope:
- Research date:

## Evidence Inputs
| Artifact/source | Date | Market/device | Evidence label | Status |

## Cluster Map
| Cluster | Primary topic | Intent | Hub/pillar | Supporting pages | Business role | Priority |

## Page Architecture
| Page | Role | Primary query | Supporting queries | Existing/new/refresh | Conversion path |

## Internal-Link Plan
| From | To | Link purpose | Evidence/rationale |

## Boundary Decisions
| Query/page group | Keep together or separate | Reason | Confidence |

## Handoffs
- New page/content briefs:
- Refresh audits:
- Writing:
- Implementation:

## Quality Gate
- Verdict:
- Recheck method:
```

## Boundaries

- Do not create pages merely to increase URL count.
- Do not split or merge pages based only on keyword wording.
- Do not call semantic overlap proven cannibalization without SERP or first-party
  evidence.
- Do not promise rankings, traffic, conversions, or authority outcomes.
- Do not write final copy, metadata prose, CMS changes, code, or links.
- Do not publish or mutate production.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric wins.
