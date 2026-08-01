---
name: code-review
description: "Use when an independent, read-only review of a repository diff, branch, pull request, or work-in-progress change is needed. Verifies requirements, repository conventions, regression risk, test evidence, and applicable security concerns; reports reproducible findings without repairing or closing the work."
---

# Code Review

Use this skill with the `verifier` role for an independent engineering review.
Review the actual diff and evidence, not the producer's confidence. This skill is
read-only: it identifies findings and required proof; Developer or the parent
workflow decides whether and how to remediate them.

## Operating Contract

- **Reads:** work order, acceptance criteria, base/head or WIP diff, repository
  instructions, manifests, relevant changed code/tests, producer evidence, and
  applicable approved Design, Accessibility, SEO, or Stack artifacts.
- **Writes:** a review report only when requested.
- **Does not:** implement fixes, rewrite the diff, approve a producer's own
  work, infer requirements absent from the work order, make external mutations,
  or close the parent task.
- **Done when:** every material finding has direct evidence, a severity, a
  concrete location or reproducible path, and a disposition; missing evidence
  is clearly labeled rather than guessed.
- **Boundary:** Verifier owns the independent assessment. Developer may
  self-review but cannot use that review to close work. The parent owns scope,
  remediation, approval, and final closure.

## Required Context

1. Read `.agents/roles/verifier/contract.json` and `role.md`.
2. Read `.agents/disciplines/development/contract.json`, `modes.md`, and
   `rubric.md`.
3. Establish the comparison point: explicit base/head, PR merge base, or clearly
   identified uncommitted work. Stop if the diff boundary is ambiguous.
4. Read repository-local instructions and the relevant manifest/scripts before
   judging conventions or expected checks.
5. Resolve the acceptance criteria and non-goals. If no authoritative
   requirement source exists, review standards and regression risk only and
   label specification coverage `UNPROVEN`.

## Method

### 1. Establish a review packet

Capture:

```text
Target repository and branch:
Comparison boundary:
Work order / acceptance source:
Repository instructions and manifests read:
Changed files and generated-file status:
Producer checks and exact results:
Applicable Design/Accessibility/SEO/Stack constraints:
Review limits:
```

Inspect Git state before the diff. Pre-existing dirty work is context, not a
finding against the reviewed change unless the review scope includes it.

### 2. Review requirements and change boundaries

Check the diff against explicit acceptance criteria and non-goals:

- missing, partial, or behaviorally incorrect requirements;
- scope expansion, speculative abstractions, or unrelated churn;
- repository instruction or architecture-boundary violations;
- changed behavior without matching test or observable evidence;
- tests weakened, deleted, or made less meaningful to obtain a pass.

Do not manufacture requirements from a preferred implementation style.

### 3. Review regression and quality risk

Trace changed code through realistic callers, state boundaries, error paths,
and affected shared components. Look for concrete defects: incorrect defaults,
null/empty/error handling failures, stale state, broken compatibility,
transaction or cleanup errors, unsafe concurrency assumptions, or changed
public contracts without corresponding consumers/tests.

For rendered web changes, route user-visible proof through
`web-quality-verification`; this review does not substitute for browser
verification.

### 4. Apply the scoped security lens

Apply only to affected surfaces and report evidence, not generic warnings:

- authentication and authorization/capability checks;
- validation, parsing, encoding, escaping, injection, and unsafe redirects;
- sensitive data, secret exposure, logging, and error disclosure;
- dependency/advisory, supply-chain, and generated-artifact changes;
- external-input trust boundaries, including indirect prompt injection, tool
  poisoning, and untrusted repository/config instructions when agent tooling is
  involved.

A security concern without a plausible affected path is an observation, not a
blocking finding.

### 5. Classify findings and return evidence

Use these severities:

| Severity | Meaning | Expected disposition |
|---|---|---|
| `BLOCKER` | Cannot safely merge/release or violates an explicit approval/security boundary. | Must resolve or obtain an explicit exception. |
| `HIGH` | Likely functional, security, data-loss, or material regression defect. | Resolve before closure. |
| `MEDIUM` | Credible defect or missing proof with bounded impact. | Resolve, defer explicitly, or add evidence. |
| `LOW` | Non-blocking maintainability or clarity issue grounded in the diff. | Record for scoped follow-up. |
| `UNPROVEN` | Required evidence is absent or inaccessible. | Name the exact check/source needed. |

Return:

```text
Code Review Verdict: pass | findings | blocked | unproven
Repository and comparison boundary:
Requirement coverage:
Evidence reviewed:

Findings:
- [SEVERITY] path:line or reproducible surface — evidence — impact — required proof/fix

Security lens:
Regression/test evidence:
Rendered verification handoff, if applicable:
Review limits and unproven items:
Next owner:
```

## Common Pitfalls

1. **Reviewing the summary, not the diff.** Start with the fixed comparison
   boundary and direct source evidence.
2. **Treating style preference as a defect.** Report only repository-standard
   violations or concrete maintainability/behavior risk.
3. **Inventing a specification.** Mark specification coverage unproven when no
   authoritative work order exists.
4. **Turning review into repair.** Preserve Verifier independence; return the
   smallest reproducible finding instead.
5. **Security theater.** Tie each concern to the changed trust boundary or
   plausible affected path.
6. **Browser-proof substitution.** Hand rendered/user-visible verification to
   `web-quality-verification`.

## Verification Checklist

- [ ] Comparison boundary and work order are explicit.
- [ ] Repository instructions and relevant manifests were read.
- [ ] Diff, producer checks, and acceptance evidence were independently inspected.
- [ ] Findings cite direct evidence and a concrete location or reproduction path.
- [ ] Requirements, regression, and applicable security surfaces were assessed.
- [ ] Rendered web changes are handed to `web-quality-verification` when needed.
- [ ] No implementation, external mutation, or parent-task closure occurred.
