# Alfred contribution proposal: learning, diary, and task contracts

Status: prepared for Cortex review; not released or applied.
Source: Alfred repository revision `7300951` plus the inspected working-tree implementation snapshot on 2026-08-31.

## Intent

Promote reusable mechanics from Alfred without importing any diary entries, task records, client rules, personal preferences, Graphify output, runtime settings, or source-vault history.

## Classification

| Candidate | Classification | Core treatment |
|---|---|---|
| Session-diary format changes | Portable methodology | Adapt into a generic core README; exclude actual diary entries. |
| `vault-learning-loop` workflow and contract | Portable workflow | Add after normalizing write locations and generated adapters. |
| Learning-loop synthesis notes | Instance evidence | Exclude. |
| `soft-rules.md` ledger | Mixed | Do not copy its dated ledger; add a generic soft-rules contract/template instead. |
| `vault-wrap-up` correction capture | Portable workflow behavior | Update with generic references only. |
| Task queue README/template/validator | Portable methodology and runtime check | Adapt into generic template, task verification, and task README; exclude all task records. |
| Alfred task records and execution notes | Instance evidence | Exclude. |

## Required core-boundary change

Current `core-managed-paths.yaml` excludes `Tasks/` and `harness/session-diary/` by prefix, which also blocks their portable README contracts. Before this proposal can become a release, replace that broad rule with explicit instance-content exclusions and exact portable-document allowlisting. The updater must retain local-override protection for both kinds of path.

## Draft release shape

The accompanying `changelog.draft.yaml` proposes `v0.2.0` only. It is intentionally invalid as a published changelog until the normalized Cortex source files exist and are validated.

## Acceptance criteria

1. A consumer receives generic diary, learning-loop, and task mechanics only.
2. No client names, diary/task records, source-vault paths, dated synthesis evidence, or runtime-local settings enter Cortex.
3. The learning loop reads evidence and writes a dated synthesis, but rule promotions remain explicit approvals.
4. Wrap-up preserves atomic corrections, in-session repeat counts, and counter-evidence from task execution notes.
5. Task records require resolvable produced-artifact links where an artifact is claimed.
6. Generated Claude/Codex/Hermes adapters are regenerated from canonical workflow sources.
7. The resulting `v0.2.0` chain passes release validation, targeted tests, and the full gate.

## Review decisions still required

- Final core location for generic soft-rule guidance: `harness/soft-rules/README.md` is recommended instead of importing Alfred's `harness/soft-rules.md` ledger.
- Whether generic task mechanics should be available in every consumer by default or enabled through the managed-paths manifest.
- Whether to include Graphify refresh in a later, independent proposal. It is excluded from this contribution.
