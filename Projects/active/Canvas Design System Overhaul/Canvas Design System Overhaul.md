---
date: 2026-07-26
description: "Canvas, the agency's shared WP boilerplate theme, needs a major-version overhaul (token/style-variation/pattern naming, pattern-library audit) before AI-assisted design tooling gets built on top of it."
project: Canvas Design System Overhaul
status: active
quarter: Q3-2026
tags:
  - work-note
  - project/canvas-design-system
---

# Canvas Design System Overhaul

## Context

Canvas is the agency's shared WordPress boilerplate theme — not a client-specific build. Each client repo carries its own copy at `themes/canvas` (e.g. `/Users/bobmoore/Dev/Sites/<client>.dev/themes/canvas`); per-client customization is usually just token-level (colors, font family). There is **no update/push mechanism** between the boilerplate and already-launched client sites — each client build is effectively a bespoke fork frozen at whatever canvas state it started from. So a version bump here is an internal-only marker for the boilerplate's own evolution; it does not imply migrating any live client site forward.

Captured 2026-07-26 out of a conversation about building a faster design-collaboration workflow (a browser click-to-inspect picker via Claude in Chrome, then a Figma-vs-Claude-Design detour) that landed on: canvas already *is* a real design system — `theme.json` tokens + `styles/blocks/*.json` block-style variations + `patterns/*.php` — it's just legible only to Bob, not to anyone (or anything) else reading it cold.

## Why now

Bob wants patterns, tokens, and naming nailed down **before** investing in AI-assisted design/implementation tooling built against canvas — so that tooling doesn't inherit, or have to compensate for, the current fracture.

## Current state (audited 2026-07-26 via Educated Mortgage's copy of canvas)

- **`theme.json`** — mature token layer: 6-color palette, an 11-step fluid spacing scale, a ~19-step fluid type scale (still carrying `heading-1`…`heading-6` vestiges alongside pure-magnitude slugs like `x-small`…`5x-large`), shadow presets, border-radius scale, font-weight/line-height scales, default button/form/link element styles.
- **`styles/blocks/*.json`** — registered WP block-style variations (`core-button-primary/secondary/text-only`, `core-group-card-block`, `core-quote-pull-quote/with-marker`, etc.). A different entity type from patterns: names *a style + the block it targets*, not a usage.
- **`patterns/*`** — usage-oriented components (`hero/basic, title-excerpt, two-column-cover, two-column-subscribe`; `ctas/author-box, email-subscribe-*`; plus `forms/`, `entry/`, `elements/`). Neglected over the years — fixes made ad hoc at point-of-use and re-saved as per-client user-generated/synced patterns in the database, rather than versioned back into the theme's `patterns/*.php` files. The real source of truth for "what patterns look like in production" has drifted into per-client `wp_posts` data, not just this repo.

## Design direction (from the 2026-07-26 conversation)

1. **Split by concern — primitive tokens vs. semantic/style-variation layer, not one naming scheme for everything.**
   - Font-size tokens should move fully to size language (already partway there with `x-small`…`5x-large`) and drop the remaining `heading-N` vestiges — the token should describe magnitude only.
   - The large number of near-duplicate sizes isn't bloat — it compensates for WordPress's font-size picker not being responsive/context-aware (an H2 in a blog post needs a different size than an H2 on a marketing page). That reasoning is legitimate and should be preserved.
   - *Where* to use which size is a **style-variation** concern, not a token-naming concern — e.g. a "Section Heading" block-style variation should pick the right underlying size token. The variation name carries meaning; the token stays a pure primitive.
   - Confirmed mechanism (`src/scss/_typography.scss`): a style variation resolves to *different* sizes per heading level via paired tag+class CSS rules — `h1.is-style-section-heading { font-size: var(--wp--preset--font-size--heading-1) }` through `h6`. One semantic name ("Section Heading"), six underlying sizes depending on which tag it's applied to. This split isn't expressible in `theme.json`'s native block-style-variation JSON alone (a registered block style applies one flat rule regardless of heading level) — it requires this separate hand-written SCSS layer. Worth noting as its own legibility problem: the "menu of styles" is registered in `styles/blocks/*.json`, but the "meaning" (which size per tag+variation) lives in `_typography.scss` — two files, two mechanisms, one concept. Renaming tokens to size-language doesn't change this structure, just which preset variable each rule points to.
   - **Generalize beyond headings**: the implementation-layer contract should just be *{element type/context} + {style-variation name}* — that pairing alone should be enough to know what to build, without needing to know the raw token scale exists at all. Headings resolve size through {tag, variation}; the same pattern should hold for buttons (color/padding/radius through {block, variation}), sections (spacing/background through {block, variation}), and other component types. The variation vocabulary is the actual interface; tokens stay an implementation detail behind it — this is the design-system contract to make explicit for v-next, not something specific to typography.
2. **Style variations and patterns are different entity types — don't force one taxonomy across both.**
   - Style variations answer "what style, on what block" (`button - primary`).
   - Patterns answer "what this accomplishes" (`cta-inline`).
   - Some naming convergence is natural where they overlap, but full 1:1 mapping isn't realistic — a primary button doesn't map cleanly to one usage the way a named CTA pattern does.
3. **The pattern library needs a real audit, not just a rename.** Years of ad hoc, point-of-use fixes now live as per-client synced/user-generated patterns in each site's database instead of being versioned back into `patterns/*.php`. Any renaming pass has to reconcile "what's registered in the boilerplate" against "what's actually live across client sites" first.
4. **Scope is contained.** No live client site needs to move when canvas bumps versions — this is boilerplate-only work.

## Open questions / next steps

- [ ] Decide the primitive-token naming convention for sizes (pure size language) vs. where semantic naming lives (style-variation layer).
- [ ] Audit `patterns/*` against what's actually saved as synced/user-generated patterns per live client site — reconcile before renaming anything.
- [ ] Decide on a naming convention for `styles/blocks/*.json` filenames (currently `core-<block>-<variation>.json`) — keep as-is, or tighten.
- [ ] Decide what "v-next / major version" is as a concrete artifact — CHANGELOG, semver, a generated design-system reference doc from `theme.json` + patterns?
- [ ] This needs to land *before* building AI-assisted design/implementation tooling on top of canvas, per Bob's explicit sequencing.

## Related

- [[Educated Mortgage Design Tokens]] — token file examined during the 2026-07-26 audit
- [[Educated Mortgage Stack]]
- [[Brunsell Lumber Stack]]
- [[People4Pulse Stack]]
- [[Systems Furniture Installations Stack]]
- [[R&V Cleaning Solutions]]
