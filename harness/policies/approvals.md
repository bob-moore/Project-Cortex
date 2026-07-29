---
description: Approval class matrix for vault, external, destructive, and production actions.
tags:
  - harness
  - policy
---

# Approval Policy

Approval gates are based on blast radius.

## Approval Classes

| Class | Meaning | Default |
|---|---|---|
| `read_only` | Search, inspect, summarize, validate without writing. | Acts alone |
| `vault_write` | Create or edit tracked vault notes or harness files. | Acts alone when scoped |
| `adapter_write` | Generate or update runtime adapters from canonical specs. | Acts alone when generated and verified |
| `external_read` | Read Monday.com, Calendar, Gmail, Slack, GitHub, WordPress, analytics, or other connected systems. | Acts alone only when scoped; label evidence |
| `external_mutation` | Send, publish, update, create, or delete in an external system. | Queue for user |
| `destructive` | Delete, archive, move, overwrite, reset, or irreversible local changes. | Queue for user |
| `production` | Deploy, database, user/role, billing, authentication, plugin/theme lifecycle, live site state. | Wake or queue explicitly |
| `secret` | Request, create, move, reveal, or store credentials. | Wake user |

## Evidence Requirements

External reads must preserve:

- source system
- source ID or URL when available
- retrieval time
- partial or failure status
- whether the data was inferred or directly observed

## Mutation Requirements

External mutation requests must include:

- exact target
- intended change
- rollback or correction path when available
- approval class
- verification method

## Done Boundary

Approval permits the action. It does not make the action done. Done still
requires the workflow's verification gate.

