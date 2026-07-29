# Vault Intake

## Purpose

Process all unread items in inbox/ — reads each file, classifies content (meeting notes/transcripts and anything else dropped there), routes to the right vault notes, then clears the inbox.

## Invocation

- Canonical workflow: `vault-intake`
- Runtime adapters may expose this as `/vault-intake`, `vault-intake`, or another runtime-native trigger. The behavior belongs here.

## Required Context

- Start with `harness/manual.md`.
- Use `harness/operator.md` for the active runtime persona.
- Use `harness/user.md` for Bob/user context when user preferences, scope, or voice matter.
- Use QMD or local search before broad file reads when looking for prior vault context.

## Workflow

### Inbox Intake

Scans `inbox/` for unprocessed items and routes everything to the correct vault locations automatically. No arguments needed — just drop files and run.

### Usage

```
/vault-intake
```

Drop anything into `inbox/` first — meeting exports, transcripts, or any other document that needs sorting. Run this command after. Naming convention: `YYYY-MM-DD <Topic or Person>.md`.

### Workflow

#### 1. Scan the Inbox

List all `.md` files in `inbox/` excluding `README.md`. If the folder is empty, say so and stop.

For each file found, read the full content before doing anything else.

#### 2. Identify Content Type

Not everything dropped in `inbox/` is a meeting — the folder is a general catch-all (reports, exports, anything). Most items will self-identify quickly (filename or content explicitly says "meeting transcript," "meeting note," "call notes," has an attendee list, etc.) — treat those as meeting content and classify further below. For anything else, classify by what it actually is and route accordingly (see the routing table) rather than forcing it into a meeting type.

For meeting-type content, determine what kind of meeting it was:

- **1:1** — between two people; personal, career, feedback, or relationship content
- **Project meeting** — status update, check-in, or planning session tied to a specific project
- **Team meeting** — standup, sprint planning, retrospective, or all-hands
- **Decision meeting** — primary purpose was to reach a decision
- **Mixed** — multiple types in one note (process each piece separately)

Use the note's content, title, and any attendee list to make this call. **If a file's nature genuinely isn't clear — not a meeting, not obviously any of the routing categories below — ask the user what it is rather than guessing.**

#### 3. Search for Related Vault Context

Before routing, run `qmd query "<meeting topic or person name>"` to find existing notes the content should attach to. Prefer appending to existing notes over creating new ones for small updates.

#### 4. Route Content

Apply these routing rules to each piece of content:

| Content Type | Destination |
|---|---|
| 1:1 with a specific person | Create `Notes/1-1/<Person> YYYY-MM-DD.md` using 1:1 note structure |
| Project status update | Append to relevant `Projects/active/<Project>/<Project>.md` |
| New project or initiative not in vault | Create `Projects/active/<Project>/<Project>.md` |
| Decision reached | Create Decision Record in `Projects/` + add to Decisions Log in `Projects/Index.md` |
| Action item / open task | Append as `- [ ]` to the relevant work note |
| Win or recognition | Add to `reviews/Index.md` with link to source note |
| New person mentioned not in vault | Create stub in `org/people/<Name>.md` |
| Blocker identified | Append to relevant project note under `## Blockers` or `## Open / Next Steps` |
| Question raised but unanswered | Append to relevant note under `## Open Questions` |

For 1:1 notes, use this structure:

```markdown
---
date: YYYY-MM-DD
description: "1:1 with <Person> — <one-line summary>"
person: <Person Name>
tags:
  - work-note
  - 1-1
---

### 1:1 with <Person> — YYYY-MM-DD

### Key Takeaways

### Action Items

- [ ] 

### Quotes / Direct Feedback

### What to Watch

### Related

- [[<Person>]]
```

#### 5. Cross-Link

After routing all content:

- Every new note must link to at least one existing note
- Every existing note updated must have its Related section checked — add any new links that are now relevant
- If a person was mentioned, link to their `org/people/` note from the work note and vice versa

#### 6. Clear the Inbox

After processing each file, confirm what was routed and ask:

> "Done processing `<filename>`. Delete from inbox?"

If yes, delete the file. If no, leave it and move on.

After all files are processed, present a summary:

#### Summary Format

```
### Intake Complete

Processed: <N> file(s)

#### Routed
- <filename> → <list of notes created or updated>
- ...

#### New Notes Created
- <path>
- ...

#### Action Items Captured
- [ ] <item> → <note>
- ...

#### Decisions Logged
- <decision> → <note>
- ...

#### Wins Added to Reviews
- <win>
- ...

#### Items That Needed a Judgment Call
(anything you weren't sure how to classify — ask the user)
```

### Important

- **Never delete a file without confirmation** — always ask first
- If a note is ambiguous (can't tell who the meeting was with, or what project it belongs to), ask before routing
- Prefer appending to existing notes over creating new ones for small updates
- If the file has no date in its name, use today's date
- This command handles structured exports — for freeform brainstorming or ad hoc capture, use `/vault-dump`

## Writes

- `Projects/` notes and indexes
- `org/` notes and indexes
- `reviews/` evidence notes
- `Notes/` work notes
- `inbox/` staging notes

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

- `operator`
