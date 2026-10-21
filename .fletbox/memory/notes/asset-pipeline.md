# Asset pipeline — the .webp are the masters now

- `assets/` holds only what the site loads: 68 files, 2.7 MB. `npm run assets:prune` is a dry run, `npm run assets:clean` deletes; both decide by literal filename in `src/`, `index.html`, `scripts/`, README, package.json and fletbox.config.json (`www/` is excluded — generated output is not a consumer).
- The JPG/PNG masters were deleted on 2026-10-21, so a re-encode starts from the WebP. `npm run images` only touches a WebP that busts the 40 KB budget; everything else is reported `kept`, which is what stops generation loss.
- Three files stay in their own format on purpose: `assets/logo.png` (≥512px PNG master for `npm run android:icons` / `ios:icons`), `assets/landing/og-cover.jpg` (social scrapers do not fetch WebP), `assets/landing/favicon.png` (declared favicon).
  **Why:** the user's constraint is a bad connection in Cuba — one photo over ~120 KB is a failed page load.
  **How to apply:** add a photo as a JPG/PNG in `assets/landing`, reference the `.webp` in code, run `npm run images`; never hand-compress and never re-add a file to `assets/` that no screen imports.
