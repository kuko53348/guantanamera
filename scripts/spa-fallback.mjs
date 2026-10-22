#!/usr/bin/env node
// scripts/spa-fallback.mjs — TEMPORARY BRIDGE, delete it when the app's flet-box
// dependency is 1.0.8 or newer.
//
// `flet-box createBundle` now writes 404.html itself (bin/utils/pwaShell.js), but
// the version this project installs from npm predates that, and GitHub Pages has
// no SPA rewrite: without the file, a reload of /guantanamera/menu is answered by
// Pages' own "Page not found" instead of the app. npm runs this as `postbuild`,
// so the deploy pipeline gets the fallback with no workflow change.
import { copyFileSync, existsSync, readFileSync } from "node:fs";
import path from "node:path";

const target = process.argv[2] || "www";
const index = path.join(target, "index.html");

if (!existsSync(index)) {
  console.log(`spa-fallback: no ${index} to copy — skipped`);
  process.exit(0);
}

// The shell must be finished before it is duplicated: the bundle wires
// ./loader.js into index.html and stamps absolute share tags, so a fallback
// copied from the project's own index.html would boot the wrong thing.
const html = readFileSync(index, "utf8");
if (!html.includes("./loader.js")) {
  console.error("spa-fallback: index.html is not the built shell (no ./loader.js entry) — refusing to copy it");
  process.exit(1);
}

copyFileSync(index, path.join(target, "404.html"));
console.log(`spa-fallback: ${target}/404.html written (${html.length} bytes)`);
