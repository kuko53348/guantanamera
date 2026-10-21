# Framework gotchas

- **Container's default background follows the theme.** Nested Containers with no `bgColor` paint the framework `surface`; under an OS dark theme that is slate, not the cream page. Every wrapper in this app sets `bgColor` explicitly, including `'transparent'`.
  **Why:** the menu tab pane rendered dark until the custom tabs and wrappers were painted.
  **How to apply:** any new Container inside a section must declare `bgColor`.
- **Pin the theme before `runApp`.** `app.js` writes `fletbox-theme=light` to localStorage, and `index.html` declares `color-scheme: light`.
  **Why:** the brand palette is light-only and framework defaults would otherwise follow the OS.
- **`stackPosition()` has no consumer in flet-box@1.0.6.** Overlays use `position: 'absolute'` plus `top`/`left`/`right`/`bottom` props.
- **The checker misreads a shorthand array element as a prop.** `children: [row, panelHost]` was reported as `Column({ panelHost })`; wrapping the element in a Container with `child:` clears it.
  **How to apply:** if `UNKNOWN_PROP` names a local variable that is only a child, wrap it or make the expression explicit; do not remove a real widget.
