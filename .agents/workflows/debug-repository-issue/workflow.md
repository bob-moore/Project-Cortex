# Debug Repository Issue

## Purpose

Diagnose and fix one bounded repository failure through reproduction, root-cause analysis, minimal implementation, and independent verification.

## Invocation

Use `debug-repository-issue` for broken, failing, throwing, or slow repository behavior.

## Required Context

Read `harness/manual.md`, user/operator context, development discipline, repository instructions, manifests, and the canonical contract.

## Workflow

1. Resolve repository, branch, symptom, trigger, environment, acceptance criteria, and approval boundary.
2. Establish a red-capable reproduction before patching.
3. Compare failing and working paths; test one falsifiable hypothesis at a time.
4. Implement the smallest root-cause fix with regression proof.
5. Fresh Verifier independently checks reproduction, fix, scope, and evidence.
6. Parent gate closes only on PASS; FIX routes to `diagnose-and-fix`.

## Writes

Developer may write only scoped repository files. No production, database, remote, secret, or deployment mutation.

## Approval Gates

Read-only inspection may proceed. External, destructive, production, dependency, remote, and secret actions require separate approval.

## Verification

Run project-native checks plus `node .agents/scripts/verify-workflows.mjs` and the repository gate.

## Return Format

`Status`, `Repository`, `Symptom`, `Reproduction`, `Root Cause`, `Files Changed`, `Tests/checks`, `Evidence`, `Open Items`, `Next`.

## Related Roles

- `developer`
- `verifier`

## Contract

See `contract.json`; canonical contract wins.
## Purpose

Bounded repository debugging workflow.
## Invocation

Use when a repository behavior fails or regresses.
## Writes

Scoped repository files only.
## Approval Gates

No production or external mutation.
## Verification

Independent fresh-context verification required.
## Return Format

Structured evidence fields above.
## Related Roles

Developer and Verifier.

## Notes

Do not stack speculative fixes.

## Done

Verified root cause and regression proof.

## End

Parent gate owns closure.

## Workflow Details

Use `developer-delivery` inside implementation and `web-quality-verification` only when rendered behavior is part of acceptance.

## Scope

One bounded issue per work order.

## Review

Fresh evidence after every revision.

## Status

Contract-backed.

## End State

PASS, FIX, BLOCK, or UNDECIDED.

## Appendix

No unattended execution implied.

## Final

Stop on missing reproduction.

## Related

See `harness/policies/done.md`.

## Close

Return evidence, not confidence.

## End Contract

Canonical contract remains authoritative.

## Operator

Parent runtime controls routing.

## Verifier

Independent verifier controls evidence sufficiency.

## Done Signal

Parent gate PASS.

## End Document

.