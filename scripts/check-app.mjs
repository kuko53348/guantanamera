// scripts/check-app.mjs
// Anti-hallucination gate for guantanamera: every widget, prop and import in src/
// is checked against the flet-box package that is actually installed.
//
//   npm run check                    scan src/
//   npm run check -- --props Button  print the real props of a widget
//   npm run check -- --list          list every public export
//   npm run check -- --json          machine-readable findings
//
// The package exports map only publishes "." and "./package.json", so the
// checker's own file is imported by URL rather than by specifier.

import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);

function resolvePackage() {
  const candidates = [path.resolve(process.cwd(), 'node_modules/flet-box')];
  try {
    candidates.push(path.dirname(require.resolve('flet-box/package.json')));
  } catch {
    /* not installed yet */
  }
  for (const dir of candidates) {
    if (require('fs').existsSync(path.join(dir, 'bin/commands/checkApi.js'))) {
      return dir;
    }
  }
  console.error('flet-box package not found. Run: npm install');
  process.exit(1);
}

const pkgDir = resolvePackage();
const checker = path.join(pkgDir, 'bin', 'commands', 'checkApi.js');
const { checkApi } = await import(pathToFileURL(checker).href);

const { exitCode } = await checkApi(process.argv.slice(2));
process.exit(exitCode);
