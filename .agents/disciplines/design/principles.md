---
description: Compact extracted design principles from the universal-design-principles source library.
tags:
  - harness
  - discipline
  - design
  - principles
---

# Design Principles

This is the compact ProjectCortex extraction from
`stash/design/universal-design-principles`.

The source library contains 42 principles across 137 skills. Do not import that
library wholesale into `.agents/skills/`. Use this file as the first-pass
principle layer for Design discipline reviews, specs, and handoffs.

## Source Clusters

| Source plugin | Local use |
|---|---|
| Perception and hierarchy | Layout, hierarchy, grouping, composition, typography, color, density. |
| Cognition and learnability | Complexity, defaults, mental models, recognition, wayfinding, consistency. |
| Interaction and control | Affordance, feedback, errors, forgiveness, constraints, target sizing, user control. |
| Aesthetics and emotion | Felt quality, brand expression, form/function, marketing/onboarding tone. |
| Process and robustness | Accessibility, prototyping, iteration, edge cases, scale, failure margins. |

## Core Design Review Principles

Use these in ordinary page, component, and rendered-review work.

### Hierarchy

Make the intended first, second, and third reads obvious. Size, placement,
spacing, contrast, and weight should point to the user's primary task.

Check:

- one clear entry point
- one dominant primary action or message
- subordinate details visually quieter than decision-driving content
- headings and typography levels that differ enough to scan

### Legibility And Readability

Text must be distinguishable and comfortable to read at the intended distance,
viewport, and density.

Check:

- body copy uses readable size, line-height, and line length
- labels, captions, and secondary text remain legible
- contrast and spacing support sustained reading
- prose layout matches the reading task, not only the visual mood

### Alignment

Shared axes make a surface feel intentional. Misalignment must be purposeful or
it reads as drift.

Check:

- repeated elements align to a visible grid or edge
- text and numbers align for scanning
- cards, controls, and form groups use consistent internal spacing
- exceptions create emphasis rather than noise

### Proximity

Related elements should be close; unrelated elements need separation.

Check:

- labels sit with their fields
- help/error text sits near the affected control
- cards, list rows, nav groups, and table cells communicate grouping
- whitespace clarifies relationships instead of fragmenting the page

### Similarity And Contrast

Things that do the same job should look related. Things that do different jobs
should differ enough to avoid confusion.

Check:

- buttons, links, inputs, cards, and badges use consistent treatments
- primary, secondary, and destructive actions are distinguishable
- selected/current/error/success states differ by more than color when needed
- visual variants map to real semantic differences

### Figure/Ground

The active surface must stand apart from its background. This matters most for
overlays, modals, cards, floating actions, and layered content.

Check:

- foreground elements have enough contrast, spacing, and containment
- overlays clearly suppress or separate background content
- active states are visually in front of inactive states
- decorative backgrounds do not compete with the task

### Signal-To-Noise

Every visible mark should earn its place. Decoration, repeated emphasis, and
unneeded controls dilute the information that matters.

Check:

- remove decoration that does not aid hierarchy, brand, or comprehension
- reduce repeated emphasis until the primary signal returns
- hide or defer advanced controls when they distract from the main task
- keep dashboards and dense pages focused on decision-driving information

### Color

Color should express brand, role, and state without carrying meaning alone.

Check:

- color use follows Design Tokens when they exist
- semantic colors are consistent
- critical state is paired with text, icon, position, or pattern
- contrast is checked through the Accessibility discipline
- red/urgent treatment is reserved for real urgency

### Consistency

Users learn faster when equivalent things look and behave equivalently.

Check:

- repeated components have stable visual and interaction behavior
- same labels mean the same actions
- icon meanings do not change across the product/site
- intentional exceptions are documented as design decisions

### Progressive Disclosure

Show what the user needs now; reveal advanced or secondary detail when it has a
clear affordance.

Check:

- the default view supports the main task without extra reading
- advanced controls are discoverable but not dominant
- collapsed content is genuinely secondary
- hidden primary actions are treated as design failures

### Mental Model

The interface should match how users think the task, business, or category
works unless the design deliberately teaches a better model.

Check:

- labels use the user's vocabulary
- navigation follows expected categories or clearly explains a new one
- state changes match cause and effect
- onboarding teaches the model at the point of need

### Wayfinding

Users should know where they are, where they can go, and how to recover.

Check:

- current location is visible
- navigation hierarchy is consistent
- breadcrumbs, section labels, search, or context cues exist when depth demands
  them
- zero-result and error states offer recovery

### Affordance

Available actions should look available, and unavailable actions should explain
their status when the user needs to know.

Check:

- controls look interactive
- links and buttons are visually distinct
- hover-only actions have touch/keyboard alternatives
- disabled states are understandable
- destructive actions are visually and spatially guarded

### Feedback Loop

Every user action needs a timely, perceptible response.

Check:

- clicks, submits, toggles, saves, loads, and failures change visible state
- loading and success states are specified
- errors identify the affected item and recovery path
- long tasks show progress or a way forward

### Errors And Forgiveness

Prevent errors where possible, communicate them clearly when they happen, and
make recovery proportionate to the consequence.

Check:

- validation prevents bad data from moving deeper into the system
- reversible actions use undo over confirmation when safe
- destructive or irreversible actions get stronger confirmation
- user input is preserved after failure
- error copy is specific and actionable

### Fitts's Law

Important and frequent targets should be easy to acquire.

Check:

- primary actions are large enough and close enough to the task
- mobile/touch targets have adequate size and spacing
- destructive controls are not adjacent to routine actions
- screen-edge or thumb-zone placement is intentional

### Constraints

The interface should make invalid actions difficult or impossible, but without
hiding why a path is unavailable.

Check:

- forms use inputs that match the data
- unavailable options explain requirements when useful
- impossible states are prevented by design
- destructive or risky paths add friction proportional to risk

### Form Follows Function

Visual form should express the job of the surface. Decorative choices are valid
only when they support comprehension, trust, brand, or action.

Check:

- aesthetic choices support the primary task
- brand expression does not undermine usability
- style packs do not override client identity or existing system evidence
- marketing polish still preserves clarity and accessibility

### Iteration And Prototyping

Make uncertain design decisions concrete early, but do not mistake prototypes
for production.

Check:

- prototypes answer a specific decision
- alternatives differ in structure or interaction, not only color
- accepted decisions are preserved across iterations
- Developer owns production implementation

## Cross-Bucket Principles

Reserve these mappings for future Development and General Marketing/CRO passes.

### Development-Shared

- Accessibility: semantic behavior, focus, keyboard, announcements, reflow.
- Errors and forgiveness: validation, recovery, rollback, undo, destructive
  safety.
- Feedback loop: loading, latency, success, failure, async state.
- Constraints: impossible states, input bounds, disabled/available logic.
- Scaling fallacy: behavior that works in one page/component may fail across
  data size, viewports, roles, or content length.
- Weakest link: find the fragile path that breaks the whole experience.
- Factor of safety: leave margin for long content, slow networks, missing
  media, localization, permissions, and partial failure.

### General Marketing/CRO-Shared

- Hick's Law: reduce options and clarify the conversion decision.
- 80/20 Rule: optimize the main visitor segment and primary path first.
- Exposure effect: repeated familiarity can help preference, but avoid
  repetition that becomes noise.
- Aesthetic-usability effect: polish can increase perceived ease, but cannot
  compensate for broken usability.
- Archetypes and storytelling arcs: useful for campaign and brand narrative,
  but subordinate to actual Brand/Voice.
- Expectation effect: cues set expectations before users read details.

## Extraction Backlog

Potential future deeper imports:

- `design-principles` skill only if repeated work needs a triggerable principle
  router separate from `design-delivery`.
- `accessibility-quality-gate` if accessibility reviews become frequent enough
  to need a dedicated gate skill.
- CRO principle map during General Marketing.
- Development robustness map during Development porting.

## Attribution

Extracted from `stash/design/universal-design-principles`, which identifies
itself as MIT-licensed and based on *Universal Principles of Design* plus HCI
research literature. This file is a compact local synthesis for ProjectCortex;
it is not a full copy of the source skill marketplace.

