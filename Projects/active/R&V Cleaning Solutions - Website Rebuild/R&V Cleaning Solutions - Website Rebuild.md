---
date: 2026-07-23
description: "R&V Cleaning Solutions — full website rebuild. Automated/scaffolded build (17-task plan) complete 2026-07-23; manual refinement pass now in progress (homepage/header/footer near done as of 2026-07-27, service pages next). Client profile, Brand/Voice live in Clients/R&V Cleaning Solutions/."
project: "R&V Cleaning Solutions - Website Rebuild"
client: "R&V Cleaning Solutions"
status: active
quarter: Q3-2026
tags:
  - work-note
  - project
  - client/rv-cleaning-solutions
---

# R&V Cleaning Solutions — Website Rebuild

Bounded engagement: **full rebuild from scratch** for [[R&V Cleaning Solutions]] (client profile, Brand, Voice live in `Clients/R&V Cleaning Solutions/`). This is not a resumption of the original build — see below.

## Why this is (effectively) a rebuild

The original build ran Oct 2025–Feb 2026 (Env Setup → V1 Prototype → client logo/design feedback → V2 → V2 Revisions), got through two full design rounds, but never launched. It sat untouched for ~5 months and was assumed dead. Bob deleted both the local and staging copies during that period.

**The GitHub repo itself is still there**, so it's not a total loss — but it's just the same shared MWF Canvas FSE theme + `mwf-cornerstone` mu-plugin every agency build starts from (same pattern as [[Brunsell Lumber]], [[Educated Mortgage]], [[People4Pulse]]). Not much R&V-specific work ever landed in the repo beyond that boilerplate — confirmed 2026-07-23 by checking commit history directly: the only commits are from the original Oct 2025–Feb 2026 build window and only touch shared mu-plugin/theme build infrastructure, not R&V page content. The placeholder red/black color scheme in `styles/custom.json` is also generic starter-theme boilerplate, **not** R&V's real brand colors (confirmed against the client's actual logo/marketing assets — see Local Rebuild Design Spec below). Other surviving reference material: the signed contract, proposal decks, the Feb 2026 design-feedback doc, and brand assets (logos, business card, flyers) in Drive — see [[R&V Cleaning Solutions]] for links.

> [!success] Resolved 2026-07-23 — rebuild confirmed, now top priority
> Internal meeting held 2026-07-23 settled the open question from [[Elyse Birkett|Elyse]]'s 2026-07-13 hold: **rebuild** is the agreed path (not comping free radio instead). Per Bob, this has taken priority over all other work for the time being — treat as the top active engagement until further notice.

## Why the previous build actually stalled (found 2026-07-23 via email)

The vault previously only had "went quiet after Feb 2026." The full picture, found by searching Bob's email during design work on the rebuild:

- **2026-02-24:** Diana's marketing rep, Anthony Frelas, sent a formal escalation to Elyse/Leia (cc Diana) — the site was "still not in a stable, launch-ready state," turnaround was too slow, and he requested a scope-vs-completed breakdown plus "a discussion regarding a financial resolution." This is a materially sharper tone than "the client went quiet."
- **Bob's 2026-02-25 reply** laid out the real timeline: logos/marketing materials received 2025-10-29 → V1 Prototype 2025-11-03 → feedback 2025-11-24 (keep her colors, but style it more like **[maidbeyondcleaning.com](https://maidbeyondcleaning.com/)**) → V2 2025-12-08 → feedback 2026-01-22 (style it more like **[angheluscleaningservices.com](https://angheluscleaningservices.com/)**) → full overhaul 2026-02-17 → no design approval ever reached, so **inner-page content was never started** — the project was stuck at step 1 (basic design/color approval) the entire time.
- Both reference sites share a structure (hero → services grid → trust stats → values → process steps → FAQ → CTA) that directly shaped the new page architecture — see the design spec below. This is also where Diana's "Our Process" and FAQ gaps (flagged missing by Catherine's Feb 2026 review) come from — neither reference site's structure was ever actually built.

**Takeaway for this rebuild:** the failure mode last time was getting stuck relitigating basic design/color approval before any content work started — not a content or scope problem. The new build front-loads the color/brand-asset correction and structural design (see below) specifically to avoid repeating that loop.

## Local Rebuild Design Spec

Full implementation design (site structure, theme/brand setup, page-by-page content architecture, asset mapping, build mechanics, verification) is written up and version-controlled with the code, not duplicated here:

`~/Dev/Sites/rvcleaningsolutions.com/docs/superpowers/specs/2026-07-23-rv-cleaning-rebuild-design.md`

Key decisions from that spec: real brand colors (navy/green/cyan, sourced from the client's actual logo, not the placeholder red/black in the repo) get mutated directly into `theme.json`; 5 flat top-level pages (Home, Residential, Commercial, Student, Contact) with the logo (not a text link) serving as the Home nav item; GTranslate installed now for the translation mechanism, English content only this pass; no reviews/testimonials section anywhere since none exist yet.

**Implementation plan** (17 tasks, TDD-style with WP-CLI/curl verification per step, per `superpowers:writing-plans`): `~/Dev/Sites/rvcleaningsolutions.com/docs/superpowers/plans/2026-07-23-rv-cleaning-rebuild.md`. Covers theme.json color/font migration off the placeholder `custom.json` variation, site identity, header/footer/GTranslate, asset upload + an `rv_media()` filename-lookup helper (avoids hardcoding fragile attachment IDs), 6 new reusable section patterns, 4 composite page patterns plus the adapted Contact page, and final page/nav creation + verification.

## Automated Build Complete (2026-07-23) — scaffold only, not the finished site

All 17 plan tasks executed via `superpowers:subagent-driven-development` (fresh implementer + independent reviewer per task, fix-and-re-review loops where needed) and passed a final whole-build review — **ready to merge, no Critical/Important issues**. Full blow-by-blow (every fix round, every discovery) lives in the build's progress ledger: `~/Dev/Sites/rvcleaningsolutions.com/.superpowers/sdd/progress.md` (git-ignored scratch, not committed — durable summary is here instead).

**What this automated pass produced:** all 5 pages (Home, Residential, Commercial, Student, Contact) render at `localhost:1210` with real R&V brand colors (navy/green/cyan, sampled from the actual logo — the repo's `theme.json` no longer has the placeholder red/black), real logo/site icon, working nav (logo→Home + 4 links), GTranslate switcher in the header, a native `core/accordion` FAQ (no plugin dependency), and zero reviews/testimonials content anywhere on the site.

**Correction (2026-07-27, per Bob):** "Build Complete" above means the scaffolded/automated build finished — not that the site itself is done. It still needs a manual improvement pass on top. See "Manual Refinement Pass" below for current status.

## Manual Refinement Pass (in progress, 2026-07-27)

Bob is manually reviewing and improving what the automated pass produced, page by page. As of 2026-07-27: homepage, header, and footer are almost done. Service pages (Residential, Commercial, Student) still need the same manual pass — not yet started.

**Two real bugs found and fixed mid-build** (both process learnings, already captured in [[Gotchas]] and [[Patterns]] where applicable): the design repo had ~296 pre-existing uncommitted local changes that got briefly swept into an early commit (caught by review, reverted, re-applied cleanly); and this plan's own probe-page verification method had a bug (curl against a `?page_id=` URL doesn't follow this site's pretty-permalink 301 redirect) — found on Task 5, root-caused, and fixed across all remaining tasks' verification steps.

**Known, deliberate gaps** (all tracked in the design spec's Open Follow-ups, not oversights):
- No staging yet — local only.
- All copy is structurally-correct placeholder, not final voice-compliant copy.
- Contact page form is non-functional (shared theme boilerplate, no Gravity Forms installed) — flagged by the final review as the one real pre-launch blocker, now added to the spec's follow-ups.
- The "+10 years / 500 happy clients" claim and final logo variant both still need Diana's confirmation.
- No reviews section anywhere, by design, until real reviews exist.

## Environments

- **GitHub repo:** exists — standard MWF Canvas FSE theme + `mwf-cornerstone` mu-plugin, same shared starting point as every other build, not much R&V-specific content in it beyond that boilerplate.
- **Local:** cloned and set up 2026-07-23 at `/Users/bobmoore/Dev/Sites/rvcleaningsolutions.com`.
- **Staging:** none yet — the `mdmserver.us` staging copy was deleted; still needs to be stood back up.
- **Live/Production:** rvcleaningsolutions.com — currently the client's own GoDaddy Website Builder DIY site, not agency-managed. This is what the rebuild would eventually replace.
- **Design reference:** Diana's two named reference sites — [maidbeyondcleaning.com](https://maidbeyondcleaning.com/) and [angheluscleaningservices.com](https://angheluscleaningservices.com/) — found 2026-07-23 in the Feb 2026 email thread (see "Why the previous build actually stalled" above). Real logo/marketing assets (multiple logo file variants, business card, flyers, Instagram templates) are also now in the local repo's `assets/` folder (gitignored, not committed).
- **Target launch:** not scheduled — real build work is starting now that the environment is set up.

## Scope (per signed 10/13/25 agreement)

- Homepage
- Service pages: Residential, Commercial, Student — the rebuild proceeds with this three-page split, flat and top-level (per Bob, 2026-07-23 design session), matching the original signed scope rather than the client's current DIY site's Residential/Commercial-only structure. Still worth confirming with Diana before final content lands, since her live site folds Student under Commercial.
- Translation Plugin Tool — GTranslate, installed as a mechanism now; actual Spanish content is a later pass, English-only for this rebuild (per Bob, 2026-07-23). See [[R&V Cleaning Solutions Voice#Format & Style Defaults|Voice note's bilingual consideration]].
- GA4 + Google Business Profile buildout
- Hosting & maintenance once launched (not yet active — see [[R&V Cleaning Solutions]] contract detail)

## Open Items

- [x] ~~Confirm the account decision (rebuild vs. free radio) has actually been made~~ — resolved 2026-07-23 via internal meeting.
- [x] ~~Get the specific list/links for the reference sites the client likes~~ — resolved 2026-07-23, found in the Feb 2026 email thread: maidbeyondcleaning.com and angheluscleaningservices.com (see "Why the previous build actually stalled" above).
- [x] ~~Content gap: Our Process, FAQ~~ — addressed in the design spec (How It Works + FAQ sections). **Customer reviews/testimonials remain explicitly out of scope** — no reviews section anywhere until real ones exist.
- [x] ~~Build all 5 pages locally~~ — automated/scaffolded build done 2026-07-23, all 17 plan tasks complete, final whole-build review passed clean. See "Automated Build Complete" above — this was the scaffold, not the finished site.
- [x] **Manual refinement pass — Homepage, header, footer.** In progress as of 2026-07-27, nearly done.
- [x] **Manual refinement pass — Service pages (Residential, Commercial, Student).** Copy draft ready — see [[R&V Cleaning Solutions - Service Pages Copy]] (2026-07-27, follows the finalized homepage structure minus FAQ, service-specific closing CTA). Not yet approved or implemented.
- [x] **Wire up a working contact form** (Gravity Forms or equivalent) — currently a non-functional static placeholder. Flagged by the final build review as the one real pre-launch blocker.
- [x] Stand up staging from the repo now that local is verified working at `/Users/bobmoore/Dev/Sites/rvcleaningsolutions.com`.
- [x] Confirm which logo variant is final — several near-duplicate files sit in the local `assets/` folder (`rvlogo.webp`, "Diana logo 2/3," "LOGO PRINCIPAL," "LOGO PRINCIPAL LETRAS BLANCAS") with no clear indication which is the one from the approved $660 modification (11/20/25).
- [x] Verify the "+10 years of experience | +500 happy clients" claim on the client's current site with [[Diana Vasquez|Diana]] before reusing it in agency copy.
- [x] Real copywriting pass — this build ships with placeholder copy only, per the design spec. Includes varying the Request-a-Quote CTA band's repeated copy across pages.
- [x] Rename uploaded media in the library to drop the `import-` filename prefix before client handoff (cosmetic).

## Related

- [[R&V Cleaning Solutions]] — client profile, full engagement history
- [[R&V Cleaning Solutions Brand]] · [[R&V Cleaning Solutions Voice]]
- [[R&V Cleaning Solutions - Service Pages Copy]] — draft copy for Residential, Commercial, Student pages
- [[Diana Vasquez]] · [[Leia]] · [[Elyse Birkett]]
- [[Brunsell Lumber]] · [[Educated Mortgage]] · [[People4Pulse]] — same MWF Canvas build pattern, same agency
- [[Projects/Index|Project Index]]
