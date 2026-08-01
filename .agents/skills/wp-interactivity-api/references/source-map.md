# Source Map: WordPress Interactivity API

## Scope

The `@wordpress/interactivity` runtime (stores, directives, server-side
rendering) that ships from the Gutenberg repository. Supports guidance in
`../SKILL.md` and the adjacent references. This map is refresh-time evidence,
not normal coding context.

## Official sources

- Interactivity API reference: <https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/>
- Gutenberg repository docs: <https://github.com/WordPress/gutenberg/tree/trunk/docs/reference-guides/interactivity-api>
- Directives reference: <https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/api-reference/>

## Context7 library ID

`/wordpress/gutenberg` (trust score 9). Proven 2026-08-01: a topic query for
"interactivity api store" returned correct `store()`/state/actions examples
matching the official Interactivity API docs. There is no dedicated
Interactivity-only Context7 library — Gutenberg is the right source since the
package ships from that repo. See
[[2026-08-01-context7-pilot|Context7 Pilot]].

## Repository/version evidence required

Before applying version-sensitive advice, confirm the target repository's
WordPress core version and `@wordpress/interactivity` package version (block
themes bundle it from core; some setups pin an npm version). Do not infer
directive/store behavior from this map alone.

## Last checked

2026-08-01. Official docs and Context7 resolution were checked; no target
repository/version was in scope.

## Stable guidance

- Client state/actions are defined via `store()`; server-side rendering uses
  the matching PHP-side directive/data conventions (see
  `server-side-rendering.md` in this skill).
- Directive syntax (see `directives-quickref.md`) outranks generic examples
  when versions diverge.

## Known gotchas

- The Interactivity API has evolved directive names and store semantics across
  WordPress core versions; confirm the installed core version before relying
  on a specific directive.
- Server-side rendered state and client-hydrated state are separate concerns —
  verify both independently, not just a successful client mount.

## Verification

Use the repository's declared build/test commands. Confirm interactivity
behavior with a rendered check (state updates, directive bindings) rather than
a successful build alone.

## Refresh triggers

- Installed WordPress core or `@wordpress/interactivity` version differs from
  documented guidance.
- A directive or store API changes.
- Implementation or tests reveal a directive/behavior mismatch.
