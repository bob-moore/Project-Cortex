# Verification and Rollback

## Verification ladder

Use the highest applicable layers:

1. **Stored state:** read the changed post, option, menu, pattern, user, plugin, or table record.
2. **Adapter read-back:** query through REST, WP-CLI, MCP, or plugin API independently from the write response.
3. **Rendered HTTP:** confirm status, text, redirect, canonical, or endpoint behavior.
4. **Browser:** check visual layout, interaction, console/network, responsive state, and accessibility.
5. **Collateral:** sample shared placements, templates, routes, forms, caches, and integrations affected by the changed object.

Use rendered/browser verification and `accessibility-foundation` for the browser and user-visible gate. If a `web-quality-verification` skill is later imported, use it for that gate.

## Rollback by operation

- Content/page: revision, captured raw content, status change, or trash restore.
- Media: prior attachment ID/file and known placements.
- Setting/option: captured previous value.
- Pattern/navigation/template: exported raw entity or revision if supported.
- Plugin/theme state: prior active/version state plus backup when hooks may mutate data.
- Database/migration: verified pre-operation export/snapshot.
- Redirects: exported redirect set and test sample.

A rollback plan is not valid until the recovery artifact or prior value is known to exist.

## Failure response

If verification fails:

1. Stop additional mutations.
2. Determine whether the current state is safe to leave in place.
3. Roll back when the failure is consequential and rollback is authorized.
4. Preserve evidence of the failed state when safe.
5. Report exact failure, current state, rollback result, and required next owner.

Never label a task verified when only stored state or only a tool response was checked.
