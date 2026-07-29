# Codex Adapter

Codex reads `AGENTS.md` and discovers skills under `.agents/skills/<name>/SKILL.md`.

Current state:

- `AGENTS.md` points Codex to `harness/manual.md`.
- Canonical workflows live under `.agents/workflows/`.
- `.agents/adapters/codex/generate-workflow-skills.mjs` emits thin workflow
  skills under `.agents/skills/workflow-<name>/SKILL.md`.
- Canonical roles live under `.agents/roles/`.
- `.agents/adapters/codex/generate-role-skills.mjs` emits thin role skills
  under `.agents/skills/role-<name>/SKILL.md`.
- `.codex/hooks.json` is generated from `.agents/hooks/events.json` and points
  to `.agents/hooks/scripts/`.

Workflow skill rule:

- The skill may load `contract.json` and `workflow.md`.
- The skill must not duplicate workflow logic.
- Canonical workflow specs win over generated skill adapters.

Role skill rule:

- The skill may load `contract.json` and `role.md`.
- The skill must not duplicate role behavior or policy.
- Canonical role contracts win over generated skill adapters.
