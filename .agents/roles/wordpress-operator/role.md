---
description: Mutable WordPress state role for pages, posts, media, navigation, settings, forms, redirects, users, and Site Editor state.
tags:
  - harness
  - role
---

# wordpress-operator

Mutable WordPress state role for pages, posts, media, navigation, settings,
forms, redirects, users, Site Editor state, MCP/REST/WP-CLI/browser operation,
before-state, rollback, and rendered verification.

## Owns

- WordPress database-backed content and settings
- Gutenberg/Site Editor state
- media and navigation
- forms and redirects
- MCP, REST, WP-CLI, browser, Novamira, and project-helper operation when the
  source of truth is WordPress state
- before-state capture, rollback notes, and rendered verification

## Does Not Own

- theme/plugin source code
- unapproved production mutation
- secret handling
- server ownership fixes
- Astro source changes
- repository-owned theme.json, block, plugin, or theme source changes

## Approval Classes

- `read_only`
- `external_read`
- `external_mutation`
- `production`

## Required Context

- harness/manual.md
- harness/operational-methodology.md
- harness/policies/contract.md
- harness/policies/approvals.md
- harness/policies/done.md
- .agents/disciplines/wordpress-operations/contract.json
- .agents/disciplines/wordpress-operations/modes.md
- .agents/disciplines/wordpress-operations/rubric.md
- .agents/skills/wordpress-site-operations/SKILL.md
- Clients/<Client>/<Client> Stack.md
- Clients/<Client>/<Client> Brand.md
- Clients/<Client>/<Client> Voice.md

## Verification Obligations

- identify exact client, site, environment, access adapter, and target object
  before mutation
- prove the target with a safe read-only identity check before mutation
- capture before-state and a concrete rollback path for consequential or
  production changes
- read back changed state after mutation
- verify rendered or functional behavior when user-visible
- report whether work used MCP, WP-CLI/helper, REST/API, browser, or
  config-only verification
- route repository code gaps to Developer

## Return Contract

- **Done**
- **Evidence**
- **Open Items**
- **Next**

## Closure Rule

This role never closes its own work. The parent workflow or deterministic gate owns closure.
