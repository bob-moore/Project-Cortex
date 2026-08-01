# SEO GEO Audit

## Invocation

- Canonical workflow: `seo-geo-audit`

## Purpose

Audit generative-search and AI Overview readiness as bounded evidence and
recommendations without claiming AI visibility, citations, traffic, or model
behavior.

## Required Context

- `.agents/workflows/seo-geo-audit/contract.json`
- `.agents/skills/seo-geo-audit/SKILL.md`
- `.agents/skills/seo-content-audit/SKILL.md`
- `.agents/skills/seo-serp-intent/SKILL.md`
- `.agents/skills/seo-quality-gate/SKILL.md`
- Client/project/prospect content, Brand, entities, schema, local, keyword,
  SERP, and approved first-party context

## Workflow

1. Resolve domain, market, language, audience, target pages/entities, query set,
   date, and scope.
2. Load approved content, keyword/SERP, schema, entity, Brand, local, and
   first-party evidence.
3. Check approved sources and ask before live external search, AI, provider, or
   page reads.
4. Assess answerability, completeness, entity clarity, factual consistency,
   citation readiness, structured-data support, passage clarity, source quality,
   and intent/page-type fit.
5. Label every claim observed, first-party, provider, vendor-study, heuristic,
   or recommendation.
6. Route content to Writing, schema/code to Development, entity/brand decisions
   to Strategy, and visibility checks to `seo-ai-visibility-check`.
7. Apply `seo-quality-gate` in `ai-search` mode and save the routed artifact.

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

## Approval Gates

- `external_read`: ask before live external search, AI, provider, or page reads.
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

- Every claim has source tier, source/date, confidence, and limitation.
- Vendor studies and heuristics remain distinct from confirmed observations.
- No model output, entity, citation, or visibility result is fabricated.
- Handoffs and rechecks are explicit.
- No AI visibility, citation, traffic, ranking, or agent-success guarantee is made.
- `seo-quality-gate` passes or is explicitly deferred.

## Return Format

Return **Done**, **Evidence**, **Open Items**, and **Next**.

## Related Roles

- `strategist`
- `writer`
- `developer`
- `verifier`
