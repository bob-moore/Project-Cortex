---
description: Runtime hook configs remain generated from canonical hook specs.
tags:
  - harness
  - goal
predicate: node .agents/scripts/verify-hooks.mjs
born: 2026-07-28
status: satisfied
last-pass: 2026-08-07
on_violation: Wake the user; regenerate hook configs or repair canonical hook specs before trusting runtime lifecycle behavior.
retire_when: Retire only if runtime hook adapters are removed from the methodology.
---

# Hook Adapters

Runtime hook configs must point to `.agents/hooks/scripts/` and match
`.agents/hooks/events.json`. Runtime configs must not point to `.claude/scripts/`
or `.claude/skills/`.
