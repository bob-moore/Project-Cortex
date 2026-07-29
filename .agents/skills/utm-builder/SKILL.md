---
name: utm-builder
description: "Use when creating UTM-tagged campaign URLs, campaign tracking conventions, bulk attribution links, naming tables, or campaign documentation for analytics, email, social, content, partner, and launch campaigns. Prevents inconsistent attribution and never uses UTMs on internal links."
---

# UTM Builder

Use this skill to generate consistent campaign tracking links and attribution
documentation.

## Operating Contract

1. Resolve base URL, channel, source, medium, campaign, content/variant, term,
   and analytics destination.
2. Never put UTMs on internal site links.
3. Use lowercase, hyphenated values unless the client's analytics convention
   says otherwise.
4. Preserve existing URL parameters when appending UTM parameters.
5. Do not create paid ad campaigns, publish links, send email, or mutate
   external platforms.

## Recommended Convention

```text
utm_source: platform or sender, such as google, linkedin, newsletter, partner-name
utm_medium: channel type, such as cpc, email, social, referral, organic
utm_campaign: yyyy-mm-campaign-name or evergreen-campaign-name
utm_content: variant, placement, CTA, creative, or segment
utm_term: paid search keyword only
```

## Output

```text
UTM Links
Campaign:
Base URL:

| Channel | Source | Medium | Campaign | Content | Term | URL |

Notes:
- ...
```
