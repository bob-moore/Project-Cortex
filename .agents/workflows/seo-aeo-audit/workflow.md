# SEO AEO Audit

## Invocation

- Canonical workflow: `seo-aeo-audit`

## Purpose

Audit answer-engine and SERP answer-feature readiness with source labels and no
unsupported placement or visibility claims.

## Required Context

- `.agents/workflows/seo-aeo-audit/contract.json`
- `.agents/skills/seo-aeo-audit/SKILL.md`
- `.agents/skills/seo-serp-intent/SKILL.md`
- `.agents/skills/seo-content-audit/SKILL.md`
- `.agents/skills/seo-quality-gate/SKILL.md`

## Workflow

1. Resolve domain, market, language, audience, query set, pages, date, device,
   and scope.
2. Load approved keyword/SERP-intent, content, entity, schema, Brand, and
   first-party evidence.
3. Ask before live SERP, provider, answer-engine, or page reads.
4. Assess intent, answer-feature observations, answerability, concise extraction,
   factual support, headings, structured data, citations, entities, and page fit.
5. Label every finding observed, first-party, provider, vendor-study, heuristic,
   or recommendation with source/date/confidence/limits.
6. Route content to Writing, schema/code to Development, entities to Strategy,
   and visibility observations to `seo-ai-visibility-check`.
7. Apply `seo-quality-gate` in `ai-search` mode and save the routed artifact.

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

## Approval Gates

- `external_read`: ask before live SERP, provider, answer-engine, or page reads.
- `provider_data`: paid or credentialed calls require approval.
- `vault_write`: save only to resolved context.
- `external_mutation`: content, schema, CMS, code, publishing, and production
  changes are out of scope.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when required.
- No content, schema, CMS, code, publishing, provider, or production writes.

## Verification

- Query, page, device, date, scope, source tier, confidence, and limitations are
  explicit.
- Observed answer features remain distinct from heuristics and vendor studies.
- No SERP feature, answer, citation, ranking, or AI visibility is fabricated.
- Handoffs and rechecks are explicit.
- `seo-quality-gate` passes or is explicitly deferred.

## Return Format

Return **Done**, **Evidence**, **Open Items**, and **Next**.

## Related Roles

- `strategist`
- `writer`
- `developer`
- `verifier`
