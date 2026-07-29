# Safety rules (WP Migrate DB Pro CLI)

A push/pull overwrites the destination's database wholesale (or the scoped subset you specify). Unlike a code deploy, there's no diff review step — it either ran or it didn't, and the previous state is only recoverable from a backup.

## Golden rules

- **Direction is the #1 risk.** `push` sends the local machine's DB *out*; `pull` brings the remote's DB *in*. Before running either, say out loud (or in the commit/handoff note) which environment is the source and which is the destination.
- Always pass `--backup=` (at minimum `--backup=prefix`) on any migration touching an environment you can't trivially rebuild.
- Treat production as an unsafe default target. Require explicit, current confirmation before a push/pull where production is either source or destination.
- Prefer the default find/replace behavior over custom `--find=`/`--replace=` pairs unless there's a specific known need — custom replaces are the most common source of corrupted serialized data.
- Test find/replace and scope flags on a staging pair before running the same command against production.

## High-risk operations (require explicit confirmation)

- Any push or pull where production is source or destination
- Custom `--regex-find=`/`--regex-replace=` (can silently corrupt data if the pattern is broader than intended)
- Omitting `--backup=` on a destination that holds real content
- `--exclude-database` combined with file-only migrations, if the intent was actually a full migration (easy to omit by mistake and end up with a no-op database step)

## Logging

For any migration between real environments (not local scratch testing), log:

- date/time
- direction (push/pull) and explicit source + destination
- flags used (especially any custom find/replace or table scoping)
- backup location/identifier on the destination
- who requested/approved it, if this is touching production
