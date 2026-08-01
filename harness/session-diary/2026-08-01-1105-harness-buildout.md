---
date: 2026-08-01
description: Session diary — corrections and standing preferences for agent ingestion, harness/vault-ops session, no client.
tags: [session-diary]
disciplines: [harness, vault-ops]
---

## Corrections
- Proposed a new harness folder (`session-log`) without checking for existing similarly-named folders first → `session-logs/` already existed with an incompatible purpose. Always grep for existing dirs/READMEs with similar names before proposing a new harness folder or skill name.
- Assumed a standalone `diagnosing-bugs` skill was the default move once approved to build the "3 strong-source" specialists → developer-delivery already covered the core loop inline; enriching in place was correct, a competing skill was not. Check whether an existing skill/section already covers a proposed capability before building a new one.

## Preferences
- Don't install or wire in external tools/skills without inspecting integration value first — evaluate, don't default to installing.
- Don't wire in a discussed-but-not-requested integration (e.g. OpenPencil) just because a gap was identified. Wait to be asked.
- No new skills (design or development) built speculatively — require an identified, concrete, recurring need first.
- Automation/autonomy should stay manual-triggered until there's a tested baseline to learn from; a rewrite loop on untested skills compounds bad data. Understanding the mechanism precedes handing it to an agent.
- Anything built for agent-consumption (not human reading) should optimize for token efficiency over readability/polish.

## Related
- [[harness/session-diary/README|Session Diary]]
