# Patterns

Reusable operating patterns for agents working inside this vault.

## Current Patterns

- Keep `.agents/` for machine/runtime machinery.
- Keep `harness/` for writable agent-operating knowledge.
- Keep human- and agent-facing work outside `harness/`.

## Monday.com Scope

Monday.com reads default to the User's assigned work only, never the team's.
Expand that scope only when the User explicitly asks for broader team or board
coverage.

## Home Attention Surface

`Home.md` is the single entry surface for what the User should know, decide, review,
or pick up next. It should not become a permanent completed-task log.

Use `bases/Attention.base` to surface source notes with attention metadata.
The source note stays canonical; Home only embeds the filtered view.

Attention fields:

- `attention_status`: `needs-review`, `actionable`, `pending`, `blocked`,
  `waiting`, `reviewed`, `dismissed`, or `converted`.
- `attention_type`: short category such as `review`, `decision`, `task`,
  `follow-up`, `blocked`, or `handoff`.
- `attention_owner`: usually `User`, or the external owner when the User is waiting.
- `attention_date`: date the item started needing attention.
- `attention_priority`: `high`, `normal`, or `low`.
- `next_action`: one sentence describing the smallest useful next move.

Reconciliation rules:

- Do not check off a task merely because it was captured, moved, or summarized.
  Checked means resolved with evidence.
- Do not infer `status: completed` for work notes from an empty checklist. A
  project or work note becomes completed only from explicit user instruction or
  source-labeled completion evidence.
- Use `needs-review` for artifacts the User must inspect, such as saved audit
  evidence.
- Use `actionable` only when nothing else has to happen before the User or an agent
  can pick it up.
- Use `pending`, `blocked`, or `waiting` for items that must stay visible but
  are not pickup-able now.
- When the User reviews an item, change `attention_status` to `reviewed`,
  `dismissed`, or `converted`. Converted means the item became a real project,
  client, issue, or external-system task and is tracked there.
- Weekly standup or wrap-up should clear stale Home attention items by updating
  source metadata, not by accumulating completed bullets on Home.

## Home Todo Surface

`Home.md#Todo` uses Obsidian Tasks queries for checkbox-level work. Source
checkboxes remain in the project, client, evidence, or harness note where the
work belongs.

Todo classification:

- `#actionable`: pickup-able now; no external decision, asset, access, or
  approval is required first, and the task is concrete enough to execute.
- `#intake`: source-gathering, comment refresh, or task-splitting work that must
  happen before implementation can be dispatched.
- `#review`: an artifact or decision needs the User's review before it becomes work
  or is dismissed.
- `#triage`: an item is known but not yet classified into implementation,
  intake, review, pending, waiting, blocked, or done.
- `#pending`: tracked, but not pickup-able now.
- `#stuck`: blocked long enough that it needs periodic attention.
- `#waiting`: waiting on a named person, client, credential, answer, or external
  system.
- `#blocked`: cannot proceed until a blocker is removed.

Home query rules:

- `Actionable / Time-Sensitive` shows tasks tagged `#actionable` or tasks with
  Tasks-plugin due/scheduled dates before tomorrow, bounded to live operating
  folders (`Projects/active`, `Clients`, `reviews`, and `harness`) and excluding
  archive paths. It excludes `#intake`, `#review`, and `#triage` so vague
  Monday refresh work does not mix with concrete implementation/follow-up work.
- `Intake / Review` shows tasks tagged `#intake`, `#review`, or `#triage`. Use
  this for Monday items whose comments, docs, or meeting notes must be pulled
  and split before anyone can execute the real work.
- `Pending / Can't Do` shows blocked or waiting tasks.
- `Needs Triage` is intentionally capped. It exposes unclassified open project
  checkboxes so standup can classify, close, or leave them in the source note
  without dumping every project plan onto Home forever.
- Monday-sourced tasks should preserve the plain-language source date and add
  Tasks emoji date metadata such as `📅 2026-07-29` when a real due date exists,
  so Tasks can sort and filter them.
- Do not tag a vague Monday item `#actionable` merely because the User is assigned.
  If the next step is "pull comments/docs and split this," tag it `#intake`;
  when that intake is complete, check off the intake task and create or tag the
  concrete remaining tasks as `#actionable`, `#pending`, `#waiting`, or
  `#blocked`.
- Completed tasks should not be listed on Home by default. If a short review
  window is useful later, use a capped `done in this week` query and remove it
  during wrap-up.
