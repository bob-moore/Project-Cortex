# Gutenberg and Site Editor

## Distinguish ownership

Before editing, determine whether the target is:

- Post/page block content in `wp_posts`
- Synced pattern or reusable block (`wp_block`)
- Navigation entity
- Database-customized template or template part
- Global Styles (`wp_global_styles`)
- Filesystem theme template, pattern, or `theme.json`

Filesystem-owned changes route to Developer. Database-owned editor state belongs to WordPress.

## Building pages

1. Read approved copy, layout, and Design Tokens.
2. Inventory existing blocks, styles, and patterns.
3. Reuse established primitives before introducing custom markup.
4. Preserve valid block serialization, nesting, anchors, classes, and IDs.
5. Avoid Custom HTML as a workaround for a missing block capability.
6. Verify editor reload and frontend rendering.

## Shared surfaces

Synced patterns, navigation, templates, template parts, and Global Styles can change many URLs. Before editing:

- Record object ID and current content/settings.
- Identify known placements or representative templates.
- Confirm whether the request intends a global change.
- Verify representative collateral pages after mutation.

## Global Styles and tokens

Use the client's approved Design Tokens. Do not select visually similar core palette values, create arbitrary hardcoded colors, or override theme defaults globally to solve one page.

If the Design Tokens are missing or contradict the active implementation, report the conflict rather than inventing a new visual system.

## Invalid blocks

If editing causes invalid-block warnings:

1. Stop further mutation.
2. Restore the captured raw block content if possible.
3. Identify serialization or version mismatch.
4. Route source-code compatibility problems to Developer.
