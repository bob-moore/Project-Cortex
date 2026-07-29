---
name: social-shortform
description: "This skill should be used when the user asks to \"write social posts\", \"draft LinkedIn posts\", \"write tweets\", \"make a thread\", \"write captions\", \"create social snippets\", \"make post variants\", \"write short-form copy\", or when a writing workflow needs platform-native social post drafts without scheduling or channel operations."
---

# Social Shortform

Use this skill to draft platform-native short-form social copy and variants.

This skill writes post copy. It does not manage calendars, create graphics,
schedule posts, analyze social performance, or mutate a social platform.

## Operating Contract

Start with `writing-foundation`. Use `claim-check` when compressing factual
claims. Use `content-repurpose` when deriving posts from a larger source.

1. Identify target platform.
2. Identify audience, relationship, source artifact, message, proof, and desired
   action.
3. Draft for platform behavior: hook, compression, format, CTA, and comments.
4. Preserve claim status.
5. Do not post, schedule, DM, reply, or update profiles without explicit
   external mutation approval.

## Platform Profiles

Use `references/platform-profiles.md` for details.

- `linkedin`: professional, insight-led, clear line breaks, discussion CTA.
- `x-thread`: numbered thread, one idea per post, tight claim handling.
- `x-post`: compact standalone thought or link post.
- `instagram-caption`: visual-adjacent caption with first-line hook.
- `shorts-script`: TikTok/Reels/Shorts script with 0-3 second hook.
- `community-prompt`: Slack, Discord, Reddit-style discussion starter.

## Draft Procedure

1. Classify the platform and source.
2. Extract one message per post.
3. Choose hook shape.
4. Draft the post or variants.
5. Check length, claim compression, CTA, and voice.
6. Return platform notes and open risks.

## Output Format

Return:

```text
Social Drafts
Platform:
Audience:
Source:

Post 1:
[copy]

Variants:
- ...

Notes:
- Evidence:
- Assumptions:
- Open claims:
- Approval boundary:
```

For threads:

```text
Thread:
1/ ...
2/ ...
3/ ...
```

## Boundaries

- Do not invent stats or sharpen claims beyond source support.
- Do not create platform operations plans unless asked.
- Do not schedule or post.
- Do not force hashtags, emojis, or casualness when the platform or brand does
  not need them.
- Do not turn social compression into misleading oversimplification.

If this skill conflicts with `.agents/disciplines/writing/rubric.md`, the rubric
wins.

## Reference Files

- `references/platform-profiles.md`: channel-specific copy profiles.
- `references/hook-and-variant-rules.md`: hooks, variants, and compression.
