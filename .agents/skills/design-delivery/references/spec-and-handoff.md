# Specification And Handoff

Write a self-contained artifact. The implementer must not need the Designer's
private conversation context.

## Required Structure

```markdown
# <Target> Design Specification

## Contract
- Client/project:
- Mode:
- Target:
- Audience and primary task:
- Success condition:
- Scope / out of scope:
- Destination: Developer / WordPress / hybrid
- Approval boundary:

## Source and evidence ledger
| Source | Authority/current fact/observation | Scope | Design consequence |
| --- | --- | --- | --- |

## Approved content
- Writer artifact or existing-content source:
- Required CTA/outcome:
- Locked terminology/claims/compliance:
- Content gaps or conflicts:

## Design direction
- Primary surface archetype:
- Hierarchy:
- Brand/Voice consequence:
- Existing components to reuse:
- Approved exploratory decision, if any:

## Layout regions
### <Region>
- Purpose and content:
- Layout and alignment:
- Token references:
- Typography role:
- Imagery/assets:
- Desktop behavior:
- Intermediate-width behavior:
- Mobile behavior:
- Content/edge cases:

## Component inventory
| Component | Existing/new proposal | Anatomy | Variant | Token references | Owner |
| --- | --- | --- | --- | --- | --- |

## Interaction-state matrix
| Component | Default | Hover | Focus | Active | Disabled | Loading | Error | Success |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Interaction and accessibility
- Keyboard model and focus order:
- Semantic role/name/state requirements:
- Status/error/loading announcements:
- Contrast and non-color indicators:
- Touch target and pointer alternatives:
- Reduced-motion behavior:

## Content and asset rules
- Min/max/long text:
- Empty and missing-media behavior:
- Localization/RTL:
- Image aspect ratios/crops/resolution:
- Icons/SVG/font delivery:

## Acceptance matrix
| Criterion | Surface/state/viewport | Observable expected result | Verification method |
| --- | --- | --- | --- |

## Gaps and approvals
- Missing token/component/content/asset:
- Proposal and authority needed:

## Handoff
- Approved artifact/version:
- Next role:
- Required implementation sequence:
- Pre-implementation approval:
- Post-implementation review target:
```

## Rules

- Use token names or verified component variants, not raw substitute values.
- If one-off geometry needs a value not represented by a token, mark it as a
  bounded proposal and get approval.
- Describe behavior, constraints, and visual intent before suggesting
  implementation structure.
- Name what changes at breakpoints instead of writing "responsive."
- Include minimum and maximum content cases, not only ideal copy.
- Define asset ownership and missing-asset fallback.
- Keep copy verbatim unless the Writer artifact permits variants.
- Make each acceptance criterion observable by browser, DOM, source, or user
  task.

## Downstream Routing

- `developer`: new or changed version-controlled capability.
- `wordpress-operator`: composition and configuration with existing
  WordPress capability.
- `hybrid`: Developer first, then WordPress Operator.

## Attribution

Adapted from `stash/design/designer-delivery/references/spec-and-handoff.md`,
including MIT-licensed ideas from `Owl-Listener/designer-skills` and
`nextlevelbuilder/ui-ux-pro-max-skill`.

