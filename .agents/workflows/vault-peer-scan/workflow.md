# Vault Peer Scan

## Purpose

Deep scan a peer's GitHub PRs for review preparation and save structured evidence under `reviews/evidence/`.

## Invocation

- Canonical workflow: `vault-peer-scan`
- Runtime adapters may expose this as `/vault-peer-scan`, `vault-peer-scan`, or another runtime-native trigger. The behavior belongs here.

## Required Context

- Start with `harness/manual.md`.
- Use `harness/operator.md` for the active runtime persona.
- Use `harness/user.md` for Bob/user context when user preferences, scope, or voice matter.
- Use QMD or local search before broad file reads when looking for prior vault context.

## Workflow

### Peer PR Deep Scan

Deep scan a peer's GitHub PRs for review preparation. Produces a structured analysis saved to `reviews/evidence/`.

### Usage

```
/vault-peer-scan <name> <github-username> <repo> [period]
```

Example: `/vault-peer-scan "Jane Doe" jdoe example-repo "Jan 2025 - Jun 2025"`

### Workflow

1. **Fetch full PR list** (limit 200):
   ```
   gh pr list --repo <org>/<repo> --author <username> --state all --limit 200 --json number,title,state,createdAt,mergedAt,additions,deletions
   ```

2. **Filter to review period** (default: last 6 months). For EACH PR in period, fetch details:
   ```
   gh pr view <number> --repo <org>/<repo> --json body,reviews,comments,additions,deletions,changedFiles,title,state,createdAt,mergedAt
   ```

3. **Produce structured analysis** with these sections:
   - **PR count by month** — table showing velocity trends
   - **Projects/themes** — group PRs by project area with descriptions of what was built
   - **Quality signals** — review comments, change requests, approval patterns, reverts, static analysis findings
   - **Notable contributions** — architectural decisions, complex fixes, test coverage, cross-team impact
   - **Growth signals** — scope expansion over time, leadership evidence
   - **Full PR table** — every PR with number, title, date, additions, deletions, state

4. **Save to vault** as `reviews/evidence/<Name> PRs - <Period>.md` with frontmatter:
   ```yaml
   ---
   date: "<today>"
   description: "<one-line summary of findings>"
   person: "<Full Name>"
   cycle: "<e.g. h1-2026>"
   tags:
     - reviews
     - evidence
   ---
   ```

### Important

- Be thorough — this feeds into review drafts when Bob asks for them
- Note PRs that were reverted or closed (quality signal)
- Look for patterns in reviewer feedback (recurring issues = growth area)
- Identify cross-team PRs (collaboration evidence)
- Flag weekend/late-night work patterns if visible
- Map PRs to projects you have context on

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
