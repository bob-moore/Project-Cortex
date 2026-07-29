---
description: Standing goals that re-verify completed structural promises.
tags:
  - harness
  - goals
---

# Goals

Standing goals are machine-checkable invariants. They are not project wishes or
North Star priorities; those belong in [[harness/north-star]].

Each goal file must define:

- `predicate`: command that exits `0` when the invariant holds
- `status`: `satisfied`, `violated`, or `retired`
- `on_violation`: what to do when the predicate fails
- `retire_when`: condition for human-approved retirement

Run:

```bash
node .agents/scripts/verify-goals.mjs
```

