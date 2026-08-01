---
name: seo-aeo-audit
description: "Use when auditing answer-engine and SERP answer-feature readiness, including featured snippets, PAA, knowledge panels, direct answers, and citation support."
---

# SEO AEO Audit

Audit answer-engine optimization as source-labeled evidence and recommendations.
Do not promise answer placement, rankings, citations, or AI visibility.

## Operating Contract

1. Resolve domain, market, language, audience, query set, target pages, date,
   device, and scope.
2. Load approved keyword/SERP-intent, content, entity, schema, Brand, and
   first-party evidence.
3. Ask before live SERP, provider, answer-engine, or page reads.
4. Assess query intent, answer-feature observations, answerability, concise
   extraction, factual support, headings, structured data, citations, entities,
   and page-type fit.
5. Label each finding observed, first-party, provider, vendor-study, heuristic,
   or recommendation with source/date/confidence/limits.
6. Route content to Writing, schema/code to Development, entity decisions to
   Strategy, and visibility observations to `seo-ai-visibility-check`.
7. Apply `seo-quality-gate` in `ai-search` mode.

## Output

```text
# SEO AEO Audit: [Context]

## Contract
- Domain/market/language/audience:
- Query set/pages/device:
- Date/scope:

## Evidence Register
| Finding | Source tier | Source/date | Confidence | Limitation |

## Answer Feature Findings
| Query | Observed feature | Page/answer fit | Evidence | Action |

## Handoffs
| Action | Owner | Evidence | Recheck |

## Quality Gate
- Verdict:
- Blocking findings:
- Recheck method:
```

## Boundaries

- Do not promise featured snippets, PAA, knowledge panels, citations, answers,
  rankings, traffic, or AI visibility.
- Do not fabricate SERP features, model outputs, sources, entities, or answers.
- Do not turn vendor studies or heuristics into confirmed findings.
- Do not change content, schema, CMS, code, or production.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric wins.
