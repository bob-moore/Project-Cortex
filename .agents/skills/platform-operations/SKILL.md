---
name: platform-operations
description: "Use when reading or changing client hosting or infrastructure state: servers, apps, DNS, CDN/edge, cache, backups, and monitoring. Enforces client/environment confirmation, before-state, bounded approved mutation, asynchronous-operation verification, collateral checks, and rollback; it excludes WordPress application state and version-controlled code."
---

# Platform Operations

Use this skill for live client infrastructure state beneath an application:
hosting servers/apps, DNS, CDN/edge configuration, cache, backups, service
control, and monitoring. Current provider state is evidence; a vault note is not
proof that live infrastructure matches it.

Use `cloudflare-operations` when the confirmed provider is Cloudflare and the
request includes its DNS, edge/cache, Workers, Pages, routes, or deployment
surfaces; it adds provider-specific target and rollback checks while preserving
this skill's ownership boundary.

## Operating Contract

- **Reads:** client Stack note, project context, provider/account identity,
  current target state, acceptance criteria, and approval boundary.
- **Writes:** a bounded infrastructure change and an evidence-backed operation
  report.
- **Does not:** infer a server/app/domain identity, expose credentials, change
  WordPress application state, change repository-owned deployment definitions
  or IaC, bundle unrelated cleanup, or treat an accepted API response as
  completed state.
- **Done when:** independent read-back proves the intended state, asynchronous
  operations are resolved, relevant health/monitoring checks pass, collateral
  impact is checked, and rollback information is reported.
- **Boundary:** `developer` owns version-controlled code and deployment/IaC
  definitions. `wordpress-operator` owns mutable WordPress application state.
  This skill owns the live server, app container, DNS, CDN, cache, backup, and
  platform service state beneath them.

## Required Context

1. Read `Clients/<Client>/<Client> Stack.md`; read the active project note when
   the change belongs to a bounded engagement.
2. Read `harness/manual.md` and `harness/policies/approvals.md`.
3. Confirm the provider/account connection and discover the live tool schema
   just in time. Do not assume a provider, MCP server, CLI, or capability exists
   from a historical note.
4. Confirm the exact environment and target using a provider list/get read:
   account, server, application, domain, record, service, or backup.
5. Classify the requested action as read-only, consequential, administrative,
   destructive, or production before any mutation.

If the client, target, environment, account, or provider access cannot be
proved, stop before mutation and report the gap.

## Method

### 1. Capture before-state

Before consequential-or-higher work, record the current target state and the
smallest viable rollback path. Depending on the provider and action, this may
include settings, service health, affected DNS records, co-located apps, cache
configuration, and a verified backup/snapshot identifier.

Never print or persist credentials, tokens, passwords, or raw provider secret
output.

### 2. Obtain approval for the exact mutation

Administrative, destructive, and production operations require explicit
approval for the confirmed target and intended change. An approval to repair one
service does not authorize adjacent cleanup, scaling, deletion, or configuration
changes.

### 3. Make the smallest safe change

Prefer reversible actions. Stop, inspect, and verify before escalation to
higher-blast-radius actions. Preserve the confirmed target, provider, and
change scope in the operation record.

### 4. Verify in layers

1. **Provider read-back:** query the affected resource independently from the
   mutation response.
2. **Asynchronous completion:** poll or otherwise verify accepted background
   operations until they complete or fail.
3. **Health:** inspect relevant monitoring, service state, or application health.
4. **External reality:** for DNS/edge work, distinguish propagation delay from a
   failed change and report the measured state and timing.
5. **Collateral:** inspect co-located applications, dependent services, and
   adjacent records/configuration that plausibly share impact.

### 5. Return evidence

```text
Status: verified | implemented-not-verified | blocked | rolled-back
Client/project:
Provider/account:
Confirmed target and environment:
Risk class and approval:
Before-state and rollback path:
Operation performed:
Async completion:
Independent read-back:
Health/collateral verification:
Remaining uncertainty:
Candidate Stack-note update:
```

The parent workflow or User closes the broader task.

## Common Pitfalls

1. **Wrong environment.** A familiar domain does not prove its server, app, or
   account; confirm with a list/get read.
2. **Accepted is not complete.** Poll asynchronous work and independently
   inspect final state.
3. **Unseen blast radius.** Server and DNS changes can affect more than the
   apparent target; inspect co-located/dependent surfaces.
4. **Unverified backups.** A backup request is not proof a usable backup exists.
5. **Credentials in reports.** Never return or write sensitive provider output.
6. **Mixing ownership.** Route code/IaC to Developer and WordPress application
   state to WordPress Operator.

## Verification Checklist

- [ ] Client, provider/account, target, and environment were proven by live reads.
- [ ] Risk class and approval boundary were explicit.
- [ ] Before-state and rollback path were captured when required.
- [ ] Mutation was the smallest approved change.
- [ ] Async completion and independent read-back were verified.
- [ ] Relevant health and collateral surfaces were checked.
- [ ] Credentials were excluded from output.
- [ ] Remaining uncertainty and any Stack-note update were reported.
