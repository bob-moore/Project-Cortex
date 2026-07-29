# Triage

You receive recent vault changes, workflow state, standing goal results, and
queue items.

Output only findings:

```text
finding: <one line>
evidence: <file, command, goal, or ledger row>
status: actionable | informational
```

If nothing needs action, output exactly:

```text
status: quiet
```

Anything involving secrets, production, destructive changes, external mutation,
or violated standing goals is actionable.

