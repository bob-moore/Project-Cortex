---
description: Platform-specific development import map for Astro and WordPress code work.
tags:
  - harness
  - discipline
  - development
  - platforms
---

# Development Platforms

This file maps platform-specific development imports now copied into the
project-local skill registry. The discipline contract and `skill-map.json` are
the active registry.

## Astro

Source:

- `/Users/bobmoore/.agents/skills/astro/SKILL.md`

Recommended target:

- `.agents/skills/astro/SKILL.md`

Disposition:

- Imported active on 2026-07-29.
- Keep as a Developer platform skill.
- Prefer repository-local `package.json`, Astro config, adapter config,
  integration setup, content collections, and scripts over generic examples.
- Check official Astro documentation when API, adapter, integration, or deploy
  behavior may have changed.

Initial scope:

- `.astro` components and pages
- layouts and content collections
- static/SSR configuration
- adapters and integrations
- build, check, preview, and deploy config

Non-goals:

- Do not make Astro content or copy decisions that belong to Writer,
  Strategist, or Designer.
- Do not add integrations or dependencies without the repository policy and
  approval boundary.

## WordPress Code Development

WordPress code development belongs to Developer when the source of truth is
version-controlled code or repository-owned configuration.

### First Import Group

| Source skill | Dependencies observed | Target status |
|---|---|---|
| `wordpress-router` | `references/decision-tree.md` | Imported active. |
| `wp-project-triage` | `scripts/detect_wp_project.mjs`, `references/triage.schema.json` | Imported active; runnable detector preserved. |
| `wp-block-development` | references plus `scripts/list_blocks.mjs` | Imported active. |
| `wp-block-themes` | references plus `scripts/detect_block_themes.mjs` | Imported active. |
| `wp-plugin-development` | references plus `scripts/detect_plugins.mjs` | Imported active. |
| `wp-rest-api` | references only | Imported active. |
| `wp-interactivity-api` | references only | Imported active. |
| `wp-phpstan` | references plus `scripts/phpstan_inspect.mjs` | Imported active. |

### Later Specialist Group

- `wp-abilities-api`, `wp-abilities-audit`, and `wp-abilities-verify` are
  imported active for Abilities API source work.
- `wp-playground`, `wp-plugin-directory-guidelines`, and `wpds` are imported
  active as specialists.
- `wp-performance` is imported under WordPress Operations because its current
  source skill is backend/operational measurement oriented. Developer may use
  its findings as evidence for code remediation.

## WordPress Code Boundary

Developer owns:

- theme/plugin/block source
- block themes and repository-owned `theme.json`
- PHP, JavaScript, CSS, build tooling
- custom REST routes/controllers
- Interactivity API source
- Abilities API source registration
- static analysis configuration
- version-controlled tests and scripts

WordPress Operator owns:

- pages, posts, media, taxonomies, metadata
- Gutenberg page composition using existing blocks
- Site Editor templates when stored as site state
- navigation, synced patterns, Global Styles
- plugin settings, forms, redirects, users, options
- database, migrations, maintenance, WPRemote operations

Hybrid sequence:

1. Developer implements and verifies code capability.
2. Deployment or availability is approved and completed by the appropriate
   workflow.
3. WordPress Operator configures mutable site state using the available
   capability.
4. Parent workflow or Verifier checks the final rendered result.

## Import Requirements

Activation hygiene completed for this import:

- copy or adapt all directly referenced `references/` files
- copy or adapt required scripts under the skill or `.agents/tools/`
- remove global-path assumptions
- keep repository-local instructions and project scripts higher authority than
  generic platform examples
- validate with the full harness gate and a frontmatter check

## Open Decisions

- Whether WordPress triage detector scripts should live inside
  `.agents/skills/wp-project-triage/scripts/` or a shared
  `.agents/tools/wordpress/` registry.
- Whether Astro needs only a compact project-local skill or a broader platform
  discipline later.
- Whether Cloudflare belongs under Development platform work or a separate
  operations/deployment discipline.
