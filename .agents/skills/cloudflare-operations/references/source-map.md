# Source Map: Cloudflare Operations

## Scope

Live Cloudflare zone/DNS, edge/cache, Worker/Pages deployment state, routes, and
custom-domain behavior. This map is refresh-time evidence; it is not an account
inventory and contains no credentials, account identifiers, or client targets.

## Official sources

- Cloudflare developer documentation: <https://developers.cloudflare.com/>
- DNS record management: <https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/>
- DNS record reference: <https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/>
- DNS propagation troubleshooting: <https://developers.cloudflare.com/dns/troubleshooting/dns-propagation/>
- Workers overview: <https://developers.cloudflare.com/workers/>
- Wrangler command reference: <https://developers.cloudflare.com/workers/wrangler/commands/>
- Workers deployments and rollbacks: <https://developers.cloudflare.com/workers/versions-and-deployments/>
- Workers routes and custom domains: <https://developers.cloudflare.com/workers/configuration/routing/>
- Cloudflare Pages: <https://developers.cloudflare.com/pages/>
- Cache purge: <https://developers.cloudflare.com/cache/how-to/purge-cache/>
- API reference: <https://developers.cloudflare.com/api/>
- Changelog: <https://developers.cloudflare.com/changelog/>

## Repository/version evidence required

For Workers/Pages source work, inspect the target repository's instructions,
manifest/lockfile, `wrangler.*` or project configuration, declared environment,
and project-native build/test evidence. For direct provider operations, confirm
account, zone/project/service, target, and plan/capability by live read. Do not
infer them from a Stack note or this map.

## Last checked

2026-07-30. Official DNS and Wrangler documentation routes were reachable. No
client account, zone, Worker, Pages project, provider plan, local CLI, or
repository was inspected.

## Stable guidance

- Live DNS, edge, route, cache, and deployment state need an exact target,
  explicit approval for consequential/prod mutation, before-state, rollback, and
  independent read-back.
- Repository-owned Worker/Pages code/configuration is Developer work; live
  deployment bindings and provider state are Cloudflare Operations work.
- Provider success responses, builds, and DNS records each prove different
  things. Verify provider state, external DNS/HTTP behavior, and rendered result
  at the appropriate layers.

## Known gotchas

- DNS propagation, proxy state, cache behavior, TLS, origin reachability, and
  rendered behavior are separate checks.
- Worker/Pages version deployment does not itself prove the expected route or
  custom domain serves that version.
- Provider feature availability and commands may vary by account plan, product,
  version, and deployment model; verify current capabilities just in time.
- Never add client account IDs, API tokens, secret values, or private endpoints
  to this map.

## Verification

Use the confirmed provider read operation plus an independent DNS or HTTP check
appropriate to the request. For repository-backed Worker/Pages changes, run the
target repository's declared build/test commands before any approved release.
Use `web-quality-verification` for rendered user-visible outcomes.

## Refresh triggers

- A Cloudflare provider/API/CLI/deployment behavior changes or is unclear.
- A target repository changes Wrangler, adapter, Worker, or Pages configuration.
- A provider plan/product capability affects a requested operation.
- A deployment, route, DNS, cache, or rollback check contradicts local guidance.

## Unresolved questions

- Local CLI/API/MCP route and authentication method must be discovered per
  runtime and account; none is assumed by this skill.
- A Context7 library identifier is not committed until a real refresh run proves
  it resolves current Cloudflare documentation accurately.
