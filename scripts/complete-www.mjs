/**
 * Finish what `flet-box createBundle www` left behind.
 *
 * The published CLI (1.0.6) copies only src/assets into www/, but this app's
 * photos live at the project root: a CI build that installs flet-box from npm
 * therefore deploys a site whose images all 404. Delete this script once
 * createBundle ships the asset copy the framework checkout already does.
 *
 * Only files the app actually names are published, so an unused master sitting
 * in assets/ cannot add weight to a connection that cannot carry it.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const www = path.join(root, 'www');
const ASSET_DIRS = ['assets', 'public'];
const CODE_EXT = /\.(js|css|html|json)$/i;

if (!fs.existsSync(www)) {
  console.error('complete-www: there is no www/ — run "npm run build" first.');
  process.exit(1);
}

const listFiles = (dir) => {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(p));
    else out.push(p);
  }
  return out;
};

/** Every assets/... or public/... path the app's own source mentions. */
const mentioned = (() => {
  const sources = [path.join(root, 'index.html')];
  if (fs.existsSync(path.join(root, 'src'))) sources.push(...listFiles(path.join(root, 'src')));
  const text = sources
    .filter((f) => CODE_EXT.test(f) && fs.existsSync(f))
    .map((f) => fs.readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\/|^\s*\/\/.*$/gm, ''))
    .join('\n');
  return new Set(
    (text.match(/(?:assets|public)\/[A-Za-z0-9._/-]*/g) || []).map((m) => m.replace(/\/$/, '')),
  );
})();

const isNamed = (rel) => {
  const base = path.basename(rel);
  return [...mentioned].some((ref) => {
    if (ref === rel || rel.startsWith(ref + '/')) return true;
    return ref.endsWith('/' + base) || (path.extname(ref) === path.extname(rel) && path.basename(ref) === base);
  });
};

let copied = 0;
let bytes = 0;

for (const dir of ASSET_DIRS) {
  const base = path.join(root, dir);
  if (!fs.existsSync(base)) continue;
  for (const file of listFiles(base)) {
    const rel = path.relative(root, file).split(path.sep).join('/');
    const dest = path.join(www, rel);
    if (fs.existsSync(dest) || !isNamed(rel)) continue;
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(file, dest);
    copied += 1;
    bytes += fs.statSync(file).size;
  }
}

const configPath = path.join(www, 'config.json');
if (copied && fs.existsSync(configPath)) {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  if (Array.isArray(config.assets)) {
    const known = new Set(config.assets.map((a) => a.path));
    for (const dir of ASSET_DIRS) {
      const base = path.join(root, dir);
      if (!fs.existsSync(base)) continue;
      for (const file of listFiles(base)) {
        const rel = path.relative(root, file).split(path.sep).join('/');
        if (known.has(rel) || !fs.existsSync(path.join(www, rel)) || !isNamed(rel)) continue;
        config.assets.push({ path: rel, size: fs.statSync(file).size, hash: createHash('sha256').update(fs.readFileSync(file)).digest('hex') });
      }
    }
    config.assets.sort((a, b) => a.path.localeCompare(b.path));
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
  }
}

console.log(`complete-www: published ${copied} asset file(s), ${(bytes / 1024).toFixed(0)} KB, into www/.`);
