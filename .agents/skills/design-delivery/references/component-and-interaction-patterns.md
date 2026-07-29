# Component And Interaction Patterns

Use this reference when `component-pattern-spec` mode requires more detail than
the main specification template.

## Component Specification

For a genuinely new component, define:

- overview: name, one-line description, when to use, when not to use
- anatomy: required and optional elements
- variants: size, style, layout, and allowed contexts
- states: default, hover, focus, active, disabled, loading, error, success
- behavior: interactions, animations, responsive behavior, edge cases
- accessibility: roles, names, keyboard navigation, screen reader behavior,
  focus management
- usage guidelines: do/don't examples, content rules, related components

Include an example for every variant and state. An unillustrated state is not a
specified state.

## Pattern Library Entry

For reusable patterns such as card grids, filters, onboarding checklists, or
search/refine surfaces, define:

- problem statement
- solution
- anatomy
- variants
- behavior
- examples and anti-patterns
- accessibility
- related patterns

Lead with the problem, not the solution. Repeated markup is not enough to
justify a shared pattern.

## Interaction Guidance

- Forms: prefer single-column structure, visible labels, direct error messages,
  appropriate input types, and focus order matching visual order.
- Loading: avoid blank screens; choose skeletons for known structure, spinners
  for unknown duration, and progress indicators when measurable.
- Error handling: prevent, detect, communicate, and recover. Preserve input and
  offer retry or undo when appropriate.
- Feedback: place feedback near the action and make every interaction respond.
- Micro-interactions: specify trigger, rules, feedback, and loop/mode; respect
  reduced motion.
- Navigation: match pattern to information architecture; keep active states
  clear without relying on color alone.
- Onboarding: get users to value quickly; teach in context when possible.
- Search: describe what is searchable, provide useful zero-result recovery, and
  preserve queries for refinement.
- State machines: define states, events, transitions, actions, and guards for
  complex behavior.
- Gestures: never make a gesture the only path; provide visible alternatives.

## Attribution

Adapted from
`stash/design/designer-delivery/references/component-and-interaction-patterns.md`,
including MIT-licensed material from `Owl-Listener/designer-skills`.

