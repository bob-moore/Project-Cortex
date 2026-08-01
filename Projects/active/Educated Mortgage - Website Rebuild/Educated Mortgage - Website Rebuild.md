---
date: 2026-07-15
description: "Educated Mortgage — bounded website-rebuild project. Client profile, Brand/Voice/Stack live in Clients/Educated Mortgage/."
project: "Educated Mortgage - Website Rebuild"
client: "Educated Mortgage"
status: active
quarter: Q3-2026
tags:
  - work-note
  - project
  - client/educated-mortgage
---

# Educated Mortgage — Website Rebuild

Bounded engagement: website rebuild for [[Educated Mortgage]] (client profile, Brand, Voice, Stack, Design Tokens, contract detail live in `Clients/Educated Mortgage/`).

## Build Timeline (Monday.com — Website Builds board, "Educated Mortgage" group)

| Phase | Window | Owner | Status |
|---|---|---|---|
| Discovery Meeting | 2026-04-03 | [[Elyse Birkett]] | Done |
| Env Setup | 2026-04-13 | Bob | Done |
| V1 Prototype | 2026-04-13 – 04-24 | Bob | Done |
| Content Check on V1 | 2026-04-28 | [[Tony Hanson]] | Done |
| Update Page Organization | 2026-05-01 | Bob | Done |
| Client approval on V1 | 2026-05-15 | [[Elyse Birkett]], [[Taylor Ripp]] | Done |
| Revisions to V1 nav & old image | 2026-05-14 – 05-26 | Bob | Done |
| Content buildout | — | [[Elyse Birkett]] | Done |
| Build out Lead Form | 2026-06-03 | Bob | Done |
| Apply Client Feedback | 2026-06-05 | Bob | Done |
| Apply Content Feedback 2 | 2026-06-12 | Bob, [[Taylor Ripp]], [[Elyse Birkett]] | Done |
| Second Iteration — adding new page, app links | 2026-07-09 | Bob, [[Elyse Birkett]], [[Taylor Ripp]] | **Done** (dev complete 2026-07-09 via `agent-ops`/Codex — see Open Items) |
| Launch | Backlog | unassigned | Backlog |
| Add GA / GTM | Backlog | unassigned | Backlog |
| Final invoice & add hosting/maintenance (PM) | Backlog | unassigned | Backlog |

Source of truth for task status: [Website Builds board (Monday.com)](https://mwfcompanies.monday.com/boards/18175047973) ("Educated Mortgage" group). Treat this table as a dated snapshot (as of 2026-07-09), not live state.

## Open Items (snapshot as of 2026-07-09)

- [x] **Apply Client Feedback (round from 2026-07-20 call).** Monday item still **To Do** (id [12581451369](https://mwfcompanies.monday.com/boards/18175047973/pulses/12581451369), due 7/21–23) — the item itself had no description, only an Updates comment from [[Elyse Birkett]] (2026-07-20) with the actual feedback, which hadn't been pulled into the vault until this pass. [Transcript from the call](https://docs.google.com/document/d/1wVky5atPaZZlS9waA6U6UO62XbWGTLHh-ayTkExqF8U/edit?tab=t.0#heading=h.9gkzk3hyjqp9). Elyse's notes, itemized:
  - [x] Logo visibility — still don't love it; may need a white bar at the top; check how logo/menu display on the privacy policy page specifically
  - [x] Remove "educated mortgage" text running at the top of every page
  - [x] Remove "smartest way home" banner — can swap in "free consult" as the banner copy if we want to keep a banner at all
  - [x] Hero: add IL — "Home Loans & Mortgage Consult In Wis & IL"
  - [x] Trim the hero subheader — Dan's okay either way, but it must either list every product or go fully simplified (e.g. "conventional and refinance loans," dropping FHA, etc.)
  - [x] "Cash Advantage" → "**Ca$h Advantage**" consistently, sitewide
  - [x] Clear Advice section rework: *"As an independent mortgage banker we provide all products and low rates to confidently do business with one company. No wasting time with several banks or brokers."* — **he is not a mortgage broker**, don't call him one. Per the raw transcript, also fix a specific capitalization bug in the existing copy here: "Mortgage Banker" is capitalized mid-sentence like a proper noun (Elyse called it out as camelCase-style) when it's used generically — this is distinct from the sitewide capitalization sweep below and worth checking directly when reworking this section's copy.
  - [x] Punctuation consistency — all pages
  - [x] Remove inconsistent/"weird" capitalizations within body copy (section headers are fine as-is) — all pages
  - [x] Footer: unbold "Telephone Number" label; remove the period after the phone number; remove the period after the license number
  - [x] Ca$h Advantage page: H1 "What Is a Ca$h Advantage Program?" → "What Is **Our** Ca$h Advantage Program?". **Root cause identified (per Bob): the stray capital in "Ca$H" is a rendering artifact, not a content bug** — the heading style applies `text-transform` that mis-treats the `$` as a word boundary and re-capitalizes the letter after it, so "Ca$h" renders as "Ca$H." This matches what Elyse saw when copying the heading text and getting a lowercase "h" back — the underlying source text is already correct; no copy edit fixes this. The fix belongs in the heading's CSS/theme styling, not a find-replace on content.
  - [x] FAQ page: update "since 1998" → "since 2006" (sitewide sweep if it appears elsewhere too). Context from the transcript: 1998 is when Dan personally started as a loan officer; 2006 is when Educated Mortgage itself was founded/registered (per Articles of Organization, December 2006) — 2006 is the correct "since" date for the company.
  - [x] Accessibility page: fix inconsistent capitalization on ".Com" — likely the same `text-transform` root cause as the Ca$h Advantage heading above (punctuation mid-word getting treated as a word boundary); confirm it's a heading using the same style before treating this as a content edit rather than a CSS fix.
  - [x] Add the Servicing and Down Payment Assistance pages to the nav dropdown — per the raw transcript this is two links, not one, and both need their actual destinations verified as correct ("go to the right place"), not just added to the menu.
  - [x] **Borrower portal link — resolved.** The `/application` path (`www.educatedmortgage.com/application`, also the destination of the QR code printed on business cards) needs to redirect to the new borrower portal: **`https://myloan.educatedmortgage.com/dr/c/dgfl9`**. Source: Dan O'Brien emailed this exact ask + URL to Elyse 2026-07-10 ("Fwd: application - QR code"), forwarded to Bob 2026-07-13 — Elyse's Monday note and the 2026-07-20 call transcript ("the Ber[rower] portal... yesterday it was going to the old one") both confirm this was still unresolved as of the call, i.e. the redirect hadn't gone out yet. Now unblocked — dispatch as a redirect (same pattern as the other `.php`→clean-slug redirects above).
- [x] **Second Iteration — adding new page, app links.** In progress. Confirmed via the 2026-06-25 and 2026-07-08 "Educated Mortgage / MWF Website Touch Base" meetings (both attended, neither has a Drive transcript — outcome not otherwise captured in email): a new mortgage app went live 2026-07-01, and the site needs 3 links updated/added — Apply Now (app), CRM, and Down Payment Assistance (a subscription service not yet purchased as of 6/25). Staging footer already shows Apple/Google Play app buttons (`apple-app-button.webp`, `play-store-button.webp`) — likely covers the app-store-badge part of this.
- [x] Redirects for legacy `.php` URLs → new clean slugs via the Redirection plugin — 36 confirmed mappings queued as an `agent-ops` task (`2026-07-09-edumtg-legacy-redirects-phase1`), dispatched to Codex 2026-07-09. Remaining gaps for a Phase 2 pass, confirmed against the "EducatedMortggage.com New Sitemap Pages" Drive sheet: `/testimonials.php` (new-build `/about-us/testimonials/` page exists but needs a human content check before redirecting into it) and city-specific WHEDA first-time-homebuyer pages not yet mapped to any new-build equivalent (`/appleton-wheda-first-time-home-buyer.php`, `/brookfield-wheda-first-time-home-buyer.php`, `/eau-claire-wheda-first-time-home-buyer.php`, likely more not yet seen — the sitemap doc's WHEDA row says the new build should have "all cities" but currently only has one general WHEDA page). Flagging for Cowork to scope into a Phase 2 task rather than writing one directly.
- [x] **New pages needed: SMS Terms & Conditions + Privacy Policy.** Dan O'Brien emailed Elyse two docx attachments on 2026-07-07, forwarded to Bob same day. Requirement: add as 2 separate pages, linked in the footer of every page, needed for Twilio SMS approval. **Checked Monday.com 2026-07-09: not yet logged** — Elyse said she would, hasn't landed on the Website Builds board's Educated Mortgage group yet, follow up with her. Content extracted and page/footer spec written up in [[Educated Mortgage SMS TC and Privacy Policy Pages]] (2026-07-09), queued as an `agent-ops` task (`2026-07-09-edumtg-sms-tc-privacy-pages`) and dispatched to Codex 2026-07-09.
- [x] **Down Payment Assistance page + app links (Apple/Google Play/Apply Now).** Approved copy pulled from the Google Doc and confirmed URLs from Elyse's 2026-07-09 Monday update, both queued as `agent-ops` tasks (`2026-07-09-edumtg-down-payment-assistance-page`, `2026-07-09-edumtg-app-links`) and dispatched to Codex 2026-07-09.
- [x] **Global hero/final-CTA phone links have no `href` + sitewide final CTA renders a duplicate H1.** Found 2026-07-21 during the Designer acceptance fixture (see below) — both live in shared/global objects, not page 1170, so they likely affect every page on staging, not just Down Payment Assistance. Deliberately deferred from that fixture's page-scoped approval; needs its own authenticated inspection to identify the owning object (type/ID/slug), usage count, and safe correction scope before a fix is dispatched. Full detail: F3/F4 in [[2026-07-21-educated-mortgage-down-payment-assistance-design-spec]].
- [x] ~~Confirm whether staging's WordPress 7.0 core is intentional~~ — resolved 2026-07-09: `wordpress-beta-tester` is installed but **inactive** (`off` channel) on local, so nothing is actively pulling a beta/nightly build. WordPress 7.0 is just whatever core version ships with the current `@wordpress/env` package — `.wp-env.json` has `"core": null` (unpinned). Real risk isn't "running a beta," it's that an unpinned core means a fresh `wp-env` teardown/rebuild could silently bump to a newer core version later. Recommend pinning `"core"` to an explicit stable version tag before launch for reproducibility — still on the pre-launch checklist in [[Educated Mortgage Stack]].
- [x] ~~Blocked on Gmail connector~~ — resolved 2026-07-09, work inbox (bob.moore@midwestfamilymadison.com) now connected and searched.
- [x] ~~Content for SMS T&C / Privacy Policy pages not retrievable~~ — resolved 2026-07-09, Bob pulled both docx attachments directly and uploaded them; full text extracted into [[Educated Mortgage SMS TC and Privacy Policy Pages]].
- [x] ~~Novamira setup in progress on local~~ — confirmed live 2026-07-09 ("Novamira ON" in WP admin bar), see [[Educated Mortgage Stack]]. Investigated the live site directly via Claude in Chrome (theme.json + computed styles + screenshots) to build [[Educated Mortgage Design Tokens]].
- [x] ~~Design Tokens full-site audit~~ — 2026-07-09, expanded the initial 3-page snapshot into a full audit of all 40 published pages (raw Gutenberg content via REST, registered block styles via theme files, WP-CLI via `docker exec`, live computed-style checks in Chrome). Corrected several guesses (underline bar is a synced pattern not a heading style, Section Alt background is Slate-50 not Surface, a formal Card Block style does exist) and flagged real content drift (hardcoded hex instead of palette swatches, a theme file bug in the list-style registrations). See [[Educated Mortgage Design Tokens]].

### Pending / Can't Do

- [x] **OptifiNow CRM webhook integration** — lead data mapping confirmed working as of 2026-07-07; OptifiNow (Rey Maglian) doing final testing, will send production credentials when ready. Full detail in [[Educated Mortgage Stack]].
- [ ] **Coordinate launch timing: new website, new borrower portal, and new mortgage app together.** From the raw 2026-07-20 call transcript — Dan explicitly wants the site launch to coincide with the borrower-portal cutover and the app rollout rather than happen separately, to avoid a mismatched transition period for borrowers. Ties to the existing GoDaddy DNS/domain cutover (`digital@` delegate access already granted 2026-07-10). **Target set 2026-07-30: Tuesday 2026-08-04** (Dan's preference; slipping to Monday 2026-08-10 is acceptable to him — "it's just a date"). See [[#Site Check-In — 2026-07-30]] for the full outcome and open risk. #pending
- [ ] **Launch** — Backlog, unassigned, depends on the above plus final QA. #pending
- [ ] **Final invoice & add hosting/maintenance (PM)** — Backlog, unassigned. Ties to the "will add final payment and h/m once site is live" note in the Master Hub. Depends on Launch. #pending

## Environments

- **Live (old site, still in production):** https://www.educatedmortgage.com/ — legacy PHP site (`.php` URLs), not yet replaced
- **Staging (new WordPress build):** https://educatedmortgage.mdmserver.us/ — WordPress 7.0
- **Local:** http://localhost:1202/ — see [[Educated Mortgage Stack]] for repo/build detail

## Designer Acceptance Fixture — Down Payment Assistance (2026-07-21)

The new Designer role was exercised against the real staging page at `https://educatedmortgage.mdmserver.us/down-payment-assistance/`. It began in read-only redesign mode, then moved into an authorized staging implementation after Bob approved WordPress page object 1170. The corrective specification is [[2026-07-21-educated-mortgage-down-payment-assistance-design-spec]].

Verified before-state:

- The approved page content and governed visual system are substantially intact.
- A 390px viewport renders a 422px document (32px horizontal overflow), caused by the eligibility CTA and a hand-built, non-responsive three-card process grid.
- A prominent “Video Coming Soon” card is unapproved placeholder content and should be removed until a final media asset package exists.
- Two rendered phone controls in global hero/final-CTA chrome have empty link destinations; page object 1170's body phone links are valid.
- The page renders two H1 elements because the sitewide final CTA uses H1.
- Accent/Primary action contrast passes at 7.791:1; Secondary green normal-size links on white pass at 5.075:1. No token remediation is required from this fixture.
- FAQ expansion semantics and visible focus/open treatment are present; the external eligibility destination returns HTTP 200; no JavaScript console error was captured in the baseline pass.

Verified after-state:

- Page object 1170 was changed on staging only: the unapproved video placeholder was removed, the three process steps now use the registered Card Block treatment and responsive grid, both page-body phone links use `tel:+1-608-834-5000`, and the eligibility CTA is contained at narrow widths without changing its approved visible wording.
- Authenticated WordPress readback passed 16/16 assertions with no pending change; image ID 433, shared references 235 and 397, approved copy, CTA destinations, and three FAQ items were preserved.
- Fresh Designer review returned `READY` across 320, 390, 600, 768, 782, 1024, 1280, and 1440px. Fresh independent web-quality verification returned `READY` at 320, 390, 768, and 1440px, with no document/CTA overflow, runtime errors, HTTP errors, broken page-body images, or FAQ interaction failures.
- No production, repository source, or shared/global object was changed. The pre-mutation rollback backup remains outside the vault under the Hermes backup directory.

**Status:** `verified` on staging as of 2026-07-21. Global hero/final-CTA phone and duplicate-H1 findings remain deferred until their object type, ID/slug, usage, implementation lane, and collateral scope can be resolved through authenticated inspection.

## Site Check-In — 2026-07-30

Virtual "MWF Site Check In" call, staging site walkthrough. Attendees: Bob, [[Dan O'Brien]], [[Elyse Birkett]], [[Taylor Ripp]]. Source: raw transcript, `inbox/Educated Mortgage _ MWF Site Check In _Virtual - 2026_07_30 10_58 CDT - Transcript.md` (processed via vault-intake, then deleted from inbox).

### Copy & Nav Changes (Bob to implement)

- [ ] Header/hero product line: "explore conventional refinance and first-time home buyer options" → **"explore home purchase, refinance, and home equity loan options."** Dan's reasoning: "conventional" is redundant (it's a type of both refinance and purchase loan, not a distinct product); Elyse confirmed the simpler phrasing still supports SEO.
- [ ] "The Mortgage Man" branding sweep: drop quotation marks everywhere; keep "the Mortgage Man" bolded; only use quotation marks in the one case where it sits directly between "Dan" and "O'Brien" (e.g. "Dan **'the Mortgage Man'** O'Brien"). Elyse to help sweep once Bob signals go-ahead (see below).
- [ ] "Educated Mortgage Services" → "Educated Mortgage" sitewide in body copy — **except** disclaimers/footer/licensing, which must keep the full legal name ("Educated Mortgage Services, LLC"). Worst offender flagged live: Purchase → Mortgage Programs → Home Purchase Basics page (full name appears repeatedly, including the first sentence after the header). Bob: do a two-pass find/replace — "educated mortgage services" → "educated mortgage," then a second pass to restore "...Services, LLC" wherever "Educated Mortgage, LLC" resulted — then spot-check for anything that got mangled. **Bob said he'd run this himself immediately after the call**; asked Elyse to hold off on her offer to do the same sweep so the two efforts don't collide.
- [ ] Homepage "What working with Educated Mortgage looks like" (4-step section): rename the "Pre-approval" step → **"Get approved and move forward with confidence."**
- [ ] Mortgage Analysis form ("Get your free mortgage analysis," goal question): decided **against** adding a 4th top-level goal option for home equity — Bob and Dan agreed a 4th choice adds cognitive load without changing what the user has to do. Instead: change "Refinance my home with cash out" to plain **"Refinance,"** then show a conditional follow-up when Refinance is selected: **"Is your goal for refinance to lower your interest rate/payment, or to get cash out with a home equity loan?"** Motivation: Dan's been getting Contact Us inquiries from people who want a home equity loan specifically because it isn't visible as an option today; conditional branching surfaces it without lengthening the top-level question.
- [ ] Multi-step form, refinance path: drop the "What's the balance of the loan you want to refinance?" question for the home-equity branch; reframe it as **"What's the balance of your current first mortgage?"** for that branch (same underlying question, framed to feel less like "give up your low rate" — relevant for the segment sitting on sub-3% pandemic-era mortgages who are equity-loan candidates, not refinance candidates). Keep the form on a single page/step if it doesn't get too long (Bob has been testing one-page vs. two-page layouts).
- [ ] Nav: add **Home Equity Loan** and **Bridge Loan** entries under "Mortgage Programs" (currently only listed under "Types of Loans"); also duplicate **Cash Advantage Program** under "Types of Loans." Bob confirmed pages can be nested/reachable from both menu locations. Rationale (Bob): "Types of Loans" reads more educational than "Mortgage Programs," and duplicate entry points hedge against users not scrolling the full menu.
- [ ] Mobile: turn the Borrower Portal link into a visually prominent button rather than a plain nav link — Dan wants it effortless to find on every device since borrowers live in that portal through the whole loan process (e-signing, status, docs). Servicing stays a normal nav link (most servicing traffic comes from payment-reminder emails, not site nav).
- [ ] Cross-viewport check: Dan saw the "Resources" nav item disappear when his desktop browser was at half-screen width and reappear at full width — confirm it renders consistently across breakpoints, not just desktop-vs-mobile.
- No action: Blog placeholder under Resources (About Us/Servicing/Borrower area) confirmed as expected pre-launch placeholder content, removed before go-live — not a bug.

### QA Finding

- Borrower Portal link on staging currently resolves to the **old** portal (`ellmay.com`) rather than the new `myloan.educatedmortgage.com` link — caught live on the call navigating from the header. Servicing and Apply Now links were checked live and confirmed correct. Elyse has the correct destination logged in the Monday.com launch task as the reference to double-check against; Bob to reconcile before launch.

### Launch Timing

- **Target: Tuesday 2026-08-04**, coordinated with the new borrower-portal cutover and app rollout per the existing waiting-mode item above. Dan's fallback is Monday 2026-08-10 if needed — not a hard date for him ("it's just a date... beginning of August, I want it going").
- **Open risk: OptifiNow ("Optify") hook/form-field mapping for the new home-equity goal is unbuilt.** Existing OptifiNow campaigns only cover purchase, first-time-buyer, and refinance — home equity would be a net-new campaign, and current site form fields don't fully line up with what OptifiNow has built. **Decision: not a launch blocker** — Bob/Dan agreed the CRM/campaign mapping work can ship after the site launch if it isn't ready in time. Dan messaged OptifiNow right after this call (they didn't know the request was coming) and has a call with **Lynn** (his CRM consultant — full name and firm not captured on this call, not yet in the vault) on 2026-07-31 to scope the home-equity differences quickly.
- Dan will do a full proofread of the live site over the weekend (2026-08-01/08-02) and send any further notes; expects nothing major enough to hold the launch.
- Bob committed to having the copy/nav/form tweaks above ready before the weekend (by 2026-08-01).

### Other Updates (no action needed)

- All client videos are now live on YouTube; Elyse's tracking sheet (names + links) is current and already shared with Dan, who will forward it to Lynn.
- Dan has monthly meetings with Lynn evolving the CRM system; Elyse floated (not committed) folding OptifiNow/Lynn into a shared monthly call if collaboration is needed once the new form/CRM flow is rolling.
- Next check-in already on Elyse's calendar for Monday 2026-08-03 morning; Dan separately asked for an early-next-week check-in — Elyse to send a Calendly invite for that.

## Related

- [[Educated Mortgage]] — client profile
- [[Educated Mortgage Brand]] · [[Educated Mortgage Voice]] · [[Educated Mortgage Stack]] · [[Educated Mortgage Design Tokens]] · [[Educated Mortgage SMS TC and Privacy Policy Pages]]
- [[Dan O'Brien]] · [[Leia]] · [[Elyse Birkett]] · [[Taylor Ripp]] · [[Tony Hanson]]
- [Client Exchange (Google Drive)](https://drive.google.com/drive/folders/1ufFGzMlLW0BWIfW83-yKiwu_onrjb3i7)
- [Website Builds board (Monday.com)](https://mwfcompanies.monday.com/boards/18175047973)
- [[Projects/Index|Project Index]]
- [[Brunsell Lumber]] — same AE ([[Leia]]), same build pattern (web build first, then SEO/CRO/PPC ramp)
