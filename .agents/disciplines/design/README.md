---
description: Canonical design discipline contract, modes, skill map, and quality gate.
tags:
  - harness
  - discipline
  - design
---

# Design Discipline

This directory is the canonical discipline layer for design.

The design discipline is not a single visual taste pack, prototype generator,
or runtime-specific Designer persona. It defines how the `designer` role,
reusable design skills, shared accessibility guidance, rendered review, and
implementation handoff fit together.

## Discipline Rule

Separate five concepts:

- **Role**: `designer` owns visual intent, layout direction, component and page
  specifications, and rendered conformance review.
- **Workflow**: a bounded design task with inputs, approval gates, acceptance
  criteria, and a return contract.
- **Skill**: reusable procedure, specialist visual guidance, reference bundle,
  or quality gate.
- **Discipline**: the canonical map of modes, ownership boundaries, rubrics,
  and import decisions.
- **Adapter**: runtime discovery wrapper only.

Design does not publish, deploy, mutate WordPress state, approve copy, or close
implementation without independent verification.

## Files

- `contract.json`: machine-readable discipline contract.
- `modes.md`: design modes and ownership boundaries.
- `design-research`: routed moodboard/reference research before implementation
  when visual direction is unresolved.
- `principles.md`: compact extracted principle layer from
  `stash/design/universal-design-principles`.
- `skill-map.json`: disposition of existing design source material.
- `rubric.md`: canonical design quality gate.

## Current Canonical Skills

- `brandkit`: generates or organizes brand/design-token source material when
  requested and within the relevant role boundary.
- `design-delivery`: turns approved content and governed visual context into an
  implementable design specification, acceptance matrix, handoff, or rendered
  conformance review.
- `design-research`: builds an annotated, provenance-labeled reference packet,
  anti-SaaS assessment, and materially different directions before approval.
- `design-taste-frontend`: visual design and frontend taste guidance. Sole
  canonical taste skill as of 2026-08-01; `design-taste-frontend-v1` and
  `gpt-taste` were retired as duplicates and folded in.
- `high-end-visual-design`: optional specialist visual direction for high-end
  editorial/product surfaces.
- `image-to-code`: translate image/screenshot intent into implementable UI
  direction or code-facing handoff.
- `imagegen-frontend-mobile`: generate or guide mobile frontend imagery.
- `imagegen-frontend-web`: generate or guide web frontend imagery.
- `industrial-brutalist-ui`: optional specialist visual style.
- `minimalist-ui`: optional specialist visual style.
- `redesign-existing-projects`: bounded redesign critique and implementation
  guidance.
- `stitch-design-taste`: Stitch-specific design taste reference.

## Methodology Rule

Design work must identify its mode, governing context, approval boundary, and
evidence. When direction is unresolved, research precedes implementation:
client Brand, Voice, Design Tokens, approved content, current component/source
evidence, selected references, and rendered output are kept distinct. Generic
style packs and global skills may inform optional exploration, but they do not
override project-local authority.
