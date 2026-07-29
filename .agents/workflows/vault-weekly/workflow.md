# Vault Weekly

## Purpose

Weekly synthesis — cross-session review of vault activity, North Star alignment, patterns, candidate review evidence, and forward priorities.

## Invocation

- Canonical workflow: `vault-weekly`
- Runtime adapters may expose this as `/vault-weekly`, `vault-weekly`, or another runtime-native trigger. The behavior belongs here.

## Required Context

- Start with `harness/manual.md`.
- Use `harness/operator.md` for the active runtime persona.
- Use `harness/user.md` for Bob/user context when user preferences, scope, or voice matter.
- Use QMD or local search before broad file reads when looking for prior vault context.

## Workflow

Cross-session synthesis of the past week. Bridges daily standup (lightweight) and quarterly review brief (comprehensive). This is ANALYSIS, not verification — find patterns, surface drift, detect uncaptured work.

### Role

- **`review-evidence`** — run only when review evidence is explicitly in scope; otherwise skip this role

### Workflow

#### 1. Gather Week's Activity

Automated — no user input needed:

- `git log --since="7 days ago" --oneline --no-merges` — all vault changes
- List all notes modified in the past 7 days (git + filesystem)
- Read any `Notes/1-1/*.md` notes from this week
- Check `Projects/active/` for status changes
- Check `Notes/incidents/` for new or updated incidents

#### 2. North Star Alignment

Read `harness/north-star.md` and compare actual activity against stated focus:

- **Aligned work**: which Current Focus items got attention this week?
- **Drift**: work that doesn't map to any stated goal (not necessarily bad — flag it)
- **Silent goals**: focus items with zero commits, zero note updates, zero mentions
- **Emerging themes**: work patterns suggesting a focus shift that hasn't been written down yet

#### 3. Cross-Day Patterns

Look across the week's notes for:
- Recurring themes (same topic in multiple notes or days)
- Multiple incidents or issues touching the same system
- Topics appearing in BOTH work notes and 1:1s (these are signals)
- Context that evolved across sessions (decisions that shifted, understanding that deepened)

#### 4. Candidate Review Evidence

If Bob asks for review material, run the `review-evidence` role with weekly
scope and filter its findings down to items that clearly occurred in the past 7
days. Otherwise skip this section.

Additionally check:
- Were approved review-evidence items logged in `reviews/Index.md` or the current cycle note?
- Any 1:1 feedback or kudos not captured?
- Incident contributions that may matter for a future review?

#### 5. Competency Signal Mapping

For each competency in `reviews/competencies/`:
- Was it exercised this week? (check work note links, incident roles, 1:1 topics)
- If yes, is the competency explicitly linked from the evidence note?

Present as a compact table: competency name, exercised (yes/no), linked (yes/no).

#### 6. Forward Look

- Blocked items or upcoming deadlines from active work notes
- North Star goals that need attention next week
- Scheduled 1:1s or meetings worth preparing for
- Suggested priority ordering for next week based on goals + momentum + gaps

#### 7. Present Synthesis

Structure the output as:

- **This Week**: 3-5 bullet summary of what actually happened
- **North Star Check**: alignment status — what's on track, what drifted, what's silent
- **Patterns**: cross-day themes worth noting
- **Candidate Review Evidence**: only when review evidence is in scope
- **Competency Coverage**: compact table
- **Next Week**: suggested priorities and attention areas

After presenting, offer:
- "Want me to save any of these as candidate review evidence?"
- "Should I update North Star with any focus shifts?"
- "Want me to save this under `reviews/` or the relevant project folder?"

### Important

- This is transient analysis by default — do NOT create a file unless the user asks.
- Keep the tone analytical, not cheerful. This is a status check, not a celebration.
- Be honest about drift and silent goals — the value is in surfacing what's NOT happening, not just what is.
- Don't duplicate standup (daily, what's next) or wrap-up (session, verify quality). This is SYNTHESIS across days.
- If it was a light week (few commits, no new notes), say so. Don't pad the analysis.

## Writes

- `harness/` notes
- `Projects/` notes and indexes
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

- `review-evidence`
