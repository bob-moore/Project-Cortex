# Design Exploration

## Purpose

Create one bounded redesign or prototype artifact with current-system evidence and explicit approval before implementation.

## Invocation

Use `design-exploration` for redesigns, prototypes, and implementation-oriented design exploration. Use `design-research` first when visual direction is unresolved.

## Required Context

Read client Brand, Voice, Design Tokens, approved content, Stack/current-system evidence, design modes/rubric, and the canonical contract.

## Workflow

1. Resolve mode (`redesign` or `prototype`), target, authority, current-system evidence, destination, and approval boundary.
2. For redesign, inspect the actual current target and record evidence.
3. Designer produces a mode-appropriate specification, acceptance matrix, or disposable prototype.
4. Fresh Verifier checks evidence sufficiency, responsive/accessibility implications, scope, and approval state.
5. Parent records approval or awaiting-approval; no unapproved implementation proceeds.

## Writes

Approved project design artifacts or disposable prototype evidence only. No production code, WordPress state, or external mutation.

## Approval Gates

Direction/prototype approval required before implementation. Prototypes are evidence, not production.

## Verification

Run workflow validators, link/frontmatter checks, and fresh readiness review.

## Return Format

`Status`, `Mode`, `Client/project`, `Target`, `Current-system evidence`, `Specification/prototype`, `Acceptance Matrix`, `Approval Needed`, `Evidence`, `Open Items`, `Next`.

## Related Roles

- `designer`
- `verifier`
- `developer` after approval

## Contract

See `contract.json`; canonical contract wins.
## Purpose

Bounded redesign and prototype workflow.
## Invocation

Use for implementation-oriented design exploration.
## Writes

Approved design artifact or disposable prototype.
## Approval Gates

No unapproved production implementation.
## Verification

Fresh readiness review.
## Return Format

Structured evidence fields above.
## Related Roles

Designer, Verifier, Developer.

## Notes

Design authority and proposal remain separate.

## Done

Approval state explicit.

## End

Parent gate owns decision.

## Scope

One bounded target and mode.

## Review

Responsive and accessibility criteria required.

## Status

Contract-backed.

## End State

Approved, awaiting-approval, needs-revision, or blocked.

## Appendix

No unattended execution implied.

## Final

Route implementation to Developer only after approval.

## Related

See `harness/policies/done.md`.

## Close

Return evidence, not taste alone.

## End Contract

Canonical contract remains authoritative.

## Operator

Parent runtime controls routing.

## Verifier

Independent readiness reviewer.

## Done Signal

Approval or explicit blocker.

## End Document

.