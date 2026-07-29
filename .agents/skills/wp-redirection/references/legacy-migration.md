# Legacy URL migration workflow (pre-launch redirects)

The standard shape of this task: an old site (often non-WordPress, or a legacy PHP/`.htaccess`-based site) is being replaced by a new WordPress build with a different URL structure, and every old URL needs to 301 to its new equivalent before launch — otherwise inbound links and search rankings break the day the new site goes live.

## Workflow

1. **Get the full old→new URL mapping from a source of truth**, not from memory or a partial crawl. This is usually a spreadsheet the account/dev team maintains (e.g. an "Old Sitemap vs New Sitemap Pages" sheet). Confirm it's complete — cross-check against the old site's actual sitemap.xml or a crawl if there's any doubt it's exhaustive.

2. **Convert the mapping to Redirection's CSV format**: `source,target[,regex,code]`. Old URLs typically need the full old path (e.g. `/about-us.php`), new URLs the new clean slug (e.g. `/about`). Default to `301` for permanent migrations unless a specific URL needs a temporary code.

3. **Test on staging first.** Import the full batch (or a representative sample) into the staging site's Redirection install, then spot-check with `curl -I`:
   ```
   curl -I https://staging.example.com/about-us.php
   ```
   Confirm `301` and the correct `Location:` header.

4. **Watch for patterns that should be regex, not literal.** If the old site has parameterized or paginated URLs (e.g. `/blog.php?p=123`), a literal CSV row per URL doesn't scale — use a regex source pattern and set the regex column to `1` instead of enumerating every value.

5. **Import to production as part of the launch checklist**, not before — a legacy-URL redirect set only becomes correct once the new site's final slugs are locked. Re-confirm the mapping is still accurate against the new site's actual published slugs right before import, since slugs can drift during content buildout.

6. **Back up before the production import** (`wp redirection export all backup.json --format=json`) even though the destination should be a fresh/empty redirect table — cheap insurance against having run this step twice.

7. **After launch, monitor Redirection's 404 log** for a few days. Anything showing up there that maps to a known old URL is a gap in the mapping — add it and re-check.

## Common gaps

- Trailing-slash inconsistency between old and new URLs (`/about-us.php` vs `/about-us.php/`)
- Query-string variants of the same old page not covered by a literal-match row
- Old URLs that were themselves already redirects (redirect chains) — resolve to the final destination, don't chain through an intermediate hop
- Non-page assets (old PDFs, images linked externally) that also need mapping if they're being relocated
