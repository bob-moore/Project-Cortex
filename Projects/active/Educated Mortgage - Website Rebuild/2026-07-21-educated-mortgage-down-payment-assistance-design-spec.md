---
date: 2026-07-21
description: "Corrective redesign specification and WordPress handoff for the Educated Mortgage Down Payment Assistance staging page."
tags:
  - design-specification
  - client/educated-mortgage
status: verified
client: Educated Mortgage
project: Educated Mortgage - Website Rebuild
mode: redesign
target: https://educatedmortgage.mdmserver.us/down-payment-assistance/
approval_owner: Bob Moore
approval_date: 2026-07-21
approved_scope: WordPress page object 1170 only; excludes all shared and global objects
verification_status: ready
verification_date: 2026-07-21
---

# Educated Mortgage — Down Payment Assistance Design Specification

## Status

**`verified`** — Bob Moore approved WordPress staging page object 1170 on 2026-07-21. The page-only implementation is live on staging and passed independent Designer review against A1–A14 plus independent web-quality verification. This approval and verification exclude all shared/global objects and do not authorize production mutation.

## Contract

- **Client/project:** [[Educated Mortgage]] / [[Educated Mortgage - Website Rebuild]]
- **Mode:** Redesign
- **Target:** Down Payment Assistance page on the pre-launch WordPress staging site
- **Audience:** Wisconsin and Illinois home buyers, especially first-time buyers who may believe the down payment prevents them from buying
- **Primary task:** Understand the available assistance models, then check eligibility or call Educated Mortgage
- **Success condition:** A user can understand the three assistance types and complete the page-body eligibility/phone/contact actions without horizontal scrolling, broken page-body controls, or placeholder content.
- **Scope:** WordPress page object 1170, from the first post-hero section through the FAQ section. The global header, global hero template, sitewide final CTA, and footer are evidence surfaces only and are not authorized for mutation by this artifact.
- **Out of scope:** Copy rewriting, a new theme/component, changing canonical tokens, supplying or producing the missing video, all global/shared object mutation, live/production deployment, and changes to the external eligibility service
- **Destination:** WordPress using existing blocks/styles/patterns. Developer is required only if valid page-1170 block configuration cannot remove the measured overflow.
- **Approval boundary:** Bob Moore must approve page-object scope and date the frontmatter before WordPress changes. Shared/synced objects require a separate owner-resolution artifact and explicit cross-site impact approval.

## Source and evidence ledger

| Source | Category | Scope | Design consequence |
| --- | --- | --- | --- |
| [[Educated Mortgage - Website Rebuild]] | Authority | Approved page content and staging/repository identity | Treat the current page copy as approved existing content; route implementation to staging WordPress |
| [[Educated Mortgage Brand]] | Authority | Audience, claims, compliance, CTA priorities | Preserve conditional qualification language, phone prominence, and licensing; do not hard-sell or promise eligibility |
| [[Educated Mortgage Voice]] | Authority | Copy treatment | Preserve warm, plain-spoken copy and exact compliance language; do not silently edit the page |
| [[Educated Mortgage Design Tokens]] | Authority | Colors, type, spacing, blocks, patterns | Use named Global Styles, registered block variations, and synced separators; no raw substitute values |
| [[Educated Mortgage Stack]] | Authority/current fact | Staging, WordPress ownership, repository | Existing WordPress composition is the primary implementation lane |
| Staging page at the target URL, inspected 2026-07-21 | Current-system fact | Rendered desktop DOM and 390px emulation | Establishes current hierarchy, links, components, overflow, placeholder, and accordion behavior |
| Public WordPress REST page object `1170`, modified `2026-07-13T16:12:12` | Current-system fact | Page-body ownership and rendered block structure | Confirms the video placeholder and non-responsive process grid are owned by page 1170; page-body phone links already have valid `tel:` targets |
| `themes/canvas/styles/blocks/*.json` and `themes/canvas/src/blocks/core-accordion.scss` | Current-system fact | Existing component capability | Confirms Section Heading, Card Block, Section Alt, and accordion capabilities already exist |
| 1280px full-page visual capture | Observation | Desktop composition | Confirms coherent brand system and identifies the prominent video placeholder and repeated CTA/hierarchy issues |
| 390×844 Chrome capture plus CDP measurement | Observation | Narrow-screen reflow | Document width is 422px at a 390px viewport: 32px horizontal overflow; the eligibility CTA and third process card exceed the viewport |
| DOM/computed-style inspection | Observation | Accessibility and interaction | Two global-chrome phone controls lack `href`; page renders two global-outline H1 elements; Accent/Primary buttons measure 7.79:1; Secondary text links on white measure 5.07:1; FAQ exposes `aria-expanded` and a visible navy/white focus state |

## Approved content

- **Approved-content source:** The current staging page body, backed by the project note’s record that approved copy was pulled from the client Google Doc.
- **Required CTA/outcome:**
  1. Check Down Payment Assistance Eligibility
  2. Call 608-834-5000
  3. Secondary fallback: Reach Out / Contact Us
- **Locked terminology and claims:** Down Payment Assistance, grants, second mortgage loan programs, shared equity programs, conditional eligibility language, phone number, and all licensing/compliance text.
- **Do not rewrite:** Existing headings, body copy, FAQ questions/answers, CTA labels, or compliance text in this design pass.
- **Content/asset gap:** No final hosted video is available. “Video Coming Soon” and its explanatory sentence are implementation-authored placeholder content, not approved page content.
- **Gap resolution:** Remove the entire video placeholder region from the published layout. Restore a media region only after a final hosted asset, transcript/caption plan, aspect ratio, poster image, and approval are available.

## Current-state findings

### F1 — Narrow-screen horizontal overflow

- **Severity:** P1 Major
- **Evidence:** At a 390px emulated viewport, `documentElement.scrollWidth` and `body.scrollWidth` are 422px, producing 32px horizontal overflow.
- **Confirmed contributors:**
  - “Check Down Payment Assistance Eligibility” reaches 398.2px from a 390px client viewport.
  - The third “Pre-Approval” process card reaches 422.4px and remains in an undersized horizontal row.
  - REST markup confirms the three process cards are hand-built `has-custom-css` groups inside a plain `is-layout-grid` container with no responsive-grid classes. The comparison rows elsewhere on the same page already use the available `has-responsive-grid-columns` capability.
- **User effect:** Hero/body text and actions appear clipped, and users can pan sideways on a page that should reflow vertically.

### F2 — Published placeholder content

- **Severity:** P1 Major, content mismatch
- **Evidence:** A large bordered card states “Video Coming Soon” and “A down payment assistance video will be added here once the final hosted video is available.”
- **User effect:** The placeholder occupies equal visual weight to approved educational content and signals an unfinished pre-launch page.

### F3 — Broken global-chrome phone actions

- **Severity:** P1 Major, implementation mismatch
- **Evidence:** Two visible `608-834-5000` anchor/button instances have no `href`; public REST markup confirms the phone links inside page object 1170 already use valid `tel:` targets, so the broken controls belong to the global hero/final-CTA chrome rather than the page body.
- **User effect:** Controls look actionable but do nothing, directly undermining the brand’s phone-first conversion path.
- **Disposition:** Deferred from this page-object artifact. Resolve global hero/final-CTA object type, ID/slug, usage count, and safe correction scope before a separate approval.

### F4 — Duplicate page-level H1

- **Severity:** P2 Minor, semantic/hierarchy mismatch
- **Evidence:** The page renders `Down Payment Assistance` as H1 and the sitewide final CTA `Find Out About Your Options Today!` as a second H1.
- **User effect:** The document outline presents two competing page titles. A screen-reader or document-outline user cannot distinguish the primary page identity from a closing CTA.
- **Disposition:** Deferred from this page-object artifact because the second H1 is outside page 1170. Resolve the owning global object and collateral usage before a separate correction.

### F5 — Secondary link contrast on white passes

- **Severity:** Verified pass; no remediation
- **Evidence:** Independent WCAG relative-luminance calculation gives Secondary green `#387D2C` on white a 5.075:1 contrast ratio, passing WCAG AA for normal text. The Accent `#F5A01B` / Primary `#0D212E` button pair measures 7.791:1 and also passes.
- **Scope decision:** Preserve governed passing link roles. Do not recolor page-local phone links or create a token-system follow-up from this fixture.

### Confirmed strengths to preserve

- Brand-consistent hero, imagery, Inter typography, Accent CTA treatment, Primary body text, and Contrast separator language
- Clear progression from barrier → assistance models → process → FAQ → CTA
- Existing Accent CTA contrast of 7.79:1
- Existing FAQ buttons expose `aria-expanded`, reveal the associated panel, and visibly invert to navy/white on focus/open state
- Exact licensing text remains present in the footer
- The external eligibility CTA resolves to the confirmed external assistance service rather than an invented internal form

## Design direction

- **Primary archetype:** Educational service landing page with one primary eligibility action and a phone-first secondary action
- **Hierarchy:**
  1. Identify the page and immediate options in the governed global hero
  2. Reassure the user and present eligibility action
  3. Explain assistance models without an unfinished media interruption
  4. Present the three assistance types as a scannable program comparison
  5. Present the three-step process as a sequence that stacks cleanly
  6. Answer common questions
  7. Close with the existing sitewide CTA
- **Brand/Voice consequence:** Calm clarity over urgency; direct actions without qualification promises; phone remains prominent.
- **Existing capabilities to reuse:** Section Default/Alternate groups, Section Heading, synced Headline Separator, Accent button, text-only phone button/link, Card Block, Primary accordion, existing image style, and current global hero/final CTA.
- **No new component or token is proposed.**

## Layout regions

### 1. Global hero and breadcrumb strip

- Preserve current approved hero content, Dan portrait treatment, Free Mortgage Analysis CTA, and phone CTA.
- Do not mutate the global hero phone instance under this page-object artifact. Its empty destination is recorded in F3 for separate owner resolution.
- Preserve the breadcrumb and free-consultation strip.
- Do not alter the global hero template in this task. Resolve and approve it separately after authenticated owner/usage inspection.
- **Mobile:** Hero content must wrap inside the viewport with no clipped copy or action. Phone and button may stack; neither may create horizontal scroll.

### 2. “You May Not Need As Much Down As You Think”

- Preserve the current two-column desktop composition and approved stock image.
- Treat the stock mortgage image as decorative reinforcement; empty alt is acceptable because the adjacent copy carries the full meaning.
- Preserve the Accent eligibility CTA and exact external URL.
- **Desktop:** Copy and image remain balanced in two columns.
- **Intermediate:** Allow columns to narrow without forcing CTA overflow.
- **Mobile:** Stack copy before image. Eligibility CTA must fit inside the content inset, may wrap to two lines, and must not exceed `100%` of its containing block.

### 3. “Achieving Homeownership With Down Payment Assistance”

- Remove the entire “Video Coming Soon” card and empty media slot.
- Until approved media exists, render the approved explanatory copy as one readable content column within the existing Section Alt treatment.
- Do not leave an empty second column, fake thumbnail, play icon, estimated duration, or replacement stock image.
- If a final video is later approved, reintroduce a two-column media/text layout with a documented aspect ratio, poster, caption/transcript path, no autoplay sound, and responsive stack order.

### 4. “Explore Options For Assistance”

- Preserve heading, introduction, and all three assistance-type descriptions verbatim.
- Preserve the existing comparison/list treatment rather than converting these descriptions to generic cards.
- On narrow screens, each program title precedes its description in one vertical flow; divider and spacing stay within the content container.

### 5. “How To Get Started”

- Preserve the approved introduction and three steps.
- Use the existing Card Block variation for each step; do not recreate borders/shadows/colors manually.
- **Desktop:** Three equal cards in one row.
- **Intermediate:** Two-plus-one or one-column is acceptable only if card widths remain balanced and reading order is 1 → 2 → 3.
- **Mobile:** One card per row, full available content width, no fixed/minimum width that exceeds the container.
- Preserve Reach Out as Accent action.
- Preserve Call 608-834-5000 as a real `tel:+1-608-834-5000` action using its existing governed, passing text-link treatment.

### 6. FAQ

- Preserve the two-column desktop relationship between FAQ introduction and Primary accordion.
- Preserve questions and answers verbatim.
- **Mobile:** Stack introduction before accordion; each toggle occupies the available width.
- Preserve native button behavior, `aria-expanded`, panel association, keyboard activation, visible focus/open state, and plus/minus state communication.

### 7. Sitewide final CTA

- Preserve content, background treatment, Accent action, phone action, and image.
- Do not mutate the final CTA under this page-object artifact.
- Its second H1 and empty phone destination remain confirmed global-chrome findings requiring a separate artifact that records object type, ID/slug, usage count, affected-page recheck scope, implementation lane, and approval.

## Component inventory

| Component | Existing/new | Required treatment | Token/pattern references | Owner |
| --- | --- | --- | --- | --- |
| Global page hero | Existing | Preserve; fix phone action only after owner inspection | Existing hero composition; Accent CTA; text-only phone pattern | WordPress/shared pattern |
| Section groups | Existing | Alternate white / Slate-50 rhythm, governed padding | Section Default / Section Alt; `xxx-large` vertical, `x-large` horizontal | WordPress |
| Section headings | Existing | Preserve 600-weight heading treatment and heading order | `is-style-section-heading`; synced separators 235/397 | WordPress |
| Eligibility CTA | Existing | Accent full-size; constrain to container and allow wrapping | `is-style-accent`; Accent/Primary | WordPress |
| Phone CTA | Existing in page 1170 | Preserve valid `tel:+1-608-834-5000` targets and governed passing treatment | Existing page-body phone links | WordPress page 1170 |
| Process cards | Existing visual role, incorrectly hand-built in page 1170 | Replace custom-CSS groups with Card Block; responsive one-column mobile | `is-style-card-block`; white, Slate-200 border, Accent left border | WordPress page 1170 |
| FAQ accordion | Existing | Preserve Primary style and state semantics | `core/accordion`, `is-style-primary` | WordPress |
| Sitewide final CTA | Existing unresolved global object | No mutation in this artifact; route F3/F4 to separate owner resolution | Existing CTA pattern/cover treatment | Unresolved pending authenticated inspection |
| Video region | Deferred | No rendered placeholder until approved asset package exists | None until approved | Writer/asset owner, then WordPress |

## Interaction-state matrix

| Component | Default | Hover | Focus | Active/open | Disabled | Loading | Error | Success |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Accent eligibility / Reach Out / pre-approval actions | Accent bg, Primary text | Existing governed button hover | Clearly visible, at least 3:1 against adjacent colors | Existing pressed behavior | N/A | Browser navigation behavior | Destination unavailable is an implementation/verification failure | Correct destination loads |
| Page-body phone actions | Existing governed passing link treatment | Existing text-link hover | Visible and independent from hover | Native link activation | N/A | N/A | Missing/empty `href` fails | Dialer target normalizes to `+1-608-834-5000` |
| FAQ toggles | Surface background, Primary text, plus indicator | Existing governed hover | Current navy/white inversion or equivalent 3:1 indicator | `aria-expanded=true`, panel exposed, minus/changed indicator | N/A | N/A | Panel/association failure | Answer becomes readable and focus remains predictable |
| External eligibility action | Accent CTA | Existing governed hover | Visible 3:1 focus | Native link activation | N/A | Browser navigation | Broken/non-approved external destination fails | Confirmed external eligibility page loads |

## Interaction and accessibility requirements

- Page object 1170 must not introduce an H1; its content begins at H2 beneath the global hero. The separate global F4 finding remains open until owner resolution.
- Preserve landmark order and skip link.
- All phone controls inside page object 1170 must remain anchors with the canonical `tel:+1-608-834-5000` target or a normalized equivalent.
- Accent/Primary button treatment must remain at or above measured 7.79:1.
- Normal-size text and links require at least 4.5:1; UI/focus boundaries require 3:1 where applicable.
- Preserve the governed Secondary link role where used; its verified 5.075:1 ratio on white passes AA for normal text.
- Keyboard order follows visual order; no hidden placeholder receives focus.
- FAQ toggles remain native buttons with accessible names, `aria-expanded`, associated panels, Enter/Space activation, and visible focus.
- Touch targets aim for at least 44×44 CSS pixels or equivalent spacing.
- No autoplay audio. Any future video requires captions/transcript and reduced-motion-safe controls.
- No horizontal scrolling, clipping, or overlap at 320, 390, 600, 782, 1024, and 1280 CSS-pixel widths.

## Content and asset rules

- Preserve all approved page and FAQ copy verbatim.
- Remove, do not replace, the unapproved video placeholder.
- Stock mortgage image remains decorative (`alt=""`) unless the content owner assigns it new informational meaning.
- Dan portrait may remain decorative within the compound hero because adjacent text identifies him; do not duplicate the name as noisy alt text without an accessibility review.
- Eligibility CTA may wrap to two lines on narrow screens; never truncate it.
- Step cards grow vertically for text and remain equal-height only where the row layout supports it naturally.
- No invented program counts, savings amounts, qualification promises, testimonials, video dates, or media metadata.

## Acceptance matrix

| Criterion | Surface/state/viewport | Observable expected result | Verification method |
| --- | --- | --- | --- |
| A1 | Whole page, 320/390/600px | `scrollWidth` does not exceed `clientWidth` by more than 1px; no clipped text/action | CDP/DOM dimensions plus screenshots |
| A2 | Eligibility CTA, 320/390px | CTA stays inside content inset, label remains complete, touch target ≥44px high | DOM rectangle and screenshot |
| A3 | Process cards, 320/390/600px | Cards render in reading order 1→2→3 and no card exceeds its container | Screenshot and DOM rectangles |
| A4 | Video region, all widths | No “Video Coming Soon,” empty media slot, fake thumbnail, or placeholder explanation is rendered | Text/DOM comparison |
| A5 | Phone actions inside page 1170 | Existing page-body links remain intact and normalize to `tel:+1-608-834-5000`; this criterion does not authorize global-chrome mutation | REST owner check, DOM link audit, and activation check |
| A6 | Page 1170 heading contribution | Page object 1170 introduces no H1 and begins at H2; global F4 remains a separate unresolved finding | REST content and rendered heading-owner audit |
| A7 | FAQ keyboard path | Each toggle is focusable, Enter/Space changes `aria-expanded`, panel content is exposed, focus remains visible | Manual keyboard and DOM state check |
| A8 | Button contrast | Accent/Primary action pair remains ≥4.5:1 and measured passing pair remains 7.79:1 unless an approved token changes | Computed color + contrast calculation |
| A9 | Phone/link contrast on light surfaces | Page-local phone text preserves a governed role meeting 4.5:1; Secondary on white remains at or above the verified 5.075:1 | Computed color + token/source inspection |
| A10 | Approved content | Headings, body, FAQs, CTA labels, and claims match the approved staging content except removal of the placeholder region | Text diff/readback |
| A11 | Shared-pattern safety | No global hero, final-CTA, template, template-part, or shared-pattern object is mutated under this page-1170 artifact | WordPress change/readback inventory |
| A12 | External eligibility destination | Eligibility CTA resolves to the confirmed `workforce-resource.com/dpc/DANIEL_O_BRIEN_1` URL | Link readback and HTTP/browser check |
| A13 | Compliance | Footer licensing text remains exact and visible | Text comparison and screenshot |
| A14 | Console/network | No new console error or failed affected request after composition changes | Browser console/network inspection |

## Gaps and approvals

1. **Approval required:** Bob Moore must approve removal of the video placeholder and the page-1170 corrective composition scope; then populate `approval_date` and `approved_scope` in frontmatter.
2. **Deferred global task:** Resolve object type, ID/slug, usage count, and disposition for the broken hero/final-CTA phone controls and the final-CTA H1 before requesting separate approval.
3. **No token follow-up required:** Secondary on white passes at 5.075:1; Accent/Primary passes at 7.791:1.
4. **No missing page-body implementation capability demonstrated:** Existing blocks/styles are sufficient unless WordPress configuration cannot eliminate the overflow.

## Handoff

- **Artifact/version:** This file, 2026-07-21, status `awaiting-approval`
- **Primary WordPress object:** Staging page ID `1170` (`down-payment-assistance`), last observed modified `2026-07-13T16:12:12`
- **Approved scope:** WordPress staging page object 1170 only, approved by Bob Moore on 2026-07-21
- **Explicitly deferred:** Global hero and final-CTA objects, including F3/F4
- **Next role after approval:** WordPress Operator for page 1170
- **Implementation sequence:**
  1. Back up and inspect page 1170; verify the approval fields match this object-only scope.
  2. Export page 1170 before mutation.
  3. Remove the video placeholder region.
  4. Correct page-local CTA and process-card responsive composition.
  5. Preserve and read back the valid page-body phone destinations.
  6. Confirm no global/shared object changed.
  7. Read back page 1170 and render at required widths/states.
- **Escalate to Developer only if:** the measured overflow persists after valid page-1170 block layout configuration.
- **Pre-implementation approval:** Recorded above for page 1170 only; no shared/global object is included.
- **Post-implementation review:** Designer rendered implementation review against A1–A14, paired with independent `web-quality-verification`.

## Feeds Into

- [[Educated Mortgage - Website Rebuild]]
- [[harness/operational-methodology|Operational Methodology]]
