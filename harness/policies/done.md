---
description: Definition of done for agent work in this vault.
tags:
  - harness
  - policy
---

# Done Policy

An agent may not report work as done from self-assessment alone.

## Definition

Done means:

1. the requested work was completed within scope
2. the workflow contract's `done_when` items are satisfied
3. the required approval gates were respected
4. the verification gate passed or the remaining risk is explicitly reported
5. durable records were updated when the workflow requires them

## Valid Done Evidence

Valid evidence includes:

- deterministic script output
- test output
- schema validation
- adapter parity checks
- rendered or inspected artifact evidence
- explicit user approval
- source-labeled external evidence

## Invalid Done Evidence

Invalid evidence includes:

- producer confidence
- "looks good" without inspection
- an unchecked plan
- a child agent's completion claim without parent verification
- a successful command that did not check the requested condition

## Failure Rule

If verification fails, the work is not done. Report the failure, the evidence,
and the smallest next action.

