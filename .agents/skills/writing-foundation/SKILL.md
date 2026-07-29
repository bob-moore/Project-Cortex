---
name: writing-foundation
description: "This skill should be used when the user asks to \"write copy\", \"draft messaging\", \"sharpen positioning\", \"create headlines\", \"write a value proposition\", \"improve clarity\", \"use customer language\", \"write landing page copy\", \"draft marketing copy\", or when another writing skill needs the canonical audience, positioning, voice-of-customer, and clarity foundation."
---

# Writing Foundation

Use this skill as the shared foundation for written artifacts that need clear
audience fit, positioning, customer language, and claim-safe execution.

This skill does not replace mode-specific skills. Apply it before or alongside
skills for web copy, article drafting, email, social, editing, or content
strategy. Apply `writing-quality-gate` after producing or revising the artifact
when a readiness verdict is needed.

## Operating Contract

Start with vault context, not generic copywriting assumptions.

1. Identify the artifact mode from `.agents/disciplines/writing/modes.md`.
2. Identify the client, project, audience, channel, and desired action from the
   prompt or nearby vault notes.
3. For client-specific work, read available Brand, Voice, brief, project, or
   campaign notes before drafting.
4. If required context is missing, either ask for it or proceed explicitly as a
   provisional draft with assumptions labeled.
5. Keep factual claims, proof, and source status visible while drafting.
6. Do not publish, send, schedule, or externally mutate content without explicit
   approval.

## Foundation Pass

Run this pass before producing polished copy.

### 1. Define the Writing Contract

Capture the working contract in compact form:

```text
Artifact:
Mode:
Audience:
Reader state:
Desired action:
Primary promise:
Proof available:
Voice constraints:
Approval boundary:
Open assumptions:
```

Use `references/context-and-brief.md` for a fuller brief shape when inputs are
thin, conflicting, or client-specific.

### 2. Establish Positioning

Clarify the choice the reader is being asked to make.

- Name the specific audience.
- Name the painful, costly, or desirable moment that makes the artifact matter.
- Name the desired outcome in concrete terms.
- Name the current alternative, workaround, habit, or competitor.
- Name the reason this offer, idea, or recommendation is credible.
- Name the single next action.

Use `references/positioning-and-message.md` when creating a value proposition,
homepage hero, offer narrative, or strategic messaging.

### 3. Use Customer Language

Prefer language drawn from the audience over invented marketing language.

- Extract exact phrases from available interviews, reviews, support tickets,
  sales notes, meeting notes, Slack excerpts, comments, testimonials, or user
  feedback.
- Preserve terms the audience already uses for pain, goals, objections, and
  desired outcomes.
- Label customer language as `source-backed`, `user-provided`, or `assumed`.
- Avoid laundering guessed phrasing into claimed research.

Use `references/voice-of-customer.md` for mining prompts and evidence labels.

### 4. Choose the Message Shape

Select a pattern that fits the mode and reader state.

- Use problem-first patterns when the reader already feels the pain.
- Use outcome-first patterns when the reader understands the category.
- Use differentiation-first patterns when alternatives are obvious.
- Use objection-handling patterns when hesitation blocks action.
- Use explanatory patterns when the reader lacks category context.

Use `references/copy-patterns.md` for PAS, AIDA, before-after-bridge,
feature-benefit translation, hero structure, CTA patterns, and objection
handling.

### 5. Draft for Clarity

Make the first draft easy to scan and hard to misread.

- Lead with the reader's problem, desired outcome, or decision point.
- Put one idea in each paragraph or section.
- Prefer concrete nouns and active verbs.
- Translate features into outcomes with "which means" or "so the reader can".
- Keep claims specific enough to evaluate.
- Remove claims that lack support or label them as assumptions.
- Make the next action obvious.

Use `references/clarity-and-style.md` for plain-language checks, jargon
replacement, rhythm, sentence length, and common failure modes.

## Output Rules

Return the artifact plus working notes when the task has meaningful uncertainty.
For small copy tasks, keep notes brief.

Use this shape when useful:

```text
Draft:

Notes:
- Mode:
- Evidence:
- Assumptions:
- Open questions:
- Recommended quality gate:
```

Mark evidence with one of these labels:

- `source-backed`: grounded in a cited or linked source.
- `user-provided`: supplied directly by the operator or vault context.
- `measured`: derived from observed data or tooling.
- `judged`: editorial judgment without external proof.
- `assumed`: needed for the draft but not established.

## Boundaries

- Do not invent testimonials, metrics, case studies, quotes, awards, client
  names, certifications, or dates.
- Do not imply legal, medical, financial, or regulatory certainty without
  current verification from an appropriate source.
- Do not force SEO, blog structure, or conversion-page conventions onto modes
  where they do not belong.
- Do not treat customer-language guesses as voice-of-customer evidence.
- Do not let cleverness outrank comprehension.

If this skill conflicts with `.agents/disciplines/writing/rubric.md`, the rubric
wins.

## Reference Files

- `references/context-and-brief.md`: minimum viable brief and missing-context
  handling.
- `references/positioning-and-message.md`: audience, alternative, promise,
  proof, and message hierarchy.
- `references/voice-of-customer.md`: customer-language mining and evidence
  labels.
- `references/copy-patterns.md`: reusable copy structures and when to use them.
- `references/clarity-and-style.md`: plain-language and failure-mode checks.
