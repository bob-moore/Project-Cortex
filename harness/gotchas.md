---
date: 2026-07-31
description: Known pitfalls and failure modes for agents working inside this vault.
tags:
  - harness
  - gotchas
---

# Gotchas

Known pitfalls and failure modes for agents working inside this vault.

## Current Gotchas

- Do not treat `.claude/` files as canonical just because they currently contain
  the most implementation detail.
- Do not store secrets in `.agents/`, `harness/`, root docs, or tracked manifests.
- Do not assume every runtime supports the same command, hook, skill, or
  multi-agent semantics.
- Deleting oversized generated/runtime files from the current tree is not enough
  for a first GitHub push if unpublished local history still contains them.
  Verify remote history and rewrite only unpublished history when GitHub rejects
  large legacy blobs.
- `.agents/disciplines/design/modes.md` doesn't cover the case where a target
  already has a rendered implementation but the user wants a from-scratch
  design pass rather than a critique of what's there. `redesign` assumes an
  approved baseline to trace contract/runtime/correction against; `new-layout`
  assumes no existing render. When a real render exists but nothing about it
  is "approved" and the intent is genuinely fresh thinking, the designer has to
  make an undocumented judgment call between the two modes. Design intent
  (fresh vs. corrective) is one of the fiddliest things to pin down in a design
  session, and this is a case the discipline's own mode split doesn't
  disambiguate. Surfaced 2026-07-30 during a live trial of `design-delivery`
  against the garagedoorguru homepage (see
  [[Astro Publishing Platform MVP|Astro Publishing Platform MVP]]; spec kept
  outside the vault since that project has no `Clients/`/`Projects/` record).
  Until `modes.md` is updated, state explicitly which mode was chosen and why
  whenever this ambiguity comes up.
- `skillui`'s generated DESIGN.md/SKILL.md is not trustworthy as evidence on
  its own, even in `--mode ultra` with Playwright installed. Tested 2026-07-31
  against a real, plugin-heavy WordPress/Elementor site
  (wedaviesremodeling.com/handyman-services — see [[dependencies|Environment
  Dependencies]]): the tool confidently reported "dark-themed, black
  background" and a body font of "Courier 10 Pitch," when the live page (and
  skillui's own captured screenshot) is a plain white-background site with
  black text and a red accent. `tokens/typography.json` tags every type-scale
  entry `"source": "css"` and `tokens/colors.json` still says `"theme":
  "dark"` even after ultra mode — meaning the theme/typography/color-role
  narrative is built from raw CSS declaration text (unused theme-default
  variables, third-party plugin/icon-font fallback stacks, e.g. social-share
  brand colors like Facebook blue and Google red mislabeled as "extended
  palette") rather than from resolved, actually-rendered computed styles.
  Installing Playwright fixed nothing about this — it only added real
  screenshots/scroll-journey/component-state captures as a byproduct, which
  *are* trustworthy since they're just images of the real page.
  **Decision 2026-07-31: rejected as a harness dependency and uninstalled**
  (`npm uninstall -g skillui`) — not worth keeping installed just for its
  screenshot capture when its core deliverable (the design-token summary)
  can't be trusted without redoing the verification work by hand anyway. It
  had also auto-installed two test `.skill` packages into `~/.claude/skills/`
  (removed) — a reminder that `.claude/skills/` should stay empty per
  [[manual|the harness manual]]'s adapter-state convention, and that
  installing a third-party CLI can silently write into that directory. See
  [[dependencies|Environment Dependencies]] for the current dependency list.
  If design-token extraction is revisited, evaluate a different method rather
  than reinstalling this one. **Update 2026-07-31:** replacement method found
  and formalized as the `design-reverse-engineering` skill — vision-based
  extraction from real screenshots plus targeted `getComputedStyle` spot
  checks, validated against this same site with a decisive accuracy win over
  skillui. Use that skill going forward; do not reach for a static-CSS-parsing
  CLI again without re-testing it as rigorously as skillui was tested here.
