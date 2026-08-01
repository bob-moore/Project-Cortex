---
name: seo-ai-visibility-check
description: "Use when running bounded, explicitly scoped observations of AI/search visibility, citations, mentions, or referrals with source and reproducibility labels."
---

# SEO AI Visibility Check

Run bounded observations only when the user has explicitly named the engine,
model/provider, market, queries/prompts, date, and scope. This workflow records
what was observed; it does not establish universal visibility or causation.

## Operating Contract

1. Resolve client/project/prospect, domain/entities, market, language, engine,
   model/provider, query/prompt set, device, date, and observation scope.
2. Ask before live AI/search/provider/page reads and record the approval.
3. Check source/provider availability without revealing credentials or probing
   arbitrary services.
4. Capture prompt/query, engine/model, market, timestamp, result/output,
   citations/mentions, source URLs, retrieval context, and reproducibility
   limits where permitted.
5. Label every observation observed, first-party, provider, vendor-study,
   heuristic, or recommendation. Do not infer causation from one observation.
6. Route readiness issues to `seo-geo-audit`/`seo-aeo-audit`, content to Writing,
   entity decisions to Strategy, and technical changes to Development.
7. Apply `seo-quality-gate` in `ai-search` mode.

## Output

```text
# SEO AI Visibility Check: [Context]

## Contract
- Domain/entities:
- Engine/model/provider:
- Market/language/device:
- Queries/prompts:
- Observation date/scope:

## Source Status And Approval
| Source/provider | Status | Approval | Scope | Limits |

## Observation Log
| Query/prompt | Engine/model | Output/mention/citation | Source URLs | Timestamp | Reproducibility |

## Interpretation Boundaries
- ...

## Handoffs
| Action | Owner | Evidence | Recheck |

## Quality Gate
- Verdict:
- Blocking findings:
- Recheck method:
```

## Boundaries

- Do not fabricate outputs, citations, mentions, referrals, prompts, sources, or
  timestamps.
- Do not claim universal, stable, causal, or future AI visibility from samples.
- Do not expose credentials, scrape beyond approved scope, or mutate providers.
- Do not change content, schema, CMS, code, analytics, or production.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric wins.
