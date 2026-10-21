// scripts/prune-assets.mjs
// Deletes every image under assets/ that the app never loads.
//
// The template ships a 1.5 GB photo library (dishes, drinks, clientes, …) that
// no screen on this site imports, and this project grew a second set of dead
// files when the landing photos were converted to WebP. Size is not the only
// cost: an unreferenced file is also copied into the release by any glob broad
// enough to catch it.
//
// "Referenced" means the literal filename appears in the app's own sources —
// src/, index.html, scripts/, README.md, package.json, fletbox.config.json.
// `www/` is excluded on purpose: it is generated output, so a name that only
// appears there is a stale bundle, not a consumer.
//
// Dry run by default. `--apply` is what deletes.
import { existsSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { isReferenced } from './lib/app-references.mjs';

const APPLY = process.argv.includes('--apply');
const ASSET_ROOT = 'assets';

// Files a scanner cannot see because their consumer builds the path at runtime.
//   logo.png is the master every launcher icon and splash screen is generated
//   from (scripts/sync-android-icons.mjs, scripts/sync-ios-assets.mjs), and it
//   must stay a >=512px PNG for those scripts.
const EXPLICIT_KEEP = new Set(['assets/logo.png']);

const images = [];
{
    const stack = [ASSET_ROOT];
    while (stack.length) {
        const p = stack.pop();
        const s = statSync(p);
        if (s.isDirectory()) {
            for (const f of readdirSync(p)) stack.push(join(p, f));
        } else if (/\.(png|jpe?g|webp|gif|svg|ico)$/i.test(p)) {
            images.push(p);
        }
    }
}

// Measured up front: after `--apply` the files are gone, and a size report that
// stats them afterwards throws ENOENT.
const bytes = new Map(images.map((f) => [f, statSync(f).size]));
const size = (f) => bytes.get(f);
const used = [];
const dead = [];
for (const file of images) {
    const rel = relative('.', file).split(/[\\/]/).join('/');
    if (EXPLICIT_KEEP.has(rel) || isReferenced(rel)) {
        used.push(file);
    } else {
        dead.push(file);
    }
}

const total = (list) => list.reduce((s, f) => s + size(f), 0);
console.log(`${images.length} images on disk: ${used.length} used (${(total(used) / 1048576).toFixed(1)} MB), ${dead.length} unreferenced (${(total(dead) / 1048576).toFixed(1)} MB)`);

const dirs = new Map();
for (const f of dead) {
    const d = f.split('/').slice(0, -1).join('/') || '.';
    const e = dirs.get(d) || { n: 0, bytes: 0 };
    e.n += 1;
    e.bytes += size(f);
    dirs.set(d, e);
}
for (const [d, e] of [...dirs].sort((a, b) => b[1].bytes - a[1].bytes)) {
    console.log(`  ${(e.bytes / 1048576).toFixed(1).padStart(7)} MB  ${String(e.n).padStart(4)}  ${d}`);
}

if (!APPLY) {
    console.log('\ndry run — nothing deleted. Re-run with --apply.');
    process.exit(0);
}

for (const f of dead) rmSync(f, { force: true });
// An asset directory left empty by the purge is dead weight in the repo and in
// every future glob; remove it too.
for (const d of dirs.keys()) {
    if (d !== '.' && existsSync(d) && readdirSync(d).length === 0) rmSync(d, { recursive: true, force: true });
}
console.log(`\ndeleted ${dead.length} files (${(total(dead) / 1048576).toFixed(1)} MB). Recoverable with: git checkout -- assets/`);
