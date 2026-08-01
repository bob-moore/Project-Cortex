---
date: 2026-07-31
description: System-level CLI/package dependencies this harness relies on, for fresh-machine portability.
tags:
  - harness
  - dependencies
---

# Environment Dependencies

System-level tools this harness depends on, outside of any single project's
`package.json`. Kept here so moving to a new machine is a checklist, not a
series of silent failures discovered one skill at a time.

**Why:** a skill or CLI-backed tool that assumes a global binary is present
fails invisibly (or with a confusing error) if that binary was never
reinstalled after a machine move. This file exists so a fresh-machine setup
can install everything up front instead of discovering gaps mid-task.

**How to apply:** whenever a new external CLI/package becomes a standing
dependency for this harness (not a one-off experiment), add it here in the
same turn it's installed — don't defer it. When starting on a new machine,
work through this file top to bottom before assuming any harness skill will
work correctly.

## Runtimes

| Runtime | Observed version | Why |
|---|---|---|
| Node.js + npm | v22.23.1 / npm 10.9.8 | Required by every npm-based CLI tool below |
| Python 3.x | 3.14.6 | No active harness dependency as of 2026-07-31; present on this machine and required by some evaluated-but-not-adopted tooling (e.g. `ui-ux-pro-max-skill`'s search scripts). Install from python.org or a package manager if a future skill needs it — do not install it silently on the user's behalf |
| PHP (CLI) | 8.4.21 | Required by WP-CLI (`wp`), below |
| GitHub CLI (`gh`) | 2.91.0 | Required for all GitHub PR/issue workflows (`gh pr`, `gh issue`, `gh api`) |

## Global npm packages

| Package | Purpose | Install | First confirmed |
|---|---|---|---|
| `defuddle` | Clean markdown extraction from web pages — used by the `defuddle` skill instead of WebFetch for standard pages | `npm install -g defuddle` | 2026-07-31 |
| `playwright` (+ Chromium browser) | General browser-automation/rendering capability (screenshots, real computed styles) for any future extraction or verification tooling. Originally installed to test skillui's ultra mode; kept after skillui was rejected because the capability itself is broadly useful | `npm install -g playwright && npx playwright install chromium` | 2026-07-31 |
| `@open-pencil/cli`, `@open-pencil/mcp` | Open Pencil design tool CLI/MCP integration | `npm install -g @open-pencil/cli @open-pencil/mcp` | pre-existing on this machine, install date unconfirmed |
| `@google/gemini-cli` | Gemini adapter CLI | `npm install -g @google/gemini-cli` | pre-existing on this machine, install date unconfirmed |
| `lighthouse`, `pa11y`, `html-validate`, `unlighthouse`, `linkinator` | Web quality, accessibility, and link-checking — back the `.agents/skills/web-quality-verification` discipline | `npm install -g lighthouse pa11y html-validate unlighthouse linkinator` | pre-existing on this machine, install date unconfirmed |
| `@tobilu/qmd` | Vault semantic search — backs the `qmd` skill, the SessionStart hook, and `.agents/hooks/scripts/qmd-mcp.mjs`/`scripts/qmd-bootstrap.ts`. Load-bearing: most of this harness's retrieval discipline assumes it's present | `npm install -g @tobilu/qmd` | observed 2.5.3, install date unconfirmed |

## Non-npm CLI tools

Tools this harness depends on that don't come from `npm install -g` — easy to miss on a fresh machine because there's no single package-manager checklist for them.

| Tool | Observed version | Purpose | Install |
|---|---|---|---|
| `graphify` | 0.9.8 | Codebase/content knowledge-graph builder — backs the `graphify` skill and the Codex/Gemini `graphify-hook-*` PreToolUse guards (both degrade to a silent no-op if it's missing, so absence is quiet, not a hard failure) | `uv tool install graphifyy` (via [uv](https://docs.astral.sh/uv/); package name has a double `y` — confirm against `uv tool list` before assuming a typo). Requires `uv` itself as a prerequisite |
| Obsidian CLI | n/a (provided by Obsidian.app itself) | Vault-aware reads/search/backlinks — backs the `obsidian-cli` skill and `harness/manual.md`'s Obsidian CLI commands | No separate package — the `obsidian` command is exposed by the Obsidian desktop app (obsidian.md) once installed. On macOS the app must be opened at least once before the CLI responds without a window flash |
| WP-CLI (`wp`) | 2.12.0 | WordPress operations — backs `wp-wpcli-and-ops`, `wordpress-site-operations`, `wp-project-triage`, `wp-abilities-verify`, and other WordPress-discipline skills | `brew install wp-cli` (macOS) — see [wp-cli.org](https://wp-cli.org) for other platforms. Requires PHP CLI |
| Composio CLI | 0.2.32 | Operational-evidence broker (calendar, Gmail, Drive, Monday.com, GSC/GA) per `harness/manual.md`'s Operational Integration Boundary | Install method on this machine unconfirmed — a standalone binary at `~/.composio/composio`, not npm/brew. Each user needs their own install plus `composio login`; verify current install instructions at [docs.composio.dev](https://docs.composio.dev) before assuming the exact command |

## Verifying a fresh machine

```bash
node -v && npm -v
python3 --version
php --version
gh --version
for pkg in defuddle playwright @open-pencil/cli @open-pencil/mcp @google/gemini-cli lighthouse pa11y html-validate unlighthouse linkinator @tobilu/qmd; do
  npm list -g "$pkg" --depth=0 2>/dev/null || echo "MISSING: $pkg"
done
npx playwright install chromium
command -v graphify >/dev/null && graphify --version || echo "MISSING: graphify (optional — hooks degrade to no-op without it)"
command -v obsidian >/dev/null && echo "obsidian CLI: OK (requires Obsidian.app opened once)" || echo "MISSING: obsidian CLI (install Obsidian.app)"
command -v wp >/dev/null && wp --version || echo "MISSING: wp-cli"
command -v composio >/dev/null && composio --version || echo "MISSING: composio"
```

## Open items

- Install dates for the pre-existing packages (Open Pencil, Gemini CLI, the
  web-quality-verification toolchain, `@tobilu/qmd`) are unconfirmed — nobody
  had documented them before this file existed. Backfill when there's a
  natural reason to touch that tooling again.
- Tools evaluated and rejected as harness dependencies (not installed here)
  are tracked in [[gotchas]] instead, so the reasoning isn't lost — e.g.
  `skillui`, rejected 2026-07-31 for unreliable design-token extraction on
  real-world sites.
- Composio's exact install command on a fresh machine is unconfirmed (see
  table above) — confirm and replace the placeholder guidance next time a
  fresh install is actually done.
- Whether Composio is a per-user requirement for every teammate the harness
  ships to, or specific to this operator's setup, hasn't been decided — see
  the open question already tracked in [[Harness Distribution Prep]] about
  documenting vs. excluding global/session-level dependencies.
