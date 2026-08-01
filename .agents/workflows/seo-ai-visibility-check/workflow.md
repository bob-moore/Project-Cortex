# SEO AI Visibility Check

## Invocation

- Canonical workflow: `seo-ai-visibility-check`

## Purpose

Run bounded, explicitly scoped observations of AI/search visibility, citations,
mentions, or referrals. Record observations with source and reproducibility
labels; do not establish universal visibility or causation.

## Required Context

- `.agents/workflows/seo-ai-visibility-check/contract.json`
- `.agents/skills/seo-ai-visibility-check/SKILL.md`
- `.agents/skills/seo-geo-audit/SKILL.md`
- `.agents/skills/seo-aeo-audit/SKILL.md`
- `.agents/skills/seo-quality-gate/SKILL.md`

## Workflow

1. Resolve domain/entities, market, language, engine, model/provider,
   query/prompt set, device, date, and scope.
2. Ask before live AI/search/provider/page reads and record approval.
3. Check availability without revealing credentials or probing arbitrary services.
4. Capture prompt/query, engine/model, market, timestamp, result/output,
   citations/mentions, URLs, retrieval context, and reproducibility limits.
5. Label observations observed, first-party, provider, vendor-study, heuristic,
   or recommendation; do not infer causation from one observation.
6. Route readiness to GEO/AEO, content to Writing, entity decisions to Strategy,
   and technical work to Development.
7. Apply `seo-quality-gate` in `ai-search` mode and save the routed artifact.

## Output

```text
# SEO AI Visibility Check: [Context]

## Contract
- Domain/entities:
- Engine/model/provider:
- Market/language/device:
- Queries/prompts:
- Observation date/scope:

## Evidence Register
| Observation | Source tier | Source/date | Approval | Confidence | Limitation |

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

## Approval Gates

- `external_read`: ask before live AI/search/provider/page reads.
- `provider_data`: paid or credentialed calls require approval.
- `vault_write`: save only to resolved context.
- `external_mutation`: provider, content, schema, CMS, code, analytics, and
  production changes are out of scope.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when required.
- No provider, content, schema, CMS, code, analytics, or production writes.

## Verification

- Engine/model/provider, market, prompts, date, scope, approval, and limits are
  explicit.
- Observations include output, mentions/citations, URLs, timestamp, and
  reproducibility where permitted.
- No output, citation, mention, referral, source, timestamp, or visibility result
  is fabricated.
- Universal, stable, causal, or future visibility claims are absent.
- Handoffs and rechecks are explicit.
- `seo-quality-gate` passes or is explicitly deferred.

## Return Format

Return **Done**, **Evidence**, **Open Items**, and **Next**.

## Related Roles

- `strategist`
- `verifier`
- `writer`
- `developer`
