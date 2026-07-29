---
description: Writing artifact modes and boundaries for the canonical writing discipline.
tags:
  - harness
  - discipline
  - writing
---

# Writing Modes

Writing modes determine which skills, references, and quality checks apply.

## Universal Inputs

For client-specific work, read:

- `Clients/<Client>/<Client> Brand.md`
- `Clients/<Client>/<Client> Voice.md`

If either file is missing or placeholder-only, report the gap. Continue only
when the user explicitly authorizes a provisional draft.

## Modes

| Mode | Owns | Typical Output | Quality Emphasis |
|---|---|---|---|
| `web-copy` | Website, landing page, product, service, UX, CTA, and microcopy drafts. | Page sections, headlines, CTA sets, wire copy, metadata draft. | Intent fit, message clarity, conversion logic, voice fit, claims evidence, structure. |
| `blog-article` | Blog posts, articles, explainers, guides, comparison posts, and refreshes. | Brief, outline, draft, rewrite, audit notes. | Search intent, evidence, citation discipline, originality, reader utility. |
| `editing-humanize` | Improve existing draft without changing approved facts or strategy. | Edited draft plus change notes. | Voice, rhythm, clarity, reduced generic language, factual preservation. |
| `email-newsletter` | Email and newsletter drafts that are not sent by the writer. | Subject lines, preview text, body, CTA options. | Deliverability risk, concise structure, audience fit, approval boundary. |
| `social-shortform` | Social posts and derivative snippets. | Platform-specific post drafts and variants. | Hook clarity, platform fit, claim compression, no unsupported exaggeration. |
| `review-evidence` | Self-review, peer-review, and review evidence narratives. | Evidence-backed review prose. | Evidence traceability, tone, specificity, no invented impact. |
| `content-strategy` | Briefs, calendars, clusters, and content plans. | Strategy memo, brief, calendar, topic map. | Source freshness, assumptions, prioritization criteria, handoff clarity. |

## Non-Writer Boundaries

- Publishing belongs to the relevant publishing or platform workflow.
- Sending email or posting social content requires explicit external mutation
  approval.
- SEO platform audits belong to the future SEO discipline; writing may produce
  SEO-aware copy but does not own live technical SEO diagnosis.
- Visual assets belong to the design/media discipline unless the writing task
  only needs alt text, captions, or image brief copy.

## Web Copy Intent Profiles

`web-copy` requires a `web_intent` value:

| Intent | Applies To | Primary Job | Persuasion Boundary |
|---|---|---|---|
| `standard` | Home, about, service, product information, team, location, contact, FAQ, and normal site pages. | Orient, explain, build trust, and guide the next step. | Keep persuasion grounded and proportional; avoid fake urgency, scarcity, and sales pressure. |
| `promotional` | Landing, sales, campaign, offer, launch, webinar, event registration, lead magnet, and paid-traffic pages. | Persuade one audience to take one action. | Direct persuasion, urgency, repeated CTAs, and objection handling are allowed only when truthful and evidence-supported. |

Avoiding sales hype does not mean avoiding persuasion on promotional pages.
Sales copy may sell. Hype begins when the copy asks for belief without support:
unsupported superlatives, fake scarcity, invented proof, exaggerated outcomes,
or pressure that conflicts with the brand.

## Email Intent Profiles

`email-newsletter` requires an `email_intent` value:

| Intent | Applies To | Primary Job | Boundary |
|---|---|---|---|
| `editorial-newsletter` | Recurring issues, curated links, commentary, digests, personal or brand notes. | Provide value and build trust. | Keep promotion secondary unless the issue is explicitly promotional. |
| `promotional-email` | Offers, launches, sales, events, webinars, campaigns. | Persuade a known audience to take one action. | Urgency, offer framing, and objection handling are allowed only when truthful. |
| `nurture-email` | Education, onboarding, consideration, trust-building. | Move the reader one step in understanding or confidence. | Teach before asking for a larger commitment. |
| `announcement` | Updates, invitations, releases, operational news. | Explain what changed and what to do. | Keep facts precise and do not over-sell routine updates. |
| `transactional-adjacent` | Account, billing, service, support, or operational email drafts. | Communicate essential information. | Draft only; requires strong approval before use. |

Email writing never sends, schedules, imports contacts, or changes automation.

## Social Shortform Profiles

`social-shortform` requires a target platform/profile when known. The writing
job is compression and platform-native framing, not channel operations.

Common profiles: `linkedin`, `x-post`, `x-thread`, `instagram-caption`,
`shorts-script`, and `community-prompt`.

Social writing never posts, schedules, replies, DMs, changes profiles, or
creates an operating calendar unless a separate workflow approves it.

## Repurposing Rule

`content-repurpose` requires an existing source artifact. It extracts source
ideas, maps evidence, and routes derivative outputs into target skills such as
`email-newsletter`, `social-shortform`, `web-copy`, and `article-*`. It must
preserve claim status and cannot strengthen unsupported claims.
