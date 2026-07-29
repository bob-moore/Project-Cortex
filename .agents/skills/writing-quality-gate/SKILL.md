---
name: writing-quality-gate
description: "This skill should be used when the user asks to \"grade writing\", \"score this draft\", \"quality gate\", \"review this copy\", \"check this article\", \"is this ready\", \"audit this draft\", or when a writing workflow needs a mode-aware readiness verdict. Applies the canonical writing discipline rubric."
---

# Writing Quality Gate

Apply the canonical writing quality gate to a written artifact.

## Procedure

1. Read `.agents/disciplines/writing/contract.json`.
2. Read `.agents/disciplines/writing/modes.md`.
3. Read `.agents/disciplines/writing/rubric.md`.
4. Identify the artifact mode: `web-copy`, `blog-article`, `editing-humanize`,
   `email-newsletter`, `social-shortform`, `review-performance`, or
   `content-strategy`.
5. For client-specific work, read `Clients/<Client>/<Client> Brand.md` and
   `Clients/<Client>/<Client> Voice.md` when available.
6. Evaluate blocking findings before assigning a score.
7. Score only applicable categories. Mark skipped mode-specific checks plainly.
8. Return the rubric report shape exactly.

## Rules

- Treat this as a verifier or quality-gate skill, not as a drafting skill.
- Do not publish, send, schedule, or mutate external platforms.
- Do not treat the score as proof that factual claims are true.
- Mark unsupported claims as blockers or open items depending on risk.
- Label evidence as `measured`, `source-backed`, `user-provided`, `judged`, or
  `assumed`.

If this skill conflicts with `.agents/disciplines/writing/rubric.md`, the rubric
wins.
