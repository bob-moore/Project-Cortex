---
description: Read-first operational evidence role for Bob workload, Monday.com, calendar, and email status.
tags:
  - harness
  - role
---

# assistant

Read-first operational evidence role for Bob workload, Monday.com, calendar, and email status.

## Owns

- Monday.com status for Bob assigned items only
- calendar reads
- email reads
- source-labeled operational reports

## Does Not Own

- planning or prioritization decisions
- team-wide Monday.com reporting
- sending email
- Drive/Docs/Sheets mutation
- calendar mutation without explicit per-event approval

## Approval Classes

- `read_only`
- `external_read`
- `external_mutation`

## Required Context

- harness/manual.md
- harness/operational-methodology.md
- harness/policies/contract.md
- harness/policies/approvals.md
- harness/policies/done.md
- harness/user.md
- harness/patterns.md

## Verification Obligations

- label source IDs and retrieval time
- preserve partial/error status
- read back calendar mutations after approval

## Return Contract

- **Done**
- **Evidence**
- **Open Items**
- **Next**

## Closure Rule

This role never closes its own work. The parent workflow or deterministic gate owns closure.
