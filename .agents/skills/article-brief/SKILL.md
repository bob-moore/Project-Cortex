---
name: article-brief
description: "This skill should be used when the user asks to \"create an article brief\", \"write a content brief\", \"plan an article\", \"brief this article\", \"create a blog brief\", \"article requirements\", \"content requirements\", or when a writing workflow needs a mode-aware article plan before outline or drafting."
---

# Article Brief

Use this skill to create a mode-aware article brief that defines audience,
intent, source needs, structure direction, and handoff requirements.

This skill plans article work. It does not draft the full article, promise SEO
performance, or require SERP/AEO research for every article. Use external search
only when the workflow allows external read and the article goal requires it.

## Operating Contract

Start with `writing-foundation`. Use `claim-check` to plan evidence needs for
material claims. Pass the brief to `article-outline` or `article-draft` when the
operator approves continued production.

1. Identify article goal: educational, opinion, comparison, guide, case study,
   news analysis, thought leadership, FAQ, product evaluation, or research.
2. Identify audience, reader state, business context, and desired action.
3. Identify search intent only when search visibility is part of the goal.
4. Identify required evidence and claim risks.
5. Produce a brief with assumptions and open questions visible.

## Brief Procedure

### 1. Intake

Capture:

```text
Topic:
Audience:
Article goal:
Reader intent:
Business purpose:
Desired action:
Voice constraints:
Search goal:
Evidence available:
Open assumptions:
```

### 2. Choose Article Type

Select a type from `references/article-types.md`. The type determines structure,
evidence needs, and voice.

### 3. Plan Evidence

List claims the article is likely to need.

- Define claims that require source-backed evidence.
- Define places where user-provided expertise or first-hand experience is
  needed.
- Define claims that should remain qualitative unless sources are found.
- Mark high-stakes topics before drafting.

Use `claim-check` after a source list or draft exists.

### 4. Plan Reader Utility

Include:

- Core question or problem.
- Answer the reader should leave with.
- Sections needed to support that answer.
- Examples, visuals, tables, or comparisons needed.
- Internal link opportunities when available.
- CTA or next step.

## Output Format

Return:

```text
# Article Brief: [Working Title]

## Contract
- Mode: blog-article
- Article type:
- Audience:
- Reader intent:
- Business purpose:
- Desired action:
- Search goal:

## Working Angle

## Reader Questions
- ...

## Evidence Plan
| Claim Need | Evidence Type | Source Status | Risk |
| --- | --- | --- | --- |

## Recommended Structure
- ...

## Differentiation
- ...

## Handoff
- Ready for:
- Assumptions:
- Open questions:
```

## Boundaries

- Do not require keyword research for non-search articles.
- Do not invent statistics to make the brief look complete.
- Do not imply first-hand experience without supplied evidence.
- Do not require visual assets when the article does not need them.
- Do not treat FAQ, schema, or AI-citation formatting as universal.

If this skill conflicts with `.agents/disciplines/writing/rubric.md`, the rubric
wins.

## Reference Files

- `references/article-types.md`: article type selection.
- `references/brief-fields.md`: field definitions and minimum viable brief.
- `references/evidence-plan.md`: evidence and claim-risk planning.
