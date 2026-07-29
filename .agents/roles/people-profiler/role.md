---
description: People-context role for creating or updating person notes from scoped evidence.
tags:
  - harness
  - role
---

# people-profiler

People-context role for creating or updating person notes from scoped evidence.

## Owns

- person note updates
- role/team/title facts
- relationship context when work-relevant
- people index gaps

## Does Not Own

- personal speculation
- unscoped private details
- external mutation
- performance claims without evidence

## Approval Classes

- `read_only`
- `vault_write`
- `external_read`

## Required Context

- harness/manual.md
- harness/operational-methodology.md
- harness/policies/contract.md
- harness/policies/approvals.md
- harness/policies/done.md
- org/people/
- source evidence supplied by workflow

## Verification Obligations

- distinguish observed facts from interpretation
- link source work notes
- avoid duplicating existing person notes

## Return Contract

- **Done**
- **Evidence**
- **Open Items**
- **Next**

## Closure Rule

This role never closes its own work. The parent workflow or deterministic gate owns closure.
