# Gemini Adapter

This file is a Gemini adapter.

Read `harness/manual.md` first. It is the canonical operating manual for agents
working in this repository. If this file conflicts with `harness/manual.md`, the
harness manual wins unless the user gives a direct instruction in the current
session.

## Current Adapter State

- `.gemini/settings.json` is generated from `.agents/hooks/events.json` and
  points to canonical hook scripts in `.agents/hooks/scripts/`.
- Canonical runtime machinery belongs in `.agents/`.
- Canonical writable agent-operating knowledge belongs in `harness/`.
- Runtime folders are adapters, not sources of truth.
