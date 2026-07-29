---
date: 2026-07-09
description: "Educated Mortgage tech stack — WordPress via wp-env, shared MWF 'canvas' theme, pre-launch (old PHP site still live at the primary domain)."
tags:
  - reference
  - client-stack
  - client/educated-mortgage
---

# Educated Mortgage — Stack

Reference for the WordPress rebuild replacing the client's legacy PHP site. Same agency tooling pattern as [[Brunsell Lumber Stack]] (wp-env-config automation, mwf-cornerstone mu-plugin) — this note covers what's specific to Educated Mortgage.

## Environments

| Environment | URL / Path | Notes |
|---|---|---|
| Local repo | `/Users/bobmoore/Dev/Sites/1202.educatedmortgage.dev` | GitHub: `MDMDevOps/educatedmortgage.com` (branch `main`) |
| Local (wp-env/Docker) | `localhost:1202` (tests on 1203) | |
| Staging | https://educatedmortgage.mdmserver.us/ | Running WordPress 7.0 — see caution below |
| Live/Production | https://www.educatedmortgage.com/ | **Still the legacy PHP site** (`.php` URLs) — not yet replaced by the WordPress rebuild |

Note: a second, older local checkout exists at `/Users/bobmoore/Dev/Sites/Educated Mortage` (sic — typo in folder name), containing only static assets/sitesucker output, not the active wp-env repo. The live repo is `1202.educatedmortgage.dev`.

**Hosting:** will move to [[Cloudways API|Cloudways]] once launched (per Bob, 2026-07-10) — not yet hosted there since the legacy PHP site is still live at production.

## What we build

### Theme — `themes/canvas`
- The shared MWF base theme is used directly here (no client-specific child theme, unlike [[Brunsell Lumber Stack]] which extends `canvas` via a separate `themes/brunsell` theme)
- Full Site Editing (FSE) block theme, same underlying codebase as Brunsell's base
- Recent commits are pure styling/polish work: table styles, CTA cover variation, sticky header, border radius on linked cards, search template, mobile nav menu, nav modal fix, form border colors, Gravity Forms select styling, header redo, mortgage form styling, definition-list block, sidebar nav, reverse mobile column option — consistent with a near-complete, pre-launch site

### mu-plugins
- `mwf-cornerstone.php` + `mwf-cornerstone/` — same agency-wide "Mid-West Family Cornerstone" mu-plugin as [[Brunsell Lumber Stack]], not Educated-Mortgage-specific
- `wp-migrate-db-pro-compatibility.php`

### Notable plugins
- `advanced-custom-fields-pro`, `gravityforms` (powers the lead/mortgage-analysis forms), `kadence-blocks`, `mwf-blocks`, `mwf-calculator-blocks` (the 5 mortgage calculators), `breadcrumb-navxt`, `wp-nested-pages`, `ollie-menu-designer`, `duplicate-post`/`duplicate-menu`
- `object-cache-pro`, `breeze` (caching), `query-monitor` (debugging)
- `wordpress-beta-tester`, `performance-lab` — **dev-only, same flag raised on Brunsell**: staging's `meta-generator: WordPress 7.0` confirms staging is currently running a WP7 beta/nightly core, not a stable release. Confirm before launch that production won't inherit this.

## .wp-env.json

```json
{
  "core": null,
  "port": 1202,
  "testsPort": 1203,
  "config": {
    "WP_DEBUG": true,
    "WP_DEBUG_LOG": "wp-content/uploads/debug.log",
    "WP_ENVIRONMENT_TYPE": "local",
    "WP_CACHE": false
  }
}
```

Same `mwf/wp-env-config` composer automation as other MWF client repos (`pull:plugins`/`push:plugins`, `pull:themes`/`push:themes`, `pull:uploads`/`push:uploads`, `sshstaging` alias), authored by Bob Moore.

## OptifiNow CRM webhook integration

Dan's CRM ([[Dan O'Brien]]) is OptifiNow — leads from both Gravity Forms on the new site (Mortgage Analysis, Contact Us) need to POST into it. Built out over 2026-06-25–07-07 via email with Rey Maglian (OptifiNow Software Analyst, rmaglian@optifinow.com); status as of 2026-07-07 14:01: **data mapping confirmed working, OptifiNow doing final tests on their end** — they'll send production webhook URL/credentials/campaign IDs once done. No action needed from Bob until then, except hiding the `optifi_campaign` field (done).

**Staging endpoint** (production values not yet issued):
- URL: `app1-staging.optifinow.com/edumtg/webservice/leads.php`
- Auth header: **not documented here** (per Bob, 2026-07-10 — credentials don't belong in this git-tracked vault). Already configured directly in the Gravity Forms webhook settings on the site; check there if it needs re-entering.
- Payload: JSON

**Distinguishing which form a lead came from** — a hidden field `optifi_campaign` must be included in each form's payload:
- Mortgage Analysis page: `94` (staging value)
- Contact Us page: `95` (staging value)
- Must be hidden from the end user (was briefly visible on staging for debugging, per Rey's 2026-07-07 flag — confirmed hidden same day)

**Mortgage Analysis form fields** (all submissions): `goal_type` (radio: purchase / refinance / refinance_cash_out), `credit_score`, `first_name`, `last_name`, `email`, `phone`. Conditional: `first_home_purchase` + `purchase_price` (purchase goal); `refinance_balance` + `estimated_home_value` (refinance & refinance-cash-out); `cash_out_amount` (refinance-cash-out only).

**Contact Us form fields**: `first_name`, `last_name`, `email`, `phone`, `comments`.

**Troubleshooting history** (useful if the integration breaks again):
- Initial `"APIAuth username and password is incorrect"` error — fixed by using the exact `Authorization: APIAuth <key>:<secret>` header format Rey specified, not a generic basic-auth field.
- `optifi_campaign` was submitting `1` instead of `94`/`95` — root cause unclear; fixed by deleting and re-creating the Gravity Forms hidden field entirely rather than editing the existing one.

Full API doc PDF (`EduMtg_Endpoint_APIDoc.pdf`) attached to the 2026-07-02 email in the "Educated Mortgage Website - OptifiNow Webhook" thread (bob.moore@midwestfamilymadison.com inbox) if deeper reference is needed. **Before launch:** get the production endpoint/campaign IDs from Rey and update the Gravity Forms webhook settings directly on the site — the endpoint above is staging-only. Auth credentials get entered straight into Gravity Forms, not recorded here.

## AI Access (Novamira)

**Configured and live as of 2026-07-09** — confirmed via the "Novamira ON" indicator in the WP admin bar on `localhost:1202`. A reachable Novamira-capable runtime can inspect local PHP/WP-CLI/DB state; route repository changes to `developer` and mutable WordPress state to `wordpress-operator`. Re-verify the admin-bar indicator before relying on access later, in case it has been toggled off.

**Both local and staging are wired up for Codex CLI and this vault's Claude Code (2026-07-09).** Same `@automattic/mcp-wordpress-remote` stdio wrapper throughout; credentials come from the site repo's `.env`, which now follows a proper multi-profile contract (see `.env.example` and `AGENTS.md` in the repo — Codex itself scaffolded this during the SMS/Privacy pages task) rather than the single flat `WP_API_*` set from initial setup:
- **Local profile**: `WP_LOCAL_API_URL` / `WP_LOCAL_API_USERNAME` / `WP_LOCAL_API_PASSWORD`, server name `novamira-educatedmortgage-local` per the `.env.example` contract — though the actual registered Codex/Claude server names in practice are `novamira-educatedmortgage` (set up directly via `claude mcp add` / manual `config.toml` edit before the project scaffolding existed). Both names point at the same `localhost:1202` endpoint; not worth renaming, just don't be surprised the live registration doesn't match the `.env` convention exactly.
- **Staging profile** (added 2026-07-09): `WP_STAGING_URL=https://educatedmortgage.mdmserver.us/`, `WP_STAGING_API_URL=https://educatedmortgage.mdmserver.us/wp-json/mcp/novamira`, username `M1dwestDigital` (same as local), server name `novamira-educatedmortgage-staging`. Installed for Codex via the repo's own `bin/scripts/codex-mcp.sh --profile staging install` (uses `codex mcp add` under the hood — cleaner than hand-editing `config.toml`), and for Claude Code via `claude mcp add novamira-educatedmortgage-staging ... -s local` run from the vault root (must `cd` to the vault first — `claude mcp add`'s local scope keys off the current working directory, and running it from the site repo directory registers the server there instead, invisible to vault sessions).
- **Project helper scripts** now exist in the site repo for this: `bin/scripts/codex-mcp.sh {env|install|get|list|tools} [--profile local|staging]` and `bin/scripts/wp.sh` (WP-CLI wrapper with Docker-container fallback). Prefer these over ad hoc setup for any future profile (e.g. production, if ever added).
- **Caveat found in practice**: the Novamira `run-wp-cli` ability itself failed with "WP-CLI is not installed or not executable on this server" when called through the MCP JSON-RPC endpoint, even though WP-CLI works fine via `docker exec` into the `wp-env` container directly (local only — staging has no Docker/wp-env equivalent, it's a real remote server). If an agent needs WP-CLI locally and Novamira's `run-wp-cli` fails, fall back to `docker exec wp-env-1202educatedmortgagedev-*-cli-1 wp <command> --allow-root`.
- **A second, intermittent issue observed on local**: the WP-CLI Docker fallback itself sometimes lost access to the Docker socket mid-session ("permission denied... dial unix /Users/bobmoore/.docker/run/docker.sock") during otherwise-successful Codex runs, forcing a fallback to MCP for the actual write. Not yet root-caused — flag if it blocks a future task and Docker itself looks healthy from the host.

| Environment | Novamira installed? | MCP clients configured |
|---|---|---|
| Local (`localhost:1202`) | **Live** (confirmed 2026-07-09) | Codex CLI + Claude Code |
| Staging (`educatedmortgage.mdmserver.us`) | **Live** (confirmed 2026-07-09 — authenticated handshake succeeded) | Codex CLI + Claude Code |
| Production | Not recommended — dev/staging only per Novamira's own guidance | |

## Pre-launch checklist

- [ ] Confirm staging's WordPress 7.0 core isn't accidentally the target for production — pin `.wp-env.json` `"core"` to a stable tag once confirmed, per the same concern flagged in [[Brunsell Lumber Stack]]
- [ ] Confirm `wordpress-beta-tester` and `performance-lab` are dev-only and won't ship to staging/live
- [ ] "Second Iteration — adding new page, app links" (Monday: Website Builds, "Educated Mortgage" group) — in progress as of 2026-07-09. Staging footer already has Apple/Google Play app buttons; confirm what page/link work remains.
- [ ] Set up redirects from the legacy `.php` URL structure to the new clean-slug URLs before launch, to avoid losing existing SEO rankings. Confirmed: handled via the [Redirection](https://wordpress.org/plugins/redirection/) plugin (not yet seen in this repo's `plugins/` — install/configure and map every legacy `.php` URL before launch; the "EducatedMortggage.com New Sitemap Pages" sheet in Drive is the source list of old vs. new URLs to work from)
- [ ] Swap OptifiNow webhook staging endpoint/credentials/campaign IDs for production values once OptifiNow confirms testing is complete — see OptifiNow CRM webhook integration above.
- [ ] Add GA / GTM (Monday: Website Builds, Backlog, unassigned)
- [ ] Final invoice & add hosting/maintenance line item once live (Monday: Website Builds, Backlog, unassigned — PM task, not dev)

## Related

- [[Educated Mortgage]]
- [[Educated Mortgage Brand]]
- [[Educated Mortgage Voice]]
- [[Brunsell Lumber Stack]] — same agency tooling pattern, same `canvas` base theme
