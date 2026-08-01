---
name: voice-interview
description: "Use when a client has no Voice note, an existing Client Voice.md is thin or fill-in-the-blank vague, or repeated corrections/rejections show drafts aren't landing in the client's voice. Also use when the user asks to \"interview for voice\", \"build a voice profile\", \"onboard client voice\", \"capture how this client sounds\", or \"refresh the Voice note\". Conducts a refusal-first interview and compiles the answers into the canonical Client Voice.md; does not itself approve or publish content."
---

# Voice Interview

Client `Voice.md` notes are usually filled in with vague preference language
("conversational tone", "friendly but professional") that doesn't change what
gets written. This skill replaces that with a structured interview whose core
finding is: **taste is what a brand refuses, not what it prefers.** A
preference ("we're conversational") doesn't constrain a draft. A refusal ("we
never use 'leverage' as a verb, we never open with a rhetorical question, we
never promise same-day results") does.

This skill produces or refreshes `Clients/<Client>/<Client> Voice.md`. It does
not draft client copy, and it does not close its own work — `writing-foundation`
and `writing-quality-gate` are the consumers; a human (client stakeholder or
Bob) confirms the result reads as the brand before it's treated as
client-approved.

## Operating Contract

- **Reads:** `templates/Client Voice.md`, the existing `Clients/<Client>/<Client>
  Voice.md` and `<Client> Brand.md` if present, approved site/marketing copy as
  refusal/preference evidence, and any correction signal that triggered the
  refresh (client feedback, repeated edit patterns, a
  `harness/session-diary/` entry).
- **Writes:** `Clients/<Client>/<Client> Voice.md`, expanded from the template
  with refusal-first, example-backed answers instead of vague fields.
- **Does not:** draft or publish client-facing copy, invent brand facts or
  history the interviewee didn't state, treat inferred answers as
  client-approved, or promote a Voice note to canonical without an interviewee
  confirming it (or, when none is available, an explicit "inferred, unconfirmed"
  label).
- **Done when:** every filled field in `Client Voice.md` traces to a stated
  answer, a cited approved example, or is explicitly labeled inferred; a test
  draft against the new note passes the litmus check in Phase 3; and the
  interviewee (or Bob, standing in) has confirmed the result.

## Required Inputs

1. Client name and path (`Clients/<Client>/`).
2. Interview subject: the client stakeholder directly, Bob as proxy, or
   evidence-only synthesis from existing approved copy when no interview is
   possible right now (mark this mode explicitly — see Phase 0).
3. Trigger: new client with no Voice note, a thin/vague existing note, or a
   correction/rejection pattern prompting a refresh.
4. Time budget: determines Full or Quick depth (Phase 1).

## Method

### Phase 0: Establish Mode

State which applies before starting:

- **New note** — no `Client Voice.md` exists yet, or it's still the unfilled
  template.
- **Refresh** — a note exists but keeps producing drafts that get corrected or
  rejected on tone/word choice grounds. Read the existing note and the
  corrected drafts first; interview only the areas that keep failing, not the
  whole thing.
- **Evidence-only synthesis** — no interviewee is available. Build a
  provisional note from approved site copy, past client feedback in the vault,
  and observed patterns only. Every field must be labeled `(inferred from
  observed copy, unconfirmed)`. Do not present this as equivalent to an
  interviewed note; flag it for confirmation the next time the client is
  reachable. This mirrors `voice-calibration.md`'s "Provisional Voice" rule —
  don't represent judged/inferred voice as approved voice.

### Phase 1: Interview

Full question bank and depth guidance:
[[references/interview-question-bank.md|Interview Question Bank]].

Two depths:

- **Full** (~45-60 min, new or high-value client): all seven categories.
- **Quick** (~15-20 min, refresh or smaller client): the Quick Calibration
  subset only, plus whichever full-bank category covers the specific
  correction pattern that triggered the refresh.

Interview rules, non-negotiable regardless of depth:

1. One question at a time. Wait for the answer before moving on.
2. Push back on vague answers. "We're friendly" gets "Friendly how — show me
   one of your sentences that's friendly done right, and one from a competitor
   that's friendly done wrong (try-hard, fake, or corporate-friendly)."
3. Demand a real example for every claim: an actual sentence from their site,
   an email, a review response — not a hypothetical.
4. Call out contradictions between answers instead of silently picking one.
5. Bias every question toward a refusal, not a preference, wherever the
   category allows it. "What do you sound like" is a weaker question than
   "what would make you wince if you saw it under your own name."
6. Don't accept "I don't know" on the first pass — reframe or come back to it
   after an easier question loosens things up. Two failed reframes is enough;
   move on and leave the field blank rather than inventing an answer.

### Phase 2: Compile

Map interview answers into `templates/Client Voice.md`'s existing structure —
don't invent a parallel format. Apply the same signal test the source
methodology uses for its compact profile: **if this line disappeared, would a
draft come out differently?** If no, cut it or fold it into a shorter line.

Compilation rules:

- **Refusals go in "This brand never sounds like" and "Rejected examples"
  first.** These are the highest-signal fields; fill them before polishing
  "sounds like" language.
- **Every "sounds like" claim needs a paired "never sounds like" or rejected
  example.** A preference without a boundary is unfalsifiable and won't
  survive a rewrite decision.
- **Preferred terminology table**: only pairs the interviewee actually stated
  or that appear in approved copy — not inferred synonyms.
- **Client-specific format notes**: fill sentence length, punctuation habits,
  structural habits, and headline style only from stated answers or cited
  examples, not from genre assumptions about their industry.
- Leave a field blank rather than filling it with a generic value to make the
  template look complete. A blank field is honest; a generic one is a false
  signal the next writer will trust.
- Do not delete or override the agency-wide "Format & Style Defaults" section
  — only add to Brand-Specific Rules, per the template's own instruction.

### Phase 3: Test

Before treating the note as usable:

1. Draft one short test passage (a paragraph or short email) twice: once as
   judged/generic voice, once using the new note.
2. Apply the litmus test: *does the second version sound like something this
   brand would actually publish, or like an AI trying hard to hit every rule
   in the note?* If it reads forced, the note over-specified — cut whichever
   field made it feel mechanical rather than natural.
3. Show both to the interviewee (or Bob) and get an explicit confirmation
   before marking the note client-approved. Record the confirmation (who, when)
   in the note or the client project note.

### Phase 4: Maintain

A Voice note is not static. Re-run Phase 0's Refresh mode when:

- The same correction (tone, word choice, structure) shows up on unrelated
  drafts more than once.
- The client explicitly says something doesn't sound like them anymore.
- `writing-quality-gate`'s Audience and Voice Fit score is repeatedly weak for
  this client despite the note being read.

This skill is the deliberate, on-demand refresh mechanism. It is not the
automatic session-diary-driven correction loop described in
`harness/roadmaps/self-improvement-loop.md` — that promotion mechanism is
still deferred pending the same tested-baseline precondition as the
Runtime-Neutral Dispatcher. Until that exists, a human (or an agent explicitly
told to) has to notice the correction pattern and invoke this skill.

## Common Pitfalls

1. **Preference-only answers.** "We're professional" or "casual but smart"
   changes nothing. Push to a refusal or a concrete example before compiling.
2. **Treating one interview as permanent.** Taste drifts; a note that's never
   refreshed goes stale the same way a Developer source map does.
3. **Overfitting a test draft.** Forcing in every documented rule reads as
   parody, not voice. Fewer rules applied naturally beats more rules applied
   mechanically — the same anti-overfitting caution as the source methodology.
4. **Presenting inferred answers as confirmed.** Evidence-only synthesis
   (Phase 0) must stay labeled until an interviewee confirms it.
5. **Skipping the paired example.** A "sounds like" claim with no "never
   sounds like" counterpart is a preference, not a usable constraint.
6. **Closing your own work.** This skill hands off to interviewee/Bob
   confirmation and to `writing-quality-gate`; it doesn't self-certify.

## Verification Checklist

- [ ] Mode (new / refresh / evidence-only) was stated before starting.
- [ ] Interview ran one question at a time with push-back on vague answers.
- [ ] Every filled field traces to a stated answer, a cited example, or is
      labeled inferred/unconfirmed.
- [ ] Refusal fields ("never sounds like", rejected examples) are filled
      before or alongside "sounds like" fields, not skipped.
- [ ] A test draft was produced and checked against the litmus test.
- [ ] The interviewee or Bob confirmed the result before it's treated as
      client-approved.
- [ ] Agency-wide Format & Style Defaults were preserved, not overwritten.
