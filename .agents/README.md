# Agents Layer

This directory is the canonical runtime machinery layer for this vault.

It defines what agents can do and how runtimes load those capabilities. Durable
agent-operating knowledge lives in `harness/`.

## Directory Contract

| Path | Purpose |
|---|---|
| `manifest.yaml` | Canonical registry of paths, runtime adapters, and migration status. |
| `roles/` | Runtime-neutral role contracts. |
| `disciplines/` | Cross-skill discipline contracts, mode maps, rubrics, and skill maps. |
| `workflows/` | Runtime-neutral workflow and command specs. |
| `skills/` | Portable skills and Codex-discoverable `SKILL.md` directories. |
| `hooks/` | Runtime-neutral hook specs and canonical shared hook scripts. |
| `tools/` | Tool and MCP capability metadata. No secrets. |
| `schemas/` | Schemas for roles, workflows, run results, frontmatter, and manifests. |
| `adapters/` | Runtime-specific adapter notes and generated outputs. |
| `scripts/` | Generators, validators, and drift checks. |
| `loop/` | Disabled automation loop scaffold: triage, conductor, worker, verifier, and dry-run preflight. |

## Gate

Run the deterministic gate before claiming structural work is done:

```bash
node .agents/scripts/gate.mjs
```

Run standing goals:

```bash
node .agents/scripts/verify-goals.mjs
```
