# Deliver Web Change

## Purpose

Deliver a bounded, user-visible repository change through the canonical
Designer → Developer → rendered-review → independent-Verifier path. This
workflow exists so that web changes close on evidence bound to the final
artifact state, never on producer self-report, HTTP 200, or build success
alone.

This workflow does not deploy, publish, mutate WordPress state, or approve
its own direction. Production or deployment is a separate approval-gated
operation.

## Invocation

- Canonical workflow: `deliver-web-change`
- Runtime adapters may expose this as `/deliver-web-change`,
  `deliver-web-change`, `web change`, `ship web change`, or
  `implement web change`.
- Invoke when a request asks for a user-visible change to a repository-backed
  website: layout, styling, component, page, interaction, or rendered behavior.
- Mutable WordPress state routes to `wordpress-operator`; version-controlled
  capability routes to `developer`; hybrid work is serialized, not parallel.

## Required Context

- Start with `harness/manual.md`, `harness/operator.md`, and `harness/user.md`.
- Read `harness/policies/contract.md`, `harness/policies/approvals.md`, and
  `harness/policies/done.md`.
- Read `.agents/disciplines/design/contract.json` and
  `.agents/disciplines/development/contract.json` for the active role
  boundaries.
- For client work, read Brand, Voice, Design Tokens, and Stack notes before
  dispatching any role.
- The executable stage graph for this workflow lives in `contract.json` under
  `execution`; the stages below describe the same topology in prose.

## Workflow

### 1. Resolve the contract (control plane)

Resolve the target repository, target environment, approved content/design,
acceptance criteria, approval class, and artifact identity requirements
(branch, build, URL, or commit). If any of these cannot be proven, stop and
report the missing prerequisite.

Completion criterion: a work contract exists that names all of the above.

### 2. Design specification (`designer`, conditional)

When visual intent or an approved design is absent or insufficient, the
Designer produces a specification and acceptance matrix using
`design-delivery`. The matrix maps each visual/behavioral criterion to an
observable check. Implementation may not begin until direction approval is
recorded.

Completion criterion: an approved specification and acceptance matrix exist,
or this stage was explicitly not required by the work contract.

### 3. Implementation (`developer`)

The Developer implements the change using `developer-delivery`, dynamically
selecting the platform skill (`astro`, WordPress code skills, or another
inspected platform skill) from repository manifests — never from task wording
alone. The Developer returns repository, branch, changed files, tests, build,
lint, diff summary, and runnable artifact identity.

Completion criterion: the implementation report carries all of the above, and
the final diff has been inspected for scope, secrets, generated files, and
unrelated churn.

### 4. Designer rendered review (`designer`, fresh context)

The Designer reviews the rendered artifact in a fresh context using
`design-delivery` in `rendered-review` mode. The review compares only against
the approved design and the observable quality contract — representative
desktop, mobile, intermediate widths, and relevant interaction states.

Completion criterion: a designer review report records conformance issues with
evidence, owner, severity, and recheck scope, or records conformance.

### 5. Independent web verification (`verifier`, fresh context)

The Verifier independently checks the rendered result using
`web-quality-verification`: browser, responsive, interaction,
computed/rendered result, console/network, accessibility, metadata, and
risk-based collateral surfaces. HTTP 200 or build success never satisfies
visual or behavioral criteria.

Completion criterion: every acceptance criterion has an observed
PASS/FIX/BLOCK/UNDECIDED result with measured evidence.

### 6. Independent code review (`verifier`, conditional, fresh context)

When the work carries meaningful code risk or the work contract requests it,
the Verifier reviews the diff using `code-review` against a fixed comparison
boundary. Findings carry direct evidence, severity, location, and disposition.

Completion criterion: a code-review report exists, or the stage was
explicitly not required and that decision is recorded.

### 7. Parent gate (control plane)

The parent checks that all review evidence is bound to the final artifact
hash, commit, build, or URL state.

- PASS closes the workflow.
- FIX routes to `implementation`, resuming the producer's original context.
- BLOCK or UNDECIDED reports the missing proof or approval.

Any implementation change after review invalidates prior review for closure
and requires re-dispatch against the final state. Producer self-report never
closes the workflow.

## Writes

- Repository writes occur only in the `implementation` stage under the
  Developer role boundary.
- Design specifications and acceptance matrices are vault or project writes
  under the Designer role boundary.
- Review and verification reports are written only when the work contract
  requests them.
- No stage mutates production, WordPress state, remotes, or external systems.

## Approval Gates

- `direction approval recorded` — required before implementation when the
  design-specification stage runs.
- External reads (rendered URLs, screenshots, console/network evidence) follow
  `harness/policies/approvals.md`.
- Production or deployment is a separate approval-gated operation outside
  this workflow.
- Direction, copy, and closure approval remain with the user or parent
  workflow, never with a producing role.

## Verification

- `node .agents/scripts/verify-workflows.mjs` validates this contract's
  topology, role/skill references, and review semantics.
- `node --test .agents/scripts/verify-workflows.test.mjs` covers this
  workflow's executable contract in the permanent suite.
- `node .agents/scripts/gate.mjs` keeps the repository gate green.
- Runtime closure additionally requires the stage-level verification
  obligations in `contract.json` to hold against real evidence.

## Return Format

```text
Status: closed | fix-routed | blocked | undecided
Work contract:
Stages:
Evidence:
Reviews:
Open Items:
Next:
```

## Related Roles

- `designer` — visual intent, specification, rendered conformance review
- `developer` — version-controlled implementation and local verification
- `verifier` — independent rendered and code verification, fresh context
- `wordpress-operator` — mutable WordPress state, when the change crosses
  that boundary (serialized, never parallel with Developer)
