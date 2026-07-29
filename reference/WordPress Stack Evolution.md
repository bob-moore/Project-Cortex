---
date: 2026-07-10
description: "The agency's WordPress tooling lineage — mdm-cornerstone/classic themes (legacy, MDM era) vs. mwf-cornerstone/canvas (current) — resolves which mu-plugin/theme is actually load-bearing on any given client repo."
tags:
  - reference
---

# WordPress Stack Evolution

Per Bob (2026-07-10): the agency's WordPress codebase conventions have changed over the years, tracking the company's own naming history from MDM to Midwest Family Marketing/Midwest Family Madison. This resolves the "why do some repos have both an mdm- and mwf- prefixed thing" question that comes up per-client.

## mu-plugins

- **`mwf-cornerstone` — current.** The site-specific mu-plugin used today: houses boilerplate plus site-specific blocks and functionality. If a repo has this, it's the load-bearing one.
- **`mdm-cornerstone` — legacy.** Predates the MWF-era stack. Present only on older sites built during the MDM (Midwest Digital Marketing) era.

If a repo has both (e.g. [[Systems Furniture Installations Stack]]), `mdm-cornerstone` is leftover from the original build, not something actively maintained — don't assume it needs equal care to `mwf-cornerstone`, but don't delete it without checking it's actually unused first.

## Themes

- **`canvas` — current shared MWF base theme.** Full Site Editing (FSE) block theme. Used directly on some clients (e.g. [[Educated Mortgage Stack]]) or extended via a client-specific child theme (e.g. `themes/brunsell` on [[Brunsell Lumber Stack]]).
- **Classic (non-FSE) per-site themes — legacy.** Older sites built pre-`canvas` have their own one-off classic PHP-template theme (e.g. `themes/sfi` on [[Systems Furniture Installations Stack]] — built during the MDM era, hence `mdm-cornerstone` alongside it and Beaver Builder page-builder content rather than Gutenberg blocks).

## Applying this

When picking up a client repo for the first time, check which cornerstone mu-plugin and which theme pattern it uses — that immediately tells you whether it's an MDM-era classic build (older, page-builder content, `mdm-cornerstone`) or a current MWF-era build (`canvas`-based, FSE blocks, `mwf-cornerstone`). Older sites being enhanced in place (like [[Systems Furniture Installations]]) don't necessarily get migrated to the current stack just because work is happening on them — check whether a migration is actually in scope before assuming one.

## Related

- [[Systems Furniture Installations Stack]] — MDM-era example (classic theme + mdm-cornerstone)
- [[Educated Mortgage Stack]] · [[Brunsell Lumber Stack]] — current MWF-era examples (canvas + mwf-cornerstone)
