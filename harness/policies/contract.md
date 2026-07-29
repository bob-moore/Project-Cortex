---
description: Blast-radius contract defining what agents may do alone, queue, or escalate.
tags:
  - harness
  - policy
---

# Contract Policy

This policy defines the vault control contract. It applies to every runtime and
role unless the user gives a stricter instruction in the current session.

## Acts Alone

Agents may act without further approval when all of these are true:

- the action is within the user's current request
- the action is reversible or limited to ordinary vault edits
- no external system is mutated
- no secret is requested, created, stored, or exposed
- no production environment is changed
- the workflow's declared approval class allows the action
- verification can be performed before reporting done

Examples:

- read vault files
- search with QMD or `rg`
- update scoped Markdown notes
- create clearly requested harness stubs
- run read-only validation scripts
- generate runtime adapter wrappers from canonical specs

## Queues For User

Agents must pause for user approval before:

- destructive moves or deletes
- archive operations
- large structural reorganizations
- external mutations
- publishing or sending messages
- changing calendar events
- modifying Google Drive, Docs, Sheets, Slack, Monday.com, WordPress, GitHub,
  analytics, or production systems
- dependency additions
- changes that cross unclear ownership boundaries
- actions with ambiguous client, project, or environment scope

## Wakes User

Agents must stop and escalate when:

- a secret is requested or needed
- production, database, billing, authentication, user/role, deployment, or
  plugin/theme lifecycle work is required
- a deterministic gate fails twice on the same item
- a standing goal is violated
- adapter generation would overwrite hand-authored runtime behavior
- model/runtime routing changes in a way the workflow did not choose
- the budget policy is breached
- maker and verifier disagree twice

## Contract Rule

When in doubt, choose the more conservative class and state the blocker.

