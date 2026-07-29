---
description: Accessibility modes and ownership boundaries for the shared accessibility discipline.
tags:
  - harness
  - discipline
  - accessibility
---

# Accessibility Modes

Accessibility modes define what each pass can legitimately prove.

## Evidence Labels

| Label | Meaning |
|---|---|
| `specified` | Required by design/specification but not yet implemented. |
| `implemented` | Present in source, component, CMS, or configuration evidence. |
| `rendered-observed` | Directly inspected in a rendered target. |
| `measured` | Checked by a deterministic tool, computed style, contrast tool, viewport check, or DOM query. |
| `manual-tested` | Exercised by keyboard, focus, screen reader, or primary user path. |
| `automated-scan` | Reported by an automated accessibility tool. Partial evidence only. |
| `assumed` | Not verified; must remain an open item. |
| `blocked` | Could not be checked; report what would unblock it. |

## Modes

| Mode | Owner | Typical Output | What It Can Prove |
|---|---|---|---|
| `design-requirements` | Designer | Accessibility requirements and acceptance criteria. | Intent and observable requirements, not conformance. |
| `implementation-handoff` | Designer -> Developer or WordPress | Role-specific requirements and evidence needed. | Required behavior and owner, not implementation success. |
| `code-implementation` | Developer | Version-controlled implementation and test output. | Source and automated/manual local evidence within the tested environment. |
| `wordpress-stewardship` | WordPress Operator | CMS/content/block accessibility state and readback. | Mutable state evidence for the named WordPress environment. |
| `rendered-verification` | Verifier or parent workflow | Pass/fail accessibility evidence and limitations. | Observed behavior for the checked target, viewport, state, and assistive path. |
| `content-accessibility` | Writer, Designer, or WordPress Operator | Labels, link text, headings, alt text, transcript/caption notes. | Content readiness only within the reviewed artifact or CMS state. |

## POUR Coverage

- `perceivable`: alternatives, contrast, text scaling, reflow, media captions,
  visible structure.
- `operable`: keyboard access, focus visibility, no traps, target size,
  reduced motion, timing, non-pointer alternatives.
- `understandable`: labels, instructions, predictable behavior, language,
  error identification, recovery, consistency.
- `robust`: semantic HTML, valid relationships, accessible names/roles/values,
  live regions, assistive-technology compatibility.

## Role Handoff

- Designer specifies requirements and acceptance criteria.
- Developer implements semantic and interactive behavior.
- WordPress Operator preserves accessible content, block structure, media
  alternatives, headings, labels, navigation, and settings.
- Writer owns user-facing language where labels, instructions, errors, and
  content clarity require copy decisions.
- Verifier checks evidence and reports blocked checks.

## Non-Goals

- This discipline does not mutate production systems.
- This discipline does not replace legal advice.
- This discipline does not treat a score as proof of human usability.

