# Write Article

## Purpose

Create a long-form article through a contract-backed sequence: brief, outline,
draft, claim handling, revision, and quality gate.

## Invocation

- Canonical workflow: `write-article`
- Runtime adapters may expose this as `/write-article`, `write-article`, or a
  runtime-native command.

## Required Context

- Start with `harness/manual.md`.
- Read `.agents/disciplines/writing/contract.json`.
- Read `.agents/disciplines/writing/modes.md`.
- Read `harness/operator.md` and `harness/user.md` when user/operator voice or
  preferences matter.
- For client work, read Brand, Voice, project, content strategy, source, and
  campaign notes when available.

## Workflow

1. Build the task contract: client/project, article type, audience, reader
   intent, thesis or topic, desired action, search goal if any, source packet,
   evidence requirements, target location, and approval boundary.
2. Apply `article-brief` unless a usable brief already exists.
3. Apply `article-outline` unless a usable outline already exists or the user
   explicitly requested a direct draft.
4. Apply `article-draft` to produce the long-form artifact.
5. Apply `claim-check` for statistics, source-backed claims, comparisons,
   first-hand claims, high-stakes claims, or public factual claims.
6. Apply `copy-edit` and `voice-humanize` as needed.
7. Apply `writing-quality-gate` before claiming the article is ready.
8. Return the draft, source status, open claims, and next publishing or review
   step.

## Writes

- Briefs, outlines, and drafts may be written to `Clients/`, `Projects/`, or
  another user-approved vault path when `vault_write` is allowed.
- Do not publish to a CMS, repository, social platform, or newsletter platform
  from this workflow.

## Approval Gates

- Ask before creating or editing vault files when the user has not authorized
  `vault_write`.
- Ask before external reads such as web search, source inspection, competitor
  pages, or current statistics.
- Ask before skipping the brief or outline when the artifact is high-risk,
  client-facing, or source-heavy.
- External publishing and production changes are out of scope.

## Verification

- Verify article type and reader intent are explicit.
- Verify search/AEO/FAQ/schema/visual requirements are goal-driven, not assumed.
- Verify material claims are source-backed, user-provided, measured, judged, or
  marked assumed.
- Verify `claim-check` runs when factual claims require it.
- Verify `writing-quality-gate` is run or clearly deferred with reason.
- Verify touched Markdown/frontmatter when files are edited.

## Return Format

Return:

- **Done**: brief/outline/draft artifacts produced and paths changed, if any
- **Evidence**: source labels, claim-check result, and quality-gate result
- **Open Items**: proof gaps, approvals, assumptions, or publishing needs
- **Next**: smallest useful next action

## Related Roles

- `writer`
- `strategist`
- `verifier`
- `designer`
- `developer`
- `wordpress-operator`
