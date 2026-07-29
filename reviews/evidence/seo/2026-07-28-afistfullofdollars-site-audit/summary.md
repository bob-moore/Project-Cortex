---
date: 2026-07-28
description: Bounded SEO site audit evidence for A Fistful of Dollars.
attention_status: needs-review
attention_type: review
attention_owner: Bob
attention_date: 2026-07-29
attention_priority: normal
next_action: Review audit findings and decide whether remediation should become client work.
tags:
  - seo
  - site-audit
  - evidence
---

# SEO Site Audit: A Fistful of Dollars

## Scope

- Target: `https://www.afistfullofdollars.com/`
- Audit date: 2026-07-28, America/Chicago. Tool timestamps are recorded in UTC.
- Primary crawl: SiteOne Crawler 2.5.1, maximum 100 visited URLs, depth 2.
- Browser sample: Lighthouse 13.4.1 against the homepage on desktop.
- Specialist checks: sitemap, JSON-LD schema, image dimensions/alt attributes, and hreflang.
- Crawl result: 91 result records, 69 HTTP 200, 19 HTTP 307, and 3 HTTP 404 responses. The bounded crawl visited 20 pages and did not mutate the site.

## Executive finding

The site has a usable SEO foundation: indexable pages expose titles, meta descriptions, canonicals, language, one H1, image alt attributes, and Organization/WebSite JSON-LD. The audit is **revise**, not pass, because technical security, crawl hygiene, accessibility, and homepage performance issues need remediation or follow-up verification.

The report does not establish a search ranking, traffic impact, or production security exploitability. Server configuration findings should be confirmed with the hosting/CDN owner before changes are made.

## Priority findings

### P1: Harden transport and response security

- SiteOne observed support for TLS 1.0 and TLS 1.1 in addition to TLS 1.2/1.3. Disable the legacy protocols and retain TLS 1.2/1.3.
- SiteOne reported missing `Strict-Transport-Security` and `Content-Security-Policy` across 21 sampled responses, plus missing `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` warnings.
- SiteOne summarized 42 pages with critical security findings. This is a crawler finding, not proof of an exploitable vulnerability; verify the effective Cloudflare/origin configuration and compatibility of any policy before rollout.
- Positive signal: the certificate was trusted, used ECDSA with SHA-256 and an EC 256-bit key, and was reported valid through 2026-10-24.

### P1: Repair broken and redirected internal URLs

- Three 404 targets were found:
  - `/analytics.js`, referenced from `/nw0a/`
  - `/gtm.js`, referenced from `/nw0a/`
  - `/compare/doordash-vs-uber-eats-2026`, referenced from `/start-here/`
- Nineteen 307 redirects were found. The crawl indicates internal links omit trailing slashes and are redirected to slash-terminated URLs. Update internal links to final canonical URLs where practical.
- The broken analytics/GTM paths should be checked as possible stale or malformed script references before deciding whether to remove, replace, or redirect them.

### P1: Restore a discoverable XML sitemap

- `https://www.afistfullofdollars.com/sitemap.xml` returned HTTP 404 to the sitemap specialist.
- `robots.txt` itself returned HTTP 200 during the SiteOne crawl, but its contents were not independently normalized in this run. Inspect it for the platform's actual sitemap location and verify that the declared sitemap returns XML with a 200 response.
- This is a blocked specialist check, not evidence that no sitemap exists at another URL.

### P1: Improve homepage loading and asset delivery

Lighthouse's homepage sample reported:

- Performance score: 0.65.
- Largest Contentful Paint: 8.6 seconds; the LCP element was the H1 `Real Money Moves for Real People`.
- First Contentful Paint: 3.5 seconds; Time to Interactive: 8.8 seconds.
- Estimated image delivery savings: approximately 712 KiB across oversized images.
- Estimated unused JavaScript savings: approximately 141 KiB.
- Estimated render-blocking savings: approximately 1.8 seconds, including Google Fonts and first-party CSS.

Recommended sequence: resize and serve responsive image variants, reduce or defer non-critical JavaScript, then address font/CSS render blocking and remeasure on representative templates. SiteOne's "Performance OK" result measures crawl response timing and is not a substitute for the Lighthouse browser result.

## Secondary findings

- Ten crawled pages skipped heading levels; category/archive pages appear to use H3 cards directly beneath an H1. Review the template hierarchy and use H2 for the immediate child section heading level.
- Twenty crawled pages had form-label findings. Associate every control with a visible label, `for`/`id`, or appropriate accessible naming mechanism; confirm whether the same newsletter/form component is shared site-wide.
- Two images had empty `alt` values. These may be intentional decorative images, but confirm that they are not meaningful content.
- Seven image elements omitted width or height. Add stable dimensions or aspect-ratio metadata to reduce layout shift.
- Lighthouse found a non-descriptive `READ MORE` link on `/articles/work-from-home/work-from-home-productivity/`; make the link text identify the article or provide an accessible name.
- Lighthouse found multiple low-contrast text examples, including the logo text and metadata/tag links. Recheck the affected theme styles against WCAG contrast requirements.
- No AVIF image was found. This is an optimization opportunity, not an SEO defect by itself.
- No hreflang links were observed. This is acceptable unless the site targets multiple language or regional variants.
- Three page titles and one meta description were outside SiteOne's recommended length ranges; inspect the affected URLs before editing because length alone does not determine snippet quality.
- One page was marked `noindex`; identify it and confirm that exclusion is intentional.

## Healthy signals

- All indexable pages in the crawl had titles, meta descriptions, and canonicals.
- Titles and descriptions were reported as mostly unique within the crawl sample.
- All crawled pages had an H1, language attribute, main landmark, and image alt attributes according to SiteOne's checks.
- Three JSON-LD scripts were parsed by the schema specialist, with observed types `Organization` and `WebSite`.
- The certificate chain was trusted and modern TLS 1.3 was supported.

## Evidence index

- Primary crawl: `raw/siteone-crawler/report.json` and `raw/siteone-crawler/report.html`
- Browser sample: `raw/lighthouse/lighthouse.report.json` and `raw/lighthouse/lighthouse.report.html`
- Normalized crawl packet: `normalized/siteone-crawler.json`
- Normalized Lighthouse packet: `normalized/lighthouse.json`
- Specialist packets: `normalized/gap-sitemap.json`, `normalized/gap-schema.json`, `normalized/gap-images.json`, and `normalized/gap-hreflang.json`
- Run metadata and command arguments are retained beside each raw result under `raw/*/run-metadata.json`.

## Quality gate

- Contract fit: pass. The bounded site-audit workflow and declared tools were used.
- Evidence quality: pass with limits. Raw and normalized artifacts are retained; the sitemap specialist is explicitly blocked by HTTP 404.
- Completeness: revise. The run is bounded to depth 2 and 20 visited pages; it is not a complete inventory of the site.
- Recommendation safety: pass with limits. Security and performance recommendations are framed as follow-up actions, not claims of exploitability or ranking impact.
- Verdict: **revise**.

## Next actions

1. Hosting/CDN owner: confirm effective TLS and response-header configuration, then apply a staged security-header policy.
2. Developer: remove or repair the three broken targets and update internal links that currently produce 307 redirects.
3. Developer/SEO owner: locate the canonical sitemap in `robots.txt` or the platform configuration and submit/verify it after repair.
4. Developer: address homepage image, JavaScript, CSS, and font costs, then rerun Lighthouse on the homepage and a representative article.
5. Content/template owner: correct heading hierarchy, form labels, link text, contrast, and intentional image alt usage.
6. SEO owner: inspect the specific title, description, and noindex URLs and decide whether each is intentional.

## Related

- [[reviews/Index|Reviews]]
- [[harness/roadmaps/seo|SEO Roadmap]]
