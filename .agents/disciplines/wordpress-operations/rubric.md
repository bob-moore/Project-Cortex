---
description: Canonical WordPress operations quality gate and scoring rubric.
tags:
  - harness
  - discipline
  - wordpress
  - operations
  - rubric
---

# WordPress Operations Quality Gate

Use this rubric before treating mutable WordPress work as ready for parent
verification, handoff, production approval, rollback closure, or follow-up.

## Blocking Findings

Any blocking finding prevents a ready/done claim regardless of score:

- Exact client, site, environment, access adapter, or target object was not
  identified before mutation.
- A write occurred without the approval class required by the environment or
  risk tier.
- A production administrative, destructive, migration, plugin/theme lifecycle,
  user/role, broad option, or restore action occurred without explicit approval.
- Before-state or rollback is missing for consequential, production, or broad
  state changes.
- Completion is claimed from an MCP/API/WP-CLI/browser success response without
  stored-state readback and user-visible verification when applicable.
- Mutable content/state work bypassed a required Developer code capability.
- Secrets were requested, printed, stored, or exposed unsafely.
- Shared/collateral surfaces were not checked after changing navigation,
  patterns, templates, Global Styles, forms, redirects, cache, or integrations.

## Evidence Labels

Label material judgments:

- `authority`: user request, workflow contract, Stack note, approved artifact.
- `state-fact`: inspected WordPress object, option, setting, media, or
  database-backed state.
- `adapter-fact`: MCP, REST, WP-CLI, browser, helper, or WPRemote output.
- `rendered-fact`: HTTP/browser-visible behavior.
- `rollback-fact`: captured prior value, revision, export, backup, or restore
  path.
- `assumed`: not verified; must be surfaced as an open item.
- `blocked`: could not be checked; report what would unblock it.

## Score

Score to 100 only after blocking findings are handled.

| Category | Points | What Good Looks Like |
|---|---:|---|
| Target and Approval | 20 | Site, environment, adapter, target object, user/capability, and approval class are explicit. |
| Before-State and Rollback | 20 | Prior value, revision, export, backup, or restore path is captured before risky changes. |
| Change Quality | 20 | Smallest bounded mutation; no unrelated cleanup; existing blocks/settings used safely. |
| Verification Evidence | 20 | Stored state, adapter readback, rendered/functional behavior, and collateral surfaces checked. |
| Handoff Quality | 20 | IDs, URLs, access method, changes, checks, rollback, uncertainty, and next owner are clear. |

## Report Shape

Return:

```text
WordPress Operations Quality Gate
Mode:
Client/Site/Environment:
Verdict: pass | revise | blocked | rolled-back
Score: N/100

Blocking Findings:
- ...

Evidence:
- ...

Rollback:
- ...

Skipped Checks:
- ...

Open Items:
- ...

Next:
- ...
```
