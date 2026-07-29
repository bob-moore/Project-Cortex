---
date: 2026-07-15
description: "People4Pulse tech stack — WordPress via wp-env, shared MWF Canvas theme, pre-launch on staging. Uses an experimental custom 'Site Builder Agent' mu-plugin instead of Novamira."
tags:
  - reference
  - client-stack
  - client/people4pulse
---

# People4Pulse — Stack

Reference for the WordPress build for [[People4Pulse]]. Same agency tooling pattern as [[Brunsell Lumber Stack]] and [[Educated Mortgage Stack]] (wp-env-config automation, `mwf-cornerstone` mu-plugin) — this note covers what's specific to People4Pulse.

## Environments

| Environment | URL / Path | Notes |
|---|---|---|
| Local repo | `/Users/bobmoore/Dev/Sites/people4pulse` | GitHub: `MDMDevOps/people4pulse` (origin) |
| Local (wp-env/Docker) | `localhost:1206` (tests on 1207) | per `.wp-env.json` |
| Staging | https://people4pulse.mdmserver.us/ | Pre-launch, in progress/near-complete |
| Live/Production | people4pulse.org | Confirmed via the signed contract's strategy brief (2026-07-15). Target push-live is the day after the 2026-07-20 review meeting, contingent on server access, hosting, and the Stripe account swap below. |

## What we build

### Theme — `themes/canvas`
- `MWF Canvas` v2.0.0, used directly with no client-specific child theme — same pattern as [[Educated Mortgage Stack]] (Brunsell extends `canvas` via a separate child theme; this client and Educated Mortgage do not)
- Full Site Editing (FSE) block theme, same underlying codebase as Brunsell/Educated Mortgage
- Recent commits (as of 2026-07-15) are nav/header polish: nav styles, subnav styling, search bar styling, offcanvas, radio covers, labels — consistent with a near-complete, pre-launch site

### mu-plugins
- `mwf-cornerstone.php` + `mwf-cornerstone/` — same agency-wide "Mid-West Family Cornerstone" mu-plugin as other MWF client repos, not People4Pulse-specific
- `wp-migrate-db-pro-compatibility.php`
- **`site-builder-agent`** — a custom, experimental mu-plugin (`bmd/site-builder-agent`, author Bob Moore) exposing "agent-facing WordPress site builder abilities" via `php-di` and a WP Abilities-style provider (`inc/Providers/Abilities.php`). This is **not** the Novamira plugin used on other clients — no Novamira installation found in this repo. Purpose/maturity/MCP-client wiring unconfirmed; investigate before assuming any live agent access parallel to Educated Mortgage's Novamira setup.

### Notable plugins
- `advanced-custom-fields-pro`, `gravityforms` + `gravityformsstripe` (forms + donation/payment), `mwf-blocks`, `mwf-block-addons`, `_mwf-block-enhancements`, `button-block-enhancements`, `navigation-block-enhancements`, `icon-block`, `cover-parallax-style`, `block-visibility`
- `the-events-calendar` + `event-organiser` + `hydrogen-calendar-embeds` + `pretty-google-calendar` + `my-calendar` + `ics-calendar` — heavy calendar/events tooling stack, notably redundant (5 overlapping calendar plugins) — worth a pre-launch consolidation pass
- `download-monitor` — powers the Resources page's downloadable guides/handouts
- `social-sharing-block`, `instant-images`, `safe-svg`, `rss-importer`, `easy-mcp-ai`, `fakerpress`, `akismet`, `wp-reset`, `wp-nested-pages`, `wp-migrate-db-pro`, `wordpress-importer`
- `wordpress-beta-tester`, `query-monitor` — dev-only, same flag raised on [[Brunsell Lumber Stack]]/[[Educated Mortgage Stack]] for unpinned core version risk

## .wp-env.json

```json
{
    "core": null,
    "mappings": {
        "wp-content/themes": "./themes",
        "wp-content/plugins": "./plugins",
        "wp-content/mu-plugins": "./mu-plugins",
        "wp-content/uploads": "./uploads",
        ".htaccess": ".htaccess"
    },
    "port": 1206,
    "testsPort": 1207,
    "config": {
        "WP_DEBUG": true,
        "WP_DEBUG_LOG": "wp-content/uploads/debug.log",
        "WP_DEBUG_DISPLAY": false,
        "SCRIPT_DEBUG": false,
        "WP_DEVELOPMENT_MODE": "theme",
        "WP_ENVIRONMENT_TYPE": "local",
        "WP_CACHE": false
    }
}
```

Same `mwf/wp-env-config`-style composer automation as other MWF client repos (`pull:plugins`/`push:plugins`, `pull:themes`/`push:themes`, `pull:uploads`/`push:uploads`, `sshstaging` alias) — `composer.json` name is `mwf/wp-env-installer-test`, worth confirming whether that "test" naming is intentional or leftover from scaffolding.

## AI Access (Novamira)

**Not installed.** No Novamira plugin was found in `plugins/` or `mu-plugins/` on this repo, unlike [[Educated Mortgage Stack]] and [[Brunsell Lumber Stack]]. This client instead has the experimental `site-builder-agent` mu-plugin (see above)—do not assume equivalent live PHP/WP-CLI/DB access until that plugin's wiring is confirmed. Developer can still execute verified repository work; WordPress operations requiring live state remain blocked until a documented adapter is proven.

| Environment | Novamira installed? | MCP client configured |
|---|---|---|
| Local | No | No |
| Staging | No | No |
| Production | Not recommended — dev/staging only per Novamira's own guidance | — |

## Pre-launch cleanliness checklist

- [ ] **Swap Stripe (`gravityformsstripe`) from sandbox to live** — confirmed still sandboxed as of the 2026-07-07 client review (donate flow works end-to-end but only accepts test payment info); this has to flip before launch or donations silently won't process.
- [ ] Confirm `wordpress-beta-tester` and dev-only plugins won't ship to staging/live
- [ ] Pin `.wp-env.json` `"core"` to a stable version tag before launch (same unpinned-core concern flagged on Brunsell/Educated Mortgage)
- [ ] Consolidate the 5 overlapping calendar plugins (`the-events-calendar`, `event-organiser`, `hydrogen-calendar-embeds`, `pretty-google-calendar`, `my-calendar`, `ics-calendar`) down to whichever one actually powers the live Events page
- [ ] Categorize blog posts (all 3 currently "Uncategorized") before launch
- [ ] Confirm whether `easy-mcp-ai` and `site-builder-agent` are launch-safe or dev-only experimental tooling

## Related

- [[People4Pulse]]
- [[People4Pulse Brand]]
- [[People4Pulse Voice]]
- [[Brunsell Lumber Stack]] · [[Educated Mortgage Stack]] — same agency tooling pattern, same `canvas` base theme
