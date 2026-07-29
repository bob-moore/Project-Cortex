---
description: "Resume note for vault-stash-session workflow and SEO discipline foundation work."
tags:
  - harness
  - resume
status: active
created: 2026-07-28
---

# Vault Stash Session Resume

## Resume Prompt

Start with:

```text
Resume ProjectCortex vault-stash-session and SEO discipline work. Read this note first: harness/resume/2026-07-28-vault-stash-session.md
```

## Objective

Continue the vault architecture work around durable resume context. Bob asked
whether the vault should have shorthand for "create a memory to resume from"
after a logout or future session.

## Current State

The answer is yes: generic runtime memory is useful but too lossy for
in-progress vault architecture work. The implemented shape is a canonical
workflow named `vault-stash-session` that writes curated resume notes under
`harness/resume/` and keeps `harness/memory.md` pointed at the resume-note
index.

This session also recently added the Phase 1 SEO discipline foundation:
`.agents/disciplines/seo/`, `seo-foundation`, and `seo-quality-gate`.

The SEO adaptation then continued into Phase 2 by adding neutral CLI tool
contracts and `seo-tool-runner`.

## Changed Files

Relevant current changes include:

- `.agents/workflows/vault-stash-session/contract.json`
- `.agents/workflows/vault-stash-session/workflow.md`
- `.agents/skills/workflow-vault-stash-session/SKILL.md`
- `.claude/commands/vault-stash-session.md`
- `harness/resume/README.md`
- `harness/resume/2026-07-28-vault-stash-session.md`
- `harness/memory.md`
- `harness/workflows.md`
- `.agents/workflows/README.md`
- `.agents/manifest.yaml`
- `.agents/disciplines/seo/`
- `.agents/skills/seo-foundation/`
- `.agents/skills/seo-quality-gate/`
- `.agents/skills/seo-tool-runner/`
- `.agents/tools/seo/`

Pre-existing dirty or untracked work was present before the session-stash
workflow work:

- `.gitignore`
- `harness/ledgers/goal-ledger.tsv`
- `harness/roadmap.md`
- `harness/audits/`
- `harness/roadmaps/`

Do not revert those without Bob asking.

## Decisions

- Use a workflow, not only a standalone skill, because this has a repeatable
  task shape, writes durable notes, requires verification, and needs runtime
  adapters.
- Use `vault-stash-session` as the canonical name to stay aligned with existing
  vault workflow naming.
- Do not write curated resume notes into `harness/session-logs/`; that folder
  is reserved for transcript backups from runtime compaction hooks.
- Use `harness/resume/` for curated handoff notes.
- Keep the Claude command adapter and Codex workflow skill adapter thin; the
  behavior belongs in `.agents/workflows/vault-stash-session/`.

## Must Read First

- `harness/manual.md`
- `harness/memory.md`
- `harness/resume/README.md`
- `.agents/workflows/vault-stash-session/workflow.md`
- `.agents/workflows/vault-stash-session/contract.json`
- `harness/audits/seo-import.md`
- `harness/audits/seo-skill-inventory.md`
- `harness/roadmaps/seo.md`

## Validation

The full gate passed after adding the workflow and adapters:

```text
PASS verify-workflows
PASS verify-roles
PASS verify-disciplines
PASS verify-adapters
PASS verify-hooks
PASS verify-vault
PASS gate
```

The Claude adapter generator succeeded. The Codex workflow skill generator hit
`EPERM` when trying to overwrite existing generated skill adapters, so the new
`workflow-vault-stash-session` adapter was added manually in the same generated
format. The full adapter gate passed afterward.

## Blockers And Risks

- The working tree is intentionally dirty; separate Bob's pre-existing changes
  from changes made for this workflow.
- Future sessions should run `git status --short` before making assumptions.
- If the adapter generator failure matters, investigate why the sandbox could
  not overwrite existing `.agents/skills/workflow-*` files.
- The neutral SEO CLI tools are integrated as contracts but are not installed
  in the current shell PATH as of the check in this session.

## Next Action

Use the new workflow when Bob says "stash session", "save resume context",
"create resume note", or `/vault-stash-session`.

If continuing implementation, inspect `git status --short`, then decide whether
to commit the Phase 1 SEO discipline, Phase 2 SEO tool contracts, and
`vault-stash-session` workflow together or split them into separate commits.
