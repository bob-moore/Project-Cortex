# Agent Brief: Intrinsic Canvas Sizing

Use this when asking an AI design agent to create or extend a site from this
system.

## Required Behavior

Canvas sizing is intrinsic. Do not design from breakpoint-specific sizes.
Choose the usage lane first, then choose the matching token.

## Usage Lanes

### Prose Lane

Use for blog posts, long-form content, FAQ answers, body-copy columns, and
reading surfaces.

- Type: compact static Major Second scale.
- Spacing: compact static spacing scale.
- Measure: `60ch` to `75ch`, default `65ch`.
- Never use display heading tokens for normal article hierarchy.

### Interface Lane

Use for buttons, forms, nav, cards, labels, and dense repeated UI.

- Type: compact static Major Second scale.
- Spacing: compact static spacing scale.
- Internal rhythm stays local even when the component appears inside a large
  page section.

### Section Lane

Use for heroes, CTA bands, feature sections, service sections, and other
full-width marketing surfaces.

- Type: fluid display scale.
- Spacing: fluid display spacing scale.
- Min sizes follow Major Second.
- Max sizes follow Major Third.
- Use `clamp()` tokens; do not add breakpoint overrides.

## Critical Mixed-Lane Rule

A full-width section can mix lanes:

- Section heading: display scale.
- Section padding: display spacing.
- Paragraph copy: prose lane, ch-based measure.
- Cards inside the section: interface lane internally.

Do not make every child of a hero or section large just because the parent is
large.

## Design Return Contract

Return:

- The usage lane for each section and component.
- The token names selected for type, spacing, and measure.
- Rendered foundation examples for type and spacing.
- Any exception with a reason and rendered evidence.

Do not return raw one-off pixel values as design decisions.

