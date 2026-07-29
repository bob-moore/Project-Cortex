# Claude Auto Memory Template

Use this only if Claude Code needs a project-level auto-loaded memory pointer
outside the vault.

## Rule

Durable project memory belongs in `harness/`, not in Claude Code's private
memory directory.

## Pointer

Read these vault files for durable context:

| Topic | Vault Location |
|---|---|
| Operating manual | `harness/manual.md` |
| Operator context | `harness/operator.md` |
| User context | `harness/user.md` |
| Durable memory index | `harness/memory.md` |
| Current focus | `harness/north-star.md` |
| Roadmap | `harness/roadmap.md` |
| Patterns and conventions | `harness/patterns.md` |
| Key decisions | `harness/key-decisions.md` |
| Gotchas | `harness/gotchas.md` |
| Workflows and skills | `harness/workflows.md`, `harness/skills.md` |

## Setup

Copy this content into Claude Code's project memory file only when needed:

```text
~/.claude/projects/<encoded-project-path>/memory/MEMORY.md
```

Do not create additional durable memory files there.
