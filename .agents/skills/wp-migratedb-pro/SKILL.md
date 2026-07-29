---
name: wp-migratedb-pro
description: "Use when pushing or pulling a WordPress database (and optionally media/theme/plugin files) between two environments — local, staging, production — via the WP Migrate DB Pro CLI Addon (`wp migratedb push|pull|profile|export|find-replace|setting`). Covers direction safety, find/replace, saved migration profiles, and multisite subsite migrations."
---

# WP Migrate DB Pro (CLI Addon)

## When to use

Use this skill for any scripted or repeatable database migration between two WordPress installs using WP Migrate DB Pro's CLI Addon, including:

- Local ↔ staging ↔ production database push/pull
- Migrating with a custom find/replace beyond the default URL/path swap
- Migrating a subset of tables or post types
- Migrating media files and/or theme/plugin files alongside the database (addon-dependent)
- Running a previously-saved migration profile as a single repeatable command
- Multisite subsite-to-subsite or subsite-to-single-site migrations

## Inputs required

- **Direction**: `push` (send *from* the machine you're running the command on *to* the remote) vs `pull` (bring the remote *into* the machine you're running on). Getting this backwards overwrites the wrong database — this is the single highest-risk mistake with this tool. Always state source and destination explicitly before running anything.
- The remote site's URL (including basic auth credentials if required, and any subdirectory path) and its **secret key** (Tools → Migrate DB Pro → CLI tab, or `wp migratedb setting get connection-key` run on the remote).
- Whether media, theme files, or plugin files should move too, and whether the relevant addons are installed on both ends.
- Backup preference for the destination before the migration overwrites it.
- Any find/replace pairs needed beyond the default (URL + root file path swap).

## Procedure

### 0) Guardrails: direction mistakes are destructive and asymmetric

A `push` run against the wrong `<url>`, or a `pull` run when you meant `push`, overwrites a real database with stale or wrong data — there's no in-place undo beyond restoring a backup. Before any push/pull:

1. Confirm **which machine you're running the command from** — that's the local side of push/pull. `push` sends this site's DB *to* `<url>`; `pull` brings `<url>`'s DB *into* this site.
2. Confirm the `<url>` argument is the environment you actually intend (double-check for a stray production URL left over from a previous command in shell history).
3. Always pass `--backup=` on a real migration — `--backup=prefix` at minimum — so the destination's pre-migration state is recoverable.
4. Never run an unscoped push against production without an explicit, current confirmation of intent — treat it the same as `wp db import` in the wp-wpcli-and-ops skill's safety rules.

Read: `references/safety.md`

### 1) Inspect / confirm connectivity (deterministic)

Run the inspector before any push/pull to confirm WP-CLI, the `migratedb` command, and this site's own identity (so you know which side of push/pull you're standing on):

- `node <skill-root>/scripts/migratedb_inspect.mjs --path=<path> [--url=<url>]`

If the `migratedb` command isn't available, the CLI Addon isn't active on this install (or WP Migrate DB Pro itself isn't installed) — confirm setup before proceeding rather than debugging a missing command.

### 2) Choose the right workflow

#### A) Standard push/pull with default find/replace

Covers the common case — URL and root path get swapped automatically between environments.

```
wp migratedb pull http://example.com [secret-key] \
  --find=//example.com,/path/to/example.com \
  --replace=//example.dev,/path/to/example.dev \
  --skip-replace-guids \
  --backup=prefix
```

If `--find`/`--replace` are omitted, WP Migrate DB Pro performs its own default URL + root-path replacement — explicit find/replace is only needed for additional pairs beyond that default, or to override it.

#### B) Scoped migration (specific tables / excluded post types)

Use `--include-tables=` to migrate only specific tables (e.g. skip stats/log tables), or `--exclude-post-types=` to skip large post types you don't need on the destination.

#### C) Media / theme / plugin files

Requires the Media Files Addon (`--media=all|since-date`, `--media-date=`) and/or Theme & Plugin Files Addon (`--theme-files=`, `--plugin-files=`, `--exclude-theme-plugin-files=`). These silently do nothing useful if the required addon isn't installed — confirm addon presence, don't assume the flag alone is enough.

#### D) Saved migration profiles

Build once via the UI (Tools → Migrate DB Pro → configure push/pull → "Save Profile"), then run repeatably from the CLI:

```
wp migratedb profile "pull-staging"
```

(`wp migratedb migrate <name>` is an alias of `profile`.) Find the profile ID/name in the same UI screen if referencing by ID instead of name.

#### E) Multisite subsites

`--subsite=`, `--subsite-source=`/`--subsite-destination=` (Multisite Tools Addon required) — push/pull a single subsite rather than the whole network.

#### F) Settings

`wp migratedb setting get|update <name> [<value>]` where `<name>` is one of `push`, `pull`, `connection-key`, `license`. Use this to:
- Check or toggle whether an install accepts incoming push/pull (`push`/`pull` settings) before attempting a migration against it.
- Read the connection secret key to use in a push/pull command run from elsewhere: `wp migratedb setting get connection-key`. The key itself can only be **reset** via the UI, not set via CLI.
- License activation is per-user: `wp migratedb setting update license <key> --user=<id>`.

Read: `references/push-pull-reference.md` for the full flag reference and worked examples.

## Verification

- Re-run the inspector on the destination afterward — confirm `siteurl`/`home` reflect the destination's own URL (not the source's, if find/replace was supposed to handle that), and that the `migratedb` command still reports cleanly.
- Spot-check a handful of pages/posts on the destination, especially ones using **ACF fields, Gravity Forms entries, or any serialized/JSON custom fields** — these are the first things to break from an incautious custom find/replace, since a naive string replace can corrupt PHP-serialized data length prefixes.
- If `--preserve-active-plugins` was intended, confirm the destination's active plugin list wasn't overwritten by the source's.
- Confirm the destination backup (if `--backup=` was used) actually landed where expected, in case a rollback is needed.

## Failure modes / debugging

- **Wrong direction (push when you meant pull, or vice versa).** No CLI-level guard against this — the only defense is confirming source/destination explicitly before running. If this happens, restore from the pre-migration `--backup=`.
- **Connection/secret key errors.** "There was a problem connecting" usually means the secret key doesn't match the target, the CLI Addon isn't active on one side, or the `<url>` is missing required basic-auth credentials or a WordPress subdirectory path.
- **Custom find/replace breaks serialized data.** Prefer the default replace pairs; if adding custom `--find=`/`--replace=` pairs, keep them to simple full-string swaps (not partial substrings inside values that might also be serialized array data) and verify on staging first.
- **Media/theme/plugin flags appear to do nothing.** The relevant addon (Media Files / Theme & Plugin Files / Multisite Tools) isn't installed on one or both ends — check `wp plugin list` for the addon before assuming the flag is broken.
- **Table prefix mismatch.** `--include-tables=` assumes both sites share the same table prefix convention; if they don't, confirm actual table names first (`wp db tables`) rather than guessing.

## Escalation

- If it's not clear which environment is safe to overwrite (e.g. mid-launch, ambiguous whether "staging" is actually still receiving real traffic), stop and confirm explicitly before running any push/pull — don't infer from a URL naming convention alone.
- If the CLI Addon or secret key isn't yet configured on one side (common during initial client setup), that's a setup blocker, not a migration-flag problem — confirm `wp migratedb setting get connection-key` succeeds on both installs before troubleshooting migration syntax.

## Related

- `references/push-pull-reference.md` — full push/pull flag reference and worked examples
- `references/safety.md` — direction discipline, backup requirements
- [WP Migrate DB Pro CLI docs](https://deliciousbrains.com/wp-migrate-db-pro/docs/cli/) (source of truth if plugin version has moved past what's captured here)
