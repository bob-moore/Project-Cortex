---
name: seo-content-brief
description: "Use when the user needs an evidence-backed SEO brief for a new page or an existing-page refresh, including search context, intent, page requirements, opportunity research, and a handoff to the Writing discipline."
---

# SEO Content Brief

Create a source-labeled SEO brief for either a new page or an existing-page
refresh. The brief supplies search context and a writing framework. It does not
write final metadata, article prose, or final web copy.

## Operating Contract

1. Resolve the client, project, prospect, or other approved context.
2. Read the onboarding context before research: Brand, Voice, Stack, website,
   market, audience, offer, business goal, conversion goal, funnel stage,
   differentiators, constraints, and relevant prior work.
3. If substantial onboarding context is absent, stop brief production and run a
   significant `/grill-me` intake. Do not create a durable brief until the
   answers are captured in the appropriate onboarding context.
   Use `references/onboarding-fields.md` for the intake sequence.
4. Select `new-page` or `refresh` mode.
5. Infer opportunities from the user's prompt, business goal, existing page,
   known topic, or supplied research. Offer additional opportunity research
   rather than silently narrowing the request.
6. Use only search-data services the User has identified as installed or
   configured. Candidate sources include GA/GSC, Google Keyword Planner,
   DataForSEO, SE Ranking, other User-declared providers, manual Google/Bing
   observation, competitor-page analysis, and search suggestions.
7. Ask before competitor-page analysis or other external research. Record the
   selected source, collection date, market, language, device, and freshness.
8. Separate search intent, business objective, funnel stage, and desired action.
9. Produce writing requirements, not final prose. Route the handoff to the
   appropriate Writing mode: `article-brief`, `web-copy`, or `article-refresh`.
10. Apply `claim-check` when material claims, regulated topics, statistics,
    comparisons, or first-hand assertions are involved.
11. Apply `seo-quality-gate` before treating the brief as ready.
12. Use `references/artifact-frontmatter.md` for storage routing, frontmatter,
    review metadata, and Home registration.
13. New briefs awaiting User inspection receive a linked `Tasks/` record with `status: review`; do not add `attention_status` metadata.

## Required Brief Inputs

- Mode: `new-page` or `refresh`
- Client/project/prospect context
- Page type
- Business goal
- Audience
- Market and language
- Offer, topic, or existing URL
- Desired conversion action
- Funnel stage
- Brand and Voice references
- Search evidence available to the approved workflow
- Approved output location

## Search Opportunity Sources

Use whichever approved sources are available for the request:

- User prompt and business goal
- User-provided keyword or topic
- GA/GSC first-party data
- Google Keyword Planner
- DataForSEO, when User-declared as configured
- SE Ranking, when User-declared as configured
- Other User-declared third-party provider
- Manual Google/Bing observation
- Competitor-page analysis after User approval
- Search suggestions and related searches

Do not probe for providers, credentials, APIs, or tools that the User has not
identified as installed or configured.

## Brief Content

The brief should contain:

- Page purpose and business outcome
- Recommended page type
- Audience and user job-to-be-done
- Search intent and funnel stage
- Primary topic/query and supporting topics when evidenced
- Opportunity rationale and source labels
- Search-data scope, source dates, market, language, device, and freshness
- Existing-page findings for refresh mode
- Recommended page angle and differentiation
- Required reader questions and information coverage
- Recommended structure and section requirements
- Internal-link opportunities and target pages
- CTA/conversion requirements
- Evidence and claim requirements
- Brand, Voice, legal, compliance, and project constraints
- Writing handoff mode
- Assumptions that are necessary to proceed
- User decisions required before writing
- Verification plan

## Writing Handoff

The SEO brief may provide:

- Search context
- Intent and audience context
- Page and section requirements
- Topic/entity coverage
- Internal-link direction
- Evidence and claim requirements
- CTA context
- Framework for title/meta work

The SEO brief does not provide final title tags, final meta descriptions, final
headings as finished copy, article prose, or final web copy. The Writing
workflow owns those outputs and applies its own quality gate.

## Output Shape

Durable Markdown artifacts use the frontmatter and routing contract in
`references/artifact-frontmatter.md`.

```text
# SEO Content Brief: [Working Name]

## Contract
- Mode:
- Context:
- Page type:
- Market/language:
- Output path:
- Writing handoff:

## Business And Audience
- Business goal:
- Audience:
- User job-to-be-done:
- Funnel stage:
- Desired action:

## Search Context
- Primary topic/query:
- Supporting topics/queries:
- Search intent:
- Search evidence:
- Source/date/market/device:
- Opportunity rationale:

## Page Requirements
- Recommended angle:
- Differentiation:
- Required questions:
- Required coverage:
- Internal links:
- CTA context:

## Evidence And Claims
| Claim or requirement | Evidence type | Source/status | Risk or handling |
| --- | --- | --- | --- |

## Writing Handoff
- Writing mode:
- Brief requirements:
- Voice/Brand references:
- Claim-check required:

## Decisions Before Writing
- ...

## Verification
- SEO quality gate:
- Writing quality gate:
- Refresh/recheck method:
```

## Boundaries

- Do not create a brief without resolving required onboarding context.
- Do not inspect undeclared providers or infer that a provider is installed.
- Do not perform competitor research without asking first.
- Do not invent volume, difficulty, ranking, traffic, conversion, or AI-visibility
  outcomes.
- Do not mix first-party data, provider estimates, manual observations,
  third-party studies, heuristics, and hypotheses without labels.
- Do not draft final copy or bypass the Writing discipline.
- Do not publish, edit CMS state, change code, or mutate production.

If this skill conflicts with `.agents/disciplines/seo/rubric.md`, the rubric
wins.
