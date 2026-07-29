---
description: WordPress operation modes and boundaries for mutable site-state work.
tags:
  - harness
  - discipline
  - wordpress
  - operations
---

# WordPress Operations Modes

## Universal Inputs

Resolve before mutation:

- client and project
- `Clients/<Client>/<Client> Stack.md`
- exact site, environment, URL, and access adapter
- current user/capability where relevant
- approved copy, design, accessibility, SEO, or strategy artifact when it
  constrains the change
- target object or setting
- approval class and rollback path

If target identity or environment cannot be proven, stop before mutation.

## Modes

| Mode | Owns | Typical Output | Quality Emphasis |
|---|---|---|---|
| `content` | Pages, posts, media, taxonomies, metadata, statuses, slugs. | Object IDs, URLs, before-state, stored and rendered checks. | Approved content only, reversible change, no adjacent cleanup. |
| `site-building` | Gutenberg layouts, existing blocks, patterns, navigation, templates, Global Styles. | Updated site state plus shared-surface checks. | Existing capabilities, serialization safety, collateral awareness. |
| `configuration` | Forms, SEO metadata, redirects, integrations, plugin options. | Setting IDs/values and functional tests. | Blast radius, rollback value, user-visible verification. |
| `administration` | Users, roles, plugins, themes, options, cron, cache, health. | Readback, health result, rollback, approval evidence. | Explicit approval for consequential/production actions. |
| `migration` | Database/media/site movement, WP Migrate DB Pro, import/export. | Backup/export, dry-run where possible, post-migration checks. | No wrong-environment writes, recoverability first. |
| `mcp-operation` | Novamira, Block MCP, Easy MCP AI, REST-backed MCP, project helpers. | Access method, read-only proof, mutation evidence, independent verification. | MCP availability is scoped and runtime-dependent. |

## Boundaries

WordPress Operator owns mutable WordPress state regardless of whether the tool is
wp-admin, browser automation, REST, WP-CLI, MCP, Novamira, or a project helper.

Developer owns repository code: PHP, JavaScript, CSS, block/theme/plugin source,
repository-owned `theme.json`, tests, build tooling, and Astro source.

Use `accessibility-foundation` when an operation affects rendered UX,
navigation, forms, interaction, or content semantics. Accessibility findings
can route to Designer, Developer, Writer, or WordPress Operator depending on
the source of truth for the fix.
