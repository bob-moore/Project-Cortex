---
description: Canonical shared accessibility discipline for design, development, WordPress, and verification work.
tags:
  - harness
  - discipline
  - accessibility
---

# Accessibility Discipline

This directory is the canonical shared accessibility layer.

Accessibility is not owned by one role. Designer specifies accessible intent,
Developer implements semantic and interactive behavior, WordPress Operator
preserves accessible content and configuration, and Verifier checks the evidence
against the requested contract.

## Discipline Rule

Separate four surfaces:

- **Design requirements**: states, contrast, focus, semantics, reduced motion,
  content alternatives, and acceptance criteria.
- **Implementation behavior**: semantic HTML, ARIA only when needed, keyboard
  behavior, focus management, responsive/reflow behavior, and state
  announcements.
- **Content/CMS stewardship**: headings, labels, link text, alt text, embeds,
  captions, transcripts, and block semantics.
- **Verification evidence**: rendered/manual checks, automated scan output,
  source/DOM evidence, limitations, and blocked checks.

## Files

- `contract.json`: machine-readable discipline contract.
- `modes.md`: accessibility modes and ownership boundaries.
- `skill-map.json`: disposition of accessibility source material.
- `rubric.md`: canonical accessibility quality gate.

## Current Canonical Skills

- `accessibility-foundation`: shared POUR-oriented accessibility foundation,
  handoff rules, and evidence boundaries for Design, Development, WordPress, and
  Verification work.

## Methodology Rule

Use WCAG and inclusive-design principles as operating guidance, but do not claim
legal compliance or full accessibility conformance without scoped jurisdiction,
criteria, implementation evidence, and verification. Automated tools provide
partial evidence only.

