# Hooks

Runtime-neutral hook specs and scripts live here.

## Files

- `events.json`: canonical runtime-neutral hook event map.
- `scripts/`: canonical hook implementations.

Generated runtime configs:

- `.claude/settings.json`
- `.codex/hooks.json`
- `.gemini/settings.json`

Regenerate with:

```bash
node .agents/adapters/generate-hooks.mjs
```

Validate with:

```bash
node .agents/scripts/verify-hooks.mjs
```
