---
name: design-delivery
description: "Use when a design task needs an implementable page, layout, component, pattern, prototype, redesign, or rendered conformance review. Applies the canonical Design discipline to turn approved content and governed visual context into a specification, acceptance matrix, handoff, or evidence-backed design review without mutating production code, WordPress state, or external systems."
---

# Design Delivery

Use this skill as the core orchestration layer for design work in this vault.
It composes the `designer` role, `.agents/disciplines/design/`, approved
content, client design context, and downstream handoff rules.

This skill does not replace Brand, Voice, Design Tokens, Writer, Developer,
WordPress Operator, or Verifier authority.

## Operating Contract

Start with vault context and design boundaries.

1. Read `.agents/disciplines/design/contract.json`.
2. Read `.agents/disciplines/design/modes.md`.
3. Read `.agents/disciplines/design/rubric.md`.
4. Read `.agents/disciplines/accessibility/contract.json`,
   `.agents/disciplines/accessibility/modes.md`, and
   `.agents/disciplines/accessibility/rubric.md` when the artifact includes a
   user-facing surface, interaction, content structure, or rendered review.
5. Select one primary mode: `research`, `new-layout`, `redesign`,
   `component-pattern-spec`, `visual-direction`, `prototype`, or
   `rendered-review`.
6. Identify the client/project, target, audience, primary task, destination,
   approval boundary, and current implementation constraints.
7. For client-specific work, read Brand, Voice, Design Tokens, approved content,
   Stack notes, source, and rendered evidence as required by the selected mode.
8. Keep the evidence ledger categories separate: `authority`,
   `current-system-fact`, `observation`, `proposal`, and `gap`.
9. Do not publish, deploy, edit production code, mutate WordPress state,
   rewrite approved copy, or change external systems.

When the request asks for inspiration, a moodboard, reference research, or a
new direction without an approved visual direction, route to the canonical
`design-research` workflow before continuing with implementation-oriented
design work. A research packet is governed evidence, not client authority; the
parent workflow or user must approve the selected direction.

## Mode Procedure

### Research

When the task requires inspiration, a moodboard, reference research, or an
unresolved visual direction, execute the canonical `design-research` workflow.
It owns source routing, annotated references, anti-SaaS checks, alternatives,
and approval before this skill handles implementation-oriented design work.

### New Layout

Use when creating a new page, screen, section, or bounded flow.

Required result:

- primary surface archetype and hierarchy
- section or region composition
- component map and token use
- responsive and state behavior
- accessibility requirements
- observable acceptance matrix

Read `references/spec-and-handoff.md` before writing the artifact.

### Redesign

Use when improving an existing rendered surface.

Trace the actual target:

```text
route/page -> composition -> shared component/variant -> token/style owner -> rendered result
```

Each redesign finding needs:

- contract: approved design, content, or task rule
- runtime: evidence that the owner/behavior reaches the target
- correction: one supported change

When the evidence ledger needs a token/color/typography inventory of the
existing rendered surface, use the `design-reverse-engineering` skill (Mode A)
to build it — do not hand-eyeball it and do not use a static-CSS-parsing tool
as a substitute; see that skill for why.

Read `references/visual-critique.md` and
`references/spec-and-handoff.md` before returning a revised spec.

### Component/Pattern Specification

Use when defining a reusable component or interaction pattern.

Define purpose, anatomy, variants, content limits, responsive behavior,
interaction states, keyboard/focus behavior, semantics, accessibility, examples,
and prohibited misuse.

Read `references/component-and-interaction-patterns.md` and
`references/spec-and-handoff.md`.

### Visual Direction

Use when governing context leaves real aesthetic discretion and selection
before implementation would prevent rework.

Keep alternatives meaningfully different in composition, interaction, hierarchy,
or brand expression. Color swaps are not meaningful alternatives by themselves.
Global skills and visual catalogs can inform this mode, but they do not override
client authority.

When the user hands over a reference screenshot as "design direction" (a
competitor page, an inspiration image, anything not the client's own current
site), use `design-reverse-engineering` (Mode B) to turn it into a structured
token draft before reasoning about direction from it. A screenshot without
that extraction step tends to produce vague, driftable interpretations rather
than a usable reference.

Read `references/exploration-and-prototyping.md`.

If the direction has not been narrowed with a research packet, route to
`design-research` first. Do not treat a global gallery or component library as
the moodboard by default.

### Prototype

Use when a disposable low, medium, or high fidelity artifact is needed to choose
a direction. A prototype is decision evidence, not production code.

Read `references/exploration-and-prototyping.md`. If code-facing
implementation begins, route to `developer`.

### Rendered Review

Use after implementation exists and an approved design artifact is available.

Compare the current artifact with the approved specification at representative
viewports and states. Return `PASS`, `FIX`, `BLOCK`, or `UNDECIDED` with
evidence. Do not silently repair the implementation.

Read `references/rendered-review.md` before reviewing.

## Handoff Rules

Route by source of truth:

- version-controlled capability, CSS, JavaScript, PHP, component, block, theme,
  plugin, template, Astro file, or build behavior -> `developer`
- WordPress composition/configuration using existing blocks, patterns,
  templates, navigation, Global Styles, content, or settings ->
  `wordpress-operator`
- both -> `developer` first, then `wordpress-operator`
- copy gaps -> `writer`
- brand, token, positioning, or strategic gaps -> `strategist` or user
- independent readiness or closure -> `verifier` or parent workflow

## Required Output

Return:

```text
Status: awaiting-approval | needs-revision | blocked | PASS | FIX | BLOCK | UNDECIDED
Mode:
Client/project:
Target:
Destination:
Context read:
Evidence:
Artifact path or review target:
Decisions:
Assumptions:
Gaps:
Accessibility coverage:
Acceptance matrix:
Approval or revision needed:
Recommended next role:
Next:
```

## Boundaries

- Do not use lorem ipsum, fake metrics, fabricated testimonials, invented
  product claims, or silent copy rewrites.
- Do not invent tokens or canonical component rules.
- Do not treat a screenshot, global style reference, or external inspiration
  catalog as approved client authority.
- Do not claim accessibility conformance from design intent or automated checks
  alone.
- Do not self-approve a design. The parent workflow or user owns approval.

If this skill conflicts with `.agents/disciplines/design/rubric.md`, the rubric
wins.

## Reference Files

- `design-reverse-engineering` (sibling skill): turns an existing rendered
  surface or a static reference screenshot into a structured, evidence-tagged
  design-token draft. Use for `redesign`'s evidence ledger or `visual-direction`'s
  reference-image handling.
- `references/spec-and-handoff.md`: design specification and implementation
  handoff structure.
- `references/rendered-review.md`: rendered implementation review method and
  verdict rules.
- `references/component-and-interaction-patterns.md`: component and interaction
  specification guidance.
- `references/exploration-and-prototyping.md`: direction exploration and
  disposable prototype rules.
- `references/accessibility-requirements.md`: design-level accessibility
  requirements and handoff expectations; defer to
  `.agents/disciplines/accessibility/` for shared cross-role evidence rules.
- `references/visual-critique.md`: critique lenses for rendered review and
  redesign.
- `.agents/disciplines/design/principles.md`: compact principle layer for
  broader design judgment when hierarchy, cognition, interaction, aesthetics,
  or robustness tradeoffs decide the task.

## Source Notes

This skill adapts `stash/design/designer-delivery` and selected references from
`Owl-Listener/designer-skills` (MIT), `ibelick/ui-skills` (MIT),
`nextlevelbuilder/ui-ux-pro-max-skill` (MIT), and `pbakaus/impeccable`
(Apache-2.0). The role boundary, authority order, routing, and vault integration
are local to ProjectCortex.
