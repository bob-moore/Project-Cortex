# Update Harness

## Purpose

Safely apply a Project Cortex release to one consuming vault from explicit changelog operations only.

## Invocation

- Canonical workflow: `update-harness`

## Required Context

- Read the consumer `.harness/core-version.yaml` and applicable receipts.
- Read `core-version.yaml`, `core-managed-paths.yaml`, and the complete changelog chain.
- Confirm the target vault path, branch, worktree state, and approval boundary.

## Workflow

1. Validate the requested contiguous release chain.
2. Produce a dry-run with `plan-harness-update.mjs`; raw Git diffs do not add operations.
3. Detect local overrides from the expected prior version hashes.
4. Stop for explicit approval before any deletion, migration, or override decision.
5. Apply only planned operations, regenerate only declared outputs, and run declared target checks.
6. Write version metadata and an update receipt on success; preserve the prior version on failed application.

## Writes

- Declared managed target paths.
- `.harness/core-version.yaml` and `.harness/update-receipts/`.

## Approval Gates

- `delete`, `migrate`, and override resolution require explicit user approval.
- A locally modified managed file is skipped and reported; it is not silently merged or replaced.

## Verification

- Release chain and managed paths validate.
- Planned operations match only declared changelog entries.
- Target checks pass and the receipt lists operations, skips, confirmations, and status.

## Return Format

- **Done**
- **Evidence**
- **Open Items**
- **Next**

## Related Roles

- `developer`
- `verifier`
