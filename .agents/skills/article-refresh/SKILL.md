---
name: article-refresh
description: "This skill should be used when the user asks to \"refresh this article\", \"update this blog post\", \"rewrite this article\", \"improve this post\", \"optimize this article\", \"revise this blog\", \"update stale content\", or when a writing workflow needs a read-first refresh of an existing long-form artifact."
---

# Article Refresh

Use this skill to audit and refresh an existing long-form article while
preserving what still works.

This skill starts read-only. It does not assume every refresh is an SEO rewrite,
does not publish changes, and does not overwrite the original without workflow
permission.

## Operating Contract

1. Read the existing article.
2. Identify current mode, article type, audience, thesis, and desired action.
3. Audit stale claims, unsupported claims, structure, voice, and reader utility.
4. Present a refresh plan before major rewrite work when scope is material.
5. Preserve original value, approved facts, first-hand insight, and useful
   internal links.
6. Use `claim-check` for claim risk.
7. Use `writing-quality-gate` when a readiness verdict is required.

## Refresh Procedure

### 1. Audit

Capture:

```text
Artifact:
Article type:
Current purpose:
Likely reader intent:
Freshness risk:
Claim risk:
Structure issues:
Voice issues:
Preserve:
Change:
Approval boundary:
```

Use `references/refresh-audit.md` for the audit checklist.

### 2. Plan

Return a plan before editing when the article needs material changes:

- Claims to verify or replace.
- Sections to keep.
- Sections to cut.
- Sections to add.
- Metadata or freshness changes.
- Internal links, visuals, or CTA updates.
- Risks and assumptions.

### 3. Rewrite

When approved or when the requested scope is straightforward:

- Preserve the article's strongest useful material.
- Replace stale or unsupported claims with supported language.
- Improve answer-first structure.
- Update headings only when clarity or search intent requires it.
- Add examples, tables, or visuals only when they improve reader utility.
- Keep voice aligned with Brand and Voice notes.

Use `references/rewrite-rules.md` for rewrite constraints.

### 4. Handoff

Return the refreshed draft plus change notes and unresolved issues.

## Output Format

For audit-only:

```text
Article Refresh Audit
Artifact:
Verdict: refresh | minor edit | rewrite | blocked

Findings:
- ...

Plan:
- ...

Open Items:
- ...
```

For completed refresh:

```text
Refreshed Draft:

Changes Made:
- ...

Preserved:
- ...

Open Items:
- ...

Recommended Next Pass:
- ...
```

## Boundaries

- Do not update `lastUpdated` unless facts, recommendations, methods, or
  material copy changed.
- Do not replace first-hand insight with generic sourced summary.
- Do not add current claims without current sources.
- Do not infer AI authorship from style patterns.
- Do not publish or overwrite externally without approval.

If this skill conflicts with `.agents/disciplines/writing/rubric.md`, the rubric
wins.

## Reference Files

- `references/refresh-audit.md`: read-only audit checklist.
- `references/rewrite-rules.md`: preservation and rewrite rules.
- `references/freshness-and-metadata.md`: date, metadata, and freshness rules.
