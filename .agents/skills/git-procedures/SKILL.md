---
name: git-procedures
description: "Use for the detailed mechanics of Git workspace isolation (worktree vs submodule detection, directory selection, baseline verification) or an active merge/rebase conflict (conflict classification, resolution, and abort/continue reporting). Supports developer-delivery's 4a/4c procedures with the concrete steps those sections only summarize."
---

# Git Procedures

Detailed procedure skill for two bounded Git mechanics: setting up an isolated
workspace before implementation work, and resolving an active merge or rebase
conflict. Both modes are read/local-write only — remote, merge, publication,
and release actions remain explicit approvals owned by `developer-delivery`
and the parent workflow.

## Operating Contract

1. Read `.agents/disciplines/development/contract.json` and `modes.md`.
2. Identify which mode applies: `isolate-workspace` or `resolve-conflict`.
3. Do not create a worktree, alter `.gitignore`, install dependencies, commit,
   push, open a PR, merge, rebase, tag, or release merely because this
   procedure mentions it — each remains gated by repository/User policy and
   explicit approval.
4. Preserve pre-existing dirty work; report overlap instead of silently
   resolving it.

## Mode: Isolate Workspace

Use before starting feature work that needs isolation from the current
checkout, or before executing a multi-step implementation plan.

### Step 0 — Detect Existing Isolation

Before creating anything, check whether the checkout is already isolated:

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
BRANCH=$(git branch --show-current)
```

**Submodule guard:** `GIT_DIR != GIT_COMMON` is also true inside a submodule.
Before concluding "already in a worktree," verify it is not a submodule:

```bash
# A returned path means this is a submodule, not a worktree — treat as a normal repo.
git rev-parse --show-superproject-working-tree 2>/dev/null
```

If `GIT_DIR != GIT_COMMON` and it is not a submodule, the checkout is already a
linked worktree — skip to Step 2. Do not create another worktree.

If `GIT_DIR == GIT_COMMON` (or it is a submodule), this is a normal checkout.
If the User has not already stated a worktree preference, ask for consent
before creating one: it protects the current branch from changes, but the
User may prefer to work in place.

### Step 1 — Create the Isolated Workspace

Prefer the runtime's native worktree tool (an `EnterWorktree`-style tool,
`/worktree` command, or `--worktree` flag) when one is available — it owns
placement, branching, and cleanup, and bypassing it in favor of raw
`git worktree add` creates phantom state the harness cannot see or manage.

Only fall back to manual `git worktree add` when no native tool exists:

1. **Directory selection**, in priority order: an explicit User-declared
   directory; an existing project-local `.worktrees/` (preferred, hidden) or
   `worktrees/` directory — if both exist, `.worktrees/` wins; otherwise
   default to `.worktrees/` at the project root.
2. **Safety check:** confirm the chosen directory is git-ignored
   (`git check-ignore -q .worktrees` or `worktrees`). If not ignored, add it
   to `.gitignore` and commit that change before creating the worktree —
   an unignored worktree directory commits the whole tree into the repo.
3. Create it: `git worktree add "$path" -b "$BRANCH_NAME"` and `cd` in.
4. If creation fails on a sandbox permission error, tell the User the sandbox
   blocked worktree creation and continue in the current directory instead —
   run setup and baseline checks in place.

### Step 2 — Project Setup

Auto-detect and run the project's install step (`npm install` for
`package.json`, `cargo build` for `Cargo.toml`, `pip install -r
requirements.txt` / `poetry install` for Python, `go mod download` for
`go.mod`). Skip silently when no manifest matches.

### Step 3 — Verify Clean Baseline

Run the project-appropriate test command. Report pass/fail. If tests fail at
baseline, report the failures and ask whether to proceed or investigate first
— do not attribute a pre-existing failure to work not yet done.

### Report

```text
Worktree ready at <path>, branch <name>
Baseline: <N> tests, <pass|fail> (or: no test command detected)
Ready to implement: <feature>
```

## Mode: Resolve Conflict

Use when an active merge or rebase conflict blocks progress.

1. Verify `MERGE_HEAD` or `REBASE_HEAD` exists; if neither does, stop and
   report "No merge or rebase in progress."
2. Before any write, list every conflicted path and classify each as **AUTO**
   or **JUDGMENT**. Default to JUDGMENT — AUTO requires mechanical proof:
   - both sides are byte-identical, or differ only in whitespace/EOL — take
     either;
   - an added-by-us/added-by-them conflict where the same logical entry
     already exists on the other side under a different name — remove the
     duplicate rather than keep both;
   - a lock file — check out one side and regenerate it via the project's
     package manager rather than hand-merging it;
   - `CHANGELOG.md` — merge the unique entries, dedupe, preserve category
     order.
3. For any repository convention involving sequentially numbered files
   (migrations, plans, ordered docs), keep the incoming side's numbers and
   renumber colliding own-side-only files from the next free number, fixing
   any self-references or cross-references those files contain.
4. Show every conflict — file, nature of the conflict, proposed action, and
   AUTO/JUDGMENT classification — before touching anything. Ask once:
   Approve / Modify / Abort. Abort must leave the working tree untouched.
5. Apply approved AUTO resolutions; report counts and any failures.
6. For each JUDGMENT file, show the exact "ours" and "theirs" hunks plus the
   proposed merged result. Ask Approve / Edit / Skip per file — Skip leaves
   that file conflicted.
7. A resolution that fails to apply cleanly stays conflicted and is reported
   under Skipped; continue with the remaining files rather than aborting the
   whole operation.
8. Verify no tracked conflict markers remain, that renumbering (if any) is
   internally consistent, and run whatever build/lint checks the repository
   defines.
9. Report the outcome and stop — do not commit, continue the rebase, or push.
   That decision belongs to the User or the parent workflow.

### Report

```text
Conflict resolution: N resolved (X AUTO, Y JUDGMENT); Skipped: <files, reason>
Verification: <conflict markers / renumbering / build-lint results>
Operation state: ready to continue | should be aborted | needs owner decision
Next owner:
```

## Boundaries

- Do not commit, push, merge --continue, rebase --continue, tag, or release
  as part of either mode — report readiness and let the owner act.
- Do not resolve a JUDGMENT conflict without showing both hunks and getting
  an explicit per-file decision.
- Do not silently discard a Skipped file's conflict markers.

## Source Notes

Adapted from `stash/development/superpowers/skills/using-git-worktrees` and
`stash/development/development-skills/skills/resolve-merge`, generalized away
from source-repo-specific conventions (e.g. a fixed "plans and chronicles"
numbering scheme) into the repository-convention-aware form above. Supports
`developer-delivery` section 4c, which owns the summary-level Git-safety
procedure and approval boundary.
