---
description: Operator-facing matrix of canonical workflows, gates, and adapters.
tags:
  - harness
  - workflows
---

# Workflows

Canonical workflow behavior lives in `.agents/workflows/<workflow>/`. This file
is the readable registry for deciding whether a task belongs in a workflow,
skill, role, or vault-organization pass.

## Registry Rules

- A workflow owns task shape, inputs, approval class, writes, verification, and
  return contract.
- Workflow resolution is mandatory when a request matches by name, adapter,
  alias, or clear task shape.
- If an apparent workflow match is skipped, the runtime must state why before
  continuing.
- A skill owns reusable procedure or reference material.
- A role owns capability boundaries.
- An adapter owns runtime discovery only.
- If a workflow row changes, regenerate adapters and run the gate.

## Adapter Parity

Current required adapters:

- Claude command: `.claude/commands/<workflow>.md`
- Codex workflow skill: `.agents/skills/workflow-<workflow>/SKILL.md`

Gemini and Hermes workflow adapters remain pending until their invocation
schemas are defined and verifiable.

## Writing Workflows

| Workflow | Purpose | Primary Skills | Approval Classes | Verification | Done Signal |
| --- | --- | --- | --- | --- | --- |
| `write-web-copy` | Draft standard or promotional website copy. | `writing-foundation`, `web-copy`, `claim-check`, `writing-quality-gate` | `read_only`, `vault_write`, `external_read` | Writing discipline followed; Brand/Voice gaps surfaced; material claims checked. | Web intent explicit; artifact returned or saved; claims labeled; gate passed or deferred with reason. |
| `write-email-newsletter` | Draft email/newsletter copy without sending. | `writing-foundation`, `email-newsletter`, `claim-check`, `writing-quality-gate` | `read_only`, `vault_write`, `external_read` | Writing discipline followed; no send/schedule/import/automation mutation implied. | Email intent explicit; subject, preview, body, CTA returned or saved; no-send boundary visible. |
| `write-article` | Create a long-form article through brief, outline, draft, and quality gate. | `article-brief`, `article-outline`, `article-draft`, `claim-check`, `writing-quality-gate` | `read_only`, `vault_write`, `external_read` | Claims checked; SEO/AEO/schema only when goal-driven; edited files verified. | Article type and reader intent explicit; artifact returned or saved; claims labeled; gate passed or deferred. |
| `refresh-article` | Audit and update an existing long-form article. | `article-refresh`, `claim-check`, `copy-edit`, `writing-quality-gate` | `read_only`, `vault_write`, `external_read` | Read-first audit precedes rewrite; claim and freshness changes justified. | Existing article inspected; preserved and changed material separated; refreshed artifact or audit returned or saved. |
| `repurpose-content` | Turn an existing artifact into derivative channel outputs. | `content-repurpose`, target writing skill, `claim-check`, `writing-quality-gate` | `read_only`, `vault_write`, `external_read` | Source map exists; reused/compressed claims checked; unsupported claims are not strengthened. | Source inspected; target channels explicit; outputs returned or saved; evidence caveats preserved. |

## SEO Workflows

| Workflow | Purpose | Primary Skills | Approval Classes | Verification | Done Signal |
| --- | --- | --- | --- | --- | --- |
| `seo-page-audit` | Run a bounded single-page SEO evidence audit with neutral CLI tools. | `seo-foundation`, `seo-tool-runner`, `seo-quality-gate` | `read_only`, `vault_write`, `external_read` | Raw and normalized artifacts preserved; evidence labels and limitations visible; quality gate evaluated. | Target and scope explicit; audit artifacts saved or blocker reported; return contract complete. |
| `seo-technical-audit` | Run a bounded site-level technical SEO evidence audit with explicit crawl caps. | `seo-foundation`, `seo-tool-runner`, `seo-quality-gate` | `read_only`, `vault_write`, `external_read` | Crawl caps, sitemap/robots limits, raw artifacts, affected URL samples, and partial states visible; quality gate evaluated. | Site and caps explicit; bounded audit artifacts saved or blocker reported; return contract complete. |
| `seo-site-audit` | Orchestrate a bounded site audit from technical, page, and Phase 3 specialist checks. | `seo-foundation`, `seo-technical-audit`, `seo-page-audit`, `seo-quality-gate` | `read_only`, `vault_write`, `external_read` | Unified evidence root; caps, partial states, specialist checks, and quality gate visible. | Site contract explicit; bounded evidence bundle saved or blocker reported; return contract complete. |
| `seo-sitemap` | Inspect a sitemap or sitemap index without mutation. | `seo-foundation`, `seo-tool-runner`, `seo-quality-gate` | `read_only`, `vault_write`, `external_read` | XML parse status, missing/duplicate locs, source and limits preserved. | Sitemap evidence returned or blocker reported; no generation/submission performed. |
| `seo-schema` | Detect and structurally inspect JSON-LD without deployment. | `seo-foundation`, `seo-tool-runner`, `seo-quality-gate` | `read_only`, `vault_write`, `external_read` | JSON syntax, observed types, source facts, and implementation handoff verified. | Schema evidence returned or blocker reported; no rich-result promise. |
| `seo-images` | Inspect image markup for alt and layout-related attributes. | `seo-foundation`, `seo-tool-runner`, `seo-quality-gate` | `read_only`, `vault_write`, `external_read` | Image inventory, omitted/empty alt, and dimensions distinguished. | Image evidence returned or blocker reported; no asset mutation. |
| `seo-hreflang` | Inspect hreflang alternate links without changing international routing. | `seo-foundation`, `seo-tool-runner`, `seo-quality-gate` | `read_only`, `vault_write`, `external_read` | Codes, duplicates, href values, reciprocity limits, and locale assumptions visible. | Hreflang evidence returned or blocker reported; no routing mutation. |

## Operations Workflows

| Workflow | Purpose | Primary Roles | Approval Classes | Verification | Done Signal |
| --- | --- | --- | --- | --- | --- |
| `assistant` | Answer a freeform operational evidence request about the User's calendar, email, or Monday.com workload without making planning decisions. | `assistant` | `read_only`, `external_read`, `external_mutation` | Source labels and retrieval time present; calendar mutations read back after approval; no vault writes. | Evidence-backed answer returned or blocker reported; no planning decision made. |

## Vault Workflows

| Workflow | Purpose | Primary Roles | Approval Classes | Verification | Done Signal |
| --- | --- | --- | --- | --- | --- |
| `vault-audit` | Audit vault structure, indexes, frontmatter, links, Bases, and consistency. | `vault-librarian`, `cross-linker` | `read_only`, `vault_write` | Changed Markdown/frontmatter and wikilinks verified. | Scope satisfied or blocked; touched files listed; approval gates respected. |
| `vault-capture-1on1` | Convert 1:1 material into structured notes and related context. | `operator` | `vault_write`, `external_read` | External evidence labeled; changed files and links verified. | Evidence labeled; touched files listed; return contract complete. |
| `vault-dump` | Route freeform captured material into the right vault notes. | `operator` | `vault_write` | Changed files and links verified. | Scope satisfied or blocked; touched files listed. |
| `vault-humanize` | Voice-calibrated editing for vault text. | `operator` | `vault_write` | Changed files and links verified; character count checked when needed. | Edited file returned or saved; limits respected. |
| `vault-incident-capture` | Capture incidents from Slack or other evidence into structured notes. | `slack-archaeologist`, `people-profiler` | `vault_write`, `external_read` | External evidence labeled; changed files and links verified. | Timeline/evidence captured; touched files listed. |
| `vault-intake` | Process unread `inbox/` items into the vault and clear handled items. | `operator` | `vault_write` | Changed files and links verified. | Inbox items classified, routed, and reported. |
| `vault-kickoff` | Brief and dispatch selected client-work roles while retaining verification ownership. | `assistant`, `strategist`, `writer`, `designer`, `developer`, `wordpress-operator` | `read_only`, `vault_write`, `external_read`, `external_mutation`, `destructive`, `production` | External evidence labeled; parent verifies role evidence before closure. | Selected work completed or blocked under approval gates. |
| `vault-meeting` | Prepare for a meeting by topic with context, blockers, and agenda. | `operator` | `read_only` | Return contract checked. | Brief returned with scope satisfied or blocked. |
| `vault-peer-scan` | Scan a peer's GitHub PRs for review evidence. | `operator` | `external_read`, `vault_write` | External evidence labeled; changed files and links verified. | Evidence saved under `reviews/evidence/`; touched files listed. |
| `vault-prep-1on1` | Prepare for an upcoming 1:1. | `operator` | `read_only`, `external_read` | External evidence labeled when used. | Agenda/context returned; no write required. |
| `vault-project-archive` | Archive completed projects or ended client relationships. | `operator` | `vault_write`, `destructive` | Archive, index, and status alignment confirmed. | Project moved/statused without broken retrieval paths. |
| `vault-review-brief` | Generate review context-transfer briefs. | `review-prep` | `vault_write` | Changed files and links verified; character counts checked when needed. | Brief saved or returned with touched files listed. |
| `vault-review-peer` | Draft peer reviews from vault evidence. | `operator` | `vault_write` | Changed files and links verified; character counts checked when needed. | Draft saved or returned with limits respected. |
| `vault-self-review` | Draft self-review material from vault evidence. | `operator` | `vault_write` | Changed files and links verified; character counts checked when needed. | Draft saved or returned with limits respected. |
| `vault-slack-scan` | Scan Slack for person or project context. | `operator` | `external_read`, `vault_write` | External evidence labeled; changed files and links verified. | Vault-ready evidence/context returned or saved. |
| `vault-standup` | Morning kickoff from task, calendar, and vault context. | `assistant` | `external_read`, `vault_write` | External evidence labeled; `Home.md` changes verified. | Priorities and touched files reported. |
| `vault-stash-session` | Create a compact resume note for continuing paused or interrupted vault work in a later runtime session. | `operator`, `vault-librarian` | `read_only`, `vault_write` | Resume note exists; required sections present; `harness/memory.md` links to resume notes. | Dated resume note saved under `harness/resume/`; future resume prompt returned. |
| `vault-weekly` | Weekly synthesis across activity, North Star, patterns, candidate review evidence, and priorities. | `operator` | `read_only`, `vault_write`, `external_read` | External evidence labeled; changed files and links verified. | Weekly synthesis saved or returned. |
| `vault-wrap-up` | End-of-session vault review and memory/workflow cleanup. | `review-evidence` when review evidence is in scope | `read_only`, `vault_write` | Changed files and links verified. | Session changes reviewed; touched files listed. |

## Validation Command

Run this before declaring workflow architecture stable:

```sh
node .agents/scripts/gate.mjs
```
