# Design Research

## Purpose

Research and narrow a design direction before visual implementation. This
workflow creates an evidence-backed moodboard/reference packet from client
context, selected external sources, and explicit anti-SaaS checks. It does not
produce production code or approve the final direction.

## Invocation

- Canonical workflow: `design-research`
- Runtime adapters may expose this as `/design-research`, `design-research`,
  `design moodboard`, or `design inspiration`.
- Invoke when the user asks for inspiration, references, examples, a moodboard,
  visual direction, or a new design where aesthetic discretion is unresolved.

## Required Context

- Start with `harness/manual.md`, the active operator/user context, and the
  applicable project/client note.
- Read `.agents/disciplines/design/contract.json`, `modes.md`, and `rubric.md`.
- Read `.agents/skills/design-research/SKILL.md` and its
  `references/reference-sources.md`.
- Read Brand, Voice, Design Tokens, approved content, proof/assets, Stack notes,
  and existing source/rendered evidence when available.
- Label missing or contradictory context as a `gap`; do not silently invent it.

## Workflow

### 1. Establish the research contract

Record the client/project, target, audience, business goal, primary user task,
funnel stage, content/proof status, implementation target, research question,
and approval boundary. If the request is a redesign, verify the actual target
before looking for replacement inspiration.

Completion criterion: the brief and research question are explicit, or the
missing inputs are listed as gaps and provisional research is approved.

### 2. Select research lanes

Use the page/job and client context to select a small source set. Prefer local
business and editorial references for visual direction, PPC/CRO sources for
conversion pages, and implementation sources only for downstream feasibility.
Do not query every gallery by default.

Completion criterion: the source set contains its reason for inclusion, expected
evidence, and known bias for each source.

### 3. Gather and annotate references

Create reference cards with URL, capture date, source type, context fit, page/job,
funnel stage, primary CTA, observations, borrow/do-not-copy notes, relevant
sections, content/proof patterns, mobile/interaction notes, copyability,
license/provenance, and confidence. Keep external observations separate from
client authority and proposals.

Completion criterion: every selected reference has a source, observation, use,
limitation, and provenance status.

### 4. Compose the moodboard/reference packet

Group references by decision rather than by gallery: hierarchy, typography,
color/materiality, imagery, proof, CTA/form behavior, mobile behavior, motion,
and implementation constraints. Use concrete screenshots or links as evidence,
but never imply that third-party assets are reusable production assets.

Completion criterion: the packet explains how the references combine without
copying one brand or importing a component library's default style.

### 5. Run the anti-SaaS and quality checks

Require at least one non-software or local-world reference when the brief allows.
Reject unexplained purple-blue gradients, glassmorphism, bento cards, excessive
pills, abstract blobs, dashboard hero copy, generic AI language, or effect-led
composition. Check content specificity, locality/proof, mobile fit, accessibility,
reduced motion, performance implications, and licensing.

Completion criterion: each risk is accepted with rationale, corrected, or recorded
as a blocker.

### 6. Produce alternatives and criteria

Create two or three materially different directions. Vary composition,
hierarchy, density, imagery, editorial posture, interaction posture, or brand
expression; color swaps alone do not count. State the decision criteria before
recommending one.

Completion criterion: each direction has a concise description, source evidence,
strengths, risks, and evaluation against the criteria.

### 7. Stop at approval and hand off

Return the research packet, alternatives, recommendation, open gaps, and approval
needed. Do not prototype or implement an unapproved direction. After approval,
route to `designer` using `design-delivery` with the packet as governed context.

Completion criterion: approval state and next owner are explicit.

## Writes

- Write only to an approved project/research destination.
- Do not mutate production code, WordPress state, external systems, or source
  galleries.
- Do not add raw screenshots or copied assets to canonical prompt context without
  provenance and permission.

## Approval Gates

- External browsing is read-only and source-labeled.
- Vault writes require the normal vault approval boundary.
- Production assets, copied copy, logos, fonts, screenshots, code, or templates
  require separate rights and implementation review.
- The parent workflow or user owns direction approval and closure.

## Verification

- Verify URLs, retrieval status, and capture dates.
- Verify the packet contains context, source annotations, directions, criteria,
  anti-SaaS checks, accessibility/mobile considerations, and gaps.
- Verify changed Markdown/frontmatter and links where a packet is written.
- Verify the next handoff is `design-delivery`, not Developer or WordPress Operator.
- Run the project gate before declaring workflow architecture complete.

## Return Format

Return:

```text
Status: awaiting-approval | needs-revision | blocked
Research mode:
Client/project:
Target and page/job:
Context read:
Source set:
Moodboard/reference packet:
Directions:
Anti-SaaS assessment:
Gaps and assumptions:
Approval needed:
Recommended next role: designer via design-delivery
Next:
```

## Related Roles

- `strategist` for positioning, audience, or brand gaps
- `writer` for missing or unapproved page copy
- `designer` for approved direction, specification, prototype, or review
- `verifier` for independent readiness and evidence checks
