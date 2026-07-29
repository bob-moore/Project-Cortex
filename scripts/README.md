# Scripts

Human-facing vault setup and maintenance scripts live here.

Use this directory for commands a person may run from the vault root, such as
bootstrapping a local search index. Deterministic agent methodology checks live
in `.agents/scripts/`, and lifecycle hook implementations live in
`.agents/hooks/scripts/`.

## Current Scripts

- `qmd-bootstrap.ts`: idempotently registers and rebuilds the QMD index declared
  in `vault-manifest.json`.

