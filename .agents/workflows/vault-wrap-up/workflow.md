# Vault Wrap Up

## Purpose

Run an end-of-session vault review: modified files, note quality, indexes, memory updates, and workflow improvements.

## Invocation

- Canonical workflow: `vault-wrap-up`
- Runtime adapters may expose this as `/vault-wrap-up`, `vault-wrap-up`, or another runtime-native trigger. The behavior belongs here.

## Required Context

- Start with `harness/manual.md`.
- Use `harness/operator.md` for the active runtime persona.
- Use `harness/user.md` for Bob/user context when user preferences, scope, or voice matter.
- Use QMD or local search before broad file reads when looking for prior vault context.

## Harness Notes

- Record durable operating discoveries in `harness/memory.md`, `harness/patterns.md`, `harness/gotchas.md`, or `harness/key-decisions.md` as appropriate.
- Do not assume a remote exists or push changes unless the user explicitly asks.

## Workflow

### Wrap Up

Full session review before ending. Review context, ways of working, files modified, consistency, and suggest improvements.

### Usage

```
/vault-wrap-up
```

Triggered when the user says "wrap up", "let's wrap", "wrapping up", or similar. The active runtime should invoke this automatically.

### Role

- **`review-evidence`** — run only when review evidence is explicitly in scope

### Workflow

#### 1. Review What Was Done

Scan the conversation for:
- Notes created or modified (list them all with paths)
- People notes created or updated
- Indexes updated
- Brag doc entries added
- Harness notes updated (Patterns, Gotchas, Key Decisions, Memories)

#### 2. Verify Note Quality

For each note created or modified this session:
- Frontmatter complete? (`date`, `quarter`, `description`, `tags`, type-specific fields)
- At least one wikilink to another note?
- In the correct folder? (`Projects/active/<Project>/` vs
  `Projects/archive/YYYY/<Project>/` vs `Notes/incidents/` etc.)
- Description accurate and ~150 chars?
- Status field correct?

#### 3. Check Index Consistency

- `Projects/Index.md` — are new notes linked? Are completed projects in the right section?
- `harness/memory.md` — does Recent Context reflect what happened this session?
- `org/People & Context.md` — any new people or relationship changes to capture?
- `reviews/Index.md` — any wins or achievements from this session?
- `Home.md` — are embedded Bases still valid?

#### 4. Check for Orphans

- Any new notes not linked from at least one other note?
- Any new people not added to People & Context?
- Any thinking notes that should be promoted or deleted?

#### 5. Archive Check

- Are there project folders in `Projects/active/` that should be moved to `Projects/archive/YYYY/`?
- Any status fields still `active` that should be `completed`?

#### 6. Ways of Working Review

Check if this session revealed:
- A new pattern that should be in `harness/patterns.md`?
- A new gotcha that should be in `harness/gotchas.md`?
- A workflow improvement for `harness/skills.md`?
- A harness/manual.md update needed (new convention, stale reference)?
- A new or improved workflow command?
- A hook that should be added or modified?

#### 7. Suggest Improvements

Based on how the session went:
- Were there friction points in the workflow?
- Did we do something manually that could be automated?
- Did we repeat a pattern that should be a skill?
- Are there Bases that should be created or updated?
- Any frontmatter properties that would help future queries?

#### 8. Report

Present a concise summary:
- **Done**: what was captured this session
- **Fixed**: issues found and resolved
- **Flagged**: things that need user input
- **Suggested**: improvements for next time

### Important

- This is a READ + VERIFY pass, not a creation pass. Fix small issues (broken links, missing frontmatter), but flag larger changes for user approval.
- Be honest about what's missing — the goal is leaving the vault in a better state than you found it.
- If North Star goals shifted during the session, suggest updating it.

## Writes

- `Home.md`
- `harness/` notes
- `Projects/` notes and indexes
- `org/` notes and indexes
- `reviews/` evidence notes
- `Notes/` work notes
- `bases/` views

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

- `review-evidence`
