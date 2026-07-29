# Gemini Adapter

Gemini currently reads `GEMINI.md` and `.gemini/settings.json`.

Current state:

- `GEMINI.md` points Gemini to `harness/manual.md`.
- `.gemini/settings.json` is generated from `.agents/hooks/events.json` and
  points to `.agents/hooks/scripts/`.

Generator target:

- Gemini-facing command or prompt adapters generated from
  `.agents/workflows/<name>/contract.json` and `workflow.md` once Gemini's local
  discovery contract is finalized.
- Gemini-facing agent/profile adapters generated from
  `.agents/roles/<name>/contract.json` and `role.md` once Gemini's local
  discovery contract is finalized.
