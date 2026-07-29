# Architecture

This vault is a runtime-neutral agent operating vault. The vault is durable
state; `.agents/` is runtime machinery; `harness/` is agent-operating knowledge;
runtime folders are adapters.

## Source Layers

| Layer | Path | Purpose |
|---|---|---|
| Vault content | `Clients/`, `Projects/`, `Prospects/`, `Notes/`, `Journal/`, `org/`, `reference/`, `reviews/`, `inbox/` | Human and agent-facing work records. |
| Operating knowledge | `harness/` | Manual, methodology, user/operator context, memory, decisions, patterns, gotchas, goals, policies, runbooks, ledgers, session logs. |
| Runtime machinery | `.agents/` | Canonical manifest, roles, workflows, skills, hooks, schemas, tools, adapters, and validation scripts. |
| Runtime adapters | `.claude/`, `.codex/`, `.gemini/`, `.hermes/` | Thin runtime-specific registration surfaces generated from or pointing to `.agents/`. |

## Operating Model

Agents start with `harness/manual.md`, `harness/operator.md`, and
`harness/user.md`. They use `.agents/manifest.yaml` to discover canonical roles,
workflows, skills, and hooks.

The methodology is:

1. Establish a contract before meaningful work.
2. Route through the narrowest useful workflow, role, and skill.
3. Require explicit approval before mutating external systems or durable vault
   records when the change is consequential.
4. Verify done state with evidence, not self-report.
5. Promote durable knowledge into the appropriate vault note.

See `harness/operational-methodology.md` for the full method and
`harness/workflows.md` for workflow resolution.

## Runtime Adapter Rule

No runtime folder is a source of truth. Runtime-specific files should stay thin:

- Claude command adapters point to `.agents/workflows/<workflow>/`.
- Claude role adapters point to `.agents/roles/<role>/`.
- Codex skills mirror canonical roles/workflows/skills where Codex needs
  `SKILL.md` discovery.
- Gemini and Hermes adapters should follow the same pattern when their runtime
  surfaces are implemented.

When canonical behavior changes, update `.agents/` and regenerate or adjust
adapters. Do not make a behavior change only in `.claude/`, `.codex/`,
`.gemini/`, or `.hermes/`.

## Hooks

Hook scripts live canonically in `.agents/hooks/scripts/`.

Hook adapters live in:

- `.claude/settings.json`
- `.codex/hooks.json`
- `.gemini/settings.json`

The shared hooks classify prompts, validate vault writes, maintain searchable
context, and remind the runtime about wrap-up obligations. They are support
machinery; they do not replace agent judgment.

## Search

QMD is the preferred local semantic search layer when available. It indexes the
vault and allows agents to retrieve context without loading entire folders.

Search preference:

1. QMD MCP tools, when registered.
2. `qmd` CLI, when available.
3. `rg`, `find`, and direct file reads.

Search results are evidence candidates. Agents still need to inspect relevant
source notes before making durable claims or edits.

## Validation

The current validation entry point is:

```bash
node .agents/scripts/gate.mjs
```

The gate verifies workflow contracts, role contracts, discipline wiring,
runtime adapters, hook definitions, and vault structure. Run it after structural
changes.

`node .agents/scripts/verify-goals.mjs` checks goal records separately.

## Extension Rules

- Add canonical roles in `.agents/roles/<role>/`.
- Add canonical workflows in `.agents/workflows/<workflow>/`.
- Add canonical skills in `.agents/skills/<skill>/`.
- Register changes in `.agents/manifest.yaml`.
- Update `harness/skills.md`, `harness/workflows.md`, or
  `harness/manual.md` when the change affects agent behavior.
- Add runtime adapters only after the canonical layer exists.

Keep historical project notes as project records, but do not let old runtime
language override the current methodology.
