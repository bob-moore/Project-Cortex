# Administration and Integrations

## Configuration operations

For forms, SEO, redirects, analytics, email, consent, caching, security, and other plugin settings:

1. Identify the active plugin and version.
2. Read current settings before writing.
3. Determine storage surface: option, post type, plugin table, file, or remote service.
4. Change only the named setting.
5. Read it back and verify its user-visible or operational effect.

Do not invent option names or write directly to plugin tables when a supported API/UI/CLI exists.

## Plugin and theme lifecycle

Activation/deactivation can run hooks with data, cron, cache, rewrite, or cleanup effects. Before changing state:

- Confirm target environment.
- Capture active versions and current state.
- Read known project warnings.
- Verify whether deactivation hooks are safe.
- Capture backup/rollback where consequential.

Folder renaming for fault isolation and normal deactivation are not equivalent. Follow the client's documented incident procedure.

## Users and roles

Treat user creation, deletion, password changes, role changes, application passwords, and 2FA as administrative actions requiring explicit scope. Never print secrets. Verify the minimum capability needed and avoid granting administrator by default.

## Database, URLs, and migrations

Use `wp-wpcli-and-ops` and `wp-migratedb-pro` when applicable. State source and destination in plain language, back up the destination, dry-run search-replace, preserve serialization, and verify `home`/`siteurl`, representative content, forms, and integrations afterward.

## Forms and outbound effects

Testing a form can send email, create CRM records, charge cards, or trigger automation. Use a documented test mode/account or obtain approval before causing external side effects. Verify both frontend result and downstream delivery when in scope.
