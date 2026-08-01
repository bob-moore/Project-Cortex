---
name: skill-doc-refresh
description: "Use when a project-local Developer or platform skill may be stale because an external API, framework, CLI, provider, or version has changed. Refreshes one skill's compact source map and only the durable guidance proven by current primary sources and repository evidence; it does not become startup context or edit a target repository."
---

# Skill Documentation Refresh

Use this maintenance skill to keep one project-local implementation skill accurate
without turning external documentation into ambient context. Treat a source map as
an evidence index, not a copied documentation dump.

## Operating Contract

- **Reads:** target `SKILL.md`, its source map, repository instructions/manifests
  when supplied, official documentation and changelogs, and the specific stale
  claim or failure that triggered the refresh.
- **Writes:** scoped source-map updates, and only durable corrections to the
  target skill when evidence proves the current local guidance is inaccurate or
  materially incomplete.
- **Does not:** edit a client repository, install packages, activate an MCP or
  provider integration, store credentials, turn web examples into canonical
  project truth, or refresh unrelated skills opportunistically.
- **Done when:** source provenance, version scope, last-check date, stable
  gotchas, verification command, and any unresolved uncertainty are explicit.

## Required Inputs

1. Target project-local skill path or name.
2. Refresh reason: a dated source map, a version/API mismatch, failed project
   behavior, a newly required feature, or an explicit current-doc request.
3. Repository path and installed version only when a real repository is in
   scope. Read its instructions and manifest before drawing a compatibility
   conclusion.
4. The approved scope for changing local harness guidance.

If no authoritative source or installed-version evidence is available, record the
uncertainty; do not replace working guidance with a guess.

## Method

### 1. Establish the freshness question

Read the target skill and its existing `references/source-map.md` first. Identify
one concrete assertion, API surface, command, configuration pattern, or provider
behavior to verify. Record whether the question concerns:

- a stable concept;
- a version-sensitive API or CLI;
- a provider capability or deployment behavior; or
- repository-specific integration behavior.

A broad request such as “refresh everything” must be reduced to a bounded
surface or handled as individually reported sub-scopes.

### 2. Gather sourceable evidence

Use this authority order:

1. Target repository instructions, manifests, tests, and neighboring code for
   local compatibility and conventions.
2. Official versioned documentation, changelog, CLI reference, or release notes
   for external behavior.
3. Vendor-maintained examples only when they identify their version/scope.
4. A documentation resolver such as Context7 only as a retrieval aid; follow its
   returned primary source rather than treating a snippet as authority.

Do not send private code, credentials, client data, or secret-bearing config to
an external documentation service.

### 3. Update the compact source map

Create or amend `references/source-map.md` beside the target skill. Keep only:

```text
Scope:
Official sources:
Repository/version evidence required:
Last checked:
Stable guidance:
Known gotchas:
Verification:
Refresh triggers:
Unresolved questions:
```

Use direct official URLs and a check date. State `not resolved` rather than
inventing a library identifier, installed version, provider plan, or command.

### 4. Promote only durable guidance

Patch the target `SKILL.md` only when the evidence changes reusable behavior:

- correct a stale command, API, or safety boundary;
- add a version/compatibility precondition;
- replace a generic directive with an observable verification step; or
- record a recurring, source-proven gotcha.

Keep ephemeral release notes, implementation examples, account details, and
client-specific values in the source map or the relevant client/repository,
not in generic skill instructions.

### 5. Verify the maintenance change

Validate frontmatter and local references, run the harness gate, and—when a real
repository caused the refresh—run its smallest relevant native check. Return:

```text
Target skill:
Freshness question:
Repository/version evidence:
Official evidence:
Source-map changes:
Durable skill changes:
Verification:
Unresolved uncertainty:
Next refresh trigger:
```

## Common Pitfalls

1. **Documentation dump.** Store links, version scope, and durable conclusions,
   not copied vendor pages.
2. **Live docs as local truth.** A current vendor example does not override an
   installed version, repository instructions, or working tests.
3. **Unbounded refresh.** Refresh one named surface; report other stale-looking
   areas separately.
4. **Resolver authority.** Treat Context7 or a search result as a locator, not
   as final evidence.
5. **Secret leakage.** Never put tokens, account IDs, private endpoints, or raw
   config values in a source map.

## Verification Checklist

- [ ] Target, stale assertion, and scope were explicit.
- [ ] Repository/version evidence was read when relevant.
- [ ] Official sources—not a snippet alone—support the conclusion.
- [ ] Source map records source URLs, check date, version scope, and triggers.
- [ ] Only durable, reusable guidance changed in the target skill.
- [ ] Credentials and client-specific sensitive data were excluded.
- [ ] Local validation and the harness gate passed.
