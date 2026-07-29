# Write Email Newsletter

## Purpose

Draft email and newsletter copy through the canonical writing discipline with
explicit email intent, source handling, and a hard boundary against sending or
scheduling.

## Invocation

- Canonical workflow: `write-email-newsletter`
- Runtime adapters may expose this as `/write-email-newsletter`,
  `write-email-newsletter`, or a runtime-native command.

## Required Context

- Start with `harness/manual.md`.
- Read `.agents/disciplines/writing/contract.json`.
- Read `.agents/disciplines/writing/modes.md`.
- Read `harness/operator.md` and `harness/user.md` when user/operator voice or
  preferences matter.
- For client work, read Brand, Voice, campaign, offer, product, source, or
  newsletter notes when available.

## Workflow

1. Build the task contract: client/project, `email_intent`, audience/list
   segment, relationship stage, desired action, offer or topic, source artifact,
   proof, length, and approval boundary.
2. Apply `writing-foundation` for audience, positioning, claim labels, and
   assumptions.
3. Apply `email-newsletter` to draft subject line, preview text, body, CTA, and
   variants.
4. Apply `claim-check` when the draft includes factual claims, testimonials,
   scarcity, deadlines, discounts, results, legal/compliance claims, or other
   proof-sensitive language.
5. Apply `copy-edit` or `voice-humanize` when revision is needed.
6. Apply `writing-quality-gate` before claiming the draft is ready.
7. Return draft-only output with send/schedule boundary visible.

## Writes

- Drafts may be written to `Clients/`, `Projects/`, or another user-approved
  vault path when `vault_write` is allowed.
- Do not write to email platforms, automations, lists, templates, or sending
  tools from this workflow.

## Approval Gates

- Ask before creating or editing vault files when the user has not authorized
  `vault_write`.
- Ask before external reads such as source articles, campaign pages, or current
  product details.
- Sending, scheduling, importing contacts, changing automation, or editing email
  platform templates is out of scope and requires a separate external mutation
  workflow.

## Verification

- Verify `email_intent` is explicit.
- Verify subject, preview, body, and CTA fit the intent.
- Verify send/schedule is not implied.
- Verify claims, urgency, scarcity, discounts, and compliance-sensitive language
  are supported or flagged.
- Verify `writing-quality-gate` is run or clearly deferred with reason.
- Verify touched Markdown/frontmatter when files are edited.

## Return Format

Return:

- **Done**: draft produced and paths changed, if any
- **Evidence**: source labels, claim-check result, and quality-gate result
- **Open Items**: proof gaps, approvals, assumptions, or send-platform needs
- **Next**: smallest useful next action

## Related Roles

- `writer`
- `strategist`
- `verifier`
