# Vault Kickoff

## Purpose

Client work kickoff. Pulls a Monday.com + vault workload briefing, then directly dispatches the selected Strategist, Writer, Designer, Developer, or WordPress Operator and retains verification/revision ownership until the work is complete.

## Invocation

- Canonical workflow: `vault-kickoff`
- Runtime adapters may expose this as `/vault-kickoff`, `vault-kickoff`, or another runtime-native trigger. The behavior belongs here.

## Required Context

- Start with `harness/manual.md`.
- Use `harness/operator.md` for the active runtime persona.
- Use `harness/user.md` for Bob/user context when user preferences, scope, or voice matter.
- Use QMD or local search before broad file reads when looking for prior vault context.

## Harness Notes

- Route work through `.agents/roles/` contracts where available; runtime-specific agents are adapters.
- The active parent session owns dispatch, verification, revision, and closure.

## Workflow

### Usage

```
/vault-kickoff <client name>
/vault-kickoff workload
```

Use a client name to scope to one engagement. Use `workload` (or leave blank) for a full sweep across active clients. Both remain scoped to Bob's assigned Monday items—never another person's tasks; see [[harness/patterns#Monday.com scope: Bob's tasks only, never the team's]].

### Control-plane rule

This command's active parent session owns task state, dispatch, evidence review, revision, approval, closure, and durable vault reconciliation. A child agent, Codex process, generated artifact, commit, or successful process exit cannot close the task by itself.

Do not create detached queue tasks or development handoffs by default. Dispatch implementation directly from this workflow and keep the feedback loop in this session.

### Workflow

#### 1. Get the briefing

Invoke `assistant` with the requested scope. It reads Bob's Monday.com assignments plus `Clients/<Client>/` and matching `Projects/active/<Project Name>/<Project Name>.md` notes, and flags missing Brand/Voice/Stack prerequisites. It returns raw facts only — tasks, blockers, and prerequisites — never a recommended role; role routing is this command's own job.

If Monday.com tools are unavailable, say so and perform a vault-only sweep rather than failing.

**Role signal from Monday data:** use "Project Type" (on SEO/CRO & Content) as the primary signal where present; infer from task name and board otherwise.

| Signal | Recommended role |
|--------|-------------------|
| Strategic, onboarding, brand/voice work, positioning | `strategist` |
| New written content, blog | `writer` (Blog/article mode) |
| New written content on a service/product/about page, page copy revisions | `writer` (Website copy mode) |
| New landing page, dedicated conversion page copy | `writer` (Landing page mode) |
| Social post content | `writer` (Social post mode) |
| Newsletter issue, campaign/nurture email content | `writer` (Newsletter/Email mode) |
| Page enhancements (visual layout, brand tokens applied to a page) | `designer` |
| Page enhancements (functional: forms, redirects, plugin config) | `developer` |
| Technical (Website Builds board, Web Updates & Maintenance, Hosting & Maintenance) | `developer` |
| Photography | flag for a human — no agent handles photography |
| Reporting | `assistant` (fetch/format only), or a reporting skill if one exists for the specific metric |

When "Page enhancements" or a task name doesn't clearly separate visual from functional work, read the item's description/subitems before guessing, and flag it as ambiguous rather than picking one.

#### 2. Present and select work

Show the briefing without summarizing away its detail. Use the active runtime's user-input mechanism with multi-select when available; otherwise ask for a concise numbered selection. Skip the selector only when the original request already authorizes one specific action.

#### 3. Resolve prerequisites and construct the task contract

Before dispatch, assemble a self-contained contract because child agents do not see this conversation:

- Desired outcome
- Client and bounded project
- Recommended role
- Writing mode when the artifact is website copy, blog/article, SEO refresh, or case study
- Design mode when the artifact is a new layout, redesign, component/pattern specification, or rendered implementation review
- Canonical vault notes to read
- Repository or WordPress environment when known
- Relevant user decisions from the active conversation
- Acceptance criteria
- Out of scope
- Approval boundary
- Expected return evidence

Do not over-specify implementation before the executor inspects the actual repository or site. Pass outcomes, constraints, and evaluation—not a guessed file-by-file solution.

#### 4. Route by source of truth

| Work type | Agent | Routing rule | Contract must include |
|---|---|---|---|
| Client strategy/context | `strategist` | Brand, Voice, Design Tokens, onboarding, or positioning | Client, missing/changed context, source evidence, target artifact |
| Writing artifact | `writer` | Website copy, blog/article, SEO refresh, or case study; Writer drafts and revises but does not publish | Client, explicit mode, artifact/destination, Brand/Voice, brief/source packet, evidence requirements, acceptance criteria |
| Design | `designer` | New layout, bounded redesign, component/pattern specification, or rendered implementation review; Designer owns visual intent and conformance, not production mutation | Client, explicit mode, target, approved Writer artifact/content, Brand/Voice/Design Tokens, current-system evidence when applicable, destination, acceptance criteria |
| Version-controlled code | `developer` | WordPress theme/block/plugin source, Astro, build/test/config code | Client/project, repository, Stack note, acceptance criteria, deployment boundary |
| Mutable WordPress state | `wordpress-operator` | Pages, posts, media, Gutenberg/Site Editor, navigation, patterns, settings, forms, redirects, users, maintenance | Client/project, exact site/environment, Stack/Brand/Voice/Design Tokens as applicable, approval boundary |
| Reporting | none | Invoke an installed reporting capability directly; do not reference a missing skill as if it ran | Data source, reporting period, evidence labels |
| Photography | none | Surface as a manual action | Subject, shot list, owner, deadline |

The deterministic development boundary is:

```
Primarily a Git diff                    → developer
Primarily changed WordPress site state → wordpress-operator
Both                                   → developer, then wordpress-operator
```

A command interface does not change ownership: WP-CLI, REST, PHP, SQL, or MCP that changes WordPress database state still routes to `wordpress-operator`.

#### 5. Dispatch with dependency order

Run independent actions in parallel. Serialize true dependencies:

- Strategist before work requiring missing Brand/Voice/Design Tokens
- Writer before implementation requiring approved copy; parent approval separates the writing artifact from downstream publication or code/state changes
- Writer before Designer when visual work depends on missing or unapproved copy
- Designer before visual implementation; parent design approval separates the specification or selected prototype direction from Developer/WordPress production changes
- Developer before WordPress when a new code capability must exist first
- WordPress after Developer when the code must be configured or populated in the site

For each child, require its role-specific structured return contract. Keep the returned run/session identifier when the harness provides one.

#### 6. Verify and revise

When a role returns an artifact or implementation result:

1. Inspect the actual artifact, diff, WordPress state, or rendered site.
2. Re-run or independently check the reported tests and acceptance criteria when tools permit.
3. For an approved visual specification, dispatch Designer in rendered implementation review mode against the current implementation.
4. Use `web-quality-verification` independently for user-visible browser, responsive, interaction, accessibility, and regression evidence.
5. Reconcile Designer conformance findings with independent verification; neither producer self-report closes the gate.
6. If a criterion fails, send the observed failure evidence back to the same child run/session when resumable.
7. If resumption is unavailable, dispatch a revision with the original contract, prior result, and new failure evidence.
8. Repeat until verified, blocked, or awaiting an explicit approval.

Do not ask Bob to manually recreate context in a separate queue or Codex session. If the selected runtime cannot access the target, report the concrete access blocker and choose another available runtime/adapter from this session.

#### 7. Close and reconcile

Close an action only after evidence satisfies its acceptance criteria. A returned "done" without evidence checked in this session is not a closed action — treat it the same as a stale, unclosed handoff (see [[harness/patterns#Agent/Codex task handoffs need PM-style status tracking]]). Then:

- Report what changed and where
- Name tests and verification results
- Record remaining blockers or approvals
- **Write the evidence into the durable vault record, not just the chat report** — the relevant `<Client> Stack.md` task backlog or the bounded project's Action Items, using the standard closure format: `- [x] ~~Task~~ — verified <date>: <what was checked, how>`. The session transcript is not a durable record.
- Propose evidence-backed Stack/Brand/Voice/Design Token changes for approval
- Keep executable truth in the repository/live system and canonical organizational knowledge in the Work vault

### Notes

- `assistant` is read-only for reporting (calendar/email/Monday event creation is the one approval-gated exception) and does not dispatch agents or recommend roles — this command owns routing.
- `writer` is the only active canonical writing role until additional role contracts exist.
- `designer` is the primary visual-intent and rendered-conformance role; disposable prototypes are approval evidence, not production code.
- `developer` and `wordpress-operator` are execution roles, not handoff writers.
- Codex may be the preferred Developer runtime, but role identity is model-neutral.
- Production, destructive, deployment, user/role, plugin/theme lifecycle, and database actions retain their explicit approval gates.

## Writes

- `Projects/` notes and indexes
- `Clients/` notes

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

- `assistant`
- `strategist`
- `writer`
- `designer`
- `developer`
- `wordpress-operator`
