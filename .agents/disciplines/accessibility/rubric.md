---
description: Canonical accessibility quality gate and evidence rubric.
tags:
  - harness
  - discipline
  - accessibility
  - rubric
---

# Accessibility Quality Gate

Use this rubric when accessibility requirements, implementation, content, or
rendered behavior need a readiness verdict.

## Blocking Findings

Any blocking finding prevents a pass claim regardless of score:

- Accessibility compliance or legal status claimed without scoped criteria,
  jurisdiction when relevant, evidence, and limitations.
- Automated scan treated as complete accessibility proof.
- Primary action cannot be reached or operated with keyboard in the checked
  target.
- Focus is invisible, trapped, or lost in a primary path.
- Meaningful content, control, image, media, or status update lacks a required
  accessible alternative or name.
- Color is the only indicator for a required state or meaning.
- Contrast failure affects body text, critical UI, focus, or required state.
- Form error, instruction, or validation state is not discoverable in text.
- Motion, timing, drag, hover, or gesture behavior blocks a non-pointer or
  motion-sensitive user without an alternative.
- Rendered check omits the target, viewport, state, or method needed to support
  the verdict.

## Score

Score to 100 only after blocking findings are handled.

| Category | Points | What Good Looks Like |
|---|---:|---|
| Contract and Scope | 10 | Target, mode, criteria, environment, and limitations are explicit. |
| Perceivable | 20 | Alternatives, contrast, reflow, media, and visible structure are sufficient for the checked mode. |
| Operable | 20 | Keyboard, focus, target size, motion, timing, and non-pointer alternatives are covered. |
| Understandable | 15 | Labels, instructions, errors, language, consistency, and recovery are clear. |
| Robust | 15 | Semantics, names, roles, values, valid relationships, and live regions are handled. |
| Evidence Quality | 20 | Evidence labels are clear; automated, manual, source, DOM, and rendered checks are not conflated. |

## Rating Bands

| Score | Rating | Meaning |
|---:|---|---|
| 90-100 | Pass | Strong evidence for scoped readiness. |
| 80-89 | Usable | Minor gaps remain but no blocking finding. |
| 70-79 | Needs Revision | Material accessibility fixes needed. |
| 60-69 | Weak | Rework the design, implementation, or evidence plan. |
| <60 | Blocked/Rebuild | Do not proceed without major correction. |

## Report Shape

Return:

```text
Accessibility Quality Gate
Mode:
Target:
Verdict: pass | revise | blocked
Score: N/100

Blocking Findings:
- ...

Score Breakdown:
- Contract and Scope: N/10
- Perceivable: N/20
- Operable: N/20
- Understandable: N/15
- Robust: N/15
- Evidence Quality: N/20

Evidence:
- ...

Blocked Checks:
- ...

Open Items:
- ...

Next:
- ...
```

