# Schemas

Schemas for manifests, roles, workflows, work orders, verification results,
frontmatter, and adapter generation live here.

- `workflow.schema.json`: machine-readable workflow contract shape.
- `role.schema.json`: machine-readable role capability contract shape.
- `work-order.schema.json`: bounded unit of work produced from a workflow.
- `verification-result.schema.json`: structured verifier/gate result.
- `artifact-identity.schema.json`: rich identity record binding reviews to the
  exact repository, file, build, URL, or deployment state under review.

## Artifact Identity

Artifact identity is stronger than a bare hash in a prose report. Each record
has an artifact ID, kind, repository/source reference, identity method/value,
state, and creation time, with optional supersession, environment, build, and
URL fields. A final review must cite the final artifact ID. Any implementation
change creates a new identity and marks prior evidence stale or superseded.

The durable registry is `harness/ledgers/artifacts.tsv`; validation is:

```sh
node .agents/loop/verify-artifacts.mjs
```

## Executable Workflow Contracts

`workflow.schema.json` keeps `execution` optional so existing prose-only
workflows remain valid. A workflow that declares `execution` must provide:

- `primary_roles`: canonical role names from `.agents/roles/*/contract.json`.
- `required_skills`: canonical skill names from `.agents/skills/**/SKILL.md`.
- `stages`: the authoritative ordered execution topology.

Every stage declares its role, skills, dependencies, approval gate, produced
outputs, verification obligations, context policy, and optional revision edge.
Each primary role must own at least one stage, and every role-owned stage must
name one of the declared primary roles.
`depends_on`, `evidence_for`, and `revision_target` may reference only earlier
stages. `evidence_for` identifies which producer stage a review evaluates.
`revision_target` means resume that producer stage's existing execution context;
it is invalid on a stage that also requests `fresh_context`.
Evidence and revision edges must target stages with declared outputs. Every
Verifier stage that reviews evidence must request a fresh context.

The semantic verifier resolves role and skill names, rejects invalid stage
graphs, checks approval-gate references, and requires a fresh Verifier stage
when `verifier` is a primary role:

```sh
node --test .agents/scripts/verify-workflows.test.mjs
node .agents/scripts/verify-workflows.mjs
```
