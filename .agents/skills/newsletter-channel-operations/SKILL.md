---
name: newsletter-channel-operations
description: "Use when planning, auditing, or operating newsletter and email publication channels: newsletter strategy, content sourcing, curation, cadence, subscriber growth, engagement metrics, issue planning, archive strategy, and handoff to Writer. Does not send email, import contacts, change ESP settings, mutate automations, or bypass deliverability/quality gates."
---

# Newsletter Channel Operations

Use this skill for the operating layer around newsletters and recurring email
channels.

Writer owns issue copy through `email-newsletter`. Marketing owns newsletter
role, sourcing, cadence, audience growth, metrics, archive/distribution
strategy, and quality gates.

## Operating Contract

1. Resolve client, newsletter purpose, audience, list/source, cadence, ESP or
   platform, archive surface, metrics, and approval boundary.
2. Read Brand, Voice, and Stack when client-specific.
3. Do not send, schedule, import contacts, modify lists, update templates,
   change ESP settings, or mutate automations without explicit approval.
4. Use `email-deliverability` when inbox placement or domain authentication is
   uncertain.
5. Use `email-quality-auditor` before material sends when list consent,
   suppression, claims, or outcome truth is uncertain.
6. Route issue copy to `email-newsletter`.

## Planning Surfaces

- audience promise and editorial stance
- source categories and curation quality filter
- recurring sections or issue formats
- cadence and production workflow
- subscriber growth paths
- archive/SEO role
- social teaser/distribution plan
- metrics and review cadence

## Defaults

- Weekly is the default cadence for most newsletters unless the audience or
  production capacity argues otherwise.
- Prefer fewer, better links with commentary over long generic link lists.
- Treat open rate as directional; clicks, replies, downstream actions, and
  unsubscribe/complaint rates carry stronger signal.

## Output

```text
Newsletter Channel Operations
Client/List/Platform:
Goal:

Editorial Promise:
- ...

Operating Plan:
| Surface | Decision | Evidence/Reason |

Metrics:
- ...

Handoff:
- Writer:
- Deliverability/QA:
- Analytics/UTM:

Approval-Gated Actions:
- ...
```
