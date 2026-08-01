# Vault Audit

## Purpose

Deep structural audit of the vault: indexes, folder placement, frontmatter, links, Bases, and consistency.

## Invocation

- Canonical workflow: `vault-audit`
- Runtime adapters may expose this as `/vault-audit`, `vault-audit`, or another runtime-native trigger. The behavior belongs here.

## Required Context

- Start with `harness/manual.md`.
- Use `harness/operator.md` for the active runtime persona.
- Use `harness/user.md` for User context when user preferences, scope, or voice matter.
- Use QMD or local search before broad file reads when looking for prior vault context.

## Harness Notes

- Include `harness/` and `.agents/` in the structure audit.
- Validate the lowercase kebab-case convention for harness-owned files while preserving reserved runtime filenames.

## Workflow

### Vault Audit

Deep structural audit of the vault. Checks indexes, folder placement, frontmatter, links, Bases, and consistency. Fix what can be fixed, flag what needs user input.

**When to use**: After substantial sessions, after reorganization, or periodically to maintain vault health. For lighter end-of-session checks, use `/vault-wrap-up` instead.

### Usage

```
/vault-audit
```

### Roles

This command orchestrates two roles for deep analysis:
- **`vault-librarian`** — orphan detection, broken links, frontmatter validation, stale notes, index consistency
- **`cross-linker`** — finds missing wikilinks, orphan notes, broken backlinks

Launch `vault-librarian` first for the structural audit, then `cross-linker` for link quality.

### Workflow

#### 1. Check Folder Structure

Verify the vault matches the expected layout:
- `Home.md` exists at vault root
- `bases/` contains all `.base` files (none scattered elsewhere)
- `Projects/active/` contains project folders, each with a same-named main note
  where practical
- Notes under `Projects/active/` use `status: active`
- `Projects/archive/YYYY/` contains completed project folders with
  `status: completed` notes
- `Notes/incidents/` contains only notes tagged `incident`
- `Notes/1-1/` contains only 1:1 meeting notes
- `inbox/` is a staging area, not storage — flag (don't auto-delete) anything sitting there for more than a few days unprocessed
- `org/people/` contains only notes tagged `person`
- `org/teams/` contains only notes tagged `team`
- `templates/` contains only template files (with `{{placeholders}}`)
- Nothing unexpected at vault root (allowed: `Home.md`, `harness/manual.md`, `vault-manifest.json`, `CHANGELOG.md`, `CONTRIBUTING.md`, `README.md`, `LICENSE`, `.gitignore` — no user notes)

#### 2. Check Indexes

Read and verify each index file:
- `Home.md` — do embedded Base views reference existing Bases? Are quick links valid?
- `Projects/Index.md` — are active projects still active? Are completed items in the right section? Any missing notes?
- `harness/memory.md` — is the "Recent Context" section current? Any stale claims?
- `org/People & Context.md` — are roles, peer selections, and project assignments current?
- `reviews/Index.md` — do PR counts and project descriptions match reality?
- `harness/skills.md` — are all workflow commands registered? Workflows still valid?
- `Home.md#Review Queue` — does each direct generated-artifact link resolve, and are resolved items removed from the queue?

#### 2a. Check Reviewable Generated Artifacts

- Scan generated Markdown under `reviews/evidence/` and other approved review-output paths.
- Artifacts requiring User inspection should carry `attention_status: needs-review`, `attention_type: review`, and a `next_action`.
- Each open generated artifact should be linked from `Home.md#Review Queue`.
- Do not auto-remove links based on age alone; only remove them after the source status is `reviewed`, `dismissed`, or `converted`.

#### 3. Check Frontmatter Completeness

For each note type, verify required properties:

**Work notes** (`Projects/active/<Project>/`, `Projects/archive/YYYY/<Project>/`):
- Required: `date`, `quarter`, `description`, `status`, `tags: [work-note]`
- Optional: `project`, `team`

**Incident notes** (`Notes/incidents/`):
- Required: `date`, `quarter`, `description`, `tags: [work-note, incident]`
- Required for main incident notes: `ticket`, `severity`, `role`, `status`

**Person notes** (`org/people/`):
- Required: `date`, `title`, `description`, `tags: [person]`
- Optional but recommended: `team`

**Team notes** (`org/teams/`):
- Required: `date`, `description`, `tags: [team]`

**Harness notes** (`harness/`):
- Required: `description`, `tags: [harness]`

**1:1 notes** (`Notes/1-1/`):
- Required: `date`, `quarter`, `description`, `tags: [work-note]`

#### 4. Check for Duplicate Tags

Scan all notes for duplicate entries in the `tags` array (e.g., `tags: [person, person]`). This is a known issue — fix any found.

#### 5. Check Status/Folder Alignment

- Notes under `Projects/active/` must have `status: active`
- Notes under `Projects/archive/` must have `status: completed`
- No `status: active` notes in archive, no `status: completed` notes in active

#### 6. Check Bases

For each `.base` file in `bases/`:
- Do filters still match the expected notes?
- Are templates excluded? (filters should include `!file.inFolder("templates")` where relevant)
- Do referenced properties exist in the target notes?
- Do formula references exist?

#### 7. Check for Orphans

- Are there project folders or project notes under `Projects/active/` or
  `Projects/archive/` not linked from `Projects/Index.md`?
- Are there incident notes not linked from `Notes/Index.md`?
- Are there people notes not linked from `org/People & Context.md`?
- Are there notes without any inbound links at all? (Use `obsidian orphans` if available, or grep for `[[NoteName]]` references)

#### 8. Check Links

- Scan for wikilinks that reference notes that don't exist (broken links)
- Check that bidirectional links exist where expected (work note ↔ person, work note ↔ competency)
- Verify `## Related` sections aren't empty on work notes

#### 9. Check for Stale Context

- Read `harness/memory.md` "Recent Context" — is anything outdated?
- Read `org/People & Context.md` — any roles, teams, or relationships that changed?
- Check `harness/key-decisions.md`, `harness/patterns.md`, `harness/gotchas.md` for outdated claims
- Check `harness/north-star.md` — does Current Focus reflect reality?

#### 10. Check for Decisions Due for Revisit

Scan all Decision Record notes (`tags: [decision]`) for a `revisit_date` that has passed:
- List each one under a **Decisions due for revisit** heading in the report — don't silently skip these; surfacing them is the entire point of the revisit mechanism.
- For each, surface: title, original prediction, confidence level, and how overdue it is.
- Don't auto-resolve these. Ask the user whether the prediction held, needs updating, or the decision should be superseded — then log the actual outcome in the Decision Record's `## Revisit` section, and update `revisit_date` if it's being extended rather than closed.
- A decision record with no `revisit_date` set at all is itself a flag — list it as **missing a revisit date**, don't just skip it.

#### 11. Check for Mixed Context

Per vault rules, each note should cover ONE concept. Flag notes that:
- Mix project work with review prep
- Mix personal conversations with project evidence
- Have 3+ independent sections that don't need each other

#### 12. Check Runtime Adapter Config

- Runtime adapter settings, such as `.claude/settings.json`, `.codex/hooks.json`, and `.gemini/settings.json`, are well-formed and reference canonical or shared paths.
- `.agents/workflows/` — do all commands reference correct folder structure?
- `harness/manual.md` — any stale instructions that contradict current vault state?

#### 13. Fix and Report

- Fix what's clearly wrong (broken links, missing frontmatter, duplicate tags, wrong folder)
- For ambiguous issues, list them and ask the user
- Summarize:
  - **Fixed**: issues resolved
  - **Flagged**: needs user input
  - **Suggested**: improvements for the vault

### Important

- Don't delete anything without asking
- Don't create new notes during audit — just fix existing ones
- Preserve existing frontmatter when editing
- If a note is in the wrong folder, move it with `git mv`
- Update `harness/memory.md` index if memory topics changed
- Use parallel agents for large audits (e.g., one checking Projects/, one checking org/, one checking reviews/)

## Writes

- `Home.md`
- `harness/` notes
- `Projects/` notes and indexes
- `org/` notes and indexes
- `reviews/` evidence notes
- `Notes/` work notes
- `inbox/` staging notes
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

- `vault-librarian`
- `cross-linker`
