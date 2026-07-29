---
date: 2026-07-07
description: "What we actually build/own for Brunsell Lumber: the theme and the mwf-cornerstone mu-plugin. Both need to be clean before launch."
tags:
  - reference
  - client-stack
  - client/brunsell-lumber
---

# Brunsell Lumber — Stack

Reference for the parts of the stack we're directly responsible for on [[Brunsell Lumber]]. Everything else in the repo (63 plugins, third-party mu-plugins) is either a client requirement or agency-standard tooling we don't author — this note is scoped to what *we build*, since that's what needs to be clean before launch. Expect this to shift as the build evolves.

## Environments

| Environment | URL / Path |
|---|---|
| Local repo | `/Users/bobmoore/Dev/Sites/1064.brunsell.com` |
| Local (wp-env/Docker) | `localhost:1064` (tests on 1065) |
| Staging | https://brunsell.mdmserver.us/ |
| Live/Production | https://brunsell.com/ |

**Hosting:** [[Cloudways API|Cloudways]] (per Bob, 2026-07-10 — one of the agency's currently-hosted clients).

## What we build

### Theme — `themes/brunsell`
- Custom Full Site Editing (FSE) block theme, v1.1.0
- Requires PHP 8.2, requires WP 6.4+, tested up to 6.6
- Bootstraps via `functions.php` → `namespace Mwf\Canvas` → loads `vendor/scoped/autoload.php`, `vendor/scoped/scoper-autoload.php`, `vendor/autoload.php` → instantiates `Main` and calls `mount()`, wrapped in a try/catch that swallows `\Error` to Query Monitor + the debug log
- Appears to extend/share code with a `themes/canvas` base theme (uncommitted SCSS/CSS work in progress there as of 2026-07-07: `_masthead.scss`, `_widgets.scss`)

### mu-plugin — `mu-plugins/mwf-cornerstone.php` + `mu-plugins/mwf-cornerstone/`
- "Mid-West Family Cornerstone" — agency-wide custom mu-plugin, v6.1.0, shared across MWF client sites (not Brunsell-specific)
- Own composer/npm project: PHP-DI service container (`ServiceLocator`), controllers (`ProcessorController`, `ServiceController`, `ContextController`, `ProviderController`, `MiddlewareController`), own `tests/`, `dev/`, `src/`
- Same bootstrap pattern as the theme: scoped autoloaders → `new Main(); $plugin->mount();` in a try/catch that swallows `\Error`
- Uses `wpify/scoper` (composer-deps.json/lock) to prefix vendor dependencies and avoid collisions with other plugins on the same site

## AI Access (Novamira)

[Novamira](https://novamira.ai) is installed on local, giving an MCP-compatible client running on this machine full PHP execution, WP-CLI, database, and file access. In the current role model, `developer` owns version-controlled code while `wordpress-operator` owns mutable site state; the active parent selects the reachable Novamira-capable runtime, verifies the result, and retains revision ownership.

**Staging now configured (2026-07-09)** — Bob wired up a Novamira connection on staging (`https://brunsell.mdmserver.us/`). This surfaced schema drift: the repo's `.env`/`codex-mcp.sh` were still on an old flat, single-profile contract with no defined slot for a second environment, so the new staging password landed as an orphaned `WP_STAGING_API_PASSWORD` key with no matching URL/username/server-name. Fixed same day as part of a vault-wide schema standardization — see [[Novamira Env Schema]] for the canonical contract now in place here (local + staging profiles, no alias/fallback keys). `bin/scripts/codex-mcp.sh` was upgraded to the profile-based version already in use on [[Educated Mortgage Stack|Educated Mortgage]] and `1000.systeminstall.com`. `WP_STAGING_API_USERNAME` is `M1dwestDigital` (confirmed by Bob — the standard Novamira/WP admin username across all sites, same as local and every other client repo).

| Environment | Novamira installed? | MCP client configured |
|---|---|---|
| Local (`localhost:1064`) | Yes | Codex CLI |
| Staging (`brunsell.mdmserver.us`) | Yes (2026-07-09) | Codex CLI — ready to install with `bin/scripts/codex-mcp.sh --profile staging install` |
| Production | Not recommended — dev/staging only per Novamira's own guidance | |

Not reachable from Cowork or any cloud-based session, `localhost:1064` only resolves on the machine actually running the local install (staging is a real remote server, reachable from anywhere Codex runs). Handoff specs can lean on Codex's live introspection (query the DB, check active plugins, run WP-CLI, execute PHP to verify) rather than needing to over-specify implementation detail up front.

## Pre-launch cleanliness checklist

Both of these need a clean pass before launch — nothing site-breaking, no swallowed fatal errors, no leftover debug scaffolding:

- [ ] Root `mwf-cornerstone.php`: uncommitted diff as of 2026-07-07 adds a `do_action("qm/debug", ...)` trace line and a stray blank line inside the catch block — looks like active debugging, not finished work. Resolve and commit (or revert) before launch.
- [ ] Uncommitted `themes/canvas` SCSS/CSS changes (masthead, widgets) — finish and commit.
- [ ] `wordpress-beta-tester` and `performance-lab` plugins are present in `plugins/` — confirm these are dev-only and not meant to ship to staging/production; the git history ("Fixed navigation block styling for upcoming WP 7 release") suggests local may be running a WP 7 beta/nightly core, which is worth double-checking isn't accidentally the target for staging/live.
- [ ] Both `Main` classes (theme + mwf-cornerstone) silently swallow `\Error` via `catch (\Error $e) { error_log(...) }` — fine for resilience, but means fatal wiring issues can go unnoticed unless someone's watching the debug log. Worth keeping an eye on `uploads/debug.log` during QA.

## Codex Task Backlog (as of 2026-07-07)

Compiled from the Website Builds board ("Brunsell" group), the SEO/CRO & Content and Web Updates & Maintenance boards, and the Meeting Agendas Drive folder (March–June 2026 notes, plus the fuller 6/23–6/24 detail already captured in [[Brunsell Lumber]] "Content feedback detail"). This is the working list the orchestrator should route one bounded item at a time: repository code to `developer`, mutable WordPress state to `wordpress-operator`, and hybrid work in that order. Do not dispatch the whole backlog as one task.

**2026-07-08 — full-backlog handoff written and scoped to Bob's assigned tasks only**, saved directly in the repo at `.codex/handoff-brunsell-backlog-2026-07-08.md`, since it was meant to be read by Codex CLI locally rather than filed as a vault note. Includes drafted replacement copy per [[Brunsell Lumber Voice]] for every content-dependent item. Phone number resolved (608-275-7171, `tel:6082757171`, Mount Horeb number to be removed). GA/GTM pulled out of the handoff entirely and reassigned to SEO staff, not a Codex/dev task going forward. Redirects for the two deleted pages are also being handled separately by the SEO team (Bob opening that task himself) — Codex just deletes/unpublishes, no redirect setup. Products page IA restructuring intentionally excluded, still needs Hannah's sitemap doc first. Once Codex works through it, update the checkboxes below and delete/archive the handoff file per normal convention. Bob is initializing Codex in his terminal against this handoff next.

### Blocking

- [x] **Local wp-env launch error** — resolved 2026-07-07. Nothing else on this list is blocked anymore.

### Ready for Codex now (scope is clear, no missing client assets)

**2026-07-09 QA pass — verified live against staging** (`https://brunsell.mdmserver.us/`) by browsing the actual pages, not just trusting the handoff file's own claims — most items below check out live. Correction: the `.codex/handoff-brunsell-backlog-2026-07-08.md` file was earlier assumed deleted per normal convention; confirmed 2026-07-09 that it's still present on disk (a `Glob` lookup on the dot-directory path returned a false negative — `.codex/` paths are unreliable with `Glob` in this environment, `find`/`ls` is the reliable check). Not yet archived/deleted; do that once someone confirms Codex fully worked through it. 4 confirmed gaps + 1 inconsistency queued as a follow-up `agent-ops` task: `2026-07-09-brunsell-rd4-5-followup-gaps` — **all 5 fixed live on staging 2026-07-11**, third dispatch attempt succeeded after fixing two dispatcher bugs (see [[Gotchas]]: `dispatch.sh` false `done` status, Codex sandbox network access), independently verified via live fetch against all 4 affected URLs.

- [x] Fix broken internal link: Custom Millwork page's "Stairways" link currently points to a window page instead of the Stairways page — **done, Codex fixed it 2026-07-08.** Re-verified live 2026-07-09: `/products/custom-millwork/` → "Stairways" card correctly links to `/products/custom-millwork/stairs/`.
- [x] ~~Delete `/services/installation/` page~~ — **confirmed live 2026-07-09: returns 404.** Redirect handled separately by SEO team. **New gap found**: footer nav still has a "Services > Installation" entry pointing at this now-dead URL — queued in the follow-up task.
- [x] ~~Delete `/services/tool-repair/` page~~ — **confirmed live 2026-07-09: returns 404.**
- [x] ~~Sitewide CTA audit~~ — **spot-checked 4 pages live 2026-07-09** (`/products/custom-millwork/`, `/trim-mouldings/`, `/mantels/`, `/services/contractor-sales/`): no "Request a Quote" found anywhere, all CTAs read "Get in Touch," "Start Your Project," or "Connect With a Rep." Not an exhaustive sitewide check, but no misses in the pages sampled.
- [x] ~~Sitewide "installation" language sweep~~ — **fixed live 2026-07-11** via the `agent-ops` follow-up task: the shared/global FAQ item ("Do you offer installation services?") now answers in line with the site's "Brunsell doesn't install" framing, confirmed on all 4 affected pages by independent live fetch.
- [ ] Footer: phone number / Mount Horeb removal — not re-verified in this pass, still open.
- [x] ~~Footer: add a "back to top" button~~ — **confirmed live 2026-07-09**, present on every page checked.
- [ ] Footer: verify social icon hover states — not re-verified in this pass, still open.
- [x] ~~Custom Millwork page: rename "Doors" → "Custom Doors"; "Mantels" → "Mantels, Columns and Beams"~~ — **confirmed live 2026-07-09**, both labels correct on `/products/custom-millwork/`.
- [ ] Products page IA restructuring — not re-verified, still pending Hannah's sitemap doc per original note.
- [x] ~~New page section: Wood Countertops~~ — **confirmed live 2026-07-09**: nested correctly at `/products/cabinets-countertops-closets/#wood-countertops` (not a standalone page), linked from the Custom Millwork page as a card. Matches the 6/23 update.
- [x] ~~New reusable "Partner with Us" / Contractor section~~ — **confirmed live 2026-07-09** on `/services/contractor-sales/` (framing, volume pricing, dedicated account manager, standing orders) and on `/products/custom-millwork/mantels/` (Brunsell-doesn't-install framing). Content is live even though contractor list itself is still pending Logan. One structural note: on Contractor Sales, "Partner with Us" landed as its own standalone section rather than literally a 4th tab inside the "Your Plan to Success" tab group (Design Custom Solutions / Build and Profit / Connect With a Rep) — functionally fine, flagging only in case the tab placement mattered to the client.

**2026-07-13 — remaining Custom Millwork copy items from the 6/23–6/24 meeting notes, never previously atomized into a Codex task.** Queued today as `agent-ops` task `2026-07-13-brunsell-millwork-copy-cleanup`:
- [ ] Doors subpage: copy error says "windows" instead of "doors" in one sentence
- [ ] Doors subpage: clarify both interior and exterior custom doors are offered
- [ ] Custom Millwork index: remove redundant "master crafted"/"master craftsman" phrasing
- [ ] Custom Millwork index: hero rename "Unlimited Choices and Spectacular Results" → "Customer Solutions and Spectacular Results"
- [ ] Stairways subpage: remove "precision engineering" / "holistic approach" phrasing
- [ ] Custom Millwork index: add a catch-all "don't see what you need? talk to a millwork professional" CTA

**New gap found in this pass, not on the original list — all 3 fixed live 2026-07-11 via the `2026-07-09-brunsell-rd4-5-followup-gaps` follow-up task, confirmed by independent live fetch:**
- [x] ~~`/products/custom-millwork/trim-mouldings/` — "Design Guidance" bullet under "Transform Your Space" was supposed to be removed, still live.~~ Bullet removed, other 4 bullets (Precision Milling, Premium Selection, Exotic & Specialty Sourcing, Lasting Value) confirmed intact.
- [x] ~~`/services/contractor-sales/` — "Premium Custom Millwork" bullet still says "...millwork, casework, and cabinetry" — "cabinetry" wasn't removed.~~ Now reads "...custom millwork and casework."
- [x] ~~**Hardwoods-language inconsistency between pages**~~ — **Decision made 2026-07-11 (Bob): standardize on the Custom Millwork index page's restrained direction.** Mantels page rewritten to drop the "precision match for both grain and color" guarantee; confirmed no longer present live.

### Blocked on client assets (scope now, don't finalize content yet)

- [x] ~~Vendor logos for the Door Shop suppliers section (Logan sending)~~ — **done, live on staging 2026-07-15** via `agent-ops` task `2026-07-15-brunsell-vendor-logos`. Both pages use the existing "Vendor Logos" reusable pattern (`wp_block` ID 3104): Doors (`/products/doors/`) got Waudena, Western Building Products, TruStile, Therma-Tru; Decking (`/products/deckinglumber/`) got Deckorators, Trex, TimberTech. Verified live via HTTP fetch. The unrelated Badger logo file was intentionally excluded — still pending a category answer from Taylor, see [[Brunsell Lumber]] Open Items.
- [ ] Contractor recommendation list for the Stairs FAQ + Partner with Us sections (Logan's team compiling)
- [ ] Real project photos for testimonials + portfolio, replacing stock (Logan sourcing; Bob already added stock placeholders as a stopgap per the April meeting)
- [ ] Wood countertop photos, species, and finish detail (Logan)
- [ ] Columns and Beams product info (Logan)
- [ ] Drone footage — facility, Mount Horeb, mill shop flyover (scheduling pending on Brunsell's end)

### Verify / low-risk

- [ ] Careers tab in main nav — asked March, confirm it's still there
- [ ] Global testimonial section has stock placeholder images in place (asked April)

### Deferred / not yet scoped (from 6/23–6/24 meeting notes, low priority or undecided)

- [ ] S2S/S4S dimensional-lumber FAQ entry (contractor-facing, optional) — no copy decision made yet
- [ ] "Trims, Moldings and Panels" grouping — low volume (~1–2 jobs/yr), not prioritized
- [ ] "Blog" section rename — replacement label not yet decided
- [ ] Dedicated full FAQ page — raised 2026-07-14 as a possible home for the complete FAQ set ([[Brunsell Lumber FAQ Content]]) once the live sitewide block is trimmed for length; not yet scoped

### Final

- [ ] **Launch** (Monday: Website Builds, Backlog, unassigned) — depends on everything above plus the local build fix

### Reassigned, not ours

- [ ] Add GA / GTM (Monday: Website Builds, Backlog, unassigned) — **reassigned to SEO staff as of 2026-07-08**, not a Codex/dev task, pulled from the handoff backlog

## Related

- [[Brunsell Lumber]]
- [[Brunsell Lumber Brand]]
- [[Brunsell Lumber Voice]]
