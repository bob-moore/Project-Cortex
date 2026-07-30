# Vault Stash Session

## Purpose

Create a compact resume note for continuing paused or interrupted vault work in
a later runtime session.

This workflow is shorthand for: "capture the current state and the next resume
context in durable harness memory."

## Invocation

- Canonical workflow: `vault-stash-session`
- Runtime adapters may expose this as `/vault-stash-session`,
  `vault-stash-session`, "stash session", "save resume context", or another
  runtime-native trigger. The behavior belongs here.

## Required Context

- Start with `harness/manual.md`.
- Use `harness/operator.md` for the active runtime persona.
- Use `harness/user.md` for User context when user preferences, scope, or
  voice matter.
- Check `git status --short` before writing the note so dirty/untracked files
  are not accidentally hidden.
- Check relevant `harness/audits/`, `harness/roadmaps/`, `harness/goals/`, or
  project notes when the resume topic is known.

## Workflow

### 1. Determine Resume Scope

Infer the scope from the user's prompt, current conversation, current changed
files, and active project notes. If scope is still ambiguous, write the note as
a session-level handoff and label uncertain items.

### 2. Inspect Current State

Collect concise state:

- `git status --short`
- current objective or user request
- files created or changed this session
- relevant durable notes that must be read first next time
- decisions made
- recommendations that were accepted or rejected
- validation commands run and results
- blockers, risks, or unverified assumptions

Do not include secrets, credentials, tokens, private keys, cookies, raw
application passwords, or full third-party data dumps.

### 3. Create Resume Note

Create a Markdown note under:

```text
harness/resume/YYYY-MM-DD-<short-topic>.md
```

Use lowercase kebab-case for the topic. If no topic is obvious, use
`session-stash`.

Required shape:

```markdown
---
description: "Resume note for <topic>."
tags:
  - harness
  - resume
status: active
created: YYYY-MM-DD
---

# <Topic> Resume

## Resume Prompt

Start with:

```text
Resume <topic>. Read this note first: harness/resume/<file>.md
```

## Objective

...

## Current State

...

## Changed Files

...

## Decisions

...

## Must Read First

...

## Validation

...

## Blockers And Risks

...

## Next Action

...
```

### 4. Update Memory Index

Ensure `harness/memory.md` points to resume notes. If there is a current resume
note worth highlighting, add or update a compact "Latest Resume Notes" section
with a wikilink to the note.

### 5. Verify

Verify:

- the resume note exists
- required sections are present
- `harness/memory.md` links to resume notes
- frontmatter remains valid YAML where touched

## Writes

- `harness/resume/`
- `harness/memory.md`

## Approval Gates

- This workflow may perform scoped vault writes without additional approval.
- Ask before destructive moves, deletes, archive operations, production
  mutations, publishing, sending messages, or changing external systems.
- Do not write secrets or credential values into resume notes or memory.

## Verification

- Verify changed Markdown/frontmatter where files were edited.
- Verify the resume note includes all required sections.
- Verify `harness/memory.md` links to resume notes.

## Return Format

Return a concise report with:

- **Done**: resume note and memory index updates
- **Evidence**: files written and validation checks
- **Open Items**: blockers, missing context, or intentionally omitted details
- **Next**: the exact prompt or first action for a future session

## Related Roles

- `operator`
- `vault-librarian`
