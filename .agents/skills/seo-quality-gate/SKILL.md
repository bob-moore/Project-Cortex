---
name: seo-quality-gate
description: "Use when the user asks to quality gate, score, review, validate, or check an SEO audit, report, finding list, brief, schema plan, keyword research, local SEO recommendation, AI-search check, drift report, or action queue. Applies the canonical SEO discipline rubric."
---

# SEO Quality Gate

Apply the canonical SEO quality gate to an SEO artifact.

## Procedure

1. Read `.agents/disciplines/seo/contract.json`.
2. Read `.agents/disciplines/seo/modes.md`.
3. Read `.agents/disciplines/seo/rubric.md`.
4. Identify the SEO mode: `foundation`, `page-audit`, `technical-audit`,
   `keyword-research`, `content-brief`, `schema`, `local-seo`, `ai-search`,
   `programmatic-seo`, `drift-monitoring`, or `reporting`.
5. For client-specific work, read available Brand, Voice, Stack, project notes,
   and prior audit evidence when available.
6. Evaluate blocking findings before assigning a score.
7. Score only applicable categories. Mark skipped mode-specific checks plainly.
8. Return the rubric report shape exactly.

## Rules

- Treat this as a verifier or quality-gate skill, not as an audit producer.
- Do not run paid provider calls, mutate external systems, or change production.
- Do not treat any score as proof of ranking, traffic, indexing, revenue, or AI
  citations.
- Mark missing, capped, partial, sampled, stale, blocked, or unavailable
  evidence as a limitation, not a zero or all-clear.
- Label evidence as `observed-page`, `crawl-output`, `first-party-data`,
  `official-doc`, `vendor-data`, `third-party-study`, `heuristic`,
  `hypothesis`, `user-provided`, or `assumed`.
- If an SEO recommendation creates writing, development, WordPress, design, or
  production work, state the handoff rather than silently doing it.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric
wins.
