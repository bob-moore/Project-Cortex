# SEO SXO Audit

## Invocation

- Canonical workflow: `seo-sxo-audit`

## Purpose

Audit search experience from intent and result promise through page clarity,
trust, interaction quality, accessibility signals, and conversion fit. This is
not a legal accessibility or full usability certification.

## Required Context

- `.agents/workflows/seo-sxo-audit/contract.json`
- `.agents/skills/seo-sxo-audit/SKILL.md`
- `.agents/skills/seo-serp-intent/SKILL.md`
- `.agents/skills/seo-content-audit/SKILL.md`
- `.agents/skills/seo-quality-gate/SKILL.md`
- Client/project/prospect Brand, audience, offer, analytics, conversion,
  technical, accessibility, content, and approved user-research context

## Workflow

1. Resolve domain, market, language, audience, query set, pages, device,
   journey, date, and scope.
2. Load approved keyword/SERP-intent, content, technical, accessibility,
   analytics, conversion, Brand, and first-party evidence.
3. Ask before live external search, provider, page, analytics, or user-research
   reads.
4. Assess result promise, intent/page fit, clarity, information scent, trust,
   navigation, friction, mobile experience, accessibility signals, forms, CTAs,
   and conversion handoffs.
5. Label every finding observed, first-party, provider, heuristic, vendor-study,
   or recommendation with source/date/confidence/limits.
6. Route copy to Writing, interaction/visual issues to Design, technical issues
   to Development, and offer/journey decisions to Strategy.
7. Apply `seo-quality-gate` in `ai-search` mode and save the routed artifact.

## Output

```text
# SEO SXO Audit: [Context]

## Contract
- Domain/market/language/audience:
- Query set/pages/device/journey:
- Date/scope:

## Evidence Register
| Finding | Source tier | Source/date | Confidence | Limitation |

## Journey Findings
| Stage | Evidence | Finding | Impact boundary | Owner/action |

## Priority Queue
| Priority | Action | Owner | Evidence | Recheck |

## Quality Gate
- Verdict:
- Blocking findings:
- Recheck method:
```

## Approval Gates

- `external_read`: ask before live external search, provider, page, analytics,
  or user-research reads.
- `provider_data`: paid or credentialed calls require approval.
- `vault_write`: save only to resolved context.
- `external_mutation`: copy, design, CMS, code, forms, analytics, and production
  changes are out of scope.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when required.
- No copy, design, CMS, code, forms, analytics, provider, or production writes.

## Verification

- Query, page, device, journey, date, scope, source tier, confidence, and limits
  are explicit.
- SEO evidence, UX observations, accessibility signals, and business assumptions
  remain distinct.
- No legal/full WCAG, universal UX, ranking, traffic, conversion, or revenue
  guarantee is made.
- Handoffs and rechecks are explicit.
- `seo-quality-gate` passes or is explicitly deferred.

## Return Format

Return **Done**, **Evidence**, **Open Items**, and **Next**.

## Related Roles

- `strategist`
- `writer`
- `designer`
- `developer`
- `verifier`
