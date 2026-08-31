---
description: Codex workflow skills remain thin adapters to canonical workflows.
tags:
  - harness
  - goal
predicate: node .agents/scripts/verify-adapters.mjs
born: 2026-07-28
status: satisfied
last-pass: 2026-08-07
on_violation: Wake the user; regenerate or repair Codex workflow skill adapters before relying on Codex workflow discovery.
retire_when: Retire only if Codex workflow skills are removed or replaced by another adapter mechanism.
---

# Codex Workflow Skill Adapters

Every `.agents/skills/workflow-vault-*/SKILL.md` file must point to its matching
canonical workflow spec and contract under `.agents/workflows/`.

