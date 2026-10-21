// scripts/optimize-landing-images.mjs
// Writes a budget-sized .webp for every landing photo the site loads.
//
// Sources are JPG, JPEG or PNG — whichever exists. A PNG is a first-class input
// now: photos handed over as flat PNGs (the 20 MB-per-file kind this project
// grew by accident) go through the same search as a JPG, alpha and all, and the
// source is left untouched as the master.
//
// Two levers, in the order that costs image quality least:
//   1. Down-scale to 2x the width the layout actually paints. Nothing on this
//      site renders wider than 528 CSS px, so a 2000px photo is 14x the pixels
//      nobody can ever see.
//   2. Only then search downwards for the WebP quality that fits the budget.
//
// The budget is per image because one bad-connection page load pays for every
// file on screen at once: /menu paints 58 of these 66 images.
//
// Caps come from `npm run measure-images` (headless Chrome, real layout), not
// from guesswork. Re-measure if the layout widths change.
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, renameSync, rmSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';
import { isReferenced } from './lib/app-references.mjs';

const positional = process.argv.slice(2).filter((a) => a !== '--all');
const DIR = positional[0] || 'assets/landing';
const ALL = process.argv.includes('--all');
const BUDGET_KB = 40;
// Quality never goes below QUALITY_FLOOR to buy bytes: once an image would have
// to be squeezed that far, the honest move is fewer pixels instead. A soft
// 540px photo at q70 beats a blocky 540px photo at q44.
const QUALITY_FLOOR = 62;
const QUALITIES = [80, 76, 72, 68, 64, QUALITY_FLOOR];
const WIDTH_SCALES = [1, 0.9, 0.8, 0.7, 0.62];

const SRC_EXTS = ['.jpg', '.jpeg', '.png'];

// 2x the measured CSS width, per file. `default` covers anything unlisted.
const CAPS = {
    'og-cover': 1200, // social preview: rendered by the sharing platforms, not here
    dining: 1060,
    'terrace-tables': 1060,
    door: 880,
    lechon: 740,
    paella: 740,
    lobster: 740,
    shrimp: 740,
    fish: 740,
    tostones: 740,
    default: 540,
};

const capOf = (name) => {
    if (CAPS[name]) return CAPS[name];
    if (name.startsWith('bottle-')) return 360;
    if (/(pina-colada|mojito|daiquiri|sangria)/.test(name)) return 520;
    return CAPS.default;
};

const dimsOf = (file) => {
    const out = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', file], {
        encoding: 'utf8',
    });
    return {
        w: Number(out.match(/pixelWidth:\s*(\d+)/)?.[1]),
        h: Number(out.match(/pixelHeight:\s*(\d+)/)?.[1]),
    };
};

const findSource = (name) => {
    for (const ext of SRC_EXTS) {
        const p = join(DIR, name + ext);
        if (existsSync(p)) return p;
    }
    return null;
};

// A folder of fresh PNG/JPG masters has no .webp yet, so the work list is the
// union of both: every source file, plus every existing WebP whose master this
// project already pruned.
const all = [
    ...new Set([
        ...readdirSync(DIR)
            .filter((f) => SRC_EXTS.some((e) => f.toLowerCase().endsWith(e)))
            .map((f) => basename(f, f.slice(f.lastIndexOf('.')))),
        ...readdirSync(DIR)
            .filter((f) => f.endsWith('.webp'))
            .map((f) => basename(f, '.webp')),
    ]),
];

// Only the WebP the app names. Without this the engine invents files: it turned
// the declared `favicon.png` into a `favicon.webp` nobody loads, and the same
// for `og-cover.jpg`, which social scrapers fetch as a JPG on purpose.
// `--all` opts out, for a scratch folder of new masters with no references yet.
const skipped = ALL ? [] : all.filter((n) => !isReferenced(`${DIR}/${n}.webp`));
const targets = ALL ? all : all.filter((n) => isReferenced(`${DIR}/${n}.webp`));

const rows = [];
let before = 0;
let after = 0;

for (const name of targets) {
    const dst = join(DIR, `${name}.webp`);
    const hasWebP = existsSync(dst);
    const src = findSource(name) || dst;
    const { w, h } = dimsOf(src);
    const currentKB = hasWebP ? statSync(dst).size / 1024 : Infinity;

    if (src === dst && currentKB <= BUDGET_KB) {
        before += currentKB;
        after += currentKB;
        rows.push({ name, srcKB: currentKB, kb: currentKB, px: `${w}x${h}`, quality: '-', over: '', kept: 'kept' });
        continue;
    }

    const fullWidth = Math.min(w, capOf(name));
    const srcKB = statSync(src).size / 1024;
    const tmp = dst + '.tmp.webp';

    let bytes = 0;
    let quality = QUALITIES[QUALITIES.length - 1];
    let width = fullWidth;
    // Widest frame that still fits the budget at an acceptable quality. The
    // last scale is taken even if it busts the budget, rather than shipping a
    // quality the eye can see.
    for (const scale of WIDTH_SCALES) {
        width = Math.max(1, Math.round(fullWidth * scale));
        let best = null;
        for (const q of QUALITIES) {
            execFileSync(
                'cwebp',
                ['-quiet', '-resize', width, 0, '-q', q, '-m', '6', src, '-o', tmp],
                { stdio: 'ignore' },
            );
            bytes = statSync(tmp).size;
            quality = q;
            if (bytes / 1024 <= BUDGET_KB) {
                best = { width, quality: q, bytes };
                break;
            }
        }
        if (best) {
            width = best.width;
            quality = best.quality;
            bytes = best.bytes;
            break;
        }
    }

    // A re-encode of an orphaned WebP only replaces it if it is actually
    // smaller; never trade bytes for a visible extra generation loss.
    if (src === dst && bytes > statSync(dst).size) {        rmSync(tmp, { force: true });
        bytes = statSync(dst).size;
        width = w;
        quality = '-';
    } else {
        renameSync(tmp, dst);
    }

    const kb = bytes / 1024;
    before += srcKB;
    after += kb;
    rows.push({
        name,
        srcKB,
        kb,
        px: `${width}x${Math.round((width / w) * h)}`,
        quality,
        over: kb > BUDGET_KB ? 'OVER BUDGET' : '',
        kept: '',
    });
}

rows.sort((a, b) => b.kb - a.kb);
for (const r of rows) {
    console.log(
        `${r.name.padEnd(24)} ${(r.srcKB.toFixed(0) + 'KB').padStart(8)} -> ${r.kb.toFixed(1).padStart(7)}KB  ${r.px.padStart(10)}  q${r.quality}  ${r.over}${r.kept}`,
    );
}
const worst = rows.filter((r) => r.over).length;
if (!rows.length) {
    console.log(`\nno referenced image to build in ${DIR} — ${skipped.length} unreferenced skipped (use --all to force)`);
    process.exit(0);
}
console.log(
    `\n${rows.length} images: ${(before / 1024).toFixed(1)} MB -> ${(after / 1024).toFixed(1)} MB (${((after / before) * 100).toFixed(0)}%)  ·  largest ${rows[0].kb.toFixed(1)}KB  ·  ${worst} over the ${BUDGET_KB}KB budget  ·  ${skipped.length} unreferenced skipped`,
);
if (DIR === 'assets/landing' && !existsSync(join(DIR, 'door.webp'))) {
    console.error('expected door.webp to exist — conversion failed');
    process.exit(1);
}
