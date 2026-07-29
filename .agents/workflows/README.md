# Workflows

Canonical runtime-neutral workflow specs live here.

Each workflow uses this path:

```text
.agents/workflows/<workflow-name>/workflow.md
.agents/workflows/<workflow-name>/contract.json
```

Runtime adapters may expose these as slash commands, prompt commands, menu
items, or tool calls. The behavior belongs in the workflow spec, not in the
adapter.

## Contract Files

`workflow.md` is the human-readable operating spec. `contract.json` is the
machine-readable control contract used by validators, generators, and future
runtime dispatch.

Each contract declares:

- risk tier
- approval classes
- inputs
- write surfaces
- external reads and mutations
- approval gates
- done predicates
- verification checks
- return contract
- related roles

Approval classes come from `harness/policies/approvals.md`.

## Operations Workflows

- `assistant`

## Vault Workflows

- `vault-audit`
- `vault-capture-1on1`
- `vault-dump`
- `vault-humanize`
- `vault-incident-capture`
- `vault-intake`
- `vault-kickoff`
- `vault-meeting`
- `vault-peer-scan`
- `vault-prep-1on1`
- `vault-project-archive`
- `vault-review-brief`
- `vault-review-peer`
- `vault-self-review`
- `vault-slack-scan`
- `vault-standup`
- `vault-stash-session`
- `vault-weekly`
- `vault-wrap-up`

## Writing Workflows

- `refresh-article`
- `repurpose-content`
- `write-article`
- `write-email-newsletter`
- `write-web-copy`

## SEO Workflows

- `seo-hreflang`
- `seo-images`
- `seo-page-audit`
- `seo-schema`
- `seo-site-audit`
- `seo-sitemap`
- `seo-technical-audit`
