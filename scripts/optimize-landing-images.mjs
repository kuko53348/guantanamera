// scripts/optimize-landing-images.mjs
// Writes a .webp next to every .jpg in assets/landing. Never deletes or
// overwrites a source file: the JPG stays as the master and the fallback.
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
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';

const DIR = 'assets/landing';
const BUDGET_KB = 40;
// Quality never goes below QUALITY_FLOOR to buy bytes: once an image would have
// to be squeezed that far, the honest move is fewer pixels instead. A soft
// 540px photo at q70 beats a blocky 540px photo at q44.
const QUALITY_FLOOR = 62;
const QUALITIES = [80, 76, 72, 68, 64, QUALITY_FLOOR];
const WIDTH_SCALES = [1, 0.9, 0.8, 0.7, 0.62];

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

const files = readdirSync(DIR).filter((f) => /\.(jpg|jpeg)$/i.test(f));
const rows = [];
let before = 0;
let after = 0;

for (const file of files) {
    const src = join(DIR, file);
    const dst = join(DIR, file.replace(/\.(jpg|jpeg)$/i, '.webp'));
    const name = basename(file, '.jpg');
    const { w, h } = dimsOf(src);
    const fullWidth = Math.min(w, capOf(name));
    const srcKB = statSync(src).size / 1024;

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
                ['-quiet', '-resize', width, 0, '-q', q, '-m', '6', src, '-o', dst],
                { stdio: 'ignore' },
            );
            bytes = statSync(dst).size;
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
    });
}

rows.sort((a, b) => b.kb - a.kb);
for (const r of rows) {
    console.log(
        `${r.name.padEnd(24)} ${(r.srcKB.toFixed(0) + 'KB').padStart(8)} -> ${r.kb.toFixed(1).padStart(7)}KB  ${r.px.padStart(10)}  q${r.quality}  ${r.over}`,
    );
}
const worst = rows.filter((r) => r.over).length;
console.log(
    `\n${files.length} images: ${(before / 1024).toFixed(1)} MB -> ${(after / 1024).toFixed(1)} MB (${((after / before) * 100).toFixed(0)}%)  ·  largest ${rows[0].kb.toFixed(1)}KB  ·  ${worst} over the ${BUDGET_KB}KB budget`,
);
if (!existsSync(join(DIR, 'door.webp'))) {
    console.error('expected door.webp to exist — conversion failed');
    process.exit(1);
}
