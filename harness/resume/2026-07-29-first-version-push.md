---
description: "Resume note for the first Project Cortex remote push after Claude cleanup and canonical skill consolidation."
tags:
  - harness
  - resume
  - release
status: complete
created: 2026-07-29
---

# Project Cortex First Version Push

## Outcome

Project Cortex was cleaned, committed as a single first-version root commit, and
pushed to `origin/main`.

Remote/local commit:

```text
ce306e2da879e8e81546e8e197ac35d590038053
```

## What Changed

- Added the README cover image at `assets/readme-cover.png` and embedded it at
  the top of [[README]].
- Kept `tmp/` ignored in `.gitignore` and removed the previously tracked crawler
  output under `tmp/` from the Git index.
- Removed the legacy `.claude/skills/` tree from the active architecture.
- Confirmed canonical grilling skills live only under `.agents/skills/`:
  `grill-me` and `grilling`.
- Removed the stale Blog Copy Cluster project material and index references.
- Left `.claude/` as a generated runtime adapter layer: command adapters and
  settings only.

## Push Note

The first push was rejected because earlier unpublished local commits still
contained oversized legacy Claude runtime blobs under `.claude/skills/`, even
though the current tree had already deleted them.

Fix used:

1. Verified `origin` had no branch heads.
2. Removed tracked `tmp/` content from the index while leaving the local file in
   place.
3. Rebuilt `main` as a single clean root commit from the current tree.
4. Pushed `main` to `origin`.

## Verification

Completed before the successful push:

```text
node .agents/scripts/gate.mjs
git diff --check
git ls-remote --heads origin main
```

Observed results: the harness gate passed, whitespace check passed, and
`origin/main` points at `ce306e2da879e8e81546e8e197ac35d590038053`.

## Next Action

Treat this as the initial remote baseline. Future changes should be normal
incremental commits unless another unpublished-history cleanup is explicitly
needed.
