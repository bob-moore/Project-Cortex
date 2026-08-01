---
date: 2026-08-01
description: Domain-specific roadmaps for harness capability buildout.
tags:
  - harness
  - roadmap
updated: 2026-08-01
---

# Roadmaps

This directory tracks domain-specific capability roadmaps.

Roadmaps are planning artifacts, not active runtime behavior. A capability only
becomes canonical when it has a discipline contract, workflow contract, skill
entrypoint, tool wrapper, or policy registered in `.agents/`.

## Active Roadmaps

- [[developer-role-expansion|Developer Role Expansion]]: Slices 1-4 done
  (source-map pattern, `astro`/`wp-abilities-api`/`wp-interactivity-api`
  source maps, `skill-doc-refresh`, Context7 CLI/skill pilot). The Slice 5
  promote/reject decision remains open, and a few specialist surfaces
  (dependency maintenance, performance remediation, release/deployment
  boundaries) stay deliberately closed pending a concrete need.
- [[runtime-hygiene|Runtime Hygiene]]: QMD store portability, hook protocol
  compatibility, startup context budget, graphify scope, and the unified
  maintenance check (Phases 1-5) are implemented and verified in the gate.
- [[self-improvement-loop|Self-Improvement Loop]]: manually-triggered
  correction/evidence-driven improvement mechanism. The session-diary
  substrate shipped 2026-08-01 (`harness/session-diary/`); promotion into
  Voice notes or skills remains deferred.

## Completed Roadmaps

- SEO Discipline And Tool Suite: complete through Phase 10 and verified; see
  `harness/roadmaps/seo.md` and the SEO entry in `harness/roadmap.md`. Future
  work is maintenance, not roadmap continuation.
