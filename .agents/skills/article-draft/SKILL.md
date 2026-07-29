---
name: article-draft
description: "This skill should be used when the user asks to \"write an article\", \"draft an article\", \"write a blog post\", \"draft a blog\", \"create article draft\", \"write from this outline\", \"turn this brief into an article\", or when a writing workflow needs a complete long-form draft from a brief or outline."
---

# Article Draft

Use this skill to draft a complete long-form article from a brief, outline,
source set, or topic.

This skill produces a draft. It does not publish, guarantee ranking, invent
sources, or close the quality gate. Use `claim-check`, `copy-edit`,
`voice-humanize`, and `writing-quality-gate` as separate passes when required.

## Operating Contract

1. Start with `writing-foundation`.
2. Read the article brief or outline when available.
3. Identify article type, audience, reader intent, thesis, evidence, and desired
   action.
4. Draft source-backed claims only when support is available.
5. Mark assumptions and source gaps.
6. Keep SEO, FAQ, schema, visuals, and internal links goal-driven rather than
   universal.

## Draft Procedure

### 1. Confirm Contract

Capture:

```text
Article type:
Audience:
Reader intent:
Thesis:
Search goal:
Evidence available:
Evidence gaps:
Voice constraints:
Desired action:
```

### 2. Build Or Use Outline

Use an approved outline when available. If none exists, create a compact working
outline before drafting.

### 3. Draft Answer-First Sections

Each major section should:

- State the point early.
- Explain why it matters.
- Support material claims.
- Include examples where useful.
- Avoid unsupported statistics.
- Keep paragraphs readable for the audience.

Use `references/article-writing-rules.md` for drafting rules.

### 4. Handle Evidence

Use `references/source-and-claim-rules.md` while drafting.

- Include source names and links when supplied or verified.
- Mark unverifiable claims as open items.
- Use qualitative phrasing when no reliable number exists.
- Do not imply first-hand experience without support.

### 5. Prepare Handoff

Return the complete draft plus notes for follow-up passes.

## Output Format

Return:

```text
# [Article Title]

[Draft]

## Draft Notes
- Mode: blog-article
- Article type:
- Evidence:
- Assumptions:
- Open claims:
- Suggested next pass:
```

If metadata is requested, include:

```text
Title tag:
Meta description:
Suggested slug:
```

## Boundaries

- Do not invent citations, data, examples, quotes, screenshots, or internal
  links.
- Do not force key takeaways, FAQ, charts, or schema when they do not help the
  article.
- Do not claim search, AI citation, or performance outcomes.
- Do not silently turn a thought-leadership article into an SEO article.
- Do not publish or write to a file unless the workflow allows `vault_write`.

If this skill conflicts with `.agents/disciplines/writing/rubric.md`, the rubric
wins.

## Reference Files

- `references/article-writing-rules.md`: section, intro, conclusion, and style
  rules.
- `references/source-and-claim-rules.md`: source handling and unsupported-claim
  rules.
- `references/draft-handoff.md`: delivery and next-pass conventions.
