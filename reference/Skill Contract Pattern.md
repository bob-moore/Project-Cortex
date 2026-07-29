---
date: 2026-07-16
description: "Canonical pattern for skill documentation: trigger, contract, inputs, method, gates, handoff, and evidence labels."
tags:
  - reference
---

# Skill Contract Pattern

Use this pattern when creating or revising skills under `.agents/skills/`.

Skills are reusable capability instructions. They do not own task approval,
mutation, or closure by themselves. A workflow or parent agent owns the contract,
approval boundary, verification, and final done claim.

## Required Shape

Every skill should make these pieces easy to find:

1. **Trigger** — when the skill must be used.
2. **Contract** — reads, writes, does not do, done when, and boundaries.
3. **Context Resolution** — what vault files or external sources must be checked.
4. **Method** — the numbered operating procedure.
5. **Quality Gate** — rubric, pass/fix/block criteria, or checklist.
6. **Handoff** — what the parent workflow receives when the skill is complete.
7. **Next Routing** — adjacent skills or workflows that may follow.

## Frontmatter

At minimum:

```yaml
---
name: skill-name
description: "Use when..."
---
```

The `description` is a routing contract. It should name the real task triggers,
not just summarize the topic.

## Contract

Include a compact contract section:

- **Reads:** required inputs and context.
- **Writes:** produced artifacts, if any.
- **Does not:** explicit non-actions.
- **Done when:** observable completion criteria.
- **Boundary:** adjacent roles, skills, workflows, or tools that own nearby work.

When a skill supports multiple modes, state the mode-selection rule directly.
Do not rely on runtime-specific agents to infer it.

## Context Resolution

Client-facing skills resolve client context before drafting, planning, or
editing:

1. Identify the client from the conversation or ask if ambiguous.
2. Read `Clients/<Client>/<Client> Brand.md` when brand position matters.
3. Read `Clients/<Client>/<Client> Voice.md` when wording or tone matters.
4. Read `Clients/<Client>/<Client> Stack.md` when implementation constraints
   matter.
5. Read project files under `Projects/active/<Project>/` when the work belongs
   to a bounded engagement.

If required files are missing or placeholders, flag the gap. Do not invent
client context.

## Evidence Labels

Every metric, claim, or external fact used in a report-style output should be
labeled:

- **Measured:** directly observed through a file read, fetched page, command,
  API response, or screenshot.
- **User-provided:** supplied by Bob, a client, a meeting note, a transcript, or
  another unverified source.
- **Estimated:** an explicit assumption used because better evidence is not
  available.

Do not silently turn estimates into facts.

## Gate Verdicts

Use this vocabulary for quality gates when a skill evaluates work:

- **Pass:** meets the contract and can move forward.
- **Fix:** usable direction, but specific corrections are required first.
- **Block:** cannot proceed without missing context, approval, access, or a
  critical correction.

Use veto rules where appropriate: a critical factual, legal, security,
accessibility, or approval failure can block a deliverable even if most rubric
items pass.

## Handoff

A skill handoff should include:

- status
- output or artifact path
- evidence used
- assumptions or unresolved gaps
- recommended next workflow, role, or skill when relevant

The handoff should be short enough for the parent workflow to use directly.

## Source Material

External skill packages, examples, and rubrics can inform a skill, but the final
skill must be adapted to this vault's methodology:

- `.agents/` is canonical.
- `harness/` owns operating knowledge.
- workflows own approvals and done state.
- client/project context is resolved from the vault.
- runtime-specific files are adapters.
