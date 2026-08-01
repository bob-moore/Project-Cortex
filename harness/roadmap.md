---
date: 2026-08-01
description: Deferred harness capabilities and maturity checkpoints.
tags:
  - harness
  - roadmap
updated: 2026-08-01
---

# Roadmap

This note tracks deferred architecture work that should remain visible but is
not part of the current operating contract.

## Deferred Architecture

### Runtime Hygiene: QMD, Startup Context, And Adapter Portability

Status: complete 2026-08-01 — maintenance only

Track the cross-runtime cleanup in `harness/roadmaps/runtime-hygiene.md`.

Vault-local QMD storage (Phase 1), Codex/Claude/Gemini hook protocol
compatibility (Phase 2), SessionStart context shrinkage (Phase 3), graphify
scope cleanup and retrieval guidance (Phase 4), and the unified read-only
runtime-hygiene maintenance check (Phase 5) are implemented and pass the gate.
Future work is maintenance only: rerun the check after runtime or graph changes
and rebuild graphify explicitly when its derived output is stale.

### Developer Role Expansion And Documentation Curation

Status: in progress — Slices 1-4 done, promote/reject decision (Slice 5)
remaining

Track the unfinished Developer role expansion in
`harness/roadmaps/developer-role-expansion.md`.

Debugging, code review, acceptance tests, git workflow, and Cloudflare
operations are done. Dependency maintenance, performance remediation, and
release/deployment boundaries are deliberately closed pending a concrete
need, not queued — same no-speculative-build stance as Design. The
documentation-curation pattern, one source map (`astro`), and the
`skill-doc-refresh` skill were built first (Slices 1-3). Slice 4 (piloting
Context7 in CLI/skill mode) is now done: four pilot queries against Context7's
public HTTP API — no MCP, no API key — returned accurate, current,
sourceable docs for Astro, WordPress Interactivity API, WordPress Abilities
API, and Cloudflare Workers deploy config. Library IDs were committed to
`astro`'s source map and two new source maps (`wp-abilities-api`,
`wp-interactivity-api`); see `harness/resume/2026-08-01-context7-pilot.md`.
Still open: the promote/reject decision (Slice 5), deliberately held for
several refresh runs rather than one pilot session.

### SEO Discipline And Tool Suite

Status: complete 2026-08-01 — maintenance only

SEO tract is complete through Phase 10: technical/site/page audits, backlinks
and link-building, local/maps, schema, sitemap, the strategy/content
interface, GEO/AEO/SXO, ecommerce/programmatic SEO, Google/DataForSEO
integrations, drift monitoring, and reporting are all registered and
verified. Full detail in `harness/roadmaps/seo.md`. Future SEO work is
maintenance, evidence refreshes, adapter repairs, or explicitly approved new
phase work, not implied continuation.

The rebuild used mature neutral tools rather than installing any imported SEO
package wholesale, porting missing capabilities one at a time through
canonical discipline, workflow, skill, and tool contracts.

### Governed Design Prototyping Workflow

Status: superseded 2026-08-01 — see [[key-decisions]]. No new Design skills,
including a prototype workflow, until a concrete recurring need is
identified. `claude-design` (the source material this section anticipated
using) was rejected outright, not merely deferred. OpenPencil conventions
referenced below will not be defined unless explicitly requested. Left below
for historical context only.

Build this only after more prototype runs reveal the smallest repeatable loop.
The capability should not be a style bundle or a generic inspiration importer.
It should be a vault-neutral workflow that combines the Designer role,
provisional-client/context handling, structured design briefs, reference
collection, OpenPencil artifact creation, responsive/state/accessibility checks,
rendered evidence, and explicit approval before Developer or WordPress handoff.

Before implementation, evaluate the external design resources reviewed during
prototype work and extract only durable methods into project-local skills or
references. Keep visual inspiration, design systems,
motion references, and UI rule catalogs as optional inputs rather than
canonical authority. Define the OpenPencil file/export/version convention,
prototype acceptance matrix, independent review step, and a route for missing
Brand, Voice, Design Tokens, copy, assets, and proof.

Related source material:

- `.agents/disciplines/design/`
- `.agents/skills/design-delivery/`
- `harness/audits/design-skill-import-plan.md`

### Runtime-Neutral Dispatcher

Status: deferred

Review trigger:

- After 2026-10-28, or
- after 30 meaningful workflow dispatches are logged in
  `harness/ledgers/dispatch.tsv`, or
- when the operator explicitly asks to revisit automation.

Intent:

Build a harder dispatcher that resolves workflow matches, chooses runtime and
role, applies approval/budget/trust policy, dispatches bounded work orders, and
requires independent verification before closure.

Current state:

- `.agents/loop/` is scaffold-only.
- `node .agents/loop/loop.mjs --dry-run` may run preflight checks.
- Non-dry-run loop execution is intentionally disabled.
- Native runtime subagents, profiles, or cheaper-model workers are not part of
  the active methodology.

Maturity criteria before implementation:

- The workflow registry has been used in normal work long enough to reveal real
  routing patterns.
- `harness/ledgers/dispatch.tsv` contains enough examples to identify common
  workflows, approval classes, failure modes, and verification needs.
- The trust ledger distinguishes workflows, skills, roles, and adapters with
  useful pass/fail history.
- The budget policy has an operator-approved cap for automated runs.
- Alarm runbooks cover workflow mismatch, failed verification, budget breach,
  adapter drift, and loop preflight failure.
- The dispatcher can be tested in dry-run mode against prior dispatch ledger
  entries before it can execute live work.

Non-goals:

- Do not recreate Claude-specific subagent architecture as the source of truth.
- Do not enable unattended mutation.
- Do not let model cost optimization override workflow contracts, approval
  policy, or verification.

### Self-Improvement Loop

Status: partially built — see `harness/roadmaps/self-improvement-loop.md`.

The session-diary substrate shipped 2026-08-01: `harness/session-diary/`,
written by `vault-wrap-up` §8 when a session has correction or preference
signal. That's pure data collection, no rewriting, still fully manual (only
fires when wrap-up is invoked).

`.agents/skills/voice-interview/SKILL.md` (2026-08-01) covers manual, human-
confirmed Voice-note creation and refresh — it is not the automatic
correction-capture promotion loop this roadmap describes. Still deferred:
automatic correction-capture for writing voice and design taste (low blast
radius, one client's Voice note), evidence-accumulation for SEO (higher
blast radius, a shared skill), and the periodic synthesis pass that would
read the diary and surface patterns. Explicitly not autonomous —
proposes changes for approval, never auto-writes, and requires the same
tested-baseline precondition as the Runtime-Neutral Dispatcher above before
any of it runs.
