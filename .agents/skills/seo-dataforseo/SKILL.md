---
name: seo-dataforseo
description: "Define DataForSEO provider evidence with explicit credential, tool, access, freshness, scope, and limitation handling."
---

# DataForSEO

Define bounded DataForSEO provider evidence. Separate credential presence, tool availability, access result, data freshness, scope, and business interpretation.

## Operating Contract

1. Resolve project/client/property, scope, date/timezone, sources, caps, and approved evidence path.
2. Check provider credential, tool, quota, endpoint, methodology, market/language/device, freshness, and vendor-data handling separately.
3. Ask before live external reads, paid/credentialed provider calls, or mutations.
4. Preserve approved raw/normalized evidence and label first-party, provider, observed, heuristic, and recommendation claims.
5. Record partial, unavailable, stale, and failed sources explicitly.
6. Route findings to Strategy, Development, Writing, WordPress, or verifier.
7. Apply `seo-quality-gate` in `drift-monitoring` mode for drift workflows and `reporting` mode for data workflows.

## Output

```text
# DataForSEO: [Context]
## Contract
- Project/property/scope/date/timezone/caps:
## Source Or Run Status
| Source | Credentials | Tool | Access | Freshness | Scope/limits |
## Evidence Register
| Finding | Source tier | Date | Confidence | Limitation |
## Findings / Snapshots / Signals
| Item | Before/current/after | Delta/status | Evidence | Owner/recheck |
## Quality Gate
- Verdict:
- Open items:
```

## Boundaries

- Never fabricate metrics, snapshots, deltas, alerts, access, freshness, quotas, URLs, conversions, rankings, indexing status, or API/provider results.
- Do not write credentials or secrets. Do not mutate analytics, providers, CMS, code, SEO, or production.
- Do not make causal, complete, current, or future claims from partial or stale evidence.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric wins.
