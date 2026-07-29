---
date: 2026-07-09
description: "Visual design system for Educated Mortgage — fonts, colors, spacing, and component conventions, verified against theme.json, registered block styles, and live Gutenberg content across all 40 published pages."
tags:
  - reference
  - client-design-tokens
  - client/educated-mortgage
---

# Educated Mortgage — Design Tokens

Read by the `designer` and `developer` agents before any layout or theme work. **Full-site audit (2026-07-09)** — supersedes the original same-day 3-page snapshot. This pass pulled raw Gutenberg block markup for all 40 published pages via the WP REST API (`context=edit`), cross-referenced every `is-style-*` class against the canvas theme's registered `/styles/blocks/*.json` variation files, confirmed the resolved color palette via the `wp_global_styles` DB post (`wp post get 54`, WP-CLI through `docker exec` into the wp-env container — the Novamira `run-wp-cli` ability itself returned "WP-CLI is not installed" on this server, so direct `docker exec` was used instead), and spot-verified computed styles/backgrounds live in Chrome for anything ambiguous in the JSON. This is as close to ground truth as the design system gets short of reading the compiled CSS.

**Rule zero, confirmed directly by Bob (2026-07-09):** almost always, use this site's preconfigured options in the WordPress Site Editor/block editor — the named Theme color palette, the named font-size presets, and any registered block style variations — rather than hand-setting hex values, custom px/rem sizes, or ad-hoc CSS. This audit found real content that **violates rule zero** (hardcoded hex instead of the palette swatch) — see [Known Inconsistencies](#known-inconsistencies--cleanup-targets) below. Rule zero is still correct; it's just not universally followed in the existing content, and new work shouldn't copy those instances.

Note: the theme is the shared MWF `canvas` base theme (no Educated-Mortgage-specific child theme — see [[Educated Mortgage Stack]]), but the color palette and font family are **overridden at the site level** via Global Styles (DB post ID 54, `wp-global-styles-canvas`) — `theme.json`'s own declared palette (blue/slate tones, `#E74D3C` contrast, `#fcb900` highlight) is the generic MWF default and is **not** what renders on this site. Everything below is the live, resolved value from the DB override.

## 1. Fonts & Type Scale

- **Heading font:** Inter (`var:preset|font-family|inter`), confirmed in `styles/custom.json` → `settings.custom.fontFamily.headings`
- **Body font:** Inter, same as headings — `settings.custom.fontFamily.body` points to the same token
- **Registered alternate families** (selectable in the Typography panel, confirmed in `styles/custom.json`): **System Sans-serif** (`-apple-system, ...`) and **System Serif** (`Georgia, Times New Roman, serif`). A third, **Playfair Display**, is also in live use (see below) but its registration source wasn't pinned down in this pass (not in `styles/custom.json` — likely loaded via a fonts plugin, not theme.json).
- **Correction to the prior snapshot:** this is *not* an Inter-only site. Two confirmed exceptions, both decorative/statement text, not body copy:
  - **Playfair Display** (serif), used on `/about-us/` for a large centered display line — `fontSize:"heading-xx-large"`, `lineHeight:1`, centered. One-off decorative treatment, not a recurring pattern (seen on 1 of 40 pages).
  - **System Serif**, used on the homepage's pull-quote/testimonial block (`is-style-with-marker`) — italic, weight 300, `fontSize:"heading-5"`, text color `#0d212ebd` (Primary navy at partial opacity).
  - Default to Inter for everything else. Reach for System Serif only for an italic pull-quote in the existing pattern; reach for Playfair Display only if explicitly recreating the About page's display-statement treatment.
- **Font-size preset scale** (named presets in the editor's Font Size dropdown — select by name, never type a custom rem/px value): the numbered heading scale is **H1–H6** in the editor label, backed by `heading-1`...`heading-6` slugs (fluid, per `theme.json`): H1 3.815rem (~61px, fluid min 2.027rem) / H2 3.052rem / H3 2.441rem / H4 1.953rem / H5 1.563rem / H6 1.25rem. Two supplemental oversized slugs exist beyond H1 for display/statement text: **`heading-large`** and **`heading-xx-large`** (used by the Playfair Display treatment above) — these aren't part of the numbered H1–H6 set and are rare (used on 1–2 pages each).
- **Body-copy size scale** (non-heading, applies to paragraphs/buttons/labels): named presets **small / medium / large / x-large / 3-x-large**. **`small` is overwhelmingly the dominant body text size** (46 uses across the 40-page audit vs. 18 for `large`, 17 for `x-large`) — treat `small` as the practical default for paragraph/label copy, not an edge case.
- **Observed heading weight:** H1 renders at 600 (semi-bold) on hero sections; base heading style in `styles/custom.json` (`elements.heading.typography.fontWeight`) is `var:custom|font-weight|regular` (400) — the 600 weight comes from the **"Section Heading"** block style (see [Component Conventions](#4-component-conventions)), not a blanket H1 override. H2 without that style applied renders at the base 400.
- **Body weight:** 400 regular, line-height `var:custom|line-height|large` (1.6-ish token), confirmed in `styles/custom.json`.

## 2. Color System

These 6 are the **"Theme"** row in the editor's color picker, confirmed via the live `wp_global_styles` DB override (post ID 54) — select by clicking the swatch there, not by typing a hex value.

| Theme label (as shown in editor) | Hex | Use |
|------|-----|-----|
| Primary | `#0D212E` | Deep navy — body/heading text color, base button background (before CTA-specific styles override it) |
| Secondary | `#387D2C` | Green — links, highlighted labels, breadcrumb links, name emphasis |
| Accent | `#F5A01B` | Amber/gold — **the dominant CTA button color** (`is-style-accent` on `core/button`, confirmed on nearly every page: home, all 8 loan-type pages, purchase/refinance, cash-advantage-program, about-us, bridge-loans), icon badge fills, logo mark |
| Contrast | `#FCB76A` | Light orange/peach — **corrected from the prior snapshot's "not seen in use."** This is the color of the recurring **Headline Separator** synced pattern (see [Recurring/Synced Patterns](#5-recurringsynced-patterns)), which appears under headings **79 times** across the site. Far from rare — it's the underline-bar accent seen on nearly every page. |
| Highlight | `#F8F6F2` | Warm off-white; used in two theme-level gradients (`highlight-to-white`, `highlight-to-white-reverse`) per `styles/custom.json`, `[TO CONFIRM]` if used as a flat background anywhere in content — not seen as a flat swatch in the 40-page content audit |
| Surface | `#F1F5F9` | Light blue-gray — confirmed via live computed style (`rgb(241, 245, 249)`) on the breadcrumb + "FREE CONSULTATION" strip under every page hero (`has-surface-background-color`) |

**Extra registered swatches, not part of the Theme row but genuinely in use:**

| Slug | Hex/HSL | Use | Source |
|------|---------|-----|--------|
| `slate-50` | `hsl(210,40%,98%)` ≈ `#F8FAFC` | **The "Section - Alternate" background color** — computed-style verified (`rgb(248,250,252)`) on `/purchase/`. **Correction:** the prior snapshot guessed the alternating section background was Surface (`#F1F5F9`); it's actually Slate-50, a visually close but distinct swatch. Don't confuse the two — same trap as the amber/luminous-amber warning below. | Base `canvas` theme.json default color ramp |
| `slate-200` | `hsl(214,32%,91%)` | 1px borders on Card Block and bordered containers (e.g. `/glossary-of-terms/`) | Base theme.json default ramp |
| `white` / `black` | `#FFFFFF` / `#000000` | Page background, button text on dark surfaces; `black` mostly as a background (11 uses) not text | **WP core's own "Default" palette row**, not a theme-specific swatch — see warning below |

**Do not use the editor's "Default" color row** (WordPress core's generic palette — Black, Cyan bluish gray, White, Pale pink, Vivid red, Luminous vivid orange, Luminous vivid amber `#fcb900`, Light/Vivid green cyan, Pale/Vivid cyan blue, Vivid purple). It's selectable because `theme.json` has `defaultPalette: true`. The closest trap is "Luminous vivid amber" (`#fcb900`), which looks similar to but is not this site's Accent (`#F5A01B`). White and Black *are* legitimately used (background-only, mostly), but confirm intent before picking them — they're not brand tokens.

- **Contrast notes:** Amber-on-navy (`#F5A01B` bg / `#0D212E` text, the primary button combo) needs a formal WCAG check — amber backgrounds with dark text are usually fine for AA but haven't been measured here. Run `design:accessibility-review` before shipping anything new that leans on these combinations.

## 3. Spacing & Layout

- **Base unit:** 1rem (16px), per `theme.json` spacing scale
- **Spacing scale:** X-Small 0.64rem / Small 0.8rem / Normal 1rem / Medium 1.2rem / Large 1.44rem / X-Large through 5X-Large as fluid `clamp()` values. **Confirmed real usage frequency** (blockGap tokens across all 40 pages): `normal` (99 uses) and `large` (76) dominate; `x-large` (67) is common for section-level gaps; `x-small`/`0` are used for tight groupings (icon+label rows).
- **Section padding, confirmed exact values** (both Section Default and Section Alt use identical padding — they differ only in background color, not spacing): vertical `xxx-large`, horizontal `x-large` — pulled directly from `styles/blocks/core-group-section-*.json`.
- **Container widths:** content 1200px, wide 1366px (`theme.json` `layout.contentSize` / `layout.wideSize`)
- **Breakpoints:** not explicitly declared as named pixel breakpoints — relies on WP core's default block breakpoints (mobile <600px, tablet <782px).

## 4. Component Conventions

**Check the block's Styles panel for a named variation before manually recreating a visual effect.** The full registered set below was pulled directly from `themes/canvas/styles/blocks/*.json` (confirmed via `Blocks.php`'s `registerBlockStyles()`, which loads every file in that directory as a selectable style variation).

### Buttons (`core/button`)
- **`is-style-accent`** — the dominant solid CTA ("Apply Now", "Free Mortgage Analysis"). Computed style confirmed: Accent (`#F5A01B`) background, Primary (`#0D212E`) text, 6px radius, weight 500, padding `16px 23px`. Used on nearly every page.
- **`is-style-accent-alt`** — same colors as `is-style-accent` (confirmed via computed style — bg/text/radius are identical), the *only* difference is a smaller footprint: padding `12.8px 16px` vs `16px 23px`. Use this compact variant for repeated inline CTA rows (confirmed use: the `/types-of-loans/` per-program-row "Apply Now" buttons), and full-size `is-style-accent` for standalone hero/section CTAs.
- **`is-style-text-only`** — ghost/phone-number style: `currentColor` text, transparent background, 2px outline via `theme.json`'s `core/button` "outline" variation. Confirmed on phone-number links, often combined with `is-style-text-link` (adds a `phone-android` icon attribute, zero padding) for the "608-834-5000" pattern.
- **`is-style-primary` / `is-style-secondary`** — registered but their style-variation JSON files are **empty** (`"styles": {}`). They exist as selectable labels but currently carry no distinct visual treatment beyond the button block's base style (Primary-navy bg / white text). Not seen in the 40-page content audit — don't reach for these; use Accent/Accent-alt/Text-only instead.

### Headings (`core/heading`)
- **`is-style-section-heading`** — confirmed exact definition (nothing more): `textTransform: capitalize`, `fontWeight: 600`. **Correction to the prior snapshot:** this style does **not** produce the amber/contrast underline bar seen under most section headings — that's a separate element, see below.

### The underline/accent bar — it's a synced pattern, not a heading style
The short colored bar under H1/H2 headings (documented in the prior snapshot as "likely part of Section Heading") is actually a **separate, reusable synced block**, inserted after the heading:
- **"Headline Separator"** (`wp_block` ID 235, used 79 times) — `core/separator`, `is-style-pull-left`, `backgroundColor: contrast` (`#FCB76A`)
- **"Centered Headline Sep"** (`wp_block` ID 397, used 9 times) — same, but `is-style-pull-center`, for centered heading layouts
**Agents building new sections should insert this exact reusable block** (`<!-- wp:block {"ref":235} /-->` or `397` for centered) rather than manually drawing a separator or trying to reproduce the effect via heading styles.

### Cards & callouts — two distinct patterns, don't conflate them
1. **`is-style-card-block`** (`core/group`) — a formal, registered card style. Confirmed computed style: white background, 6px radius, 1px `slate-200` border on top/right/bottom, a **4px Accent-colored left border**, Material shadow preset (`0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)`). **Correction to the prior snapshot**, which claimed no formal card pattern existed and shadow presets "weren't observed in active use" — this is exactly that: a real, shadowed, accent-bordered card. Used on `/purchase/` (3×) and `/wheda-loans/` (2×) for content callout boxes. Reach for this for any new highlight/callout box rather than inventing a new treatment.
2. **`mwf/linked-card`** (custom block, 8 uses) — a distinct, fully-clickable interactive navigation tile (`data-wp-interactive`), used for linking whole cards to a destination — confirmed use: homepage link to `/types-of-loans/`, and each `/calculators/` sub-page link. This is a *navigation* pattern, not a content callout — use it when the whole card should be a link to another page, not for in-page highlight boxes.
- **FAQ accordion** (`core/accordion`, `is-style-primary`): confirmed white card, thin border, right-aligned "+" toggle. No distinct visual rules in the theme's style-variation JSON (styling comes from compiled block CSS, not inspected this pass) — no drop shadow observed, consistent with the prior snapshot.
- **"Program row" pattern** (seen on `/types-of-loans/` and similar hub pages): left title / right dual-button row (`is-style-accent-alt` "Apply Now" + `is-style-text-only` "More Info"), thin divider between rows. Confirmed still the reusable pattern for any new list of options/programs.

### Cover blocks (`core/cover`)
- **`is-style-cta-block`** — confirmed: 6px radius, Natural shadow preset, generous padding (`x-large` vertical, `large` horizontal). Used 10 times for CTA-band sections with a background image/color. Not documented in the prior snapshot at all.

### Custom content blocks in heavy rotation
- **`mwf/definition-list` + `mwf/definition-list-item`** (16 + 55 uses — the single most-used custom block pattern on the site) — a term/definition layout, used extensively on `/glossary-of-terms/` and loan-type pages for structured key-term content. Prefer this over a manual heading+paragraph pattern for any definition-style content.
- **`mwf/standard-calculator`, `mwf/refinance-calculator`** — the interactive mortgage calculator blocks (1 use each, on their respective calculator pages).
- **`outermost/icon-block`** (third-party Icon Block plugin) — decorative circular icon badges. Confirmed exact pattern for the hero's floating badge: `iconBackgroundColor: accent` (`#F5A01B`), `iconColor: white`, fully rounded (`border-radius: 300px`), `className: floating-icon-top-right`. A second confirmed pattern (in the "Contact List Group" reusable block, below) uses a smaller 40px badge with `iconBackgroundColor: slate-200`, `iconColor: secondary` (green), for inline icon+text rows.
- **`gravityforms/form`** — lead form embeds (Mortgage Analysis, Contact Us), 3 uses.

### Form fields
Confirmed exact, directly from `styles/custom.json` → `settings.custom.form` (matches the prior snapshot's guess precisely — now fully confirmed, no longer `[TO CONFIRM]`): white background, 1px solid border `hsl(213, 27%, 84%)`, small (4px) border radius, focus border `hsl(215, 20%, 65%)`, focus background stays white.

## 5. Recurring/Synced Patterns

These are registered WordPress **synced patterns** (`wp_block` custom post type) — edit once, updates everywhere they're inserted. **Always reuse the existing block via its `ref`, never rebuild these manually:**

| Pattern | `ref` | Used | What it is |
|---|---|---|---|
| Headline Separator | 235 | 79× | Left-aligned Contrast-colored underline bar under a heading |
| Centered Headline Sep | 397 | 9× | Same, centered — for center-aligned heading layouts |
| Contact List Group | 550 | — | Icon+text contact row: 40px green icon on a Slate-200 circle badge, fully rounded |
| Reviews - Default | 637 | — | Full testimonials section: Section Heading + Centered Headline Sep + a Trustindex `[trustindex no-registration=google]` shortcode (Google reviews widget) |

## 6. Site Content Map

40 published pages as of 2026-07-09, confirmed via `wp/v2/pages`. Top-level sections: Home, About Us (+ Meet the Team, Testimonials), Our Team (+ [[Dan O'Brien]] bio), Types of Loans (hub + 8 loan-type detail pages: Fixed Rate, Adjustable Rate, Conventional, FHA, VA, USDA, Home Equity, WHEDA, Bridge), Calculators (hub + 5 calculator pages), Cost Analysis (hub + Purchase/Refinance/Refinance Cash Out), Purchase, Refinance, Mortgage Analysis (+ success page), Contact Us (+ success page), Cash Advantage Program, FAQs, Glossary of Terms, Blog, Sandbox, and resource-template pages (Legal Disclaimer, Privacy Statement, Accessibility).

## 7. Imagery & Icon Style

- **Photography style:** `[TO CONFIRM]` — pages lean on icon/graphic treatments (badges, checkmarks) rather than photography in hero sections; the one confirmed photo use is [[Dan O'Brien]]'s headshot (`is-style-soft-shadow` on `core/image`, used 16× total across pages for photo treatments).
- **Icon style:** simple line/glyph icons inside solid amber (`#F5A01B`) circular badges (`outermost/icon-block`, see above) for decorative hero elements; green circular checkmark icons for list bullets throughout body content (`is-style-icon-accent` / `is-style-icon-primary` on `core/list`).
- **Logo:** house-outline mark in amber + "Educated Mortgage" wordmark in navy, tagline "Your smartest way home." in amber italic, on a white header background.

## Known Inconsistencies / Cleanup Targets

Real drift and a couple of theme-file bugs found while auditing content against the design system — worth a QA pass, and useful context so new work doesn't copy the pattern:

- **Hardcoded hex instead of the palette swatch:** `#387d2c` (Secondary) appears as a literal hex 26 times, `#f5a01b` (Accent) 16 times, in place of picking the named Theme swatch. A stray `#204ce5` (blue) appears 3 times and doesn't match *any* documented brand color — worth a manual look to confirm intent.
- **`/glossary-of-terms/`** hardcodes a border color as the literal HSL value for Slate-200 (`hsl(214, 32%, 91%)`) instead of using the `has-slate-200-border-color` preset class used correctly elsewhere.
- **`is-style-fill`** (2 uses, `/about-us/`, `/wheda-loans/`) doesn't match any registered style — the theme's actual registered image style is `fill-container`, not `fill`. This class is very likely a no-op (falls through to default styling silently).
- **Theme file bug:** `styles/blocks/core-list-icon-secondary.json` incorrectly declares `title: "Icon - Primary"` / `slug: "icon-primary"` — identical to `core-list-icon-primary.json`. As registered, there is no actual "Icon - Secondary" list style; it's silently shadowed by/duplicating Icon - Primary. Worth flagging to Codex as a real theme bug, not just a documentation gap.
- **`styles/blocks/core-group-section-default copy.json`** — the stray " copy" in the filename suggests a duplicate/leftover file rather than an intentional naming convention. Functionally harmless (still registers correctly) but worth a cleanup pass.

## Related

- [[Educated Mortgage]]
- [[Educated Mortgage Stack]]
- [[Educated Mortgage Brand]]
- [[Educated Mortgage Voice]]
