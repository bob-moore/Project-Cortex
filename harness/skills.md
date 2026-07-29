# Skills

This is the harness index for skill and workflow conventions. Runtime-neutral
skills and workflows live under `.agents/`; runtime folders adapt those
contracts for a specific CLI or model host.

## Canonical Skills

Canonical portable skills belong in `.agents/skills/<name>/SKILL.md`.
`SKILL.md` keeps its uppercase spelling because runtimes expect that reserved
filename.

Current vault-operation skills:

- `defuddle` — extract clean markdown from web pages.
- `json-canvas` — create and edit Obsidian `.canvas` files.
- `obsidian-bases` — create and edit Obsidian `.base` files.
- `obsidian-cli` — interact with a running Obsidian app through the CLI.
- `obsidian-markdown` — write Obsidian-flavored Markdown.
- `qmd` — search and retrieve vault context through QMD.

Current interaction skills:

- `grill-me` — alias for starting a focused grilling session.
- `grilling` — interview the user one question at a time to stress-test a plan,
  decision, design, or idea before acting.

Current writing skills:

- `article-brief` — plan article audience, intent, structure direction, and
  evidence needs.
- `article-draft` — draft long-form articles from a brief, outline, source set,
  or topic.
- `article-outline` — create section structure and article skeletons.
- `article-refresh` — audit and update existing long-form artifacts.
- `claim-check` — extract claims, label evidence, classify risk, and recommend
  source/revision actions.
- `content-repurpose` — adapt an existing source artifact into target channel
  outputs while preserving evidence status.
- `copy-edit` — revise existing drafts for clarity, voice, rhythm, grammar, and
  constraint preservation.
- `email-newsletter` — draft email and newsletter copy with explicit intent
  profiles.
- `social-shortform` — draft platform-native social posts, threads, captions,
  scripts, and variants.
- `voice-humanize` — targeted voice and rhythm pass for generic or
  model-shaped drafts while preserving facts and strategy.
- `web-copy` — website copy with explicit `standard` and `promotional` intent
  profiles.
- `writing-foundation` — audience, positioning, customer-language, and clarity
  foundation for written artifacts.
- `writing-quality-gate` — mode-aware readiness rubric for written artifacts.

## Canonical Disciplines

Canonical disciplines belong in `.agents/disciplines/<name>/`.

Current disciplines:

- `accessibility` — shared accessibility requirements, evidence boundaries,
  POUR-oriented rubric, and handoff rules for Design, Development, WordPress,
  Writing, and Verification.
- `design` — visual intent, design modes, quality gate, skill map, rendered
  conformance review, design-delivery handoff, and extracted principles.
- `development` — repository implementation modes, development quality gate,
  core developer-delivery loop, platform import map, and code/state ownership
  boundaries.
- `marketing` — market research, keyword research, competitor analysis,
  marketing strategy, analytics, CRO, channel planning, and UTM attribution.
- `seo` — technical/page audit layer, neutral SEO tool contracts, evidence
  labels, source hierarchy, and quality gate. Paused/stashed as of 2026-07-29.
- `wordpress-operations` — mutable WordPress state, MCP/REST/WP-CLI/browser
  operation, environment targeting, before-state, rollback, and rendered
  verification.
- `writing` — writing modes, source-material map, and quality gate.

Current accessibility skills:

- `accessibility-foundation`

Current design skills:

- `brandkit`
- `design-delivery`
- `design-taste-frontend`
- `design-taste-frontend-v1`
- `gpt-taste`
- `high-end-visual-design`
- `image-to-code`
- `imagegen-frontend-mobile`
- `imagegen-frontend-web`
- `industrial-brutalist-ui`
- `minimalist-ui`
- `redesign-existing-projects`
- `stitch-design-taste`

Current development skills:

- `developer-delivery`
- `astro`
- `wordpress-router`
- `wp-project-triage`
- `wp-block-development`
- `wp-block-themes`
- `wordpress-block-theming`
- `wp-plugin-development`
- `wp-rest-api`
- `wp-interactivity-api`
- `wp-abilities-api`
- `wp-abilities-audit`
- `wp-abilities-verify`
- `wp-phpstan`
- `wp-playground`
- `wp-plugin-directory-guidelines`
- `wpds`

Current marketing skills:

- `market-research`
- `keyword-research-and-clustering`
- `competitor-analysis`
- `marketing-strategy`
- `marketing-analytics`
- `conversion-rate-optimization`
- `utm-builder`
- `social-channel-operations`
- `newsletter-channel-operations`
- `email-deliverability`
- `email-quality-auditor`

Current WordPress operations skills:

- `wordpress-operator`
- `wordpress-site-operations`
- `wp-wpcli-and-ops`
- `wp-redirection`
- `wp-migratedb-pro`
- `wp-performance`
- `novamira-wordpress-mcp-access`

Current SEO skills:

- `seo-foundation`
- `seo-quality-gate`
- `seo-tool-runner`
- `seo-page-audit`
- `seo-technical-audit`
- `seo-site-audit`
- `seo-sitemap`
- `seo-schema`
- `seo-images`
- `seo-hreflang`

Current porting focus:

- General Marketing now has a first-pass discipline and core research,
  strategy, analytics, CRO, attribution, social/newsletter channel operations,
  and email deliverability/quality gate skills. Automation remains deferred.
- Design now has a first-pass discipline, shared accessibility layer, and core
  `design-delivery` skill; remaining design work is dedupe and optional
  prototype/CRO/reference extraction.
- Development now has a first-pass discipline, `developer-delivery`, Astro, and
  project-local WordPress code-development skills. WordPress operation/MCP
  usage now has a separate first-pass discipline.
- Paid Ads is intentionally out of scope and should be rebuilt from scratch only
  when requested.

## Canonical Workflows

Canonical workflows belong in `.agents/workflows/<name>/workflow.md`.
Runtime-specific command files should dispatch to these workflow contracts.
Codex workflow adapters are generated as
`.agents/skills/workflow-<name>/SKILL.md`.

Current vault workflows:

- `vault-audit`
- `vault-capture-1on1`
- `vault-dump`
- `vault-humanize`
- `vault-incident-capture`
- `vault-intake`
- `vault-kickoff`
- `vault-meeting`
- `vault-peer-scan`
- `vault-prep-1on1`
- `vault-project-archive`
- `vault-review-brief`
- `vault-review-peer`
- `vault-self-review`
- `vault-slack-scan`
- `vault-standup`
- `vault-weekly`
- `vault-wrap-up`

Current writing workflows:

- `refresh-article`
- `repurpose-content`
- `write-article`
- `write-email-newsletter`
- `write-web-copy`
