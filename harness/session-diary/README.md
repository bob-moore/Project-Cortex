---
date: 2026-08-01
description: Compact per-session learning signal for agent ingestion — corrections and standing preferences, not a transcript or a human-facing summary.
tags:
  - harness
  - session-diary
---

# Session Diary

Not `harness/session-logs/` — that folder is raw transcript backups from
runtime compaction hooks, explicitly not for durable context. This folder is
the opposite: small, curated, durable files written on purpose.

**Audience: an agent, on demand, in a future session — not the User.** Optimize
every entry for cheap machine ingestion, not human readability. No headers,
throat-clearing, or restated context recoverable elsewhere (git log already
has "what files changed"; `harness/key-decisions.md` already has durable
architecture decisions — don't duplicate either here).

## What Goes In An Entry

Exactly two kinds of signal, nothing else:

- **Corrections** — the User changed or rejected something the agent
  proposed. Record the generalizable rule the correction implies, not a
  transcript of the exchange.
- **Preferences** — the User stated a standing preference not tied to a
  specific correction (a working style, a boundary, a "don't do X unless I
  ask").

If a session has neither, **write no file.** A quiet session is not signal.
Do not pad an entry to make the day feel captured — an empty diary is
correct on a day with nothing to learn from.

## Format

One file per session: `YYYY-MM-DD-HHmm-<slug>.md`. Written once, at session
end (typically as the last step of `vault-wrap-up`); never edited after.

```markdown
---
date: 2026-08-01
description: Session diary — one line, who/what domain, no client if none.
tags: [session-diary]
client: <slug, omit if none>
disciplines: [writing, design, development, seo, vault-ops, harness, ...]
---

## Corrections
- <what was assumed/proposed> → <the rule going forward>

## Preferences
- <standing preference, stated plainly>

## Related
- [[harness/session-diary/README|Session Diary]]
```

The `description` and `## Related` link exist only to satisfy the vault-wide
hygiene convention (every note needs a description and at least one
wikilink) — keep both to one line, they aren't the content. `description`
does not need to hit ~150 characters here; short is correct for this note
type.

Rules for keeping it cheap:

- One line per item. If a rule needs more than ~25 words to state, it's
  probably still stuck at "what happened" instead of "the rule" — compress
  further.
- Tag frontmatter (`client`, `disciplines`) covers session-level context.
  Only add inline context to a bullet when a single session spans multiple
  clients/disciplines and the frontmatter tags don't disambiguate which
  applies.
- Omit `client` entirely for harness/vault-operations work with no client.
- Skip sections that have nothing in them — do not write `## Preferences`
  with no bullets under it.

## How This Gets Read

Nothing reads this automatically yet. A future periodic synthesis pass
(proposed, not built — see
[[harness/roadmaps/self-improvement-loop|Self-Improvement Loop]]) would scan
N days/weeks of entries, cluster `Corrections` by `client`/`disciplines`, and
surface recurring ones as candidates to promote into a Voice note or a skill
— always as a proposal for approval, never an automatic write. Until that
pass exists, an agent can also just read recent entries directly (via
`multi_get` on a date-glob, or QMD) when it wants context on how its own
recent output has been landing.

## Related

- [[harness/roadmaps/self-improvement-loop|Self-Improvement Loop]]
- [[key-decisions|Key Decisions]]
- `.agents/workflows/vault-wrap-up/workflow.md`
