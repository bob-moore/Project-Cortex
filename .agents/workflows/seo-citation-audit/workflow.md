# SEO Citation Audit

## Invocation

- Canonical workflow: `seo-citation-audit`

## Purpose

Audit approved citation and directory evidence for NAP, category, URL,
ownership, relevance, indexability, duplicates, freshness, and correction
priority. No listing submission or mutation occurs.

## Required Context

- `.agents/workflows/seo-citation-audit/contract.json`
- `.agents/skills/seo-citation-audit/SKILL.md`
- `.agents/skills/seo-local-audit/SKILL.md`
- `.agents/skills/seo-quality-gate/SKILL.md`
- Client/project/prospect business records and approved citation/listing context

## Workflow

1. Resolve business, locations, service areas, market, language, date, and scope.
2. Load first-party records, GBP/Maps data, directory exports, provider data,
   website facts, and local audit context.
3. Ask before live directory, listing, review, or provider reads.
4. Assess NAP, category, URL, ownership, relevance, indexability, duplicate,
   stale, conflicting, and inaccessible records.
5. Label source, date, evidence type, confidence, and limits.
6. Prioritize corrections by business impact, authority, relevance, confidence,
   effort, and risk; directory count alone is insufficient.
7. Route listing work to the owner/operator and Strategy; page/schema work to
   SEO/Development.
8. Apply `seo-quality-gate` in `local-seo` mode and save the routed artifact.

## Approval Gates

- `external_read`: ask before live directory, listing, review, or provider reads.
- `provider_data`: paid or credentialed calls require approval.
- `vault_write`: save only to resolved context.
- `external_mutation`: submissions, edits, claims, suppression, deletion, CMS,
  code, schema, and production are out of scope.

## Verification

- Business facts, source status, freshness, evidence, confidence, and limits
  are explicit.
- Findings have action, owner, rationale, priority, and recheck.
- No submission, edit, claim, suppression, deletion, or outcome guarantee occurs.
- `seo-quality-gate` passes or is explicitly deferred.

## Writes

- Resolved project, client, or prospect context when authorized.
- User-approved review artifact path.
- Home review link when review is required.
- No listing submission, edit, claim, suppression, deletion, CMS, code, schema,
  provider, or production writes.

## Return Format

Return **Done**, **Evidence**, **Open Items**, and **Next**.

## Related Roles

- `strategist`
- `verifier`
- `wordpress-operator`
- `developer`
