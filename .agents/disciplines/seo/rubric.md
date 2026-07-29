---
description: Canonical SEO quality gate and scoring rubric.
tags:
  - harness
  - discipline
  - seo
  - rubric
---

# SEO Quality Gate

Use this rubric before treating an SEO finding list, report, brief, or action
queue as ready.

This is a quality gate, not a producer persona. The producer can collect
evidence or draft recommendations, but a verifier or deterministic check should
close the gate when the workflow requires independent verification.

## Blocking Findings

Any blocking finding prevents a ready/done claim regardless of score:

- Ranking, traffic, indexing, revenue, or AI citation outcome is promised.
- Paid, credentialed, production, or external mutation action was taken without
  the required approval.
- Secret material appears in a report, harness file, skill, manifest, or
  committed artifact.
- Missing, capped, partial, sampled, blocked, or stale evidence is presented as
  complete, zero, or all-clear.
- Provider estimates are mixed with first-party data without labels.
- A recommendation depends on a volatile SEO claim without a source-tier label
  or current verification requirement.
- Intentional controls such as `noindex`, robots rules, canonicals, redirects,
  or access blocks are called defects before intent is confirmed.
- SEO output bypasses writing, developer, WordPress, or production boundaries.
- Affected URLs, target market, date range, crawl scope, or data source is not
  stated for a material finding.

## Evidence Labels

Label each material judgment:

- `observed-page`
- `crawl-output`
- `first-party-data`
- `official-doc`
- `vendor-data`
- `third-party-study`
- `heuristic`
- `hypothesis`
- `user-provided`
- `assumed`

## Score

Score to 100 only after blocking findings are handled. Scores are advisory; the
blocking findings decide readiness.

| Category | Points | What Good Looks Like |
|---|---:|---|
| Contract Fit | 15 | Correct SEO mode, requested artifact delivered, client/site/market/date scope clear, approval boundary respected. |
| Evidence Quality | 20 | Findings cite observed page, crawl, first-party, official, vendor, study, heuristic, or assumption labels without mixing them. |
| Completeness and Limits | 15 | Crawl scope, data caps, missing sources, failed checks, sampling, blocked requests, and skipped sections are surfaced before conclusions. |
| Recommendation Safety | 15 | Fixes are specific, proportional, reversible when possible, and do not claim guaranteed outcomes. |
| Cross-Discipline Handoff | 10 | Writing, developer, WordPress, design, production, and external-mutation handoffs are explicit. |
| Mode Readiness | 15 | Mode-specific checks are met for page, technical, research, schema, local, AI-search, programmatic, drift, or reporting work. |
| Verification Plan | 10 | Each priority item has a concrete re-check method, same-scope comparison, or source-refresh step. |

## Rating Bands

| Score | Rating | Meaning |
|---:|---|---|
| 90-100 | Ready | Strong SEO artifact; only normal final review remains. |
| 80-89 | Usable | Minor evidence, wording, or handoff cleanup recommended. |
| 70-79 | Needs Revision | Material fixes needed before use. |
| 60-69 | Weak | Rework findings, scope, or evidence collection. |
| <60 | Rebuild | Restart from mode, evidence plan, or source collection. |

## Mode Modifiers

Apply mode-specific checks only when relevant:

- `foundation`: source hierarchy, approval classes, scoring policy, and
  cross-discipline boundaries are visible.
- `page-audit`: fetched URL, final URL, response status, metadata, headings,
  canonicals, indexability signals, links, schema, and page-specific caveats are
  separated from recommendations.
- `technical-audit`: crawl configuration, page limits, sitemap completeness,
  blocked requests, affected URL samples, and reproducible re-run command or
  method are included.
- `keyword-research`: market, language, device, date, provider, intent
  method, volume/difficulty limitations, and SERP freshness are labeled.
- `content-brief`: SEO evidence is translated into writing requirements
  without drafting around unsupported claims or bypassing writing gates.
- `schema`: entity facts are sourced, JSON-LD is valid for the target platform,
  and rich-result eligibility is not promised.
- `local-seo`: GBP, NAP, citations, reviews, service areas, and location-page
  claims distinguish website facts from provider and third-party evidence.
- `ai-search`: readiness, referrals, prompt samples, crawler policy, and
  citations remain separate; no clean report is treated as proof of visibility.
- `programmatic-seo`: template family, sample size, duplicate/thin risk,
  indexability, and content quality gates are explicit before scale decisions.
- `drift-monitoring`: before/after runs use comparable scope and timestamps.
- `reporting`: narrative preserves data status, skipped sections, provider
  labels, caveats, and next actions.

## Report Shape

Return:

```text
SEO Quality Gate
Mode:
Artifact:
Verdict: pass | revise | blocked
Score: N/100

Blocking Findings:
- ...

Score Breakdown:
- Contract Fit: N/15
- Evidence Quality: N/20
- Completeness and Limits: N/15
- Recommendation Safety: N/15
- Cross-Discipline Handoff: N/10
- Mode Readiness: N/15
- Verification Plan: N/10

Evidence:
- ...

Open Items:
- ...

Next:
- ...
```
