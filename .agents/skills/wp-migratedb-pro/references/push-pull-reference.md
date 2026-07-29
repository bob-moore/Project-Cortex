# `wp migratedb push|pull` — full reference

Source: https://deliciousbrains.com/wp-migrate-db-pro/doc/cli-push-pull-subcommand/ (confirmed current at skill-authoring time; re-check if command errors on an unrecognized flag, since addon versions do add flags over time).

`migrate` is an alias for the legacy `migratedb` command name (WP Migrate DB Pro 2.3+); both work identically — prefer `wp migrate` going forward per the vendor's own docs, but `wp migratedb` remains valid.

## Syntax

```
wp migratedb <push|pull> <url> <secret-key>
  [--find=<strings>] [--replace=<strings>]
  [--regex-find=<strings>] [--regex-replace=<strings>]
  [--case-sensitive-find=<strings>] [--case-sensitive-replace=<strings>]
  [--include-tables=<tables>] [--exclude-database]
  [--exclude-post-types=<post-types>] [--skip-replace-guids] [--exclude-spam]
  [--preserve-active-plugins] [--include-transients]
  [--backup=<prefix|selected|table_one,table_two,table_etc>]
  [--media=<all|since-date>] [--media-date=<yyyy-mm-dd>]
  [--media-subsites=<blog-id|subsite-url>]
  [--subsite=<blog-id|subsite-url>]
  [--subsite-source=<blog-id|subsite-url>] [--subsite-destination=<blog-id|subsite-url>]
  [--theme-files=<all|theme-one,theme-two,...>] [--plugin-files=<all|plugin-one,...>]
  [--exclude-theme-plugin-files=<string>]
```

## Core arguments

- `<url>` — the **remote** site's URL. Include URL-encoded basic-auth credentials if required (`http://user:pass@example.com`). Must include the WordPress subdirectory if applicable (`http://example.com/wp`).
- `<secret-key>` — the remote site's connection secret key (Tools → Migrate DB Pro → CLI tab on that install, or `wp migratedb setting get connection-key` run there).

## Find & replace

- `--find=` / `--replace=` — comma-separated string pairs, position-matched (Nth find ↔ Nth replace). If omitted entirely, WP Migrate DB Pro performs its own default: URL strings and root file paths referencing the source get replaced with the destination's equivalents. Only specify these explicitly for *additional* pairs or to override the default.
- `--regex-find=` / `--regex-replace=` — regex pattern pairs; replace strings may use `$n` backreferences.
- `--case-sensitive-find=` / `--case-sensitive-replace=` — case-sensitive variant of the plain find/replace.
- `--skip-replace-guids` — skip find/replace on the `wp_posts.guid` column (commonly used since GUIDs are meant to be permanent identifiers, not rewritten on migration).

## Scope control

- `--include-tables=` — comma-separated table list; omit to migrate every table with the install's prefix (e.g. `wp_`).
- `--exclude-database` — skip table/database migration entirely (e.g. when only migrating media/theme/plugin files).
- `--exclude-post-types=` — comma-separated post types to skip.
- `--exclude-spam` — exclude spam comments.
- `--preserve-active-plugins` — keep the destination's own `active_plugins` option rather than overwriting with the source's.
- `--include-transients` — include transient (temporary cache) data, normally excluded.

## Backup

- `--backup=prefix` — back up destination tables sharing the install's table prefix.
- `--backup=selected` — back up only the tables selected via `--include-tables`.
- `--backup=table_one,table_two,...` — explicit table list.

## Media (Media Files Addon required)

- `--media=all` — push/pull all media.
- `--media=since-date` with `--media-date=yyyy-mm-dd` — only media added since that date.
- `--media-subsites=` — multisite only; comma-separated blog ID/URL list to scope which subsites' media transfers.

## Theme & plugin files (Theme & Plugin Files Addon required)

- `--theme-files=all` or a comma-separated theme slug list (see `wp theme list`).
- `--plugin-files=all` or a comma-separated plugin slug list (see `wp plugin list`).
- `--exclude-theme-plugin-files=` — comma-separated files/folders to exclude from the file migration.

## Multisite (Multisite Tools Addon required for subsite flags)

- `--subsite=` — push the given local subsite to a remote **single-site** install.
- `--subsite-source=` / `--subsite-destination=` — push a given subsite to a specific subsite on the other end (used together).

## Worked examples

Pull from production to local dev, standard find/replace, skip GUID replacement, backup local tables first, pull all media:

```
wp migratedb pull http://example.com [secret-key] \
  --find=//example.com,/path/to/example.com \
  --replace=//example.dev,/path/to/example.dev \
  --skip-replace-guids \
  --backup=prefix \
  --media=all
```

Push local to production with an extra custom replace pair beyond the default, scoped backup, media since a date:

```
wp migratedb push http://example.com [secret-key] \
  --find=//example.dev,/path/to/example.dev,'the best examples on the internet' \
  --replace=//example.com,/path/to/example.com,'the best examples in the world' \
  --backup=wp_posts,wp_postmeta,custom_table \
  --media=since-date --media-date=2021-01-01
```

Pull, table-scoped, all media:

```
wp migratedb pull http://example.com [secret-key] \
  --find=//example.com,/path/to/example.com \
  --replace=//example.dev,/path/to/example.dev \
  --include-tables=wp_posts,wp_postmeta \
  --media=all
```

Pull with full media + all theme/plugin files:

```
wp migratedb pull http://example.com [secret-key] \
  --find=//example.com,/path/to/example.com \
  --replace=//example.dev,/path/to/example.dev \
  --media=all --theme-files=all --plugin-files=all
```
