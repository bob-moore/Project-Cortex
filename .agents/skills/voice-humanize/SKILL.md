---
name: voice-humanize
description: "This skill should be used when the user asks to \"humanize this\", \"make this less AI\", \"make this sound natural\", \"rewrite in my voice\", \"make this less generic\", \"fix robotic writing\", \"remove model-shaped phrasing\", \"improve authenticity\", or when a writing workflow needs a targeted voice and rhythm pass that preserves facts, strategy, and approved meaning."
---

# Voice Humanize

Use this skill for a targeted voice, rhythm, and naturalness pass on an existing
draft.

This skill is narrower than `copy-edit`. It does not perform a full copy edit,
rebuild strategy, verify factual claims, publish content, or diagnose authorship.
It removes generic, over-polished, formulaic, or model-shaped writing patterns
while preserving meaning, facts, structure, and approval boundaries.

## Operating Contract

Start from preservation.

1. Identify the artifact mode from `.agents/disciplines/writing/modes.md`.
2. Identify the target voice from direct instruction, Brand notes, Voice notes,
   approved examples, or the strongest natural passages in the draft.
3. Identify facts, claims, quotes, names, dates, terms, and strategic commitments
   that must remain unchanged.
4. Treat pattern findings as editorial signals, not proof of authorship.
5. Count recurring patterns before calling them overuse.
6. Return a revised draft plus a concise change note.
7. Do not publish, send, schedule, upload, or externally mutate content.

## When To Use

Use for:

- Drafts that sound generic, padded, stiff, over-polished, or overly cautious.
- Drafts that need to sound closer to the operator, client, or brand voice.
- Drafts with formulaic transitions, inflated language, or repetitive cadence.
- Drafts where the strategy is acceptable but the prose feels unnatural.

Use `copy-edit` instead when the draft needs structure, grammar, clarity,
constraint, and claim passes together. Use `writing-foundation` when audience,
positioning, or promise is weak.

## Procedure

### 1. Calibrate Voice

Build a small voice target before rewriting.

```text
Mode:
Target voice source:
Formality:
Directness:
Rhythm:
Terms to keep:
Terms to avoid:
Facts to preserve:
Open assumptions:
```

Use `references/voice-calibration.md` when the target voice is unclear or
multiple voice sources conflict.

### 2. Identify Pattern Clusters

Look for clusters that create a generic or model-shaped feel.

- Inflated significance.
- Promotional filler.
- Formulaic transitions.
- Repetitive sentence rhythm.
- Hedge stacking.
- Synonym cycling.
- Chat-response residue.
- Over-styled formatting.

Do not flag a single normal writing choice as a problem. Count repeated signals
and check whether the pattern conflicts with the target voice.

Use `references/pattern-signals.md` for the pattern list and count thresholds.

### 3. Rewrite Without Drift

Make the draft sound more natural without changing the contract.

- Replace inflated claims with concrete language.
- Keep useful repetition when it improves clarity.
- Add specificity only when source context supports it.
- Keep technical terms when the audience expects them.
- Vary rhythm without making every sentence short.
- Preserve necessary caveats.
- Remove chatty filler that belongs to an assistant response.

Use `references/rewrite-moves.md` for allowed moves and examples.

### 4. Run A Preservation Check

Compare the revised draft against the source.

- Facts preserved.
- Strategy preserved.
- Claims not strengthened without evidence.
- Quotes not altered unless requested.
- Required terms and forbidden terms respected.
- Voice source followed or assumptions labeled.

Use `references/preservation-check.md` for the final check shape.

## Output Format

For a short passage, return:

```text
Revised:

Note:
- ...
```

For anything longer than a paragraph, return:

```text
Revised Draft:

Changes:
| Category | What changed | Example |
| --- | --- | --- |
| ... | ... | ... |

Remaining Flags:
- ...
```

Keep the change table under 8 rows. Include only categories where a real change
was made. Do not provide an authorship verdict.

## Boundaries

- Do not invent anecdotes, first-person experience, sources, metrics,
  testimonials, or customer language.
- Do not remove precision just to sound casual.
- Do not turn formal brand voice into conversational voice unless instructed.
- Do not flatten useful style into a universal plain-English tone.
- Do not use "AI detection" language as proof.
- Do not claim the draft is ready if a workflow requires `writing-quality-gate`.

If this skill conflicts with `.agents/disciplines/writing/rubric.md`, the rubric
wins.

## Reference Files

- `references/voice-calibration.md`: voice-source priority and calibration
  fields.
- `references/pattern-signals.md`: recurring signals that can make prose feel
  generic or model-shaped.
- `references/rewrite-moves.md`: allowed revision moves.
- `references/preservation-check.md`: final fact, claim, and strategy
  preservation pass.
