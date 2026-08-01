---
description: Roadmap for fixing QMD storage portability, startup context waste, and recurring runtime hygiene checks.
tags:
  - harness
  - roadmap
  - runtime-hygiene
  - qmd
  - graphify
status: complete — Phases 1-5 verified
date: 2026-08-01
created: 2026-07-29
updated: 2026-08-01
---

# Runtime Hygiene Roadmap

## Goal

Make the harness cheap, portable, and predictable across Claude, Codex, Gemini,
Hermes, and future adapters. Complements
[[developer-role-expansion|Developer Role Expansion]], which controls the
skill stack and documentation curation loop rather than startup/adapter
plumbing.

The immediate fixes are:

1. Move QMD's writable SQLite store out of the global user cache and into a
   vault-local ignored path.
2. Remove startup context waste, especially the full recursive Markdown file
   listing.
3. Add a repeatable maintenance check for runtime hygiene so adapter drift,
   sandbox failures, and token bloat are caught before normal work sessions.

## Current Diagnosis

### QMD Store Problem

Current QMD behavior resolves the named index to a global cache path:

```text
/Users/bobmoore/.cache/qmd/agency-vault-harness.sqlite
```

That creates two classes of failure:

- **Sandbox mismatch:** Codex can read the existing index but cannot reliably
  open the global cache database writable, causing SQLite startup failures such
  as `attempt to write a readonly database`.
- **Multi-vault mismatch:** multiple vaults on the same machine can accidentally
  share, stale-read, or collide through the same global QMD cache namespace.

The project already has an ignored writable temp area:

```text
tmp/
```

So the project convention should be:

```text
<VAULT_ROOT>/tmp/qmd/<qmd_index>.sqlite
```

For this vault today, that becomes:

```text
/Users/bobmoore/Dev/ProjectCortex/tmp/qmd/agency-vault-harness.sqlite
```

### Startup Waste Problem

The SessionStart hook currently prints a broad startup packet, including a full
vault Markdown file listing. The file listing is navigation data, not operating
memory. It burns context on information that should be retrieved on demand with
QMD, graphify, or targeted file search.

Startup should orient the agent, not preload the vault.

### Graphify Scope Problem

Graphify is intended to answer targeted structural questions, but the current
graph includes runtime/plugin debris such as `.obsidian/plugins/*`. This causes
queries to surface minified plugin internals before harness concepts.

Graphify is still useful, but it should be treated as a scoped navigation layer,
not a reason to inject raw file trees or generated artifacts into startup.

## Target Architecture

### Startup Context Contract

Always inject only a small control packet:

- Date and runtime identity.
- Pointer to `harness/manual.md` as the canonical operating manual.
- Short operator/user/north-star excerpts.
- Active work summary, capped.
- Open tasks summary, capped.
- Dirty worktree summary, if the runtime can obtain it cheaply.
- Retrieval routing reminder:
  - use QMD for vault text recall;
  - use graphify for structure and relationships;
  - use direct file reads for authoritative source checks.

Never inject by default:

- Full vault file listings.
- Generated graph/report/cache content.
- Full memory/gotchas/decision logs.
- Full workflow/role/skill libraries.
- Client/project folders not relevant to the current task.
- Obsidian plugin/runtime internals.

### Retrieval Contract

Use on demand:

- `harness/manual.md` for operating rules.
- `harness/memory.md`, `harness/gotchas.md`, `harness/key-decisions.md`, and
  `harness/roadmap.md` for durable harness knowledge.
- `.agents/workflows/<workflow>/workflow.md` and `contract.json` only when a
  user request clearly matches that workflow.
- `.agents/roles/` and `.agents/skills/` only when routing or task shape calls
  for them.
- QMD for text recall across Markdown notes.
- Graphify for code/path/concept relationships and focused graph traversal.

## Implementation Plan

### Phase 1: Establish Vault-Local QMD Store Convention

Status: verified across Claude, Codex, Gemini, and Hermes

1. Add a shared helper that derives the QMD SQLite path from the vault root and
   `vault-manifest.json`:

   ```text
   <VAULT_ROOT>/tmp/qmd/<qmd_index>.sqlite
   ```

2. Validate `qmd_index` with the existing safe index-name rules before using it
   in a path.

3. Ensure `tmp/qmd/` is created before QMD starts.

4. Preserve explicit user/runtime overrides:

   - If `INDEX_PATH` is already set, do not clobber it.
   - Otherwise derive the vault-local path.

5. Update all QMD entrypoints to use the same convention:

   - `.agents/hooks/scripts/qmd-mcp.mjs`
   - `.agents/hooks/scripts/qmd-refresh-run.ts`
   - `.agents/hooks/scripts/lib/qmd-refresh.ts` if env propagation is needed
   - `.agents/hooks/scripts/qmd-refresh.ts`
   - `.agents/hooks/scripts/pre-compact.ts`
   - any bootstrap docs/helpers that tell agents how to run QMD manually

6. Add or update tests for:

   - valid index path derivation;
   - invalid index rejection;
   - existing `INDEX_PATH` override preservation;
   - MCP launcher env behavior;
   - refresh worker env behavior.

Current implementation status:

- Added shared TS QMD environment helpers in `.agents/hooks/scripts/lib/qmd.ts`.
- Added matching MCP wrapper helpers in `.agents/hooks/scripts/qmd-mcp.mjs`.
- SessionStart, QMD refresh worker, MCP launch, and `scripts/qmd-bootstrap.ts`
  now preserve explicit `INDEX_PATH` and otherwise use
  `<VAULT_ROOT>/tmp/qmd/<qmd_index>.sqlite`.
- Added `.agents/scripts/verify-qmd-runtime.mjs` to lock path derivation,
  parent directory creation, and override preservation for the TS and MCP
  surfaces.

### Phase 2: Fix Codex Hook Protocol Compatibility

Status: implemented, pending Codex runtime verification

Known failures:

- Codex reports `PreToolUse hook (failed)` with exit code 127 in this harness.
- Codex Stop hook output should be protocol-safe and not rely on the
  human-readable checklist stdout used by Claude/Gemini.

1. Confirm Codex's Stop hook output contract.

2. Update the generated Codex adapter so Stop hook output is valid for Codex:

   - either valid hook JSON;
   - or no stdout if Codex requires silence.

3. Keep Claude/Gemini behavior separate if those runtimes tolerate or expect
   plain text checklist output.

4. Add adapter-generation tests so `.codex/hooks.json`, `.claude/settings.json`,
   and `.gemini/settings.json` do not drift from `.agents/hooks/events.json`.

5. Make QMD refresh worker failures diagnosable without polluting normal output:

   - silent by default;
   - visible under `HOOK_DEBUG=1`;
   - optionally write ignored diagnostic logs under `tmp/hook-logs/`.

Current implementation status:

- Added `.agents/hooks/scripts/codex-stop.ts` as a silent Codex Stop hook that
  still triggers the debounced QMD refresh.
- Replaced Codex's direct `/Users/.../graphify hook-check` PreToolUse command
  with `.agents/hooks/scripts/graphify-hook-check.ts`, which exits 0 silently
  when graphify is unavailable and otherwise preserves graphify's result.
- Replaced Gemini's direct graphify hook command with
  `.agents/hooks/scripts/graphify-hook-guard-gemini.ts`.
- Registered these hooks in `.agents/hooks/events.json` and regenerated
  `.codex/hooks.json` and `.gemini/settings.json`.
- Tightened `.agents/scripts/verify-hooks.mjs` so generated runtime configs may
  not contain user-local absolute paths, direct graphify hook commands, or
  unexpected non-generated hook commands.

### Phase 3: Shrink SessionStart Context

Status: implemented, pending runtime verification

1. Remove the `### Vault File Listing` section from SessionStart output.

2. Replace it with a short retrieval map:

   ```text
   Use harness/manual.md for operating rules.
   Use QMD for vault text recall.
   Use graphify for code/concept relationships.
   Use search_files/read_file for source-of-truth checks.
   ```

3. Cap each startup section independently:

   - recent changes: small fixed count;
   - open tasks: small fixed count;
   - active work: small fixed count;
   - harness topics: descriptions only, no full note bodies.

4. Add a startup size budget test:

   - target: under 2,000 words;
   - warning threshold: under 8,000 characters if easier to test;
   - hard failure if generated startup includes recursive file listings.

5. Add explicit tests that generated startup excludes:

   - `graphify-out/`
   - `.obsidian/plugins/`
   - `node_modules/`
   - full `Clients/`, `Projects/`, or generated reports unless requested.

Current implementation status:

- Removed the `### Vault File Listing` section from SessionStart output.
- Added a compact `### Retrieval Map` section that routes agents to
  `harness/manual.md`, QMD, graphify, and direct source-file reads.
- Reduced recent changes, open tasks, and active work caps.
- Added `.agents/scripts/verify-startup-context.mjs` and wired it into
  `.agents/scripts/gate.mjs`.
- The startup verifier fails on recursive file-listing sections, generated or
  plugin bulk paths, output over 8,000 characters, output over 2,000 words, or
  output over 250 lines.

### Phase 4: Tighten Graphify and Search Scope

Status: partially done

1. Configure graphify to exclude generated/runtime/vendor debris:

   - `.obsidian/plugins/`
   - `graphify-out/`
   - `node_modules/`
   - `tmp/`
   - `.git/`
   - runtime caches and generated reports where appropriate.

2. Re-run graphify after the ignore scope is fixed.

3. Verify focused graph queries now return harness files before plugin internals
   for harness questions.

4. Document when agents should use:

   - graphify query/explain/path;
   - QMD query/search/get;
   - direct file reads;
   - session history.

Current implementation status:

- `.graphifyignore` exists and excludes `.obsidian/`, `.claude/`, `.codex/`,
  `.gemini/`, `.hermes/`, `tmp/`, `stash/`, `harness/session-logs/`,
  `node_modules/`, and `.git/` (step 1 done).
- Added `graphify-out/` to `.graphifyignore` so generated graph artifacts cannot
  re-enter the graph as source nodes.
- Rebuilt graphify after the ignore-scope change and verified a harness query
  returns harness concepts without `.obsidian/plugins/` or `node_modules/`
  results.
- Documented graphify query/explain/path, QMD, direct reads, and session-history
  tool-choice guidance in `harness/manual.md`.

### Phase 5: Runtime Hygiene Maintenance Check

Status: implemented and verified 2026-08-01

Create a lightweight maintenance check that can be run manually and eventually
from a workflow, for example:

```text
node .agents/scripts/runtime-hygiene.mjs --check
```

The check should be read-only by default and report pass/warn/fail.

Implementation:

- Canonical command: `node .agents/scripts/runtime-hygiene.mjs --check`.
- Included in `.agents/scripts/gate.mjs`.
- Checks manifest/QMD path and Git ignore coverage, adapter/startup verifier
  results, graphify scope and harness-query output, and reports missing optional
  tooling as warnings rather than silently changing the vault.
- It does not update QMD, rebuild graphify, write logs, or mutate configuration.

## Runtime Hygiene Criteria

### Storage and Sandbox Hygiene

Pass criteria:

- Derived databases and caches are under ignored project-local paths unless a
  runtime explicitly overrides them.
- QMD resolves to `<VAULT_ROOT>/tmp/qmd/<qmd_index>.sqlite` by default.
- No startup/MCP/hook path requires writing to `~/.cache`, `~/.claude`,
  `~/.codex`, or another runtime-private global directory.
- Deleting `tmp/qmd/` produces a recoverable rebuild path.

Maintenance checks:

- Print resolved QMD index name.
- Print resolved `INDEX_PATH` location without exposing secrets.
- Confirm the parent directory is writable.
- Confirm the path is ignored by git.
- Confirm QMD status can open the expected database.

### Adapter Protocol Hygiene

Pass criteria:

- Each generated adapter emits output in the protocol expected by that runtime.
- Claude, Codex, Gemini, and Hermes adapters are generated from canonical
  `.agents/` definitions, not hand-maintained divergent behavior.
- Stop/SessionStart/PostToolUse hooks fail closed or silently when optional
  infrastructure is unavailable.
- Diagnostic detail is available with `HOOK_DEBUG=1` without polluting normal
  prompt context.

Maintenance checks:

- Validate `.codex/hooks.json` parses and matches the expected Codex schema.
- Validate `.claude/settings.json` parses and contains only generated hook
  adapters.
- Validate `.gemini/settings.json` parses and contains only generated hook
  adapters.
- Run each hook script with a minimal fixture payload and assert protocol-valid
  output for that runtime.

### Startup Context Hygiene

Pass criteria:

- Startup output is a small orientation packet, not a vault preload.
- Startup includes enough information to route retrieval, but not the retrieved
  corpus itself.
- Full file listings are never included by default.
- Startup size remains under an agreed budget.

Suggested budget:

- Target: under 2,000 words.
- Warning: over 8,000 characters.
- Fail: over 16,000 characters or any recursive vault file listing.

Maintenance checks:

- Generate SessionStart output and count characters/words/lines.
- Fail if it contains headings such as `### Vault File Listing`.
- Fail if it contains paths from generated or runtime-only folders.
- Warn if recent changes, tasks, or active work exceed their caps.

### Retrieval Hygiene

Pass criteria:

- Agents receive instructions for where to retrieve context, not bulk context.
- QMD is used for Markdown/vault recall.
- Graphify is used for structural and relationship questions.
- Direct source files remain authoritative after retrieval narrows the scope.
- Generated reports are consulted only when focused queries are insufficient.

Maintenance checks:

- Confirm `vault-manifest.json` has a valid `qmd_index` and `qmd_context`.
- Confirm QMD can answer a small status/query call.
- Confirm graphify can answer a small query when `graphify-out/graph.json`
  exists.
- Confirm graphify queries for harness concepts are not dominated by ignored
  plugin/vendor paths after scope cleanup.

### Generated Artifact Hygiene

Pass criteria:

- Generated artifacts are ignored unless intentionally tracked.
- Search and graph tools exclude bulky generated outputs by default.
- Agents do not read or inject generated JSON/report files unless they are the
  subject of the task or a focused query requires them.

Maintenance checks:

- `git check-ignore` for `tmp/qmd/foo.sqlite`, `tmp/hook-logs/foo.log`, and
  other derived paths.
- Warn if `graphify-out/` is untracked and large but not covered by ignore
  policy.
- Warn if search commands include generated/cache folders without explicit
  reason.

### Secret Hygiene

Pass criteria:

- Hooks and maintenance checks print whether credentials are set, never their
  values.
- Runtime-local credential config remains ignored/private.
- Graphify/QMD failures caused by missing credentials are reported directly
  without searching for secrets.

Maintenance checks:

- Scan generated startup output for secret-like environment variable values only
  if the scan can avoid printing the values.
- Confirm adapter config does not contain raw API keys.
- Confirm docs tell agents to ask for a backend/key rather than hunting through
  credential files.

## Acceptance Criteria

The roadmap is complete when:

- Codex can start the QMD MCP server without readonly SQLite errors.
- Claude, Codex, Gemini, and Hermes agree on the same vault-local QMD store
  convention or explicitly document why a runtime differs.
- Stop hooks no longer fail with invalid JSON under Codex.
- SessionStart output no longer includes the full vault Markdown file listing.
- Startup output stays under the agreed size budget.
- A runtime hygiene check reports QMD path, hook protocol status, startup size,
  and generated-artifact scope.
- Graphify queries for harness questions prioritize harness/code concepts over
  Obsidian plugin internals after ignore cleanup.

## Open Questions

- Should the runtime hygiene check live under `.agents/scripts/` as canonical
  machinery, or under `harness/runbooks/` first as a manual checklist?
- Should QMD store location be represented explicitly in `vault-manifest.json`,
  or should it remain a derived convention from `qmd_index` and vault root?
- Should `graphify-out/` be tracked as a shared artifact, ignored as derived
  output, or selectively committed after stable graphify scope is established?
- Should Codex get a runtime-specific Stop hook adapter that suppresses checklist
  output, while Claude keeps human-readable Stop reminders?

## First Implementation Slice

Recommended first slice:

1. Implement shared vault-local QMD path derivation.
2. Wire it into `qmd-mcp.mjs` and `qmd-refresh-run.ts`.
3. Add tests around path derivation and `INDEX_PATH` preservation.
4. Verify Codex can start QMD MCP against `tmp/qmd/agency-vault-harness.sqlite`.
5. Remove the SessionStart file listing and add a startup size check.

Do not start by completing graphify semantic extraction. Fixing runtime storage
and startup context boundaries first will make the later graphify/QMD rebuilds
cheaper and less confusing.
