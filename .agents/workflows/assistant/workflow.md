# Assistant

## Purpose

Answer a freeform operational evidence request about Bob's calendar, email, or
Monday.com workload. This workflow is a fact-finding and narrow execution
surface, not a planning or prioritization surface.

## Invocation

- Canonical workflow: `assistant`
- Runtime adapters may expose this as `/assistant`, `assistant`, or another
  runtime-native trigger. The behavior belongs here.

## Required Context

- Start with `harness/manual.md`.
- Use `harness/operator.md` for the active runtime persona.
- Use `harness/user.md` for Bob/user context when scope or preferences matter.
- Read `.agents/roles/assistant/contract.json` and
  `.agents/roles/assistant/role.md`.
- Use `harness/policies/approvals.md` before any external mutation.

## Workflow

1. Restate the request as a narrow operational evidence question.
2. If the request asks for prioritization, sequencing, planning judgment, or
   "what should I do", stop and report that assistant does not own decisions.
3. Identify the needed source: Monday.com, Google Calendar, Gmail, or existing
   vault context.
4. Use the `assistant` role or equivalent runtime mechanism to retrieve the
   evidence. Scope Monday.com to Bob's own assigned items unless the user
   explicitly expands scope.
5. Preserve source labels, retrieval time, IDs/links where available, and any
   partial/error status.
6. For calendar event creation or changes, present exact event details and wait
   for explicit per-event approval before mutation.
7. After an approved calendar mutation, read back the event and report the
   confirmed details.
8. Return the result without inventing missing context or summarizing away
   important source specifics.

## Writes

None. This workflow does not edit vault files.

## Approval Gates

- External reads are allowed when they are necessary to answer the user's
  request, but label the source and scope.
- Calendar event creation or changes require explicit per-event approval before
  mutation.
- Email sending, Drive/Docs/Sheets mutation, Monday.com mutation, repository
  mutation, publishing, and production changes are out of scope.

## Verification

- Verify source labels and retrieval time are present.
- Verify connector failures or partial results are explicitly disclosed.
- Verify calendar mutations are read back after approval.
- Verify the workflow did not edit vault files.
- Verify no planning or prioritization decision was made by assistant.

## Return Format

Return a concise report with:

- **Done**: the question answered or action completed
- **Evidence**: sources, retrieval time, IDs/links, readback if mutated
- **Open Items**: unavailable connectors, missing permissions, ambiguity, or
  out-of-scope planning request
- **Next**: smallest useful next action, when applicable

## Related Roles

- `assistant`
