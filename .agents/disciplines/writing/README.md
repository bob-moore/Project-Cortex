---
description: Canonical writing discipline contract, modes, skill map, and quality gate.
tags:
  - harness
  - discipline
  - writing
---

# Writing Discipline

This directory is the canonical discipline layer for writing.

The writing discipline is not a Claude agent and not a loose pile of blog,
copy, SEO, and social skills. It defines how the `writer` role, reusable writing
skills, writing workflows, and verification gates fit together.

## Discipline Rule

Separate four concepts:

- **Role**: `writer` owns draft and editing work within its approval classes.
- **Workflow**: a bounded task with inputs, approval gates, done predicates, and
  return contract.
- **Skill**: reusable procedure, reference bundle, or quality gate.
- **Adapter**: runtime discovery wrapper only.

Copied `.claude/skills/blog-*`, `copy-*`, `content-*`, and related skills are
source material. They are not active canonical behavior until this discipline
maps them into a canonical skill, workflow, or reference file.

## Files

- `contract.json`: machine-readable discipline contract.
- `modes.md`: writing modes and ownership boundaries.
- `skill-map.json`: disposition of existing writing source material.
- `rubric.md`: canonical writing quality gate.

## Current Canonical Skills

- `article-brief`: plans article audience, intent, structure direction,
  evidence needs, and handoff readiness.
- `article-draft`: produces long-form drafts from a brief, outline, source set,
  or topic without inventing support.
- `article-outline`: creates article section plans and heading structure without
  forcing search assumptions.
- `article-refresh`: audits and updates existing long-form artifacts while
  preserving useful original material.
- `claim-check`: extracts claims, labels evidence, classifies risk, and returns
  source or revision actions.
- `content-repurpose`: maps an existing source artifact into derivative outputs
  while preserving evidence and approval boundaries.
- `copy-edit`: revises existing artifacts while preserving approved facts,
  strategy, voice constraints, and approval boundaries.
- `email-newsletter`: drafts email and newsletter copy through explicit intent
  profiles without sending or scheduling.
- `social-shortform`: drafts platform-native social posts and variants without
  taking over channel operations.
- `voice-humanize`: performs a targeted naturalness, voice, and rhythm pass
  without treating prose patterns as authorship proof.
- `web-copy`: drafts website copy using explicit standard and promotional
  intent profiles so ordinary pages and sales pages are not judged by the same
  persuasion rules.
- `writing-foundation`: defines the shared audience, positioning,
  customer-language, copy-pattern, and clarity foundation for written artifacts.
- `writing-quality-gate`: applies `rubric.md` to a written artifact and returns
  blocking findings, score, evidence, and revision instructions.

## Methodology Rule

Writing skills must be mode-aware. A social post, email, review draft, article,
or landing-page headline should be judged against its own contract, evidence
needs, audience, channel, and approval boundary.
