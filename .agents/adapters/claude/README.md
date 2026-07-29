# Claude Adapter

Claude Code reads `CLAUDE.md` and command files under `.claude/commands/`.

Current state:

- `.claude/commands/vault-*.md` are generated thin adapters to
  `.agents/workflows/<name>/workflow.md`.
- `.agents/adapters/claude/generate-commands.mjs` regenerates those adapters.
- `.claude/agents/` is intentionally absent. Roles resolve through canonical
  `.agents/roles/` contracts and workflow specs, not Claude-native subagent
  registration.
- `.claude/settings.json` is generated from `.agents/hooks/events.json` and
  points to `.agents/hooks/scripts/`.
- `.claude/skills/` is intentionally absent. Canonical skill instructions live
  only in `.agents/skills/`.
- `.agents/scripts/verify-adapters.mjs` checks adapter parity.
- `memory-template.md` is a Claude auto-memory pointer template for optional
  external setup.

See `audit.md` for the current layer-by-layer audit and porting risks.
