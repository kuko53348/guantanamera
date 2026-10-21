# CLAUDE.md

The rules for this project live in [AGENTS.md](./AGENTS.md). Read it first and
follow it exactly — FletBox syntax only, real props only, `npm run check` after
every edit.

Two shortcuts replace guessing:

- `flet-box unpack <Widget>` prints every prop the widget really honors, with
  its type, default and engine target. `--example` gives a call you can paste,
  `--diff` lists the props that are documented but dead or used but undeclared.
  `.fletbox/api/api.json` is the same surface for all widgets, as data.
- Design is fixed, not improvised: one brand color per screen from the `colors`
  tokens (never a hex literal), and sizes only from the 8-based scale —
  4 · 8 · 12 · 16 · 18 · 24 · 32 · 48. AGENTS.md §4 has the full table.

Memory: read `.fletbox/memory/MEMORY.md` before working, and write new entries
there when you learn something the next session should not rediscover.
