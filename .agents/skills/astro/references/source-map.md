# Source Map: Astro

## Scope

Framework behavior, CLI/configuration, and deployment-adapter guidance in
`../SKILL.md`. This map supports refresh-time evidence; it is not normal coding
context.

## Official sources

- Core documentation: <https://docs.astro.build/>
- Configuration reference: <https://docs.astro.build/en/reference/configuration-reference/>
- CLI reference: <https://docs.astro.build/en/reference/cli-reference/>
- Integrations guide: <https://docs.astro.build/en/guides/integrations-guide/>
- Cloudflare adapter: <https://docs.astro.build/en/guides/integrations-guide/cloudflare/>
- Changelog: <https://astro.build/blog/>

## Repository/version evidence required

Before applying version-sensitive advice, read the target repository's
`package.json`, lockfile, `astro.config.*`, adapter/integration configuration,
and project instructions. Do not infer Astro or adapter versions from this map.

## Context7 library ID

`/websites/astro_build_en` (trust score 10). Proven 2026-08-01: a topic query
for content collections returned current `defineCollection`/loader examples
matching the official guide. See
[[2026-08-01-context7-pilot|Context7 Pilot]].

## Last checked

2026-08-01. Official documentation availability and source URLs were checked;
no target repository/version was in scope.

## Stable guidance

- Repository configuration and package versions outrank generic examples.
- Use project-native `astro` scripts where defined; do not add adapters or
  integrations without repository policy and approval.
- Treat adapter/deploy behavior as version-sensitive and refresh it when a
  configuration or build mismatch appears.

## Known gotchas

- Adapter configuration, deployment bindings, and runtime behavior can differ
  across Astro and provider-adapter versions.
- A successful build does not prove a deployment, route binding, or rendered
  production behavior; use the relevant platform operation and rendered
  verification boundaries.

## Verification

Use the repository's declared scripts first. Typical checks, only when present
and relevant, are `astro check`, the project's build command, and a configured
preview/smoke test.

## Refresh triggers

- Installed Astro or adapter version differs from documented guidance.
- An adapter/configuration API or build behavior changes.
- A current official-doc request, deprecation, or repository test failure
  challenges existing skill guidance.

