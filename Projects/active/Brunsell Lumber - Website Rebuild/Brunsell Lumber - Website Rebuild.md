---
date: 2026-07-15
description: "Brunsell Lumber — bounded website-rebuild project. Client profile, Brand/Voice/Stack live in Clients/Brunsell Lumber/."
project: "Brunsell Lumber - Website Rebuild"
client: "Brunsell Lumber"
status: active
quarter: Q3-2026
tags:
  - work-note
  - project
  - client/brunsell-lumber
---

# Brunsell Lumber — Website Rebuild

Bounded engagement: website rebuild for [[Brunsell Lumber]] (client profile, Brand, Voice, Stack, contract detail live in `Clients/Brunsell Lumber/`).

## Build Timeline (Monday.com — Website Builds board, "Brunsell" group)

All content/design phases below are marked **Done**:

| Phase                                    | Window             | Owner             |
| ---------------------------------------- | ------------------ | ----------------- |
| Mood board                               | 2026-01-19         | Bob               |
| Design                                   | 2026-02-02 – 02-13 | Bob               |
| Env Setup                                | 2026-02-09         | Bob               |
| V1 Prototype                             | 2026-02-23 – 03-06 | Bob               |
| V2                                       | 2026-03-23 – 04-03 | Bob               |
| Content Rounds 1–5                       | 2026-03-24 – 05-29 | [[Elyse Birkett]] |
| FAQ Client Content                       | 2026-05-22         | [[Tony Hanson]]   |
| Apply Client Feedback (Rd2 & 3)          | 2026-05-29         | Bob               |
| Client Follow Up Items from 6/11 Meeting | 2026-06-11 – 06-19 | [[Elyse Birkett]] |

## Open Items (snapshot as of 2026-07-13)

Live Monday refresh 2026-07-29 still shows Bob assigned [Apply Client Feedback](https://mwfcompanies.monday.com/boards/18175047973/pulses/12582820285), due 2026-07-23 to 2026-07-24. Live item read 2026-07-29 via Composio `monday_mcp` (`MONDAY_MCP_ALL_MONDAY_API`, log `log_EcQjp4lpk55c`) found one Taylor Ripp update from 2026-07-20 with two source pointers: revisions/feedback for the Countertops, Cabinets, and Closets page in a Brunsell SharePoint document, plus a Google Sheet of site-page updates. No Monday subitems were present.

- [x] Pull the latest Brunsell "Apply Client Feedback" source docs/comments into this note and split them into concrete tasks before dispatching. #intake 📅 2026-07-24 ✅ 2026-07-29

- [x] **Local site launch error** — resolved 2026-07-07.
- [x] **New logo swap-in** — done, Bob updated it directly 2026-07-11.
- [x] **Apply Client Feedback (Rd4 & 5)** — the 5 confirmed content gaps (global FAQ installation claim, "Design Guidance" bullet on Trim & Mouldings, "cabinetry" mention on Contractor Sales, dead footer nav link, Mantels hardwoods-language overpromise) are fixed live on staging (`https://brunsell.mdmserver.us/`) as of 2026-07-11, via `agent-ops` task `2026-07-09-brunsell-rd4-5-followup-gaps` dispatched to Codex against the `novamira-brunsell-staging` Novamira MCP profile. Codex verified all 4 affected URLs render the corrected copy (live HTTP fetch, no stale strings remaining); independently spot-checked and confirmed. Took 2 failed dispatch attempts first — see [[Gotchas]] for the `dispatch.sh` false-`done` status bug and the Codex sandbox network-access fix those attempts surfaced. Still To Do on Monday.com — update the board to reflect this.
- [x] **Remove blank "Warranty Information" page** — flagged by Bob 2026-07-11: blank page linked from the footer nav on staging, already 404 on live production. Fixed same day via `agent-ops` task `2026-07-11-brunsell-warranty-page-cleanup`: footer nav entry removed, page (`ID 1545`, slug `warranty-information`) set to draft (not deleted, per instruction). Independently verified: page now 404s, footer nav no longer references it. First dispatch attempt was killed mid-run with no changes made; second attempt (run in foreground) completed cleanly.
- [x] **Client Follow Up Items from 6/23 Meeting** — To Do, Bob, due 2026-07-13–07-16. Sitewide/Stairs/Countertops items from this meeting already shipped via the Rd4&5 handoff above. The remaining Custom Millwork copy items (doors/windows typo, redundant "master crafted" phrasing, hero rename, Stairways engineering language, catch-all CTA) are queued today as `agent-ops` task `2026-07-13-brunsell-millwork-copy-cleanup`, same staging/Novamira pattern. Full checklist: [[Brunsell Lumber Stack#Codex Task Backlog (as of 2026-07-07)]].
- [x] **Cabinets, Countertops, and Closets page revision + new FAQ set (client doc, 2026-07-14)** — Brunsell sent `Website Revisions 1.odt` with finalized copy for `/products/cabinets-countertops-closets/` (title reorder, revised intro + storage-solutions paragraphs, Custom Wood Countertops process copy, supplier list) plus a large new FAQ set (Planning & Design, Cabinetry, Countertops, Remodeling Process, Installation, Budget & Pricing, Ordering & Lead Times). Treated as final copy per Bob 2026-07-14 and dispatched as `agent-ops` task `2026-07-14-brunsell-cabinets-countertops-faq-update` against staging — **done, fixed live on staging 2026-07-14.** Codex updated the page title, hero subhead, body copy, and supplier list on post `575`; routed 9 cabinetry/countertop-specific FAQs to that page's own FAQ block and 8 new general FAQs into the existing reusable/sitewide FAQ block (`wp_block` ID `2024`, alongside its 3 prior items — that block renders on the homepage, Custom Millwork, Stairs, and Contractor Sales, not on this product page, matching how it was already used pre-task). Independently spot-verified via live fetch: page title/hero/storage-solutions copy and the page-level install/financing-adjacent FAQ confirmed on `/products/cabinets-countertops-closets/`; the "financing" general FAQ confirmed live on the homepage's copy of the reusable block. Full FAQ copy (page-level + general) saved to [[Brunsell Lumber FAQ Content]] as the canonical record — Bob is trimming the live sitewide FAQ block down 2026-07-14 (too long visually) and may point to a dedicated full FAQ page for the complete list instead. **5 open questions in the doc were NOT part of this dispatch** — flagged below for Bob to resolve with Logan/Jon/Taylor before any follow-up task:
  - List cabinetry brands (StarMark, Merillat, etc.) directly on the page?
  - List countertop types (Laminate, Solid Surface, Quartz, etc.) directly on the page?
  - Wood countertop lead-time/finish detail — client flagged wanting more input from the mill shop (Todd) before publishing specifics
  - Organize the supplier list by category (cabinetry / countertops / hardware)?
  - Financing FAQ says "no financing program" — client asked whether credit applications should be mentioned instead
- [x] **Possible supplier-list change: Ultracraft Cabinets removed?** 2026-07-21 — Bob re-sent the same `Website Revisions 1` doc as a PDF (via SharePoint, dropped in `inbox/`). Content matches the 7/14 doc verbatim (page copy, FAQ set, 5 open questions above) with one difference: this copy shows "Ultracraft Cabinets" struck through in the supplier bullet list (Merillat, Starmark, ~~Ultracraft~~, Hickory, & More), while the version already shipped live 2026-07-14 still includes Ultracraft. Tried to verify against staging directly (`/products/cabinets-countertops-closets/`) but it's behind auth (403). Needs Bob to confirm with Brunsell whether Ultracraft was actually dropped as a supplier before dispatching a correction. #actionable ✅ 2026-07-29
- [x] **Brunsell logo files** — Taylor's 7/6 reply on this Monday task included a [Google Doc](https://docs.google.com/document/d/1CpF5FGZK8Ddn1XIa1TwxLXgdA7Q__YV20Ilo7LD49eA/edit?tab=t.0) with deck/door logo & brochure links, but logos embedded in a Doc aren't usable as image files directly. Bob asked Taylor (7/13) whether high-res files were available separately — **resolved 2026-07-15**: Brunsell sent the actual vendor logo SVGs directly, and they're now live on staging:
  - **Exterior Doors** (`https://brunsell.mdmserver.us/products/doors/`): Waudena Millwork, Western Building Products, TruStile, Therma-Tru — added via the site's existing "Vendor Logos" reusable block pattern (`wp_block` ID 3104, WP-admin-created, not theme code). Western's logo genuinely is a rust-colored circular "W" mark, confirmed against their own YouTube channel and site branding — initially mistaken for the WordPress logo, it isn't.
  - **Decking** (`https://brunsell.mdmserver.us/products/deckinglumber/`): Deckorators, Trex, TimberTech — same pattern, same treatment.
  - Dispatched as `agent-ops` task `2026-07-15-brunsell-vendor-logos` against the `novamira-brunsell-staging` profile — **done, verified live 2026-07-15** (Codex fetched both URLs, HTTP 200, correct logo filenames present; media attachments 3106–3112).
  - **Badger** logo (badger mascot) — deliberately excluded from this task, not in the source doc at all, doesn't map to either supplier list. Still needs a direct question to Taylor before it's used anywhere.
  - This closed out the "Vendor logos for the Door Shop suppliers section" item in [[Brunsell Lumber Stack]] → Codex Task Backlog.
### Pending / Can't Do

- [ ] **Add GA / GTM** — Backlog, unassigned. **Reassigned to SEO staff 2026-07-08**, no longer a dev/Codex task. #pending
- [ ] **Launch** — Backlog, unassigned, depends on everything above, including the 5 open questions on the Cabinets/Countertops/FAQ update (below) that need Bob to resolve with Logan/Jon/Taylor first. #pending

Source of truth for task status stays in [Monday.com — Website Builds board](https://mwfcompanies.monday.com/boards/18175047973) ("Brunsell" group). Treat this as a dated snapshot, not live state. The full technical/dev breakdown behind these Monday items, atomized into a Codex-ready backlog by priority, lives in [[Brunsell Lumber Stack]] → Codex Task Backlog.

### Content feedback detail (from meeting notes + 6/23 & 6/24 transcripts)

Client meeting docs live in the Drive [Meeting Agendas folder](https://drive.google.com/drive/folders/1smRbWmO6PP8xrJVDTWMawPDLz4OliFaF); two full transcripts (6/23 stairs/countertops review with [[Jon Mitchell]], [[Logan Kosbau]], [[Taylor Ripp]], Bob — recap in the [Monday update](https://mwfcompanies.monday.com/boards/18175047973/pulses/12352320761); 6/24 Custom Millwork deep-dive with just [[Logan Kosbau]] and [[Taylor Ripp]] — [full transcript](https://docs.google.com/document/d/1xYaQ-0JEkG4Wc8U7FjrKnZOWD9QjjW2pN7M5v0cHI78/edit)) had considerably more detail than the Monday.com task summaries — captured here.

**Sitewide**
- Keep "years in business" (88 years) static across all pages — do not update
- Sitewide: remove all remaining "professional installation" language — Brunsell no longer installs; reposition as a resource that connects customers to a contractor list ([[Logan Kosbau]]'s team is compiling it, not ready yet)
- Phase out "Request a Quote" CTA → "Request a Consultation" / "Get in Touch" (keep a lightweight quote-style form only for simple, standard lumber orders)
- Design services are free — remove any language implying a design fee; add a soft CTA to "inquire about design services" (applies to decks, trim, stairways, wood tops)
- FAQ sections are being built out — [[Logan Kosbau]] and [[Jon Mitchell]] are the sources for company-specific Q&A; global FAQs exist, [[Tony Hanson]] has been adding page-specific ones

**Stairs page**
- Remove "professional installation," "fits perfectly," and any language claiming to "design" the stairway (liability/expectation concerns) — reposition as building to the customer's/contractor's provided drawing
- Add FAQ block: over-the-post vs. post-to-post, wood species preference, style, inspiration photos, existing staircase photos/layout
- Suppliers list: remove "Leepers" (out of business), fix "Oak Point" → "Oak Pointe" (missing the e); no separate LJ Smith competitor entry needed (LJ Smith now owns the removed supplier)
- New Contractor section: "one-stop-shop" framing (Brunsell supplies materials + connects to contractors), 3–4 stairway-specific recs once the list exists

**Countertops / Cabinets page**
- Add a Wood Countertops subsection (not a separate page) — nest under the existing Countertops page
- Step-by-step process framing rather than deep technical detail: upload photos → talk to a designer → build. Keep finish descriptions high-level (3 finishes: bar top, oil/cutting-board finish, "the good stuff") without over-explaining differences unless asked
- Lead times vary by finish/raw-vs-finished — flag as "ask us" rather than publishing specifics; Todd (mill shop) may weigh in later
- Link this section from the Custom Millwork page too (both entry points are fine per Jon/Logan)
- **2026-07-14 update:** client sent finalized page copy (`Website Revisions 1.odt`) superseding the framing above — title reorders to "Cabinets, Countertops, and Closets," intro/storage-solutions paragraphs revised, Wood Countertops process copy locked (upload photos → talk to a designer → we build it; 3 finishes: bar top, oil/cutting-board finish, "the good stuff"), supplier list confirmed (Merillat, Starmark, Ultracraft, Hickory, & More). Treated as final and dispatched to Codex — see Open Items above. 5 client questions in the doc left unresolved, see Open Items.

**Kitchen & Bath FAQ (new, from the same 2026-07-14 client doc)**
- Client supplied a large FAQ set spanning Planning & Design, Cabinetry (stock/semi-custom/custom, framed/frameless/inset), Countertops (material comparison, install), Remodeling Process (timelines), Installation (contractor network, on-site measuring), Budget & Pricing, and Ordering & Lead Times (4–8 wk cabinetry, ~3 wk countertops)
- Treated as final copy, dispatched to Codex alongside the page revisions above — cabinetry/countertop-specific Q&As placed on the Cabinets/Countertops/Closets page, general ones (process, installation, budget, ordering) routed to the sitewide FAQ per existing convention ([[Tony Hanson]] has been the source for page-specific FAQ additions to date)

**Custom Millwork page** (from 6/24 working session)
- Fix a copy error: "highest quality windows" under Doors should say doors, not windows
- Remove redundant "master crafted"/"master craftsman" phrasing (says the same thing twice)
- Hero section: "Unlimited Choices and Spectacular Results" → "Customer Solutions and Spectacular Results" (customers want a solution, not more choices)
- "Hand Selected Hardwoods" bullet: remove "premium" and "superior grain match" — overpromising on a natural, variable material. Consider ending the sentence after "individually selected wood species" rather than elaborating
- Doors: rename to "Custom Doors," clarify both interior and exterior are offered
- Mantels: rename/expand to "Mantels, Columns and Beams" (Logan sending photos)
- Stairways: remove "precision engineering" and "holistic approach" — legal/expectations concern, they build to a provided drawing/code but don't do structural engineering themselves
- Consider a "Trims, Moldings and Panels" grouping for low-volume items (feature walls, nickel-gap siding) — maybe 1-2 jobs/year, still worth a quote-form catch
- Add a generic "Other services we offer / Don't see what you need? Talk to a millwork professional" catch-all CTA
- Dimensional lumber (S2S/S4S): don't use the jargon in customer-facing copy — keep it vague ("select species," "other things we provide"); maybe one FAQ entry explaining S2S vs. S4S for contractor-savvy visitors
- Portfolio/craftsmanship photos need refreshing — many are from the old site; Logan will source new jobsite photos (acknowledged as hard to get, since Brunsell rarely sees the finished install)
- "Blog" section is coming back but needs a different label — "blog" reads as dated; no replacement term decided yet
- Confirmed: keep both "Custom Builder" (Services) and "Custom" (Products) nav entries — intentional, covers two different customer mental models

**Misc / needs follow-up, not yet a formal task**
- Google Business Profile: an ex-employee may still hold admin access to the GBP listing — need to either start reclaiming it or send Brunsell steps to do so themselves (see Monday item "Brunsell GBP Help")
- Testimonials: want real project photos alongside quotes, not stock — Logan to send project photos, Bob to add stock placeholders in the meantime
- Footer: add a "back to top" button
- Products page IA: combining Countertops/Cabinets/Closets, nesting Mantels/Trim-Mouldings/Stairs under Custom Millwork, combining interior+exterior Doors, possibly dropping "Tools" — Hannah was updating the sitemap doc to match

## Local Build

- Repo: `/Users/bobmoore/Dev/Sites/1064.brunsell.com` — WordPress via `@wordpress/env`, served at `localhost:1064` (tests on 1065)
- Theme: `themes/brunsell` (custom, uses Timber/Twig) — see [[Brunsell Lumber Stack]] for what we own (theme + mwf-cornerstone) and the pre-launch cleanliness checklist
- Environments: local (`localhost:1064`) → staging (https://brunsell.mdmserver.us/) → live (https://brunsell.com/)
- Branches: `dev` (active work), `main`
- 63 plugins, composer-managed, mu-plugins in use
- Currently pre-launch — recent commits are styling work (nav blocks, archive/product grids, blog post image fixes)

### Launch error (2026-07-07) — root cause confirmed, fix pending

Not a PHP fatal (the mwf-cornerstone/theme `Main` swallowed-error theory from initial investigation was a red herring). Actual error is `wp-env` failing on startup:

```
error: Your local changes to the following files would be overwritten by checkout: ...
error: The following untracked working tree files would be overwritten by checkout: ...
GitError: ... task: { commands: [ 'checkout', '7.0' ] }
```

**Cause:** `wp-env` manages WP core as a git checkout pinned to ref `7.0` (not set in this repo's `.wp-env.json`, which has `core: null` — likely set via a manual `wp-env start --core WordPress/WordPress#7.0` while testing the WP 7 prep work, per the "Fixed navigation block styling for upcoming WP 7 release" commit). The untracked files in the error (`wp-includes/ai-client.php`, `class-wp-connector-registry.php`, `collaboration.php`, `breadcrumbs`/`icon` blocks, `view-transitions.css`) are genuine WP 7.0 core additions — consistent with the installed `wordpress-beta-tester` plugin having unzipped a newer core build directly onto disk from wp-admin, bypassing git. That leaves the cached core checkout dirty, so `wp-env start`'s own `git checkout 7.0` sanity check aborts.

**Fix (Bob to run, on his machine):**
- Fast but wipes local DB/site state (media in `uploads/` is safe, bind-mounted): `wp-env destroy && wp-env start`
- Surgical, keeps DB: find the cache dir (`ls ~/.wp-env`), `cd ~/.wp-env/<hash>/WordPress`, `git checkout -- .`, `git clean -fd`, then `wp-env start`
- Going forward: avoid switching core versions via the Beta Tester plugin while wp-env manages the same folder via git — pin `"core": "WordPress/WordPress#7.0"` in `.wp-env.json` instead if WP 7 compatibility testing is ongoing, so it's reproducible and git-owned.

## Related

- [[Brunsell Lumber]] — client profile
- [[Brunsell Lumber Brand]] · [[Brunsell Lumber Voice]] · [[Brunsell Lumber Stack]] · [[Brunsell Lumber FAQ Content]]
- [[John Dees]] · [[Leia]] · [[Elyse Birkett]] · [[Taylor Ripp]] · [[Tony Hanson]]
- [Client Exchange (Google Drive)](https://drive.google.com/drive/folders/1chyUl0cnZsYaTHWurg88TDS7jqEMGizp)
- [Website Builds board (Monday.com)](https://mwfcompanies.monday.com/boards/18175047973)
- [[Projects/Index|Project Index]]
