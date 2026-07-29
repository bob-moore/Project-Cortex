# Claude Adapter Audit

Date: 2026-07-29

Purpose: classify `.claude/` by layer before further porting. The target
architecture is one canonical harness in `.agents/` plus thin runtime adapters.
Claude should not own behavior, roles, workflows, hooks, memory, or skills.

## Summary

| Layer | Current State | Classification | Next Action |
|---|---|---|---|
| `CLAUDE.md` | Root Claude startup adapter. | Thin adapter. | Keep as a pointer to `harness/manual.md`. |
| `.claude/settings.json` | Generated hook config pointing at `.agents/hooks/scripts`. | Thin adapter. | Keep generated. |
| `.claude/settings.local.json` | Local Claude permissions/hooks with old absolute paths and broad allowances. Not tracked. | Private local state. | Keep untracked and ignored. Do not use as architecture. |
| `.claude/commands/` | Canonical command adapters generated from `.agents/workflows`. | Thin adapter. | Keep generated and fail verification on extras. |
| `.claude/agents/` | Removed from active architecture. | Disabled. | Keep absent unless a specific Claude-only dispatch need is approved later. |
| `.claude/scripts/` | Removed from active architecture. | Disabled. | Keep absent; hook scripts live in `.agents/hooks/scripts/`. |
| `.claude/skills/` | Removed from active architecture. | Disabled. | Keep absent; canonical skill instructions live only in `.agents/skills/`. |
| `.claude/memory-template.md` | Removed from active `.claude/`; replacement lives at `.agents/adapters/claude/memory-template.md`. | Adapter documentation. | Keep out of active runtime folder. |
| `.claude/scheduled_tasks.lock` | Removed from git. | Runtime state. | Keep ignored if recreated. |
| `.claude/worktrees/` | Empty. | Runtime scratch. | Ignore/remove if it becomes populated. |
| `.claude/update-skills.ts` | Removed. | Legacy import updater. | Do not bulk-update `.claude/skills`; reconcile skills by discipline. |

## Command Findings

Canonical workflow parity:

- Claude commands total: 24
- Commands with canonical workflows: 24
- Canonical workflows missing Claude commands: 0

Resolved in the command-layer cleanup:

- `assistant` was promoted to `.agents/workflows/assistant/`.
- `agent-research` was removed because there is no current canonical research
  workflow or role in this harness.
- `verify-adapters.mjs` now fails on any extra active Claude command without a
  canonical workflow contract.

## Agent Findings

Claude-native agent registration is intentionally disabled:

- Canonical roles remain in `.agents/roles/`.
- Codex role skill adapters remain in `.agents/skills/role-*`.
- Claude resolves roles through workflow specs and canonical role contracts
  instead of `.claude/agents/`.

Architectural note: if Claude-native subagents are reintroduced later, they must
be generated adapters only and must not become the role source of truth.

## Hook Findings

`.claude/settings.json` is already generated from `.agents/hooks/events.json`
and points to `.agents/hooks/scripts`.

`.claude/scripts/` is no longer the active hook source for Claude. Hook scripts
live in `.agents/hooks/scripts/`, and runtime configs must point there.

## Skill Findings

`.claude/skills/` is disabled.

Observed:

- `grilling` and `grill-me` live in `.agents/skills/grilling/SKILL.md` and
  `.agents/skills/grill-me/SKILL.md`.
- `.agents/scripts/verify-adapters.mjs` fails if `.claude/skills` exists.

The older `.claude/skills` import library has been exhausted for the current
first-version target. Do not mirror or rebuild the Claude skill tree wholesale.

## Immediate Recommendations

1. Treat `.claude/skills` as disabled, not adapter truth.
