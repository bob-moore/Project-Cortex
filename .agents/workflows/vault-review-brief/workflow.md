# Vault Review Brief

## Purpose

Generate a review context-transfer brief from vault data for manager or peer audiences.

## Invocation

- Canonical workflow: `vault-review-brief`
- Runtime adapters may expose this as `/vault-review-brief`, `vault-review-brief`, or another runtime-native trigger. The behavior belongs here.

## Required Context

- Start with `harness/manual.md`.
- Use `harness/operator.md` for the active runtime persona.
- Use `harness/user.md` for Bob/user context when user preferences, scope, or voice matter.
- Use QMD or local search before broad file reads when looking for prior vault context.

## Workflow

### Generate Review Brief

Generate a review context-transfer document from vault data. Supports manager version and peer version.

### Usage

```
/vault-review-brief <audience> [period]
```

Examples:
- `/vault-review-brief manager "Q3 2024 + Q4 2024"`
- `/vault-review-brief peers "Q3 2024 + Q4 2024"`

### Role

- **`review-prep`** — aggregates all evidence (review evidence, decisions, incidents, competencies, 1:1 feedback, PR scans) for the period

Launch the role first to gather raw material, then use its output to write the brief.

### Workflow

#### 1. Gather Data

Read these vault sources:
- `reviews/cycles/<cycle>/Review Brief.md` (or current private brief) — full context
- `reviews/Index.md` — quarterly highlights
- `reviews/cycles/YYYY-Q*.md` — cycle detail notes for the period
- `reviews/evidence/Your PRs - *.md` — PR data
- `Projects/*.md` — project notes for the period
- `reviews/competencies/*.md` — competency definitions
- Previous review notes for baseline comparison

#### 2. Generate Content

**For manager audience:**
- Frame for a non-technical audience — outcome language, not technical jargon
- Include: The Arc (narrative), Impact at a Glance (table), Impact Details (per project), Competency Highlights (with baselines), Documentation Trail
- Simplify technical terms for your audience's background
- No wikilinks — use plain text or markdown links to external resources
- Include all documentation, task tracker, repository, error tracking, and communication references

**For peer audience:**
- Can be more technical but still accessible (peers write reviews that go to manager)
- Organize by project (a common review tool structure)
- Include "Other things worth mentioning" for non-project work
- Casual tone — "jog your memory", "no pressure to cover everything"
- No competency section — that's for the manager

#### 3. Create Files

- Markdown version in `reviews/`
- HTML version with professional styling (blue theme, tables, responsive)
- PDF via Chrome headless: `--headless --no-pdf-header-footer --print-to-pdf`

#### 4. Verify

- Check page breaks in PDF (render pages with pdftoppm)
- Ensure no content is cut mid-section
- Verify all links work
- Cross-check PR counts and dates against `reference/` data

### Important

- NEVER include: sensitive interpersonal details, 1:1 talking points, peer selection strategy, personal strategic notes in shared versions
- Always maintain a private version with full context
- When updating, update BOTH private + shared versions
- Manager version: no wikilinks, non-technical language, professional formatting
- Peer version: project-focused, accessible language

## Writes

- `Projects/` notes and indexes
- `reviews/` evidence notes

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
