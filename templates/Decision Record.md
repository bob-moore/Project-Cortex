---
date: "{{date}}"
description: Template for decisions with alternatives, prediction, confidence, and revisit trigger.
status: proposed
confidence: medium
revisit_date:
tags:
  - decision
---

# Decision: {{title}}

## Context
What is the situation that requires a decision?

## Alternatives Considered
1.
2.

For each, note why it wasn't chosen — the actual tradeoff, not just the option name.

## Decision
What was decided and why.

## Prediction
What you expect to happen as a result — concrete enough to be provably right or wrong later, not a vague hope. Confidence level is set in frontmatter (`stated | high | medium | speculation`) — never mark a guess as `stated` or `high` just because it would look more decisive.

## What Would Change My Mind
The specific evidence that would make you reverse or revise this decision. If genuinely nothing would, say so and explain why this is treated as settled rather than provisional.

## Revisit
Set `revisit_date` in frontmatter to a concrete date or trigger event when creating this record — not "later." `/vault-audit` surfaces decisions past their `revisit_date`. When revisited, log the outcome here: was the prediction right? What actually happened?

## Related
-
