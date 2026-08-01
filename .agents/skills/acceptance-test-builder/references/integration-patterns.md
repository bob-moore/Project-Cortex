# Deep Integration

Use the real engine, protocol, and serialization at the boundary under test.
Do not point a test at a production system or production data unless the User
has explicitly requested and confirmed it.

Guard database fixtures with an allow-list of test/development hosts and
databases. Fail before setup if the target is not explicitly safe.

Choose database isolation from the behavior under test:

- no commit expected: wrap each test in a transaction and roll it back;
- code commits during the test: clean owned tables with `TRUNCATE … CASCADE`
  afterward;
- DDL or full isolation needed: clone a prepared test database.

## Attribution

Adapted from
`stash/development/development-skills/skills/create-test/references/integration-patterns.md`.
