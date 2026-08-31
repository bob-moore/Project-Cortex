# Prepare Harness Changelog

## Purpose

Turn a working-vault discovery into a reviewable upstream contribution without treating that vault's diff as a release.

## Invocation

- Canonical workflow: `prepare-harness-changelog`

## Required Context

- Read `core-managed-paths.yaml` and `core-version.yaml`.
- Inspect the source revision and evidence.
- Read relevant workflow, schema, or adapter contracts before proposing an operation.

## Workflow

1. Identify the source revision and candidate behavior.
2. Classify every file as managed, portable methodology, generated output, instance-only, or unresolved.
3. Exclude clients, tasks, diaries, ledgers, receipts, Graphify output, credentials, absolute paths, and runtime-local configuration.
4. Draft explicit `add`, `update`, `delete`, `migrate`, or `regenerate` operations with compatibility and verification notes.
5. Submit the proposal for Cortex review; only accepted Cortex implementation becomes a release.

## Writes

- A reviewable contribution proposal and draft changelog only.

## Approval Gates

- Never release or apply a proposal without separate review.
- Do not promote instance content because it appeared adjacent to portable code.

## Verification

- Proposed paths are managed and sources exist.
- Proposed deletion/migration is explicit and marked confirmation-required.

## Return Format

- **Done**
- **Evidence**
- **Open Items**
- **Next**

## Related Roles

- `developer`
- `verifier`
