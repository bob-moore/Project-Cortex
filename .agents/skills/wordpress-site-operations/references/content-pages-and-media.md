# Content, Pages, and Media

## Inspect before editing

Capture the object's ID, type, slug, status, parent, modified timestamp, raw content, relevant metadata, and rendered URL. For block content, preserve the raw block grammar rather than round-tripping through a serializer that may normalize unrelated markup.

## Content operations

- Prefer updating the existing object rather than recreating it.
- Preserve draft/publish/private/scheduled state unless the task changes it.
- Preserve parent hierarchy, template assignment, author, taxonomies, and custom fields unless in scope.
- Use exact approved copy. Route copy creation or substantive rewriting to Writer.
- Check internal links and reusable/shared content referenced by the object.
- For deletion, prefer draft or trash before permanent deletion unless permanent deletion is explicitly required.

## Media

Before replacing or uploading media, verify:

- Correct file and rights/source
- Filename and MIME type
- Dimensions and file weight appropriate to use
- Alt text based on image purpose, not filename stuffing
- Caption/credit requirements
- Existing attachment reuse versus duplicate upload
- Every known placement when replacing an existing attachment

## Bulk operations

For bulk changes:

1. Export the affected IDs and before-values.
2. Dry-run or test a small representative batch.
3. Verify the sample in stored and rendered form.
4. Run the bounded batch.
5. Reconcile expected versus actual counts.

Never infer that a zero-error batch changed every intended record.
