# Vault Capture 1-on-1

## Purpose

Turn a 1:1 transcript, notes, or summary into a structured vault note with takeaways, quotes, action items, and related context.

## Invocation

- Canonical workflow: `vault-capture-1on1`
- Runtime adapters may expose this as `/vault-capture-1on1`, `vault-capture-1on1`, or another runtime-native trigger. The behavior belongs here.

## Required Context

- Start with `harness/manual.md`.
- Use `harness/operator.md` for the active runtime persona.
- Use `harness/user.md` for User context when user preferences, scope, or voice matter.
- Use QMD or local search before broad file reads when looking for prior vault context.

## Workflow

### Capture 1:1 Meeting

Take a meeting transcript, notes, or Gemini summary and create a structured vault note with key takeaways, quotes, action items, and DM context.

### Usage

```
/vault-capture-1on1 <participant>
```

User will paste the transcript/notes. Example: `/vault-capture-1on1 <name>`

### Workflow

1. **Parse the input** — handle Gemini transcripts, raw notes, or meeting summaries.

2. **Create work note** at `Notes/1-1/<Participant> <YYYY-MM-DD>.md` with:

   ```yaml
   ---
   date: "<meeting date>"
   description: "<one-line summary of key topics discussed>"
   tags:
     - work-note
   status: completed
   ---
   ```

3. **Structure the note** with these sections:
   - **Key Takeaways** — bullet points of the most important things discussed, grouped by topic
   - **Decisions Made** — anything agreed upon
   - **Action Items** — with checkboxes, who owns each
   - **Quotes Worth Noting** — direct quotes that reveal priorities, feedback, or dynamics (use blockquotes)
   - **What Went Well** — what landed, what resonated
   - **What to Watch** — things to monitor, concerns, ambiguous signals
   - **Context From DMs** — check relevant DMs before/after the meeting for color (ask user for channel IDs if needed)
   - **Related** — wikilinks to relevant notes

4. **Update related notes**:
   - Person's people note (add 1:1 section or update existing)
   - `Notes/Index.md` (list under the 1:1 notes bullet)
   - `harness/memory.md` if any context changed (manager dynamics, priorities, etc.)
   - `org/people/` note for the participant

5. **Check for stale context** — if the meeting reveals something that contradicts existing vault notes, flag and update.

### Important

- Preserve the conversational tone — don't over-formalize quotes
- Flag sensitive interpersonal items — note if they should stay private
- Separate what was SAID from what it MEANS (interpretation goes in "What to Watch")
- Cross-reference with DMs from the same day for fuller picture

## Writes

- `harness/` notes
- `org/` notes and indexes
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
