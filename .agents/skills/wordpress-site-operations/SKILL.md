---
name: wordpress-site-operations
description: "Use when reading or changing mutable WordPress site state: pages, posts, media, Gutenberg layouts, Site Editor templates, navigation, synced patterns, plugin settings, users, options, redirects, migrations, or maintenance. Enforces environment targeting, before-state capture, bounded mutation, rendered verification, rollback, and escalation of code changes to Developer."
---

# WordPress Site Operations

## Overview

Operate WordPress as an application, not as a code repository. The source of truth is mutable site state: database records, media, settings, active configuration, and rendered output. Read before writing, identify the exact environment, preserve a rollback path, and verify beyond the tool response.

Use linked references progressively:

- `references/access-and-targeting.md`
- `references/content-pages-and-media.md`
- `references/gutenberg-and-site-editor.md`
- `references/administration-and-integrations.md`
- `references/novamira.md`
- `references/verification-and-rollback.md`

## When to Use

Use for work a person would perform in wp-admin or through an equivalent API/CLI/MCP interface:

- Pages, posts, media, taxonomies, metadata
- Gutenberg layout and existing blocks
- Site Editor templates, navigation, Global Styles, synced patterns
- Forms, redirects, SEO metadata, plugin configuration
- Users, roles, plugins, themes, options, cron, cache, migrations
- Site health and maintenance operations

Do not use for changing PHP, JavaScript, CSS, `theme.json`, block/plugin/theme source, Astro files, or build configuration. Route code changes to `developer`.

## Quick Start

- "Update this approved copy on staging and verify the rendered page."
- "Build the page using the site's existing blocks and Design Tokens."
- "Configure this plugin without changing its code, preserving a rollback path."

## Skill Contract

**Reads:** client/project identity, `<Client> Stack.md`, Brand/Voice/Design Tokens as applicable, approved content/layout, exact site and environment, access method, acceptance criteria, approval boundary.

**Writes:** bounded WordPress state changes plus a structured operation report.

**Does not:** invent missing copy/design, change repository code, make destructive production changes without explicit approval, or treat an MCP/API/CLI success response as rendered verification.

**Done when:** stored state and rendered behavior match the acceptance criteria; shared/collateral surfaces are checked; rollback is known; changed object identifiers are reported.

**Boundary:** Developer owns code capabilities. Writer owns copy creation. Designer owns visual intent. The WordPress Operator implements approved intent using existing site capabilities.

## Workflow

### 1. Resolve client, site, and environment

1. Read `<Client> Stack.md`; do not infer URLs, ports, repository paths, or Novamira availability.
2. State the exact target: local, staging, or production.
3. Confirm the access adapter: browser, REST, WP-CLI wrapper, Novamira, WPRemote, or documented project tooling.
4. Read current state before any write.

If site identity or environment cannot be proven, stop before mutation. See `references/access-and-targeting.md`.

### 2. Classify the operation

- **Content:** pages, posts, media, taxonomy, metadata
- **Site building:** blocks, patterns, navigation, templates, Global Styles
- **Configuration:** forms, SEO, redirects, integrations, plugin options
- **Administration:** users, roles, plugin/theme lifecycle, database, migration
- **Maintenance:** health, backups, updates, security, performance

Load specialized skills only when relevant:

- `wp-wpcli-and-ops`
- `wp-redirection`
- `wp-migratedb-pro`
- `wpremote-api` only if that skill is present in this vault or explicitly available globally
- `wp-performance`

Complete when operation class, blast radius, and specialized procedure are explicit.

### 3. Decide whether existing capabilities suffice

Inspect available blocks, patterns, templates, plugin features, and settings before requesting code.

If the outcome requires a new block, theme behavior, plugin feature, PHP/JS/CSS change, or repository modification:

1. Report the capability gap.
2. Route the code stage to Developer.
3. Resume WordPress configuration after code is implemented and available in the target environment.

Do not hide missing capability with brittle HTML, arbitrary Custom HTML, direct database hacks, or duplicated content.

### 4. Assess risk and approval

Risk tiers:

- **Routine:** bounded content/media/taxonomy updates; explicitly requested staging site building.
- **Consequential:** shared patterns, navigation, templates, Global Styles, forms, redirects, broad plugin settings.
- **Administrative:** users/roles, plugin/theme activation, database migration, URL changes, production infrastructure.
- **Destructive:** permanent delete, restore, overwrite, deactivation with side effects, bulk mutation.

Production administrative/destructive actions require explicit approval and a verified rollback path. A specific production content-edit request authorizes only that bounded edit.

### 5. Capture before-state

Capture enough evidence to detect and reverse the change:

- Object ID, type, slug, status, modified time
- Current raw content or exported record
- Option/plugin setting value
- Menu/pattern/template identifiers
- Screenshot or rendered text for visible work
- Backup/export for high-risk operations

Never print or persist credentials in reports.

### 6. Make the smallest safe mutation

Prefer stable, documented interfaces and project wrappers. Preserve block serialization and existing IDs where possible. Use draft/trash before permanent deletion unless deletion is explicitly required. Avoid unrelated normalization or formatting.

Read the applicable reference before changing content, Gutenberg/Site Editor state, administration, or Novamira-managed state.

### 7. Verify in layers

1. Stored object or option state
2. API/CLI/MCP read-back
3. Rendered HTTP output
4. Browser behavior and visuals where applicable
5. Shared/collateral surfaces

Use `web-quality-verification` plus `accessibility-foundation` for browser, responsive, accessibility, console, links, or form checks. See `references/verification-and-rollback.md`.

### 8. Return evidence

Return:

- Status: `verified`, `implemented-not-verified`, `blocked`, or `rolled-back`
- Site and environment
- Access method
- Before-state captured
- Objects/settings changed, including IDs and URLs
- Rendered and functional checks
- Rollback method
- Remaining uncertainty
- Candidate project/Stack updates

The parent orchestrator closes the broader task.

## Common Pitfalls

1. **Routing by tool.** A PHP snippet, REST call, or WP-CLI command that changes `wp_posts` is still a WordPress operation.
2. **Wrong environment.** A familiar domain or shell history is not proof of target.
3. **Tool-response success.** Read back state and verify rendering.
4. **Shared-object collateral.** Synced patterns, navigation, templates, and Global Styles can affect many pages.
5. **Code through content.** Do not use brittle editor markup to avoid a required Developer stage.
6. **Production overreach.** Approval for one content edit is not approval for adjacent cleanup or administration.

## Verification Checklist

- [ ] Client, site, environment, and access adapter confirmed
- [ ] Current state inspected
- [ ] Operation class and risk tier recorded
- [ ] Existing site capability checked before requesting code
- [ ] Before-state and rollback captured
- [ ] Mutation stayed within scope
- [ ] Stored state read back
- [ ] Rendered output verified
- [ ] Shared/collateral surfaces checked
- [ ] Object identifiers, evidence, and uncertainty returned
