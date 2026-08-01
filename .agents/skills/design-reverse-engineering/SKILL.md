---
name: design-reverse-engineering
description: "Use when reverse-engineering an existing site/page or a static reference screenshot into a structured design-token draft (color system, typography rules, layout/grid, texture/vibe). Feeds design-delivery's evidence ledger for redesign mode (existing site) or visual-direction/new-layout mode (external reference image used as inspiration). Uses Claude's native vision plus targeted computed-style verification instead of a third-party static-CSS-parsing tool, which was tested and rejected for producing confidently wrong output on real-world sites."
---

# Design Reverse Engineering

Turns an existing rendered page, or a static reference screenshot handed to you
as "design direction," into a structured design-token draft another role
(`design-delivery`, `developer`) can act on. Produces evidence, not authority —
output from this skill is always `observation` (or `current-system-fact` when
Mode A verifies a claim against the client's own live site), never `authority`.

## Why this skill exists, not a CLI

A static-analysis CLI (`skillui`) was tested 2026-07-31 against a real,
plugin-heavy WordPress site and confidently reported the opposite of reality —
"dark theme, black background" and a body font of "Courier 10 Pitch" on a page
that is a plain white-background site with a clean sans body font. The
failure was structural, not a bug: it labeled raw CSS *declaration* text
(unused theme-default variables, third-party icon-font fallback stacks,
social-share brand colors) as if it were the *rendered* result, and installing
Playwright for real computed-style access didn't fix it — the tool's summary
layer never used that data. Full writeup: [[gotchas|harness gotchas]].

The fix is to read pixels, not CSS text. A vision-capable model looking at a
real screenshot and reasoning about what it actually sees does not have that
failure mode. Validated 2026-07-31 against the same site skillui got wrong —
this method matched every ground-truth `getComputedStyle` value skillui
missed (theme, body font, heading font, heading size) and independently
reconfirmed the one thing skillui got right (the accent color). Source
method: [note.com — Reverse Engineering Design Skills with
AI](https://note.com/deft_llama5964/n/nabbb2458a41d).

## Two input modes

### Mode A: Live site (preferred — higher confidence)

1. Navigate to the target and capture screenshots: full page or a scroll
   sequence covering hero, body sections, and footer. Use the
   `claude-in-chrome` tools (`navigate`, `computer` screenshot/scroll).
2. Pull 4-6 real computed-style spot checks via `javascript_tool` +
   `getComputedStyle` — do not skip this step when a live site is available.
   Minimum spot-check set: body background + text color, one heading's
   font-family/size/weight, body text's font-family/size, one accent/CTA
   element's color. These are the load-bearing claims a summary is most
   likely to get wrong (theme, font names, type scale).
3. Reason over the screenshot(s) using the extraction framework below.
4. Tag every claim `verified` (matches a spot check) or `observed` (visual
   judgment only, no spot check ran for that specific value).

### Mode B: Static reference image only (no live DOM)

1. No computed-style verification is possible. Tag every color/font/size
   claim `estimated` — visual judgment from pixels, not measured.
2. Extract using the same framework below.
3. Say explicitly in the output that hex/font values are a starting
   direction, not exact production tokens, and should be treated as
   `observation`, never promoted to canonical tokens without confirmation.
4. This is the mode for "here's a screenshot I like, use it as a design
   direction" requests — a common failure pattern is handing a reference
   image to a generation tool with only a vague instruction ("make it look
   like this"). Without an explicit variable breakdown, the output drifts.
   Producing the structured breakdown below is what prevents that drift.

## Extraction framework

- **Color_System**: background / primary text / heading text / accent
  hex values (or best estimate in Mode B), approximate area ratio across the
  composition, one-line psychological/tonal read.
- **Typography_Rules**: font family per role (heading vs. body), size +
  weight per role, jump rate (heading size ÷ body size), case treatment
  (uppercase labels, sentence case, etc.), any recurring typographic device
  (e.g. all-caps letter-spaced labels used as a system-wide pattern).
- **Layout_and_Grid**: composition pattern (single-column, split-screen,
  asymmetric grid...), whitespace density, repeated structural devices
  (comparison cards, repeated CTA placement, distinctive masks/frames).
- **Texture_and_Vibe**: photography/illustration style (real vs. stock,
  lifestyle vs. clinical), shadow depth, gradient/texture/noise use, overall
  tonal read (premium, functional, playful, clinical...).

## Output format

Return a Design Tokens draft, evidence-tagged per value:

```text
Source: <URL, or "static reference image", + Mode A/B>
Confidence basis: <computed-style spot checks run, or "vision-only, no live DOM">

Color_System:
  background: <hex> [verified|observed|estimated]
  text-primary: <hex> [...]
  accent: <hex> [...]
  area ratio / impression: <one line>

Typography_Rules:
  heading: <family>, <size>, <weight> [...]
  body: <family>, <size>, <weight> [...]
  jump rate: <heading size> / <body size>
  case/label treatment: <one line>

Layout_and_Grid:
  composition: <one line>
  whitespace density: <one line>
  structural devices: <bullet list>

Texture_and_Vibe:
  photography/imagery: <one line>
  depth/shadow: <one line>
  overall read: <one line>

Gaps / low-confidence items: <anything not resolvable from the screenshot(s) available>
```

## Evidence ledger integration

- Mode A output lands in `design-delivery`'s evidence ledger as
  `current-system-fact` for spot-check-verified claims about the client's own
  live site, `observation` for the rest.
- Mode B output always lands as `observation` — a reference image is
  inspiration, never client authority, matching `design-delivery`'s existing
  rule verbatim ("Do not treat a screenshot, global style reference, or
  external inspiration catalog as approved client authority"). This skill
  produces the input that rule polices; it does not relax it.
- Neither mode's output is self-approving. Route the draft back through
  `design-delivery`'s normal mode procedure (`redesign` for Mode A,
  `visual-direction` or `new-layout` for Mode B) for approval.

## Copyright and ethics boundary

- Extract abstract structural/color/typographic *rules* (the idea layer).
  Never instruct downstream generation to reproduce a specific third party's
  specific composition, copy, or imagery (the expression layer) — this
  matters most in Mode B, where the reference is commonly a competitor page
  or a found image that is not the client's own property.
- Don't narrow a generation task to imitate one single external reference too
  closely ("overfitting" to one creator's specific work). Treat any one
  reference as one input alongside the client's own governed Brand/Voice/
  Design Tokens context, not a template to clone.

## Boundaries

- Do not use a third-party static-analysis CLI as a substitute for this
  method — tested and rejected, see [[gotchas]]. If a future tool claims to
  do this reliably, verify it against a real, plugin-heavy site before
  trusting it, the same way this method was verified.
- Do not skip the computed-style spot-check step in Mode A because the
  screenshot "looks obvious" — the skillui failure was exactly this kind of
  overconfidence, just automated.
- Do not treat this skill's output as approved design direction. Same rule as
  `design-delivery`: user or Brand/Design Tokens authority approves before
  anything here becomes canonical.

## Source Notes

Method adapted from [note.com: "Reverse Engineering Design Skills with AI:
Practice and Application of Image Reverse
Engineering"](https://note.com/deft_llama5964/n/nabbb2458a41d) (2026-07-25).
Validated 2026-07-31 against wedaviesremodeling.com/handyman-services with a
decisive accuracy win over `skillui` (rejected, see [[gotchas]] and
[[dependencies|Environment Dependencies]]).
