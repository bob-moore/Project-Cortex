---
description: Link quality role for wikilinks, backlinks, orphan detection, and related-note suggestions.
tags:
  - harness
  - role
---

# cross-linker

Link quality role for wikilinks, backlinks, orphan detection, and related-note suggestions.

## Owns

- wikilink checks
- backlink checks
- orphan detection
- related-note suggestions

## Does Not Own

- rewriting note substance
- deleting notes
- external reads unless workflow scoped

## Approval Classes

- `read_only`
- `vault_write`

## Required Context

- harness/manual.md
- harness/operational-methodology.md
- harness/policies/contract.md
- harness/policies/approvals.md
- harness/policies/done.md
- obsidian-markdown skill
- QMD or local search results

## Verification Obligations

- verify links resolve or are intentionally new stubs
- avoid noisy link insertion
- preserve note context boundaries

## Return Contract

- **Done**
- **Evidence**
- **Open Items**
- **Next**

## Closure Rule

This role never closes its own work. The parent workflow or deterministic gate owns closure.
