# Vault Dump

## Purpose

Freeform capture mode. Dump anything — conversations, decisions, incidents, wins, thoughts — and I'll route it all to the right notes with proper templates, frontmatter, and wikilinks.

## Invocation

- Canonical workflow: `vault-dump`
- Runtime adapters may expose this as `/vault-dump`, `vault-dump`, or another runtime-native trigger. The behavior belongs here.

## Required Context

- Start with `harness/manual.md`.
- Use `harness/operator.md` for the active runtime persona.
- Use `harness/user.md` for User context when user preferences, scope, or voice matter.
- Use QMD or local search before broad file reads when looking for prior vault context.

## Workflow

Process the following freeform dump. For each distinct piece of information:

1. **Classify** it: decision, incident, 1-on-1 content, win/achievement, architecture, project update, person context, or general work note.
2. **Search first**: Use `qmd vsearch` (or `obsidian search` if QMD unavailable) to check if a related note already exists. Prefer appending to existing notes over creating new ones for small updates.
3. **Create or update** the appropriate note following harness/manual.md conventions:
   - Correct folder placement (Projects/active/, Notes/incidents/, Notes/1-1/, org/people/, etc.)
   - Full YAML frontmatter with date, description, tags, and type-specific fields
   - All relevant [[wikilinks]] to people, projects, teams, competencies
4. **Update indexes** as needed (Projects/Index.md, reviews/Index.md, org/People & Context.md)
5. **Cross-link**: Ensure every new note links to at least one existing note and is linked FROM at least one existing note.

After processing everything, provide a summary:
- What was captured and where each piece was filed
- Any new notes created (with paths)
- Any existing notes updated
- Any items you weren't sure how to classify (ask the user)

Content to process:
$ARGUMENTS

## Writes

- `harness/` notes
- `Projects/` notes and indexes
- `org/` notes and indexes
- `reviews/` evidence notes
- `Notes/` work notes

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
