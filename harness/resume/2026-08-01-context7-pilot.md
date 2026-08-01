---
description: Context7 CLI/skill-mode pilot for Developer Role Expansion Slice 4.
tags:
  - harness
  - resume
  - developer-role
  - context7
status: complete
date: 2026-08-01
created: 2026-08-01
---

# Context7 Pilot (Developer Role Expansion Slice 4)

## Outcome

Piloted Context7's public HTTP API (no MCP server, no API key) against all four
pilot tasks from [[developer-role-expansion|Developer Role Expansion]] Slice 4. All
four resolved to accurate, current, sourceable documentation via plain `curl`.
CLI/skill mode is viable without adding an MCP dependency.

## Method

Two endpoints, no auth required for these queries:

- Library search: `GET https://context7.com/api/v1/search?query=<name>`
- Docs by library ID: `GET https://context7.com/api/v1/{library-id}?type=txt&topic=<topic>&tokens=<n>`

## Pilot Results

| Task | Library ID used | Trust score | Result |
|---|---|---|---|
| Astro content collections | `/websites/astro_build_en` | 10 | Correct, current `defineCollection`/loader examples matching official guide. |
| WordPress Abilities API | `/wordpress/abilities-api` | 9.1 | Correct `wp_register_ability()` signature and usage from the canonical repo docs. |
| WordPress Interactivity API | `/wordpress/gutenberg` | 9 | Correct `store()`/state/actions examples from Gutenberg's Interactivity API reference docs. No dedicated Interactivity-only library exists; Gutenberg is the right source since `@wordpress/interactivity` ships from that repo. |
| Cloudflare Workers deploy config | `/websites/developers_cloudflare_workers` | 10 | Correct `wrangler.toml`/`wrangler.jsonc` static-site config and `wrangler deploy` usage matching current Cloudflare docs. |

## Evaluation Against Pilot Criteria

- **Reduces stale API mistakes?** Yes — all four responses matched current
  official docs/repo source, not stale or hallucinated APIs.
- **Returns sourceable links/stable IDs?** Yes — every result carries a source
  URL and a library ID stable enough to commit to a skill's source map.
- **Works across runtimes without MCP fragility?** Yes — plain HTTP `curl`
  works identically in any runtime with network access; no MCP server, no
  stdio wrapper, no API key needed for these lookups.
- **CLI/skill mode covers most use cases before MCP?** Yes for this pilot's
  scope (resolving a library + fetching topic docs). No case required MCP-only
  behavior (e.g. multi-turn tool state).
- **Avoids sending private code?** Yes — queries were library/topic names only,
  no repository code or secrets.
- **Justifies the dependency?** Yes, as a manual/skill-refresh-time tool. Not
  promoted to an always-on MCP dependency — that stays out of scope per the
  roadmap's non-goals.

## Follow-up

- Committed Context7 library IDs into `astro`'s existing source map (proven
  per its own "unresolved question" gate) and into new source maps for
  `wp-abilities-api` and `wp-interactivity-api`.
- `cloudflare-operations`'s source map still declines to commit a library ID —
  its pilot query above was a generic Workers-deploy check, not a refresh run
  against that skill's live-operations scope (DNS, routes, zone state), so the
  skill's own commit condition isn't met yet.
- Slice 5 (promote/reject decision) is next: this pilot supports "promote as a
  manual refresh-workflow dependency," not "runtime MCP dependency."
