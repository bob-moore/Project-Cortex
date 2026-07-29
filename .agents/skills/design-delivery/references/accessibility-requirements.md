# Accessibility Requirements

Use this reference for design-level accessibility requirements. Development and
verification must still prove implementation behavior.

## Design Must Specify

- semantic intent for regions, headings, controls, forms, status messages, and
  navigation
- keyboard path and focus order for primary tasks
- visible focus behavior and non-hover alternatives
- contrast expectations and non-color state indicators
- touch target and pointer alternatives
- reduced-motion behavior for animation and transition
- error, loading, empty, disabled, and success states
- media alternatives, image purpose, crop/aspect requirements, and fallback
  behavior
- content clarity for labels, instructions, errors, and CTA language

## Evidence Boundaries

- Design intent is not conformance proof.
- Automated checks are partial evidence.
- Screenshot review cannot prove semantics, keyboard behavior, announcements,
  or assistive technology behavior.
- Rendered inspection is required for focus visibility, contrast in context,
  target sizing, layout reflow, and motion behavior.

## Handoff Expectations

Designer:

- define accessibility requirements and acceptance criteria
- mark uncertainty or missing authority
- avoid creating inaccessible interaction patterns

Developer:

- implement semantic structure, state, keyboard, focus, reduced-motion, and
  responsive behavior
- run relevant automated and manual checks
- report constraints that require design revision

Verifier:

- inspect rendered behavior where possible
- separate automated findings from manual observations
- label blocked checks instead of treating missing evidence as a pass

WordPress Operator:

- preserve headings, alt text, link text, block semantics, labels, and focus
  behavior when composing with existing blocks and patterns

## Attribution

Adapted from
`stash/design/designer-delivery/references/accessibility-requirements.md`,
`stash/design/accessibility/SKILL.md`, and the accessibility branch of
`stash/design/universal-design-principles`.

