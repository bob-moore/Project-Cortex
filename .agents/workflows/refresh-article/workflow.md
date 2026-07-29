# Refresh Article

## Purpose

Audit and update an existing long-form article through a read-first refresh
workflow that preserves useful material and verifies changed claims.

## Invocation

- Canonical workflow: `refresh-article`
- Runtime adapters may expose this as `/refresh-article`, `refresh-article`, or
  a runtime-native command.

## Required Context

- Start with `harness/manual.md`.
- Read `.agents/disciplines/writing/contract.json`.
- Read `.agents/disciplines/writing/modes.md`.
- Read `harness/operator.md` and `harness/user.md` when user/operator voice or
  preferences matter.
- Read the existing article before planning changes.
- For client work, read Brand, Voice, project, content strategy, and source
  notes when available.

## Workflow

1. Start read-only. Inspect the article and classify article type, purpose,
   likely reader intent, freshness risk, claim risk, and current gaps.
2. Apply `article-refresh` to produce an audit and refresh plan.
3. Ask for approval before material rewrite when scope was not already
   authorized.
4. Apply `claim-check` to stale, changed, public, comparative, first-hand, or
   high-stakes claims.
5. Rewrite with `article-refresh`, preserving useful original material and
   approved voice.
6. Apply `copy-edit` and `voice-humanize` as needed.
7. Apply `writing-quality-gate` before claiming the refreshed article is ready.
8. Return the audit, changed draft or patch summary, preserved material, open
   claims, and next publishing step.

## Writes

- Audit notes and refreshed drafts may be written to `Clients/`, `Projects/`, or
  another user-approved vault path when `vault_write` is allowed.
- Do not overwrite the original article unless the path and write approval are
  explicit.
- Do not publish to a CMS or repository from this workflow.

## Approval Gates

- Ask before creating or editing vault files when the user has not authorized
  `vault_write`.
- Ask before external reads such as current sources, web search, competitor
  pages, or source inspection.
- Ask before materially changing the article's strategy, claims, structure, or
  `lastUpdated` metadata when the user requested audit-only work.
- External publishing and production changes are out of scope.

## Verification

- Verify the original article was inspected before changes.
- Verify preserved material and changed material are distinguished.
- Verify `lastUpdated` changes only when material facts, recommendations,
  methods, or copy changed.
- Verify material claims are source-backed, user-provided, measured, judged, or
  marked assumed.
- Verify `writing-quality-gate` is run or clearly deferred with reason.
- Verify touched Markdown/frontmatter when files are edited.

## Return Format

Return:

- **Done**: audit/refreshed artifact produced and paths changed, if any
- **Evidence**: source labels, claim-check result, and quality-gate result
- **Open Items**: proof gaps, approvals, assumptions, or publishing needs
- **Next**: smallest useful next action

## Related Roles

- `writer`
- `strategist`
- `verifier`
- `developer`
- `wordpress-operator`
