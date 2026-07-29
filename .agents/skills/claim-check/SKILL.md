---
name: claim-check
description: "This skill should be used when the user asks to \"fact check\", \"check claims\", \"verify sources\", \"validate statistics\", \"check citations\", \"source this\", \"find unsupported claims\", \"audit evidence\", or when a writing workflow needs claim extraction, evidence labeling, and verification notes before readiness review."
---

# Claim Check

Use this skill to extract claims from a written artifact, classify their risk,
label available evidence, and return source or revision requirements.

This skill is a verification skill. It does not draft new claims, publish
content, or treat unsupported claims as true. It supports `writing-quality-gate`
by making claim status explicit before a readiness verdict.

## Operating Contract

1. Identify the artifact mode from `.agents/disciplines/writing/modes.md`.
2. Read the target artifact or supplied draft.
3. Extract material claims.
4. Classify claim type, risk, and evidence status.
5. Verify only against sources actually available in the current runtime.
6. Mark unverified claims plainly.
7. Recommend remove, source, soften, or rewrite actions.

Do not browse, fetch, or use external sources unless the workflow approval class
allows external read. Do not invent replacement sources.

## Claim Extraction

Extract claims that affect trust, decision-making, or legal/commercial meaning.

Always extract:

- Numbers, percentages, money amounts, multipliers, rankings, dates, and time
  savings.
- Superlatives and comparisons.
- Testimonials, quotes, case-study outcomes, and named customer claims.
- Awards, certifications, partnerships, credentials, and regulatory claims.
- Product capabilities, guarantees, eligibility, pricing, and timelines.
- Health, legal, financial, employment, safety, compliance, and platform-policy
  claims.

Skip ordinary editorial judgments unless stated as fact.

Use `references/claim-types.md` for classification.

## Evidence Labels

Use discipline labels:

- `source-backed`: traceable to a cited or inspected source.
- `user-provided`: supplied by the operator, client notes, or project docs.
- `measured`: observed in data, tooling, or artifact inspection.
- `judged`: editorial judgment.
- `assumed`: needed but not established.

Use `references/evidence-labels.md` for label rules.

## Verification Procedure

1. Create a claim table.
2. For each claim, identify the nearest support: citation, link, note, source
   block, user statement, data file, or no support.
3. When a source is available and access is approved, inspect the source for the
   same value, entity, time period, and context.
4. Score support:

| Score | Status | Meaning |
| ---: | --- | --- |
| 1.0 | verified | source directly supports claim |
| 0.7-0.9 | supported-with-caveat | source supports with rounding, paraphrase, or narrower scope |
| 0.3-0.6 | weak | source relates to topic but does not fully support claim |
| 0.0 | not-supported | source fails, contradicts, or is inaccessible |
| N/A | unverified | no source inspected or no source supplied |

5. Assign risk: `low`, `medium`, `high`, or `critical`.
6. Recommend the next action.

Use `references/verification-process.md` for source handling and risk rules.

## Output Format

Return:

```text
Claim Check
Artifact:
Mode:
External sources inspected: yes | no

Summary:
- Claims found:
- Verified:
- Supported with caveat:
- Weak:
- Not supported:
- Unverified:
- Critical/high-risk:

Claims:
| # | Claim | Type | Evidence | Score | Risk | Action |
| --- | --- | --- | --- | ---: | --- | --- |
| 1 | ... | ... | ... | ... | ... | ... |

Blocking Issues:
- ...

Recommended Revisions:
- ...
```

## Boundaries

- Do not treat a citation as proof without inspecting it when inspection is
  required and available.
- Do not downgrade high-stakes claims to low risk because the prose sounds
  cautious.
- Do not add citations from memory.
- Do not claim that an uncited statistic is true.
- Do not change the artifact unless the workflow asks for revision and allows
  `vault_write`.

If this skill conflicts with `.agents/disciplines/writing/rubric.md`, the rubric
wins.

## Reference Files

- `references/claim-types.md`: claim classes and examples.
- `references/evidence-labels.md`: evidence status rules.
- `references/verification-process.md`: source inspection, scoring, and risk
  handling.
