# Novamira Adapter

Novamira is an access adapter, not proof that a task is safe or complete.

## Before use

1. Read `<Client> Stack.md` and confirm Novamira for the exact environment.
2. Use the repository's documented on-demand registration procedure.
3. Confirm the server/profile name maps to the intended site.
4. Inspect available tools and their read/write/destructive semantics.
5. Resolve credentials at runtime through the approved secret mechanism; never copy them into prompts, logs, vault notes, or config.

Do not use a standing Work-vault-level client registration. Client access should be scoped to the relevant site repository/session.

## Operation discipline

- Run a read-only identity query first.
- Prefer WordPress APIs and WP-CLI over arbitrary PHP/SQL.
- Use arbitrary PHP/SQL only when the supported surface cannot perform the bounded task and the risk is understood.
- Capture exact object IDs and before-values.
- Do not trust a tool's success response without read-back and rendered verification.
- Never expose raw credentials or full sensitive payloads in the operation report.

## After use

1. Read back changed state through an independent query.
2. Verify rendered output or operational effect outside the mutation response.
3. Report server/profile, environment, object IDs, and checks without credentials.
4. Remove or unregister temporary access when the repository procedure requires it.

If Novamira is absent or unreachable, choose another documented adapter or report a blocker. Do not silently redirect a staging task to production or vice versa.
