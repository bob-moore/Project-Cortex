---
description: Canonical WordPress operations discipline for mutable site state, MCP, WP-CLI, REST, browser, Novamira, and related adapters.
tags:
  - harness
  - discipline
  - wordpress
  - operations
---

# WordPress Operations Discipline

This directory is the canonical discipline layer for mutable WordPress site
state and site-operation work.

WordPress Operations is not WordPress code development. It governs pages, posts,
media, Gutenberg and Site Editor state, navigation, settings, forms, redirects,
users, options, database-backed configuration, maintenance, migrations,
Novamira/MCP usage, WP-CLI operation, REST/API operation, browser operation, and
other stateful WordPress work.

Developer owns version-controlled source changes. WordPress Operator owns
bounded site-state changes with explicit environment targeting, before-state,
rollback, and rendered verification.

## Files

- `contract.json`: machine-readable discipline contract.
- `modes.md`: operation modes and ownership boundaries.
- `skill-map.json`: disposition of imported WordPress operation skills.
- `rubric.md`: canonical WordPress operations quality gate.

## Current Canonical Skills

- `wordpress-operator`
- `wordpress-site-operations`
- `wp-wpcli-and-ops`
- `wp-redirection`
- `wp-migratedb-pro`
- `wp-performance`
- `novamira-wordpress-mcp-access`

`wpremote-api` was referenced by source material but was not present in the
global skill directory during the 2026-07-29 import.
