---
name: novamira-wordpress-mcp-access
description: Connect, inspect, and verify Novamira MCP access for WordPress site checkouts. Use when a WordPress repo mentions Novamira, MCP, @automattic/mcp-wordpress-remote, WP_API_URL/WP_API_USERNAME/WP_API_PASSWORD, AGENTS.md MCP instructions, bin/scripts/codex-mcp.sh, bin/scripts/wp.sh, wp-env, Docker-backed local WordPress, or when the user asks whether Codex can connect to or edit a WordPress site through Novamira MCP.
---

# Novamira WordPress MCP Access

Use this skill to avoid rediscovering the same Novamira MCP setup on every WordPress site. Prefer the project's own documented command surface over ad hoc global configuration. Assume the user may have many local and remote WordPress targets available at once.

## Fast Path

1. Read `AGENTS.md` first if it exists.
2. Inspect `.env.example`, `composer.json`, `.wp-env.json`, and helper scripts only as needed.
3. Do not print `.env` values. If you must inspect `.env`, list keys or masked values only.
4. Prefer these project commands when present:
   - `composer run mcp:env`
   - `composer run mcp:env -- --profile staging`
   - `composer run mcp:tools`
   - `composer run mcp:install`
   - `composer run wp -- <wp args>`
   - `bin/scripts/codex-mcp.sh <command>`
   - `bin/scripts/codex-mcp.sh --profile <name> <command>`
   - `bin/scripts/wp.sh <wp args>`
5. Confirm whether the current Codex session already exposes the MCP namespace. A working `mcp:tools` command does not guarantee direct MCP tools are loaded in the active session.

## Expected Project Contract

A reusable Novamira-enabled WordPress checkout should include:

- `AGENTS.md` documenting local URL, MCP route, environment variables, and command policy.
- `.env.example` with blank secrets and these keys:
  - `PROJECT_MCP_SLUG`
  - `MCP_DEFAULT_PROFILE`
  - `WP_MCP_ROUTE`
  - `MCP_LOCAL_SERVER_NAME`
  - `WP_LOCAL_URL`
  - `WP_LOCAL_API_URL`
  - `WP_LOCAL_API_USERNAME`
  - `WP_LOCAL_API_PASSWORD`
  - Remote profile keys such as `MCP_STAGING_SERVER_NAME`, `WP_STAGING_API_URL`, `WP_STAGING_API_USERNAME`, and `WP_STAGING_API_PASSWORD`.
  - `MCP_SERVER_NAME`, `WP_API_URL`, `WP_API_USERNAME`, `WP_API_PASSWORD`, and `WP_APPLICATION_PASSWORD` as backward-compatible local-profile aliases when needed.
- `bin/scripts/codex-mcp.sh` with `env`, `install`, `get`, `list`, and `tools` commands.
- `bin/scripts/mcp-tools.mjs` to start `@automattic/mcp-wordpress-remote` and list `tools/list`.
- `bin/scripts/wp.sh` to target the project's wp-env runtime and fall back to the matching Docker CLI container when wp-env metadata is stale.
- Composer aliases for the helper commands when the repo uses Composer.

## Multi-Target Rules

1. Treat every WordPress target as a profile. Common profiles are `local`, `staging`, `production`, or a client/site slug.
2. Require a unique MCP server name per target. Good names include:
   - `novamira-example-local`
   - `novamira-example-staging`
   - `novamira-example-production`
3. Never use a generic shared name such as `novamira-localhost` when multiple local sites may be running.
4. Use profile-specific credentials for remote profiles. Do not silently reuse local-profile `WP_API_*` values for staging or production.
5. If the user has multiple localhost WordPress installs running on different ports, use separate local profile names or separate project-local `.env` files so each target resolves to its own `WP_*_API_URL` and `MCP_*_SERVER_NAME`.
6. If a remote staging site has no local equivalent, it still gets its own profile and MCP server entry; skip the wp-env/WP-CLI local runtime check unless a project wrapper is available for that remote.

## Connection Workflow

1. Validate non-secret configuration.
   - Run `composer run mcp:env` or `bin/scripts/codex-mcp.sh env` for the default target.
   - Run `composer run mcp:env -- --profile staging` or `bin/scripts/codex-mcp.sh --profile staging env` for a named remote target.
   - Confirm `MCP_SERVER_NAME`, `WP_API_URL`, `WP_API_USERNAME`, and `WP_API_PASSWORD=<set>`.
   - Never echo the actual password or application password.
2. Install or inspect Codex MCP config.
   - Run `composer run mcp:get` or `bin/scripts/codex-mcp.sh get` if the server may already exist.
   - Run profile-specific commands, such as `bin/scripts/codex-mcp.sh --profile staging get`, when working outside the default target.
   - Run `composer run mcp:install` or the profile-specific install command only when the user wants the Codex client config created or refreshed.
   - After install, tell the user that a fresh Codex session may be required for direct tool exposure.
3. Discover MCP tools.
   - Run `composer run mcp:tools`, `bin/scripts/codex-mcp.sh tools`, or the relevant profile-specific variant.
   - If network/package resolution fails while invoking `npx`, retry with the appropriate approval flow.
4. Verify the local WordPress runtime.
   - Run `composer run wp -- core version` or `bin/scripts/wp.sh core version`.
   - If `wp-env` says the environment is not initialized but Docker containers exist, let `bin/scripts/wp.sh` try its Docker fallback.
   - For remote-only profiles, use MCP discovery and a reversible MCP write/read/delete proof instead of a local wp-env check.
5. Prove write access only with reversible writes.
   - Preferred: use a Novamira MCP execute ability to set, read, and delete a transient.
   - Secondary: write, read, and delete a temporary file under `wp-content/uploads/`.
   - Do not perform visible content edits during connection verification unless the user explicitly asked for the edit.

## Creating Missing Project Scaffolding

When a site has `.env` keys for Novamira but lacks project helpers:

1. Add or update `AGENTS.md` with local and remote profile rules, MCP endpoint patterns, required env keys, MCP install shape, WP-CLI wrapper usage, and restart note.
2. Add `.env.example` with blank secrets and defaults inferred from `.wp-env.json`; do not copy secrets from `.env`.
3. Add `bin/scripts/codex-mcp.sh`, `bin/scripts/mcp-tools.mjs`, and `bin/scripts/wp.sh`.
4. Add Composer scripts if `composer.json` exists:
   - `wp`
   - `mcp:install`
   - `mcp:get`
   - `mcp:list`
   - `mcp:tools`
   - `mcp:env`
5. Ensure executable scripts have executable bits.
6. Update `.gitignore` allowlists if the repo ignores root files or `bin/` contents by default.
7. If `.env` already uses `MCP_SERVER_NAME=novamira-localhost`, add a unique `MCP_LOCAL_SERVER_NAME` and prefer that over the legacy name.

## Reporting Rules

Always distinguish these states:

- MCP client config is installed.
- MCP tools can be discovered by the helper.
- Direct MCP tools are available in the current Codex session.
- WP-CLI fallback is available.
- Actual edits were made through MCP versus WP-CLI.

If direct MCP tools are unavailable in-session but helper discovery succeeds, say that clearly and continue with the project WP-CLI wrapper only if it fits the user's task.

## Safety Notes

- Treat `.env` as secret-bearing; inspect keys or masked values only.
- Do not run destructive WP-CLI operations such as imports, pushes, pulls, search-replaces, or delete commands without explicit user confirmation and a backup/export plan.
- Prefer read-only discovery before writes.
- Keep verification writes non-visible and reversible.
