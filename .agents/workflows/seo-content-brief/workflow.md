# SEO Content Brief

## Purpose

Create a source-labeled SEO brief for a new page or an existing-page refresh.
The workflow resolves substantial client context, gathers approved search
opportunity evidence, defines page and writing requirements, and hands off to
the canonical Writing discipline.

## Invocation

- Canonical workflow: `seo-content-brief`
- Runtime adapters may expose this as `/seo-content-brief`, `seo-content-brief`,
  or a runtime-native trigger.

## Required Context

- Start with `harness/manual.md`, `harness/operator.md`, and `harness/user.md`.
- Read `.agents/disciplines/seo/contract.json`, `modes.md`, and `rubric.md`.
- Read `.agents/disciplines/writing/contract.json`, `modes.md`, and the selected
  Writing skill.
- Read `.agents/skills/seo-content-brief/references/onboarding-fields.md` when
  the significant onboarding intake is required.
- Read `.agents/skills/seo-content-brief/references/artifact-frontmatter.md`
  before saving a durable brief.
- Resolve one approved client, project, or prospect context.
- Read available Brand, Voice, Stack, website, audience, market, offer,
  business-goal, conversion, funnel, legal, and prior-work context.

## Workflow

1. Build the intake contract: mode (`new-page` or `refresh`), context, page
   type, offer/topic or existing URL, audience, market/language, business goal,
   funnel stage, desired action, output location, and approval boundary.
2. If substantial onboarding context is absent, stop and run a significant
   `/grill-me` intake. Capture the answers in the correct onboarding context
   before producing the brief.
3. Infer opportunity candidates from the user's request, business goal, topic,
   existing page, or supplied research. Offer additional opportunity research
   for approval when useful.
4. Use only search-data sources the User has identified as installed/configured.
   Supported sources include GA/GSC, Google Keyword Planner, User-declared
   DataForSEO, User-declared SE Ranking, other User-declared providers, manual
   Google/Bing observation, approved competitor analysis, and search
   suggestions.
5. Ask before reading external sources, live pages, competitor pages, or
   current search results. Do not probe for undeclared providers or credentials.
6. Record source labels, collection date, market, language, device, and
   freshness. Keep first-party data, provider estimates, manual observations,
   studies, heuristics, hypotheses, and assumptions distinct.
7. For `refresh`, inspect the existing page and available performance/context
   evidence before recommending changes.
8. Produce the SEO brief with page purpose, intent, opportunity rationale,
   coverage, structure requirements, internal-link direction, CTA context,
   evidence/claim requirements, and user decisions before writing.
9. Select the Writing handoff: `article-brief`, `web-copy`, or
   `article-refresh`. Include context and framework only; do not write final
   metadata or prose.
10. Apply `claim-check` when material claims require source handling.
11. Apply `seo-quality-gate` to the completed brief before marking it ready.
12. Save only to the resolved project, client, or prospect context when
   `vault_write` is authorized. Route project first, then client, then
   prospect. If no context fits, ask before writing.
13. Apply the frontmatter and review metadata from
   `references/artifact-frontmatter.md`.
14. New briefs awaiting User inspection receive a linked `Tasks/` record with `status: review`; do not add `attention_status` metadata.

## Writes

- Approved project, client, or prospect context.
- User-approved review artifact path.
- No CMS, repository, production, publishing, or provider configuration writes.

## Approval Gates

- `vault_write`: follow `harness/policies/approvals.md` before creating or
  editing vault files unless already authorized.
- `external_read`: ask before reading live pages, source URLs, current search
  results, competitor pages, or current statistics.
- `provider_data`: use only User-declared configured providers; paid or
  credentialed calls require the applicable approval.
- `competitor_analysis`: ask before running it.
- `external_mutation` and `production`: out of scope.

## Verification

- Mode is `new-page` or `refresh` and page type is explicit.
- Client/project/prospect context and substantial onboarding context are
  resolved before the brief is produced.
- Business goal, audience, market/language, funnel stage, and desired action are
  explicit.
- Opportunity inputs and search-data sources are labeled and dated.
- Search intent is distinct from business objective and funnel stage.
- Refresh mode identifies the existing page and inspection scope.
- Writing handoff selects the correct Writing mode.
- Durable artifacts use the project/client/prospect routing and review
  frontmatter contract.
- Final metadata and prose were not produced by the SEO workflow.
- Material claims have `claim-check` handling when needed.
- `seo-quality-gate` passes or is explicitly deferred with an actionable reason.
- Changed Markdown/frontmatter and Home review registration are verified.

## Return Format

Return:

- **Done**: mode, context, brief path, Writing handoff, and gate state
- **Evidence**: sources, dates, market/device, observations, and limitations
- **Open Items**: approvals or User decisions still needed before writing
- **Next**: the smallest Writing or research handoff

## Related Roles

- `strategist`
- `writer`
- `verifier`
- `developer`
- `wordpress-operator`
