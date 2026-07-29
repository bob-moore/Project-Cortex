# Vault Agent Adapter

This vault is an agentic operating system.

Read `harness/manual.md` first. It is the canonical operating manual for agents.
This file is a root adapter for Codex and other agents that discover `AGENTS.md`.

## Canonical Structure

| Path | Purpose |
|---|---|
| `.agents/` | Runtime machinery: roles, workflows, skills, hooks, tools, schemas, adapters, and generators. |
| `harness/` | Writable agent-operating knowledge: manual, operator context, memory, policies, decisions, patterns, gotchas, and runbooks. |
| `.claude/`, `.codex/`, `.gemini/`, `.hermes/` | Runtime adapters. These are not sources of truth. |

## Current Adapter State

- `.agents/manifest.yaml` is the canonical registry.
- `harness/manual.md` replaces runtime-specific operating manuals.
- `harness/` is the writable agent-operating knowledge layer.
- `.claude/commands/vault-*.md` are thin adapters to `.agents/workflows/`.
- `.claude/agents/` is intentionally absent; roles resolve through
  `.agents/roles/` and workflow specs.
- `.claude/settings.json`, `.codex/hooks.json`, and `.gemini/settings.json`
  are generated hook adapters from `.agents/hooks/events.json`.
- `.agents/hooks/scripts/` contains the canonical shared hook scripts.
- `.claude/scripts/` is intentionally absent; hook scripts live under
  `.agents/hooks/scripts/`.
- `.claude/skills/` is intentionally absent; canonical skill instructions live
  only under `.agents/skills/`.

## Workflow Resolution

If a user request matches a canonical workflow by name, command adapter, alias,
or clear task shape, read and follow `.agents/workflows/<workflow>/workflow.md`
and its `contract.json` before acting.

If no workflow matches, proceed under `harness/manual.md` and say when a new
workflow should be considered. If an apparent workflow match is rejected, state
the reason before continuing.

## Memory

Durable agent-operating memory belongs in `harness/`, starting with
`harness/memory.md`.

Runtime-private memory files, including Claude Code's `~/.claude/.../MEMORY.md`,
are adapter pointers only. Do not store durable project knowledge there.

Read `harness/operator.md` for the active agent/runtime persona and
`harness/user.md` for Bob's stable user context.

## Safety

Do not put secrets in `.agents/`, `harness/`, root docs, or tracked manifests.
Runtime-local credential config belongs only in ignored/private adapter config.
