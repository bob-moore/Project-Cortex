# Roles

Canonical runtime-neutral role contracts live here.

Roles are capability contracts, not personalities and not autonomous closure
authorities. A role defines ownership boundaries, approval classes, required
context, verification obligations, and return shape.

Runtime-specific agents, profiles, or subagents are adapters generated from or
mapped to these contracts.

## Current Roles

- `operator`: parent control-plane role for routing, approval, verification, and closure.
- `assistant`: read-first operational evidence for the User's workload, calendar, and email.
- `strategist`: Brand, Voice, positioning, market research, marketing strategy, analytics, CRO, and channel strategy.
- `writer`: source-grounded drafts and edits, never publishing.
- `designer`: visual intent and conformance, never production mutation.
- `developer`: version-controlled code and tests.
- `wordpress-operator`: mutable WordPress state with explicit environment and approval boundaries.
- `verifier`: fresh-context verification against contract and evidence.
- `vault-librarian`: vault structure, frontmatter, indexes, and stale context.
- `cross-linker`: wikilinks, backlinks, orphans, and related-note quality.
- `review-evidence`: candidate review evidence and evidence gaps.
- `review-prep`: review evidence aggregation and source packets.
- `slack-archaeologist`: Slack evidence and timeline reconstruction.
- `people-profiler`: person-note updates from scoped evidence.

## Files

Each role uses:

```text
.agents/roles/<role>/role.md
.agents/roles/<role>/contract.json
```

Validate with:

```bash
node .agents/scripts/verify-roles.mjs
```
