# Adapters

Runtime-specific adapter notes and generated outputs live here.

Canonical definitions belong in `.agents/` and `harness/`, not in runtime
folders.

Current generators:

- `claude/generate-commands.mjs`: Claude workflow command adapters.
- `codex/generate-workflow-skills.mjs`: Codex workflow skill adapters.
- `codex/generate-role-skills.mjs`: Codex role skill adapters.
- `generate-hooks.mjs`: Claude, Codex, and Gemini hook config adapters.
