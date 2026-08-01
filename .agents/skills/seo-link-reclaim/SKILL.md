---
name: seo-link-reclaim
description: "Use when identifying broken, lost, redirected, orphaned, or unlinked external-link candidates and routing safe reclaim recommendations to the owning implementation workflow."
---

# SEO Link Reclaim

Identify recoverable external-link and mention candidates from approved backlink,
crawl, first-party, CMS, redirect, and manual evidence. Produce a verified
reclaim queue and implementation handoff. Do not edit redirects, pages, CMS,
code, disavowals, or contact external parties.

## Operating Contract

1. Resolve client/project/prospect, domain, affected target pages, market,
   date range, and reclaim scope.
2. Load approved backlink-audit, competitor-comparison, crawl, redirect, CMS,
   server-log, analytics, and User-provided evidence.
3. Check source availability at run time: DataForSEO, Moz, Bing Webmaster,
   Common Crawl, crawlers, first-party exports, CMS/redirect records, and
   manual/source evidence.
4. Record source URL, target URL, historical/current status, link or mention
   evidence, collection date, freshness, and verification method.
5. Classify candidates as broken target, changed destination, redirect chain,
   lost backlink, unlinked mention, orphaned asset, or monitor-only signal.
6. Recommend the least-destructive next action: restore destination, correct a
   valid redirect, update an internal target, request a relationship follow-up,
   prepare an outreach brief, or monitor. Do not assume outreach is warranted.
7. Route redirect/CMS work to WordPress, code changes to Development, content
   changes to Writing, relationship decisions to Strategy, and outreach to an
   explicitly approved workflow.
8. Apply `seo-quality-gate` in `reporting` mode.

## Output

```text
# SEO Link Reclaim: [Context]

## Contract
- Client/project/prospect:
- Domain:
- Scope:
- Market:
- Date range:
- Audit date:

## Source Status
| Source | Status | Scope | Evidence label | Freshness/limits |

## Reclaim Queue
| Priority | Source URL/domain | Target URL | Candidate type | Evidence/status | Recommended action | Owner |

## Verification Plan
| Candidate | Check | Expected evidence | Recheck method |

## Handoffs
- WordPress:
- Development:
- Writing:
- Strategy:
- Outreach approval:

## Quality Gate
- Verdict:
- Blocking findings:
- Recheck date/method:
```

## Boundaries

- Do not change redirects, canonicals, pages, CMS, code, disavowals, or
  production.
- Do not contact publishers or send outreach.
- Do not treat a missing provider record as proof that a link never existed.
- Do not recommend redirecting to an irrelevant page merely to preserve a link.
- Do not promise recovered rankings, traffic, authority, revenue, or conversions.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric wins.
