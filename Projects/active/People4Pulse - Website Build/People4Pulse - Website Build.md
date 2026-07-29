---
date: 2026-07-15
description: "People4Pulse (Pulse) — bounded website-build project. Client profile, Brand/Voice/Stack live in Clients/People4Pulse/."
project: "People4Pulse - Website Build"
client: "People4Pulse"
status: active
quarter: Q3-2026
tags:
  - work-note
  - project
  - client/people4pulse
---

# People4Pulse — Website Build

Bounded engagement: ground-up WordPress site build for [[People4Pulse]] (client profile, Brand, Voice, Stack live in `Clients/People4Pulse/`). Same agency build pattern as [[Brunsell Lumber]] and [[Educated Mortgage]]: GitHub repo `MDMDevOps/people4pulse`, `MWF Canvas` base theme (v2.0.0, no client child theme), `mwf-cornerstone` mu-plugin.

## Environments

- **Staging:** https://people4pulse.mdmserver.us/ — WordPress build in progress/near-complete
- **Local:** `/Users/bobmoore/Dev/Sites/people4pulse` — see [[People4Pulse Stack]]
- **Live/Production:** **people4pulse.org** (confirmed via the signed contract's own CDD/strategy brief — this is their existing domain, likely the current pre-rebuild site the new WordPress build will replace).
- **Target launch:** Next review meeting was **Monday 2026-07-20 at 3pm** (per the 7/7 recording) — held, see [[2026-07-20 PULSE Website Review]] and Open Items below. Target push-live was floated as the next day, **Tuesday 2026-07-21**, but the 7/20 review didn't confirm a go/no-go on that date and several pre-launch items are still open (Stripe still sandboxed, EIN/footer legal info incomplete, calendar embed still placeholder, high-res logo still outstanding) — 7/21 looks optimistic, worth confirming explicitly with Elyse/Alan rather than assuming it holds.

## Open Items

7/7 meeting follow-ups, due 2026-07-17 ([Monday item](https://mwfcompanies.monday.com/boards/18175047973/pulses/12471017915)), broken into individual tasks. **No Novamira on this client's site** (see [[People4Pulse Stack]]) — every build task below is Bob's to do directly, not something to hand off for live-site agent execution.

Live Monday refresh 2026-07-29 still shows Bob assigned two overdue Website Builds items: [Client Follow Up Items from 7/20 Meeting](https://mwfcompanies.monday.com/boards/18175047973/pulses/12582724207) and [Add Partner Organization to Resources Page](https://mwfcompanies.monday.com/boards/18175047973/pulses/12591989844).

- [ ] Pull the 7/20 Monday item comments/meeting notes into concrete People4Pulse subtasks before assigning further. #intake 📅 2026-07-30
- [ ] Pull the source content for the partner organization/resource-page Monday item and decide whether it becomes implementation work or waits on client material. #intake 📅 2026-07-23

### Bob — build tasks

- [x] Swap the homepage hero photo (Alan doesn't love the current one; no replacement specified yet — check with Matt's photo folders)
- [x] Implement the "Rooted in Dignity, Autonomy" section reword — client-approved exact wording, ready to paste in as-is: *"Solutions are almost often located nearest their problems, and PULSE serves as a bridge between impacted people and decision makers."*
- [x] Implement the "Overdose Crisis" section reframe — copy drafted, 3 options in [[People4Pulse Website Copy]] (writer recommends Option C); **blocked on Alan confirming which stat framing to use**, don't ship without that
- [x] Add the PULSE definition/backronym to the About page — copy drafted in [[People4Pulse Website Copy]]; needs a section heading decided (writer suggests "What PULSE Stands For" or folding into "Who We Are")
- [x] Split the meeting-registration flow from the general Contact Us form into two separate forms
- [x] Wire up the auto-confirmation email for meeting registration (date/time/link) — copy drafted in [[People4Pulse Website Copy]]; confirm the reply-to inbox is actually monitored before it ships (email copy assumes it is)
- [x] Add a second, more prominent Donate link near Contact Us in the primary nav (footer link already exists; don't necessarily replace the "Request Info" nav slot)
- [ ] Swap Stripe (`gravityformsstripe`) from sandbox to live before launch — see [[People4Pulse Stack]] pre-launch checklist, real blocker not just a nice-to-have
- [x] Fix meeting-cadence copy sitewide: weekly + general meeting on the 4th Wednesday of the month — not "2nd Tuesday" (leftover placeholder text)
- [ ] Get the specific DHS dashboard/report URL to link as the source citation on the Overdose Crisis section (drafted copy cites DHS by name only, no link yet) #actionable
- [x] Implement the 3 client-approved homepage testimonial quotes (anonymous, no names) — final copy in [[People4Pulse Website Copy#4. Homepage Testimonial Quotes — Client-Approved (2026-07-20)]] #actionable ✅ 2026-07-29
- [ ] Add legal entity info to the About page/footer: **Pulse, Inc.** (501(c)(3)), address **3875 South Hansen Ave, Milwaukee, WI 53207** — confirmed in the 2026-07-20 review; **don't ship the footer legal block until the EIN is confirmed** (discussed but no clean number captured on the call, see Open Items below)
- [x] Draft "What to expect" copy for the Join the Conversation meeting-info section — per Alan's 2026-07-20 framing: recap prior month's advocacy/events, list upcoming events, explain how to get further involved. Meeting cadence copy itself is already fixed (4th Wednesday); still need a decision on whether to show a specific time or "check calendar" fallback language #actionable ✅ 2026-07-29
- [ ] Send Alan instructions for connecting PULSE's real Google Calendar — the "See full calendar" embed currently points at one of Bob's blank placeholder calendars #actionable
- [ ] Revise the meeting-registration confirmation email's opening line — Alan flagged "Hi there" (current draft, [[People4Pulse Website Copy#3. Meeting Registration Confirmation Email]]) as reading too generic/impersonal on the 2026-07-20 call; he's rewriting and will send Bob updated wording #waiting

### Pending / Can't Do (waiting on Alan / Matt) — not Bob's action, tracked so nothing slips

- [ ] Once received, swap in the high-res PULSE logo and Alan/team's final overdose stats and Resources-page community-partner content (see below) #pending
- [ ] Alan: confirm which overdose-stat framing/numbers to use in the hero and Overdose Crisis section (options being drafted — see Bob's task above) #pending
- [ ] Alan: confirm the monthly people-reached figure framing (rolling monthly, not lifetime — currently 3,288 views/"3,000+ people" last month); still unresolved as of the 2026-07-20 review — [[Taylor Ripp|Taylor]]'s team still needs to pull the actual numbers Alan wants shown #pending
- [x] ~~Alan/team: 3 named press-quotes with source links~~ — **resolved 2026-07-20**: Alan approved 3 anonymous quotes instead (no names needed) — see [[People4Pulse Website Copy#4. Homepage Testimonial Quotes — Client-Approved (2026-07-20)]]
- [ ] Alan: meeting registry link — reconfirmed still needed as of 2026-07-20 #pending
- [ ] Alan: community-partners/resources content for the Resources page (safe-use materials, wound care kits, drug-checking partner info) — Alan emailing the board 2026-07-20 to gather this #pending
- [ ] Alan: EIN for "Pulse, Inc." — address obtained 2026-07-20 (see Bob's task above), but the EIN itself wasn't clearly captured on the call (Alan was searching articles of incorporation live, mentioned "501(c)(3)"/"C3" but no clean digits) #pending
- [ ] Alan/team: real Google Calendar link/access so Bob can hook up the actual PULSE calendar (see Bob's task above) #pending
- [ ] Alan: revised thank-you/confirmation-email wording (see Bob's task above) #pending
- [ ] Alan: confirm photo consent with Dr. Elizabeth Salbury, Joseph Gaye, and Heidi before that group photo is used #pending
- [x] Matt: send high-res PULSE logo — still outstanding as of 2026-07-20; what Bob received under this ask so far was the same low-res file, not a replacement. Not launch-blocking per Bob — can ship blurry or remove the image #pending ✅ 2026-07-29
- [ ] Verify Matt's actual email address (heard as `matt@people4pulse.org` in the recording, unconfirmed) #pending

### Context only — not a task

- Alan mentioned a separate check-in with "Vital" about project status — likely a funder/grant relationship, not an agency contact.
- Alan asked about paying the $165/month hosting & maintenance annually up front instead of monthly; [[Elyse Birkett|Elyse]] said that's workable and would coordinate with billing/[[Raven Storm]]. Not a blocker, just a billing preference floated during the 2026-07-20 review — no decision made yet.
- Hosting/maintenance cost breakdown, as explained to Alan on the 2026-07-20 call: ~$30/month is hosting-equivalent (Bob's benchmark: SiteGround self-managed), the rest of the $165 covers maintenance (daily backups, malware scans, uptime monitoring, site-speed scans, plugin/core updates). Domain stays registered with the client regardless of who hosts — only nameservers move. Not compatible with staying on Wix in parallel.

## Related

- [[People4Pulse]] — client profile
- [[People4Pulse Brand]] · [[People4Pulse Voice]] · [[People4Pulse Stack]] · [[People4Pulse Website Copy]]
- [[2026-07-20 PULSE Website Review]] — meeting prep/record for the 7/20 review call this Open Items section reflects
- [[Alan Robinson]] · [[Raven Storm]] · [[Elyse Birkett]] · [[Taylor Ripp]]
- [[Brunsell Lumber]] · [[Educated Mortgage]] — same MWF Canvas build pattern, same agency
- [[Projects/Index|Project Index]]
