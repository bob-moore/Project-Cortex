---
name: web-quality-verification
description: "Use when code or WordPress site-state changes affect a rendered website and independent verification is needed. Verifies scoped acceptance criteria through HTTP, browser, responsive, interaction, console/network, accessibility, metadata, performance, and risk-based regression checks without trusting implementation claims or silently repairing work."
---

# Web Quality Verification

Use this skill with the `verifier` role after a change affects a rendered
website. Start with acceptance criteria and the deployed or runnable artifact,
not the producer's explanation. Select the smallest check set that proves the
requested outcome and plausible collateral impact.

## Operating Contract

- **Reads:** acceptance criteria, target URLs/environment, approved
  content/design where applicable, changed surfaces, shared-component scope,
  implementation report, and relevant repository or site evidence.
- **Writes:** a PASS, FIX, BLOCK, or UNDECIDED verification report with measured
  evidence. It does not mutate the target.
- **Does not:** replace repository tests or stored-state verification, silently
  repair implementation, declare approval from screenshots alone, or run
  disruptive production load tests without authority.
- **Done when:** every applicable acceptance criterion has an observed result,
  risk-based regression surfaces are checked, and failures have reproducible
  evidence and a clear owner.
- **Boundary:** Developer verifies repository behavior; WordPress Operator
  verifies stored WordPress state; this skill independently verifies the
  user-visible rendered result. The parent workflow owns closure.

## Required Context

1. Read the parent workflow contract and `.agents/roles/verifier/role.md`.
2. Read `harness/manual.md`, `harness/policies/approvals.md`, and
   `accessibility-foundation` when the target has a user-facing surface.
3. Confirm the exact target environment, URLs, authentication state, and cache
   or CDN considerations. Never substitute production for requested staging or
   vice versa.
4. Identify the changed surface and likely shared/collateral surfaces from the
   implementation report, source, or stored-state report.
5. Mark any criterion that cannot be safely verified in the available
   environment before beginning.

## Method

### 1. Define a verification matrix

Translate acceptance criteria into observable checks:

| Criterion | Surface | Method | Expected result |
|---|---|---|---|
| Content | rendered/stored page | browser/API text | approved meaning and required text |
| Layout | desktop/mobile | browser, screenshots, DOM | specified responsive composition |
| Interaction | browser | pointer and keyboard path | expected state and outcome |
| Navigation | HTTP/browser | follow URL | correct status, destination, and target |
| Runtime | runnable artifact | browser console/network | no relevant new errors |

### 2. Run layered checks

- **HTTP:** status, redirects, expected/forbidden text, canonical and metadata,
  assets, safe form/action endpoints, and representative shared URLs.
- **Browser:** desktop plus mobile, and an intermediate width when layout is
  materially affected; inspect clipping, overflow, images, navigation,
  interactions, loading/empty/error states, console errors, and failed requests.
- **Accessibility:** semantic headings and landmarks, keyboard reachability,
  visible focus, labels/errors, image alternatives, changed contrast, reduced
  motion, and link/button semantics. Automated scans are partial evidence.
- **Content and metadata:** approved copy when in scope, title/description,
  canonical/robots, social metadata, structured data, internal links, and no
  placeholder or draft content.
- **Performance:** only when in scope or plausibly affected; use comparable
  measurements rather than one noisy sample. Do not run production load tests
  without explicit approval.

Capture a screenshot only for the visual claim it supports, with the URL and
viewport recorded.

### 3. Check collateral by risk

Sample only likely regression paths: shared patterns across their placements,
navigation/template changes across representative routes, token/style changes
across common components, and affected form or notification behavior safely.
Do not turn a bounded verification task into an unscoped site audit.

### 4. Return a verdict

- **PASS:** all required criteria are verified and no blocking regression exists.
- **FIX:** implementation exists but one or more correctable criteria fail.
- **BLOCK:** verification cannot proceed safely or a critical regression exists.
- **UNDECIDED:** evidence is missing or contradictory; name the missing proof.

```text
Verdict:
Target/environment:
Acceptance matrix:
Measured evidence and tools:
Responsive/browser coverage:
Console/network/accessibility findings:
Content/metadata/performance findings:
Collateral surfaces checked:
Failures, owner, and exact recheck scope:
Limits and remaining uncertainty:
Next:
```

## Common Pitfalls

1. **Trusting the producer.** Independently inspect the target artifact.
2. **Screenshot-only QA.** Screenshots do not prove semantics, interactions,
   console state, or stored state.
3. **Desktop-only verification.** Include mobile for visible layout changes.
4. **Automated accessibility absolution.** A clean scanner is not conformance proof.
5. **Cache confusion.** Confirm the tested build/state is current.
6. **Testing everything.** Use risk-based collateral sampling and the requested
   acceptance criteria.

## Verification Checklist

- [ ] Criteria were translated into observable checks.
- [ ] Correct environment and current artifact were confirmed.
- [ ] HTTP and browser checks were run where applicable.
- [ ] Responsive, console/network, and interaction checks cover affected work.
- [ ] Accessibility checks include the primary interaction when relevant.
- [ ] Content, metadata, and performance checks were scoped appropriately.
- [ ] Likely collateral surfaces were sampled.
- [ ] Verdict is backed by measured evidence and failures are reproducible.
