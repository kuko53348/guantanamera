---
name: project-baseline
description: What this app is, which FletBox version it runs, and the commands that are known to work
metadata:
  type: project
---

App `guantanamera` created with `flet-box create` using the `basic` template,
against `flet-box@1.0.6`. Vanilla JS, ESM, no runtime dependencies, offline.

**Why:** the agent needs the version and shape of the project up front; API names
and templates shift between releases, and re-deriving them costs tokens every session.

**How to apply:** trust this for the project layout. For props and widget names,
trust `.fletbox/api/cheatsheet.md` and `npm run check`, not memory — that file is
regenerated from the installed package and this one is not.

Verified commands: `npm run dev` (:8000), `npm run check`, `npm run build`.
