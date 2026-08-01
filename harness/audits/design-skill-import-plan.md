---
date: 2026-08-01
description: "Import plan for design skill packs staged under stash/design."
tags:
  - harness
  - audit
  - design
  - skills
status: active
created: 2026-07-29
updated: 2026-08-01
---

# Design Skill Import Plan

## Scope

Review and stage a project-local import plan for the design skill packs in
`stash/design/`.

The goal is to make the design capabilities this vault depends on
self-contained under `.agents/` while preserving the user's option to keep and
use global skills outside this vault. This plan does not add a rule that
forbids or deprioritizes global skills.

## Implementation Status

Completed on 2026-07-29:

- Added `.agents/disciplines/design/` using the repo's established discipline
  file shape: `README.md`, `contract.json`, `modes.md`, `rubric.md`, and
  `skill-map.json`.
- Added `.agents/skills/design-delivery/` with reference files adapted from
  `stash/design/designer-delivery`.
- Updated `.agents/roles/designer/` with stronger handoff, accessibility,
  rendered-review, and external-read boundaries.
- Added `.agents/disciplines/accessibility/` and
  `.agents/skills/accessibility-foundation/` as a shared Design/Development
  accessibility surface.
- Extracted `.agents/disciplines/design/principles.md` from
  `stash/design/universal-design-principles` instead of importing 137 skills.

Still deferred:

- `landing-page-design` for General Marketing/CRO.
- `popular-web-designs` as optional inspiration/reference material.
- `design-systems` and `frontend-design` dedupe into the design taste layer.

Rejected 2026-08-01: `claude-design` will not be ported or tracked as future
work. Decision: no new design skills until a concrete recurring need is
identified. See [[key-decisions]].

## Source Inventory

Top-level packs in `stash/design/`:

| Pack | Current project-local state | Recommended disposition |
|---|---|---|
| `accessibility` | Not imported | Adapt into a shared accessibility reference/rubric used by Design now and Development later. |
| `claude-design` | Rejected 2026-08-01 | Do not port. No new design skills until a concrete recurring need is identified; not tracked as future work. |
| `design-systems` | Not imported | Distill selected aesthetic and anti-generic guidance into design direction references; do not import under this name as a design-system governance layer. |
| `designer` | Not imported as a skill | Use to strengthen `.agents/roles/designer/role.md` and its contract rather than creating a second Designer capability. |
| `designer-delivery` | Not imported | Promote as the primary core design-delivery skill after adapting its references to vault conventions. |
| `frontend-design` | Not imported | Compare against existing `design-taste-frontend`; fold only unique guidance into the canonical design taste/reference layer. |
| `high-end-visual-design` | Already imported | Keep as an optional specialist visual style skill. Do not make it the default design standard. |
| `landing-page-design` | Not imported | Defer to General Marketing/CRO because it mixes design with conversion strategy and has external tool assumptions. |
| `popular-web-designs` | Not imported | Keep as optional inspiration/reference material; avoid literal imitation of named brands. |
| `redesign-existing-projects` | Already imported | Keep as an optional redesign specialist, governed by Designer/Developer ownership boundaries. |
| `universal-design-principles` | Not imported | Treat as a principle library for selective extraction; do not import 137 skills wholesale. |

Observed stash hygiene issues:

- `stash/design/.DS_Store`
- `stash/design/claude-design/.DS_Store`
- `stash/design/universal-design-principles/.git`

Do not move the nested `.git` directory into `.agents/`.

## Import Principles

- Prefer small project-local canonical skills over wholesale package copies.
- Preserve source attribution and license files when material is adapted.
- Convert runtime-specific assumptions into vault-neutral instructions.
- Keep design intent, implementation, review, and production mutation separate.
- Make accessibility a shared quality surface, not a one-role silo.
- Keep optional visual style skills optional; do not turn any style pack into
  the default taste standard.
- Keep global skills available as user-level capabilities. This vault only needs
  to internalize the skills it depends on for repeatable project behavior.

## Immediate Import Track

### A. Create A Design Discipline

Target path:

- `.agents/disciplines/design/`

Initial files implemented with the repo's established discipline shape:

- `contract.json` - ownership boundary for design intent, design specs,
  rendered review, accessibility handoff, and development handoff.
- `modes.md` - new layout, redesign, component specification, prototype,
  rendered conformance review, and visual direction.
- `skill-map.json` - routes existing project-local design skills by mode.
- `rubric.md` - concise rubric for visual hierarchy, responsive fit,
  accessibility, interaction states, implementation fidelity, and evidence.

Source material:

- `stash/design/designer-delivery/SKILL.md`
- `stash/design/designer-delivery/references/modes-and-evidence.md`
- `stash/design/designer-delivery/references/rendered-review.md`
- `stash/design/designer-delivery/references/spec-and-handoff.md`
- `.agents/roles/designer/contract.json`
- `.agents/roles/developer/contract.json`

### B. Promote Core Design Delivery

Target path:

- `.agents/skills/design-delivery/SKILL.md`

Source material:

- `stash/design/designer-delivery/SKILL.md`
- `stash/design/designer-delivery/references/`

Adaptation requirements:

- Rename away from runtime/persona-specific `designer-delivery`.
- Replace assumptions about a specific runtime with `.agents/` and `harness/`
  paths.
- Keep the four useful modes:
  - new layout
  - redesign
  - component/pattern specification
  - rendered implementation review
- Require approved content or an explicit content placeholder status.
- Require brand/design-token context when it exists.
- Require a handoff artifact that separates:
  - design intent
  - implementation instructions
  - acceptance criteria
  - open risks
  - evidence checked

### C. Update The Designer Role

Targets:

- `.agents/roles/designer/role.md`
- `.agents/roles/designer/contract.json`

Source material:

- `stash/design/designer/SKILL.md`
- `stash/design/designer-delivery/SKILL.md`

Recommended updates:

- Strengthen Designer ownership around visual intent, hierarchy,
  interaction-state expectation, responsive layout direction, and rendered
  conformance review.
- Keep the current non-ownership boundary:
  - no production mutation
  - no publishing
  - no copy approval
  - no code closure without independent verification
- Add explicit handoff expectations to Developer and Writer.
- Add accessibility handoff responsibility without making Designer solely
  responsible for implementation-level accessibility.

### D. Preserve Existing Specialist Skills

Existing project-local skills:

- `.agents/skills/high-end-visual-design/SKILL.md`
- `.agents/skills/redesign-existing-projects/SKILL.md`
- `.agents/skills/design-taste-frontend/SKILL.md`
- `.agents/skills/image-to-code/SKILL.md`
- `.agents/skills/imagegen-frontend-mobile/SKILL.md`
- `.agents/skills/imagegen-frontend-web/SKILL.md`
- `.agents/skills/industrial-brutalist-ui/SKILL.md`
- `.agents/skills/minimalist-ui/SKILL.md`
- `.agents/skills/stitch-design-taste/SKILL.md`

Plan:

- Keep these active for now.
- Classify them in `.agents/disciplines/design/skill-map.md`.

Done 2026-08-01: `design-taste-frontend-v1` and `gpt-taste` were deduped into
`design-taste-frontend` (their only non-overlapping content, a `grid-flow-dense`
bento implementation tip and the inline-typography-image hero pattern, was
folded in) and their directories removed. `frontend-design` (stash-only,
unimported) still overlaps and remains a low-priority future fold; `gpt-taste`
is fully retired, not merely folded. `stitch-design-taste` was kept separate —
it targets a different consumer (Google Stitch `DESIGN.md` generation, not
code output).

## Shared Accessibility Track

Accessibility should be available to Design immediately and reusable by
Development when that bucket is ported.

Implemented target:

- `.agents/disciplines/accessibility/`

Initial files:

- `contract.json` - shared ownership across Designer, Developer, Verifier, and
  WordPress Operator.
- `rubric.md` - POUR-oriented checks, contrast, keyboard/focus, semantics,
  reduced motion, responsive fit, forms, error states, media alternatives, and
  content clarity.
- `modes.md` - design requirements, implementation handoff,
  code-implementation, WordPress stewardship, rendered verification, and
  content-accessibility modes.
- `skill-map.json` - source disposition and future skill candidates.
- `.agents/skills/accessibility-foundation/SKILL.md` - shared cross-role
  foundation skill.

Alternative smaller target if a full discipline feels premature:

- `.agents/disciplines/design/accessibility.md`

Source material:

- `stash/design/accessibility/SKILL.md`
- `stash/design/designer-delivery/references/accessibility-requirements.md`
- `stash/design/universal-design-principles/plugins/process-and-robustness-principles/skills/accessibility/SKILL.md`
- `stash/design/universal-design-principles/plugins/process-and-robustness-principles/skills/accessibility-perceivable/SKILL.md`
- `stash/design/universal-design-principles/plugins/process-and-robustness-principles/skills/accessibility-operable/SKILL.md`
- `stash/design/universal-design-principles/plugins/process-and-robustness-principles/skills/accessibility-understandable/SKILL.md`
- `stash/design/universal-design-principles/plugins/process-and-robustness-principles/skills/accessibility-robust/SKILL.md`

Adaptation requirements:

- Avoid overclaiming legal status unless a jurisdiction and source are cited.
- Separate design review from implementation verification.
- Treat automated checks as partial evidence.
- Require rendered inspection for focus states, contrast in context, target
  sizing, layout reflow, and motion behavior.

## Universal Design Principles Extraction Plan

The `universal-design-principles` source is a nested plugin marketplace with
five plugin bundles and 137 `SKILL.md` files. It should not be copied into this
vault wholesale.

### Extraction Goals

- Build a compact, project-local principle layer that improves design review
  without flooding the skill registry.
- Prefer routers, rubrics, and high-value principles over every sub-skill.
- Keep principle guidance available as references unless a principle directly
  supports a recurring agency workflow.

### Candidate Target Shapes

Implemented first target:

- `.agents/disciplines/design/principles.md`

Optional later target:

- `.agents/skills/design-principles/SKILL.md`

Only create the optional skill if repeated work proves the principles need a
triggerable capability separate from `design-delivery`.

### Extraction Passes

Pass A: inventory and cluster

- Read `stash/design/universal-design-principles/docs/principle-index.md`.
- Build a matrix of principle name, source plugin, recurring agency use case,
  overlap with existing design skills, and import priority.
- Mark each principle as one of:
  - core rubric
  - optional reference
  - development-shared
  - marketing/CRO-shared
  - skip

Pass B: extract core design-review principles

Start with principles that are directly useful in most UI/page design reviews:

- hierarchy
- legibility
- readability
- alignment
- proximity
- similarity and contrast
- figure-ground relationship
- signal-to-noise ratio
- color
- consistency
- progressive disclosure
- mental model
- wayfinding
- affordance
- feedback loop
- errors
- Fitts's Law
- constraints
- accessibility
- form follows function
- iteration
- prototyping

Pass C: map cross-bucket principles

Reserve these for later cross-discipline mapping:

- Development-shared:
  - accessibility
  - errors
  - feedback loop
  - constraints
  - scaling fallacy
  - weakest link
  - factor of safety
- General Marketing/CRO-shared:
  - Hick's Law
  - 80/20 rule
  - exposure effect
  - aesthetic-usability effect
  - archetypes
  - storytelling arcs
  - expectation effect

Pass D: author compact guidance

- Convert selected principles into short, action-oriented checks.
- Keep examples generic and agency-relevant.
- Avoid importing long research summaries unless needed for audit evidence.
- Preserve attribution to the source repository and referenced design canon.

Pass E: verify with design workflows

- Test the extracted principles against:
  - a new landing page design handoff
  - an existing-site redesign critique
  - a component spec
  - a rendered conformance review
- Keep only principles that improve decisions or catch real defects.

## Deferred Source Material

`landing-page-design`:

- Useful for CRO and page strategy.
- Defer to General Marketing/CRO.
- Do not import the `belt` dependency assumption.

`popular-web-designs`:

- Useful as an inspiration catalog.
- Keep reference-only unless a specific workflow needs curated visual
  direction inputs.
- Avoid exact imitation of named brands or protected trade dress.

`design-systems`:

- Useful as visual critique/source material.
- Do not use as the canonical design-system governance layer.
- Extract only reusable ideas into `design/principles.md` or design direction
  references.

## Proposed Implementation Order

1. Add `.agents/disciplines/design/` with `contract.md`, `modes.md`,
   `skill-map.md`, and `quality-gate.md`.
2. Create `.agents/skills/design-delivery/` from `designer-delivery`.
3. Update Designer role contract and role text from `designer` and
   `designer-delivery`.
4. Add the shared accessibility layer or a design-scoped accessibility note.
5. Extract a compact first-pass `design/principles.md` from
   `universal-design-principles`.
6. Run the harness gate and check Markdown/file hygiene.

## Verification Plan

- `node .agents/scripts/gate.mjs`
- `git diff --check`
- Manual review that imported skills reference canonical `.agents/` and
  `harness/` paths instead of stash/global paths.
- Manual review that Designer, Developer, and Verifier ownership boundaries
  remain separate.
- Manual review that accessibility guidance is shared instead of duplicated.

## Related

- [[harness/audits/role-skill-porting-buckets|Role And Skill Porting Buckets]]
- [[harness/skills|Skills]]
- [[harness/manual|Harness Manual]]
