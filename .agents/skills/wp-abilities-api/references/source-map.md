# Source Map: WordPress Abilities API

## Scope

The `wordpress/abilities-api` package: registration, discovery, execution, and
REST exposure of abilities. Supports guidance in `../SKILL.md` and the
adjacent references. This map is refresh-time evidence, not normal coding
context.

## Official sources

- Repository and docs: <https://github.com/WordPress/abilities-api>
- PHP API reference: <https://github.com/WordPress/abilities-api/blob/trunk/docs/php-api.md>

## Context7 library ID

`/wordpress/abilities-api` (trust score 9.1). Proven 2026-08-01: a topic query
for "register ability" returned the correct `wp_register_ability()` signature
and a working usage example matching the canonical repo docs. See
[[2026-08-01-context7-pilot|Context7 Pilot]].

## Repository/version evidence required

Before applying version-sensitive advice, confirm the target repository's
installed Abilities API package/plugin version and any project-specific
registration conventions. Do not infer availability from this map alone —
the Abilities API is still an actively evolving package.

## Last checked

2026-08-01. Official repository docs and Context7 resolution were checked; no
target repository/version was in scope.

## Stable guidance

- Abilities are registered via `wp_register_ability( $name, $args )`, typically
  hooked into `wp_abilities_api_init`.
- Repository-declared registration patterns (see `php-registration.md` in this
  skill) outrank generic examples when they conflict.

## Known gotchas

- The package is young and evolving quickly; confirm the installed version
  before relying on a specific function signature or argument shape.
- REST exposure and permission callbacks are separate concerns from
  registration — verify both independently.

## Verification

Use the repository's declared test/lint commands. Confirm ability registration
with a direct read (e.g. `wp_get_ability()` or REST discovery) rather than
assuming registration succeeded.

## Refresh triggers

- Installed Abilities API version differs from documented guidance.
- A registration/execution/REST API surface changes.
- Implementation or tests reveal a signature or behavior mismatch.
