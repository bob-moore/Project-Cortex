# Review Code

## Purpose

Independently review one bounded repository diff, branch, or work in progress against explicit requirements, tests, regression risk, and security concerns.

## Invocation

Use `review-code` for standalone read-only engineering review.

## Required Context

Read repository instructions, fixed comparison boundary, work order, acceptance criteria, non-goals, manifests, changed files, and producer evidence.

## Workflow

1. Resolve repository and comparison boundary.
2. Establish requirements and review limits.
3. Fresh Verifier reviews actual diff, tests, regression paths, scope, and security.
4. Parent gate reports findings and evidence; it does not approve producer work automatically.

## Writes

Read-only review report only when requested.

## Approval Gates

No implementation or external mutation.

## Verification

Run workflow validator and review against actual diff and evidence.

## Return Format

`Status`, `Repository`, `Comparison Boundary`, `Requirements`, `Findings`, `Checks`, `Evidence`, `Open Items`, `Next`.

## Related Roles

- `verifier`

## Contract

See `contract.json`; canonical contract wins.
## Purpose

Standalone code review workflow.
## Invocation

Use for branch, PR, or WIP review.
## Writes

Read-only report only.
## Approval Gates

No mutation.
## Verification

Fresh Verifier context.
## Return Format

Findings-first structured return.
## Related Roles

Verifier.

## Notes

Missing authority is UNPROVEN, not invented.

## Done

Every material finding has direct evidence.

## End

Parent gate reports result.

## Scope

One fixed comparison boundary.

## Review

Actual diff only.

## Status

Contract-backed.

## End State

PASS, FAIL, BLOCK, or UNDECIDED.

## Appendix

No unattended execution implied.

## Final

Do not repair reviewed work.

## Related

See `harness/policies/done.md`.

## Close

Return evidence, not confidence.

## End Contract

Canonical contract remains authoritative.

## Operator

Parent runtime owns routing.

## Verifier

Verifier owns independent assessment.

## Done Signal

Review report complete.

## End Document

.