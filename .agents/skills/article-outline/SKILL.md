---
name: article-outline
description: "This skill should be used when the user asks to \"outline this article\", \"create an article outline\", \"make a blog outline\", \"plan sections\", \"heading structure\", \"article skeleton\", \"structure this post\", or when a writing workflow needs an approved section plan before drafting."
---

# Article Outline

Use this skill to create a structured article outline from a topic, brief,
source set, or existing planning notes.

This skill creates structure. It does not perform deep research, write the full
article, or require search optimization for every article.

## Operating Contract

1. Read the article brief when available.
2. Identify article type, reader intent, thesis, evidence needs, and desired
   action.
3. Build a section hierarchy that answers the reader's question.
4. Mark claim and evidence needs inside the outline.
5. Keep search, FAQ, visual, and internal-link elements optional and goal-driven.

## Procedure

### 1. Confirm Inputs

Capture:

```text
Topic:
Brief source:
Article type:
Audience:
Reader intent:
Thesis:
Search goal:
Evidence status:
```

### 2. Select Outline Shape

Use `references/outline-shapes.md` to select a structure that fits the article
type.

### 3. Build Sections

Each major section should include:

- Heading.
- Reader question answered.
- Answer-first direction.
- Points to cover.
- Evidence needed.
- Optional example, visual, table, or internal link.

### 4. Check Flow

Verify:

- The introduction leads into the article promise.
- Sections build in a logical order.
- No section exists only to satisfy a template.
- H3s appear only when subdivision helps.
- The conclusion gives the next step without adding new unsupported claims.

## Output Format

Return:

```text
# Article Outline: [Working Title]

## Parameters
- Mode: blog-article
- Article type:
- Audience:
- Reader intent:
- Search goal:

## Outline

### Introduction
- Hook:
- Promise:
- Reader payoff:

### H2: [Heading]
- Answer-first direction:
- Cover:
- Evidence:
- Example or visual:
- Internal link:

## Open Evidence Needs
- ...

## Ready For
- article-draft | revision | approval
```

## Boundaries

- Do not save files unless the workflow allows `vault_write`.
- Do not claim the outline is research-backed when research has not happened.
- Do not force question headings, FAQ, charts, or keyword placement.
- Do not use external search unless external read is approved and needed.

If this skill conflicts with `.agents/disciplines/writing/rubric.md`, the rubric
wins.

## Reference Files

- `references/outline-shapes.md`: structures by article type.
- `references/section-contracts.md`: section-level planning fields.
