# Access and Environment Targeting

## Resolve identity before access

1. Read the client's Stack note.
2. Record the requested environment: local, staging, or production.
3. Resolve its URL, local path/container, WordPress identity (`home` and `siteurl`), and documented access adapter.
4. Use a read-only identity check before any write.

Do not infer environment from a domain label, shell history, MCP server name, or remembered port.

## Adapter preference

Use the narrowest reliable documented interface:

1. Project wrapper scripts (`bin/scripts/wp.sh`, container command, repository instructions)
2. Purpose-built REST/Abilities interface with scoped permissions
3. WP-CLI with explicit target
4. Novamira when documented for that environment
5. Browser/wp-admin for UI-only settings or visual editor work
6. WPRemote for fleet/hosting operations it owns

The interface does not determine role ownership. A WP-CLI or PHP call that changes content/options remains a WordPress operation.

## When the target adapter is registered for a different runtime

A project may register an MCP server (e.g. a block-level editing server) only for Codex's client config (`.codex/config.toml`), not for the runtime you're executing in. Confirm this before assuming the tool is unreachable — check the runtime's own MCP registration (e.g. `claude mcp list`) against what the project's own `AGENTS.md`/`.codex/config.toml` documents. If it's genuinely registered elsewhere only:

- If you have local shell access, you can invoke Codex directly for that bounded operation (`codex exec ...`) rather than treating this as a hard blocker. Keep the work in the active session and return evidence to the parent; do not create detached queue tasks or handoff notes for someone else to run later.
- Remote WordPress/MCP work over Codex needs network egress, which Codex's sandbox blocks by default and fails silently rather than prompting. Use the reusable profile `~/.codex/wp-mcp.config.toml` (`network_access = true`): `codex exec --profile wp-mcp -s workspace-write -C /path/to/repo "task..."`.
- Never treat a `codex exec` exit code as task success — read the actual result and independently verify per the Verify-in-layers workflow step.
- If no direct path exists at all (no local shell, no reachable runtime), report the concrete access blocker to the parent instead of guessing or falling back to a queue file.

## Read-only identity checks

Depending on adapter, capture:

- `home` and `siteurl`
- WordPress version
- active theme
- target post/option/plugin existence
- current user capability when relevant
- multisite/site URL when applicable

If any identity signal contradicts the Stack note or task, stop and reconcile before writing.

## Approval

A user request authorizes only its named scope. Local/staging writes may proceed when explicitly part of the task. Production administrative, destructive, bulk, or environment-wide actions require explicit approval immediately before mutation and a rollback path.
