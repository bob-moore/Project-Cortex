---
name: wp-redirection
description: "Use when creating, importing, or auditing URL redirects with the Redirection plugin (redirection.me) via WP-CLI: bulk-importing legacy URL maps before a site launch, exporting/copying redirects between environments, migrating from another redirect plugin, or checking existing redirect state before changes."
---

# WP Redirection (Redirection plugin via WP-CLI)

## When to use

Use this skill when the task involves bulk or scripted redirect management with the [Redirection plugin](https://wordpress.org/plugins/redirection/), including:

- Pre-launch migration of legacy URLs to new clean slugs (e.g. `.php` URL structure → new site's permalinks)
- Copying a full redirect set between environments (staging → production)
- Importing redirects from a CSV/spreadsheet source-of-truth (e.g. an agency-maintained "old URL vs new URL" sheet)
- Migrating existing redirects from another redirect plugin into Redirection
- Auditing what redirects currently exist before making changes

Redirection's WP-CLI surface is intentionally narrow — five subcommands: `import`, `export`, `database`, `setting`, `plugin`. There is **no `wp redirection list` or single-redirect `wp redirection add` command.** Anything resembling "list" or "query" has to go through `export` (to a file, then read the file) or the REST API / wp-admin UI. Plan accordingly — see Procedure step 1.

## Inputs required

- Which environment this runs against (dev/staging/production) and whether Redirection is already installed/activated there.
- The source of truth for the redirect mapping (spreadsheet, old site's `.htaccess`, export from another plugin, etc.) and its format.
- Whether this is a from-scratch import or a merge into existing redirects (duplicates are not deduplicated automatically — see Failure modes).
- Desired HTTP status code per redirect (301 is the default assumption for permanent URL migrations; some redirects may need 302/307).
- Whether matches need to be regex (path patterns) or exact-URL only.

## Procedure

### 0) Guardrails: redirects are live traffic and SEO, not cosmetic

Getting these wrong silently breaks inbound links and search rankings — there's no visible error like a broken page. Before any write operation:

1. Confirm environment (dev/staging/production) and that you're not accidentally targeting production with a staging test batch.
2. **Back up the existing redirect set first**, even if you believe it's empty:
   `wp redirection export all backup-$(date +%Y%m%d).json --format=json`
3. Test the import on staging before running it on production, especially for a large batch tied to a launch (legacy URL migrations, in particular, are exactly the kind of one-shot bulk operation that's expensive to get wrong after launch — see `references/legacy-migration.md`).

### 1) Inspect current state (deterministic)

Run the inspector to confirm WP-CLI + Redirection are available and to get a baseline redirect/group count:

- `node <skill-root>/scripts/redirection_inspect.mjs --path=<path> [--url=<url>]`

Because there's no list command, the inspector works by exporting to a temp JSON file and counting entries. Use the same approach manually any time you need to check "does a redirect for X already exist" — export, then grep/read the JSON (or check the wp-admin Redirection screen directly, which is often faster for a single lookup).

If the Redirection database tables aren't installed yet on a fresh site: `wp redirection database install`.

### 2) Choose the right workflow

#### A) Bulk legacy URL migration (CSV)

The most common launch task: mapping an old site's URLs to the new site's slugs.

1. Build a CSV from the source-of-truth mapping (e.g. an "old vs new URL" sheet). Columns: `source,target[,regex,code]`.
2. Do a small test batch (5-10 rows) on staging first, verify with `curl -I`, then run the full batch.
3. Import: `wp redirection import mapping.csv --format=csv`

Read: `references/import-export.md` for exact column/format details, `references/legacy-migration.md` for the full pre-launch workflow.

#### B) Copying redirects between environments (JSON)

JSON is the only format that preserves groups, regex flags, and full redirect detail — use it, not CSV, when moving a redirect set between two Redirection installs (e.g. staging → production once confirmed).

1. Export from source: `wp redirection export all redirects.json --format=json`
2. Import on destination: `wp redirection import redirects.json --format=json`

#### C) Migrating from another redirect plugin

`wp redirection plugin <name> [--group=ID]` where `<name>` is one of: `wp-simple-redirect`, `seo-redirection`, `safe-redirect-manager`, `wordpress-old-slugs`, `rank-math`, `quick-redirects`.

#### D) Importing from an old `.htaccess`

If the legacy site's redirects live in Apache config rather than a plugin: `wp redirection import old.htaccess --format=apache`

#### E) Settings

`wp redirection setting <name>` to read a setting, `wp redirection setting <name> --set=[value]` to write one (JSON-encode the value if not a plain string/number). Setting names come from the plugin's own settings list — check current value with a `get`-style read before overwriting rather than guessing a name; see `references/import-export.md` for where to confirm names.

Read: `references/import-export.md`

## Verification

- Re-run the inspector; confirm the redirect/group count increased by the expected number (imports don't dedupe — see Failure modes).
- Spot-check a representative sample of URLs with `curl -I <old-url>` and confirm a `301` (or intended code) with the correct `Location:` header — don't trust the import log alone.
- Check the Redirection admin's 404 log after launch for anything that should have been caught by the new redirects but wasn't (usually a regex flag or trailing-slash mismatch).

## Failure modes / debugging

- **No dedupe on import.** Re-importing the same CSV/JSON creates duplicate redirect entries rather than updating existing ones. If re-running an import after fixing a mapping error, either delete the bad batch first (via a group, in wp-admin) or restore from the pre-import backup and re-import clean.
- **Regex flag mismatch.** CSV rows with a literal path that should have matched as a pattern (or vice versa) either don't fire or over-match. Test the specific row before trusting the batch.
- **`wp redirection import` succeeds but nothing redirects.** Usually the redirect landed in a disabled group, or Redirection's own module (WordPress/Apache/Nginx) doesn't match how the server actually routes requests — confirm which "module" (`wordpress`, `apache`, `nginx`) matches the live setup.
- **"This does not seem to be a WordPress installation."** Wrong `--path`, wrong container, or missing `wp-config.php` — same as any WP-CLI command.

## Escalation

- For a large legacy-URL migration (hundreds+ rows), don't hand-write the CSV — generate it programmatically from the source spreadsheet, and get an explicit test-batch sign-off on staging before running the full set against production.
- If REST API access is needed for something the CLI subcommands don't cover (single-redirect CRUD, live querying without exporting), the plugin has a full REST API — see https://redirection.me/developer/rest-api/ (JS-rendered docs page; may need to load it in a browser rather than fetch it as raw HTML).

## Related

- `references/import-export.md` — file formats, columns, plugin-migration names, settings
- `references/legacy-migration.md` — full pre-launch old→new URL redirect workflow
- `references/safety.md` — backup/testing discipline before bulk writes
