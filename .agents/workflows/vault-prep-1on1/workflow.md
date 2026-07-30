# Vault Prep 1-on-1

## Purpose

Prep for an upcoming 1:1 — load person context, surface open items, suggest agenda based on vault state.

## Invocation

- Canonical workflow: `vault-prep-1on1`
- Runtime adapters may expose this as `/vault-prep-1on1`, `vault-prep-1on1`, or another runtime-native trigger. The behavior belongs here.

## Required Context

- Start with `harness/manual.md`.
- Use `harness/operator.md` for the active runtime persona.
- Use `harness/user.md` for User context when user preferences, scope, or voice matter.
- Use QMD or local search before broad file reads when looking for prior vault context.

## Workflow

### Prep for 1:1

Prepare for an upcoming 1:1 by gathering everything relevant about the person and current work context.

### Usage

```
/vault-prep-1on1 <person>
```

Example: `/vault-prep-1on1 Scott Detweiler`

### Workflow

1. **Load person context** — read `org/people/$ARGUMENTS.md` for role, relationship, key moments, and any standing dynamics

2. **Load recent 1:1 history** — check `Notes/1-1/` for prior notes with this person; surface:
   - Unresolved action items from last meeting
   - Topics that recurred across sessions
   - Anything flagged in "What to Watch"

3. **Load active work** — read `Projects/Index.md` and relevant `Projects/active/<Project>/*.md` notes; identify:
   - Projects this person is connected to (via wikilinks or shared team)
   - Blockers or open questions that need a decision or support
   - Work in progress worth giving visibility to

4. **Check North Star alignment** — read `harness/north-star.md`; flag:
   - Goals drifting or with no active work
   - Emerging focus that hasn't been written down yet

5. **Surface relevant work to share** — check recent project notes and `reviews/` only when review/career evidence is in scope

6. **Check open tasks** — run `obsidian tasks daily todo`; flag any stalled or overdue items

7. **Present the prep brief**:

   - **Who** — one-line reminder: role, relationship, standing dynamics
   - **Since Last Time** — unresolved action items, open "What to Watch" signals
   - **Wins to Share** — completed work and milestones worth mentioning, with enough context to explain impact
   - **Things to Raise** — blockers needing a decision, projects needing visibility, North Star drift
   - **Questions to Ask** — based on vault gaps or unclear priorities
   - **Suggested Agenda** — rough order if there are 3+ items: wins → updates → asks → questions

### Important

- This is prep, not a script — surface the relevant context, let the user decide what to raise
- If no prior 1:1 notes exist for this person, lean harder on active work and North Star for agenda material
- Keep the output scannable — the user is about to walk into a meeting, not read an essay
- Flag sensitive interpersonal items but don't lead with them

### After the Meeting

Run `/vault-capture-1on1 $ARGUMENTS` to file the notes into `Notes/1-1/` and update the person note.

## Writes

- `harness/` notes
- `Projects/` notes and indexes
- `org/` notes and indexes
- `reviews/` evidence notes
- `Notes/` work notes

## Approval Gates

- Do not create calendar events or send meeting notes externally unless explicitly approved.
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

- `operator`
