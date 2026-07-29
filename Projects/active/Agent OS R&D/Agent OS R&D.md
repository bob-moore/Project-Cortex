---
date: 2026-07-24
description: "R&D planning initiative for this vault's agentic operating system methodology, runtime-neutral harness structure, workflow gates, and role/skill conventions."
project: Agent OS R&D
status: active
quarter: Q3-2026
tags:
  - work-note
  - project/agent-os-rd
---

# Agent OS R&D

## Context

R&D initiative for this vault's agentic operating system methodology: client engagements, website development and design, copy/content, SEO, decisions, optional review material, and multi-runtime agent operation. This note is the running log for architecture comparisons and role/skill/workflow design.

Current source-of-truth docs live in `harness/` and `.agents/`. Older sections below preserve useful exploration notes from the previous system and should not override the current methodology.

## Next Action

Current operating focus is the methodology rebuild now documented in [[harness/operational-methodology|Operational Methodology]], [[harness/workflows|Workflows]], and [[harness/skills|Skills]]. Treat the older task list below as historical project context unless Bob explicitly resumes one of those threads.

- [ ] Continue vault organization from bottom-level folders upward.
- [ ] Build remaining skill disciplines one at a time, starting from canonical methodology instead of inherited runtime assumptions.
- [ ] Validate the harness from a fresh runtime session once the current organization pass is clean.

## Prior Task List

- [ ] Resume the onboarding-depth brainstorm from the previous architecture work only if Bob asks to reopen that thread.
- [x] Close out previous-system residue still to migrate.
- [x] Turn the writer mode expansion and skill reconciliation into an ordered implementation plan.

## Scope correction (2026-07-24) — replacing OM, not improving it

**Important framing correction from Bob, must not drift back.** This initiative is not "add features to om" or "enhance obsidian-mind." It is a **replacement**: `om` (this vault's current `.claude/commands/`, `.claude/agents/`, `brain/`, hooks — everything documented in this vault's `CLAUDE.md`) is the **starting scaffold**, not the destination. The destination is a new system, working name **"Jarvis"** (matching the [jarvisdaily.com](https://jarvisdaily.com/agent-os/) framing that kicked off this R&D). Concretely: even the commands will change — `standup`, `kickoff`, etc. are not assumed to survive in their current form. Every comparison finding logged in this note (reference-architecture gaps, the obsidian-second-brain head-to-head) should be read as **input to a new design**, not a punch list of things to bolt onto the existing `om-*` command set.

**New roadmap item: a dashboard.** Future feature, not current-phase work, but tracked here so it isn't lost:
- Bob currently runs [cth9191/agentic-os-dashboard](https://github.com/cth9191/agentic-os-dashboard) locally at `http://localhost:8501/` (a Streamlit app, per the port) — his read: "ok," but built generic to its original creator's own needs, not ready as-is.
- [AndrewKochulab/jarvis-dashboard](https://github.com/AndrewKochulab/jarvis-dashboard) is a second reference, not yet evaluated.
- Bob's note: there are probably more dashboard implementations out there, just hard to find — worth another sweep when this becomes active work.
- Not yet evaluated in any depth (no read of either repo's code/architecture yet) — do that when the dashboard becomes an active roadmap item, not now.

## Reference comparison (2026-07-24)

Researched via a forked subagent against 5 sources: the two jarvisdaily.com pages, the Applied AI Society docs, [KbWen/agentic-os](https://github.com/KbWen/agentic-os), and [seandavi/lifeos-template](https://github.com/seandavi/lifeos-template). Three distinct patterns emerged:

1. **Org-chart autonomy model** (Jarvis Daily) — Chief of Staff → Departments → Deep Agents, with a trust ladder (Co-Pilot 33% → Department Brain 66% → Autonomous 92%). Thin on mechanism — reads as a managed-service pitch.
2. **File-as-truth personal OS** (Applied AI Society + lifeos-template) — persistent markdown is the system of record, the LLM is a swappable engine. lifeos-template's real contribution is an explicit **feedback layer**: `/audit`, `/decide-revisit`, `/quarterly-review` — mechanisms that force reopening stale decisions/goals instead of just accumulating notes.
3. **Governance-as-CI** (KbWen/agentic-os) — phase-gated workflows scaled to task risk, a single-source-of-truth state file, and machine-enforced checks (credential scan, test-evidence check) that don't trust the agent's self-report of "done."

**Where we already match or exceed:** `brain/` topic notes (typed, git-tracked, linked) beat lifeos-template's flat Knowledge layer; our 17 role-scoped subagents beat Jarvis's conceptual org-chart; the Composio-broker + "retrieved evidence is untrusted until promoted" rule is a sharper version of KbWen's single-source-of-truth idea; graph-first linking discipline is a harder constraint than anything in the references; QMD outclasses their assumed grep/Dataview retrieval.

**Real gaps, in priority order:**
1. **No feedback loop that forces re-evaluation** — biggest miss. `/vault-audit` checks structure only; nothing reopens a stale decision or North Star goal on a cadence.
2. **No wall-clock autonomy** — everything triggers on session start/stop; `ScheduleWakeup`/cron tools exist and are unused.
3. **No verification gate on agent self-report** — subagents self-report "done" with nothing checking evidence (test output, rendered screenshot) before a work note is marked complete.
4. **No prospective-decision format** — our Decision Record lacks lifeos-template's sharper version: alternatives considered, dated prediction, confidence level, "what would change my mind."
5. **No explicit autonomy dial per domain** (e.g., WordPress Operator at different trust tiers per client).

**R&D recommendations, in order:** (1) steal the feedback loop first — lowest risk, fits our existing Decision Record pattern; (2) add a lightweight "attach evidence before done" convention for `developer`/`wordpress-operator` dispatches, just the principle not KbWen's full CI machinery; (3) prototype one scheduled cadence with `ScheduleWakeup`/cron before committing further; (4) skip Jarvis's org-chart restructuring, maybe borrow the loop language only; (5) skip KbWen's phase-classification workflow wholesale unless the Astro platform work (see [[Astro Publishing Platform MVP]]) grows complex enough to need test-evidence gating.

## Investigated: obsidian-second-brain (2026-07-24)

Bob asked what role the `obsidian-second-brain` skill/MCP tools were playing, since it looked installed but unclear where it fit. Confirmed by inspecting disk: it is **not** part of this vault or the `om-*` system at all.

- Lives entirely at `~/.claude/skills/obsidian-second-brain/` — a global (user-level) skill, a separate open-source project (github.com/eugeniughelbur/obsidian-second-brain), not this vault's own `.claude/skills/` (which only has `obsidian-bases`, `obsidian-cli`, `obsidian-markdown` — the kepano/obsidian-skills set this vault's CLAUDE.md documents).
- Not registered in this vault's `.mcp.json` (which only registers the `qmd` server) — the `mcp__obsidian-second-brain__*` tools available in-session come from that global skill's own bundled MCP server, not anything wired to this project.
- It's a mature, parallel implementation of very similar ideas: 44 commands, presets (executive/builder/creator/researcher), an "AI-first vault rule" (self-contained notes, recency markers, confidence levels), a **bi-temporal facts** pattern (never overwrite a changed fact, append a `timeline:` array with event-time + transaction-time), a "never create in isolation" propagation table, and its own `_CLAUDE.md` (underscore-prefixed) bootstrapping convention distinct from this vault's `CLAUDE.md`.
- **Currently plays no active role** — it's dormant here. Its own trigger logic checks for `_CLAUDE.md` (which doesn't exist in this vault) and would otherwise try to impose foreign defaults (kanban boards, its own frontmatter schema) if it ever fired. Per the standing skill-priority rule (user/project instructions override skills), this vault's own `CLAUDE.md` should always win in a conflict — but that's a soft protection, not a hard block, since the skill's own trigger description is broad enough ("whenever the user asks Claude to read, write, update, search, or manage their Obsidian vault") to plausibly match generic requests in this vault too.
- **Likely origin:** installed globally while exploring vault-management approaches before settling on the custom obsidian-mind fork (`om-*` commands) — probably around the same time frame as the `om` command investment, per Bob's own recollection.
- Logged as a gotcha in [[Gotchas#obsidian-second-brain is a dormant global skill with a broad vault-management trigger]] since the collision risk applies to any vault, not just this R&D conversation.
- Worth mining for ideas during this R&D phase even though it stays dormant as an active system: the bi-temporal facts pattern and the "never create in isolation" propagation table are both sharper than anything currently in this vault's own conventions.

## obsidian-second-brain vs. OM — head-to-head (2026-07-24)

Read `architecture.md` in full to go beyond the SKILL.md skim. Net read: **not real competitors on features** — OSB is a generic, portable PKM operating layer (44 commands, compiles to 6 AI CLIs via build-time adapters, bootstrap presets for a brand-new vault); OM is a domain-specific agency-delivery system OSB doesn't attempt to be. The collision risk logged in [[Gotchas#obsidian-second-brain is a dormant global skill with a broad vault-management trigger]] is about trigger phrasing, not redundant capability.

- **Command surface barely overlaps** — OSB's commands are generic PKM verbs (save/daily/log/task/board/decide/research); OM's are agency-workflow-specific (kickoff dispatch, incident-capture, review-brief). OSB has no equivalent of `kickoff`'s dispatch-with-approval model at all.
- **Agent/role model is the biggest structural difference** — OM's tool-scoped delivery subagents (`writer`, `developer`, `wordpress-operator`, etc.) have no OSB analog; OSB's only agent-like feature is an opt-in, additive-only background hook that propagates session summaries, not a role/dispatch system.
- **Both mechanically enforce note-writing via a PostToolUse hook** (their `validate-ai-first.sh`, our `validate-write.ts`) — same mechanism, different schema. Their schema is generic-but-rigorous (`## For future Claude` preamble, confidence levels, recency markers, and **bi-temporal `timeline:` facts** — a real gap in ours, worth adopting for things like client contact/stack changes). Ours is domain-typed (Gotchas/Patterns vs. Client/Project/Person) rather than one uniform shape.
- **Real capability gap, not just style: OSB has a built-in research toolkit** (Perplexity/Grok/Gemini when keyed, ~10 free public sources as fallback, YouTube transcript + podcast RSS ingestion, all as first-class commands). We do the equivalent ad hoc (WebFetch/defuddle/Composio per task) with no formal fallback-source system.
- **Governance rules are the same idea, different vocabulary** — their "never create in isolation" propagation table ≈ our "Maintaining Indexes" + graph-first linking; their anti-fabrication rule is consolidated into one named canonical rule where ours is spread across CLAUDE.md (Composio's "untrusted evidence" language) — worth consolidating similarly at some point.
- **Useful borrowed gotcha regardless of adoption**: OSB documents that custom slash commands don't expand in non-interactive/headless mode — a cron job must target underlying logic or a wrapper, and launchd needs an explicit `PATH` since launchd strips the environment. Directly relevant once we prototype recommendation #3 above (a scheduled cadence via `ScheduleWakeup`/cron).
- **Worth stealing, in order:** bi-temporal facts pattern, the research-toolkit fallback design, the headless-cron gotcha, the consolidated-anti-fabrication-rule framing.

## Target role structure — Bob's org chart vision (2026-07-24)

Bob's mental model, direct from conversation: an org chart similar to [jarvisdaily.com/agent-os](https://jarvisdaily.com/agent-os/) (Chief of Staff → Departments → Deep Agents), but with an explicit two-phase build order:

- **Phase 1 (current target): no orchestration layer.** Each role is directly invokable — Bob's own framing: "being able to invoke `/writer`, or `/developer` and dispatch tasks directly, as opposed to relying solely on a black box of agent calls." Each role carries its own deep skills/sub-specialties underneath.
- **Phase 2 (deferred, not skipped): layer the C-Suite/Orchestrator on top** only once Bob is confident the Phase 1 roles work as needed directly. Don't build the orchestrator early — validate the flat role layer first, then add the routing layer above it.

### The role list (verbatim)

- **Writing** — Web Copy, Ads Copy, Email Copy, Blog Copy, Editor, Humanizer
- **Marketing** — SEO, Ads/Paid, Social, Email
- **Designer** — Editor, UX/UI Tester
- **Developer** — Testing/QA/Approval, etc.
- **Assistant**
- **Project Manager**
- **Business Analyst / Researcher**
- **Vault Operator / Librarian**

### Mapping against current `om` inventory (reference only, not a commitment to reuse as-is)

- **Clean matches already in `om`:** Project Manager ≈ `project-manager` agent (already read-only Monday.com + vault workload briefing); Vault Operator/Librarian ≈ `vault-librarian` + `cross-linker`; Engineering ≈ existing `developer`/`wordpress-operator` split, though that split is by source-of-truth (code vs. mutable site state), not by task type like "Testing/QA/Approval" — open question whether QA becomes a Developer sub-role or stays the cross-cutting `web-quality-verification` skill; Designer ≈ existing `designer` agent, with "UX/UI Tester" partially precedented by `web-quality-verification` but currently owned by no one.
- **Granularity increase, not new capability:** Writing ≈ existing `writer` agent's modes (website-copy/blog-article/SEO-refresh/case-study) plus `copy-editor` and `humanizer` (`/vault-humanize`) skills — Bob's list promotes those modes to sibling top-level roles. Ads Copy and Email Copy have no direct precedent as *copy-drafting* modes today (only `ad-campaign-management`/`newsletter-management` strategy/execution skills).
- **Genuinely new top-level groupings (skills exist, no agent owns them today):** Marketing (SEO/Ads/Social/Email skills exist: `seo-and-aeo-strategy`, `ad-campaign-management`, `social-media-management`, `newsletter-management` — no dispatcher role); Business Analyst/Researcher (`market-research-analysis`, `competitor-analysis`, `data-and-funnel-analytics`, `growth-strategy` — no agent); Assistant (no precedent at all — today this is ad hoc Composio calendar/email/Monday retrieval done inline by whichever session needs it, plus `context-loader`).

**Net read:** roughly half the target org chart is "give an existing capability a proper directly-invokable front door," the other half is "stand up a role where today only a skill exists with no owner." Useful frame for scoping Phase 1 work later — the first half is mostly interface work, the second half needs real role design.

## Resolved — nested subagent support across harnesses (2026-07-24)

Raised while discussing how "Marketing" (or any role) with sub-specialties could dispatch them. Bob ran a self-report prompt directly against Codex, Hermes, and Antigravity (each asked to introspect its own actual implementation, not aspirational docs). Combined with Claude Code's own confirmed constraint, the four harnesses split cleanly into two camps:

**Flat / top-level-only dispatch (matches Claude Code):**
- **Claude Code** — confirmed, subagents cannot invoke the Agent tool themselves (see [[Key Decisions#2026-07-07 — Six agency-work agents added...]]); `Workflow` scripts can fan out to many agents but nesting a `workflow()` inside a child throws — one level only.
- **Codex** (codex-cli 0.145.0) — has `multi_agent_v1.spawn_agent`, but Codex empirically probed a spawned child and confirmed it cannot see `multi_agent_v1.*` itself. No pipeline/workflow primitive beyond raw spawn/manage; `multi_tool_use.parallel` parallelizes tool calls, not agents. `multi_agent_v2` exists as a feature flag but is not yet stable.

**Genuine nested/recursive delegation supported:**
- **Antigravity** (Gemini 3.6 Flash, DeepMind harness) — real recursive spawning via `invoke_subagent`/`define_subagent`. A `self`-type child inherits the full toolset including further spawning ability; custom subagents have spawning disabled by default (`enable_subagent_tools: false`) unless the parent explicitly turns it on. Has genuine parallel fan-out (array of subagent defs in one call), inter-agent messaging (`send_message`), and workspace isolation modes (inherit/branch/share, git-worktree-like). Depth/context-loop bounds are handled by the underlying harness, not model-exposed. Of the four, this is the closest match to Bob's original literal "Marketing agent invokes SEO/Ads/Social/Email agents" org-chart tree.
- **Hermes** (v0.18.2, Nous Research) — supports it via `delegate_task`, gated by config: `delegation.max_spawn_depth` defaults to 1 (flat, matching the other camp by default), but is operator-configurable with no hard ceiling — raising it to 2+ lets a child take an "orchestrator" role and spawn its own leaf grandchildren. Children inherit parent toolsets minus role-based restrictions (leaf children lose `delegate_task`/`clarify`/`memory`/`send_message`/`execute_code`/`cronjob`; orchestrators regain `delegate_task`). Has native parallel batch fan-out/fan-in via `delegate_task`. **Also has Kanban** — a separate, durable SQLite-backed task board/dispatcher: independent worker processes, parallel-ready tasks, sequential workflows via task dependencies, retries, stale-claim recovery, human intervention, runnable from CLI/scripts/cron/dashboard. This is orchestration by *configuration/dispatcher*, not by one agent's context calling another's — durable past any single conversation, unlike `delegate_task`.

**Implication for Jarvis:** the two harnesses this vault actually runs on today — Claude Code, and Codex (already used directly for dev dispatch per the existing control-plane rule) — are both flat/top-level-only. So Phase 1's practical constraint doesn't change: Pattern A/B (mode-switching within one agent, or sibling agents dispatched from the top level) still governs, regardless of what Antigravity/Hermes can do, unless Jarvis deliberately expands onto one of those harnesses. **Worth carrying into Phase 2 design specifically:** Hermes' Kanban model — a durable dispatcher assigning work to worker agents, not an agent calling an agent — sidesteps the nesting-capability question entirely and is a real candidate shape for the eventual C-Suite/Orchestrator layer, independent of which harness ends up hosting each role.

## Resolved — folder nesting for conceptual (not functional) sub-agent grouping (2026-07-24)

Bob's call after the harness comparison above: since Claude Code/Codex are both flat/top-level-only dispatch, sibling agents (Pattern B) are acceptable — but he wants them to conceptually read as "sub-agents" under a parent role even though they technically aren't. Verified via the `claude-code-guide` agent against current official docs (code.claude.com/docs/en/sub-agents.md):

- **`.claude/agents/` discovery is fully recursive** — subfolders like `agents/marketing/seo.md` are discovered and loaded exactly like a flat file.
- **For project/user-scoped agents (what this vault uses), the folder path is purely cosmetic** — invocation identity comes only from the `name:` frontmatter field, never the path. So folders can mirror the org chart (`agents/writing/`, `agents/marketing/`, `agents/design/`, `agents/engineering/`, etc.) with zero effect on how each agent is actually invoked — every file stays a flat, independently-invokable sibling underneath.
- **Caveat 1 — name uniqueness is tree-wide, not per-folder.** Two files anywhere under `.claude/agents/` sharing a `name` causes a non-deterministic load (filesystem read order, no documented tie-break). `/doctor` (v2.1.205+) can detect same-directory collisions — run it after any reorg.
- **Caveat 2 — plugins behave differently.** If these agents ever ship inside a Claude Code *plugin's* `agents/` directory rather than plain project-level `.claude/agents/`, folder paths DO get namespaced into the invocable identifier (e.g. `my-plugin:review:security`). Not relevant to the current plain project-level setup, but relevant if Jarvis is ever packaged as a plugin.
- Separately (not the concern here, but noted): subagents are also discovered by walking up from cwd through every `.claude/agents/` between cwd and repo root; if the same `name` exists at multiple such levels, the one closest to cwd wins (v2.1.178+) — a different collision mechanism than the same-directory case above.

**Practical plan:** new roles get folders under `.claude/agents/` matching the org chart (e.g. `agents/marketing/seo.md`, `agents/marketing/ads.md`, `agents/marketing/social.md`, `agents/marketing/email.md`), purely for Bob's own mental model — invocation, tool grants, and dispatch all continue to behave exactly as the existing flat 17-agent set does today.

## Resolved — skills do NOT support folder nesting like agents (2026-07-24)

Follow-up to the agent-folder-nesting finding above, verified via the same `claude-code-guide` continuation against current docs (code.claude.com/docs/en/skills.md). **Skills and agents are not symmetric — don't assume parity:**

- Agent docs explicitly state recursive subfolder scanning under `.claude/agents/`. Skill docs define discovery strictly as `.claude/skills/<skill-name>/SKILL.md` — one level, no stated subfolder recursion within a single root.
- The `apps/web:deploy`-style path-prefix behavior noted in the Skill tool's own description is about **separate `.claude/skills/` directories at different levels of a monorepo** (a package/subdirectory providing its own skills, loaded when Claude touches a file in that subdirectory) — unrelated to organizational grouping within one root.
- **Conclusion: do not nest skill folders** (e.g. `.claude/skills/writing/blog-editor/SKILL.md`) expecting discovery — contradicts the documented flat pattern, unverified.
- **Safe alternative for conceptual grouping**: a naming-convention prefix on the flat skill folder itself, e.g. `.claude/skills/writing-blog-editor/` instead of `.claude/skills/blog-editor/` — stays flat and discoverable, reads as grouped, and is inherently one level deep (matches the "not too granular" constraint by construction).

## Wiring started (2026-07-24) — existing agents reorganized into role folders

Mechanical reorg only — no new agent content authored yet, just relocation to set up the folder scaffold discussed above. Verified safe first: `.claude/scripts/tests/delivery-agents.test.ts` hardcoded 4 literal agent paths and asserts specific content patterns from the careful 2026-07-21 Developer/WordPress/Writer/Designer boundary decisions (see [[Key Decisions]]) — updated those 4 path strings to match the new locations; suite still passes 12/12 (`node --experimental-strip-types --test .claude/scripts/tests/delivery-agents.test.ts`).

**Moved:**
- `agents/writing/` — `writer.md`, `web-copywriter.md`, `blog-writer.md`
- `agents/engineering/` — `developer.md`, `wordpress-operator.md`
- `agents/design/` — `designer.md`
- `agents/vault-operator/` — `vault-librarian.md`, `cross-linker.md`

**Left untouched / unmapped to the 8-role org chart** (flagged, not decided): `project-manager.md` (single-agent role, no folder benefit yet), `strategist.md`, and the maintenance/utility agents `context-loader.md`, `brag-spotter.md`, `review-prep.md`, `review-fact-checker.md`, `slack-archaeologist.md`, `people-profiler.md`, `vault-migrator.md`.

**Open assumptions Bob may correct:**
1. WordPress operations were initially placed beside Developer; the later department deep dive resolved the parent department as `engineering/` and the role name as `wordpress-operator`.
2. Writer/web-copywriter/blog-writer were only relocated, **not split**. Bob's target list wants Web Copy/Ads Copy/Email Copy/Blog Copy/Editor/Humanizer as real sibling agents — that's still greenfield design work, not done in this pass.
3. Where Editor (design-conformance, distinct from Writing's Editor) and UX/UI Tester fit for Designer, and Testing/QA/Approval for Developer, are still undesigned — only folders exist, no new files yet.

## Department classification finished (2026-07-24)

Bob's instruction: finish sorting every agent into a department before diving into individual disciplines later. His list is a starting point, not final — expect more/fewer departments over time. Final `.claude/agents/` tree after this pass:

```
agents/
├── project-manager.md          (own department, single agent — no folder needed yet)
├── design/
│   ├── designer.md
│   ├── creative-designer.md      (placeholder)
│   └── design-reviewer.md        (placeholder)
├── engineering/
│   ├── developer.md
│   ├── frontend-developer.md     (placeholder)
│   ├── backend-developer.md      (placeholder)
│   ├── wordpress-operator.md
│   ├── qa-engineer.md            (placeholder)
│   └── platform-operator.md      (placeholder)
├── writing/
│   ├── writer.md                (unsplit — still the unified multi-mode agent, not yet broken into Web/Ads/Email/Blog Copy + Editor + Humanizer)
│   ├── web-copywriter.md
│   └── blog-writer.md
├── marketing/                   (all placeholders — nothing built yet)
│   ├── seo.md
│   ├── ads-paid.md
│   ├── social.md
│   └── email.md
├── strategy/strategist.md
├── researcher/review-fact-checker.md   (only this one moved here per Bob's explicit instruction; "will get more" later)
└── operations/                  ("all vault/om specific agents" per Bob's instruction)
    ├── context-loader.md
    ├── brag-spotter.md
    ├── review-prep.md
    ├── slack-archaeologist.md
    ├── people-profiler.md
    ├── vault-migrator.md
    ├── vault-librarian.md
    └── cross-linker.md
```

**Placement notes / open to correction:**
- `review-prep.md` and `slack-archaeologist.md` both do evidence-gathering/verification work arguably closer in spirit to `review-fact-checker` (Researcher/Analyst) than vault-hygiene maintenance — but Bob's instruction was literal ("this should have the review fact checker for now, but will get more"), so they stayed in Operations by the literal reading rather than my own functional guess. Easy to move later — path is cosmetic per the earlier nesting finding, no invocation impact either way.
- Marketing placeholders are inert by design: `tools: Read` only, description explicitly says "PLACEHOLDER — do not dispatch for real work yet." Named `seo`, `ads-paid`, `social`, `email` — flagging that `email` (Marketing) and a future `email-copy` (Writing, still unbuilt) are different names, no collision, but worth keeping distinct on purpose given both departments touch "email."
- The `engineering/` folder represents the broader **Engineering / Technology** department. `developer` owns full-stack and hybrid repository work; `wordpress-operator` owns mutable WordPress application state; the specialist siblings remain inert placeholders until their contracts are built and validated.
- Verified safe throughout: no hardcoded path references broken (checked before every move), `.claude/scripts/tests/delivery-agents.test.ts` still passes 12/12 after the full reorg.

**Explicitly deferred, not forgotten:** actually designing/splitting Writing into its six sub-roles and building out real Marketing, Assistant, and Business-Analyst agents. Designer and Engineering now have named placeholder siblings, but those files are not executable role contracts yet.

## Working principle — no legacy scar tissue in Jarvis docs (2026-07-24)

Bob's correction after reviewing the department reorg: new Jarvis documentation must not carry forward "don't do X" references to workflows from the system being replaced (example cited: `CLAUDE.md`'s Control-plane rule narrating the old Agent Ops queue history). If a deprecated workflow doesn't exist in Jarvis's design, it shouldn't be mentioned at all — the absence is the guardrail; agents shouldn't need historical context to avoid something that was never an option for them. Full rule logged in [[Patterns#New Jarvis documentation should never carry forward "don't do X" scar tissue from a system being replaced]] since it governs all future authoring, not just this note.

**Scope assumption (flagged for correction):** treated this as forward-looking guidance for new Jarvis-era docs (agent files, skills, an eventual `CLAUDE.md` replacement) — not an instruction to retroactively strip the still-live `om`-era `CLAUDE.md`, which remains the active production governance doc until Jarvis actually replaces it.

**Update (2026-07-24) — Bob overrode the above: scrub it now.** He wants this vault copy to become a true fresh start, and will test the before/after vault designs side by side. Given the scale and irreversibility of a full scrub (this copy has no git — nothing deleted here is recoverable within it), took a full snapshot first at `/Users/bobmoore/Obsidian/Work copy - before (OM baseline, 2026-07-24)` before changing anything, so the "before" state is preserved regardless of how far scrubbing goes. Asked Bob to scope how far to go (system/architecture only vs. true blank slate including business data) — **he narrowed it: just the one legacy decision cited originally, for now; the rest gets stepped through later, not swept all at once.**

Executed: rewrote `CLAUDE.md`'s Control-plane rule paragraph (line ~474) to state only current behavior (dispatch/verify ownership stays with the active session; Codex direct-invocation + `wp-mcp` sandbox profile tip) with zero mention of the old Agent Ops queue workflow, the 2026-07-21 role-rework framing, or the 2026-07-22 incident narration that originally justified the rule. Verified no test suite depended on the old wording before editing.

**Explicitly deferred, not forgotten** — a broader grep found 12 other files mentioning "Agent Ops"/"agent-ops" that were NOT touched this pass, since most are real historical business records rather than architecture docs: `Home.md`, `Clients/Brunsell Lumber/Brunsell Lumber Stack.md`, `Projects/active/Brunsell Lumber FAQ Content.md`, `Projects/active/Brunsell Lumber - Website Rebuild.md`, `Projects/active/Educated Mortgage - Website Rebuild.md`, `.claude/agents/engineering/wordpress-operator.md`, `.claude/commands/vault-kickoff.md`, `graphify-out/GRAPH_REPORT.md`, `brain/Gotchas.md`, `brain/Memories.md`, `brain/Patterns.md`, `perf/brag/Q3 2026.md`. Revisit these one at a time later per Bob's direction — distinguish real business-record mentions (leave alone) from remaining "don't do X" architectural framing (candidates for the same treatment as the CLAUDE.md fix).

## Role deep dives

### Designer department (2026-07-24)

Keep `designer` as the stable producer for web/UI visual intent. `creative-designer` is a future campaign and channel-asset producer; `design-reviewer` is a future independent conformance reviewer. Both are read-only placeholders. Web design remains a Designer capability rather than a duplicate Web Designer agent; ad creative starts as a capability and may justify the Creative Designer role once workload or tooling creates a real boundary.

### Engineering / Technology department (2026-07-24)

Keep `developer` as the full-stack/generalist front door for version-controlled code and hybrid tasks. Add read-only placeholders for `frontend-developer`, `backend-developer`, `qa-engineer`, and `platform-operator`; retain `wordpress-operator` as the executable mutable-application operator.

Ownership is split by authoritative state where consequences differ:

- Developer roles own version-controlled implementation and first-party tests.
- WordPress Operator owns mutable WordPress database/application state.
- Platform Operator will own live hosting, server, cloud, DNS, CDN, TLS, deployment, backup, and runtime state.
- QA Engineer will independently verify and return a gate verdict; approval and closure remain with the active parent or human authority.

Frontend and Backend are specialist direct-entry roles for clearly bounded work; cross-stack or uncertain work continues to route to `developer`. Release and security remain capabilities first, not separate agents. None of the four new Engineering files may be dispatched until its execution, permissions, evidence, and evaluation contract is built and tested.

### Department and role naming normalized (2026-07-24)

Applied the organization names to the live filesystem and runtime identities: `design/` and `engineering/` are now the department folders, and the mutable-site role is `wordpress-operator` rather than its former short name. The canonical shared adapter is `~/.agents/skills/wordpress-operator/`, with Codex discovery through `~/.codex/skills/wordpress-operator`. Routing contracts, tests, client Stack notes, role mirrors, and the renamed [[Engineering and WordPress Operator Roadmap]] now use the same identity. Generated `graphify-out/` artifacts retain their prior snapshot until the graph is next regenerated; they are not authoritative routing sources.

## CLAUDE.md rewrite, pass 1 (2026-07-24)

Bob confirmed CLAUDE.md as the starting point for the broader obsidian-mind → Jarvis conversion (agents work now owned by a parallel session + Bob directly, per his instruction, done separately from this note). First pass, scoped narrowly rather than a full top-to-bottom rewrite:

- **Title/identity**: `# Obsidian Mind` → `# Jarvis`; description line changed from "Work brain for..." to "Agentic operating system for..." — clean rename per the no-legacy-scar-tissue principle, no historical "formerly Obsidian Mind" narration.
- **Subagents section**: fully rewritten to match the actual department structure now on disk (`project-manager` flat; `writing/`, `design/`, `engineering/`, `marketing/`, `strategy/`, `researcher/`, `operations/` folders) instead of the old flat 17-row table. Placeholders are called out explicitly ("Placeholder — will..." + a standing note not to dispatch them) rather than mixed in indistinguishably with real agents.
- **Two small consistency fixes**: the `/vault-upgrade` row no longer says "this obsidian-mind instance"; the `.claude/agents/` row in the Vault Structure table now describes department folders instead of a stale "17 subagents" count.
- **Deliberately NOT touched this pass**: the Slash Commands table (still `om-*` naming at the time — see the rename below, done as its own follow-up pass), the 5 hooks section, `vault-manifest.json`, `CHANGELOG.md`, and all the folder-structure/tagging/client-structure conventions, which are business/organizational conventions unrelated to which agent framework runs the vault and don't need to change for the rename.
- Verified safe: grepped CLAUDE.md for remaining "Obsidian Mind"/"obsidian-mind" strings (none left) and re-ran `.claude/scripts/tests/delivery-agents.test.ts` (still 12/12) after the edit.

## Slash commands: `om-` prefix removed (2026-07-24)

Before any writes, checked whether dropping the `/om-` prefix would collide with any other currently-registered command — this vault's own `.claude/commands/`, the global `~/.claude/commands/` (which includes the dormant `obsidian-second-brain` skill's own 44-command set, logged in [[Gotchas#obsidian-second-brain is a dormant global skill with a broad vault-management trigger]]), and every installed plugin's `commands/` folder. **Zero collisions found** across all 19 shortened names. Bob confirmed: proceed with the rename now; the skills-import/adaptation question (whether to pull in ideas from `obsidian-second-brain` or other reviewed skill sets) is separate future work, not blocking this rename.

Executed:
- Renamed all 19 files in `.claude/commands/` (`om-standup.md` → `standup.md`, etc. — full list: `standup`, `dump`, `wrap-up`, `humanize`, `weekly`, `capture-1on1`, `incident-capture`, `slack-scan`, `peer-scan`, `review-brief`, `self-review`, `review-peer`, `vault-audit`, `vault-upgrade`, `prep-1on1`, `meeting`, `intake`, `project-archive`, `kickoff`). Command identity in Claude Code is filename-based (no `name:` frontmatter field like agents have), so the rename is the invocation change — confirmed live in-session immediately after (the Skill/Agent tool listings picked up the new bare names right away).
- Updated every cross-reference across the active system: command files' own internal cross-references to each other, `.claude/agents/*.md` (`project-manager`, `operations/review-prep`, `operations/vault-librarian`, `operations/vault-migrator`, `writing/writer`), `.claude/scripts/stop-checklist.ts`, `.claude/scripts/lib/signals.ts`, and the two test files (`delivery-agents.test.ts`, `openclaw-routing.test.ts` — both the `readVaultFile` path strings and the test description labels).
- Updated the three canonical command-documentation surfaces per this vault's own "Maintaining Indexes" rule: `CLAUDE.md`'s Slash Commands table, root `Commands.md`, and `brain/Skills.md`.
- Updated the remaining live docs referencing commands: `ARCHITECTURE.md`, `README.md`, `AGENTS.md`, `GEMINI.md`, `Home.md`, and the brain notes/business notes that described current (not purely historical) behavior — `brain/Memories.md`, `brain/Gotchas.md`, `brain/Patterns.md`, `brain/Key Decisions.md`, `brain/Engineering and WordPress Operator Roadmap.md`, `Notes/Index.md`, `org/people/Sara Belleau.md`, `Projects/meetings/README.md`, `Notes/meetings/2026-07-20 PULSE Website Review.md`, and this note itself.
- **Deliberately NOT touched — genuine historical/version records, not live documentation**: `CHANGELOG.md` (its own entry documents the *original* v3.7 addition of the `om-` prefix "for discoverability" — rewriting that would falsify template version history) and `vault-manifest.json` (its `.claude/commands/om-standup.md`-style entries are version fingerprints used by `/vault-upgrade` to detect *other* incoming vaults' template versions — e.g. it shows v3.2 was unprefixed, v3.7 added the prefix — not a description of this vault's current state). Also left `.shardmind/` and `graphify-out/` alone as before (pristine template snapshot / regenerated artifacts).
- Verified: comprehensive vault-wide grep for all 19 old names (excluding the above) came back clean; `delivery-agents.test.ts` still 12/12; `openclaw-routing.test.ts`'s pre-existing 3 failures confirmed unrelated by diffing against the `Work copy - before (OM baseline, 2026-07-24)` snapshot (same 3 failures there, untouched).

**Next candidates for a pass 2** (not started): the command *bodies* themselves (content/behavior, not just names — still un-reviewed for om-specific assumptions), hooks review, `vault-manifest.json`/`CHANGELOG.md` identity strings (deliberately deferred as historical, revisit only if/when those docs themselves get a deliberate versioning decision) — same phased approach as the earlier "scrub" work, one piece at a time rather than all at once.

## Skill/command optimization pass, item 1: feedback loop / Decision Records (2026-07-24)

Bob asked to review the earlier recommendation lists (reference-architecture comparison + obsidian-second-brain head-to-head) and start optimizing vault skills/commands one at a time, incorporating anything worth borrowing from second-brain. Combined the two lists into one queue:

1. **Feedback loop that forces re-evaluation** (reference comparison, #1 priority) — chosen as the starting point.
2. "Attach evidence before done" convention for `developer`/`wordpress-operator` dispatches (reference comparison, #2).
3. Scheduled cadence prototype via `ScheduleWakeup`/cron (reference comparison, #3) — paired with item 8 (headless-cron gotcha).
4. Bi-temporal `timeline:` facts pattern (OSB).
5. Research-toolkit fallback design (OSB).
6. Consolidated anti-fabrication rule (OSB) — folded into item 1's implementation rather than left separate, since Decision Record predictions/confidence are exactly where fabrication risk concentrates.

**Item 1 implemented this pass:**
- `templates/Decision Record.md` rewritten: added `confidence` (`stated | high | medium | speculation` — OSB's exact vocabulary, deliberate alignment) and `revisit_date` frontmatter fields; renamed "Options Considered" → "**Alternatives Considered**" with an explicit instruction to note *why* each alternative lost, not just list it; replaced "Consequences" with "**Prediction**" (a concrete, falsifiable expected outcome) and added "**What Would Change My Mind**" (explicit revisit trigger) and a "**Revisit**" section for logging the actual outcome later. No existing Decision Record notes existed yet in this vault, so no migration was needed — clean rewrite.
- `CLAUDE.md`'s "Decision Records" section updated to describe the new fields and add step 5: `/vault-audit` surfaces decisions past their `revisit_date`.
- **The actual feedback-loop mechanism**: added a new step 10 to `.claude/commands/vault-audit.md` ("Check for Decisions Due for Revisit") — scans all `tags: [decision]` notes for a passed `revisit_date`, lists them under a dedicated report heading (title, original prediction, confidence, how overdue), never auto-resolves them (asks the user: held / needs updating / superseded), and separately flags any decision record with no `revisit_date` set at all. Renumbered the command's remaining steps (old 10–12 → 11–13) accordingly.
- Added the consolidated anti-fabrication rule to `CLAUDE.md`'s Rules section — one named rule ("Never fabricate") tying together Decision Record confidence levels, the Composio/OpenClaw "untrusted evidence" language, and general note-writing claims, rather than the idea staying scattered across the doc.
- Found and fixed one knock-on reference: `.claude/agents/operations/vault-migrator.md`'s content-classification heuristic table looked for `## Options Considered` to detect decision notes during vault import — updated to match either the old or new heading, since `/vault-upgrade` needs to correctly classify decision notes coming from *other* source vaults that may still be on the old template.
- Verified: ran the full test suite (`.claude/scripts/tests/*.test.ts`, 495 tests) before and after — 487 pass / 8 fail both times, identical failing set, confirmed by diffing against the untouched `Work copy - before (OM baseline, 2026-07-24)` snapshot. Nothing broken by this pass.

**Deferred to later items in the queue** (not done this pass): items 2–6 above, plus the item-1 mechanism itself is untested against a real decision yet — worth creating one live Decision Record soon to confirm the `/vault-audit` revisit-detection actually surfaces it correctly once a `revisit_date` passes.

## Skill/command optimization pass, item 2: evidence before done (2026-07-24)

Investigated first before writing anything — `developer.md` and `wordpress-operator.md`'s Return contracts, and `kickoff.md`'s step 6 ("Verify and revise"), turned out to already be quite mature: both agents already return concrete evidence (test/check results, stored-state and rendered verification) and already state "never claim completion from a process exit alone" / "a successful mutation response is not task completion"; `kickoff.md` already independently re-checks tests, dispatches `web-quality-verification`, and reconciles Designer conformance findings before closing. **So the real gap wasn't agent self-report at the session level — it was durable recording.** Evidence was being verified live in-session and then evaporating once the session ended, because nothing forced it into the vault's own durable record.

Found the exact prior art already sitting in the vault, just stale and narrowly scoped: `brain/Patterns.md#Agent/Codex task handoffs need PM-style status tracking` (2026-07-10) already establishes a Dispatched → Verified → Closed model with a "checkbox + strikethrough + confirmed-live note" format, but was written for the old Codex-handoff-file era before the 2026-07-21 direct-dispatch rework, and was never formalized into a template or enforced by `kickoff.md` itself.

**Implemented, reusing rather than reinventing:**
- **`brain/Patterns.md`**: added a 2026-07-24 update to the existing entry (not a new one) generalizing it to `kickoff`-based direct dispatch, and formalizing the standard closure format: `- [x] ~~Task~~ — verified <date>: <what was checked, how>`. A flipped checkbox with no evidence note is treated the same as a stale unclosed handoff.
- **`.claude/commands/vault-kickoff.md`** step 7 ("Close and reconcile"): now explicitly requires writing evidence into the durable vault record (Stack note task backlog or bounded project Action Items) using that format — "the session transcript is not a durable record" — rather than the previous vague "update the bounded project status when appropriate."
- **`templates/Work Note.md`**: added an inline HTML-comment reminder on the Action Items section showing the closure format.
- **`templates/Client Stack.md`**: added a new **Task Backlog** section (previously ad hoc per client — e.g. Brunsell Lumber Stack's "Codex Task Backlog" existed only because someone invented it there) with the same closure-format convention, explicitly optional for retainer-only/content-only clients.
- Deliberately did **not** touch `developer.md`/`wordpress-operator.md` — their Return contracts were already solid; the gap was one layer up, at durable recording, not agent self-report.
- Verified: full suite before and after — 487 pass / 8 fail both times, identical failing set (same as item 1's baseline).

## Skill/command optimization pass, item 3: research toolkit (2026-07-24)

Explained the "research-toolkit/cron pair" before building anything, per Bob's ask. Key clarifications that shaped scope:
- **Cron piece dropped for now** — Bob confirmed headless/cron-based Claude Code runs bill against API credits, not the monthly subscription, and he has no API credits. Also clarified `ScheduleWakeup` only works inside an already-running `/loop`; genuine wall-clock autonomy needs `CronCreate`/the `schedule` skill instead — noted for whenever the credits situation changes.
- **Grok → Antigravity swap-in, asked about.** Flagged honestly: Grok's specific OSB value was live X/social search, which a general Gemini-based Antigravity dispatch wouldn't replicate — it'd function as "a second independent research pass on an already-paid-for model," not a strict feature swap. Bob's call: leave Grok/Antigravity integration for now, he'll research the invocation question separately — **build Tier 2 (free, no new service) only.**

**Built:**
- `templates/Research Note.md` — Question / Findings (sourced, recency-marked, honest confidence) / Sources / Related.
- `.claude/agents/researcher/researcher.md` — new, real (non-placeholder) agent for the Researcher department. Tools: `Read, Write, Grep, Glob, WebFetch, WebSearch, Bash, Skill` (Bash for `defuddle parse <url> --md`). Deliberately no hardcoded source list — `WebSearch` already reaches what OSB's ~10 bespoke free-source scripts cover (Wikipedia, HN, arXiv, Reddit, DuckDuckGo, etc.) natively. Explicitly documents the Antigravity tier as a real future extension, not a placeholder gap in what's built now.
- `.claude/commands/research.md` — thin dispatcher to `researcher`.
- Registered everywhere per the vault's own "Maintaining Indexes" rule: `CLAUDE.md` (Slash Commands table, new Note Types row, Researcher department table), `Commands.md` (new Research category), `brain/Skills.md` (new Research category + Subagents row).

**Naming collision found and resolved**: the global (user-level) `obsidian-second-brain` skill package already has its own `~/.claude/commands/research.md` (Perplexity/free-source dossier tool). After creating the project-level `research.md`, the session's command listing kept showing the *old* global description — `claude-code-guide` confirmed via current docs that command/skill precedence is **enterprise > personal > project**, the exact opposite of subagent resolution (where the most-local file wins). The global file was always going to shadow the project one, permanently, not a caching artifact. **Fix applied**: renamed the project command to `.claude/commands/vault-research.md` (`/vault-research`), and updated every reference — `CLAUDE.md` (Slash Commands table, Note Types row, Subagents table), `Commands.md`, `brain/Skills.md` (Research category + Subagents table), and the command file's own usage note explaining why it isn't named `/research`. Logged the precedence-direction finding itself as a new [[Gotchas]] entry since it applies to any future command naming, not just this one — check `~/.claude/commands/` (and plugin command dirs) for a name collision *before* naming a new project command, don't assume project wins the way it does for agents.
- Verified: full test suite unaffected — 487 pass / 8 fail, identical to prior passes, both before the rename and after.

## Correction: Grok tier must be present-but-conditional, not deferred (2026-07-24)

Bob's clarification after the item-3 pass: he doesn't have `XAI_API_KEY` credits *today* and might add them later, but wants the **capability itself built and checked on every run now** — not documented as a future extension the way Antigravity is. Distinction that matters: "not yet built" (what I'd written) means someone has to come back and write code later; "present but inactive" means the check already runs every time and the tier activates automatically the moment a key exists, with zero further agent-file changes needed.

**Fixed in `researcher.md`:** added an explicit step 2, run on every task: `test -n "$XAI_API_KEY" && echo present || echo absent` (never echo the key value itself — ties to [[Patterns#Never store credentials in the vault]]). If present, Grok is used specifically for live X/social-signal search (its actual differentiated value, not general web search which the free tier already covers) as an *additional* source, not a replacement. If absent — the current, default, real state — skip straight to the free tier. Added an explicit "Grok tier — present, currently inactive" section stating two things honestly rather than fabricating specifics: the exact xAI API call shape hasn't been verified against current docs (no key available to test against), and where the key itself should live (env var vs. 1Password CLI vs. something else) is Bob's call whenever he actually adds it, not invented now.

Propagated the same "always runs, activates automatically" framing to `vault-research.md`, `CLAUDE.md`, and `brain/Skills.md` — replaced every "no premium/specialist source wired up yet" phrasing (which implied unbuilt) with "Grok tier activates automatically if `XAI_API_KEY` is present, inactive otherwise" (which correctly implies built-and-waiting). Antigravity stays explicitly separate and genuinely deferred — a second-model-pass idea, not a Grok-equivalent, not part of this conditional check.

Verified: full suite unaffected — 487 pass / 8 fail, unchanged.

## Proactive `vault-` prefix rename, and a real process failure worth recording (2026-07-24)

Bob's instruction after the `/vault-research` naming-collision episode: since collisions are silent and by design (personal scope shadows project scope, discovered the hard way), proactively prefix all 18 previously-unprefixed commands with `vault-` too — the same mechanism the upstream `om-` prefix always served (confirmed later via `CHANGELOG.md`: added at template v3.7 "for discoverability," which also happens to prevent exactly this class of collision). `vault-audit`/`vault-upgrade` already had the prefix, so those were untouched. `research` → `agent-research` per Bob's own correction, since general research isn't really "the vault."

**Flagging one naming parallel, not yet resolved:** `kickoff` dispatches client-work agents (Writer/Designer/Developer/WordPress Operator) — work happening *outside* the vault in client repos/live sites — which is the same "not really about the vault" property Bob identified in `research`. Went with `vault-kickoff` per the literal instruction rather than guessing at `agent-kickoff`, but this is a one-line rename if Bob wants it to match `agent-research`'s treatment instead — flagging rather than silently deciding.

**The process failure.** First attempt used a single big loop (`for f in $FILES; do sed -i ...; done`) with two compounding bugs:
1. `$FILES` built via `grep -rl "" ... | grep -v "^\./\.shardmind/"`-style exclusion — the exact same fragile-path-prefix bug hit earlier with `CHANGELOG.md`. This silently applied sed to ~300 files it had no business touching: the entire `.claude/skills/` library, `.agents/skills/`, `.vault-operator/`, every `Clients/`/`Prospects/`/`org/` file, and even `.shardmind/` (which should be untouchable).
2. Sed patterns had no word-boundary anchoring (`/meeting` matches inside `/meetings`), so this could have corrupted real content — e.g. `humanizer` (a real, unrelated skill) or the actual folder path `Projects/meetings/`.

**What actually happened, verified rather than assumed:** used the `Work copy - before (OM baseline, 2026-07-24)` snapshot to diff every touched file. Result: `diff -rq` showed only 35 files with any real content difference at all (out of ~300 "touched") — sed had rewritten hundreds of files with byte-identical content (harmless mtime churn, no data change) because no pattern actually matched in them. All 35 real differences were accounted for by legitimate work (this session's or the parallel session's) — zero corruption from false-positive substring matches. The word-boundary risk was real in principle but didn't land, because the specific unrelated content (`humanizer`, `Projects/meetings/`) simply wasn't touched by the broken loop that ran first.

**But the loop also failed to update most of the actual intended targets** — `CLAUDE.md`, `Commands.md`, `brain/Skills.md`, `README.md`, `ARCHITECTURE.md`, `AGENTS.md`, `GEMINI.md`, `Home.md`, `brain/{Memories,Gotchas,Patterns}.md`, `.claude/agents/{project-manager,operations/review-prep,writing/writer}.md`, `.claude/scripts/lib/signals.ts`, and this note — likely the same word-splitting bug (unquoted `$FILES` breaks on any path containing spaces, which is most of this vault) silently dropping files from the loop. Caught via the test suite dropping to 483/12 (delivery-agents.test.ts newly failing on stale `kickoff.md`/`standup.md` paths).

**Fixed properly**: abandoned the loop entirely, applied sed to each of the ~20 real target files individually via explicit, one-per-file commands (no loop, no word-splitting risk). Caught two remaining bugs this way: a forgotten `/humanize` rule, and confirmed word-boundary corruption of `Projects/meetings/` → `Projects/vault-meetings/` in 4 files (fixed individually, cross-checked that `/humanize` itself has real false-positive risk elsewhere — `edit/humanize/quality` workflow-stage mentions and `jpeggdev/humanize-writing`/`blader/humanizer` GitHub repo names in `brain/Key Decisions.md`, `brain/Engineering and WordPress Operator Roadmap.md`, `brain/Skill Library Roadmap.md`, `.claude/skills/humanizer/SKILL.md` — deliberately left those untouched). Also found and fixed two files entirely missed from the original file list (`brain/Key Decisions.md`, `brain/Engineering and WordPress Operator Roadmap.md`) via a targeted re-grep after the individual-file pass.

**Verified clean**: comprehensive vault-wide grep for all 18 old bare names (with known false-positives excluded) — zero remaining. Plural/compound corruption check (`vault-meetings`, `vault-dumps`, etc.) — zero remaining. Full test suite — 487 pass / 8 fail, identical failing set to the known baseline (`bootstrap-hook`, `generate-changelog`, `manifest-check`, `openclaw-routing`, `personalize-hook`, `shard.yaml hook lifecycle` — all pre-existing, unrelated to this work).

**Lesson, worth keeping**: never loop `for f in $(...)` over file paths in this vault — most paths contain spaces (client names, note titles). Use per-file explicit commands, or a null-delimited `while read` loop, or call sed directly on an explicit file list. Also: after any broad sed sweep, don't trust "no error" as "no damage" — diff against a snapshot and actually look, the same discipline as the "evidence before done" rule built earlier this session applies to my own work too, not just dispatched agents'.

## Restructured Projects/1-1, Projects/incidents, Projects/meetings; added Journal/ (2026-07-24)

Bob's observation, working through vault conventions inherited from `om` before starting skill/agency development: `Projects/` is defined in `CLAUDE.md` itself as bounded engagements only, but three of its subfolders never fit that definition — they were only there because the folder used to be called `work/` (a broad umbrella, per the pristine `.shardmind/templates/work/` tree and the 2026-07-07 rename decision in [[Key Decisions]]), not because "Projects" was ever the deliberately-chosen semantic home for them.

**Investigated first**: `Projects/1-1/` and `Projects/incidents/` were both actually empty (`.gitkeep` only) — trivial to move, no data migration risk. `inbox/` already existed as a genuine catch-all (one real unrelated file — an Educated Mortgage performance report — was already sitting in it), confirming Bob's instinct that it should absorb meeting intake rather than staying meeting-specific under `Projects/`.

**Decided and executed**:
- `Notes/1-1/` and `Notes/incidents/` — new subfolders under `Notes/`, alongside the existing `Notes/meetings/` precedent. `Projects/1-1/` and `Projects/incidents/` removed (both empty).
- `inbox/` absorbs `Projects/meetings/`'s function entirely — general catch-all, not meeting-specific. `Projects/meetings/README.md` rewritten into `inbox/README.md`, broadened to describe mixed content (not just meetings), `Projects/meetings/` removed.
- `/vault-intake` rewritten: scans `inbox/` instead of `Projects/meetings/`; classification step broadened — most items self-identify (filename/content says "meeting transcript"/"meeting note") and get classified with high confidence, but **anything genuinely unclear gets asked about rather than guessed**, per Bob's explicit instruction.
- **New `Journal/` folder** for personal daily notes — Bob will enable and configure Obsidian's native Daily Notes plugin himself (pointed at `Journal/`), so `.claude/`/`.obsidian/` config was deliberately not touched for that part, per `CLAUDE.md`'s own "never modify `.obsidian/` without being asked" rule.
- **Bonus fix while in `vault-migrator.md`**: its "daily notes" classification heuristics previously had nowhere good to route generic journal content (vague "classify by content"/"varies (Projects/1-1/, thinking/)"/`reference/personal/`) — now that `Journal/` exists, all three of those heuristic rows route there directly, with a note to still extract embedded 1:1/decision/work-log content to its proper destination.

**Full scope updated** (verified via before/after grep, no loops this time — lesson from the previous episode applied): `.claude/commands/{vault-intake,vault-capture-1on1,vault-incident-capture,vault-prep-1on1,vault-audit,vault-dump,vault-wrap-up,vault-weekly,vault-humanize,vault-upgrade}.md`, `.claude/agents/operations/{context-loader,cross-linker,review-prep,brag-spotter,vault-librarian,vault-migrator}.md`, `.claude/scripts/lib/signals.ts`, `.claude/scripts/tests/qmd-refresh.test.ts` (cosmetic), `bases/1-1 History.base` (folder filter — `bases/Incidents.base` needed no change, it's tag-based not folder-based), `CLAUDE.md` (Vault Structure table, Note Types table, Creating Notes placement list, Where to Put Things), `Notes/Index.md` (new bullets for `1-1/`/`incidents/`), `Projects/Index.md` (removed the now-homeless Incidents section, redirected to Notes Index), `README.md`, `brain/{Skills,About Bob}.md`, `org/people/Sara Belleau.md`.

**Left as intentional historical record, not fixed**: this note's own account of the earlier `/vault-` prefix rename bug (references `Projects/meetings/` as it existed at the time that bug was found — updating it would obscure what the bug actually was).

Verified: comprehensive grep clean (only the two intentional exceptions above remain), full test suite 487 pass / 8 fail, identical to the known baseline.

**Not yet resolved, deferred to Bob**: whether `Notes/` itself is still the right name/shape for a folder now holding standalone notes, meeting-prep, 1:1s, *and* incidents — this pass placed the moved folders there because `Notes/meetings/` was the existing precedent, not because Bob confirmed `Notes/` should be the umbrella for all of them. Worth revisiting if this starts to feel like the same "wrong container" problem `Projects/` had.

## Skill library: adopted `claude-seo`, retired `seo-and-aeo-strategy` (2026-07-24)

Bob cloned `stash/claude-blog`, `stash/claude-ads`, `stash/claude-seo` locally for review. Two forked research passes (WebFetch-based, then a deeper local-file diff once the clones existed) established: all three share identical hub-and-spoke architecture (orchestrator `SKILL.md` + `agents/` + `references/` + a scoring/gate mechanism, same author); `claude-blog`'s hub was never installed in this vault (only 8 of 30 sub-skills present, zero orchestrator — confirmed no hidden/renamed version exists); `claude-ads` maps to Marketing/"Ads-Paid" (12-platform ad-ops with a mutation gate), not Writing/"Ads Copy" as first assumed, and doesn't generalize to email/web copy; `claude-seo` vs. the existing `seo-and-aeo-strategy` skill was directly content-compared (schema deprecation dates, GEO/AI-crawler sourcing) and **claude-seo won on evidence, not preference** — the vault's version had gone stale.

**Scope decided**: Tier 0 (guidance content) + Tier 1 (Python/Playwright, no credentials) only. SE Ranking exists at the agency but deliberately not connected yet. Verified before adopting, not assumed: sub-skills explicitly check extension/credential availability and degrade gracefully (`seo-audit/SKILL.md`: "spawn when DataForSEO MCP available," "spawn when Google API credentials detected") — nothing needs removing to run without them.

**Installed**:
- 24 `seo-*` skills → `.claude/skills/` (hub `seo` + 23 sub-skills), matching source naming.
- 18 `seo-*` subagents → new `.claude/agents/marketing/seo/` subfolder — genuine Claude Code subagent format (`name`/`description`/`model`/`tools` frontmatter), confirmed compatible with this vault's dispatch model: the hub's "spawn subagents in parallel" instruction runs fine from whoever *invokes* the skill (top-level session or a command) — it only breaks if invoked from inside an already-spawned subagent, which we simply don't do.
- Python runtime via the source's own managed-runtime launcher (`bin/claude-seo` + `scripts/runtime.py`), not a hand-rolled venv — its `_data_dir()` correctly auto-detects a non-plugin ("manual") install and places the venv at `.claude/skills/seo/.venv/`. Ran the proper `claude-seo setup` (not a bare `pip install`) so the runtime's own state-tracking (`runtime-state.json`) is present — a bare pip install would have left `claude-seo run` refusing to execute anything. Verified end-to-end: `claude-seo doctor` reports ready, Python 3.14, Chromium ready; a real script (`parse_html.py`) executes correctly.
- Rewrote every skill file's generic `claude-seo run <script>` / bare `scripts/<script>.py` reference to the concrete vault-relative launcher path — the generic form only resolves for a global/plugin install, not this vault-local one.
- Added the schema-validation `PostToolUse` hook to `.claude/settings.json` as a third entry in the existing `Write|Edit` array (alongside `validate-write.ts`/`qmd-refresh.ts`, not replacing them) — preserved the source's exact `command`+`args`+`${tool_input.file_path}` template structure rather than converting to this vault's single-string hook format, since that's the tested/documented shape. Verified working end-to-end, including catching a real validation warning (missing `@context`) on a deliberately-broken test file.
- Retired `seo-and-aeo-strategy` — moved to `.claude/skills/_deprecated/` (zero-data-loss, not deleted), with a README explaining why.
- Rewired all 15 files that referenced the old skill, choosing the specific matching sub-skill by context rather than a blind global rename (e.g. "technical/on-page audit" → `seo-technical`, "backlink strategy" → `seo-backlinks`, "AI citation/AEO" → `seo-geo`, "page plans at scale" → `seo-programmatic`) — generic/unspecific mentions got the `seo` hub. Left genuinely historical narration untouched (`brain/Key Decisions.md`-style dated entries describing past evaluations under the old name).
- Promoted `agents/marketing/seo.md` from placeholder to a real agent — deliberately scoped to **bounded, single-context SEO tasks** (loads the relevant sub-skill itself), not the full parallel-audit pattern, since a dispatched subagent can't spawn the 18 siblings itself. The full `/seo audit` parallel-audit capability is invoked via the `seo` skill directly from the top level or through `/vault-kickoff`, consistent with the Claude Code dispatch constraint established earlier this session.
- Updated `CLAUDE.md` (Agency Skill Library bullet, Marketing Subagents table). `brain/Skills.md`'s Subagents table is still the old flat format pre-dating the department reorg — not fixed here, pre-existing known gap, out of scope for this pass.

**Verified clean**: full test suite 487/8, identical failing set to baseline; comprehensive grep for the old skill name shows zero live references (only intentional historical entries in `brain/Key Decisions.md`-style dated logs remain, left untouched on purpose).

**Deferred, Bob's calls to make later**: Google API credentials (Tier 2) and any of the 8 extensions (Tier 3, including SE Ranking) — none configured; `claude-blog`'s full port (currently a ~26% fragment) and `claude-ads` → Marketing/"Ads-Paid" build-out remain separate, not-yet-started decisions.

## Skill library: adopted `claude-ads`, retired `ad-campaign-management` (2026-07-24)

Bob's next pick after `seo` shipped: "ads, because blog will take some planning. It's much more nuanced" — `claude-blog`'s full port stays deferred pending a dedicated planning pass; `claude-ads` didn't need one, same Tier 0+1 posture as `seo` applied directly.

**Install mechanism differed from `seo` on purpose**: `claude-ads` ships its own official `install.sh` (not present/used for the `claude-seo` port) — read in full before running it. It has real security engineering: path-injection validation (rejects shell metacharacters, `..` traversal, leading dashes, UNC paths), an ownership manifest (`.claude-ads-<target>.manifest`) so it refuses to overwrite files it doesn't own or that are symlinked, and hash-locked (`--require-hashes --only-binary=:all:`) pip installs restricted to a hardcoded supported-target matrix. Used the installer rather than hand-copying files (the `seo` approach) because it already does the ownership-tracking and validation `seo`'s manual port had to skip.

**Python-version blocker, fixed**: the installer's dependency lock only ships wheels for cp311/cp312; this machine's default `python3` is 3.14.6, which the installer explicitly rejects with no fallback ("No verified dependency lock target"). Fixed by finding an already-installed 3.12 (`/opt/homebrew/bin/python3.12`) and prepending a temp directory with a `python3` symlink pointing at it, so the installer's internal `python3` calls resolved to a supported version — `/opt/homebrew/bin/python3.12` and `~/.local/bin/python3.11` were both already on this machine as options.

**Ran**:
```bash
PATH="/tmp/py312-path:$PATH" bash "stash/claude-ads/install.sh" \
  --target=claude --source=local \
  --repo-dir="${VAULT}/stash/claude-ads" \
  --skill-dir="${VAULT}/.claude/skills" \
  --agent-dir="${VAULT}/.claude/agents/marketing/ads"
```
Result: 1 hub skill, 33 sub-skills, 25 agents, 38 reference files, 12 industry templates, hash-verified Python deps into a managed `.venv` — "✓ Exact locked Python dependencies installed."

**Fixed two remaining generic-path references** the installer itself doesn't touch (it copies files verbatim; doc content isn't its job):
- `ads/references/image-providers.md`: `python scripts/generate_image.py ...` → the concrete venv path `.claude/skills/ads/.venv/bin/python3 .claude/skills/ads/scripts/generate_image.py ...`, since the system default `python3` (3.14.6) doesn't have the venv's dependencies and bare `python` isn't guaranteed to exist at all.
- `ads/references/status-contract.md`: same bare-`python` fix for the `claude_ads_core status`/`next` invocations, plus a clarifying note (see below).

**Important finding, distinct from `seo`**: unlike `claude-seo`'s `doctor` command (a genuine downstream runtime-health check), `claude-ads`'s `status`/`next` commands (`python -m claude_ads_core status --root .`) check against `control-plane/` — the source repo's own maintainer-facing release-governance data (claim ledgers, maturity manifests). `install.sh` deliberately does **not** copy `control-plane/` into a downstream install (verified by reading the installer: only two of its files are read transiently, from the *source* clone, to write `managed-runtime-receipt.json` at install time). So `status`/`next` correctly report `"status": "invalid"` with a clean, fail-closed JSON error in this vault's install — that's expected behavior, not a broken port, and it doesn't affect any actual `ads-*` audit/plan/create work. Verified the real runtime instead via the actual workhorse scripts (`fetch_page.py`, `generate_report.py` both run cleanly with the venv interpreter; `playwright`/`weasyprint`/`PIL` import fine). Also noticed `build_control_registry.py` requires PyYAML, which isn't in the locked requirements — confirmed by reading it that this script is maintainer-only tooling ("rebuild the checked-in typed registry from the canonical catalog") not part of the runtime's real dependency surface, so this is an intentional gap, not a broken lock.

**Retired `ad-campaign-management`** (the vault's pre-existing single-file ad skill: 261 lines, prompt-only, Google/Meta/LinkedIn/TikTok/X format specs, no live evidence pipeline) — moved to `.claude/skills/_deprecated/` (zero-data-loss), README updated with the reasoning. `ads` replaces it with source-grounded, evidence-scored audits across all 12 platforms (adds YouTube, Microsoft, Apple, Amazon, Reddit, Pinterest, Snapchat) plus a managed Python runtime and 25 dedicated audit/creative subagents — a genuine capability increase, not a style preference. Rewired the two live references (`utm-builder/SKILL.md`, `skill-navigator/SKILL.md`); left the historical mention in this note's own earlier entry untouched.

**Promoted `agents/marketing/ads-paid.md`** from placeholder to a real agent, mirroring `seo.md`'s pattern exactly: bounded single-context paid-media work (one platform audit, one plan, one creative brief) that loads the `ads` hub then the specific sub-skill — not the full 25-subagent parallel audit, which only the top-level session or `/vault-kickoff` can dispatch (same Claude-Code-subagents-can't-spawn-subagents constraint as `seo`). Tools: `Read, Write, Bash, WebFetch, WebSearch, Skill`, matching `seo.md`'s tool set.

**Updated `CLAUDE.md`**: Marketing Subagents table (`ads-paid` row now describes the real capability instead of "placeholder"), Agency Skill Library bullet (added `ads`, removed `ad-campaign-management`). `brain/Skills.md` needed no change — confirmed its scope is slash commands/subagents/workflows only, not skill-library content (same as the `seo` pass).

**Verified clean**: full test suite 487 pass / 8 fail, identical failing set to the known baseline (unrelated to this work); comprehensive grep confirms zero live `ad-campaign-management` references outside `_deprecated/` and this note's own historical entries.

**Deferred, Bob's calls to make later**: any ad-platform API/OAuth credentials (Google Ads, Meta, TikTok, LinkedIn, Microsoft, Amazon, etc.) — none configured, same Tier 0+1-only posture as `seo`; `claude-blog`'s full port remains a separate, not-yet-started decision pending its own planning pass.

## Open: `claude-blog` scope — one generic content hub, or leave it blog-only? (2026-07-24, undecided)

Bob's framing: `claude-blog` is scoped to blog writing, but blog isn't all the agency writes — should the port transform it into a generic hub covering all content types, or should other writing types get separate hub-and-spoke clusters built with the same methodology?

**Recommendation given, not yet confirmed by Bob**: neither. Keep `claude-blog`'s port scoped to blog only — its actual machinery (cannibalization detection, orphan-link graphs, freshness decay, per-post scoring across a growing library) is shaped around blogs specifically being a large, interlinked, aging content library. That doesn't transfer cleanly to web/landing copy (a handful of static pages), email (ephemeral sends), or ad copy (short-lived, platform-rotated creative) — forcing those into the same schema would repeat the exact mistake the [[Patterns#Hub-and-spoke skill adoption checklist|hub-and-spoke checklist]] warns against (diluting the rigor that made the source system worth adopting).

Also flagged: most of "not blog" is already covered by existing verticals, so building parallel 30-skill clusters for everything else is likely unnecessary — `conversion-rate-optimization`/`landing-page-optimization`/`cro-page-structure` already cover web copy, the just-shipped `ads` cluster covers ad copy, `newsletter-management`/`marketing-automation` cover email. The one genuinely open question: does general drafting quality (`copywriting-core`, `copy-editor`, `humanizer`) need blog-style audit-and-score rigor for non-blog page copy — left as a "decide from real pain once blog ships," not something to build ahead of demand.

**Status**: Bob had not responded to this recommendation before signing off for the day (2026-07-24). Next session should either get his decision on this framing, or proceed with the `claude-blog`-only-port plan if he doesn't want to revisit the discussion — don't assume confirmation happened.

**Related, not resolved by it (2026-07-25)**: [[Engineering and WordPress Operator Roadmap#Writer mode expansion + skill reconciliation (2026-07-25)|Writer's mode taxonomy was expanded and four other copy-drafting skills reconciled]] the same day, but that work explicitly didn't touch `claude-blog` — this question is still open.

**Resolved 2026-07-26 — the actual question was different from what got recorded above.** The 2026-07-24 framing conflated two distinct questions: (a) should `claude-blog`'s *specific blog mechanisms* (cannibalization detection, freshness decay, orphan-link graphs) generalize to other content types — the thing that got recommended against, correctly — and (b) should `claude-blog`'s *hub-and-spoke architecture* (orchestrator skill + N sub-skills + references + an evidence/scoring gate) be the methodology for building Web Copy, Ads Copy, and Email Copy into real, deep sibling roles, the same way `seo` (24 skills, ported from `claude-seo`) and `ads` (33 skills, ported from `claude-ads`) got built out. Bob confirmed **(b)**, with explicit reasoning that changes how Writing gets prioritized against the rest of the system, not just this one question:

> Writing is by far, by an order of magnitude, the biggest and hardest skill to perfect for my system — especially across different clients. Only second by design. Development is far easier because regardless of client, I have one of a couple fixed codebases and coding styles. Design is similar, with a distinct design system inherited from me as we work together. But writing — writing is a voice, writing requires more than any other role. And writing is client facing. That's the area I need the most robust workers.

**Why this matters beyond just claude-blog**: Development and Design both have a structural shortcut Writing doesn't — a fixed, shared substrate (a couple codebases/coding styles for Dev; one inherited design system for Design) that holds steady across clients. Writing has no equivalent substrate — voice varies per client, and it's the one role where the output is directly client-facing. That's the reasoning for investing Writer with the same depth `seo`/`ads` got, ahead of further Dev/Design build-out.

**What this actually changes, concretely**: the prior recommendation ("neither — existing thinner skills already cover web/email/ad copy, don't build parallel clusters") is superseded. The real scope is now: full `claude-blog` port for Blog Copy (previously a ~26% fragment, per the earlier `claude-blog` note), plus **new** hub-and-spoke clusters for Web Copy, Ads Copy, and Email Copy — built from scratch following the same architecture, since (unlike `seo`/`ads`) there's no equivalent external reference repo for these to port from; `stash/` has no `claude-webcopy`/`claude-emailcopy` equivalent. Editor and Humanizer's shape (separate roles vs. Writer capabilities) is still undesigned — not resolved by this, a distinct question for whenever this build starts.

## Open: OM residue still to migrate — deferred until structure is finalized (2026-07-25)

`.shardmind/` and its 5 dead-import test files are gone (see [[Key Decisions]]), but three OM-descended pieces remain and were explicitly deferred rather than touched — **Bob's call: don't migrate any of these until the target structure is finalized**, since acting on them now risks rework once the real shape lands.

1. **`vault-manifest.json`** — does double duty. `qmd_index`/`qmd_context` and the `infrastructure` list are load-bearing (SessionStart hook depends on them for QMD scoping and open-task aggregation); `template`/`version`/`released`/`scaffold`/the "version fingerprints" block are pure OM-upgrade-path metadata with nothing left to serve once this vault stops tracking OM releases. Needs a deliberate split, not a wholesale delete.
2. **README.md (+ README.ja/ko/zh-CN.md), CHANGELOG.md, ARCHITECTURE.md, CONTRIBUTING.md** — still describe and market this as "Obsidian Mind," not Bob's fork. Rewriting these is really a rebrand/positioning task (what does this fork call itself publicly, if anything — see [[Jarvis Personality]] for the in-session identity side of that question), which is premature before the structure itself settles.
3. **`/vault-upgrade` command + `vault-migrator` agent** — exist specifically to import content from another OM-descended vault. Once this is a hard fork with no upstream relationship, their entire premise (there's an "OM" to upgrade *from*) may no longer apply — needs a decision on whether they're repurposed (e.g. generic vault-to-vault migration) or retired outright.

**Status**: noted, not scheduled. Revisit once the finalized post-OM structure exists — this entry is the punch list for that pass, not a task to pick up piecemeal now.

**Update 2026-07-26 — items 2 and 3 resolved, piecemeal, ahead of the full pass.** README/CHANGELOG/ARCHITECTURE.md (+ AGENTS.md/GEMINI.md title lines) rebranded Obsidian Mind → Jarvis, framed as "started as a fork, now its own product" rather than an active fork — full detail below isn't duplicated here, see the commit history (`Rebrand public identity docs from Obsidian Mind to Jarvis`). `.shardmindignore` retired (dead once `.shardmind/` was already gone). Immediately after, Bob decided item 3 outright: **`/vault-upgrade` and `vault-migrator` are retired**, not repurposed — both files deleted, all live cross-references removed from `CLAUDE.md`, `Commands.md`, `brain/Skills.md`, `ARCHITECTURE.md` (including the now-dead `version`/`released`/`version_fingerprints`/`user_content_roots`/`scaffold` manifest fields those two consumed — flagged in-place as dead weight, not yet pulled from `vault-manifest.json` itself). `infrastructure[]` confirmed still load-bearing (SessionStart's open-task exclusion list) and left alone. Test suite still 12/12 on `delivery-agents.test.ts` after. **Item 1** (`vault-manifest.json`'s deliberate load-bearing/dead split) remains the one open piece of this punch list.

## Engineering placeholders corrected: frontend/backend-developer retired, qa-engineer built (2026-07-25)

The 2026-07-24 department-classification pass (see "Engineering / Technology department" above) added `frontend-developer` and `backend-developer` as read-only placeholder siblings to `developer`, on the theory that frontend/backend might need distinct capabilities. Bob revisited this a session later and called it correctly: both were fabricated stubs — their "Candidate capabilities" lists (`frontend-implementation`, `backend-engineering`, etc.) never mapped to any real skill, and there was nothing to fold into `developer` on removal. Deleted both files.

The actual principle, confirmed on inspection: `developer`/`wordpress-operator` split by **source of truth** (repo code vs. mutable WP app state) — genuinely different consequences, the one axis this vault has used anywhere. Frontend/backend is a **language/layer** split, a different axis entirely, and it doesn't survive contact with how the work actually happens — a single Gutenberg block is PHP + JS + CSS + `block.json` in one PR. Both placeholder files even said as much themselves ("cross-stack work will continue to route to the full-stack developer role"). `developer` already loads per-task skills (`wp-block-development`, `astro`, `wp-rest-api`, etc., plus the 2026-07-25 `claude-code-skills` additions — see [[Engineering Skill Library Roadmap]]) instead of needing separate agent identities per layer.

`platform-operator` was kept — a real, distinct source of truth (live hosting/DNS/CDN/TLS/backup state), consistent with the actual principle, not just grouped with the other two by placeholder-vintage.

`qa-engineer` was built out for real the same session — no longer a placeholder. Full detail in [[Engineering and WordPress Operator Roadmap#Update 2026-07-25 — frontend-developer/backend-developer retired, qa-engineer built]].

Net change to the department tree from the 2026-07-24 snapshot above: `engineering/` now holds `developer.md`, `wordpress-operator.md`, `qa-engineer.md` (real), and `platform-operator.md` (placeholder) — five files down to four, one placeholder promoted.

## Department coverage audit (2026-07-25)

Bob's framing: no specific gap driving this — working through every agent department systematically to see what's covered and what isn't, after the Engineering pass (skill-library review + `frontend-developer`/`backend-developer` retirement + `qa-engineer` build, both above) and a Marketing status check that turned up no real gap (SEO/AEO audit capability is already deep — see [[Skill Library Roadmap]] and [[Engineering Skill Library Roadmap]]).

**Full agent inventory, verified directly against `.claude/agents/` (26 files, not from memory):**

| Department | Real agents | Placeholders |
|---|---|---|
| Assistant (formerly Project Manager) | `assistant` (rebuilt 2026-07-25 — see below) | — |
| Design | `designer`, `design-reviewer` (built 2026-07-25) | `creative-designer` |
| Engineering | `developer`, `wordpress-operator`, `qa-engineer`, `platform-operator` (built 2026-07-25) | — |
| Marketing | `seo` (24 skills + 18 sub-agents), `ads-paid` (34 skills + 25 sub-agents), `social`, `email` (both built 2026-07-25) | — |
| Writing | `writer` (7 modes, unsplit), `web-copywriter`, `blog-writer` | — (compatibility adapters, not gaps) |
| Strategy | `strategist` | — |
| Researcher | `researcher`, `review-fact-checker` | — |
| Operations | `context-loader`, `brag-spotter`, `review-prep`, `slack-archaeologist`, `people-profiler`, `vault-migrator`, `vault-librarian`, `cross-linker` | — |

**21 real, 5 placeholder at the time of this audit.** Every placeholder from the 2026-07-24 classification pass was still a placeholder except Engineering's, which had already moved earlier the same session (`qa-engineer` built for real, `frontend-developer`/`backend-developer` retired as fabricated).

**Update, same session:** `social` and `email` built for real immediately after this audit — review found no skill gap (`social-media-management`, `newsletter-management`, `email-deliverability`, `email-quality-auditor` were all already solid and installed), so the only missing piece was the agent contract itself. Both scoped to channel operations only — content pillars/calendars/cadence/growth/analytics/deliverability/quality-gating — with copy drafting explicitly routed to `writer`'s existing Social post / Newsletter-Email modes, and no live scheduling/ESP platform access assumed.

**Update, same session:** `design-reviewer` built next. Unlike `frontend-developer`/`backend-developer`, this one wasn't fabricated redundancy — `designer.md` already self-certifies its own rendered conformance (mode 4 of its own workflow), the same producer-bias risk pattern `qa-engineer` was built to solve for `developer`. No skill gap: reuses `designer-delivery`'s `visual-critique.md` plus `web-quality-verification` and the engineering-review installs (`web-interface-guidelines`, `accessibility`, `core-web-vitals`, `performance`, `best-practices`, `web-quality-audit`), all of which apply equally well to rendered design-conformance checking. Read-only, no `Write`/`Edit`, same PASS/FIX/BLOCK/UNDECIDED verdict shape as `qa-engineer`.

**Update, same session:** `platform-operator` built next, out of the original recommended order's stated priority — reassessed after discovering a live, connected Cloudways MCP server (server/app lifecycle, DNS Made Easy, Cloudflare, Varnish) already confirmed in use as the real hosting platform for [[Educated Mortgage]], [[Brunsell Lumber]], and [[Systems Furniture Installations]], sitting completely unused. Unlike `social`/`email`/`design-reviewer`, this one needed a genuine new skill first — no operating discipline existed for infrastructure the way `wordpress-site-operations` exists for WordPress. Built `platform-operations` (global, modeled directly on `wordpress-site-operations`'s target-confirmation → before-state → risk-tiered-approval → async-verification → rollback shape, adapted for Cloudways' async operations, server-level blast radius, and DNS propagation reality) before the agent contract. Bob explicitly chose to build both in one pass given the real idle capability, despite the higher stakes (real servers/DNS/backups) than the earlier builds this session.

**25 real, 1 placeholder now** (`creative-designer`).

**Update, same session — `creative-designer`, the last item in the sequence, deliberately kept as a placeholder, not built.** Checked for redundancy with `ads-paid`'s own `creative-strategist`/`visual-designer` workers first — they're not competing scope, those are narrow, sandboxed workers that only run inside the ads cluster's own internal run/conductor orchestration, never directly dispatchable or publishing on their own. The real blocker is that no image-generation provider is connected to this vault — even the ads cluster's own `visual-designer` worker requires one declared per run, there's no standing capability to build an agent around yet. Bob's call: keep the placeholder rather than drop it, since an image-generation connector is "not far on the horizon" — logged as a near-term goal in [[North Star]] with an explicit trigger to revisit this agent the moment one lands.

**Coverage-audit sequence complete: 25 real agents, 1 placeholder** (`creative-designer`, intentionally deferred with a clear trigger — not forgotten).

**Skill-without-agent-home cases** — a different shape of gap than a bare placeholder: `social-media-management` (channel ops: calendar, cadence, growth, analytics) and `email-deliverability`/`email-quality-auditor` are real, installed skills sitting under the `social`/`email` placeholders. Copy for both channels already routes through `writer` per the all-copy-through-Writer rule — the placeholder gap is specifically the non-writing operational work (scheduling, segmentation, campaign build), not copy.

**Recommended next, in order, with reasoning — not started, Bob's call on sequencing:**

1. **`email` and `social`** — cheapest, most obviously ready. Same shape `qa-engineer` was in this morning: real skills already exist, just no agent wrapper. Lowest-cost next build given today's precedent.
2. **`design-reviewer`** — architecturally interesting next: same "independent verification in a separate context" pattern just proven with `qa-engineer`, applied to rendered design-conformance review instead of code. Design doesn't yet have an equivalent skill-library review pass behind it, though — would need one first, unlike email/social which already have the skills.
3. **`platform-operator`** — real distinct source-of-truth (see [[Engineering and WordPress Operator Roadmap]]'s 2026-07-25 update), but lower urgency: Bob currently leans on tech support for infra rather than hitting a wall himself (see [[Background & Skills]]).
4. **`creative-designer`** — lowest priority: `ads-paid`'s own sub-agents (`creative-strategist`, `copy-writer`, `visual-designer`, `audit-creative`) may already cover a meaningful slice of campaign-creative need; worth checking for overlap before building a parallel role.
5. **Writer's 6-way split** (Web/Ads/Email/Blog Copy + Editor + Humanizer) — explicitly deferred greenfield design work per the 2026-07-24 note above, not re-prioritized here.

## `project-manager` retired, replaced by `assistant` (2026-07-25)

Bob revisited `project-manager` after the coverage audit, unprompted by any gap in the audit itself — a good catch: reading the actual agent file confirmed it was never real project management (its own text: *"You are a reporting agent. You do not create, edit, move, or delete Monday.com items. You do not invoke other agents."*). It was Monday.com + vault workload triage and role-routing, misleadingly named. Nothing in this system tracked a plan, updated Monday status, or managed scope/dependencies/timeline — that entirely lived in Bob's own head (see [[Working Style]]'s self-organized sprints).

**Key technical finding that shaped the rebuild:** a Skill cannot pin a model — it just runs in whatever context invokes it. Only an Agent dispatch can guarantee a cost ceiling independent of the parent session's tier, which `project-manager`'s `model: sonnet` (not `inherit`) was already doing. That meant the mechanical fetch-and-format logic had to stay agent-shaped even though the *knowledge* (Monday board map, Composio quirks) belonged in a Skill the agent loads — the same split every other real agent in this vault already uses.

**Scope grew during discussion.** Bob's mental model for the replacement: a personal menial-task layer — reporting calendar, fetching email, even *creating* calendar events — used both directly (`/assistant <question>`) and internally by the session (`/vault-standup`, `/vault-kickoff`). Explicitly **not** a decision-maker: no prioritization, no sequencing, no "what should I do next." That distinction mattered enough that Bob corrected an earlier draft answer where I'd suggested folding a floated "pacing/effort-estimate assistant" idea (from [[Life Context]]/[[North Star]]) into this same agent — he was clear those are different concepts and must stay separate: `assistant` never decides, a future **project-manager** role (planning/prioritization, not yet built) is where that idea now points.

**Second correction:** don't let other Composio-connected integrations (Google Analytics, Search Console, Drive, Docs, Sheets) get orphaned in the process, even though they don't need to route through the new agent. `CLAUDE.md`'s Operational Integration Boundary section was already the canonical index for all of those — untouched by this rebuild — and the new `assistant-ops` skill explicitly cross-references it rather than duplicating or shadowing it.

**Built:**
- `assistant-ops` skill (global, `~/.agents/skills/`) — Monday board map + filter quirks (moved from `project-manager.md` verbatim), Google Calendar/Gmail Composio patterns, explicit read-vs-mutate approval discipline for calendar event creation (the vault's first personal-assistant mutation capability, gated per-event, never standing authorization).
- `.claude/agents/assistant.md` — `model: sonnet` (same cost-ceiling reasoning as before), `tools: Read, Grep, Glob, Bash, Skill`. No role recommendation — that logic moved into `/vault-kickoff`'s own step 4 (it already had an equivalent, more detailed routing table; the Monday "Project Type" signal table was merged into it).
- `.claude/commands/assistant.md` — new direct-dispatch entry point.
- `project-manager.md` — `git rm`, fully subsumed.
- `/vault-standup` and `/vault-kickoff` repointed at `assistant`; `/vault-standup`'s separate direct Calendar pull also folded into `assistant-ops` for consistency (previously duplicated the Composio quirk documentation in two places).
- `CLAUDE.md`, `README.md`, `Commands.md`, `brain/Skills.md`, `brain/Patterns.md` updated to the new agent name; historical entries (`Key Decisions`, `Gotchas`, earlier `Agent OS R&D` sections above) left as accurate history per the vault's own no-scar-tissue-scrubbing rule, with pointers added where the historical file path no longer resolves.

## Related

- [[harness/north-star|North Star]] — this initiative is one of the current focus areas
- [[Astro Publishing Platform MVP]] — parallel internal initiative (Git-native platform), relevant precedent for how we've been running R&D-stage architecture notes
- [[harness/operational-methodology|Operational Methodology]] — current gates, approval rules, verification requirements, and durable-record policy
- [[harness/patterns|Patterns]] — durable reusable operating patterns
- [[harness/gotchas|Gotchas]] — durable operating cautions
