---
name: design-research
description: "Use when a design task needs inspiration, a moodboard, reference research, visual-direction alternatives, or evidence before implementation. Route sources by client context and page job, annotate what to borrow and reject, and apply the anti-SaaS gate."
version: 1.0.0
author: ProjectCortex
license: MIT
metadata:
  hermes:
    tags: [design, research, moodboard, inspiration, landing-pages, local-business, anti-saas]
    related_skills: [design-delivery, brandkit, redesign-existing-projects]
---

# Design Research

## Overview

Build a small, evidence-backed reference packet before visual implementation when
the direction is unresolved. The output is a moodboard plus annotated sources,
not a copied site, production asset bundle, or blank-canvas style prompt.

Treat the packet as `observation` and `proposal` evidence. Client Brand, Voice,
approved content, verified system facts, and approved decisions remain higher
authority.

## When to Use

Use when:

- the user asks for design inspiration, examples, references, or a moodboard;
- a local-business site or PPC landing page needs concrete starting structures;
- the brief allows meaningful aesthetic discretion;
- a redesign needs visual evidence beyond a current-state critique;
- a direction must be narrowed before prototype or implementation.

Do not use as a mandatory preflight when an approved direction/design artifact
already governs implementation or when the task is only rendered conformance
review.

## Procedure

1. **Brief** — establish client, audience, business goal, user task, funnel,
   content/proof status, page/job, stack, constraints, and research question.
   Completion: authority and gaps are explicit.
2. **Route** — choose source lanes from `references/reference-sources.md`.
   Completion: each source has a reason, bias, and intended evidence.
3. **Collect** — inspect a small contrasting set and record source URL, date,
   context, observations, relevant sections, CTA/proof patterns, mobile/motion
   behavior, copyability, license status, and confidence. Completion: every
   reference is traceable and annotated.
4. **Synthesize** — group evidence by design decisions, not by gallery: hierarchy,
   typography, imagery, proof, CTA/form behavior, mobile, motion, and implementation.
   Completion: the packet explains the combination without copying one brand.
5. **Constrain** — run the anti-SaaS gate and accessibility/mobile/licensing checks.
   Completion: each risk is fixed, justified, or blocked.
6. **Differentiate** — create two or three materially different directions and
   state criteria before recommending one. Completion: alternatives vary in
   composition, hierarchy, density, imagery, or interaction—not merely color.
7. **Handoff** — stop for approval, then route the selected packet to
   `design-delivery`. Completion: approval state and next owner are recorded.

## Evidence and Reference Card

Use these labels:

- `authority`: approved Brand, Voice, content, tokens, contract, or decision;
- `current-system-fact`: verified current source, component, or rendered behavior;
- `observation`: directly inspected external reference behavior;
- `proposal`: new direction or interpretation awaiting approval;
- `gap`: missing, contradictory, or unverified context.

Each card should contain:

```text
Source URL:
Capture date:
Source type:
Client/context fit:
Page/job and funnel:
Primary CTA:
Observed problem/solution:
What to borrow:
What not to copy:
Relevant sections:
Typography/color/layout:
Content/proof/copy pattern:
Mobile/interaction/motion:
Copyability and license status:
SaaS-bias assessment:
Confidence:
```

## Anti-SaaS Gate

Require at least one local-world, editorial, cultural, physical, or non-software
reference when the brief allows. Do not let a component library or tech-brand
moodboard determine the design.

Flag or reject unexplained use of:

- purple-blue gradients;
- glassmorphism and translucent floating panels;
- bento-card grids;
- excessive pills and rounded containers;
- abstract blob art;
- generic dashboard hero copy;
- “AI-powered” or interchangeable transformation language;
- Inter/system typography without a content or brand reason;
- glow/grid effects as the primary visual identity.

Require real nouns and evidence: service, locality, offer, proof, credentials,
photography direction, guarantee, price/estimate/booking mechanics, and audience
language. Check that the design still works with effects disabled.

## Resource Routing

For local services and professional businesses, start with Webflow Home Services,
Squarespace Professional Services, WordPress/Astra starters, WordPress Showcase
and Patterns, Awwwards Services, Behance local-business searches, and SiteInspire.

For PPC and lead-generation pages, start with Unbounce examples and benchmark
material, Landingi, Leadpages, Instapage, GoodUI, Google Ads Quality Score
Guidance, and PageSpeed Insights.

For visual stretch, use Refero Styles, SiteInspire, Awwwards, Typewolf, Brand New,
BP&O, Behance, and Hoverstat. Use SkillUI at `https://skillui.vercel.app/` for
redesign evidence and reverse-engineering, not blank-canvas inspiration.

Use Aceternity, Radix, shadcn/ui, React Aria, WordPress Patterns, or other
implementation resources only after direction approval. They implement a chosen
language; they do not choose it.

Read `references/reference-sources.md` for URLs, roles, biases, and copyability.

## Provenance and Rights

Inspiration galleries are discovery tools, not stock libraries. Preserve source
URL, author/site, capture date, and license status. Do not ship scraped screenshots,
logos, fonts, illustrations, copied claims, copied copy, or third-party code as
production assets without rights. Store raw captures outside canonical prompt
context and promote only reviewed observations.

## Common Pitfalls

1. **Gallery soup:** collecting many screenshots without a decision question.
   Fix: assign every source to a page/job and design decision.
2. **SaaS gravity:** selecting only product/UI references. Fix: require a
   local-world or editorial counter-reference.
3. **False alternatives:** changing colors while keeping the same composition.
   Fix: vary hierarchy, density, imagery, interaction, or editorial posture.
4. **Template authority:** treating a starter kit as the client design system.
   Fix: use it for feasibility and structure only.
5. **Unlicensed copying:** treating screenshots or demos as reusable assets. Fix:
   record provenance and create or license production assets separately.
6. **CRO overreach:** treating a benchmark or A/B pattern as universal truth.
   Fix: label evidence as context-dependent and test against lead quality/revenue.
7. **Premature implementation:** prototyping before direction approval. Fix: stop
   at the research packet and route through the parent approval gate.

## Verification Checklist

- [ ] Brief, page/job, audience, task, funnel, and gaps are explicit.
- [ ] Source set is small, relevant, contrasting, and bias-labeled.
- [ ] Every reference has URL, date, observation, use, limitation, and provenance.
- [ ] At least one non-software/local-world reference is included when possible.
- [ ] Anti-SaaS risks and accessibility/mobile implications are addressed.
- [ ] Two or three materially different directions exist.
- [ ] Decision criteria precede the recommendation.
- [ ] No third-party production asset or claim is implied without rights.
- [ ] Approval state and `design-delivery` handoff are explicit.
