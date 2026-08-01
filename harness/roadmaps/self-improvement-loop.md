---
date: 2026-08-01
description: Part 1 (correction/evidence promotion mechanisms) is deferred. Part 2 (session diary substrate) shipped 2026-08-01 — see harness/session-diary/.
tags:
  - harness
  - roadmap
  - self-improvement
  - learning
status: partially-built
created: 2026-08-01
updated: 2026-08-01
---

# Self-Improvement Loop

Status: **Part 1 deferred, Part 2 built.** Part 1 (writing rules or skills
that promote corrections/evidence into durable changes) is still a proposal
only — nothing there is implemented, and the User wants to work in the vault
a while and understand the mechanism before any of it runs. Part 2 (the
session diary substrate) shipped 2026-08-01: see
[[harness/session-diary/README|Session Diary]].

## Origin

Written after a comparison against `gbrain`'s `/improve` skill-rewrite loop
(see the harness `key-decisions.md` 2026-08-01 entries for the gstack/gbrain
review). gbrain reads an outcome signal (NPS ratings), extracts a pattern,
and rewrites a shared skill file automatically and unattended.

The User's stance, stated directly:

- Not autonomous right now. Deliberately gated — current skills are
  untested, and rewriting or looping on untested skills would compound bad
  data rather than learn from good data. A baseline has to exist first.
- Wants the ability to **manually trigger** self-learning once the substrate
  exists — not full autonomy, a trigger.
- Two different learning modalities, not one:
  - **Correction-driven**: writing voice and design taste should improve
    from the User correcting drafts in conversation.
  - **Data-driven**: SEO should improve from accumulated evidence with less
    reliance on the User personally noticing and correcting something.
- Wants to understand how the mechanism works before handing control to an
  agent.

This document has two parts: the improvement mechanism itself (Part 1,
deferred), and a cross-session learning substrate the User raised
independently as a lower-risk starting point (Part 2, also deferred, but
recommended as the actual first slice if this is ever picked back up).

## Part 1: Correction-Capture And Evidence-Accumulation Mechanisms

### Evidence: what already exists on each side

**Voice/design (correction-driven).** The write-back seam already exists and
is empty. Every client Voice note
(`Clients/<Client>/<Client> Voice.md`, from `templates/Client Voice.md`) ends
with an **"Additional rules observed from site copy / client feedback"**
section — a bullet-list placeholder. Checked across all 7 client Voice notes
currently in the vault; none have anything written there yet.
`.agents/skills/copy-edit/SKILL.md`'s "Apply Voice" step already reads Voice
notes as authority ("Follow Brand and Voice notes when available") — the read
path is live, the write-back path does not exist. No equivalent capture step
exists for design taste today (canonical `design-taste-frontend` is a single
shared skill, not per-client, so a design-taste learning loop would need to
target either a new per-client design note or the shared skill directly — the
shared-skill target has materially higher blast radius, see below).

`.agents/skills/voice-interview/SKILL.md` was built 2026-08-01, separate from
this roadmap — it's the deliberate, human-confirmed mechanism for creating or
re-interviewing a Voice note (refusal-first interview, compiled into the
existing template, tested against a litmus draft, confirmed by the
interviewee or Bob before use). It does not touch the automatic
correction-capture loop below: it never reads a draft/correction diff and
never auto-proposes a rule from one. It's the answer to "how does a Voice
note get built well in the first place" — a gap this roadmap didn't cover,
since Part 1 only ever addressed promoting corrections into an *existing*
note. The "Additional rules observed" placeholder above is still empty and
still not written to automatically; `voice-interview`'s Phase 4 (Maintain)
is the manual trigger for noticing a correction pattern and re-running the
interview, not a capture step that fires on its own.

**SEO (data-driven).** `seo-drift-compare` and `seo-weekly-monitor` already
produce structured, evidence-labeled findings (source tier, confidence,
delta, limitation) either on a before/after or recurring basis. Both skills'
Boundaries explicitly stop short of promotion: "Route findings to Strategy,
Development, Writing, WordPress, or verifier." They detect and report; they
do not turn a recurring finding into a codified rule in `seo-schema`,
`seo-page-audit`, or any other skill. Data collection exists; the promotion
step does not.

Both sides have real upstream infrastructure. Neither closes the loop.

### Proposed mechanism shape (not built)

Two distinct loops, not one generic `/improve`:

```
Correction-capture (Voice.md, per-client design note)
  trigger: explicit request, e.g. "update voice from this session"
  signal: a diff between what was drafted and what the User corrected
  step: generalize the specific fix into a rule (not a log of the one
        instance) — "cut every exclamation point" becomes a Format & Style
        addition, not a note that line 4 changed
  gate: show the proposed addition before writing; User approves or declines
  blast radius: one client's Voice.md — low, cheap to revert

Evidence-accumulation (SEO)
  trigger: explicit request, on some cadence
  signal: accumulated seo-drift-compare / seo-weekly-monitor findings,
          not a single snapshot — look for a finding that recurs
  step: propose a codified rule for the relevant skill, with the evidence
        trail that produced it
  gate: show the proposed addition before writing; User approves or declines
  blast radius: a shared, cross-client skill — high, affects every future
                client the skill touches
```

The shared principle in both: **propose, never auto-write** — the same
pattern every existing `vault-*` workflow already follows ("fix what's
clear, flag what's ambiguous, ask before anything durable lands"), not
gbrain's unattended rewrite.

The blast-radius asymmetry matters for sequencing: correction-capture
against a single client's Voice.md is the lower-risk of the two and would
reasonably be trustworthy sooner than anything that rewrites a shared skill.
A shared-skill promotion mechanism should wait for the same trust-ledger
maturity bar `harness/roadmap.md`'s Runtime-Neutral Dispatcher section
already requires before any automated-write capability goes live.

### Explicitly not building

- No automatic capture step added to `copy-edit` or any Voice note — a draft
  correction still does not, by itself, generalize into a written rule.
- No promotion step added to `seo-drift-compare` or `seo-weekly-monitor`.
- No new skill for either *automatic* loop. (`voice-interview`, added
  2026-08-01, is the manual creation/refresh mechanism described above — it
  doesn't read correction diffs or auto-write, so it isn't the capture step
  this section rules out.)

## Part 2: Cross-Session Learning Substrate ("Session Diary")

**Built 2026-08-01.** Raised independently by the User as a lower-risk
starting point: before wiring any improvement mechanism, build the thing a
future periodic pattern-mining pass would actually read. Pure data
collection, no rewriting, no autonomy — closer to a `git log` than a
`gbrain` dream cycle.

Canonical spec now lives at
[[harness/session-diary/README|Session Diary]] — this section is kept as the
design rationale and evidence trail; the README is the source of truth for
the actual format if the two ever drift.

### Purpose

A brief, agent-facing record per session, scoped down from the original
sketch below to exactly two kinds of signal: corrections (something the User
changed or rejected, generalized into a rule) and standing preferences. Not
"what got done" — that's redundant with git log and the session's own
report. Not a decisions log — `harness/key-decisions.md` already owns
durable architecture decisions; duplicating them would just cost tokens.
Written only when there's real signal; a quiet session gets no file. Not for
humans to read sequentially — for a future weekly or monthly synthesis pass
to scan across many sessions looking for repeated correction patterns, which
is the actual raw material the Part 1 mechanisms would need to have anything
to propose from.

### Where it should live — recommendation

Not inside one giant append-only log file. This vault already has a strong,
explicit convention (`vault-audit` §11: "each note should cover ONE
concept") and every other timestamped record in this vault is one file per
event (`harness/resume/YYYY-MM-DD-<slug>.md`, `harness/audits/*-YYYY-MM-DD.md`).
A session diary should follow the same shape: one file per session under a
new `harness/session-diary/` directory, named
`YYYY-MM-DD-HHmm-<slug>.md`, written once at session end and never edited
after.

This gets QMD indexing, Bases filtering, and clean git diffs for free — no
new database, no new retrieval mechanism. It directly satisfies "without
complex loops and databases": the loop and the database are QMD and git,
which already exist.

**Do not confuse this with `harness/session-logs/`, which already exists.**
That folder is raw transcript backups written by runtime compaction hooks —
its own README says explicitly "recovery artifacts, not working notes. Do
not use this folder for drafts, planning, or durable project context." The
session diary proposed here is the opposite: curated, structured, written
once, and meant to be durable project context. The name was deliberately
changed from an earlier draft (`session-log`, singular) specifically to avoid
this collision. `harness/session-diary/` would also need the same
instance-only classification `session-logs/` already has in the active
Harness Distribution Prep repo-split effort — flagging that as a dependency,
not deciding it here.

### Trigger — decided

Resolved as: `vault-wrap-up` §8 calls it as the second-to-last step, before
the human-facing Report. This keeps it strictly manual for now — no session
gets a diary entry unless the User invokes wrap-up, consistent with "manual
for now." The kept-open half of the original question (should this
eventually hook a session-end point that fires regardless of whether
wrap-up was explicitly requested) is deliberately **not** resolved — that
would be a step toward always-on background collection, closer to gbrain's
model, and should be its own decision when it comes up, not a default this
change slid in on.

Diary-writing was kept as a separately specified step rather than folded
into wrap-up's review logic, per the original recommendation: the schema
lives in `harness/session-diary/README.md`, not restated in
`vault-wrap-up/workflow.md`, so the two can't drift against each other by a
prose edit in the wrong file.

### Schema

Simplified from the original sketch during implementation — dropped
`Operations` (redundant with git log), `Decisions` (redundant with
`key-decisions.md`), `Friction/Gaps` (redundant with wrap-up's existing
Suggested-Improvements step), and the `person`/`correction_count` frontmatter
fields (not worth the tokens until a synthesis pass actually needs them).
Down to exactly two sections: `Corrections`, `Preferences`. Canonical spec:
`harness/session-diary/README.md` — see there rather than duplicating it
here.

### How this feeds the Part 1 mechanisms, later

A future periodic workflow (most naturally an extension of `vault-weekly`'s
existing "Cross-Day Patterns" step, or a new `vault-learning-review`
workflow) would read N days or weeks of `harness/session-diary/` entries,
cluster the `Corrections` fields by client and discipline, and surface
recurring ones. That surfaced pattern becomes the input to Part 1's
correction-capture proposal step — the diary is the substrate, Part 1 is the
consumer. Nothing here auto-writes to Voice.md or any skill; the synthesis
pass would still stop at "propose," same as everything else in this vault.

### Still not building

- No periodic synthesis workflow yet — the diary exists, nothing reads it
  automatically. An agent can read recent entries directly on request.

## Recommended Sequencing

1. ~~**Session diary substrate** (Part 2)~~ — **done 2026-08-01.**
   `harness/session-diary/`, wired into `vault-wrap-up` §8. Cheapest,
   lowest-risk, pure data collection, no rewriting of anything.
2. **Periodic synthesis pass** reading the diary — still read-only, still
   proposes nothing durable on its own, just surfaces patterns for the User
   to look at.
3. **Correction-capture promotion for Voice.md** (Part 1, low blast
   radius) — once the synthesis pass has actually surfaced something real to
   promote.
4. **Evidence-accumulation promotion for SEO** (Part 1, higher blast
   radius, shared skills) — last, and only once 1-3 have been trusted for a
   while.

This is explicitly the opposite order from gbrain, which ships the
autonomous rewrite loop as the headline feature and treats data collection
as plumbing underneath it. Here the plumbing is the whole first phase.

## Related

- [[harness/roadmap|Roadmap]]
- [[key-decisions|Key Decisions]]
- [[harness/roadmaps/developer-role-expansion|Developer Role Expansion]] —
  same "propose, don't auto-write" pattern applied to skill-doc-refresh
- `.agents/skills/copy-edit/SKILL.md`
- `.agents/skills/seo-drift-compare/SKILL.md`, `seo-weekly-monitor/SKILL.md`
- `.agents/workflows/vault-wrap-up/workflow.md`, `vault-weekly/workflow.md`
- `templates/Client Voice.md`
