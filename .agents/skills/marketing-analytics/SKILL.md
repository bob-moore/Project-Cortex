---
name: marketing-analytics
description: "Use when planning or interpreting marketing analytics, GA4/GSC/GTM evidence, funnel analysis, conversion tracking, event naming, campaign measurement, ROI, attribution, dashboard requirements, or analytics readouts. Produces evidence-labeled analysis and tracking plans without mutating analytics platforms unless explicitly approved."
---

# Marketing Analytics

Use this skill to connect marketing activity to measurable decisions.

## Operating Contract

1. Resolve source system, site/app, date range, segment, metric definitions,
   and business question.
2. Prefer actual exports or read-only tool output over assumptions.
3. Label analytics as `client-data`, `provider-estimate`, `source-fact`,
   `judged`, `assumed`, or `blocked`.
4. Do not publish tags, edit GTM/GA4, change consent settings, or mutate
   analytics platforms without explicit approval.
5. Do not send PII into analytics plans.
6. When Composio is the route for live analytics evidence, prefer the local
   Composio CLI and preserve source IDs, account ambiguity, and retrieval time.

## Procedure

1. Define the question: tracking plan, funnel diagnosis, campaign report,
   attribution convention, ROI, dashboard, or anomaly investigation.
2. Identify source systems and known limitations: GA4, GSC, CRM, ESP, ads
   exports, UTM sheet, server logs, or manually supplied metrics.
3. Declare the measurement window and segment.
4. Build or inspect the funnel:
   - source/session
   - page/landing experience
   - CTA/form/action
   - lead/opportunity/sale or downstream action
5. Identify bottlenecks, suspicious instrumentation, and decision implications.
6. Recommend measurement fixes and route implementation to Development,
   WordPress Operator, or platform owner.

## Output

```text
Marketing Analytics
Question:
Source System/Window:

Metric Definitions:
- ...

Findings:
- ...

Funnel/Attribution:
- ...

Recommendations:
- ...

Implementation Handoff:
- ...
```
