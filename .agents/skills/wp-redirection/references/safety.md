# Safety rules (Redirection plugin)

Redirects are invisible infrastructure — a mistake doesn't throw a visible error, it silently sends real traffic (and search crawlers) to the wrong place or a 404. Treat every bulk write as high-risk.

## Golden rules

- Assume production is **unsafe** unless explicitly confirmed as the intended target.
- Always back up the existing redirect set before importing, even into what should be an empty table:
  `wp redirection export all backup-$(date +%Y%m%d).json --format=json`
- Test every non-trivial batch on staging first, and verify with `curl -I` — don't trust "import succeeded" as proof the redirects behave correctly.
- Imports do not dedupe. Re-running an import after a partial failure or a mapping fix creates duplicate entries rather than replacing them. Restore from the pre-import backup before re-attempting, or clean up manually.
- For a launch-blocking legacy-URL migration, treat the mapping's completeness as the actual risk — the import mechanics are simple; the source-of-truth spreadsheet being incomplete or stale is what causes post-launch 404s.

## High-risk operations (require explicit confirmation before running)

- Any `wp redirection import` targeting production
- `wp redirection database remove` (deletes the plugin's redirect tables)
- Large regex-pattern imports (a bad regex can match far more than intended and redirect legitimate new URLs)

## Logging

For a launch-related redirect batch, log:

- date/time
- environment (staging vs production)
- source of the mapping (spreadsheet name/version, or export file used)
- row count imported
- the pre-import backup file location
