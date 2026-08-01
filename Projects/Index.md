---
date: 2026-07-15
description: "Central map of all work notes — active projects, completed work by quarter, decisions log"
tags:
  - index
  - moc
---

# Work Notes

Central map of content. All work notes and decisions link back here. For quick navigation, use [[Home]] or open `bases/Active Work.base`.

**Folder structure**: `active/<Project Name>/` = bounded active project folders. The main project note repeats the project name (`<Project Name>/<Project Name>.md`) so wikilinks stay unambiguous, while related specs, copy drafts, implementation plans, and decisions sit in the same collapsible folder. `archive/YYYY/<Project Name>/` = completed project folders. Client identity lives in `Clients/`; a client relationship ending archives separately under `Clients/archive/YYYY/`. Incidents and 1:1 notes live under `Notes/`, not `Projects/`.

## Client Projects

Bounded engagements for existing clients — see [[Clients/Index|Clients Index]] for the full client list (including retainer-only clients with no active project) and `bases/Clients.base` for a filtered view.

- [[Brunsell Lumber - Website Rebuild]] — currently in content-revision/pre-launch phase
  - [[Brunsell Lumber FAQ Content]] — FAQ copy bank supporting the rebuild
- [[Educated Mortgage - Website Rebuild]] — new WordPress site in final pre-launch polish (old PHP site still live)
  - [[Educated Mortgage SMS TC and Privacy Policy Pages]] — dev handoff spec for two new pages required for Twilio SMS approval
- [[Systems Furniture Installations - Homepage Rewrite]] — homepage copy rewrite on the existing live WordPress site (enhancement, not a rebuild)
- [[People4Pulse - Website Build]] — new WordPress site in progress/near-complete on staging, targeting week of 2026-07-20 launch
  - [[People4Pulse Website Copy]] — drafted copy deliverables (Overdose Crisis section, PULSE definition blurb, confirmation email)
- [[R&V Cleaning Solutions - Website Rebuild]] — full rebuild from scratch; original build (Oct 2025–Feb 2026) was assumed dead and its local/staging copies were deleted, client reopened contact 2026-07-13

## Active Projects

Non-client active work (internal, ops, etc.). The root entry point is [[Home]], with active work surfaced through `bases/Active Work.base`.

- [[Astro Publishing Platform MVP]] — internal MVP: Astro + Git-native content as a WordPress alternative, with a shared control plane so SEO/marketing staff can edit without code
- [[Agent OS R&D]] — R&D for this vault's agentic operating system methodology, runtime-neutral harness structure, workflow gates, and role/skill conventions
- [[Harness Distribution Prep]] — split framework wiring from client/instance content via git subtree so the harness can be distributed to the team and reused for other vaults
- [[Canvas Design System Overhaul]] — major-version overhaul of the agency's shared WP boilerplate theme (token/style-variation/pattern naming, pattern-library audit), sequenced before AI-assisted design tooling gets built on top of it
- bobmoore.dev — Bob's personal site/side business (Astro portfolio + blog, separate WP plugin/theme sandbox). Tracked in the separate Obsidian/Ventures vault (`Sites/bobmoore.dev/`), not here — this vault only models the day job.

## Recently Completed

-

## Completed

### Current Quarter
-

### Previous Quarters
-

## Reference

-

## Decisions Log

| Date | Decision | Status | Link |
|------|----------|--------|------|
| 2026-07-15 | Split client identity from bounded projects: `Clients/` holds durable client context, `Projects/active/` holds bounded engagements | Accepted, implemented | [[harness/key-decisions#2026-07-15|Key Decisions]] |
| 2026-07-25 | Retire `project-manager` (never real PM), replace with `assistant` — broader personal menial-task layer, no decision-making | Accepted, implemented | [[Decision - Retire Project Manager, Build Assistant Agent]] |

## Open Questions

-

## Archive

-
