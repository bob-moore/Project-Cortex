---
name: copy-edit
description: "This skill should be used when the user asks to \"edit this\", \"polish this\", \"tighten this\", \"proofread\", \"copy edit\", \"make this clearer\", \"improve this draft\", \"check voice\", \"check tone\", \"final pass\", \"humanize this draft\", or when a writing workflow needs revision of an existing artifact without changing approved facts or strategy."
---

# Copy Edit

Use this skill to revise existing written artifacts for clarity, voice fit,
structure, rhythm, grammar, and constraint preservation.

This skill edits. It does not create the strategy from scratch, verify factual
truth, publish content, send messages, or close the independent quality gate.
Use `writing-foundation` when the draft needs audience or positioning repair.
Use `writing-quality-gate` after editing when a readiness verdict is required.

## Operating Contract

Start by preserving the artifact's intent.

1. Identify the mode from `.agents/disciplines/writing/modes.md`.
2. Identify the requested edit depth: proofread, light edit, standard edit,
   substantial edit, voice pass, or humanize pass.
3. Read available Brand, Voice, brief, project, or campaign notes for
   client-specific work.
4. Preserve approved facts, claims, quotes, names, dates, prices, legal terms,
   and strategic commitments.
5. Mark unsupported or unclear claims instead of inventing proof.
6. Do not publish, send, schedule, upload, or mutate external systems.

## Edit Depth

Choose the shallowest edit that satisfies the request.

| Depth | Use For | Allowed Changes |
| --- | --- | --- |
| `proofread` | typo, grammar, punctuation, formatting cleanup | wording changes only where needed for correctness |
| `light-edit` | minor clarity and flow improvements | sentence tightening, repetition removal, simple transitions |
| `standard-edit` | normal copy edit | structure, clarity, voice, rhythm, CTA, and claim-visibility fixes |
| `substantial-edit` | messy draft with strategy mostly intact | reorder sections, rewrite passages, add missing bridges |
| `voice-pass` | brand or operator voice fit | tone, diction, rhythm, forbidden/required language |
| `humanize-pass` | generic or model-shaped draft | remove formulaic phrasing while preserving facts and meaning |

Ask before changing strategy, audience, offer, position, factual claims, or legal
meaning unless the user explicitly requested that scope.

## Edit Procedure

### 1. Read For Contract

Capture the editing contract before changing words:

```text
Mode:
Edit depth:
Audience:
Desired action:
Voice constraints:
Facts to preserve:
Claims needing proof:
Format constraints:
Approval boundary:
```

Use `references/editing-sweeps.md` for the detailed pass sequence.

### 2. Preserve Meaning

Protect the source draft from silent drift.

- Keep factual claims materially unchanged unless evidence or user instruction
  supports a correction.
- Keep quoted language exact unless asked to edit the quote.
- Keep named entities, dates, prices, locations, product names, and commitments
  intact.
- Keep the original action or recommendation unless the requested edit includes
  strategy.
- Flag contradictions or unsupported claims as open items.

Use `references/preservation-rules.md` when the artifact contains claims,
quotes, regulated topics, case-study material, testimonials, or contractual
language.

### 3. Improve Readability

Make the draft easier to understand without flattening useful voice.

- Put the key point early.
- Split overloaded sentences.
- Remove filler and repeated ideas.
- Replace vague language with concrete wording when source context supports it.
- Translate feature-heavy statements into reader benefit.
- Improve headings, paragraph breaks, bullets, and transitions.
- Keep formatting appropriate to the channel.

### 4. Apply Voice

Match the voice source, not generic "human" writing.

- Follow Brand and Voice notes when available.
- Preserve intentional terms, local phrases, and approved style choices.
- Remove generic polish, hype, and vague enthusiasm.
- Avoid making every sentence short, casual, or punchy by default.

Use `references/voice-and-humanize.md` for model-shaped patterns, voice checks,
and rhythm repair.

### 5. Check Claims And Constraints

Do a final risk pass before delivery.

- Mark every unsupported statistic, testimonial, result, comparative claim, or
  superlative.
- Keep high-stakes claims conservative unless current source evidence is
  available.
- Check requested length, format, required terms, forbidden terms, audience, and
  tone.
- Surface external mutation boundaries clearly.

## Output Format

For short edits, return the revised text and a compact note.

For material edits, return:

```text
Edited Draft:

What Changed:
- ...

Remaining Flags:
- ...

Edit Notes:
- Mode:
- Edit depth:
- Evidence labels:
- Recommended next gate:
```

When editing an existing file, write only when the workflow approval class allows
`vault_write`. Otherwise return the edited draft for review.

## Boundaries

- Do not invent proof, claims, examples, customer language, or voice rules.
- Do not replace a specific voice with generic casualness.
- Do not remove nuance solely to make prose shorter.
- Do not rewrite an approved strategy as a copy edit.
- Do not treat "humanize" as permission to change facts.
- Do not claim readiness when `writing-quality-gate` is required but has not
  run.

If this skill conflicts with `.agents/disciplines/writing/rubric.md`, the rubric
wins.

## Reference Files

- `references/editing-sweeps.md`: ordered editing passes.
- `references/preservation-rules.md`: fact, claim, quote, and strategy
  preservation.
- `references/voice-and-humanize.md`: voice-fit and model-pattern cleanup.
- `references/word-level-edits.md`: filler, weak verbs, jargon, sentence shape,
  and final polish.
