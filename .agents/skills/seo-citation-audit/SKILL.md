---
name: seo-citation-audit
description: "Use when auditing local citation sources for NAP consistency, ownership, relevance, indexability, duplicates, and correction priorities."
---

# SEO Citation Audit

Audit approved citation and directory evidence without submitting, editing, or
claiming listings.

## Operating Contract

1. Resolve business, locations, service areas, market, language, date, and source
   scope.
2. Load first-party business records, approved GBP/Maps data, directory exports,
   citation provider data, website facts, and local audit context.
3. Ask before live directory, listing, review, or provider reads.
4. Assess NAP, category, URL, ownership, relevance, indexability, duplicate,
   stale, conflicting, and inaccessible records.
5. Label source, date, evidence type, confidence, and verification limits.
6. Prioritize corrections by business impact, authority, relevance, confidence,
   effort, and risk; do not score on directory count alone.
7. Route listing work to the owner/operator and Strategy; page/schema work to
   SEO/Development; no submission or mutation.
8. Apply `seo-quality-gate` in `local-seo` mode.

## Output

```text
# SEO Citation Audit: [Context]

## Contract
- Business/locations:
- Market/language:
- Date/scope:

## Source Status
| Source | Status | Scope | Evidence label | Freshness/limits |

## Citation Findings
| Source/listing | NAP/category/URL | Ownership/indexability | Evidence/date | Confidence | Action |

## Priority Queue
| Priority | Action | Owner | Rationale | Recheck |

## Quality Gate
- Verdict:
- Blocking findings:
- Recheck method:
```

## Boundaries

- Do not invent or silently normalize business facts.
- Do not submit, edit, claim, suppress, or delete listings.
- Do not treat directory count as authority or promise local outcomes.
- Do not call third-party data authoritative without first-party verification.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric wins.
