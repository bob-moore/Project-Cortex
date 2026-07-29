---
date: 2026-07-17
description: "Synthesized needs analysis from Aalair Home Care's discovery call — positioning shift, functional scope, SEO/AEO gap, hosting move, open questions — organized to prep the proposal/estimate discussion."
prospect: "Aalair Home Care"
tags:
  - work-note
  - prospect
  - prospect/aalair-home-care
---

# Aalair Home Care — Needs Analysis

Synthesized from [[Aalair Home Care Discovery Call (2026-07-17)]] (pre-call competitive research + full transcript) specifically to prep the proposal/estimate conversation with Bob. Organized by what actually drives scope, not chronologically.

## The core problem (why this is urgent, not exploratory)

Aalair's messaging is stuck on its founding model (Medicaid-program, caregiver-focused: "you can get paid to care for your own parent") while the business is actively pivoting to private-pay, client-centered care. The mismatch is no longer theoretical — Tamra describes prospects' reactions souring in real time when the site's messaging contradicts what her new full-time salesperson is telling them. **This is a rebrand-driven rebuild, not a refresh** — the estimate should reflect messaging/positioning work as core scope, not an add-on.

## Requested proposal scope (stated directly)

1. **Website build** — full rebuild, not enhancement. Bob quotes this (see [[Website Estimate Template]]).
2. **Hosting and maintenance** — migrating off GoDaddy (client's own words: "we won't use it"). Pricing source TBD.
3. **SEO/CRO** — ongoing, not one-time; current site has near-zero organic presence (7 keywords vs. a local competitor's 65k). **Quoted by the SEO department, not Bob** — fixed $1,700/month baseline (few exceptions). Since Aalair is getting a full rebuild, no separate CRO dev line gets added on top per [[Website Estimate Template#Hosting/maintenance and SEO/CRO are never in this spreadsheet|the CRO dev carve-out rule]] (that only applies when a prospect isn't rebuilding).
4. **AI chatbot / engagement tool** — asked for, scope/priority unconfirmed (see Open Questions). Options researched: [[Aalair Home Care AI Feature Suggestions]] — a senior-care-specific needs-assessment widget (Tars/Conferbot) is the best fit, ranked above a generic cheap widget (Boei), a mid-tier form-builder option (WPBot), and a likely-over-scope custom LLM build.
5. **Deferred, not in this proposal:** programmatic advertising ("a few months down the line")

## Positioning & messaging (voice/brand seed — full Voice.md work waits until signed)

- Shift from caregiver-centered to **client-centered**, concierge-style positioning, explicitly modeled on Home Instead
- Tamra wants copywriting help articulating: "what can I do to get to yes," peace of mind, dignity, reliability, stability
- Strong unused trust asset: Tamra's own founder story (cared for her mother while raising her own children — "sandwich generation")
- Tone: polished/professional, drop "Love" from the current "Integrity, Love, Support & Community" line
- Visual: move off red/bold toward softer, pastel tones (cited Father's Heart Home Care as the tonal reference — but that site's actual contrast is bad enough Bob couldn't read its nav; don't replicate that part)
- Imagery should reflect actual customer base (Caucasian, ages 70–90), not the current stock imagery
- De-emphasize the caregiver-recruitment (PCW/"apply to be a caregiver") CTA — move it off the prominent spot; center the person seeking care, not the hire

## Functional requirements

- Contact form → routes to email, asks more qualifying detail (care start timing, situation context) without over-asking; clear "what happens next" confirmation messaging. **Researched:** [[Aalair Home Care HIPAA Requirements]] — Aalair is likely not a HIPAA covered entity, but treat the form as HIPAA-conscious anyway (industry-standard practice for this vertical). Recommendation: keep the public form shallow (contact info + timing + broad category, no open-text medical detail), don't route to a raw Gmail/Outlook inbox, push actual clinical detail into the human phone assessment Tamra already described. Gravity Forms is not HIPAA-compliant by default — an upgrade path (encryption add-on + BAA-signing host) exists if ever needed, not required for a form this shallow.
- Google reviews widget, last names stripped; testimonials section (client is actively collecting, goal ~80)
- Services navigation as dropdown/mega-menu, not horizontal scroll
- **Accessibility/ADA is a real requirement, not boilerplate** — target audience is 70–90 year olds; Bob flagged WCAG AA (4.5:1 contrast minimum) as a hard line item given the audience, using a competitor's failure as a live example
- Blog interest mentioned, not scoped in detail
- Video embeds from an existing Google Drive folder — readiness (raw vs. edit-ready) unconfirmed

## SEO / AEO

- Current site: missing H1s on multiple pages (decorative script images instead of real headings), no FAQ content anywhere
- Explicit interest in AI-search (ChatGPT-style) visibility — already pitched on this by a competing agency
- Recommended build approach (Bob, on the call): launch with strong core + one services page, then build out individual service pages progressively using real post-launch search data (e.g. dementia/Alzheimer's care as an example term already showing volume) — this is also the natural argument for the ongoing SEO/CRO retainer, not a separate upsell

## Hosting

Moving off GoDaddy is decided, not a maybe. No technical blocker identified — Bob already verified the site is workable to build against.

## Stakeholder map

| Person | Role | Notes |
|---|---|---|
| Tamra Nalls | President/owner, primary decision-maker | Does most of the talking; explicitly wants copywriting/positioning help, not just a builder |
| Don Vasquez | Co-founder, operations/back-end | Deferential to Tamra on messaging; raised the GoDaddy/hosting question and the programmatic-later idea |
| Pat Heffling (MWFM) | Original contact, took the first call | Mostly quiet on this call |
| Catherine Perrault (MWFM) | Opened the call, framed it as scoping toward a quote | — |
| Elyse Birkett (MWFM) | Digital Client Success Manager, SEO/web optimization | Led most of the discovery questioning, gave the SEO/AEO answer |
| Bob Moore (MWFM) | Lead developer | Raised HIPAA/forms, accessibility/ADA, current-site SEO gaps, hosting recommendation |

## Estimate

**Bob only quotes the build.** Build-hours pricing follows [[Website Estimate Template]] ($180/hr blended rate, current template = Cost Breakdown / Architecture Breakdown / Views & Features / Sitemap tabs). Working range for the build alone, given moderate page count but heavier Content & Information Design hours (copywriting-driven, not just page-filling) and real ADA/accessibility requirements: **$8,000–$17,000**, skewed toward content-design phase hours over pure coding. Not finalized — pending line-by-line walkthrough with Bob.

**SEO/CRO is a separate $1,700/month line, quoted by the SEO department** — not part of Bob's number, and no additional CRO dev line since Aalair is rebuilding (see Requested Proposal Scope above). **Hosting/maintenance pricing source still unconfirmed.** The full proposal Aalair sees will combine all three, but only the build figure originates from this analysis.

## Open questions before quoting

Carried forward from pre-call prep — **not resolved on this call**, worth a quick confirm before the estimate is finalized:

- Is the AI chatbot launch-critical or a phase-2 item?
- Are the Drive video assets edit-ready, or does production work need to be scoped in?
- Does the recruitment/PCW (caregiver-hiring) side of the site carry forward in the rebuild, just de-emphasized, or drop out of scope?
- Is JStorey Media (original builder) still involved / does Aalair have full access to the current site, domain, and hosting?
- Does Aalair have (or need) a BAA with any hospital/SNF referral sources? — genuinely unresolved, ask Tamra/Don or their compliance advisor directly, see [[Aalair Home Care HIPAA Requirements]]

## Related

- [[Aalair Home Care]] — prospect overview
- [[Aalair Home Care Discovery Call (2026-07-17)]] — full meeting record and quotes this synthesizes
- [[Aalair Home Care HIPAA Requirements]] — form-design compliance research
- [[Aalair Home Care AI Feature Suggestions]] — chatbot/AI feature options
- [[Elyse Birkett]]
