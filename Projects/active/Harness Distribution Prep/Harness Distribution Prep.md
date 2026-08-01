---
date: 2026-07-31
description: "Prep the vault/harness for distribution: separate framework wiring from client/instance content, fix hardcoded paths, document dependencies. Repo-split mechanics still open."
project: Harness Distribution Prep
status: active
quarter: Q3-2026
tags:
  - work-note
  - project/harness-distribution-prep
---

# Harness Distribution Prep

## Context

Once the core disciplines/skills/workflows are largely built out, this vault needs to become distributable: to the team (their own instances, wiring in place but no client/project/decision data filled in) and to additional personal vaults with an almost-identical-but-not-exact structure (e.g. side work). Kicked off with a read-only structural audit (2026-07-31) covering `.agents/`, `harness/`, runtime adapters, and root config against that goal. See [[Agent OS R&D]] for the broader harness/methodology R&D this sits alongside — that note is the running architecture log; this one is scoped narrowly to the distribution mechanism itself.

Original plan was branch-and-clear-and-copy-paste into a new repo. Considered a two-repo split (a new `agency-vault-framework` repo + this instance) linked with `git subtree` instead, reasoning that it avoids manually re-porting framework improvements to every vault forever and doesn't clobber local customization on pull.

**Correction (2026-08-01):** no new repo gets created. This repo *is* the eventual template — it keeps the name **Project Cortex**. Bob's actual day-to-day working copy (the one that keeps accumulating real client/project data) will be renamed off to something else, at a point Bob chooses, not now. Whether the ongoing relationship between "Project Cortex" and the renamed working copy still uses `git subtree` (vs. a one-time fork that's then allowed to diverge freely) is **not decided** — revisit when Bob is ready to actually execute Phase 3. Nothing below happens until Bob says so.

## What / Why

- **Why now**: this repo only has 5 commits of history. A retroactive framework/instance split gets harder the longer history grows and the more times something sensitive touches a framework-path file's diff history.
- **Why subtree over submodule**: no detached-HEAD/`init`/`update` friction for teammates who aren't deep git users; `git subtree pull` merges rather than overwrites, which matters because vaults are expected to diverge ("almost identical structure, but not exactly").
- **Why subtree over plain copy-paste**: copy-paste has no path back — framework improvements made while doing real client work in this vault would need manual re-porting to every other vault, forever.

## Audit Findings (2026-07-31, informing this plan)

Full findings delivered in conversation, not saved as a separate file. Headline items, in the order this project will work through them:

1. **No separation exists today** — `.gitignore` doesn't exclude `Clients/`, `Prospects/`, `Projects/`, `org/`, `reviews/`, `Journal/`, or `inbox/`; the whole client book and personal review material is tracked in the same repo as the harness wiring. *(Addressed by the repo split below.)*
2. **Hardcoded personal absolute paths in 10 wiring files** — `/Users/bobmoore/...` in 7 `.agents/disciplines/*/contract.json`+`skill-map.json` provenance fields (confirmed not read at runtime — cosmetic but leaks username), plus `FALLBACK_GRAPHIFY` in `graphify-hook-check.ts`/`graphify-hook-guard-gemini.ts` (live logic, but degrades gracefully via PATH fallback). One real client name used as a naming-convention example in `harness/manual.md:79`.
3. **`.obsidian/` has a compiled plugin with native binaries checked into git** — `lean-terminal/node_modules/node-pty/**` and `ghostterm/bin/ghostterm-pty`. Architecture-specific, shouldn't be tracked regardless of distribution.
4. **`harness/` mixes durable methodology with this-instance operational history** — `ledgers/`, `resume/`, `audits/`, `goals/`, `roadmaps/` reference real client/project names and aren't gitignored (only `session-logs/*` bodies are).
5. **`graphify-out/` (13MB, git-tracked)** is fully derived/regenerable output — stale the moment it's distributed.
6. **`reference/` is mostly generic but not entirely** — `Google Drive Client Folders.md` reads as personal/account-specific, needs a content pass.
7. **Undocumented second dependency layer** — `harness/manual.md` references a global `~/.agents/skills/` some dev skills may live in; not in `harness/dependencies.md` or `.agents/manifest.yaml` at all.
8. **`vault-manifest.json` has unusual permissions** (`-rw-------`, owner-only vs. everything else) — sanity-check, probably not intentional.
9. **`harness/dependencies.md` is missing load-bearing dependencies**: `@tobilu/qmd` (npm), `graphify` (external binary, undocumented origin), Obsidian CLI (community plugin, not npm), WP-CLI (`wp`), Composio CLI.

## Boundary Decision

**List A — subtree-synced** (self-contained directories, no instance content mixed in, change often enough to warrant automated sync):
`.agents/`, `.claude/`, `.codex/`, `.gemini/`, `.hermes/`, `templates/`, `bases/`

**List B — seed content** (copied once at vault creation, re-synced manually — root-level single files or things living inside `harness/`, which also holds pure instance data, so no clean directory-level subtree boundary exists without a path restructure that's deliberately out of scope for this pass):
`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `README.md`, `ARCHITECTURE.md`, `.mcp.json`, `.gitignore` (as starting template), `harness/manual.md`, `harness/policies/*`, `harness/runbooks/README.md` (skeleton only), `harness/dependencies.md`, blank versions of `harness/{operator,user,north-star,memory,key-decisions,patterns,gotchas}.md`, `vault-manifest.json` (as template)

**List C — instance-only, never leaves this repo:**
`Clients/`, `Prospects/`, `Projects/`, `org/`, `reviews/`, `Journal/`, `inbox/`, `reference/`, `harness/{ledgers,resume,audits,goals,roadmaps,session-logs,session-diary}/`, `graphify-out/`, `.obsidian/`, `stash/`, `tmp/`, `assets/`

**Resolved (2026-07-31/08-01):**
- `harness/goals/*.md` reclassified from "ships empty" to **List B, ships as-is** — Bob's rule: "if it's methodology it stays, the methodology sorta IS the product." All 9 files verified content-clean (no client/project references), same category as `policies/`. `harness/roadmaps/` (subfolder) and `harness/roadmap.md` (root file) keep the original "ships empty" treatment — genuinely instance-specific in-flight planning, not methodology.
- `harness/manual.md`'s "Website Development Skills" paragraph — checked: it's a general statement ("skills may live globally at `~/.agents/skills/`"), names no specific skill. Left as-is, no edit needed.
- **Extended beyond the original List A/B/C split**: the *specific* global-skill references living in `.agents/disciplines/*/contract.json` (`source_material_roots`) and `development/skill-map.json` + `wordpress-operations/skill-map.json` (`source`/`sources` provenance fields) — 24 distinct `~/.agents/skills/<name>` and `~/.codex/skills/<name>` paths, plus 5 `~/Obsidian/Work/.claude/skills/<name>` paths in `seo/contract.json`, plus one in `development/platforms.md` — all **removed outright**, not just anonymized to `~`. Bob's call: "the reference to external skills should be removed... when we ship, it will be completely self contained. If the user adds global skills they like to use, we will not block them. That's implementation." Local `stash/*` provenance (already-imported material staged inside this repo) was kept — only genuinely external, machine-specific paths were stripped. Verified: `grep` for remaining `~/.agents`, `~/.codex`, `~/Obsidian` references outside `manual.md` came back empty; all 7 touched JSON files re-parse; `node .agents/scripts/gate.mjs` → full PASS.

**2026-08-01**: `harness/session-diary/` added to List C. New folder, shipped
same day as part of the self-improvement-loop proposal
(`harness/roadmaps/self-improvement-loop.md`) — per-session correction/
preference notes written by `vault-wrap-up`, same instance-only category as
the adjacent `session-logs/` (real client/project references, not
methodology).

Open tradeoff, not yet decided: List B won't auto-sync. Making `harness/manual.md`/`policies/` sync automatically too would mean restructuring to `harness/framework/` vs `harness/` — bigger change, dozens of path references — tracked as an optional future phase, not part of this project unless explicitly pulled in.

## Migration Plan

### Phase 0 — Preconditions
**Deferred — Bob will initiate Phase 3+ later. Nothing in this section is scheduled; do not act on it without an explicit go-ahead.**
- [ ]
  - `git status` clean; stash or commit anything in flight
  - Tag current state before any surgery
  - Confirm `git subtree` is available (`git subtree --version`), if subtree is still the chosen mechanism at execution time
  - Decide the working copy's new name
  - Decide whether the ongoing sync mechanism is still `git subtree`, or a one-time split that's then allowed to diverge — open per the 2026-08-01 correction above

### Phase 1 — Boundary lock
- [x] ~~Confirm/adjust the List A / B / C split above with Bob before Phase 2 starts~~ — confirmed and refined through 2026-08-01 discussion: `harness/goals/` moved List C → List B (methodology, not instance history); `harness/roadmap.md` (root file, previously unlisted) added alongside `harness/roadmaps/` in the "ships empty" bucket; global `~/.agents/skills/` dependency dropped from scope entirely rather than documented.

### Phase 2 — Pre-split cleanup in ProjectCortex (do this first, independent of the rest — valuable regardless of when the repo split happens)
- [x] ~~Strip `/Users/bobmoore/...` from `source_material_roots` / `source` provenance fields in the 8 wiring files~~ — verified 2026-07-31: replaced with `~`-relative paths. **Superseded 2026-08-01**: those references were removed outright instead (see below), not just anonymized.
- [x] ~~Remove hardcoded `FALLBACK_GRAPHIFY` path from `graphify-hook-check.ts` / `graphify-hook-guard-gemini.ts`; gate behind an env var with PATH fallback only~~ — verified 2026-07-31: replaced with `GRAPHIFY_BIN` env override falling through to `command -v graphify`. Confirmed via `node --experimental-strip-types --check` on both files and two live runs (unset, and set to a nonexistent path) both exiting 0 cleanly.
- [x] ~~Fix `harness/manual.md:79` — real client name → `<Client>` placeholder~~ — verified 2026-08-01: `Clients/Brunsell Lumber/Brunsell Lumber Brand.md` → `Clients/<Client>/<Client> Brand.md`. Also added missing YAML frontmatter to `manual.md` itself (`date`, `description`, `tags: [harness, manual]`) per the PostToolUse hygiene hook — the file had none before this edit.
- [x] ~~Add missing entries to `harness/dependencies.md` (`@tobilu/qmd`, `graphify`, Obsidian CLI, WP-CLI, Composio)~~ — verified 2026-07-31: added a new "Non-npm CLI tools" table plus a `@tobilu/qmd` row in the npm table, all grounded in real `which`/`--version` checks on this machine (qmd 2.5.3, graphify 0.9.8 via `uv tool install graphifyy`, WP-CLI 2.12.0, Composio 0.2.32 — install method unconfirmed, flagged as an open item). Updated the verification script to match. Composio's per-teammate-requirement question stays open, linked back to this project.
- [x] ~~Remove external global-skill references entirely (`source_material_roots`, `source`/`sources` provenance fields, `platforms.md`'s Source bullet)~~ — verified 2026-08-01: 24 `~/.agents/skills/*` + `~/.codex/skills/*` paths and 5 `~/Obsidian/Work/.claude/skills/*` paths removed across 5 `contract.json`, 2 `skill-map.json`, and `platforms.md`. Local `stash/*` provenance kept. Confirmed via grep (zero remaining outside `manual.md`'s general statement, which stays per Bob's call), JSON re-parse on all 7 files, and full `node .agents/scripts/gate.mjs` → all 8 checks PASS.
- [x] ~~`.gitignore`: add `graphify-out/`; decide `.obsidian/plugins/` policy~~ — resolved wider than scoped: whole `.obsidian/` gitignored (not just `plugins/`), per Bob's call that it's entirely local. `graphify-out/` intentionally **not** added — Bob's call: gitignored for the template, left to each user's own discretion for their own instance.
- [x] ~~`git rm -r --cached` the already-tracked `.obsidian/plugins/lean-terminal/node_modules/` and `ghostterm/bin/ghostterm-pty`~~ — superseded by the broader `git rm -r --cached .obsidian` (75 files untracked, none deleted from disk).
- [x] ~~Sanity-check `vault-manifest.json` permissions~~ — verified 2026-07-31: was `-rw-------`, `chmod 644` → `-rw-r--r--`, matching every other tracked file.
- [x] ~~Content pass on `reference/Google Drive Client Folders.md` — generic or instance-only?~~ — moot: Bob's call on finding #6 was `reference/` ships entirely blank for distribution regardless of any individual file's content, so no per-file classification needed.
- [x] ~~Decide the global `~/.agents/skills/` dependency layer question — document it or fold it in~~ — resolved: dropped from scope entirely (see Phase 1 and the external-reference-removal item above), not documented as an assumed dependency.

### Phase 3 — Split identity: Project Cortex (template) vs. renamed working copy
**Deferred — outline only, kept for when Bob is ready. Mechanics below assume the old two-repo/subtree shape and need re-checking against the 2026-08-01 correction before executing anything.**
- [ ] Decide the working copy's new name and where it lives (still this same git history, or a fresh clone at the point of the rename?)
- [ ] Strip List C content (and empty the List-B-but-ships-empty items per the Boundary Decision) from what will become the `Project Cortex` template identity
- [ ] Manual grep pass before treating it as distributable — confirm zero client names, zero `/Users/bobmoore`, zero real ledger/resume/audit content
- [ ] Decide, at execution time, whether ongoing sync back into the renamed working copy uses `git subtree` (original reasoning in Context still holds if teammates/side-vaults need pull-without-clobber) or a one-time split that's allowed to diverge

### Phase 4 onward — not re-planned yet
Original Phases 4–8 (retrofit onto a subtree, new-vault bootstrap, ongoing sync workflow, verification, team distribution) assumed a *separate* `agency-vault-framework` repo. That premise is gone. Re-plan this section once Phase 3's actual mechanics are decided, rather than patching phase-by-phase around a structure that no longer applies. Substance likely still needed regardless of mechanism: a documented bootstrap path for new vaults (side-work, teammates), a decision on pull/push cadence if subtree is kept, and a post-split verification pass (`node .agents/scripts/gate.mjs`, hooks firing, QMD MCP resolving).

## New Scope — Vault Onboarding Workflow (2026-08-01)

Full design in [[Vault Onboarding Workflow Design]]. Summary: a fresh vault (this one included) currently ships with no first-run mechanism — `harness/user.md`, `operator.md`, and `north-star.md` sit as unfilled placeholders indefinitely. Two new pieces, deliberately separate:

- **`.agents/scripts/setup-vault.mjs`** — mechanical precondition: sets `vault-manifest.json.qmd_index` from a shipped sentinel to the current directory's basename, bootstraps QMD, runs the gate.
- **`.agents/workflows/vault-onboard/`** — conversational, three phases via the existing `grilling` skill: (1) interview the user → `harness/user.md`, `harness/north-star.md`, and a new Voice section on their `org/people/<Name>.md` note; (2) define the Operator's name/stance → `harness/operator.md`; (3) run the dependency check from `harness/dependencies.md`, offering per-item approved installs for anything missing.

Detection is marker-based (a sentinel in `vault-manifest.json`, an HTML-comment marker in the three harness files) and suggest-only — `session-start.ts` never auto-runs onboarding. Not yet implemented; design approved 2026-08-01, awaiting spec review before an implementation pass.

- [x] ~~Bob reviews [[Vault Onboarding Workflow Design]]~~ — approved 2026-08-01
- [x] ~~Implementation pass: `setup-vault.mjs`, `vault-onboard` workflow + contract + generated adapters, `templates/Person.md` Voice section, markers on the three harness files, `session-start.ts` detection, manifest/index registration~~ — verified 2026-08-01: all pieces built per the spec. `node .agents/scripts/setup-vault.mjs` ran end-to-end successfully (qmd_index already set so that step correctly no-opped; QMD bootstrap and gate both ran clean). `node .agents/scripts/gate.mjs` → full PASS (all 8 checks) after adapters were generated via the standard `.agents/adapters/{claude,codex}/generate-*.mjs` scripts. `session-start.ts`'s new detection verified live — correctly shows a `### Setup` section flagging all three harness files as unconfigured (accurate: this vault's own onboarding hasn't been run yet). Startup context budget confirmed still well within limits (5275/8000 chars). Two harness docs (`workflows.md`, `skills.md`) needed frontmatter/wikilink fixes to pass the PostToolUse hygiene hook — fixed inline. **Side effect worth flagging**: the adapter generators regenerate *all* workflow adapters, not just new ones — this run also materialized a backlog of previously-missing adapters for several already-existing SEO workflows (unrelated to this project, not reviewed/touched beyond letting the generator run).

## Related

- [[Agent OS R&D]] — broader harness/methodology R&D this distribution effort sits alongside
- [[Vault Onboarding Workflow Design]]
- [[harness/manual]]
- [[harness/dependencies]]
