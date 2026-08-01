# Design Sample

Runtime-neutral sample for communicating Canvas-style intrinsic design to AI
design agents and implementation agents.

This is not a WordPress theme. It is a design-system bundle shape:

- `design-system.intent.yaml` explains the design logic, scale recipes, usage
  lanes, and agent rules.
- `tokens.json` is the canonical token data.
- `tokens.css` is an implementation-ready CSS variable output.
- `agent-brief.md` is the concise promptable brief for design agents.
- `foundations/type-and-space.html` renders the scale behavior without a
  framework.

## Core Idea

Canvas sizing is not breakpoint-driven. It is intrinsic.

The system uses modular scales with guardrails:

- Compact reading/interface type uses a static Major Second scale (`1.125`).
- Display type uses Major Second for the minimum size and Major Third (`1.25`)
  for the maximum size, expressed as fluid `clamp()` tokens.
- Spacing follows the same split: compact values for local rhythm, fluid values
  for section rhythm.
- Agents choose a usage lane first, then choose the token step. They do not
  invent raw values or breakpoint overrides.

## Runtime Adapters

An Astro site would import `tokens.css` in its global stylesheet and build
components against semantic variables such as `--space-section-y`,
`--measure-prose`, and `--type-section-title`.

A WordPress adapter could map the same token model into `theme.json` preset
slugs and filesystem pattern guidance.

