# Vault Self Review

## Purpose

Draft a self-review from vault evidence, candidate review notes, and project outcomes for a target review cycle.

## Invocation

- Canonical workflow: `vault-self-review`
- Runtime adapters may expose this as `/vault-self-review`, `vault-self-review`, or another runtime-native trigger. The behavior belongs here.

## Required Context

- Start with `harness/manual.md`.
- Use `harness/operator.md` for the active runtime persona.
- Use `harness/user.md` for Bob/user context when user preferences, scope, or voice matter.
- Use QMD or local search before broad file reads when looking for prior vault context.

## Workflow

### Self-Review Writer

Write your self-assessment for your company's review tool. Produces project impact descriptions, competency self-assessments (current level / next level), principles, and growth plan — all within character limits, fact-checked, strategically calibrated.

### Usage

```
/vault-self-review [cycle]
```

Default cycle: current review period.

### Context: Review System

Adapt this to your company's review system. Common patterns:

- **Evaluation axes**: Impact (what was delivered), Competencies (skill demonstration at level), Principles (culture/values alignment). Customize the specific dimensions and terminology.
- **Rating scale**: Common scales include Below/Meet/Above or 1-5. Configure per your org.
- **Audience**: Typically your manager, possibly a calibration panel. Understand who reads this and tailor detail accordingly.
- **Your self-assessment sets the anchor** — especially when the manager is new or has limited context.

### Workflow

#### 1. Load Context

Read in order:
1. `harness/north-star.md` — current goals and focus
2. `reviews/cycles/<cycle>/Review Brief.md` — the full private review brief
3. `reviews/cycles/<cycle>/Review Brief - Manager.md` — what the manager has seen
4. Previous cycle review — baselines
5. Review cycle notes covering the period
6. All competency notes in `reviews/competencies/`
7. `reviews/Performance Framework.md` — evaluation structure (if exists)
8. Key work notes for submitted projects

#### 2. Draft Projects

For each submitted project (within the target tool's character limit, e.g. 1000 chars):
- Open with your role and scope
- Cover impact dimensions: what was delivered, quality of execution, process efficiency, complexity handled
- Include specific evidence: numbers should be factual (PR counts, team size, timeline)
- End with outcome or significance

Decide all ratings at the end together — calibrate the full picture before committing.

#### 3. Draft Competencies

For each competency, decide current level (Yes/No) and next level (Yes/No):
- Read the level criteria from the competency note
- Check each sub-criterion: is there concrete evidence?
- If saying Yes to next level, every sub-criterion should be defensible — missing the primary criterion undermines credibility

Draft text per YES answer (within the target tool's character limit):
- **Competency texts are NOT project descriptions** — the project section already covers WHAT. Competency texts cover HOW you applied the skill.
- Lead with behaviors and decisions, not deliverables
- Reference the previous cycle baseline: "Previously Meet, this period X" shows trajectory
- Calibrate jargon per audience: technical for Architecture/Functional Expertise, behavioral for Communication/Planning
- No overlap between current level and next level texts for the same competency — use different evidence or different framing

#### 4. Draft Principles

For each principle (within the target tool's character limit):
- Reference the previous cycle baseline and any specific growth feedback
- Lead with the strongest evidence
- If the rating changed from last cycle, make the growth explicit

#### 5. Strategic Calibration

Before finalizing, review the full picture:

**Impact**: Are the ratings defensible? Is there one genuine Meet to show calibration, or are all Above justified?

**Competencies**:
- Are next-level YES answers defensible on EVERY sub-criterion?
- Would you be comfortable if a calibration reviewer challenged any specific answer?
- Does claiming YES here protect or undermine the credibility of other next-level claims?

**Principles**: Does the pattern from last cycle to this cycle show growth?

**Audience check**: Will the manager (who may be new) have enough context to defend these ratings in calibration, or does the written evidence need to do the heavy lifting?

#### 6. Quality Checks

- [ ] All sections within the target tool's character limit (use `node --experimental-strip-types .agents/scripts/charcount.ts <file> "<section>" "" <limit>`)
- [ ] Watch for special characters (em-dashes, en-dashes) — some review tools count these as multiple characters
- [ ] Every factual claim backed by vault evidence
- [ ] No fabricated decisions ("chose X over Y" when Y was never considered)
- [ ] No self-undermining language in next-level YES texts ("not yet at yearly scope")
- [ ] Dates verified — check day of week before claiming "weekend work"
- [ ] No references to specific people's performance issues — don't volunteer information about others' struggles
- [ ] Growth baselines stated for competencies and principles
- [ ] Technical jargon calibrated per audience

#### 7. Fact-Check Pass

Enter plan mode. For every claim:
- Is it in the vault? Which source?
- Is it first-hand or inferred?
- Could a reviewer challenge it with "what's your evidence?"
- If the claim names a file, function, or flag — does it still exist?

Flag and fix anything that doesn't pass.

#### 8. Save

Return the draft in the response for copy-pasting. If the user wants it saved,
write it to `reviews/cycles/<cycle>/Self-Review.md`.

### Tips

1. **Your self-assessment anchors the conversation** — especially with a new manager who lacks independent context.
2. **Check character counts early and often.** Use the charcount script after every draft, not after pasting.
3. **Watch special characters** — some review tools count em-dashes and en-dashes as multiple characters.
4. **Peer reviews feed into your ratings.** What peers write about you is visible. What you write about peers builds your reputation as a thoughtful evaluator.
5. **Fact-check before submitting.** Plan mode for verification catches fabricated claims, wrong dates, and references that shouldn't appear in a review.

## Writes

- `harness/` notes
- `reviews/` evidence notes

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
