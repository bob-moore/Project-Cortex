---
name: seo-geo-audit
description: "Use when auditing generative-search and AI Overview readiness, answerability, entity clarity, citation readiness, and retrieval-friendly content without overclaiming AI visibility."
---

# SEO GEO Audit

Audit generative-search readiness as bounded evidence and recommendations. GEO
findings must not be presented as proof of AI visibility, citation, traffic, or
model behavior.

## Operating Contract

1. Resolve client/project/prospect, domain, market, language, audience, target
   pages/entities, query set, date, and audit scope.
2. Load approved content, keyword/SERP, schema, entity, brand, local, and
   first-party evidence.
3. Check approved sources and ask before live external search, AI, provider, or
   page reads.
4. Assess answerability, information completeness, entity clarity, factual
   consistency, citation readiness, structured-data support, passage clarity,
   source quality, intent/page-type fit, and retrieval limitations.
5. Label every claim by source tier: observed, first-party, provider,
   vendor-study, heuristic, or recommendation.
6. Route content changes to Writing, schema/code to Development, entity/brand
   decisions to Strategy, and external visibility checks to
   `seo-ai-visibility-check`.
7. Apply `seo-quality-gate` in `ai-search` mode.

## Output

```text
# SEO GEO Audit: [Context]

## Contract
- Client/project/prospect:
- Domain/pages/entities:
- Market/language/audience:
- Query set/date/scope:

## Evidence Register
| Claim/finding | Source tier | Source/date | Confidence | Limitation |

## Readiness Findings
| Page/entity | Answerability | Entity clarity | Citation readiness | Evidence | Action |

## Handoffs
| Action | Owner | Evidence | Approval/recheck |

## Quality Gate
- Verdict:
- Blocking findings:
- Recheck method:
```

## Boundaries

- Do not promise AI Overview, AI Mode, ChatGPT, Perplexity, citation, traffic,
  ranking, or agent visibility.
- Do not turn vendor studies or heuristics into confirmed findings.
- Do not invent entities, facts, citations, sources, model outputs, or prompts.
- Do not make schema, content, CMS, code, or production changes.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric wins.
