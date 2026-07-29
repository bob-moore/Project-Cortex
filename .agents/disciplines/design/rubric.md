---
description: Canonical design quality gate and scoring rubric.
tags:
  - harness
  - discipline
  - design
  - rubric
---

# Design Quality Gate

Use this rubric before treating a design artifact, redesign recommendation, or
rendered implementation review as ready.

This is a quality gate, not a producer persona. A Designer may self-review, but
workflow closure still belongs to the parent workflow, user, verifier, or
deterministic gate.

## Blocking Findings

Any blocking finding prevents a ready/done claim regardless of score:

- Missing approved content for a content-dependent design, unless explicitly
  marked provisional.
- Missing Brand, Voice, or Design Tokens when those files govern the requested
  client-specific artifact.
- Invented tokens, components, metrics, testimonials, claims, assets, or
  compliance requirements presented as approved.
- External mutation implied or performed without approval: publish, deploy,
  edit WordPress, change production code, upload assets, or mutate another live
  system.
- Rendered review performed without an approved design artifact or without the
  exact target/environment.
- Accessibility conformance claimed from intent, screenshot inspection, or
  automated tooling alone.
- Design specification lacks responsive behavior, state coverage, content
  limits, or observable acceptance criteria for material parts of the surface.
- The artifact violates explicit user constraints, client authority, approved
  copy, or implementation boundaries.

## Evidence Labels

Label each material judgment:

- `authority`: approved governing source.
- `observed`: directly inspected rendered, source, DOM, component, or artifact
  evidence.
- `measured`: counted or measured from tooling, viewport checks, computed
  styles, or artifact inspection.
- `judged`: design assessment against this rubric.
- `proposed`: new decision requiring approval.
- `assumed`: not verified; must be surfaced as an open item.

## Score

Score to 100 only after blocking findings are handled. Scores are advisory; the
blocking findings decide readiness.

| Category | Points | What Good Looks Like |
|---|---:|---|
| Contract Fit | 15 | Correct mode, target, destination, approval boundary, and requested artifact delivered. |
| Governing Context | 15 | Brand, Voice, Design Tokens, approved content, current-system evidence, and implementation constraints are used or gaps are labeled. |
| Visual Hierarchy and Composition | 15 | Clear entry point, intentional flow, balanced density, consistent alignment, effective proximity, and no competing primaries. |
| Responsive and Content Robustness | 15 | Desktop, mobile, intermediate widths, long/empty/missing content, assets, localization, and reflow constraints are specified or reviewed. |
| Interaction and States | 15 | Default, hover, focus, active, disabled, loading, error, success, keyboard, and feedback behavior are covered where relevant. |
| Accessibility Requirements | 15 | Contrast, focus, semantics, touch targets, reduced motion, alternatives, and assistive behavior are specified or verified as far as the mode allows. |
| Handoff and Evidence Quality | 10 | Acceptance criteria are observable, owners are explicit, evidence is labeled, and open items are actionable. |

## Rating Bands

| Score | Rating | Meaning |
|---:|---|---|
| 90-100 | Ready | Strong artifact; approval or normal final review can proceed. |
| 80-89 | Usable | Minor clarification or evidence cleanup recommended. |
| 70-79 | Needs Revision | Material fixes needed before handoff or approval. |
| 60-69 | Weak | Rework sections or re-brief. |
| <60 | Rebuild | Start from context, content, or direction again. |

## Mode Modifiers

- `new-layout`: approved content is present, surface archetype and hierarchy are
  clear, components and tokens are named, responsive behavior is explicit, and
  acceptance criteria are implementation-ready.
- `redesign`: target identity is verified through source/rendered evidence,
  findings have contract/runtime/correction support, preserved identity and
  non-goals are explicit, and recommendations are prioritized.
- `component-pattern-spec`: anatomy, variants, content limits, state matrix,
  keyboard/focus behavior, accessibility requirements, responsive behavior, and
  reuse scope are complete.
- `visual-direction`: alternatives are meaningfully different, decision
  criteria are clear, client authority is respected, and proposed direction is
  not treated as approved.
- `prototype`: artifact is disposable, destination is approved, variation tests
  a real decision, and no one mistakes prototype code for production code.
- `rendered-review`: comparison is against the approved artifact only,
  evidence includes representative viewports/states, discrepancies have class,
  severity, evidence, and exact revision owner.

## Report Shape

Return:

```text
Design Quality Gate
Mode:
Artifact:
Verdict: pass | revise | blocked
Score: N/100

Blocking Findings:
- ...

Score Breakdown:
- Contract Fit: N/15
- Governing Context: N/15
- Visual Hierarchy and Composition: N/15
- Responsive and Content Robustness: N/15
- Interaction and States: N/15
- Accessibility Requirements: N/15
- Handoff and Evidence Quality: N/10

Evidence:
- ...

Open Items:
- ...

Next:
- ...
```

