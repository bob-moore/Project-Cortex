# Import / Export formats and settings (Redirection plugin)

## WP-CLI subcommands

Redirection ships exactly five WP-CLI subcommands (confirmed at https://redirection.me/developer/wp-cli/):

- `wp redirection import <filename> --format=<format>` — import from a file
- `wp redirection export <module> <filename> --format=<format>` — export to a file
- `wp redirection database <action>` — install / remove / upgrade the plugin's DB tables
- `wp redirection setting <name>` (read) / `wp redirection setting <name> --set=<value>` (write)
- `wp redirection plugin <name> [--group=ID]` — import from another redirect plugin

All support single-site and multisite via the usual WP-CLI `--url=` targeting.

## Import formats (`--format=`)

| Format | Notes |
|---|---|
| `csv` | Simplest format. Columns: `source URL, target URL[, regex, http code]`. `regex` is `0` or `1`. Everything imports as "URL only" matches — CSV can't carry group/title/stat detail. Buildable in Excel/Sheets. |
| `json` | Redirection's native format — the only one that round-trips full detail (groups, regex flags, titles). Use this for copying a redirect set between two Redirection installs. |
| `apache` | Import from an Apache `.htaccess`-style redirect block (e.g. migrating off a legacy PHP site that used `.htaccess` redirects). |

## Export formats (`--format=`)

Same three plus `nginx` (export only, for handing redirect rules to ops/hosting if the site sits behind Nginx rather than Apache).

`<module>` for export is one of: `all`, `wordpress`, `apache`, `nginx` — i.e. which underlying redirect *engine's* rules to export, not a redirect group. For a full backup/copy, use `all`.

## `wp redirection plugin <name>` — supported source plugins

- `wp-simple-redirect`
- `seo-redirection`
- `safe-redirect-manager`
- `wordpress-old-slugs` (WordPress's own automatic old-slug redirects)
- `rank-math`
- `quick-redirects`

Optional `--group=ID` places the imported redirects into a specific group; omitted, they land in the first group.

## Settings

`wp redirection setting <name>` reads a setting; `--set=[value]` writes one (JSON-encode non-string/number values). Setting names correspond to the plugin's REST API settings list (`redirection.me/developer/rest-api/#api-Settings-GetSettings`, JS-rendered — check current value with a plain `get` first rather than assuming a name, since this wasn't confirmed against a live list at skill-authoring time).

## CSV format caution

The documented CSV shape (`source,target,regex,code`) is what's cited in the plugin's own support docs, but always **round-trip a small export from the target site first** (`wp redirection export all sample.csv --format=csv`) to confirm the exact column order/header expected by the installed plugin version before hand-building or generating a large CSV — minor version differences in optional columns are the most common cause of a "successful" import that doesn't do what you expected.
