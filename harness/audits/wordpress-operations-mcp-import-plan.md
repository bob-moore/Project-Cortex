---
description: "Import plan for WordPress operations and MCP usage as distinct from code development."
tags:
  - harness
  - audit
  - wordpress
  - mcp
  - operations
status: implemented
created: 2026-07-29
---

# WordPress Operations And MCP Import Plan

## Scope

Plan the WordPress operation and MCP usage layer as distinct from the
Development discipline.

This track covers mutable WordPress state and live-site operation:

- pages, posts, media, taxonomies, metadata
- Gutenberg page composition using existing blocks
- Site Editor templates when stored in WordPress state
- navigation, synced patterns, Global Styles
- plugin settings, forms, redirects, users, options, cron
- database, migrations, maintenance, health, WPRemote, backups
- MCP, REST, WP-CLI, browser, Novamira, WPRemote, and project helper usage

This track does not own theme/plugin/block source code, Astro code, repository
build tooling, or version-controlled implementation. Those route to Developer.

## Current Canonical Baseline

Existing role:

- `.agents/roles/wordpress-operator/`
- `.agents/skills/role-wordpress-operator/`

Global source material:

- `/Users/bobmoore/.agents/skills/wordpress-operator`
- `/Users/bobmoore/.agents/skills/wordpress-site-operations`
- `/Users/bobmoore/.agents/skills/wp-wpcli-and-ops`
- `/Users/bobmoore/.agents/skills/wp-redirection`
- `/Users/bobmoore/.agents/skills/wp-migratedb-pro`
- `/Users/bobmoore/.agents/skills/wpremote-api` was referenced in prior plans
  but was not present in the readable global `.agents/skills` directory during
  the 2026-07-29 import
- `/Users/bobmoore/.agents/skills/wordpress-block-theming`

Imported project-local skills on 2026-07-29:

- `.agents/skills/wordpress-operator/`
- `.agents/skills/wordpress-site-operations/`
- `.agents/skills/wp-wpcli-and-ops/`
- `.agents/skills/wp-redirection/`
- `.agents/skills/wp-migratedb-pro/`
- `.agents/skills/wp-performance/`
- `.agents/skills/novamira-wordpress-mcp-access/`

Observed `wordpress-site-operations` dependencies:

- `references/access-and-targeting.md`
- `references/content-pages-and-media.md`
- `references/gutenberg-and-site-editor.md`
- `references/administration-and-integrations.md`
- `references/novamira.md`
- `references/verification-and-rollback.md`

## Recommended Canonical Shape

Created on 2026-07-29:

- `.agents/disciplines/wordpress-operations/`
- `.agents/skills/wordpress-site-operations/`

Discipline files should follow the established shape:

- `README.md`
- `contract.json`
- `modes.md`
- `rubric.md`
- `skill-map.json`

## Operation Modes

Initial mode map:

| Mode | Notes |
|---|---|
| `content` | Pages, posts, media, taxonomies, metadata, approved copy placement. |
| `site-building` | Gutenberg layouts, existing blocks, templates, navigation, patterns, Global Styles. |
| `configuration` | Forms, SEO settings, redirects, integrations, plugin options. |
| `administration` | Users, roles, plugin/theme activation, options, cron, health, maintenance. |
| `migration` | Database/media/site movement, WP Migrate DB Pro, backup/restore. |
| `fleet-operations` | WPRemote/BlogVault site health, updates, backups, security. |
| `mcp-operation` | MCP-specific reads/writes through Novamira, Block MCP, Easy MCP AI, or other servers. |

## Access And Targeting Rules

Before mutation:

1. Resolve client, site, and environment from `<Client> Stack.md` or verified
   project-local instructions.
2. Identify exact adapter: project wrapper, REST, WP-CLI, MCP, browser,
   WPRemote, Novamira, Block MCP, Easy MCP AI, or other documented route.
3. Run a read-only identity check:
   - `home`
   - `siteurl`
   - WordPress version
   - active theme
   - target object existence
   - current user/capability when relevant
4. Capture before-state and rollback path.
5. Confirm approval class for production, administrative, destructive, bulk, or
   environment-wide actions.

Do not infer environment from a familiar URL, remembered port, shell history, or
MCP server name.

## MCP-Specific Rules

MCP availability is scoped and runtime-dependent.

- Per-site Novamira/WordPress MCP servers should be project-local, not global,
  unless the user explicitly wants global availability.
- A helper command or config file proving setup is not the same as direct
  in-session MCP tool exposure.
- If direct MCP tools are unavailable in the current session, use documented
  project helpers or WP-CLI fallback when safe and report that fallback
  honestly.
- Prove access with a safe read or reversible bounded operation in the target
  environment.
- Report whether the real work used MCP, WP-CLI/helper, REST/API, browser, or
  config-only verification.
- Use the exact known REST endpoint for the target MCP server; do not assume
  every WordPress MCP server uses the same path.

## Adapter Preference

Use the narrowest reliable documented interface:

1. Project wrapper scripts such as `bin/scripts/wp.sh`, Composer scripts, or
   repo-local helpers.
2. Purpose-built REST/Abilities interface with scoped permissions.
3. WP-CLI with explicit target.
4. Novamira or Block MCP when documented for that environment.
5. Browser/wp-admin for UI-only settings or visual editor work.
6. WPRemote for fleet/hosting operations it owns.

The interface does not determine role ownership. A WP-CLI, MCP, REST, or PHP
call that changes WordPress database-backed state remains a WordPress
operation.

## Verification And Rollback

Verification ladder:

1. Stored state read-back.
2. Adapter read-back through REST, WP-CLI, MCP, or plugin API.
3. Rendered HTTP output.
4. Browser behavior when visible or interactive.
5. Collateral surfaces for shared objects, templates, patterns, menus, forms,
   caches, or integrations.

Rollback must be concrete:

- content/page: revision, captured raw content, status change, or trash restore
- media: prior attachment ID/file and known placements
- option/setting: captured previous value
- pattern/navigation/template: exported raw entity or revision
- plugin/theme state: prior active/version state plus backup when hooks may
  mutate data
- database/migration: verified export/snapshot
- redirects: exported redirect set and test sample

Do not call rollback valid until the recovery artifact or prior value is known
to exist.

## Import Order

1. Completed: imported `wordpress-site-operations` into
   `.agents/skills/wordpress-site-operations/`.
2. Completed: created `.agents/disciplines/wordpress-operations/`.
3. Completed: updated `.agents/roles/wordpress-operator/` with stronger
   operation and MCP boundaries.
4. Completed: imported available specialists:
   `wp-wpcli-and-ops`, `wp-redirection`, `wp-migratedb-pro`,
   `wp-performance`, and `novamira-wordpress-mcp-access`.
5. Deferred: add workflow adapters only after role/discipline contracts are
   stable.

## Open Decisions

- Whether WordPress operations workflows should be added now or wait for the
  next recurring operation task.
- Whether Novamira/Block MCP/Easy MCP AI should become separate skills or
  references under `wordpress-site-operations`.
- Whether WPRemote belongs in WordPress operations or a broader platform
  operations discipline, once a `wpremote-api` source skill is available.
- How to represent project-local MCP setup without storing secrets or implying
  all sites are globally available.

## Related

- [[harness/audits/development-skill-import-plan|Development Skill Import Plan]]
- [[harness/skills|Skills]]
- [[harness/manual|Harness Manual]]
