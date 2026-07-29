---
name: email-newsletter
description: "This skill should be used when the user asks to \"write an email\", \"draft a newsletter\", \"write newsletter copy\", \"write a promotional email\", \"write an email sequence\", \"write a nurture email\", \"write subject lines\", \"write preview text\", \"draft announcement email\", or when a writing workflow needs email or newsletter copy that will not be sent without approval."
---

# Email Newsletter

Use this skill to draft email and newsletter copy. This skill writes the message;
it does not manage lists, schedule sends, configure automation, analyze
deliverability systems, or mutate an email platform.

Email is not one format. Classify `email_intent` before drafting:

- `editorial-newsletter`: recurring issue, curated links, commentary, digest, or
  personal/brand note.
- `promotional-email`: offer, launch, sale, campaign, event, webinar, or
  conversion-focused message.
- `nurture-email`: trust-building sequence, onboarding education, objection
  handling, or consideration-stage message.
- `announcement`: update, release note, invitation, operational change, or news.
- `transactional-adjacent`: draft-only copy near account, billing, support, or
  service operations; requires stricter approval before use.

## Operating Contract

Start with `writing-foundation`. Use `copy-edit`, `voice-humanize`,
`claim-check`, and `writing-quality-gate` as separate passes when needed.

1. Identify `email_intent`.
2. Identify audience, list segment, relationship stage, desired action, offer or
   topic, and approval boundary.
3. Read Brand, Voice, campaign, product, service, or source notes when available.
4. Draft subject line, preview text, body, CTA, and variants when requested.
5. Mark claim and proof gaps.
6. Do not send, schedule, upload, import contacts, or modify automation without
   explicit external mutation approval.

Use `references/email-intents.md` for intent selection.

## Draft Procedure

### 1. Build The Email Contract

Capture:

```text
Email intent:
Audience/list segment:
Relationship stage:
Primary action:
Offer or topic:
Proof available:
Tone:
Length:
Approval boundary:
Open assumptions:
```

### 2. Select Structure

Match structure to intent:

- Editorial newsletter: subject, preview, intro, main story or links,
  commentary, soft CTA.
- Promotional email: subject, preview, hook, offer, proof, objection or risk
  reversal, CTA.
- Nurture email: subject, preview, useful idea, teaching point, example, next
  step.
- Announcement: subject, preview, news, why it matters, details, CTA.
- Transactional-adjacent: subject, plain body, precise facts, minimal persuasion,
  review note.

Use `references/email-structures.md` for format details.

### 3. Draft Subject And Preview

Create 3-5 subject line options for material email work. Keep preview text
complementary rather than repetitive.

Use `references/subject-preview.md` for patterns and risk checks.

### 4. Draft Body

- Keep one primary goal.
- Put the reason to read early.
- Use short paragraphs.
- Make the CTA clear.
- Keep promotional pressure proportional to intent.
- Avoid unsupported urgency, scarcity, and claims.
- Preserve source evidence when repurposing.

### 5. Handoff

Return:

```text
Email Draft:
Subject:
Preview:
Body:
CTA:

Variants:
- ...

Notes:
- Email intent:
- Evidence:
- Assumptions:
- Open claims:
- Approval boundary:
```

## Boundaries

- Do not send or schedule email.
- Do not claim deliverability safety from wording alone.
- Do not invent segmentation, personalization fields, discounts, deadlines,
  testimonials, or performance claims.
- Do not make transactional-adjacent copy promotional by default.
- Do not imply legal/compliance approval.

If this skill conflicts with `.agents/disciplines/writing/rubric.md`, the rubric
wins.

## Reference Files

- `references/email-intents.md`: intent and submode rules.
- `references/email-structures.md`: structures by email type.
- `references/subject-preview.md`: subject line and preview text patterns.
- `references/email-safety.md`: deliverability, compliance, and approval risks.
