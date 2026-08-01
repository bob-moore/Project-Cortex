---
date: 2026-08-01
description: Durable architecture and operating decisions for this vault.
tags:
  - harness
  - key-decisions
---

# Key Decisions

Durable architecture and operating decisions for this vault.

## 2026-07-15

- Durable client identity lives in `Clients/`; bounded engagements live in `Projects/active/<Project Name>/`.
- Project folders are collapsible. The main project note repeats the project name (`<Project Name>/<Project Name>.md`) so Obsidian wikilinks stay unambiguous while specs, copy drafts, plans, and decisions live beside it.
- Client relationship archival and project archival are separate events.

## 2026-07-28

- `.agents/` is the canonical runtime machinery layer.
- `harness/` is the writable agent-operating knowledge layer.
- Runtime-specific folders are adapters, not sources of truth.

## 2026-07-29

- `Journal/` is canonical shared vault content for the User's daily personal notes. It is not agent-operating memory, but agents may review it when the User asks or when a task clearly needs recent personal context. See [[2026-07-29-journal-canonical-daily-notes|Journal Is Canonical Daily Note Space]].

## 2026-07-30

- Skill ownership follows capability ownership: runtime/system-operation skills may remain global; role- and domain-based skills (Design, Development, Writing, WordPress Operations, SEO, and similar) belong in this project's canonical `.agents/` layer.
- A general skill belongs in `.agents/` when project operations, portable workflows, or project-specific policy depend on it. Global copies are source material or runtime utilities, not competing canonical routes.

## 2026-08-01

- No new Design skills (including a `design-prototype` workflow) until a concrete, repeated need is identified. `claude-design` is rejected as future work, not merely deferred; see [[harness/audits/design-skill-import-plan|Design Skill Import Plan]] and [[harness/audits/role-skill-porting-buckets|Role And Skill Porting Buckets]].
- Frontend taste skills deduped: `design-taste-frontend` is the sole canonical taste skill. `design-taste-frontend-v1` and `gpt-taste` were retired (directories removed); their only non-overlapping content was folded into `design-taste-frontend`. `stitch-design-taste` stays separate — different consumer (Google Stitch `DESIGN.md` generation, not code output).
- Verified design-research/inspiration and reverse-engineering-from-reference capability is complete and wired: `design-research` skill + `workflow-design-research` + canonical `.agents/workflows/design-research/` route into `design-delivery`'s research mode; `design-reverse-engineering` covers template/pattern extraction from an existing site or reference screenshot.
- Verified OpenPencil (`@open-pencil/cli`/`@open-pencil/mcp`) is installed (see [[dependencies]]) but **not** wired into any canonical skill — `design-delivery`'s prototype mode and `references/exploration-and-prototyping.md` are tool-agnostic and never name it. Closed 2026-08-01: this is intentional, not a gap to close proactively. Do not wire OpenPencil into any skill unless Bob explicitly asks.
- Design bucket closed 2026-08-01. Next porting focus: Development.
- Development bucket: surveyed debugging, git workflow, and acceptance tests
  against `stash/development/superpowers` and
  `stash/development/development-skills`. Found `developer-delivery` already
  had inline debugging (4a) and Git-safety (4c) procedures from a prior pass —
  enriched 4a in place (pattern analysis, multi-component evidence-gathering)
  rather than adding a competing standalone debugging skill. Built two new
  active skills: `git-procedures` (worktree isolation + merge/rebase conflict
  mechanics, detailing what 4c summarizes) and `acceptance-test-builder`
  (regression-contract workflow, detailing what 4b summarizes). Also found and
  fixed a `development/skill-map.json` bug where `code-review` was listed in
  `active_canonical_skills`, `future_skill_candidates`, and `not_active`
  simultaneously — it was already active. Dependency maintenance and
  release/deployment boundaries remain open with thin-to-no source material;
  not queued until a concrete need is identified — same no-speculative-build
  stance as Design.
- Self-improvement loop: wrote a deferred proposal at
  `harness/roadmaps/self-improvement-loop.md` after comparing gbrain's
  autonomous `/improve` mechanism against this vault's needs. Two learning
  modalities, not one: correction-capture (Voice.md/design taste, low blast
  radius) and evidence-accumulation (SEO, higher blast radius — a shared
  skill). Both stay "propose, never auto-write." A cross-session diary
  substrate (`harness/session-diary/`, one file per session, no new DB — reuses
  QMD/git) is the recommended first slice if this is ever picked back up,
  since it's the raw material a future periodic synthesis pass would need.
  Promotion mechanisms (Part 1) explicitly deferred pending the same
  tested-baseline precondition as the Runtime-Neutral Dispatcher. Also marked
  the "Governed Design Prototyping Workflow" roadmap entry superseded, since
  it depended on the now-rejected `claude-design` and undefined OpenPencil
  conventions.
- Session diary (Part 2 of the above) built same day: `harness/session-diary/`,
  one file per session, written by `vault-wrap-up` §8 only when there's real
  correction/preference signal — no file on a quiet session. Two sections
  only (`Corrections`, `Preferences`); dropped `Operations`/`Decisions`/
  `Friction` from the original sketch as redundant with git log,
  `key-decisions.md`, and wrap-up's own Suggested-Improvements step. Audience
  is an agent reading on demand, not the User — optimized for token cost over
  readability. Trigger stays strictly manual (tied to `vault-wrap-up`
  invocation); whether to eventually hook a session-end point that fires
  regardless was deliberately left undecided, not defaulted into. Added to
  the Harness Distribution Prep project's instance-only (List C)
  classification, same category as the adjacent `session-logs/`. No periodic
  synthesis pass yet — nothing reads the diary automatically.
