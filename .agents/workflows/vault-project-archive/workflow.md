# Vault Project Archive

## Purpose

Archive a completed project or ended client relationship while preserving indexes, status, and retrieval paths.

## Invocation

- Canonical workflow: `vault-project-archive`
- Runtime adapters may expose this as `/vault-project-archive`, `vault-project-archive`, or another runtime-native trigger. The behavior belongs here.

## Required Context

- Start with `harness/manual.md`.
- Use `harness/operator.md` for the active runtime persona.
- Use `harness/user.md` for User context when user preferences, scope, or voice matter.
- Use QMD or local search before broad file reads when looking for prior vault context.

## Harness Notes

- Use `harness/manual.md` as the canonical source for client and project structure.

## Workflow

### Project Archive

Move a completed project, or a client whose relationship has genuinely ended, to the appropriate archive and update all indexes. These are two different operations — see [Client Structure](../../harness/manual.md#client-structure) for the distinction: a project completing (a build launches) does **not** mean the client relationship ends.

### Usage

```
/vault-project-archive <project or client name>
```

### Workflow

#### 1. Find the Note or Folder, and Determine Which Kind of Archive This Is

Search both `Projects/active/` and `Clients/` for the name.

- **A bounded project** (`Projects/active/<Project Name>/<Project Name>.md`, or a non-client internal project folder): this is the common case — a build launched, an enhancement shipped. Only the project folder archives. **Do not touch `Clients/<Client>/`** — the client relationship continues (often shifting to hosting/maintenance).
- **A client relationship ending** (rare — the account is genuinely lost or closed): the whole `Clients/<Client>/` folder archives. Confirm explicitly with the user before doing this — it's a much bigger, less common action than archiving a project, and easy to do by mistake if a build launch gets described as "the client is done."

If ambiguous which one the user means, ask rather than guess.

#### 2. Update Frontmatter

On the main note being archived (`<Project Name>.md` or `<Client>.md`):
- Set `status: completed` (bounded project) or `status: archived` (client relationship ended)
- Verify `quarter` property is set correctly
- Verify `description` reflects the final state
- For a completed project, update the linked `Clients/<Client>/<Client>.md` note's "Active Project" section to reflect the new ongoing relationship (e.g. "hosting & maintenance") instead of just deleting the reference

#### 3. Move the File(s)

Bounded project note:

```bash
git mv "Projects/active/<Project Name>/" "Projects/archive/YYYY/<Project Name>/"
```

Non-client internal project (single work note):

```bash
git mv "Projects/active/<Project Name>/" "Projects/archive/YYYY/<Project Name>/"
```

Client relationship ending (moves `<Client>.md`, `<Client> Brand.md`, `<Client> Voice.md`, `<Client> Stack.md`, and anything else in the folder together — archive any of that client's still-open `Projects/active/` project notes at the same time):

```bash
git mv "Clients/<Client>/" "Clients/archive/YYYY/<Client>/"
```

Use the year the project/engagement ended (from the note's `date` field, or ask if unclear).

#### 4. Update Indexes

- **`Projects/Index.md`**: move a completed project from Active Projects to the appropriate Completed/Archive section
- **`Clients/Index.md`**: move an ended client relationship from Active Clients to Archive (bounded projects completing does NOT touch this index)
- **`harness/north-star.md`**: mark as completed in Current Focus if listed there
- **`reviews/Index.md`**: verify the project is captured in the relevant quarter's highlights
- **`harness/memory.md`**: update Recent Context if the project is mentioned as "in progress"
- **`bases/Clients.base`**: no manual edit needed — it filters by `status`, so updating frontmatter is sufficient

#### 5. Verify

- Run a quick check that no wikilinks are broken (Obsidian resolves by name, so moves shouldn't break links)
- Confirm the Work Dashboard Base (or Clients Base, for a client relationship ending) shows the note in "Completed"/non-active view, not "Active Work"/"Active Clients"
- For a completed project: confirm `Clients/<Client>/` still exists and wasn't accidentally moved

### Important

- Always use `git mv` — never copy+delete
- Don't archive without user confirmation
- **Never archive `Clients/<Client>/` just because a project completed** — that's the single most likely mistake this command can make. A launched website almost always means the client continues as a hosting/maintenance retainer, not that the relationship ended.
- Move the whole project folder together so specs, copy, implementation plans,
  and decisions stay with the project

## Writes

- `harness/` notes
- `Projects/` notes and indexes
- `Clients/` notes
- `reviews/` evidence notes
- `bases/` views

## Approval Gates

- Do not archive or move project files unless the user has approved the specific project and target archive location.
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
