# AGENTS.md

**App:** `guantanamera` · **Template:** `basic` · **flet-box@1.0.6**
FletBox is a vanilla-JS UI framework: ESM only, zero runtime dependencies,
fully offline. There is no build step to learn and no compiler to blame.

This file is the contract. Read it before writing any code in this project.
You do **not** need to read the whole framework to work here — sections 1 to 3
tell you where the authoritative answers live, the design system in section 4
fixes every size and color you may use, and the checker in section 5
proves you right or wrong in seconds.

## 1. The API is a fact, not a guess

Never invent a widget, prop, hook or helper. Look it up:

| I want to know… | Look here |
| --- | --- |
| Which widgets exist and which props each accepts | `.fletbox/api/cheatsheet.md` (generated, covers every widget) |
| Everything for one widget | `npm run check -- --props <Widget>` |
| Whether a prop actually reaches the DOM, or is typed but dead | `flet-box unpack <Widget>` |
| A call that is safe to paste | `flet-box unpack <Widget> --example` |
| Prose, types and a worked example | `node_modules/flet-box/docs/widget/<Widget>.md` |
| Every public export of the package | `npm run check -- --list` |
| The whole surface as data, to build calls from | `.fletbox/api/api.json` |

**If a name is not in those files, it does not exist.** A prop that silently
does nothing is worse than a compile error: it renders as a broken layout and
nobody finds it for weeks.

- Do not edit `node_modules/flet-box`. It is a dependency, not source.
- The cheatsheet is generated output. Regenerate it with
  `flet-box check-api --emit-api` after upgrading the package; never hand-edit it.
- `.fletbox/api/api.json` and `api.md` are generated the same way:
  `npm run api`. They carry one entry per prop with its engine target, default,
  aliases and a `sample` value, so a call can be written from data instead of
  memory.

## 2. FletBox syntax only — no other framework

A widget is a **function call that returns an HTMLElement**. That is the whole
model. Do not mix in syntax from another ecosystem:

```js
// Correct
Text({ text: 'Hello', size: 18, color: colors.primary })
Button({ text: 'Save', onPress: save, bgColor: colors.primary })
Box({ child: Text({ text: count }), padding: 12 })
```

```js
// Wrong — never write any of these
<Text>Hello</Text>                      // JSX
h('div', ...)                            // hyperscript
Text("Hello")                            // positional args
Text('Hello', size: 18)                  // Dart / Flutter named args
new Text(...)                            // classes
t('div')                                 // Vue template
```

- No `react`, `vue`, `svelte`, `@angular/core`, `solid-js`, `lit`, `jquery`,
  `tailwindcss` or `bootstrap` imports. This app is offline: nothing installs
  at runtime and nothing fetches a CDN.
- No `.jsx`, `.tsx`, `.vue` or `.svelte` files. Plain `.js`, ESM imports with a
  explicit `.js` extension.
- Styling is props (`bgColor`, `radius`, `padding`), not class strings or
  `styled-components`.
- `child` takes one widget; `children` takes an array or string. Swapping them
  is the most common silent bug.
- Prop aliases (`bgColor` ≡ `backgroundColor`, `onPress` ≡ `onClick`) are
  intentional. Pick one per file and stay consistent; do not "dedupe" them.

## 3. Architecture the framework expects

```
app.js                      -> runApp(App, 'root')
screens/                    -> one exported widget per route
components/                 -> reusable, stateless unless they own state
components/layouts/         -> appBar, drawer, sidebar, bottomBar
```

The app root is `Scaffold`, which owns navigation and chrome. Use it:

```js
Scaffold({
  routes,
  appBar: AppBarComponent({ title: 'FletBox', isMobile }),
  drawer: isMobile ? DrawerMenu() : null,
  bottomBar: isMobile ? BottomNav() : null,
  leftNavBar: !isMobile ? Sidebar() : null,   // NOT `sidebar:`
  leftNavBarWidth: 240,
  fab: isMobile ? ActionButton({ icon: 'add', onPress: open }) : null,
  body: isMobile ? null : HomeScreen(),
})
```

Real `Scaffold` props: `appBar body bottomBar fab drawer leftNavBar
leftNavBarWidth rightNavBar rightNavBarWidth routes basePath backgroundColor
closeDrawerOnNavigate`. (`--props Scaffold` is authoritative.)
For a responsive app, branch in JS on the keyed viewport state — `useState`
seeded from `dimensions.getWidth()` plus one `dimensions.addListener()` at
module scope — not on CSS alone. See `src/app.js` in this project.

Custom widgets follow the same shape every framework widget uses
(`QRCode.js` is the reference):

```js
export const MyWidget = (props = {}) => {
  const widget = WidgetFactory("div", { ...props, widgetName: "MyWidget" });
  // children, then composeUpdate(widget, ...), then return
};
```

- Use `composeUpdate()`; never overwrite `container.update`.
- Register resources (listeners, timers, RAF, observers) and release them in an
  idempotent `onUnmount` disposer. Never monkey-patch `_cleanup`.
- State is key-based: `useState("key", 0)` plus subscribers. There is no
  component re-render tree to reason about.
- Reuse the framework utilities (`colors`, `margin`, `padding`, `gradient
  shadow`, `rgba`, `stackPosition`) instead of hand-writing CSS.

One rendering engine exists: `src/widget-factory/`. Never add a second one, and
never style by reaching around the factory. **If you believe the engine is
broken, prove it with a minimal repro and record the finding in memory** — do
not work around it silently.

## 4. Design system — one scale, three colors

A screen is designed, not decorated. Every size and every color on this app
comes from the two lists below. A value outside them is a bug you have to
justify, and `padding: 13` or `#4f46e5` written by hand is the usual sign a
screen drifted away from the rest.

**Color: three roles, no more.**

| Role | Token | Where it may appear |
| --- | --- | --- |
| Brand | `colors.primary` | the one action the screen asks for: primary button, active tab, focus ring, links |
| Emphasis | `colors.secondary` | a deliberate second voice: gradients, badges, a highlighted stat |
| Feedback | `colors.success` / `colors.warning` / `colors.danger` | status only — never as decoration |

Everything else is neutral: `colors.background`, `colors.surface`,
`colors.card`, `colors.text`, `colors.textSecondary`, `colors.textDisabled`,
`colors.border`, `colors.divider`, plus the `gray50`…`gray900` ramp. Rules:

- A screen uses **one** brand color. Two accent colors competing on one view
  means one of them is wrong.
- Never type a hex or `rgb()` literal. If a token is missing, add it to a
  `theme.js` in this app that re-exports `colors` — do not scatter the value.
- Text on a dark fill is white; hierarchy comes from opacity
  (`rgba(255,255,255,.72)`), not from a second color.
- `error` ≡ `danger` and `*Bg` variants exist for alert fills; use the pair
  (`colors.danger` + `colors.errorBg`), not a hand-mixed tint.

**Space and type: an 8-based scale.** Use these numbers and nothing between
them. They are plain props (`padding`, `gap`, `margin`, `width`, `height`,
`size`, `radius`) — the factory takes the number, no unit and no `px` string.

```
spacing   4  ·  hairline, icon inset
          8  ·  tight gaps, chip padding
         12  ·  control padding (input/button height − text)
         16  ·  default card padding, section gap, screen gutter
         18  ·  card-to-card rhythm on a dense grid
         24  ·  between sections
         32  ·  between page blocks
         48  ·  hero spacing
radius     4 / 8 / 12 / 16 / 999 (pill)
type      12 caption · 14 body-small · 16 body · 18 subtitle · 24 title · 32 headline
weight    400 body · 500 label · 600 title · 700 headline
line-height  1.5 body · 1.2 heading
```

- Padding inside a card is `16`; the gap between cards is `16` or `24`. Never
  mix the two on the same list.
- One text size per element, one weight per role. If a label and its value are
  the same size, the hierarchy is carried by color, not by a fourth size.
- Tap targets are at least `40` on a side; get there with `height`, not padding.
- `useState` bindings, `flex` and `gap` do the layout. Reach for an absolute
  offset only for overlays, and use `stackPosition` rather than raw coordinates.

## 5. Verification loop (required)

After every edit, before you say a task is done:

```bash
npm run check          # static gate: invented widgets/props, positional args,
                       # foreign imports, and broken imports between your own
                       # modules (a name a file never exports)
npm run dev            # serve on :8000 — check the UI actually renders
```

`npm run check` exits non-zero on a real error. Fix the code, not the checker.
It reads the installed package, so it is always in sync with what runs. A
warning is allowed to stay only when you can justify it in one sentence.

When the error is a mistyped name, `npm run fix` rewrites it for you — a
relative path that does not resolve, a name the target module never exports,
an identifier used without its `import`, and a prop key the API does not know
(`chilldren` → `children`, `bgColr` → `bgColor`). It only rewrites when exactly
one real name is close enough; anything ambiguous is printed untouched for you
to decide. Run `npm run check` again after it, and read the diff.

## 6. Memory — do not relearn the same thing

At the start of every session read `.fletbox/memory/MEMORY.md` and any entry it
points at. That is how this agent remembers the framework between chats instead
of rediscovering it each time.

- When you learn something non-obvious about this app or the framework, write
  `.fletbox/memory/<kebab-case-topic>.md` with: what (fact or rule), **Why:**
  (the incident or constraint behind it), **How to apply:** (when it kicks in),
  and an absolute date for anything time-bound.
- Add a one-line pointer to it in `MEMORY.md`. Keep the index short.
- One entry per topic, under 10 lines. Update or delete an entry that turns out
  to be wrong rather than appending a correction beside it.
- Commit memory files with the code change they describe.

## 7. Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | static dev server on port 8000 |
| `npm run check` | anti-hallucination gate over `src/` |
| `npm run fix` | rewrite mistyped imports and prop names it can prove |
| `npm run check -- --props Button` | print the real props of a widget |
| `flet-box unpack Button` | everything Button accepts **and that actually works** |
| `flet-box unpack Button --example` | a paste-ready call using only live props |
| `flet-box unpack Button --diff` | doc vs code gaps: dead, invented, undocumented |
| `npm run api` | rebuild `.fletbox/api/api.json` + `api.md` for the whole surface |
| `npm run build` | esbuild bundle into `dist/` |
| `flet-box build android` / `ios` | Capacitor native build |
| `flet-box run-native android` | compile and launch on device/emulator |

Generated by `flet-box create`. To refresh the guide and cheatsheet after a
framework upgrade: `flet-box check-api --emit-api`.
