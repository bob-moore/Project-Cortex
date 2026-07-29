---
description: Canonical marketing quality gate and scoring rubric.
tags:
  - harness
  - discipline
  - marketing
  - rubric
---

# Marketing Quality Gate

Use this rubric before treating marketing research, strategy, analytics, CRO,
or campaign planning as ready for handoff, parent verification, client use, or
implementation.

## Blocking Findings

Any blocking finding prevents a ready claim regardless of score:

- Client, market, audience, geography, date range, or decision context is
  missing and materially affects the recommendation.
- Current market, competitor, keyword, platform, legal, or analytics claims are
  presented without source dates or evidence labels.
- Analytics or keyword provider estimates are treated as exact truth.
- Recommendations contradict Brand, Voice, Stack, approved SEO, or known
  implementation constraints without flagging the conflict.
- Finished copy, design, code, WordPress state, publishing, scheduling, or
  external platform mutation is performed outside the owning role/workflow.
- Email or social work sends, posts, schedules, imports contacts, changes DNS,
  changes ESP settings, replies, DMs, or mutates accounts without explicit
  approval.
- Paid ads are included despite the current explicit exclusion.
- Marketing automation platform setup is activated instead of recorded as a
  deferred capacity gap.

## Evidence Labels

Label material inputs:

- `authority`: user request, workflow contract, Brand, Voice, Stack, approved
  strategy, or prior decision.
- `source-fact`: cited external research, competitor page, report, SERP,
  transcript, review, or public dataset.
- `client-data`: analytics export, CRM data, Search Console data, sales notes,
  customer interviews, or internal metrics.
- `provider-estimate`: keyword volume, difficulty, traffic estimate, social
  metric, or third-party modeled data.
- `judged`: strategic synthesis or prioritization based on labeled evidence.
- `assumed`: unverified input that needs review.
- `blocked`: evidence not available; say what would unblock it.

## Score

Score to 100 only after blocking findings are handled.

| Category | Points | What Good Looks Like |
|---|---:|---|
| Contract and Scope | 15 | Client, market, audience, date range, objective, artifact, and out-of-scope work are explicit. |
| Evidence Quality | 25 | Sources are dated, labeled, relevant, and limitations are clear. |
| Strategic Judgment | 25 | Recommendations make real tradeoffs, prioritize, and connect research to action. |
| Channel and Funnel Fit | 15 | Email, social, SEO, CRO, content, and analytics roles are coherent, measurable, and routed to the right owner. |
| Handoff Quality | 20 | Next owner, acceptance criteria, implementation surface, and open assumptions are clear. |

## Report Shape

Return:

```text
Marketing Quality Gate
Mode:
Client/Market/Date Range:
Verdict: pass | revise | blocked
Score: N/100

Blocking Findings:
- ...

Evidence:
- ...

Recommendations:
- ...

Handoff:
- ...

Open Items:
- ...

Next:
- ...
```
