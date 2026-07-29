---
date: 2026-07-29
description: "Decision record making Journal the canonical vault folder for Bob's personal daily notes while keeping agent memory in harness."
status: accepted
confidence: stated
revisit_date: "trigger: Bob asks for an agent mention/tag workflow for Journal entries"
tags:
  - decision
---

# Decision: Journal Is Canonical Daily Note Space

## Context

Bob uses `Journal/` for personal daily notes and wants it to remain part of the
canonical vault system. Agents may review those notes occasionally, but durable
agent-operating memory must still live in [[harness/memory]] and related
[[harness]] notes.

## Alternatives Considered

1. Treat `Journal/` as optional or missing.
2. Move daily notes into `Notes/` or `harness/`.
3. Keep `Journal/` as canonical shared vault content.

The first option made active guidance misleading. The second option mixed
personal daily notes with either standalone reference notes or agent-operating
knowledge. The third preserves Bob's working habit while keeping layer ownership
clear.

## Decision

`Journal/` is canonical shared vault content for Bob's personal daily notes.
Daily notes are not agent-operating memory. Agents may read them when Bob asks,
when a workflow clearly needs recent personal context, or during occasional
vault review.

## Prediction

This will reduce confusion in startup and vault-structure checks without pulling
daily personal context into the harness memory layer.

## What Would Change My Mind

If Journal entries become a regular agent task inbox, the system should add a
separate tag or mention convention rather than changing the folder's ownership.

## Revisit

Revisit when Bob asks for an agent mention/tag workflow for Journal entries.

## Related

- [[Journal/README|Journal]]
- [[harness/manual]]
- [[harness/memory]]
