# Vault Onboarding

## Purpose

First-run conversational setup for a fresh vault (or any vault that has never
completed onboarding): interview the user to fill in operating context,
define the Operator's identity, and check the local dependency setup.

## Invocation

- Canonical workflow: `vault-onboard`
- Runtime adapters may expose this as `/vault-onboard`, `vault-onboard`, or
  another runtime-native trigger. The behavior belongs here.
- Precondition: `.agents/scripts/setup-vault.mjs` should already have run
  (sets `vault-manifest.json`'s `qmd_index`, bootstraps QMD, runs the gate).
  `session-start.ts` flags this separately from the conversational markers
  below — if it hasn't run, offer to run it first rather than proceeding
  against a stale or unset index.

## Required Context

- Start with `harness/manual.md`.
- Read `harness/operator.md` and `harness/user.md` for current state, even
  though on a genuine first run both still carry the unconfigured marker
  described below.
- Use the `grilling` skill for the interview mechanic in Phases 1 and 2.

## Harness Notes

- This workflow is conversational and judgment-heavy by design; the
  mechanical precondition (`setup-vault.mjs`) is intentionally a separate
  script, not a phase of this workflow — see
  [[Harness Distribution Prep/Vault Onboarding Workflow Design]] for the
  reasoning.
- Detection is marker-based, not automatic execution: `session-start.ts` may
  suggest this workflow when `harness/user.md`, `harness/operator.md`, or
  `harness/north-star.md` still carry
  `<!-- unconfigured: run /vault-onboard -->`, but never runs it unprompted.

## Workflow

### Usage

```
/vault-onboard
```

No required arguments. Runs all three phases in order by default. If a
phase's target file no longer carries the unconfigured marker (already
completed in a prior run), skip that phase and say so rather than re-running
it unasked — this workflow is resumable across sessions, including partial
completion.

### Phase 1 — Get to know the user

Invoke the `grilling` skill: one question at a time, the user owns every
decision, look up anything discoverable instead of asking.

Cover, at minimum:

- Who the user is, their role, and standing constraints/ownership boundaries
  → `harness/user.md`
- Current goals and focus → `harness/north-star.md`
- Voice — how the user writes: tone, vocabulary, phrasing patterns, things to
  avoid → a new **Voice** section on the user's own `org/people/<Name>.md`
  note (create the note first from `templates/Person.md` if it doesn't exist
  yet; link it from `harness/user.md`)

Remove the unconfigured marker from `harness/user.md` and
`harness/north-star.md` once each file's real content is actually written —
not before.

### Phase 2 — Define the Operator

Ask what to call the agent/persona for this vault, and what communication
stance/preferences it should carry. Matches `harness/operator.md`'s existing
stated scope: persona, stance, routing behavior, and what should stay stable
across Claude/Codex/Gemini/Hermes.

Write the answer to `harness/operator.md` and remove its unconfigured marker.

### Phase 3 — Dependency check

Run `harness/dependencies.md`'s "Verifying a fresh machine" script. Report
status per tool.

For anything reported missing, offer to run its install command — **one at a
time, with explicit approval for each**. Never batch-install without asking,
mirroring `dependencies.md`'s own existing rule for Python ("do not install
it silently on the user's behalf").

This phase has no marker to clear — dependency state can change outside this
workflow at any time, so re-running it is always safe and never skipped by
default.

### Closure

Report which phases completed, which were skipped (already done, or
explicitly deferred), and what's still open. Update `harness/memory.md`'s
topic index if a new topic note was created (e.g. the user's
`org/people/<Name>.md`), per this vault's standing "Maintaining Indexes"
rule.

## Writes

- `harness/user.md`
- `harness/north-star.md`
- `harness/operator.md`
- `org/people/`
- `harness/memory.md` (index only, if a new topic note was created)

## Approval Gates

- Ask before destructive moves, deletes, archive operations, production
  mutations, publishing, sending messages, or changing external systems.
- Phase 3 local installs: run only with the user's explicit per-item
  approval; never batch-install without asking.

## Verification

- Verify changed Markdown renders as valid Obsidian-flavored Markdown.
- Verify wikilinks point to existing notes or intentionally create new note
  stubs (e.g. `harness/user.md` → the new `org/people/<Name>.md`).
- Verify frontmatter remains valid YAML where touched.
- Verify each completed phase's unconfigured marker was actually removed
  from its file — a phase reported "done" that leaves its marker in place is
  not actually closed.

## Return Format

Return a concise report with:

- **Done**: actions completed and files changed
- **Evidence**: commands, searches, or external sources checked
- **Open Items**: blockers, missing approvals, or ambiguous decisions
- **Next**: the smallest useful next action, when applicable

## Related Roles

- `operator`
