# Rendered Implementation Review

Review conformance after an implementation exists. Do not edit production
during this mode.

## Preconditions

Confirm:

- approved design artifact/version and acceptance matrix
- exact URL, build, branch, or WordPress environment
- current implementation identity and cache state
- required viewports, content cases, authentication, and interactive states
- known implementation constraints approved after design handoff

If the approved artifact is missing or ambiguous, return `UNDECIDED` with the
exact decision needed.

## Evidence Passes

### 1. Design judgment

Run applicable lenses from `visual-critique.md`: affordance, brand consistency,
color, composition, information density, typography, and visual hierarchy.
Also evaluate responsive transformations, component consistency, interaction
states, edge cases, and approved accessibility requirements.

### 2. Browser and deterministic evidence

Use the smallest methods that can prove each acceptance criterion:

- screenshots at named viewport dimensions
- DOM/computed styles for token, geometry, visibility, and state questions
- keyboard path and focus observation
- console/network inspection for affected interactions
- text/content comparison with the approved artifact
- automated accessibility checks plus manual primary-path checks
- source/variant inspection when runtime evidence is ambiguous

Do not claim a state was tested when it could not be reached. Do not infer
semantic accessibility from a screenshot.

## Discrepancy Classes

| Class | Meaning | Owner |
|---|---|---|
| Implementation mismatch | Approved intent is clear; implementation differs | Developer or WordPress |
| Specification ambiguity | Artifact permits conflicting implementations | Designer revision, then implementation |
| Content mismatch | Approved copy/content differs or fails real constraints | Writer or WordPress depending on source |
| Token/system gap | Approved result needs an ungoverned token/component decision | Strategist/Designer approval path |
| Environment/evidence blocker | Target, state, access, cache, or tooling cannot prove the result | Parent resolves blocker |

Severity:

- `P0 Blocking`: primary task cannot be completed or severe accessibility/safety
  failure.
- `P1 Major`: material design, brand, interaction, or accessibility criterion
  fails before release.
- `P2 Minor`: bounded mismatch with a workable path.
- `P3 Polish`: low-impact difference that does not undermine acceptance.

## Report Format

```markdown
# <Target> Rendered Design Review

## Provenance
- Approved design artifact/version:
- Target/environment:
- Viewports and states inspected:
- Methods/evidence:
- Verification limitations:

## Verdict
PASS / FIX / BLOCK / UNDECIDED

## Acceptance results
| Criterion | Observed result | Evidence | Result |
| --- | --- | --- | --- |

## Strengths
- <Specific confirmed success>

## Discrepancies
| Severity | Class | Surface/state/viewport | Expected | Observed | Evidence | Revision owner |
| --- | --- | --- | --- | --- | --- | --- |

## Exact revision request
1. <Smallest change tied to one failed criterion>

## Recheck scope
- <Criteria, states, and collateral surfaces to re-run>
```

## Verdict Rules

- `PASS`: all required design criteria are observed and no blocking discrepancy
  remains.
- `FIX`: implementation exists and one or more correctable criteria fail.
- `BLOCK`: a severe regression exists or review cannot continue safely.
- `UNDECIDED`: authority or evidence is unavailable/contradictory; name what
  would decide it.

A screenshot-perfect result can still fail interaction, semantics, focus,
content, or responsive acceptance. Do not fail an implementation for a new
preference absent from the approved artifact.

## Attribution

Adapted from `stash/design/designer-delivery/references/rendered-review.md`,
including Apache-2.0 critique principles from `pbakaus/impeccable` and
MIT-licensed QA categories from `Owl-Listener/designer-skills`.

