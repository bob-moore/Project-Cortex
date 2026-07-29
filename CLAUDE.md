# Claude Adapter

This file is a Claude Code adapter.

Read `harness/manual.md` first. It is the canonical operating manual for agents
working in this repository. If this file conflicts with `harness/manual.md`, the
harness manual wins unless the user gives a direct instruction in the current
session.

## Current Adapter State

- `.claude/commands/vault-*.md` are thin adapters to canonical workflow specs
  in `.agents/workflows/`.
- `.claude/agents/` is intentionally absent. Resolve roles through canonical
  `.agents/roles/` contracts and workflow specs.
- `.claude/settings.json` is generated from `.agents/hooks/events.json` and
  points to canonical hook scripts in `.agents/hooks/scripts/`.
- `.claude/scripts/` is intentionally absent; hook scripts live under
  `.agents/hooks/scripts/`.
- `.claude/skills/` is intentionally absent; canonical skill instructions live
  only under `.agents/skills/`.
- Those files are adapter wiring, not the canonical architecture.
- Canonical runtime machinery belongs in `.agents/`.
- Canonical writable agent-operating knowledge belongs in `harness/`.

## Memory

Do not store durable memory in Claude Code's private memory directory.

Use `harness/memory.md` and related harness notes instead.
