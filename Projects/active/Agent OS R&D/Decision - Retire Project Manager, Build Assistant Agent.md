---
date: 2026-07-25
description: "Retired the project-manager role concept and replaced it with assistant: a broader menial-task layer with approval-gated external mutation capability."
status: accepted
confidence: high
revisit_date: 2026-09-01
tags:
  - decision
quarter: Q3-2026
---

# Decision: Retire `project-manager`, build `assistant`

## Context

While working through the role coverage audit (see [[Agent OS R&D#Department coverage audit (2026-07-25)]]), Bob questioned whether `project-manager` was serving any real purpose distinct from the active runtime just doing the work inline, and pointed out it was not actually project management. Reading the role confirmed it: it was a read-only reporting layer that never created, edited, or moved Monday.com items, and never invoked other roles. It pulled Monday.com, cross-referenced vault client notes, and recommended a role per task: workload triage and intake routing, not project management. Nothing in that role tracked a plan, updated Monday status, or managed scope/dependencies/timeline.

## Alternatives Considered

1. **Fold the logic into the active runtime directly, no separate role.** Rejected at the time: a reusable skill could hold the Monday-board-map/Composio-quirk knowledge, but could not pin a model independent of the parent session in the original runtime. `project-manager` had pinned a lower-cost model for mechanical reporting work. Losing that ceiling was a real cost, not a nicety.
2. **Keep `project-manager` as-is, just accept the misleading name.** Rejected: the name actively misrepresents what the agent does, and the vault already has precedent for retiring agents that don't earn their keep (`frontend-developer`/`backend-developer`, same session). Leaving it would mean the next person (or session) re-derives the same "wait, is this really PM?" confusion Bob just had.
3. **Rename only, keep scope identical (Monday + vault workload).** Rejected by Bob during discussion — once reframed honestly, he wanted the broader "personal menial-task layer" scope (calendar, email, calendar-event creation), not just a rename of the same narrow function.
4. **Fold the floated "pacing/effort-estimate assistant" idea (from [[Life Context]]/[[North Star]]) into this same agent**, since both use the word "assistant." Rejected by Bob explicitly: that idea is a genuine planning/prioritization/decision-making function; the agent built here is deliberately a non-decision-maker. Keeping them conflated would have made the new agent's boundary incoherent from day one.

## Decision

Retired `project-manager.md` entirely. Built:
- `assistant-ops` knowledge surface: Monday board map + filter quirks, Google Calendar/Gmail Composio patterns, and explicit read-vs-mutate approval discipline.
- `assistant` role: read-only for Monday/calendar/email by default, with approval-gated external mutation for creating/changing a calendar event. Confirmation is per event, never standing authorization.
- Direct assistant dispatch entry point.
- Role-recommendation logic moved into kickoff/routing, since recommending a role is a decision and `assistant` should not decide.
- Standup and kickoff can use assistant for mechanical calendar/Monday/email context without duplicating integration notes.

## Prediction

By 2026-09-01: (1) assistant gets used directly at least a few times for calendar/email/Monday questions outside the standup/kickoff flows it was built for, validating the direct-dispatch entry point. (2) No calendar-event-creation mistake occurs; the per-event confirmation gate holds up under real use. (3) The distinction between `assistant` (no decisions) and a future project-manager role (real planning) stays intact.

## What Would Change My Mind

- If assistant never gets used directly and only ever fires internally via standup/kickoff, the standalone entry point is unnecessary ceremony.
- If a calendar-event mutation goes wrong despite the confirmation gate, the gate itself needs to be stricter (e.g. require the user to paste back the exact ISO datetime, not just an English confirmation).
- If real project-management need shows up before a dedicated role is built (e.g. Bob starts wanting dependency tracking or Monday status updates), that's the trigger to actually design the future project-manager role, not to expand `assistant`.

## Revisit

Set for 2026-09-01, or immediately if either "What Would Change My Mind" condition fires first. Log actual usage (was `/assistant` used directly?) and whether the assistant/project-manager boundary held.

## Related

- [[Agent OS R&D#`project-manager` retired, replaced by `assistant` (2026-07-25)]] — full build narrative
- [[harness/user|User]] — Bob's working context
- [[harness/north-star|North Star]] — the separate, not-yet-built future project-manager role
- [[harness/key-decisions|Key Decisions]]
