---
name: accessibility-foundation
description: "Use when a task needs shared accessibility guidance, requirements, handoff, or evidence boundaries for design, development, WordPress, content, or verification work. Applies the canonical Accessibility discipline, WCAG POUR framing, keyboard/focus/contrast/semantic/content checks, and prevents overclaiming compliance from partial evidence."
---

# Accessibility Foundation

Use this skill as the shared accessibility foundation across Design,
Development, WordPress, Writing, and Verification work.

## Operating Contract

1. Read `.agents/disciplines/accessibility/contract.json`.
2. Read `.agents/disciplines/accessibility/modes.md`.
3. Read `.agents/disciplines/accessibility/rubric.md`.
4. Identify the accessibility mode and target.
5. State what can be proved from the available evidence.
6. Use POUR as the organizing model: perceivable, operable, understandable,
   robust.
7. Do not claim legal compliance or full accessibility conformance without
   scoped criteria, jurisdiction when relevant, implementation evidence, and
   verification limits.
8. Do not mutate production code, WordPress state, content, or external systems.

## Foundation Checks

### Perceivable

- Images and icons have appropriate alternatives or are marked decorative.
- Text, large text, UI components, and focus indicators meet the relevant
  contrast expectations for the scoped mode.
- Color is not the only signal for status, required fields, errors, selected
  state, or meaning.
- Content survives text enlargement, narrow reflow, and required responsive
  widths without clipping or overlap.
- Time-based media has captions, transcripts, descriptions, or a documented
  content alternative when required.

### Operable

- Every meaningful action is reachable and operable without a pointer.
- Focus order follows task/visual order.
- Focus is visible and not trapped or obscured.
- Dialogs, popovers, menus, comboboxes, and overlays define entry, escape, trap,
  and restore behavior.
- Touch targets and pointer alternatives are adequate for the mode.
- Motion respects reduced-motion preferences and does not block task completion.
- Timed interactions warn, extend, or avoid user failure where applicable.

### Understandable

- Labels, instructions, CTAs, and error messages are clear and specific.
- Inputs have persistent labels and associated help/error text.
- Behavior is predictable and context changes do not surprise the user.
- Navigation and repeated components are consistent.
- Error messages identify the problem and provide recovery.
- Language and specialized terms are handled for the intended audience.

### Robust

- Native semantic elements are preferred over custom interactive primitives.
- Accessible name, role, and value are programmatically determinable.
- ARIA is used only when needed and matches the interaction pattern.
- Dynamic status messages are announced with appropriate live regions.
- Relationships such as labels, descriptions, headings, lists, tables, and
  landmarks are valid and meaningful.
- Source, DOM, and rendered behavior support the accessibility claim.

## Role Handoff

Designer:

- specify accessibility requirements, states, semantics, focus behavior,
  reduced motion, content alternatives, and acceptance criteria
- mark requirements that need Developer, WordPress, Writer, or Verifier followup

Developer:

- implement semantic HTML, keyboard/focus behavior, state management, ARIA where
  required, reduced-motion handling, and automated/manual checks

WordPress Operator:

- preserve heading order, labels, link text, alt text, captions/transcripts,
  media settings, block semantics, navigation, and content relationships

Writer:

- support labels, instructions, error messages, alt text, captions/transcripts,
  link text, and plain-language clarity

Verifier:

- distinguish automated scans, manual checks, rendered observations, source/DOM
  evidence, assumptions, and blocked checks

## Output Shape

Return:

```text
Accessibility Notes:
- Mode:
- Target:
- POUR coverage:
- Evidence:
- Blocked checks:
- Role handoff:
- Compliance/conformance limits:
- Recommended quality gate:
- Next:
```

## Boundaries

- Automated tools are partial evidence.
- Screenshots do not prove semantics, keyboard behavior, announcements, or
  assistive-technology behavior.
- Design requirements are not implementation proof.
- Source code alone does not prove rendered behavior.
- Do not invent legal requirements, exceptions, token replacements, or user
  needs without evidence or approval.

If this skill conflicts with `.agents/disciplines/accessibility/rubric.md`, the
rubric wins.

## Source Notes

This skill adapts `stash/design/accessibility`,
`stash/design/designer-delivery/references/accessibility-requirements.md`, and
the accessibility branch of `stash/design/universal-design-principles`.

