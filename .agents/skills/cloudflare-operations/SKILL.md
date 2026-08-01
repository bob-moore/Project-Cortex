---
name: cloudflare-operations
description: "Use when reading or changing live Cloudflare DNS, zone/edge, cache, Workers, Pages, routes, or deployment state. Enforces exact account/zone/environment confirmation, separation of repository code from provider state, explicit approval for consequential or production mutation, rollback planning, and independent provider plus external verification."
---

# Cloudflare Operations

Use this skill for live Cloudflare control-plane work: zones and DNS records,
proxy/edge and cache behavior, Worker or Pages deployment state, routes/custom
domains, and scoped observability. It specializes `platform-operations` for a
provider that is both a DNS/edge control plane and a deployment surface.

## Operating Contract

- **Reads:** client Stack note, approved work order, confirmed Cloudflare
  account/zone/project/service, current provider state, relevant repository
  evidence for code-backed services, and current official source-map guidance.
- **Writes:** only the smallest approved Cloudflare state change and an
  evidence-backed operation report.
- **Does not:** infer account, zone, route, environment, provider plan, or
  deployment target; edit Worker/Pages source or repository-owned config; reveal
  credentials; manage billing, account membership, API-token lifecycle, or
  unrelated Zero Trust/security policy; or treat a dashboard/API success message
  as verification.
- **Done when:** provider read-back, relevant DNS/edge/deployment health, and
  bounded collateral checks prove the intended state; rollback information and
  remaining uncertainty are reported.
- **Boundary:** Developer owns Worker/Pages source, `wrangler.*` and other
  version-controlled configuration, tests, and build artifacts. This skill owns
  live account/zone/route/deployment state after the source boundary is proven.
  `web-quality-verification` owns rendered user-visible proof.

## Required Context

1. Read `platform-operations`, `harness/manual.md`, and
   `harness/policies/approvals.md`.
2. Read `references/source-map.md`; refresh it through `skill-doc-refresh` when
   a provider behavior, CLI/API surface, or plan-specific fact is stale.
3. Identify the client and read its Stack note. Confirm the exact account,
   zone, record/service/project, environment, and requested outcome through
   a live list/get read before any mutation.
4. For Workers/Pages or repository-backed routes, first obtain Developer
   evidence: repository, commit/branch, declared configuration, relevant build
   result, and the intended deployment binding.
5. Classify the action. Any live DNS change, cache purge, route/domain binding,
   Worker/Pages deployment or rollback, redirect/edge rule, or security setting
   is consequential and production-scoped unless the confirmed target is a
   non-production environment.

If account/zone/target/environment identity or access cannot be proved, stop and
report the blocker. Do not guess based on a familiar domain name.

## Method

### 1. Capture a change packet and rollback

Before a consequential operation, record:

```text
Client/project:
Cloudflare account and zone/project/service:
Environment and target URL/record/route:
Requested outcome and acceptance criteria:
Before-state:
Affected dependencies and collateral surfaces:
Rollback path and owner:
Approval for this exact mutation:
```

For DNS, include record type/name/content/TTL/proxy state and dependent mail,
verification, application, or subdomain services where relevant. For Workers or
Pages, include the current deployment/version, route/custom-domain binding, and
known healthy URL. For cache/edge configuration, include the scoped path/host
and expected invalidation or behavior change.

### 2. Make the smallest safe mutation

- **DNS:** modify only the confirmed record set; do not batch adjacent cleanup.
  Treat MX, TXT, CAA, NS, and verification records as dependent services rather
  than generic DNS values.
- **Workers/Pages:** do not deploy unverified code. Confirm the exact
  deployment/rollback target and route/domain binding before release.
- **Routes, redirects, cache, and edge rules:** prefer the narrowest host/path
  scope. Do not purge broadly or create catch-all behavior without explicit
  scope and rollback.
- **Security controls:** only alter an explicitly named setting with a recovery
  path; rules can lock out users or origin services.

Stop after the approved mutation. New cleanup, retries that change scope, or a
higher-blast-radius workaround need separate approval.

### 3. Verify in layers

1. **Provider read-back:** independently retrieve the changed DNS record, zone,
   deployment/version, route/custom domain, rule, or cache state.
2. **External DNS/edge:** query the expected hostname/record or HTTP behavior
   from outside the provider. Record that DNS/edge propagation may be delayed;
   distinguish delay from an incorrect configuration.
3. **Service health:** confirm expected Worker/Pages response, route selection,
   TLS/redirect behavior, or cache headers without exposing secrets.
4. **Rendered result:** hand user-visible changes to `web-quality-verification`.
5. **Collateral:** sample only plausible shared impact: sibling DNS records,
   mail/verification dependencies, affected routes, custom domains, origin
   reachability, or co-located services.

### 4. Return evidence

```text
Status: verified | implemented-not-verified | blocked | rolled-back
Client/project:
Cloudflare account/zone/project and environment:
Confirmed target and approval:
Before-state and rollback path:
Operation performed:
Provider read-back:
External DNS/edge/service verification:
Rendered-verification handoff, if applicable:
Collateral checks:
Remaining propagation or other uncertainty:
Candidate Stack-note update:
```

## Common Pitfalls

1. **Zone ambiguity.** Matching a hostname does not prove the account or zone;
   always list/get the live target.
2. **Proxy confusion.** DNS resolution, proxy state, origin reachability, cache,
   and rendered HTTP behavior are different proof layers.
3. **Source/state mixing.** Do not repair repository config inside a live
   provider operation; route it to Developer and resume only with verified
   source evidence.
4. **Blind deployment.** A successful build or API response does not prove the
   intended Worker/Pages version serves the intended route.
5. **Overbroad purge/rule.** A host-wide cache purge or catch-all route has a
   larger blast radius than a targeted path change.
6. **Secret leakage.** Never print API tokens, account IDs from secret output,
   secret values, or environment-variable contents.

## Verification Checklist

- [ ] Account, zone/project/service, target, and environment were proven live.
- [ ] Repository-owned source/config work was separated and verified first.
- [ ] Exact production/consequential approval and rollback path were recorded.
- [ ] The mutation was the smallest approved change.
- [ ] Provider read-back and external DNS/edge/service checks passed or are
      explicitly pending propagation.
- [ ] User-visible effects were handed to rendered verification when relevant.
- [ ] Collateral dependencies were sampled proportionally to risk.
- [ ] No credentials or secret values appear in the report.
