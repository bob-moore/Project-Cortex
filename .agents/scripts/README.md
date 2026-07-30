# Scripts

Generators, validators, and drift checks for the `.agents/` layer live here.

- `verify-workflows.mjs`: validates workflow specs and `contract.json` files.
- `verify-roles.mjs`: validates role contracts and workflow role references.
- `verify-disciplines.mjs`: validates discipline contracts, mode/rubric files,
  and active discipline skills.
- `verify-adapters.mjs`: validates runtime adapter parity for Claude command
  adapters, disabled Claude-native role agents, Codex workflow skills, and Codex
  role skills.
- `verify-hooks.mjs`: validates canonical hook specs and generated Claude,
  Codex, and Gemini hook configs.
- `verify-qmd-runtime.mjs`: validates vault-local QMD SQLite path derivation and
  `INDEX_PATH` override preservation for TS hooks and the MCP wrapper.
- `verify-startup-context.mjs`: validates SessionStart output size budget and
  rejects recursive file listings or generated/plugin bulk paths.
- `verify-vault.mjs`: validates basic vault structure assumptions.
- `gate.mjs`: deterministic gate that runs the required checks before a done claim.
- `verify-goals.mjs`: runs standing goal predicates and appends goal-ledger results.
- `trust-ledger.mjs`: renders and updates trust tiers per workflow, skill, role, or adapter.
- `log-dispatch.mjs`: records significant workflow dispatches.
- `cost-check.mjs`: checks or logs estimated runtime cost.
- `charcount.ts`: shared character count helper used by review workflows.
