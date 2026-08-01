---
description: Design modes and boundaries for the canonical design discipline.
tags:
  - harness
  - discipline
  - design
---

# Design Modes

Design modes determine which skills, references, and quality checks apply.
Choose one primary mode before producing or reviewing an artifact.

## Universal Inputs

For client-specific work, read when available and relevant:

- `Clients/<Client>/<Client> Brand.md`
- `Clients/<Client>/<Client> Voice.md`
- `Clients/<Client>/<Client> Design Tokens.md`
- approved Writer artifact or approved existing content
- `<Client> Stack.md` or project implementation notes when constraints matter
- existing source, component, and rendered evidence for redesign or review

If Brand, Voice, Design Tokens, content, assets, or implementation target are
missing, label the gap. Continue only when the user approves provisional
exploration or the gap does not affect the selected mode.

## Evidence Ledger

Keep these evidence categories separate:

| Category | Meaning | Can govern implementation? |
|---|---|---|
| `authority` | Approved Brand, Voice, Design Tokens, content, design decision, or contract | Yes, within stated scope |
| `current-system-fact` | Verified source, component, runtime, or rendered behavior | Yes for what exists now |
| `observation` | Measured or directly inspected behavior or appearance | Candidate evidence requiring interpretation |
| `proposal` | New design decision within the brief | Only after approval |
| `gap` | Missing or contradictory authority/evidence | No |

## Modes

| Mode | Owns | Typical Output | Quality Emphasis |
|---|---|---|---|
| `research` | Evidence-backed design research and moodboard work when direction is unresolved. | Brief, routed source set, annotated reference cards, moodboard/reference packet, materially different directions, decision criteria, approval state. | Context fit, source provenance, non-SaaS breadth, content/proof specificity, accessibility/mobile implications, explicit approval before implementation. |
| `new-layout` | A new page, screen, section, or bounded flow from approved content. | Design specification, layout regions, component map, acceptance matrix. | Content hierarchy, responsive behavior, token use, accessibility requirements, implementation handoff. |
| `redesign` | Bounded improvement to an existing rendered surface. | Current-state evidence, supported changes, revised specification. | Verified target identity, highest-leverage changes, preserved identity, non-goals. |
| `component-pattern-spec` | A reusable interface component or pattern. | Anatomy, variants, content rules, states, behavior, acceptance examples. | Reuse scope, state coverage, keyboard/focus behavior, content limits, prohibited misuse. |
| `visual-direction` | Exploratory direction where governing context leaves real discretion. | Direction notes, optional alternatives, decision criteria. | Brand fit, distinct direction choices, explicit approval needs, no fake authority. |
| `prototype` | Disposable low, medium, or high fidelity artifact to choose a direction. | Prototype or exploration artifact plus decision notes. | Prototype as evidence, not production; meaningful variation; approved destination. |
| `rendered-review` | Compare implementation against an approved design artifact. | PASS/FIX/BLOCK/UNDECIDED conformance report. | Observable acceptance criteria, screenshots/DOM/source as needed, exact revision owner. |

## Routing

- If the user asks for inspiration, a moodboard, references, or unresolved visual
  direction, route through `design-research` before `design-delivery`.
- If an approved direction or design artifact already exists, skip research and
  route directly to the applicable implementation/review mode.

- New or changed version-controlled components, CSS, JavaScript, PHP, templates,
  blocks, build tooling, or repository behavior route to `developer`.
- WordPress composition/configuration using existing blocks, patterns,
  navigation, Global Styles, content, or settings routes to
  `wordpress-operator`.
- Hybrid work routes to `developer` first, then `wordpress-operator`.
- Copy gaps route to `writer`.
- Positioning, brand, token, or strategic direction gaps route to `strategist`
  or the user.
- Independent review and closure route to `verifier` or the parent workflow.

## Non-Design Boundaries

- Design may specify visual and interaction intent, but implementation owns the
  production diff.
- Design may define accessibility requirements, but rendered and technical
  verification must prove accessibility behavior.
- Design may propose token additions, but cannot silently promote one-off
  values into canonical Design Tokens.
- Design may recommend approval, but the parent workflow or user owns approval
  and closure.

