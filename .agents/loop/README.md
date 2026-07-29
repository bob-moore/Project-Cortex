# Loop

Automation loop scaffolding lives here. This layer is disabled by default.

The conductor/worker model from the methodology is represented here only as
scaffold. It does not currently dispatch subagents, select cheaper models, or
run unattended work. The deferred dispatcher capability is tracked in
`harness/roadmap.md`.

Do not enable scheduled or unattended runs until:

- `.agents/scripts/gate.mjs` passes
- `harness/policies/contract.md` is current
- `harness/ledgers/trust.tsv` has meaningful history
- `harness/goals/` has standing goals
- `harness/policies/budget.md` defines a daily cap
- `harness/runbooks/alarms.md` covers every alarm

## Files

- `triage.md`: cheap read-only signal prompt.
- `conductor.md`: planner prompt that emits one bounded work order.
- `workers/implement.md`: worker prompt.
- `workers/verify.md`: fresh-context verifier prompt.
- `loop.mjs`: dry-run loop entrypoint.

## Current State

Prototype only. The loop can run gate and budget checks, then stops. The only
supported executable mode is `node .agents/loop/loop.mjs --dry-run`.
