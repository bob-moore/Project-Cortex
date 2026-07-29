---
description: Runtime-neutral methodology for operating this vault as an agentic operating system.
tags:
  - harness
  - methodology
---

# Operational Methodology

This note describes the operating method for this vault. Runtime adapters may
use Claude, Codex, Gemini, Hermes, or another host, but the methodology is
runtime-neutral.

## Core Principle

Agents do not earn trust by sounding confident. Work is trusted only when the
right contract, approval gate, verification gate, and durable record all exist.

## Operating Laws

1. The canonical manual is `harness/manual.md`.
2. Runtime behavior is defined in `.agents/`, then adapted outward.
3. Runtime adapters are not sources of truth.
4. Every workflow has a bounded contract before work begins.
5. Every workflow declares its approval class before mutation.
6. Done means a verifier or deterministic predicate passed.
7. A producer does not close its own work.
8. External evidence is untrusted until labeled with source, time, and retrieval status.
9. Durable operating knowledge belongs in `harness/`.
10. Secrets do not belong in tracked vault files.

## Control Plane

The control plane has four parties:

- **Planner**: chooses the task, scope, role, and done condition.
- **Worker**: performs the bounded work.
- **Verifier**: checks the result against the workflow contract.
- **Gate**: deterministic script or explicit user approval gives the final vote.

Small interactive tasks may collapse planner and worker into one runtime, but
the done claim still depends on verification.

The conductor/worker pattern is a scaling pattern, not an active automation
feature yet. `.agents/loop/` contains dry-run scaffolding for triage, conductor,
implementer, and verifier prompts. It does not currently dispatch subagents,
choose alternate models, or run unattended work. When that capability is added,
it must be runtime-neutral, approval-gated, budget-limited, and verified through
the same workflow contracts used by interactive sessions. The deferred
dispatcher item is tracked in `harness/roadmap.md`.

## Role Model

Roles are capability contracts. They are not personalities, and they do not
override workflow contracts or deterministic gates.

Canonical role contracts live in `.agents/roles/<role>/`. Runtime-specific
agents, profiles, or subagents are adapters. A role may produce evidence or an
artifact, but the parent workflow still owns approval, verification, and closure.

## Discipline Model

Disciplines organize related skills and workflows across a work domain, such as
writing, design, SEO, paid ads, or WordPress operations. A discipline defines
modes, quality gates, skill maps, and migration decisions. It does not replace
roles or workflows.

Canonical discipline contracts live in `.agents/disciplines/<discipline>/`.
Runtime-specific or copied skills are source material until a discipline maps
them into an active canonical skill, workflow, reference, or archive state.

## Workflow Registry

Workflow contracts live in `.agents/workflows/<workflow>/`. The operator-facing
workflow matrix lives in `harness/workflows.md`.

Workflow resolution is mandatory. If a user request matches a canonical workflow
by explicit command, adapter, alias, or clear task shape, the active runtime must
read the workflow spec and contract before acting. A runtime may only skip a
matching workflow by stating why the workflow does not fit the actual request.

Use the matrix before adding a workflow, skill, or runtime adapter. If a proposed
addition does not have a clear row in the matrix, it is probably still a skill,
reference, role behavior, or vault organization task rather than a workflow.

## Adapter Model

Adapters expose canonical contracts to a runtime. They may translate discovery
format, frontmatter, tool labels, and invocation style, but they must not contain
independent behavior, policy, approval rules, or done criteria.

Current generated adapter surfaces:

- Claude command adapters: `.claude/commands/*.md`
- Codex workflow skill adapters: `.agents/skills/workflow-*/SKILL.md`
- Codex role skill adapters: `.agents/skills/role-*/SKILL.md`
- Hook config adapters: `.claude/settings.json`, `.codex/hooks.json`, and
  `.gemini/settings.json`

Gemini and Hermes role/profile adapters stay pending until their local discovery
contracts are defined. Do not invent active runtime files without a verifier.

### Adapter Parity Rule

Every canonical workflow must have:

- `.agents/workflows/<workflow>/workflow.md`
- `.agents/workflows/<workflow>/contract.json`
- `.claude/commands/<workflow>.md`
- `.agents/skills/workflow-<workflow>/SKILL.md`

Every canonical role must have:

- `.agents/roles/<role>/contract.json`
- `.agents/roles/<role>/role.md`
- `.agents/skills/role-<role>/SKILL.md`

Generated adapter surfaces must be thin. They point to canonical files, pass
invocation context through, and declare that the canonical contract wins on
conflict. Claude-native role agents are disabled in this version; do not
recreate `.claude/agents/` unless the methodology explicitly re-approves
runtime-native subagent dispatch. `.agents/scripts/verify-adapters.mjs` enforces
the current parity rule.

## Approval Model

Approval is based on blast radius, not runtime identity. See
[[harness/policies/approvals]] for the full matrix.

Default behavior:

- Read-only vault work may proceed.
- Reversible vault writes may proceed when scoped by the user request.
- External reads must be labeled as evidence.
- External mutations require explicit approval.
- Destructive, production, database, user/role, deployment, and secret-handling
  actions require explicit approval.

## Verification Model

Verification is layered:

1. Workflow contract validation.
2. Adapter parity validation.
3. Vault integrity validation.
4. Workflow-specific done predicates.
5. User approval when the policy requires it.

The deterministic gate is `.agents/scripts/gate.mjs`.

## Trust Model

Trust is tracked per workflow, skill, role, and adapter. It is not granted to a
runtime globally.

Default tiers:

- `watch`: may draft or run with close supervision.
- `queue`: may complete verified work, but closure waits for review.
- `auto`: may close only within its declared approval class and done predicate.

Failures demote or block promotion. The ledger is
`harness/ledgers/trust.tsv`. Use `.agents/scripts/trust-ledger.mjs` to render
tiers or record verified passes and failures.

## Standing Goals

Completed structural promises become standing goals under `harness/goals/`.
Each goal has a predicate that can be rechecked. A goal that passed once is not
closed forever; it is an invariant that can later fail.

The goal ledger is `harness/ledgers/goal-ledger.tsv`. Use
`.agents/scripts/verify-goals.mjs` to recheck standing goals and record results.

## Scaling Rule

Do not add unattended loops until the following are true:

- contracts exist
- approval gates exist
- deterministic gate passes
- trust ledger exists
- standing goals exist
- runbooks exist for alarms
- adapter parity is checked
- budget policy exists

Loop scaffolding lives in `.agents/loop/`, but scheduled execution remains
disabled until those prerequisites are satisfied and the user explicitly enables
it.

## Pause Points

Step back and validate when any of these are true:

- a new discipline is started
- a workflow contract is added, removed, or materially changed
- an adapter generator or verifier changes
- a copied skill is promoted into canonical behavior
- an approval class changes
- a runtime-specific folder starts accumulating behavior

At each pause point, run the deterministic gate and update the dispatch or trust
ledger with the result.

Move to vault organization when the next problem is retrieval, placement,
Obsidian UX, or human navigation rather than runtime behavior. Typical signals:

- agents can invoke the right workflow, but cannot reliably find project/client
  context
- files are valid but hard to browse
- `Home.md`, Bases, indexes, or folder placement are blocking daily use
- workflow output is landing in the right format but the wrong surface
