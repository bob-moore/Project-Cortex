# Vault Slack Scan

## Purpose

Deep scan Slack channels, DMs, and threads for a person or project and turn the evidence into vault-ready context.

## Invocation

- Canonical workflow: `vault-slack-scan`
- Runtime adapters may expose this as `/vault-slack-scan`, `vault-slack-scan`, or another runtime-native trigger. The behavior belongs here.

## Required Context

- Start with `harness/manual.md`.
- Use `harness/operator.md` for the active runtime persona.
- Use `harness/user.md` for Bob/user context when user preferences, scope, or voice matter.
- Use QMD or local search before broad file reads when looking for prior vault context.

## Workflow

### Slack Deep Scan

Deep scan Slack channels and DMs for evidence involving a specific person or project. Extracts every touchpoint with timestamps for review evidence or project documentation.

### Usage

```
/vault-slack-scan <target> [channels...] [date-range]
```

Examples:
- `/vault-slack-scan "Jane Doe" C0EXAMPLE1 C0EXAMPLE2 "after:2026-03-16"`
- `/vault-slack-scan "project:example" C0EXAMPLE1 C0EXAMPLE2 C0EXAMPLE3 C0EXAMPLE4`

### Workflow

1. **Read each channel** fully (paginate with cursor until all messages are fetched):
   ```
   mcp slack_read_channel channel_id=<id> limit=100
   ```

2. **Search for the person** across public+private channels:
   ```
   mcp slack_search_public_and_private query="from:<@USER_ID> after:<date>"
   mcp slack_search_public_and_private query="<Name> after:<date> -from:<@USER_ID>"
   ```

3. **Check DMs** the user points to. Read full history for the relevant period.

4. **For each message involving the target**, extract:
   - Timestamp and channel
   - What was said/done
   - Context (what prompted it, what followed)
   - Whether it's evidence of: technical work, leadership, collaboration, problem-solving, initiative

5. **Organize by date** with clear headers per day. Separate:
   - **Project evidence** → goes to the relevant work note
   - **Review/personal context** → goes to people notes or review prep notes
   - **Team dynamics** → goes to people notes

6. **Flag items that need correction** in existing vault notes.

### Important

- Be meticulous — timestamps matter for evidence
- Capture exact quotes when they show initiative, leadership, or problem-solving
- Note when the person was tagged by others (shows they're a go-to person)
- Separate project work from review prep from personal conversations
- Don't mix contexts — put data where it belongs in the vault
- Check for threads (slack_read_thread) when a message has replies
- Look for screen recordings, files shared, PRs linked

## Writes

- Only the files explicitly named by the workflow or approved by the user.

## Approval Gates

- Do not post to Slack; this workflow reads and drafts only unless the user explicitly approves sending.
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
