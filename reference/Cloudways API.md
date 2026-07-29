---
date: 2026-07-10
description: "Cloudways API v2 reference — the agency's hosting platform, mostly hands-off day to day. Zero existing integrations. Bob wants two specific workflows: log-pull-first debugging, and a scripted new-client staging bootstrap."
tags:
  - reference
---

# Cloudways API

Cloudways is the agency's hosting platform — currently hosting [[Systems Furniture Installations]] and [[Brunsell Lumber]], with [[Educated Mortgage]] to follow once it launches (see [[Digital Department]] for the fuller client-base picture: the large majority of clients are hosting/maintenance-only, not active builds — a live WPRemote pull found 54 client sites on 2026-07-20, correcting an earlier ~250 verbal estimate, though that count moves as accounts onboard/offboard; see [[WPRemote API#Site count reality check — corrects the "~250" estimate]]).

## Current tooling landscape (per Bob, 2026-07-10)

- **Zero existing Cloudways API integrations** — this research is purely evaluative (would building one be useful?), not a migration/fix task.
- **WP-level maintenance runs through WPRemote**, not Cloudways-native tools — updates/monitoring at the WordPress-application layer are already handled there. Anything considered on the Cloudways API side should be checked against WPRemote first to avoid duplicating what it already covers. See [[WPRemote API]] for that API's own investigation (2026-07-17) — its `GET /sites` endpoint already covers fleet-wide health/status in one call.
- **DNS runs through Cloudflare directly**, not via Cloudways' managed Cloudflare integration — so the v2 API's expanded Cloudflare analytics/security-log endpoints (below) likely don't apply here; that data path would need to come from Cloudflare's own API instead, if wanted.
- **No passthrough billing to clients** — Cloudways offers a Billing & Reporting API for exactly that (reseller billing), but it doesn't match this agency's model, so that entire endpoint group is not relevant here.

Because there's no existing v1 integration to worry about, the API-version note is simpler than it would otherwise be: Cloudways deprecated **API v1** when **v2** shipped in January 2026, and v1's docs were only guaranteed available until March 2026 (already passed). There's nothing to migrate — just build directly against v2 if anything gets built.

**Bob's actual day-to-day relationship with Cloudways is mostly hands-off** (per Bob, 2026-07-10) — this isn't about broad fleet automation across the whole maintenance book, it's two specific recurring workflows he'd want to streamline. Everything below is scoped to those two, not the fuller endpoint catalog speculatively.

## The two target workflows (per Bob, 2026-07-10)

### 1. Client reports an issue → check logs → isolate the plugin by renaming its folder → debug → repeat until fixed

Corrected per Bob (2026-07-10): this is **per-plugin folder renaming**, not renaming the whole `plugins/` directory. Each candidate plugin gets prefixed individually — `advanced-custom-fields` → `_advanced-custom-fields` — one at a time, testing the frontend after each rename, until the offender is found (only when the logs don't already point straight at it). Rename back before moving to the next candidate if it wasn't the cause.

**Critical, explicitly called out by Bob: this must never go through the WordPress plugins admin screen or trigger the deactivation hook.** That's the entire reason the technique is folder-renaming and not `wp plugin deactivate` (via WP-CLI *or* wp-admin) — deactivating a plugin the normal way fires its `register_deactivation_hook` callback, which can run cleanup logic (clearing cron events, flushing rewrite rules, sometimes touching stored data) as a side effect. That's an unwanted side effect during diagnosis on a live client site. Renaming the plugin's folder sidesteps this entirely: WordPress simply can't find the plugin's main file at its expected path on the next load, silently treats it as inactive, and **no deactivation hook fires** — a clean, reversible, side-effect-free way to isolate a plugin. **Correction to an earlier draft of this note: WP-CLI's `wp plugin deactivate` is not an acceptable substitute for this technique** — it was previously (wrongly) framed here as a faster equivalent; it is not equivalent, because it triggers the exact hook the rename technique is designed to avoid.

What this actually decomposes into:

- **Log retrieval is genuinely a Cloudways-API job.** The dashboard exposes Access Logs (split into Apache/dynamic, Nginx/static, and PHP-process detail) and Error Logs (Apache error log — fatals, warnings) per application, most recent 1000 entries each. Third-party tooling (e.g. the `cloudways-mcp-server` community MCP project) confirms a `get-cloudways-logs`-style call exists against the API, so this is scriptable — pull error logs first when a client reports something broken, instead of logging into the dashboard by hand. If the log already names the offending plugin, skip straight to confirming it; only fall back to the rename-and-test loop when it doesn't. Exact v2 request/response shape wasn't confirmed against the official schema this pass (the Redocly docs portal is JS-rendered and didn't return readable content via fetch) — verify in the [API Playground](https://developers.cloudways.com/play) before building.
- **Renaming a plugin folder is *not* a Cloudways API operation** — it's a filesystem action, done via SFTP/SSH today. The Cloudways API can supply the SSH/SFTP credentials for a given app (Application Management → Access Details), so a script could automate the rename-test-repeat loop over that SSH connection (`mv advanced-custom-fields _advanced-custom-fields`, hit the frontend, check the error persists or clears, rename back if not the culprit, move to the next candidate) — but there is no dedicated REST call for the rename/isolate step itself, and no deactivate-style call should be used in its place.
- **Net shape of an automated version:** pull error log via Cloudways API → if it already names a plugin, confirm by renaming just that one → if not, SSH in (creds via API) and rename-test-repeat one plugin folder at a time (never via wp-admin, never via `wp plugin deactivate`) → re-check the log/re-request the page after each rename → rename the true offender back only once a fix is applied, report back. The Cloudways API covers log retrieval and SSH credential lookup; the isolate-and-test loop itself is a straightforward scripted SSH/SFTP rename, not a WordPress-level deactivation of any kind.

### 2. Spin up a new install on staging, complete with .gitignore and standard infrastructure

Two separate pieces here, only one of which is actually Cloudways:

- **Cloudways side (API-scriptable):** creating the application itself — Application Management includes a create-app call (server_id + app type + name), and there's a documented `/git/pull`-style endpoint (`server_id`, `app_id`, `git_url`, `branch_name`) for deploying code from a git repo into an app. That second piece matters a lot here, because it means "new staging install" can plausibly mean **provision the app, then git-deploy the agency's own boilerplate straight into it**, rather than building a site by hand and only afterward wiring up git. Distinct from Cloudways' native "Staging Management" clone feature (which clones an *existing* live Cloudways app — not what's needed when there's no live app yet, e.g. brand-new client work).
- **Repo side (not Cloudways at all):** the ".gitignore and standard infrastructure" part is really about scaffolding the same local `wp-env` structure every current client Stack note documents — `mwf-cornerstone` mu-plugin, `canvas` theme (or a client child theme), `.wp-env.json`, the `mwf/wp-env-config` composer automation (`pull:`/`push:` scripts, `sshstaging` alias), and a standard `.gitignore` matching that mapping. This is templating work in the agency's own boilerplate repo, independent of whatever Cloudways API call provisions the actual hosting — the two need to agree on server/SSH details (host, path) but they're different systems.
- **Net shape of an automated version:** scaffold the local repo from a standard template (mu-plugins + theme + `.wp-env.json` + `.gitignore`, matching the pattern in every existing client Stack note) → call the Cloudways API to create the app on the right server → git-deploy (or `push:plugins`/`push:themes` via the existing rsync automation) the scaffolded boilerplate into it → confirm the `{domain}.mdmserver.us` staging URL resolves and is password-protected (Cloudways staging apps are `.htpasswd`-protected by default). This is genuinely a "new client bootstrap" pipeline, not just an API call — closer in scope to the `onboarding` skill/client-folder workflow than to a single script.

## Docs & tools

- **API v2 reference (current):** [developers.cloudways.com/docs](https://developers.cloudways.com/docs) — rebuilt on Redocly (replacing the old Swagger UI), cleaner endpoint discovery.
- **API Playground:** [developers.cloudways.com/play](https://developers.cloudways.com/play) — test endpoints in-browser against real account data before scripting anything.
- **Getting-started / auth walkthrough:** [Cloudways Knowledge Base article](https://support.cloudways.com/en/articles/5136065-how-to-use-the-cloudways-api).
- **V1 docs (legacy, for reference only while migrating):** [developers.cloudways.com/v1/docs](https://developers.cloudways.com/v1/docs/).

## Auth

Token-based: generate an API key from the Cloudways Platform dashboard (account settings), then exchange your account email + that key for a short-lived OAuth access token via the API's own auth endpoint; use that bearer token on subsequent calls. Standard "get a token, then call the real endpoints" flow — nothing unusual here, but the token does expire and needs refreshing in any long-running integration.

## What the API actually covers

**Server management** — create/launch servers, fetch server details, vertical scaling (CPU/RAM, with or without disk), restart/manage individual services (Apache, Nginx, PHP-FPM, MySQL) independently rather than the whole box.

**Application management** — create/delete apps on a server, fetch app details, manage settings, trigger backups, deploy actions, toggle Object Cache (useful to script as part of a deploy/CI step), and switch an app's **stack version** between the legacy Apache-based setup and the newer NGINX-optimized one.

**Security Suite (new in v2)** — this is the standout addition for an agency running many sites. Full automation for scans, quarantine/restore, incident history, file-level insights, event logs, and IP allowlist/blocklist — both server-wide and per-app, plus firewall rules and country-level blocking at the server level. Built for exactly the "continuous monitoring + automated response across a fleet" use case a multi-site hosting book needs, rather than checking each site by hand.

**Password Protection / htpasswd (new in v2)** — programmatically lock down an app with basic auth. Directly relevant to this agency's own workflow: every client Stack note (`*.mdmserver.us`) documents the same staging-environment pattern, and this is scriptable protection for exactly those environments instead of a manual per-site setup.

**WordPress Multisite (new in v2)** — script Multisite configuration. Not obviously relevant today (no client stack currently uses Multisite), but worth knowing it exists if that changes.

**Cloudflare integration (expanded in v2)** — pull Cloudflare analytics and security logs where Cloudways manages the Cloudflare integration. **Likely not applicable here** — DNS runs through Cloudflare directly, not via a Cloudways-managed integration (per Bob, 2026-07-10) — confirm before assuming this data path exists.

**Cloudways Copilot management (new in v2)** — subscribe/configure Copilot (Cloudways' AI troubleshooting layer) per server, pull insights/alerts programmatically. Only relevant if Copilot is actually in use/provisioned — not confirmed.

**Client Billing & Reporting (new in v2, largest single expansion)** — provision clients, assign pricing/plans, automate invoices, manage tax rules. **Not relevant here** — this agency doesn't do passthrough billing through Cloudways (per Bob, 2026-07-10), so this entire endpoint group is out of scope regardless of how useful it looks on paper.

## Would building an integration actually be useful?

Scoped to the two named workflows, not the fuller endpoint catalog (Bob is otherwise mostly hands-off with Cloudways):

**Worth building:**
- **Log-pull-first debugging assist (Workflow 1)** — real time savings even as a small script: skip the dashboard, pull error/access logs straight via API when a client reports an issue, then script the rename-and-test isolation loop over SSH when the log alone doesn't name the culprit. Note: if WPRemote turns out to have its own remote plugin-toggle feature, **check whether it renames or actually deactivates** before treating it as a substitute — per Bob (2026-07-10), a real deactivation (hook-triggering) is explicitly not acceptable for this diagnostic use, so a WPRemote feature would only replace this workflow if it does the same non-destructive rename-style isolation.
- **New-client staging bootstrap (Workflow 2)** — the higher-value build of the two: app creation + git-deploy via the Cloudways API, paired with scaffolding the standard local `wp-env` boilerplate (mu-plugin, theme, `.wp-env.json`, `.gitignore`). This is closer to a small pipeline than a single API call, and it directly compounds with the existing per-client onboarding pattern (`Clients/<Client>/` folders, `mwf/wp-env-config` automation) already documented across every client Stack note.

**Not in scope right now:** Security Suite, vertical scaling, Copilot management, Client Billing & Reporting, Cloudflare log-pulling — none of these map to the two workflows Bob actually named, and he's confirmed he's mostly hands-off with Cloudways otherwise. Not worth building toward speculatively.

## Open questions (not yet answered)

- Exact v2 request/response shape for log retrieval and application creation/git-deploy — the official Redocly docs portal is JS-rendered and didn't return readable content via a plain fetch; confirm both in the [API Playground](https://developers.cloudways.com/play) before writing any code.
- Whether WPRemote already has a built-in remote plugin-toggle or safe-mode feature — and critically, whether it renames (safe) or actually deactivates (triggers hooks, not acceptable per Bob's explicit constraint) — before assuming it can replace this workflow. **Partial answer (2026-07-17):** WPRemote's API does have `POST /sites/wp/plugins/deactivate` (see [[WPRemote API]]), described plainly as "deactivate... without being removed" — standard WP terminology, with nothing in the docs suggesting a rename-style safe mode. It's very likely a normal `deactivate_plugins()` call under the hood (same hook-firing behavior as `wp plugin deactivate`), but this isn't explicitly confirmed either way in the API docs — verify with WPRemote support before treating it as a substitute for the rename-based isolation technique.
- Whether git-deploy (`/git/pull`) or the rsync-based `push:plugins`/`push:themes` automation is the better fit for pushing boilerplate into a freshly created staging app — worth trying both in the Playground/on one throwaway app before committing to a pipeline design.

## Why this might matter beyond "just hosting"

This vault's methodology treats hosting, WordPress, Astro, GitHub, Google Docs,
and Cloudflare as adapters behind policy and approval gates. If any Cloudways
integration gets built, it should sit under that same model: infrastructure
automation underneath hosted client sites, complementary to WPRemote's
WordPress-layer maintenance rather than a replacement for it.

## Related

- [[Digital Department]] — the hosting/maintenance book this infrastructure serves (client count moves regularly — check [[WPRemote API]] for a current figure rather than citing a fixed number)
- [[operational-methodology]] — the policy, approval, and verification model this plugs into
- [[Systems Furniture Installations Stack]] · [[Brunsell Lumber Stack]] · [[Educated Mortgage Stack]] — the client repos actually hosted here
