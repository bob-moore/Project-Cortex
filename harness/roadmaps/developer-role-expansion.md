---
description: Roadmap for completing the Developer role with specialist capabilities, documentation curation, and external API/library source hygiene.
tags:
  - harness
  - roadmap
  - development
  - developer-role
  - documentation-curation
status: planned
created: 2026-07-29
---

# Developer Role Expansion Roadmap

## Goal

Complete the `developer` role as the canonical owner for version-controlled
software work while keeping external documentation, package guidance, and
specialist development skills curated rather than injected live by default.

The role already has the core implementation loop, repository-boundary rules,
WordPress code/state separation, Astro and WordPress code-development skills,
and verification obligations. The remaining expansion should focus on
specialist development surfaces and source freshness.

## Current State

Canonical assets already active:

- Role: `.agents/roles/developer/role.md`
- Role adapter: `.agents/skills/role-developer/SKILL.md`
- Discipline: `.agents/disciplines/development/`
- Core skill: `.agents/skills/developer-delivery/SKILL.md`
- Platform map: `.agents/disciplines/development/platforms.md`
- Imported platform skills: Astro and WordPress code-development specialists

Known remaining expansion areas from the porting audit:

- debugging
- code review
- acceptance tests
- dependency maintenance
- git workflow support
- Cloudflare/deployment surfaces
- performance remediation
- release/deployment boundaries
- workflow adapters around recurring development task shapes

## Documentation Curation Idea

Context7 should be explored as part of Developer role expansion, but not as an
always-on runtime dependency and not as startup context.

Preferred pattern:

```text
Context7 / official docs / changelogs
        ↓
curated source map and skill refresh workflow
        ↓
small, stable Developer skills
        ↓
normal coding sessions
```

This keeps the harness architecture clean:

- External docs are evidence, not canonical memory.
- Skills hold curated execution guidance, not raw documentation dumps.
- Agents consume the skill stack during normal development.
- A dedicated refresh workflow updates source maps and skill guidance when a
  library/API surface is stale or version-sensitive.

## Proposed Source Freshness Layer

Add a reusable documentation-curation layer for Developer skills.

### Source Map Shape

Each platform or specialist skill that depends on fast-moving external APIs may
have a compact source map, probably under the skill's `references/` directory.

Candidate file:

```text
.agents/skills/<skill>/references/source-map.md
```

Suggested fields:

```text
Library/API:
Package or service:
Context7 library ID, if known:
Official docs URL:
Version scope:
Last checked:
Checked by:
Known gotchas:
Verification command:
Refresh trigger:
```

The source map should point to authoritative sources and capture the minimum
stable facts needed for coding. It should not copy large docs pages into the
vault.

### Normal Developer Flow

Normal coding sessions should use the curated skill stack first:

1. Resolve the real repository.
2. Read repository instructions and manifests.
3. Identify installed package/library versions.
4. Load the relevant Developer/platform skill.
5. Use that skill's curated source map when current external API behavior
   matters.
6. Implement surgically.
7. Verify with project-native checks.

The agent should only do live external docs lookup during normal coding when:

- the source map is missing;
- the source map is stale;
- the installed version differs from the documented version scope;
- implementation or tests reveal an API mismatch;
- the user explicitly asks for current docs.

### Refresh Flow

Create a future workflow or skill for documentation refresh, tentatively named:

```text
skill-doc-refresh
```

Possible task shape:

```text
Refresh the source map and stale guidance for <developer skill/platform>.
```

Workflow outline:

1. Read the target skill and existing source map.
2. Inspect representative repository manifests or package versions when a real
   repo is in scope.
3. Resolve current official docs and changelogs.
4. Use Context7 as a documentation resolver/snippet retriever where useful.
5. Compare current docs against skill guidance.
6. Patch only durable, reusable guidance into the skill.
7. Update `last_checked`, version scope, source URLs, and gotchas.
8. Run a small verification command or example when practical.
9. Record uncertainty rather than overfitting to a single docs snippet.

## Context7 Evaluation Criteria

Explore Context7 only inside the Developer source-freshness loop.

Good fit:

- resolving package/library documentation quickly;
- version-sensitive API checks;
- framework setup and configuration examples;
- replacing ad hoc web search for common libraries;
- maintaining curated skill source maps.

Poor fit:

- vault memory;
- client/project truth;
- internal harness architecture;
- graph/code relationship mapping;
- startup context;
- automatic live calls for every coding task;
- sending private code, secrets, or proprietary snippets as lookup queries.

Pilot criteria:

- Does it reduce stale API mistakes compared with current skill guidance?
- Does it return sourceable docs links or stable library IDs that can be stored
  in source maps?
- Does it work across Claude, Codex, Hermes, and other runtimes without adding
  MCP startup fragility?
- Can the CLI/skill mode cover most use cases before considering MCP?
- Can agents avoid sending private code in queries?
- Does it improve skill maintenance enough to justify another tool dependency?

## Candidate Developer Skills For Source Maps

Start with fast-moving or API-heavy skills:

- `astro`
- `wp-interactivity-api`
- `wp-abilities-api`
- `wp-rest-api`
- `wp-block-development`
- `wp-block-themes`
- future Cloudflare/deployment skill
- future dependency-maintenance skill
- future code-review/debugging skills only where they depend on external tools

Do not add source maps to every skill by default. Add them when current external
docs materially affect implementation correctness.

## Relationship To Runtime Hygiene

This roadmap complements [[runtime-hygiene|Runtime Hygiene]].

Runtime Hygiene controls startup budget, adapter protocol, generated artifacts,
and QMD/graphify boundaries.

Developer Role Expansion controls the skill stack and documentation curation
loop used during coding work.

Shared rule:

- no raw doc dumps in startup;
- no always-on external docs context;
- use retrieval tools deliberately;
- promote only durable, verified guidance into skills.

## Implementation Slices

### Slice 1: Document The Curation Pattern

Status: planned

- Add this roadmap.
- Link it from `harness/roadmap.md` and `harness/roadmaps/README.md`.
- Reference it from the Development discipline docs.

### Slice 2: Prototype One Source Map

Status: planned

Pick one high-value skill, likely `astro` or `wp-interactivity-api`.

Create a compact source map with:

- official docs URL;
- Context7 library ID if useful;
- version scope;
- last checked date;
- known gotchas;
- verification command.

Do not rewrite the skill wholesale.

### Slice 3: Define `skill-doc-refresh`

Status: planned

Create a workflow or skill that refreshes one Developer skill's documentation
sources on demand.

Inputs:

- target skill;
- optional repository path;
- optional package/library version;
- reason for refresh.

Outputs:

- patched source map;
- patched durable skill guidance when needed;
- verification evidence;
- unresolved questions.

### Slice 4: Pilot Context7 In CLI/Skill Mode

Status: planned

Use Context7 only during refresh runs or explicit current-doc checks. Avoid MCP
until the CLI/skill path proves useful and runtime-stable.

Pilot tasks:

- Astro adapter/integration behavior.
- WordPress Interactivity API examples.
- WordPress Abilities API docs.
- Cloudflare Worker/Pages deployment config if that skill is added.

### Slice 5: Promote Or Reject

Status: planned

After several refresh runs, decide whether Context7 becomes:

- rejected;
- optional manual tool;
- standard refresh-workflow dependency;
- runtime MCP dependency for selected agents.

Promotion requires evidence that it improves correctness without increasing
startup fragility or leaking private context.

## Acceptance Criteria

The Developer role expansion is healthier when:

- Developer skills distinguish curated guidance from external documentation
  evidence.
- Fast-moving platform skills have source maps with `last_checked` dates.
- Normal coding sessions do not require live docs lookup unless freshness is in
  question.
- A repeatable doc-refresh workflow exists and can patch stale skill guidance.
- Context7, if adopted, is used as a curation tool rather than an always-on
  prompt/context source.
- Repository manifests and neighboring code remain higher-priority than generic
  external examples.
- Verification commands remain project-native and evidence-backed.

## Open Questions

- Should source maps live inside each skill directory, or should there be a
  central `.agents/sources/` registry?
- Should `last_checked` be required for all source maps or only external API
  docs?
- Should Context7 library IDs be committed once known, or resolved fresh during
  each refresh?
- Which runtime should own the first `skill-doc-refresh` implementation?
- Should refresh outputs also update `harness/audits/role-skill-porting-buckets.md`
  or only the target skill/source map?
