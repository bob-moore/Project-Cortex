---
date: 2026-07-10
description: "SFI tech stack — existing live WordPress site (Beaver Builder-era + FoundrySE framework present), enhancements in place via wp-env. Not a rebuild."
tags:
  - reference
  - client-stack
  - client/systems-furniture-installations
---

# Systems Furniture Installations — Stack

Reference for the parts of the stack we directly build/own for [[Systems Furniture Installations]]. Unlike [[Educated Mortgage Stack]] or [[Brunsell Lumber Stack]], this is **not** a rebuild — the live WordPress site is being enhanced in place (homepage/content rewrite + CRO), so there's no "old site vs. new site" split to track.

## Environments

| Environment | URL / Path | Notes |
|---|---|---|
| Local repo | `/Users/bobmoore/Dev/Sites/1000.systeminstall.com` | Folder name has a typo (missing the second "s" — `systeminstall`, not `systemsinstall`), same pattern as the "Educated Mortage" typo noted in [[Educated Mortgage Stack]]. GitHub: `MDMDevOps/systemsinstall.com` (branch `main`) |
| Local (wp-env/Docker) | `localhost:1000` | |
| Staging | `https://systemsinstall.mdmserver.us/` (inferred) | Follows the agency's standard `{domain}.mdmserver.us` staging pattern (bare domain, no `.com`) — **not yet directly confirmed live**, verify before relying on it |
| Live/Production | https://www.systemsinstall.com/ | **Correcting the domain guess from kickoff**: it's `systemsinstall.com` (with the "s" — "Systems"), not `systeminstall.com`. Confirmed via Drive research docs, Git remote, and a direct fetch (2026-07-10). |

Git history is a single `init` commit (2026-06-16) — this repo is a fresh pull of the live site into the agency's `wp-env` workflow for this engagement, not an ongoing build with history to review.

**Hosting:** [[Cloudways API|Cloudways]] (per Bob, 2026-07-10 — one of the agency's currently-hosted clients).

## What we build

### Theme — `themes/sfi`
- A classic (pre-FSE) theme from SFI's original MDM-era build — see [[WordPress Stack Evolution]]. Not built on the current `canvas` base; this site hasn't been migrated to the current stack, and enhancement work here doesn't imply that's in scope.
- `bb-plugin` + `bb-ultimate-addon` + `wpcl-beaver-extender` are active plugins — matches the classic-era pattern: the live site is built with Beaver Builder page-builder content, not Gutenberg/FSE blocks.
- `themes/foundry-se` is also present in this repo — that's Bob's own personal framework (see [[harness/user|User]]), not an agency theme. Its presence here is incidental/for his own reference, not part of SFI's actual build; don't assume it's wired into the live site.

### mu-plugins
- **Both** `mdm-cornerstone` and `mwf-cornerstone` are present. Resolved (2026-07-10, see [[WordPress Stack Evolution]]): `mwf-cornerstone` is the current, load-bearing one; `mdm-cornerstone` is a leftover from SFI's original MDM-era build (this site predates the `canvas`/`mwf-cornerstone` stack). Don't assume `mdm-cornerstone` needs the same care as `mwf-cornerstone`, but confirm it's genuinely unused before removing it.
- `wp-migrate-db-pro-compatibility.php`

### Notable plugins
- `gravityforms` — powers the contact form
- `wordpress-seo` (Yoast), `wp-schema-pro` — on-page SEO and schema
- `google-site-kit` — confirmed live (site's `meta-generator` tag shows Site Kit by Google 1.182.0)
- `cloudflare` — confirmed live (email obfuscation via `cdn-cgi` on the live site)
- `mwf-blocks`, `block-visibility`, `wp-nested-pages`, `custom-post-widget`
- `object-cache-pro`, `ewww-image-optimizer` (performance/image optimization)
- `jetpack`, `mailchimp`, `mailgun`, `akismet`, `wordfence`
- `wp-migrate-db-pro` (+ zip) — matches the `pull:`/`push:` composer scripts below

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
    "port": 1000,
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

Same `mwf/wp-env-config` composer automation as other MWF/MDM client repos (`pull:plugins`/`push:plugins`, `pull:themes`/`push:themes`, `pull:uploads`/`push:uploads`, `sshstaging` alias, `mcp:*` scripts for Codex setup) — see [[Educated Mortgage Stack]] and [[Brunsell Lumber Stack]] for the same pattern elsewhere. `core: null` means the WordPress core version is unpinned — same reproducibility caveat flagged on those two repos; worth pinning before this matters for a launch-critical task (lower priority here since there's no cutover event).

## Existing client-context files (already in the repo)

Unusually, this repo already had a thorough onboarding-style research pass done directly inside it (2026-06-16 session, before this vault folder existed) rather than in the vault. Load these when picking up any content/SEO task for this client — most of [[Systems Furniture Installations Brand]] and [[Systems Furniture Installations Voice]] were ported from here:

| File | Contents |
|---|---|
| `context.md` | Full project overview, current status, audience research (real buyer questions by segment), high-value content/blog opportunities, competitor summary |
| `client-brand-brief.md` | Full brand brief — source for [[Systems Furniture Installations Brand]] |
| `competitor-research.md` | Five-company competitive analysis (Resource One, Coakley Brothers, On Point Installations, Precision, Johnson Commercial Solutions) |
| `homepage-copy-deck.md` | Primary active deliverable — full homepage copy draft, SEO metadata, JSON-LD schema, dev checklist |
| `documents/meeting-notes.md` | 2026-06-15 kickoff meeting notes; all client-approved homepage copy |
| `documents/screencapture-systemsinstall-2026-06-15-15_59_05 (1).png` | Homepage screenshot as of 2026-06-15 |

## AI Access (Novamira)

**Not confirmed.** No `novamira` reference found in `plugins/`, `mu-plugins/`, or the repo's `.env`/config files as of 2026-07-10 — unlike [[Educated Mortgage Stack]] and [[Brunsell Lumber Stack]], which both have it live. If a future task needs live PHP/WP-CLI/DB access via Codex CLI, check the WP admin bar for a "Novamira ON" indicator first; if absent, it isn't installed here yet.

| Environment | Novamira installed? | MCP client configured |
|---|---|---|
| Local | Not confirmed | Not configured |
| Staging | Not confirmed | Not configured |
| Production | Not recommended — dev/staging only per Novamira's own guidance | |

## Site cleanup checklist (client-flagged, not a launch — site is already live)

- [ ] Footer: "Additional facility located in Brookfield" → New Berlin (still live 2026-07-10)
- [ ] Scrub all "Brookfield" mentions → New Berlin
- [ ] Scrub all "15 years" mentions → "over 20 years"
- [ ] Remove current homepage testimonials (still live 2026-07-10) until replacements are sourced — see Compliance section in [[Systems Furniture Installations Brand]]
- [ ] Fix LinkedIn link — currently points to Tara Wolf's personal profile (still live 2026-07-10), needs the SFI company page URL from the client
- [ ] "DIRTT" image label → "Demountable Walls"
- [ ] Sticky header/nav (dev task)
- [ ] "Request a Quote" button, far right of header (dev task)
- [ ] Utility bar above nav: service area (visual per client preference, not "...and Illinois" spelled out) + phone + email (dev task)
- [ ] Confirm staging is actually live at `systemsinstall.mdmserver.us` before relying on that URL in any handoff

## Related

- [[Systems Furniture Installations]]
- [[Systems Furniture Installations Brand]]
- [[Systems Furniture Installations Voice]]
- [[Educated Mortgage Stack]] · [[Brunsell Lumber Stack]] — same agency tooling pattern (`mwf/wp-env-config`, cornerstone mu-plugin), different engagement type (rebuild vs. enhancement-in-place)
