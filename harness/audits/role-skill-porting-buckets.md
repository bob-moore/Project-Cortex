---
date: 2026-08-01
description: "Current state analysis for remaining role and skill porting buckets after stashing SEO."
tags:
  - harness
  - audit
  - skills
  - roles
status: active
created: 2026-07-29
updated: 2026-08-01
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
- Skills: `brandkit`, `design-taste-frontend`, `design-delivery`,
  `design-research`, `design-reverse-engineering`, `high-end-visual-design`,
  `image-to-code`, `imagegen-frontend-mobile`, `imagegen-frontend-web`,
  `industrial-brutalist-ui`, `minimalist-ui`, `redesign-existing-projects`,
  `stitch-design-taste`, and `accessibility-foundation`.

State: **Closed 2026-08-01.**

- Strongest of the remaining buckets by skill volume.
- First-pass discipline contract, modes, rubric, skill map, design-delivery
  skill, shared accessibility layer, and extracted principle layer are in
  place.
- Taste-skill dedupe done 2026-08-01 (`design-taste-frontend-v1` and
  `gpt-taste` retired into `design-taste-frontend`).
- No new design skills (including a prototype workflow) until a concrete
  recurring need is identified — see [[key-decisions]].
- OpenPencil intentionally left unwired into any skill; do not wire it in
  unless explicitly asked — see [[key-decisions]].
- `brandkit` overlaps with the `strategist` role and client Design Tokens.
  The discipline should define when brand/design token work belongs to
  strategist versus designer. Low-priority; not blocking closure.

Remaining optional-only, not queued: `frontend-design` (stash-only) /
`design-systems` dedupe, `landing-page-design` deferral to Marketing/CRO,
`popular-web-designs` reference cleanup. None of these are next-slice work.

## Development Bucket

Current canonical assets:

- Role: `developer`
- Role adapter: `role-developer`
- Adjacent role: `wordpress-operator`
- Discipline: `development`
- Skills: `developer-delivery`, `code-review`, `git-procedures`,
  `acceptance-test-builder`, `skill-doc-refresh`
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
- Code review (`code-review`) and Cloudflare (`cloudflare-operations`, under
  `platform-operations`) were already done as of this audit's prior pass; the
  stale "remaining work" list below had drifted from that.
- Done 2026-08-01: surveyed debugging, git workflow, and acceptance tests
  against `stash/development/superpowers` and `stash/development/development-skills`.
  Debugging was already substantially covered by `developer-delivery` 4a — enriched
  that section in place (pattern analysis, multi-component evidence-gathering)
  instead of adding a competing standalone skill. Built `git-procedures`
  (worktree isolation + merge/rebase conflict classification, detailing what
  4c only summarizes) and `acceptance-test-builder` (regression-contract
  workflow, detailing what 4b only summarizes) as new active skills.
- Developer expansion should also explore a documentation-curation loop for
  fast-moving external APIs: use Context7, official docs, changelogs, and
  package manifests during explicit skill/source refresh work, then promote only
  durable guidance into Developer skills and source maps. Track this in
  `harness/roadmaps/developer-role-expansion.md`.

Recommended next slice:

1. Remaining specialist gaps: **dependency maintenance** (no source material
   found anywhere in stash — would need authoring from scratch or an external
   source) and **release/deployment boundaries beyond Cloudflare** (only thin
   source found: a changelog/SemVer-release skill; actual deploy/rollout is
   arguably already covered per-platform by `cloudflare-operations`,
   `wordpress-operations`, and `developer-delivery`'s build step). Do not build
   either until a concrete need is identified — see [[key-decisions]].
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


Recommended next slice:

1. Wire recurring marketing workflows only after repeated task shapes are clear.
2. Add social/email platform-specific source notes only when real client work
   exposes a need.
3. Do not include paid ads in this pass.

## Ads Decision

Legacy Ads source count: 34 `.claude/skills/ads*` directories.

Decision:

- Do not port them.
- Do not preserve them in the active matrix as pending work.
- Treat them as scrubbable legacy adapter/source material.
- Rebuild paid ads from scratch later with a fresh role, discipline, approval
  model, provider evidence model, and mutation boundaries.

## Recommended Order

1. **Active focus, started 2026-08-01:** General development specialists:
   debugging, review, acceptance tests, dependency, git, Cloudflare,
   release/deployment.
2. Design: closed 2026-08-01. No further work queued.
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
