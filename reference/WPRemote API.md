---
date: 2026-07-17
description: "WP Remote (BlogVault) API v6 reference — global skill (~/.agents/skills/wpremote-api) for site health across Bob's ~54-site maintenance book, confirmed live 2026-07-20."
tags:
  - reference
---

# WPRemote API

WPRemote is the agency's WordPress-layer maintenance tool for the hosting/maintenance book. WP-level updates and monitoring run through WPRemote, not Cloudways-native tools; see [[Cloudways API]] for the hosting-infrastructure side.

**Key finding: WPRemote is a product of BlogVault** (same company also runs MalCare) — the actual API is documented under BlogVault's developer docs, not on wpremote.com itself. The marketing page's "WP Remote API" and BlogVault's public API are the same product; account credentials, dashboard, and API tokens are shared across the WPRemote/BlogVault/MalCare product line.

## Is there a better way?

No — this is already the right approach. There's no existing MCP server for WPRemote/BlogVault (checked — nothing found), and no better-documented alternative surface. The vendor explicitly designed for exactly this use case: a versioned, OpenAPI-documented REST API meant to be called by AI agents directly or via a thin custom wrapper. Their own docs say "Any agent that reads an OpenAPI spec works — no lock-in," and publish the spec at three levels of detail (see below) specifically to make that easy.

## Docs

- **Landing/marketing:** [wpremote.com/features/wp-remote-api](https://wpremote.com/features/wp-remote-api/), [wpremote.com/api-v4](https://wpremote.com/api-v4/) — feature overview and positioning, not technical reference.
- **Actual developer docs (BlogVault):** [docs.blogvault.net/api/v6](https://docs.blogvault.net/api/v6/) — quickstart, guides, authentication, pagination, rate limits, error reference, and an **interactive Scalar API reference**.
- **Machine-readable spec:** [openapi.json](https://docs.blogvault.net/api/v6/openapi.json) (authoritative), [api.md](https://docs.blogvault.net/api/v6/api.md) (compact Markdown — what this note is based on), [llms-full.txt](https://docs.blogvault.net/api/v6/llms-full.txt) (full LLM context dump).
- **Get credentials:** WPRemote dashboard → **Account → My Account → API Credentials** (owner/co-owner accounts only). Generate the key there — shown once, copy immediately.

## Auth

Simple bearer token, one per account:

```
Authorization: Bearer YOUR_API_TOKEN
```

Base URL: `https://api.blogvault.net/api/v6` (no sandbox — every call hits production).

No token-scoping parameters appear anywhere in the actual v6 OpenAPI contract — every endpoint is reachable with the one account-level token. This is worth flagging because it **contradicts the marketing FAQ**, which claims "Each key is scoped to exactly the sites and access level you set... A key scoped to 5 sites can't touch the other 135." The documented API has no scope/site-restriction field on token generation — only **Team Members** (dashboard users, via `/team-members`) get per-site access and roles (`collaborator`, `administrator`, `co_owner`). **Confirm directly with WPRemote support before assuming a scoped-token option exists** — if it doesn't, a single token is full-account read+write and should be handled under the vault's approval and private-credential policies.

Similarly, the marketing copy mentions **webhooks** ("push instant alerts when backups complete, fail, or downtime is flagged") — **no webhook endpoints or subscription resource exist in the v6 OpenAPI spec**. If that matters, confirm with WPRemote support whether webhooks are a real, separately-documented feature or aspirational copy; don't design around it until confirmed.

## Rate limits & errors

- **200 requests/minute per account** — flat, not per-endpoint. Response headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.
- Consistent JSON error envelope: `{"error": {"status, code, message, details[]}}`. Standard categories: `bad_request` (400), `unauthorized` (401), `forbidden` (403), `not_found` (404), `conflict` (409), `unprocessable_entity` (422), `too_many_requests` (429), `service_unavailable` (503).
- Pagination: `page` + `perPage` (max 100/page) on list endpoints, `meta.pagination` in responses.
- Long-running operations (updates, restores, staging builds) return a task; poll `GET /tasks/{id}` rather than re-triggering — the docs explicitly warn "prefer retrieving the existing task over starting a second operation" on conflict.

## What the API covers (v6, ~40 endpoint groups)

The part that matters most for "check site health": **`GET /sites`** (list) and **`GET /sites/{id}`** (single) return almost everything in one call per site — connection/sync status, WordPress core version + update-available + vulnerability flag, PHP/MySQL version, hosting provider, security scanner status (clean/hacked + file/script/cron detection counts), firewall status, backup status (enabled, snapshot count, latest snapshot, retention), uptime status, and a screenshot thumbnail. `GET /sites` is also filterable directly on health signals — `scanner_status:eq=hacked`, `connection_status:eq=disconnected`, `backups:eq=false`, `php_version` comparisons — so a single filtered call can answer "which of our sites are unhealthy right now" across the whole hosting book without per-site polling.

Full endpoint groups, for reference:

- **Clients** — CRUD for client/customer records, each with assigned `site_ids`. This maps directly onto this vault's `Clients/` folders — could plausibly sync client metadata (notes, site assignments) both ways eventually, though not scoped now.
- **Sites** — list/show/create/delete/update, start sync. The core health-check surface (above).
- **Managed Accounts** — cross-account access (agencies managing sub-accounts or being managed).
- **Teams** — team member invites/roles/per-site access (dashboard users, not API scoping — see Auth caveat).
- **Tags** — assign/remove tags on sites, for grouping/filtering.
- **Tasks** — poll background job status/progress/cancel. Every long-running action returns a task ID.
- **Backups** — Backup Destinations, Snapshots, Backup Download/Upload/Migration/Restore, Backups Activation. Full programmatic backup lifecycle.
- **Staging** — create/list/delete staging sites, extend/resume, set PHP version, SSO login URL generation.
- **WordPress management** — Core (status, lock/unlock updates), Plugins (list/install/upload/activate/deactivate/delete/lock), Themes (same set), Users (create/delete/role/password/2FA/SSO login), Updates (start bulk updates).
- **Security** — Detection Summary, File/Script/Plugin/Cron-job/Redirection Detections (mark safe/unsafe), Cleanup (malware cleanup), Login Protection, Firewall (activation, IP allow/block, geo-blocking, bot protection, firewall logs).
- **Performance** — Performance Reports (Lighthouse-style), activation, settings.
- **Reporting/Agency ops** — Reports, Report Templates, Scheduled Reports (PDF, email), Activity Logs, Notes, Custom Work entries, Important Pages, Files/Tables (granular backup file/table management), Branding (plugin white-label, WP login screen), Sender Emails (custom report sending domain).

Essentially the entire WPRemote dashboard is exposed — this is a genuinely complete API, not a read-only reporting slice.

## Would building an integration actually be useful?

Yes, for the stated goal (pull site health/status data) — and cheaply. A single `GET /sites` call, filtered and re-run on a schedule, directly answers "which of our ~250 hosting/maintenance clients need attention" without touching the dashboard. That's a natural fit for:

- **This vault**: a periodic pull that flags unhealthy sites (scanner hacked, connection disconnected, core update available + vulnerable, backups disabled) against `Clients/` notes tagged `hosting`/`maintenance` (see [[Clients/Index|Clients Index]] for that tag scheme, just added). Confirmed working 2026-07-20 — see below.
- **The broader operating model**: WPRemote becomes another adapter behind the same policy engine as Cloudways and other connected systems. The API is genuinely read+write, so access should be scoped by workflow contract, approvals, and private credential handling rather than by casual runtime availability.

**Not yet scoped:** which specific health signals matter enough to automate on vs. just check ad hoc — that's a product decision, not a technical one, and should follow from what actually causes support tickets today rather than wiring up all 40 endpoint groups speculatively (same discipline as the Cloudways API note's "worth building vs. not in scope" split).

## Decision (2026-07-17): built as a global skill, not an MCP server

Bob decided how to wire this into daily workflow:

- **Global skill, not a custom MCP server.** No hosted WPRemote MCP endpoint exists (checked — `mcp.wpremote.com` doesn't resolve, `mcp.blogvault.net` 404s). Building a bespoke MCP server to wrap the OpenAPI spec was the alternative, but a skill is lower-maintenance by comparison: the agent reads the skill and calls the API directly. The global skill lives at `~/.agents/skills/wpremote-api/SKILL.md`.
- **Single full-account token, accepted knowingly.** Bob chose to proceed with one global API token rather than wait on WPRemote support to confirm whether scoped tokens exist. This is a deliberate risk acceptance, not an oversight — the skill's Guardrails section documents it so future sessions don't quietly forget the blast radius.
- **Webhooks question deprioritized, not resolved.** Bob already has WPRemote Slack notifications configured separately, so the marketing-vs-docs discrepancy on webhooks (see above) doesn't block anything in practice.
- **1Password CLI (`op`) is not yet installed on this machine** — a real prerequisite before the skill's `op read` credential pattern works. Generating the token and creating the 1Password item are manual, human-only steps (dashboard + 1Password GUI/CLI), not something to automate away.

## Connection confirmed live (2026-07-20)

The two blockers noted in the 2026-07-17 decision above are resolved — done in an undocumented session between 2026-07-17 and today, confirmed working this session:

- **1Password CLI (`op`) is installed and signed in** on this machine (v2.35.0).
- **Token exists** in the `Employee` vault as item `WPRemote API Token` (`API_CREDENTIAL` category, created 2026-07-17), resolvable at call time via `op read "op://Employee/WPRemote API Token/credential"` — matches the skill's documented pattern exactly.
- **Live `GET /sites` call returned HTTP 200** with real data. The skill is fully operational, not just theoretically wired up.

### Site count reality check — corrects the "~250" estimate

A full paginated pull (`GET /sites?perPage=100`, single page) returned **61 sites total** in this account — far fewer than the earlier "~250 current clients" rough estimate. Cross-referencing by domain against `Clients/*/​<Client>.md` overview notes:

- **54 sites match a vault client note** tagged `hosting` and/or `maintenance` — this is Bob's actual department maintenance book, and lines up with what Bob described this session ("closer to like 50 sites in maintenance right now").
- **7 sites are Mid-West Family corporate/radio-network properties, not client work**: MWFB Eau Claire, Mid-West Family La Crosse, Mid-West Family (Northern Illinois), Mid-West Farm Report, Madison Traffic, Wicked Smart Podcasts, Mid-West Family of Companies. These sit in the same WPRemote account (no token scoping, per the Auth section above) but aren't Digital Department client sites — matches Bob's distinction that the larger "hosting" tier belongs to corporate, not his department.

**Reconciled (2026-07-20):** the "~250-client" figure was a rough verbal estimate that doesn't hold up against live data — 61 total / 54 client sites is what WPRemote actually managed as of this pull.

**But treat 54 as a snapshot, not a constant** (Bob, 2026-07-20): client count changes regularly as accounts onboard and offboard, so don't let 54 calcify into the next stale number the way 250 did. When a current count is actually needed, re-run `GET /sites` rather than citing either figure from memory.

### Health snapshot at pull time (2026-07-20)

- **0** sites with an active malware/hacked scanner status.
- **0** sites with backups disabled.
- **1** site disconnected + uptime down: **MWFB Eau Claire** (`mwfeauclaire.com`) — a corporate property, not a client site. **Todo (Bob, 2026-07-20): remove it from WPRemote** rather than fix the connection — see [[Home]].
- **WP core updates available** (6.9.5 → 7.0.2) on Western Industries Plastic Products, HJ Pertzborn, Gio's Garden — **no action needed**, per Bob (2026-07-20) these run on their own schedule and don't need manual handling.
- **PHP still on 7.4** on 8 sites total (MWFB Eau Claire, Madison Traffic, TOSTRUD & TEMP S.C., Pinnacle, Mullins Apartments, Keleny Top Soil, Destination Dental, 2550 University), but **only flag this for clients tagged `hosting`** in `Clients/` — per Bob (2026-07-20), maintenance-only clients (TOSTRUD & TEMP S.C., Keleny Top Soil, Destination Dental) run on the client's own server, so the agency has no control over PHP version there. Filtered to `hosting`-tagged clients: **Mullins Apartments** and **2550 University** are real upgrade candidates. **Pinnacle** is also `hosting`-tagged but is a known, already-flagged exception — Bob confirmed (2026-07-20) it can't move past PHP 7.4 without significant work, so don't re-surface it as a fresh flag. MWFB Eau Claire and Madison Traffic are corporate, not Digital Department clients, and excluded from this filter entirely.

This is a point-in-time snapshot from one ad hoc pull, not a monitored/scheduled check — re-run `GET /sites` with the relevant filter (see Auth/Sites sections above) for current status rather than trusting these numbers as they age.

## Open questions (not yet answered)

- Whether a scoped/limited-access token type actually exists (contradicts what's in the documented OpenAPI contract) — deprioritized per the decision above, but worth asking WPRemote support if narrower access (e.g. for Tier 2 staff) ever becomes necessary.
- Whether webhooks are real and separately documented, or marketing-only — not currently blocking (Slack notifications already cover alerting), but worth confirming if a vault-side automated alert pipeline is ever built.
- Whether team-member API access (vs. the single account owner token) is possible, for giving Tier 2 staff narrower access than a full-account token.
- Exact request/response shape for the endpoints not detailed above — use the [interactive Scalar reference](https://docs.blogvault.net/api/v6/reference/) to construct and test calls before scripting (same caution as Cloudways: don't paste production credentials into a shared browser session).
## Related

- [[Cloudways API]] — the adjacent hosting-infra API; that note already flags WPRemote as covering the WP-application layer so Cloudways work doesn't duplicate it
- [[operational-methodology]] — the policy, approval, and verification model this plugs into
- [[approvals]] — approval boundaries for external reads and writes
- [[Clients/Index|Clients Index]] — the `hosting`/`maintenance` tag scheme this API's health data would cross-reference
- `~/.agents/skills/wpremote-api/SKILL.md` — the global skill built from this research
