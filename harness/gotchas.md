# Gotchas

Known pitfalls and failure modes for agents working inside this vault.

## Current Gotchas

- Do not treat `.claude/` files as canonical just because they currently contain
  the most implementation detail.
- Do not store secrets in `.agents/`, `harness/`, root docs, or tracked manifests.
- Do not assume every runtime supports the same command, hook, skill, or
  multi-agent semantics.
