---
description: "Current state analysis for remaining role and skill porting buckets after stashing SEO."
tags:
  - harness
  - audit
  - skills
  - roles
status: active
created: 2026-07-29
---

# Role And Skill Porting Buckets

## Scope

Analyze the remaining less-intensive porting buckets after stashing SEO:
Design, Development, and General Marketing.

Paid Ads is intentionally excluded. Legacy `.claude/skills/ads*` material is
not a porting target. Rebuild a paid ads role from scratch only when Bob asks
for it.

## Current Canonical Baseline

Active role contracts already exist for:

- `designer`
- `developer`
- `strategist`
- `writer`
- `wordpress-operator`
- `verifier`

Active canonical disciplines:

- `accessibility`
- `design`
- `development`
- `marketing`
- `writing`
- `seo` (paused/stashed)

Marketing now has a first-pass canonical discipline.

## Design Bucket

Current canonical assets:

- Role: `designer`
- Role adapter: `role-designer`
- Discipline: `design`
- Shared discipline: `accessibility`
- Skills: `brandkit`, `design-taste-frontend`, `design-taste-frontend-v1`,
  `design-delivery`, `gpt-taste`, `high-end-visual-design`, `image-to-code`,
  `imagegen-frontend-mobile`, `imagegen-frontend-web`,
  `industrial-brutalist-ui`, `minimalist-ui`, `redesign-existing-projects`,
  `stitch-design-taste`, and `accessibility-foundation`.

State:

- Strongest of the remaining buckets by skill volume.
- First-pass discipline contract, modes, rubric, skill map, design-delivery
  skill, shared accessibility layer, and extracted principle layer are now in
  place.
- Remaining design work is dedupe and optional expansion: design taste
  consolidation, prototype workflow, CRO/landing-page split, and reference
  cleanup.
- `brandkit` overlaps with the `strategist` role and client Design Tokens.
  The discipline should define when brand/design token work belongs to
  strategist versus designer.

Recommended next slice:

1. Dedupe `design-taste-frontend`, `design-taste-frontend-v1`, `gpt-taste`,
   `frontend-design`, and relevant `design-systems` material.
2. Decide whether `claude-design` should become a vault-neutral
   `design-prototype` workflow.
3. Defer `landing-page-design` to General Marketing/CRO.
4. Keep visual style packs optional and governed by the Design discipline.

## Development Bucket

Current canonical assets:

- Role: `developer`
- Role adapter: `role-developer`
- Adjacent role: `wordpress-operator`
- Discipline: `development`
- Skill: `developer-delivery`
- Platform map: `.agents/disciplines/development/platforms.md`
- Separate discipline: `wordpress-operations`
- Separate plan: `wordpress-operations-mcp-import-plan`

State:

- First-pass discipline contract, modes, rubric, skill map, and
  `developer-delivery` implementation loop are in place.
- Developer role has repository-local instruction priority, dirty-work
  protection, acceptance criteria, verification, and WordPress code/state
  ownership boundaries.
- Astro and available global WordPress code skills are imported and active in
  the Development discipline.
- WordPress operation/MCP usage has a separate discipline because it can mutate
  live database-backed state.
- Remaining development work is specialty expansion: debugging, code review,
  dependency, git, Cloudflare, release/deployment surfaces, and workflow
  adapters around the imported platform skills.
- Developer expansion should also explore a documentation-curation loop for
  fast-moving external APIs: use Context7, official docs, changelogs, and
  package manifests during explicit skill/source refresh work, then promote only
  durable guidance into Developer skills and source maps. Track this in
  `harness/roadmaps/developer-role-expansion.md`.

Recommended next slice:

1. Inventory remaining general development specialists: debugging, code review,
   acceptance tests, dependencies, git, Cloudflare, performance remediation,
   and release/deployment.
2. Prototype a documentation source map for one fast-moving Developer skill and
   define the shape of a future `skill-doc-refresh` workflow.
3. Build WordPress/Astro workflow adapters only after a recurring task shape is
   clear.
4. Keep WordPress operation/MCP work routed through the `wordpress-operations`
   discipline.

## General Marketing Bucket

Current canonical assets:

- Role: `writer`
- Role: `strategist`
- Discipline: `marketing`
- Discipline: `writing`
- Skills: `market-research`, `keyword-research-and-clustering`,
  `competitor-analysis`, `marketing-strategy`, `marketing-analytics`,
  `conversion-rate-optimization`, `utm-builder`,
  `social-channel-operations`, `newsletter-channel-operations`,
  `email-deliverability`, and `email-quality-auditor`.
- Skills: `writing-foundation`, `writing-quality-gate`, `claim-check`,
  `copy-edit`, `voice-humanize`, `web-copy`, `article-brief`,
  `article-outline`, `article-draft`, `article-refresh`,
  `content-repurpose`, `email-newsletter`, and `social-shortform`.
- Workflows: `write-article`, `refresh-article`, `repurpose-content`,
  `write-email-newsletter`, and `write-web-copy`.

Legacy source material still available:

- `marketing-strategy`
- `market-research-analysis`
- `competitor-analysis`
- `growth-strategy`
- `marketing-automation`
- `newsletter-management`
- `social-media-management`
- `utm-builder`
- `referral-program`
- `conversion-rate-optimization`
- `cro-page-structure`
- `content-planner`
- `content-strategy-and-planning`
- `youtube-content`
- `youtube-research`
- blog strategy/planning skills

State:

- General Marketing has a first-pass Marketing discipline plus the existing
  Writing discipline.
- Copy/content production is in decent shape.
- Strategy, market research, keyword research, competitor analysis, analytics,
  CRO, and UTM attribution are now canonical.
- Social and email are canonical channel surfaces through
  `marketing-strategy`, `social-channel-operations`, and
  `newsletter-channel-operations`; finished copy remains in Writing.
- Email deliverability and email QA are active diagnostic/gate skills.
- Marketing automation is recorded as a deferred capacity gap and should remain
  off indefinitely until capacity and approval boundaries justify it.

Recommended next slice:

1. Wire recurring marketing workflows only after repeated task shapes are clear.
2. Add social/email platform-specific source notes only when real client work
   exposes a need.
3. Keep automation noted as a deferred gap unless explicitly reprioritized.
4. Do not include paid ads in this pass.

## Ads Decision

Legacy Ads source count: 34 `.claude/skills/ads*` directories.

Decision:

- Do not port them.
- Do not preserve them in the active matrix as pending work.
- Treat them as scrubbable legacy adapter/source material.
- Rebuild paid ads from scratch later with a fresh role, discipline, approval
  model, provider evidence model, and mutation boundaries.

## Recommended Order

1. General development specialists: debugging, review, acceptance tests,
   dependency, git, Cloudflare, release/deployment.
2. Design cleanup: dedupe taste/prototype/CRO reference material as needed.
3. Marketing workflow adapters only after recurring task shapes are clear.
4. SEO: resume later from the stash note.
5. Paid Ads: skip entirely until Bob prompts a new paid ads role.

## Related

- [[harness/skills|Skills]]
- [[harness/roadmaps/developer-role-expansion|Developer Role Expansion]]
- [[harness/roadmaps/seo|SEO Roadmap]]
- [[harness/audits/development-skill-import-plan|Development Skill Import Plan]]
- [[harness/audits/wordpress-operations-mcp-import-plan|WordPress Operations And MCP Import Plan]]
- [[harness/resume/2026-07-29-context-cleanup-development-next|2026-07-29 Context Cleanup And Development Next]]
- [[harness/resume/2026-07-29-seo-skill-stash|2026-07-29 SEO Skill Stash]]
