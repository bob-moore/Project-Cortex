# Write Web Copy

## Purpose

Create website copy through the canonical writing discipline, with explicit
standard or promotional web intent, evidence handling, and readiness checks.

## Invocation

- Canonical workflow: `write-web-copy`
- Runtime adapters may expose this as `/write-web-copy`, `write-web-copy`, or a
  runtime-native command.

## Required Context

- Start with `harness/manual.md`.
- Read `.agents/disciplines/writing/contract.json`.
- Read `.agents/disciplines/writing/modes.md`.
- Read `harness/operator.md` and `harness/user.md` when operator/user context,
  voice, or preferences matter.
- For client work, read available Brand, Voice, project, service, product, or
  campaign notes before drafting.

## Workflow

1. Build the task contract: client/project, page type, `web_intent`
   (`standard` or `promotional`), audience, desired action, offer or subject,
   proof, target location, approval class, and constraints.
2. Apply `writing-foundation` for audience, positioning, evidence labels, and
   missing-context handling.
3. Apply `web-copy` to draft page sections, CTA options, metadata, or wire copy.
4. Apply `copy-edit` when the draft needs clarity, structure, grammar, or voice
   revision.
5. Apply `voice-humanize` when the draft is generic, stiff, or off voice.
6. Apply `claim-check` when the copy includes statistics, guarantees,
   comparisons, testimonials, credentials, regulated claims, or other material
   claims.
7. Apply `writing-quality-gate` before claiming the artifact is ready.
8. Return the artifact, evidence labels, open proof needs, approval boundaries,
   and next implementation step.

## Writes

- Drafts may be written to `Clients/`, `Projects/`, or another user-approved
  vault path when `vault_write` is allowed.
- Do not update a live site, CMS, repository, ad platform, or form system from
  this workflow.

## Approval Gates

- Ask before creating or editing vault files when the user has not authorized
  `vault_write`.
- Ask before external reads such as live websites, competitor pages, public
  sources, or analytics.
- Do not publish, upload, edit live pages, change WordPress state, change
  repository code, or alter external platforms from this workflow.
- Treat promotional web copy as allowed persuasion, not permission for
  unsupported hype.

## Verification

- Verify `web_intent` is explicit.
- Verify Brand/Voice gaps are surfaced or explicitly provisional.
- Verify material claims are source-backed, user-provided, measured, judged, or
  marked assumed.
- Verify `writing-quality-gate` is run or clearly deferred with reason.
- Verify touched Markdown/frontmatter when files are edited.

## Return Format

Return:

- **Done**: artifact produced and paths changed, if any
- **Evidence**: source labels, claim-check result, and quality-gate result
- **Open Items**: proof gaps, approvals, assumptions, or implementation needs
- **Next**: smallest useful next action

## Related Roles

- `writer`
- `strategist`
- `verifier`
- `designer`
- `developer`
- `wordpress-operator`
