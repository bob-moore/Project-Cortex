# SEO Content Brief Artifact

Save a durable SEO brief as Markdown in the resolved context:

1. Project, when the work belongs to an existing project.
2. Client, when no project owns the work.
3. Prospect, when the organization has not converted to a client.
4. Ask the User for the destination when no context fits.

Use a descriptive filename such as:

```text
YYYY-MM-DD <Topic> SEO Content Brief.md
```

## Frontmatter

```yaml
---
date: YYYY-MM-DD
description: "SEO content brief for <topic> — <new page or refresh>."
seo_mode: new-page
page_type: article
client: "<Client>"
project: "<Project>"
status: draft
attention_status: needs-review
attention_type: review
attention_owner: User
attention_date: YYYY-MM-DD
attention_priority: normal
next_action: "Review the SEO brief and approve the Writing handoff."
tags:
  - seo
  - content-brief
  - client/<slug>
---
```

Include only the applicable context field (`project`, `client`, or `prospect`)
and use the matching tag. Preserve the canonical context note as the source of
business and Brand/Voice information.

## Review Lifecycle

New briefs that require User inspection receive `attention_status:
needs-review` and a direct wikilink under `Home.md#Review Queue` with a visible
`needs-review` marker.

After User review, update the artifact to one of:

- `reviewed`
- `dismissed`
- `converted`

The direct Home link is removed during `/vault-wrap-up` or `/vault-audit` after
the status is resolved. The brief remains in its project, client, or prospect
context.

## Storage Verification

Before reporting the brief as saved:

- Verify the selected context exists.
- Verify the frontmatter parses.
- Verify exactly one of project/client/prospect is the destination context.
- Verify the Home review link exists when `attention_status: needs-review`.
- Verify the brief names its Writing handoff and next action.
