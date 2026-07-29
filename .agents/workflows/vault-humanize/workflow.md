# Vault Humanize

## Purpose

Voice-calibrated editing — makes agent-drafted text sound like you wrote it, not like AI wrote it.

## Invocation

- Canonical workflow: `vault-humanize`
- Runtime adapters may expose this as `/vault-humanize`, `vault-humanize`, or another runtime-native trigger. The behavior belongs here.

## Required Context

- Start with `harness/manual.md`.
- Use `harness/operator.md` for the active runtime persona.
- Use `harness/user.md` for Bob/user context when user preferences, scope, or voice matter.
- Use QMD or local search before broad file reads when looking for prior vault context.

## Harness Notes

- Treat the target as agent-drafted prose unless evidence shows otherwise.
- Use `harness/user.md` for the human user profile and voice context.

## Workflow

Edit a note to match your writing voice. This is voice calibration, not pattern removal — learn HOW you write, not just what to avoid.

### Usage

```
/vault-humanize <file path or note name>
```

### Workflow

#### 1. Load Voice Samples

Read 2-3 recent notes you actually wrote or heavily edited to calibrate voice:
- `harness/north-star.md` — how you write about yourself
- The most recent `Notes/1-1/*.md` note — natural conversational voice
- Any harness note with your authentic writing style

Extract voice fingerprint: sentence length, punctuation habits, how you open sections, how you qualify statements, ratio of direct-to-hedged language, use of dashes and fragments.

#### 2. Read Target Note

Read the note specified in $ARGUMENTS (resolve as wikilink name or file path).

Detect context from frontmatter and folder:
- **`Notes/1-1/`** → conversational, direct, uses "I", okay to be informal
- **`reviews/` review content** → corporate-confident but human, evidence-based, respect charcount
- **`Notes/incidents/`** → precise, factual, timeline-oriented, no filler
- **`harness/`** → terse shorthand, fragments okay
- **Default** → colleague-to-colleague, like explaining something in a 1:1

#### 3. Edit In-Place

Rewrite the note's content to match your voice. Key principles:

**Voice rules (from samples):**
- Direct statements, not hedged ones ("This was stressful" not "This presented some challenges")
- Match your natural rhythm — fragments, dashes, whatever you actually use
- Observations should be sharp, not softened
- A concise 600-char section is better than a padded 950-char one

**Anti-patterns (kill these):**
- "Notably", "significantly", "demonstrates", "leveraged", "facilitated"
- "It's worth noting that..." — just note it
- "This showcases..." — just describe what happened
- Hedge stacking: "potentially", "arguably", "it could be said that"
- Empty transitions: "Moving forward", "In terms of", "With regard to"
- Passive voice where active is natural: "was identified" → "found"
- Bullet points that all start with the same word pattern
- Rhetorical questions followed by immediate answers

**Preserve untouched:**
- All YAML frontmatter (pass through unchanged)
- `[[wikilinks]]` and `[[link|aliases]]`
- `![[embeds]]`
- Callout blocks (`> [!type]`)
- Block IDs (`^block-id`)
- Code blocks
- Tables (content can be edited, structure preserved)
- Checkboxes and task items

#### 4. Summarize Changes

Present a brief summary (NOT a full diff):
- **Tone shift**: what changed overall (e.g., "removed hedging, shortened sentences")
- **Key rewrites**: 2-3 examples of before/after for the most significant changes
- **Preserved**: confirm what was left untouched and why

Don't show unchanged sections. The user can run `git diff` for the full picture.

### Important

- This is NOT "remove AI words from a list." It's "make this sound like the same person who wrote the other notes in this vault."
- If the note is already well-written, say so and make minimal changes. Don't edit for the sake of editing.
- Respect the context — a peer review needs to stay professional even after humanizing. A 1:1 note can be loose.
- If charcount matters (review content in `reviews/`), verify limits after editing with `node --experimental-strip-types .agents/scripts/charcount.ts`.

Content to edit:
$ARGUMENTS

## Writes

- `harness/` notes
- `reviews/` evidence notes
- `Notes/` work notes

## Approval Gates

- Ask before destructive moves, deletes, archive operations, production mutations, publishing, sending messages, or changing external systems.
- If a workflow needs calendar, email, Monday.com, Slack, WordPress, or repository writes, label the source and obtain any required approval before mutation.

## Verification

- Verify changed Markdown renders as valid Obsidian-flavored Markdown.
- Verify wikilinks point to existing notes or intentionally create new note stubs.
- Verify frontmatter remains valid YAML where touched.
- Verify any external evidence is labeled with source, retrieval time, and failure or partial-result state.

## Return Format

Return a concise report with:

- **Done**: actions completed and files changed
- **Evidence**: commands, searches, or external sources checked
- **Open Items**: blockers, missing approvals, or ambiguous decisions
- **Next**: the smallest useful next action, when applicable

## Related Roles

- `operator`
