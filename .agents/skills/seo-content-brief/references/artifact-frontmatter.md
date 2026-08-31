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

New briefs that require User inspection receive a source-linked task record
under `Tasks/` with `status: review`, owner, next action, acceptance criteria,
and a link back to the brief. The brief itself does not carry review-queue
metadata and does not receive a direct Home link.

After User review, record the decision in the review task history. If real work
remains, create one or more downstream tasks; otherwise move the review task to
`done`.

The brief remains in its project, client, or prospect context.

## Storage Verification

Before reporting the brief as saved:

- Verify the selected context exists.
- Verify the frontmatter parses.
- Verify exactly one of project/client/prospect is the destination context.
- Verify the source-linked review task exists when User inspection is required.
- Verify the brief names its Writing handoff and next action.
