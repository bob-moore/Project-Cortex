---
date: 2026-07-23
description: "Internal MVP: Astro + Git-native content as an alternative to WordPress builds, with a non-technical editing path for SEO/marketing staff. Proof-of-concept stage — architecture has already pivoted once and may again."
project: Astro Publishing Platform MVP
status: active
quarter: Q3-2026
tags:
  - work-note
  - project/astro-publishing-platform
---

# Astro Publishing Platform MVP

## Context

Internal initiative, no client attached yet: an alternative to WordPress site builds using Astro for low-touch clients and staff-managed content work. Bob identified [[Aalair Home Care]] as a good-fit client profile because they explicitly do not want to touch their own site, but the idea needed a non-technical editing path for [[Tony Hanson]], [[Hannah Mecartney]], and similar SEO/marketing staff before it could become a real offering. This project is the attempt to close that gap.

Two open challenges framed at kickoff:
1. **Selling it internally/to clients** — positioning this as "Astro" undersells it and invites a technology argument. The stronger framing (from a ChatGPT conversation Bob worked through, captured below) is removing WordPress's actual pain points — plugin breakage, theme conflicts, no history/rollback, waiting on a developer for small changes — not swapping one CMS for another.
2. **Empowering SEO/marketing staff to edit without code** — the actual blocker that's stalled this idea since 2026-07-17.

## Core framing (from a ChatGPT working session, 2026-07-23)

- Don't pitch "replacing WordPress with Astro." Pitch "removing the annoying parts of WordPress": no plugin updates, no editor breakage, automatic preview links, Git-based rollback/history, AI-assisted page drafting.
- Reframe the internal metric: not "can we build sites without WordPress" but **"can an SEO specialist complete ~95% of their daily work without asking a developer?"** — publishing, page edits, metadata, redirects, schema, landing pages, new components via AI request. If yes, developers shift from page-builders to platform engineers.
- Philosophical core: the LLM should operate *inside* the design system's constraints (propose structured intent), not generate arbitrary code. The app/control plane validates and executes; the model doesn't get direct write access.
- Naming matters: call it a **Platform** (Publishing/Content/Agency/Operations), not a CMS — a platform implies "how we build, review, approve, and publish," not just "go edit pages."
- Deliberately rejected the emerging "Astro CMS" pattern (e.g., Emdash) that moves content into a database — that reintroduces WordPress-shaped problems (what's canonical, how do you diff/branch/review a DB row) and defeats the goal of Git as sole source of truth, full history, portability, no vendor lock-in.

## Architecture — status: proof-of-concept, expect this to keep changing

This project is early enough that the architecture has already pivoted once (below) in the same day it was scoped. Treat everything in this section as current best thinking, not a locked design — update in place rather than treating a revision as a failure of the earlier version.

### v2 (current, 2026-07-23): fully decentralized — no custom control plane

Staff connect their own LLM client directly to GitHub's MCP server; every guardrail lives in the repo itself via native GitHub/Cloudflare primitives instead of a bespoke app.

- **Client:** a staff member's LLM client connected to GitHub MCP — no terminal, no local setup beyond a one-time connector config per person. Access is scoped through GitHub org **teams**, so a staff member gets write access to only the repos they actually work in; the operating principle is narrow scoped access implemented with GitHub's own permission system rather than custom code.
- **Instructions layer, two files:** an `AGENTS.md` at repo root (prose: voice/tone, page-type definitions, allowed components, "don't touch `components/`/`design/`/`schema/` directly, open an issue instead") mirrored into runtime-specific adapter files where needed. Plus a machine-readable site manifest (`.agency/site.config.json`-style: content paths, allowed section types, validation commands) that CI actually checks against.
- **Guardrails — CODEOWNERS + CI, nothing custom:** `CODEOWNERS` requires Bob's review on `components/`, `design/`, `schema/`, `.github/`; `content/` and `data/` need no human reviewer. A GitHub Actions workflow runs `astro build`, content-schema validation, internal-link checks, meta-description length, JSON-LD validation on every PR. Branch protection requires that check to pass before merge. Net effect: a content-only PR can merge with no human in the loop; anything touching protected paths is blocked until reviewed — enforced by GitHub itself, not application code.
- **Preview & promote — reusing Cloudflare's branch model:** `main` is *not* Cloudflare's configured production branch — every merge to `main` builds/deploys as a staging-like environment. A separate `production` branch is the real one. "Promote" = merging `main` into `production` — since staff already talk to GitHub's MCP in natural language, this is just another chat request, not a new tool or dashboard.
- **Promote authority:** staff self-promote after checking their own preview. **This is a deliberate current-stage trust/business call, not a technical ceiling** — requiring a second reviewer on promote is easy to add later (Bob or a designated reviewer) once the workflow has proven itself, but requiring it from day one would add real adoption friction while trust is still being built. Revisit post-MVP.
- **What this drops vs. v1:** no GitHub App, no isolated worker, no control-plane database, no chat/job tracking, no site registry beyond "which GitHub team has access to which repo." Meaningfully less to build.

### v1 (2026-07-23, superseded — kept for reference, not deleted)

Original sketch: one shared internal control plane (chat UI, GitHub App, isolated worker, job/approval tracking in its own database) sitting in front of many independent site repos, with Keystatic as interim form-based scaffolding. Superseded because v2 achieves the same guardrails (validated changes, previews, an approval gate on sensitive paths) using GitHub/Cloudflare's own primitives instead of a bespoke app — less to build, same safety properties. Keeping this section rather than deleting it in case a future need (e.g. a curated chat UI, client-facing approval flow, or cross-site bulk operations) brings back a reason for a control plane layer.

- Each client site as its own GitHub repo + Cloudflare project + domain + content.
- Control plane holds only operational state (auth, site registry, chat/job history, PR/preview refs, approvals) — legitimately fine as a database since it isn't website content.
- Chat flow: staff describe intent → LLM returns *structured* intent, not raw code → an isolated worker applies it on a branch, validates, opens a PR → Cloudflare branch preview → approve → merge.
- Phasing was: (1) chat+preview control plane with Keystatic still active, (2) pull common SEO functions (metadata, schema, redirects, internal links) into the control plane, (3) retire the rest of Keystatic only if staff behavior shows it's still needed.

## Test pilot: garagedoorguru.net (started 2026-07-23)

First concrete build-out: Codex is scaffolding a test site at `~/Dev/Sites/garagedoorguru` (empty/just started as of 2026-07-23), targeting a rebuild of the real, currently-live [garagedoorguru.net](https://www.garagedoorguru.net/) as a benchmark — recreate an existing real site on this stack rather than building something greenfield/synthetic, to get an honest read on how the platform handles real content and layout.

**Not a client engagement.** Garage Door Guru has no `Clients/` or `Prospects/` note — there's no agency relationship, contract, or contact on file; this is a technical rebuild exercise using their public site as a realistic test target, not agency work being done for them. Flag if that changes (e.g. if this turns into actual outreach to them) — at that point it needs a real `Prospects/` note.

**Decided (2026-07-23):** the test site won't ship under Garage Door Guru's actual name/branding or reuse their real photos — made-up business name plus stock imagery, to avoid the copy/imagery-rights issue flagged above while still testing against a realistic real-world page structure/layout. Placeholder name: **"Garage Door Company"** — deliberately generic, chosen so it can't be mistaken for any real business.

## Open questions / not yet decided

- Whether this becomes a real client-facing offering or stays internal tooling indefinitely.
- Large media/image uploads through chat (GitHub MCP file operations exist but are clunky for binaries at scale) — fine at MVP content volume, revisit if it grows.
- Whether/how this ever extends to a client-facing (Tier 3) surface — v2 is staff-only; clients aren't holding a GitHub-connected LLM client themselves.
- How this intersects with tiered staff access for SEO/content operators — the dispatch-function model drafted for WordPress-style operations is a plausible template for this platform too, not yet mapped over.
- Whether the garagedoorguru.net rebuild is purely an internal benchmark or could turn into real outreach to that business — not decided, watch for signals either way. [[Aalair Home Care]] remains the other candidate profile discussed (low-touch, doesn't want to self-edit) but nothing is scoped there yet.
- Whether/when to add a second reviewer on the promote step (see promote authority above).

## Action Items
- [ ] Decide MVP scope boundaries concretely (site manifest format, allowed section/component types, validation commands)
- [x] Prototype the fully-decentralized flow end to end on one throwaway repo — underway at `~/Dev/Sites/garagedoorguru` (Codex-built test clone of garagedoorguru.net)
- [ ] Wire up the actual guardrails on the test repo: GitHub team scoping, `AGENTS.md`, CODEOWNERS, CI workflow, two-branch Cloudflare setup, a promote-via-chat request
- [ ] Map Tier 2 dispatch functions for SEO/content operators onto this platform's operations

## Related
- [[Aalair Home Care]] — the client profile that originally prompted this
- [[harness/north-star|North Star]] — current focus for this vault's operating model
- [[harness/operational-methodology|Operational Methodology]] — approval-gated, evidence-backed workflow principles this MVP should follow
- [[Agent OS R&D]] — broader R&D initiative this MVP sits under; that note tracks reference-architecture comparisons for the agentic-OS effort as a whole
