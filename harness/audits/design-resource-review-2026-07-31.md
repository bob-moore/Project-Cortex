---
date: 2026-07-31
description: "Review of external design-reference, design-analysis, motion, component, and UI intelligence resources for ProjectCortex."
tags:
  - harness
  - audit
  - design
  - resources
status: reviewed
---

# Design Resource Review

## Executive conclusion

The generic-design problem is primarily a context and decision-loop problem, not a shortage of visual resources.

The most valuable future capability is a governed process that turns client/context evidence into explicit design rules, explores materially different directions, uses references selectively, and verifies the rendered result. Reference libraries should feed that process; they should not become the authority or the default style generator.

## Resource assessments

### Refero Styles

URL: https://styles.refero.design/

What it provides:

- Searchable examples of DESIGN.md files extracted from high-quality websites.
- Filtering by style, color, font, category, and broad visual direction.
- Design-resource and prompt-reference navigation.

Value:

- Good source for studying how visual observations can be converted into agent-readable rules.
- Useful for selecting a small number of reference directions before a prototype.

Risk:

- The examples can encourage brand/style imitation or prompt shopping.
- A reference description is not client authority and should not be copied into a project without interpretation.

Recommendation: Adopt as an optional reference source after the brief and decision criteria exist. Do not import examples wholesale.

### awesome-design-md

URL: https://github.com/voltagent/awesome-design-md

What it provides:

- A curated collection of DESIGN.md files analyzed from real websites.
- A plain-text design-system format for coding/design agents.
- Brand and product examples organized by platform and visual language.

Value:

- Strongly aligned with the project's interest in DESIGN.md as a portable design contract.
- Useful source material for defining token roles, typography rules, layout patterns, and anti-patterns.

Risk:

- The repository's central promise is “copy a DESIGN.md and build a matching UI,” which can reproduce surface language without client strategy.
- Brand-specific files must remain reference material, not canonical authority.

Recommendation: Use as source material for a future project-local `DESIGN.md` or design-prototype workflow. Extract methods and schemas, not brand packages.

### skillui

URL: https://skillui.vercel.app/

What it provides:

- Local static analysis of a URL, repository, or folder.
- `default` and `ultra` modes.
- Extraction of colors, fonts, spacing, components, animations/keyframes, layout, scroll journey, and font bundles.
- Outputs a design folder / `.skill` artifact; no API keys and no cloud analysis are advertised.

Value:

- Highest practical value for existing-client redesign and rendered-review work.
- Could create current-system evidence before a redesign, reducing invented assumptions.
- The extracted scroll journey and component map directly support the Designer evidence ledger.

Risk:

- Reverse-engineering an existing site is not the same as creating an original direction.
- Static analysis can miss semantics, content intent, business constraints, interaction edge cases, and accessibility behavior.
- Generated output still requires authority labeling and human/agent interpretation.

Recommendation: Evaluate for a later `redesign`/`rendered-review` tool path, not as the default new-layout generator. Installation is optional (`npm install -g skillui`); do not install yet.

### MotionSites AI

URL: https://motionsites.ai/

What it provides:

- A library of AI website prompts and visual examples.
- Categories for sites, apps, sections, and animated backgrounds.
- Copyable and locked/unlockable prompt entries plus an educational academy.

Value:

- Useful for motion and section-level inspiration.
- Could help the Designer name a motion intent or compare interaction directions.

Risk:

- It is primarily a prompt/inspiration marketplace, not an evidence or quality system.
- It can amplify novelty-seeking and generic “AI premium landing page” patterns.
- Prompt availability and licensing/access vary by entry.

Recommendation: Keep reference-only. Use only after structure, audience, and reduced-motion/accessibility requirements are defined.

### Aceternity UI

URL: https://ui.aceternity.com/

What it provides:

- 200+ Tailwind CSS, Framer Motion, component, block, and template examples.
- Strong catalog of animated effects such as parallax, bento grids, canvas cards, text reveals, and glowing effects.
- Copy/paste implementation-oriented workflow.

Value:

- Useful for Developer implementation after a design direction is approved.
- Useful as a bounded interaction reference when a real product need calls for motion.

Risk:

- It is an implementation/component library, not a discovery or design-governance process.
- Overuse will produce recognizable “Aceternity-style” marketing pages and can substitute effects for hierarchy.
- It assumes a Tailwind/Framer-oriented implementation lane and does not map directly to OpenPencil.

Recommendation: Do not use it to solve the current generic-design problem. Route it to Developer after design approval, selectively and with motion/accessibility acceptance criteria.

### UI UX Pro Max

URL: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

What it provides:

- An agent skill/CLI with a broad design-intelligence catalog.
- The repository advertises 161 reasoning rules and 84 UI styles.
- Platform-aware guidance, anti-patterns, stack starters, search/data resources, and design-system logic.
- Active repository with a Claude skill/plugin structure and CLI support.

Value:

- Potentially useful as a source for structured decision rules, anti-pattern checks, platform guidance, and style selection.
- Could improve the current process if reduced to a small, vault-neutral review layer.

Risk:

- It overlaps substantially with the existing ProjectCortex design discipline, taste skills, accessibility layer, and design rubric.
- Wholesale installation would create competing authorities and increase routing ambiguity.
- Large catalogs of styles and rules can encourage style selection before client/context discovery.
- External agent-skill packages should be reviewed for scope, execution behavior, licensing, and source freshness before adoption.

Recommendation: Do not install wholesale. Extract only unique methods after a targeted comparison against `.agents/disciplines/design/`, `design-delivery`, `design-taste-frontend`, `design/principles.md`, and the accessibility layer.

## Recommended design process correction

1. Start with a real or mock brief: audience, business goal, primary task, constraints, proof, and success condition.
2. Build a small evidence ledger: authority, current-system facts, observations, proposals, and gaps.
3. Create a `DESIGN.md`-style direction contract before composing the page: typography roles, token roles, layout grammar, imagery rules, interaction posture, motion posture, and prohibited patterns.
4. Use one or two external references to answer a named decision, not to supply a whole aesthetic.
5. Generate at least two materially different directions when the visual direction is unresolved.
6. Select a direction against explicit criteria: brand fit, hierarchy, audience comprehension, conversion task, accessibility, responsive behavior, and implementation fit.
7. Prototype in OpenPencil with provisional labels and a known artifact/version path.
8. Inspect the actual render at representative desktop, mobile, and intermediate widths.
9. Review for generic patterns, overflow, state gaps, accessibility requirements, and unsupported tool syntax.
10. Obtain user/parent approval before Developer or WordPress handoff.

## Addendum (2026-08-01)

Priority #1 below (build the deferred governed `design-prototype` workflow) is
superseded: no new Design skills until a concrete recurring need is
identified — see [[key-decisions]]. Priority #2 (OpenPencil artifact/export/
naming/version conventions) is closed, not merely deferred: OpenPencil is
installed but intentionally not referenced by any canonical Design skill. Do
not wire it in unless explicitly asked. Design bucket closed; porting focus
moves to Development.

## Priority order for future work

1. Build the deferred governed `design-prototype` workflow in ProjectCortex.
2. Define the OpenPencil artifact, export, naming, version, and evidence conventions.
3. Add a small reference-design contract / `DESIGN.md` stage before visual composition.
4. Evaluate skillui for existing-site redesign evidence.
5. Compare unique UI UX Pro Max rules against the current design rubric and extract only non-overlapping value.
6. Keep Refero Styles and awesome-design-md as curated reference inputs.
7. Keep MotionSites and Aceternity UI as optional motion/implementation references.
8. Do not install any of the external packages wholesale yet.

## Sources checked

- https://styles.refero.design/
- https://github.com/voltagent/awesome-design-md
- https://skillui.vercel.app/
- https://motionsites.ai/
- https://ui.aceternity.com/
- https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
