---
name: web-copy
description: "This skill should be used when the user asks to \"write website copy\", \"write web copy\", \"write homepage copy\", \"write an about page\", \"write a service page\", \"write product page copy\", \"write landing page copy\", \"write a sales page\", \"write promotional page copy\", \"write CTAs\", \"write page sections\", or when a writing workflow needs website copy with an explicit standard or promotional intent."
---

# Web Copy

Use this skill to draft website copy for pages, sections, CTAs, metadata, and
wire copy.

Web copy is not one tone. Classify the page intent before drafting:

- `standard`: normal website pages that orient, explain, build trust, and help
  readers choose the next step.
- `promotional`: landing pages, campaign pages, sales pages, offer pages, and
  other pages intentionally built to persuade or convert.

Sales copy may be persuasive. It may use urgency, contrast, repetition, offer
logic, and direct CTAs when the brief supports them. It must not use unsupported
superlatives, fake scarcity, invented proof, pressure tactics, or vague hype.

## Operating Contract

Start with `writing-foundation`. Apply `copy-edit` or `voice-humanize` after
drafting when the workflow needs revision. Apply `writing-quality-gate` when a
readiness verdict is required.

1. Identify the page type.
2. Identify `web_intent`: `standard` or `promotional`.
3. Identify audience, reader state, desired action, offer or subject, proof, and
   approval boundary.
4. Read Brand, Voice, project, campaign, product, or service notes for
   client-specific work.
5. Draft only claims that are source-backed, user-provided, measured, judged, or
   labeled assumed.
6. Do not publish, update a site, install tracking, or mutate external systems
   without explicit approval.

## Intent Selection

Use `standard` when the page primarily answers:

- Who is this?
- What does this organization, person, product, or service do?
- Is this credible and relevant?
- What is the sensible next step?

Use `promotional` when the page primarily answers:

- Why act now?
- Why this offer instead of alternatives?
- What outcome is promised?
- What objections need to be resolved?
- What action should the reader take?

If the prompt says "avoid sales hype" but asks for a landing page or sales page,
interpret the instruction as "sell without unsupported hype." If the prompt asks
for an about page or ordinary service page, keep persuasion lower unless the
operator requests a stronger conversion angle.

Use `references/web-intents.md` for the full distinction.

## Draft Procedure

### 1. Build The Page Contract

Capture:

```text
Page type:
Web intent:
Audience:
Reader state:
Primary action:
Secondary action:
Offer or subject:
Proof available:
Voice constraints:
SEO inputs:
Open assumptions:
```

### 2. Choose The Page Shape

Match structure to page type and intent.

- Homepage: orient quickly, show fit, route readers to next steps.
- About page: build trust, context, values, credibility, and human signal.
- Service page: explain the problem, service, process, fit, proof, and CTA.
- Product page: explain outcome, mechanism, features, proof, and buying path.
- Landing page: focus on one audience, one offer, one action.
- Sales page: present the offer, proof, objections, risk reversal, and action.

Use `references/page-types.md` for page-specific structures.

### 3. Draft Standard Web Copy

For `standard` intent:

- Lead with clear orientation.
- Keep claims measured and restrained.
- Explain benefits without pressure.
- Add proof where useful, but do not force scarcity or urgency.
- Use CTAs that help the reader continue, contact, compare, or learn.
- Keep tone aligned with Brand and Voice notes.

Use `references/standard-pages.md` for standard-page patterns.

### 4. Draft Promotional Web Copy

For `promotional` intent:

- Lead with the offer, outcome, or problem.
- Name the audience and buying moment.
- Make the primary CTA obvious and repeated where appropriate.
- Use proof, testimonials, metrics, demos, guarantees, or risk reversal only
  when available or explicitly marked as needed.
- Address objections directly.
- Use urgency only when the constraint is real.

Use `references/promotional-pages.md` for promotional-page patterns.

### 5. Prepare Handoff

Return the copy in a shape that a designer, developer, or site operator can use.

For longer work, include:

```text
Page Copy:

Metadata:
- Title:
- Description:

Notes:
- Web intent:
- Evidence:
- Assumptions:
- Open proof needs:
- Recommended next gate:
```

Use `references/page-handoff.md` for wire-copy and section-label conventions.

## Boundaries

- Do not make every page sound like a sales page.
- Do not treat "avoid hype" as "avoid persuasion" when the page is promotional.
- Do not invent scarcity, discounts, guarantees, results, testimonials, logos,
  client names, certifications, awards, or dates.
- Do not overfit standard pages to conversion formulas.
- Do not bury the CTA on promotional pages.
- Do not claim final readiness if proof gaps or approval gates remain.

If this skill conflicts with `.agents/disciplines/writing/rubric.md`, the rubric
wins.

## Reference Files

- `references/web-intents.md`: standard versus promotional intent rules.
- `references/page-types.md`: common website page structures.
- `references/standard-pages.md`: normal web copy patterns.
- `references/promotional-pages.md`: landing and sales copy patterns.
- `references/page-handoff.md`: metadata, wire copy, and implementation handoff.
