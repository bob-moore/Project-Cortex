# Key Decisions

Durable architecture and operating decisions for this vault.

## 2026-07-15

- Durable client identity lives in `Clients/`; bounded engagements live in `Projects/active/<Project Name>/`.
- Project folders are collapsible. The main project note repeats the project name (`<Project Name>/<Project Name>.md`) so Obsidian wikilinks stay unambiguous while specs, copy drafts, plans, and decisions live beside it.
- Client relationship archival and project archival are separate events.

## 2026-07-28

- `.agents/` is the canonical runtime machinery layer.
- `harness/` is the writable agent-operating knowledge layer.
- Runtime-specific folders are adapters, not sources of truth.

## 2026-07-29

- `Journal/` is canonical shared vault content for Bob's daily personal notes. It is not agent-operating memory, but agents may review it when Bob asks or when a task clearly needs recent personal context. See [[2026-07-29-journal-canonical-daily-notes|Journal Is Canonical Daily Note Space]].
