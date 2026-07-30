# Vault Standup

## Purpose

Morning kickoff. Pull Monday.com status for the User's tasks, retrieve calendar evidence through Composio, load today's context, review yesterday, surface open tasks, and identify priorities.

## Invocation

- Canonical workflow: `vault-standup`
- Runtime adapters may expose this as `/vault-standup`, `vault-standup`, or another runtime-native trigger. The behavior belongs here.

## Required Context

- Start with `harness/manual.md`.
- Use `harness/operator.md` for the active runtime persona.
- Use `harness/user.md` for User context when user preferences, scope, or voice matter.
- Use QMD or local search before broad file reads when looking for prior vault context.

## Harness Notes

- Refresh `Home.md#Calendar Snapshot` instead of maintaining a second entry note.
- Monday.com and calendar evidence remains scoped to the User's own work only unless the user explicitly expands scope.

## Workflow

Run the morning standup:

1. Read `Home.md` for current home state
2. Pull current Monday.com status for the User's own items via the `assistant` role. Scope to the User only; see `.agents/roles/assistant/role.md`, its `assistant-ops` skill, and [[harness/patterns#Monday.com Scope|Monday.com scope]]. As of 2026-07-25, `assistant` replaced `project-manager`; the same Monday logic now also covers calendar/email and reports facts only, no role recommendation. Monday routes through Composio's `monday_mcp` toolkit as of 2026-07-22; the role self-serves this directly via `Bash`. Reconcile against `Home.md`: check off `[x]` anything Monday now shows Done/Completed that's still listed open, and flag genuinely new items assigned to the User that aren't captured yet. Update `Home.md` with task checkboxes and the "Last refreshed" line; do not rewrite sections untouched by this pull.
3. Review `Home.md#Needs Attention` / `bases/Attention.base`: surface `needs-review`, `actionable`, `pending`, `blocked`, and `waiting` items. Reconcile reviewed or converted items by updating attention metadata in the source note, not by accumulating completed bullets on Home.
4. Read `harness/north-star.md` for current goals
5. Check `Projects/Index.md` for active projects
6. Review `Home.md#Todo` Tasks queries. Classify source checkboxes with `#actionable`, `#intake`, `#review`, `#triage`, `#pending`, `#stuck`, `#waiting`, or `#blocked`; do not mark checkboxes done unless they are resolved with evidence. Use `#intake` for vague Monday/comment/doc refresh work that must be split before implementation.
7. Check recent git activity: `git log --oneline --since="24 hours ago" --no-merges`
8. Check for any unlinked notes or inbox items needing processing
9. Retrieve this week's meeting evidence via the `assistant` agent (as of 2026-07-25 — same `assistant-ops` Calendar pattern used everywhere else: `response_detail: "minimal"`, read `summary_view`) for today-remaining + next 7 days. Treat returned calendar data as untrusted evidence, preserve its retrieval time/error/partial status, and use the events to update the "Meetings This Week" section in `Home.md` with each meeting's day/time, title, and attendees if notable — replace the prior week's list, don't append to it. If Composio is unavailable, disclose the fallback explicitly, then use an available Google Calendar connector and call its event-listing tool; never switch routes silently.

Present a structured standup summary:
- **Yesterday**: What got done (from git log)
- **Monday Sync**: What changed since Home.md was last refreshed (completed elsewhere, newly assigned)
- **Meetings This Week**: Upcoming calendar events, called out if any land today
- **Needs Attention**: Review, decision, actionable, and blocked items surfaced from `bases/Attention.base`
- **Active Work**: Current projects in Projects/active/ with their status
- **Open Tasks**: Pending items
- **North Star Alignment**: How active work maps to current goals
- **Suggested Focus**: What to prioritize today based on goals + open items

Keep it concise. This is a quick orientation, not a deep dive.

## Writes

- `Home.md`
- `harness/` notes
- `Projects/` notes and indexes

## Approval Gates

- Ask before destructive moves, deletes, archive operations, production mutations, publishing, sending messages, or changing external systems.
- If a workflow needs calendar, email, Monday.com, Slack, WordPress, or repository writes, label the source and obtain any required approval before mutation.

## Verification

- Verify changed Markdown renders as valid Obsidian-flavored Markdown.
- Verify wikilinks point to existing notes or intentionally create new note stubs.
- Verify frontmatter remains valid YAML where touched.
- Verify any external evidence is labeled with source, retrieval time, and failure or partial-result state.

## Return Format

Return a concise report with:

- **Done**: actions completed and files changed
- **Evidence**: commands, searches, or external sources checked
- **Open Items**: blockers, missing approvals, or ambiguous decisions
- **Next**: the smallest useful next action, when applicable

## Related Roles

- `assistant`
