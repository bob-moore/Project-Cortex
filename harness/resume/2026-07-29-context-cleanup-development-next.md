---
description: "Context cleanup checkpoint after SEO stash, Design, Development, and Marketing porting passes."
tags:
  - harness
  - resume
  - skills
  - development
status: active
created: 2026-07-29
---

# 2026-07-29 Context Cleanup And Development Next

## Purpose

Use this note to resume after context cleanup without replaying the full
conversation.

Bob asked to save the current state and next Development steps, then shift to
cleaning up context.

## Current State

SEO:

- Paused/stashed.
- Resume from `harness/resume/2026-07-29-seo-skill-stash.md`.
- Do not bulk-port SEO packages while paused.

Design:

- First-pass canonical Design discipline exists.
- Shared Accessibility discipline exists and is available to Design,
  Development, WordPress, Writing, and Verification.
- Remaining work is cleanup, dedupe, and optional prototype/reference
  extraction.

Development:

- First-pass canonical Development discipline exists.
- `developer-delivery` is active as the core repository implementation loop.
- Astro and WordPress code-development skills are imported and active.
- WordPress operation/MCP usage is intentionally separate under
  `wordpress-operations`.
- Karpathy-style guidance was extracted into Development modes/rubric instead
  of activated as a separate always-on skill.

Marketing:

- First-pass Marketing discipline exists.
- Research, keyword, competitor, strategy, analytics, CRO, UTM,
  social/newsletter channel operations, email deliverability, and email QA
  skills are active.

- Paid Ads remains excluded and should be rebuilt from scratch only when Bob
  asks for a paid ads role.

## Current Worktree Notes

The worktree is intentionally dirty from the porting session. Do not clean,
reset, or revert unrelated changes during resume.

Notable unrelated or user/environment changes seen during this checkpoint:

- `.obsidian/appearance.json`
- `.obsidian/community-plugins.json`
- `.obsidian/plugins/lean-terminal/`
- `.obsidian/themes/`
- `Clients/MH Imaging/MH Imaging.md`
- `Projects/active/People4Pulse - Website Build/People4Pulse - Website Build.md`
- `Projects/active/Systems Furniture Installations - Homepage Rewrite/Systems Furniture Installations - Homepage Rewrite.md`

Primary porting changes are under:

- `.agents/disciplines/`
- `.agents/skills/`
- `.agents/roles/`
- `.agents/manifest.yaml`
- `harness/audits/`
- `harness/skills.md`
- `harness/resume/`

## Next Development Work Order

Analyze and import general Development specialists.

Priority:

1. `diagnosing-bugs` -> debugging or bug-diagnosis specialist.
2. `code-review` -> findings-first review skill with Verifier boundary.
3. `acceptance-test-builder` -> acceptance criteria and test evidence support.
4. `dependency-upgrader` -> dependency-maintenance skill.
5. `resolving-merge-conflicts` -> git-procedures skill.
6. `performance` and `performance-optimizer` -> measured performance
   remediation, if worth activating.
7. `release-publisher` -> release-handoff reference, approval-gated.
8. `architecture-auditor` and `codebase-auditor` -> architecture-audit
   reference or specialist.
9. `test-strategy-planner` and `test-suite-auditor` -> defer unless testing
   strategy becomes recurring.

Cloudflare remains a gap; no current global Cloudflare skill was found in the
quick source check. Build it later from client need, not speculation.

## Boundaries For Next Pass

- Do not copy global skills wholesale.
- Keep canonical machinery in `.agents/`.
- Keep operating state and import decisions in `harness/`.
- Keep repository-local instructions higher priority than vault-global
  development skills.
- Keep WordPress live state operations routed to `wordpress-operations`, not
  Developer.
- Keep release/deployment, remotes, destructive actions, external systems,
  production, secrets, DNS, and Cloudflare mutations approval-gated.

## Resume Commands

```bash
git status --short
sed -n '1,260p' harness/audits/development-skill-import-plan.md
sed -n '1,260p' .agents/disciplines/development/skill-map.json
node .agents/scripts/gate.mjs
```

## Last Validation

Before this checkpoint, the previous Marketing slice passed:

- JSON parse checks.
- Marketing skill frontmatter checks.
- `.agents/manifest.yaml` YAML parse.
- `node .agents/scripts/gate.mjs`.
- `git diff --check`.

Run the gate again after this checkpoint note and audit-plan update.
