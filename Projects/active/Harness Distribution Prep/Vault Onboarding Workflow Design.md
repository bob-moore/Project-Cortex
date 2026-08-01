---
date: 2026-08-01
description: "Design spec for vault-onboard (conversational first-run workflow) and setup-vault.mjs (mechanical precondition) — closes the distribution gap where a fresh vault ships unconfigured."
project: Harness Distribution Prep
status: active
implementation_status: built
quarter: Q3-2026
tags:
  - work-note
  - project/harness-distribution-prep
---

# Vault Onboarding Workflow Design

Companion spec to [[Harness Distribution Prep]], covering one addition surfaced during that project: a distributable vault (or a fresh clone of this one) currently ships with no mechanism to get itself configured. `harness/user.md`, `harness/operator.md`, and `harness/north-star.md` are placeholder text with nothing that notices or closes that gap — confirmed true of *this* live vault too, not just a hypothetical template concern.

Reached through a one-question-at-a-time design conversation (2026-08-01), not a from-scratch brainstorm — decisions below are Bob's, with rationale where given.

## Context

Two components, sequenced, deliberately not merged into one:

1. **`.agents/scripts/setup-vault.mjs`** — mechanical, deterministic, no judgment calls.
2. **`.agents/workflows/vault-onboard/`** — conversational, judgment-heavy, runs after the mechanical step.

Rationale for splitting them: this vault's existing convention already separates deterministic mechanism (`.agents/scripts/*.mjs`) from judgment-routing workflows (`.agents/workflows/`) — mixing "rename the QMD index" into the same flow as "interview the user about their voice" would blur a distinction the rest of the harness already relies on.

## Component 1 — `setup-vault.mjs`

Scope, kept deliberately narrow (YAGNI):

1. Read `vault-manifest.json.qmd_index`. If it's the shipped sentinel `"__UNSET__"`, replace it with the current working directory's basename (sanitized to a safe slug — lowercase, spaces/special chars → `-`).
2. Run `scripts/qmd-bootstrap.ts` to register and build the (empty) index under that name.
3. Run `node .agents/scripts/gate.mjs` as a final sanity check; surface any failure rather than silently continuing.

Explicitly out of scope: regenerating runtime adapters (`.claude/`, `.codex/`, `.gemini/` ship pre-generated in the template; nothing about a fresh clone requires rebuilding them) and anything conversational.

**Bob's call on the index name**: no prompt needed — directory basename is fine, "mostly for internal use, the user doesn't care that much."

## Component 2 — `vault-onboard` workflow

### Detection (no auto-run)

Bob's call: hook detects and *suggests*, never executes automatically.

Plain-text markers, no hidden state file — matches how this vault already represents state:

- `vault-manifest.json.qmd_index` still `"__UNSET__"` → `session-start.ts` mentions `setup-vault.mjs` hasn't run yet.
- `harness/user.md`, `harness/operator.md`, `harness/north-star.md` each ship (and, for this live vault, now carry retroactively) an HTML-comment marker directly after frontmatter: `<!-- unconfigured: run /vault-onboard -->`. `vault-onboard` strips the marker from each file once that file's real content is written. `session-start.ts` checks for the marker's presence across all three and suggests `/vault-onboard` if any remain.

Because the markers are being added to *this* vault's actual files (not just a future template copy), `session-start.ts` will correctly start flagging that Bob himself hasn't run onboarding yet — confirmed as intended, not a bug, since those files are genuinely still placeholder here.

### Phase 1 — User grill

Mechanism: invoke the existing `grilling`/`grill-me` skill (already in this vault — one question at a time, user owns every decision, look up anything discoverable instead of asking). Nothing new to build for the interview mechanic itself.

Writes:
- `harness/user.md` — communication preferences, standing workflow preferences, durable constraints, ownership boundaries (matches the file's existing stated scope).
- `harness/north-star.md` — current focus/goals.
- **`org/people/<Name>.md`** — new **Voice** section (create the person note if it doesn't exist yet; link from `harness/user.md`, matching its existing "links to fuller Obsidian-facing user or profile notes" bullet).

**Bob's correction from my initial recommendation**: voice was originally proposed as a new dedicated `harness/user-voice.md` (parallel to `<Client> Voice.md`). Bob's call instead: attach it to the person note in `org/people/`, because voice-for-drafting-as-this-person isn't unique to the primary User — a client can have an org-level Brand/Voice *and* individual client-side writers with their own personal styles. So Voice belongs on the person note generically, not on a User-specific file.

### Phase 2 — Operator identity

Ask: what to call the agent, what stance/communication preferences it should carry. Write to `harness/operator.md` (already scoped for exactly this — "the agent name or persona for the current runtime," "the stance the agent should take").

### Phase 3 — Dependency check

Run (or point to and execute) `harness/dependencies.md`'s "Verifying a fresh machine" script. Report status per tool. For anything missing, offer to run its install command — **with explicit per-item approval, never a batch install without asking**, consistent with `dependencies.md`'s own existing rule for Python ("do not install it silently on the user's behalf").

### Closure

Once all three phases complete: strip the "unconfigured" marker from whichever of the three files were actually filled (a phase that's skipped or deferred keeps its marker — partial onboarding stays honestly flagged as partial). Update `harness/memory.md`'s topic index if new topic notes were created, per this vault's standing "Maintaining Indexes" rule.

## Template Change

`templates/Person.md` gets a new **optional** Voice section — blank/omitted by default, filled in when relevant. Not User-exclusive; applies to any person note where voice matters (the primary User, or an individual client-side writer with their own style distinct from the client's organizational Brand/Voice).

## File Manifest

**New:**
- `.agents/scripts/setup-vault.mjs`
- `.agents/workflows/vault-onboard/workflow.md`
- `.agents/workflows/vault-onboard/contract.json`
- Generated thin adapters: `.claude/commands/vault-onboard.md`, Codex workflow-skill adapter (`.agents/skills/workflow-vault-onboard/SKILL.md`) — via the existing `.agents/adapters/{claude,codex}/generate-*.mjs` generators, not hand-written

**Changed:**
- `templates/Person.md` — add optional Voice section
- `harness/user.md`, `harness/operator.md`, `harness/north-star.md` — add the unconfigured marker (this repo's own copies, not just a future template's)
- `.agents/hooks/scripts/session-start.ts` — add the two detection checks (sentinel + markers), suggest-only
- `vault-manifest.json` — `qmd_index` becomes the sentinel `"__UNSET__"` *in the template*; **this live vault's own `vault-manifest.json` keeps its real, already-working `qmd_index` value (`agency-vault-harness`) untouched** — the sentinel convention applies to what ships, not to overwriting a working live index
- `.agents/manifest.yaml` — register `vault-onboard` under `workflows:` (new category, or folded into `operations:` — implementation detail, not a design decision)
- `harness/workflows.md`, `harness/skills.md` — index registration per this vault's "Maintaining Indexes" rule

## Approval / Risk

`vault-onboard` writes to `harness/`, `org/people/`, and (Phase 3, per-item, explicit approval only) runs local install commands on the machine. No client/production/external-service mutation — closer in shape to `vault-audit`'s risk tier (`vault_write`) than to `vault-kickoff`'s (`external_mutation`/`production`), plus an explicit local-install approval gate that doesn't map cleanly onto the existing Composio-flavored `external_mutation` vocabulary (that term is about calendar/email/Drive/etc., not local package installs) — worth a short explicit note in the contract rather than overloading an existing approval class.

## Open Implementation Details (not design decisions — my call while building, flagging so nothing's silently invented)

- Exact `.agents/manifest.yaml` category placement for the new workflow (`operations:` vs. a new category).
- Exact wording of the approval-gate clause for local installs in `contract.json`, since it doesn't map onto an existing named approval class cleanly.
- Whether `setup-vault.mjs`'s slug sanitization needs anything beyond lowercase + non-alphanumeric → `-` (no known edge case yet, will confirm against `qmd-bootstrap.ts`'s actual accepted format while implementing).

## Related

- [[Harness Distribution Prep]] — parent project this spec belongs to
- [[harness/manual]]
- [[harness/dependencies]]
