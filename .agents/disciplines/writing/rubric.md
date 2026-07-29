---
description: Canonical writing quality gate and scoring rubric.
tags:
  - harness
  - discipline
  - writing
  - rubric
---

# Writing Quality Gate

Use this rubric for any writing artifact before claiming it is ready.

This is a quality gate, not a producer persona. The writer can draft, but a
verifier or deterministic check must close the gate when the workflow requires
independent verification.

## Blocking Findings

Any blocking finding prevents a ready/done claim regardless of score:

- Unsupported factual claim presented as verified.
- Invented source, distorted source title, fake statistic, or inaccessible
  citation used as proof.
- Client-specific work performed without Brand/Voice context, unless explicitly
  marked provisional.
- External mutation implied or performed without approval: publish, send,
  schedule, post, upload, or modify a live platform.
- Requested artifact is incomplete or not returned.
- High-stakes legal, medical, financial, employment, compliance, or platform
  policy claim lacks current source evidence.
- Copyright risk: copied source structure, excessive quotation, or unattributed
  close paraphrase.
- User constraints violated: word count, character limit, audience, format,
  tone, forbidden words, or required terms.

## Evidence Labels

Label each material judgment:

- `measured`: counted or directly inspected from the artifact.
- `source-backed`: supported by cited or provided evidence.
- `user-provided`: supplied by the user or client docs.
- `judged`: editorial assessment against this rubric.
- `assumed`: not verified; must be surfaced as an open item.

## Score

Score to 100 only after blocking findings are handled. Scores are advisory; the
blocking findings decide readiness.

| Category | Points | What Good Looks Like |
|---|---:|---|
| Contract Fit | 15 | Correct mode, requested artifact delivered, constraints followed, approval boundary respected. |
| Evidence and Claim Safety | 20 | Claims are sourced or marked provisional; statistics have source, year, and retrieval context when public-facing. |
| Audience and Voice Fit | 15 | Matches Brand/Voice, reading level, audience sophistication, terminology, and forbidden language. |
| Structure and Reader Utility | 15 | Clear hierarchy, answer-first where useful, scannable sections, logical flow, no missing reader steps. |
| Clarity and Style | 15 | Concrete, concise, non-generic, varied rhythm, no filler, no unearned hype. |
| Mode Readiness | 10 | Mode-specific needs are met: SEO for articles/pages, deliverability for email, platform fit for social, evidence packet for reviews. |
| Handoff and Revision Quality | 10 | Open items, assumptions, source gaps, suggested fixes, and artifact location are clear. |

## Rating Bands

| Score | Rating | Meaning |
|---:|---|---|
| 90-100 | Ready | Strong artifact; only normal final review remains. |
| 80-89 | Usable | Minor edits or source cleanup recommended. |
| 70-79 | Needs Revision | Material fixes needed before use. |
| 60-69 | Weak | Rework sections or re-brief. |
| <60 | Rebuild | Start from strategy, outline, or source evidence again. |

## Mode Modifiers

Apply mode-specific checks only when relevant:

- `web-copy`: web intent is explicit (`standard` or `promotional`), value
  proposition fits page type, CTA pressure matches intent, claims are supported,
  page-section completeness is sufficient, metadata draft is included when
  requested. Standard pages should not be forced into sales-page pressure.
  Promotional pages should be allowed to persuade, but urgency, scarcity,
  guarantees, comparisons, and outcome claims require evidence.
- `blog-article`: article type, reader intent, source and claim discipline,
  freshness when relevant, internal links when useful, title/meta when
  requested, and schema notes only when the publishing surface supports them.
  Search intent, SERP comparison, AI-citation formatting, FAQs, visuals, and
  schema are goal-driven checks, not universal requirements.
- `editing-humanize`: preservation of approved facts, voice/rhythm improvement,
  no silent strategy rewrite.
- `email-newsletter`: email intent is explicit, subject/preview/body fit the
  intent, CTA is singular and proportional, claims and urgency are supported,
  deliverability or compliance risk is flagged, and no send/schedule is implied
  without approval.
- `social-shortform`: platform/profile is explicit when known, hook fits the
  channel, claim compression preserves scope and caveats, variants test
  meaningful differences, and no post/schedule/DM action is implied without
  approval.
- `content-repurpose`: source artifact is identified, source map preserves claim
  status, target channels and producer skills are explicit, derivative outputs
  do not strengthen claims, and copyright/context risks are surfaced.
- `review-performance`: every impact claim points to evidence or is marked as a
  candidate.
- `content-strategy`: assumptions, prioritization criteria, source freshness,
  dependencies, and clear handoff.

## Report Shape

Return:

```text
Writing Quality Gate
Mode:
Artifact:
Verdict: pass | revise | blocked
Score: N/100

Blocking Findings:
- ...

Score Breakdown:
- Contract Fit: N/15
- Evidence and Claim Safety: N/20
- Audience and Voice Fit: N/15
- Structure and Reader Utility: N/15
- Clarity and Style: N/15
- Mode Readiness: N/10
- Handoff and Revision Quality: N/10

Evidence:
- ...

Open Items:
- ...

Next:
- ...
```
