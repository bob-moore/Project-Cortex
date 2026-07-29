---
date: 2026-07-24
description: "General inbox — drop anything here, then run the vault-intake workflow to classify and route to the right vault notes"
tags:
  - index
---

# Inbox

Drop anything here — meeting transcripts, raw notes, exported documents, reports, whatever needs sorting. Run the `vault-intake` workflow to process all files — it reads each one, classifies the content, and routes everything to the correct vault location:

- 1:1 notes → `Notes/1-1/<Person> YYYY-MM-DD.md`
- Project updates → relevant `Projects/active/` note
- Decisions → Decision Record + `Projects/Index.md` decisions log
- Review-worthy evidence → `reviews/` only when approved or explicitly requested
- Action items → relevant work notes
- Anything else → wherever it actually belongs, or ask if unsure

Most items will be clearly labeled (filename or content says "meeting transcript," "meeting note," etc.) and get classified with high confidence. If something genuinely isn't clear, `vault-intake` asks rather than guessing.

**This folder is a staging area, not storage.** Once a note is processed, `vault-intake` will ask to delete the raw export.

## Naming Convention

Drop files as-is from your export tool. Suggested prefix for clarity:

```
YYYY-MM-DD <Topic or Person>.md
```
