// scripts/lib/app-references.mjs
// The one question both asset scripts ask: does the app actually name this file?
//
// Scanned: src/, index.html, scripts/, README.md, AGENTS.md, package.json,
// fletbox.config.json. `www/` is excluded on purpose — it is generated output,
// so a name that only appears there is a stale bundle, not a consumer.
//
// Comments are stripped before matching: `mojito.jpg is the frappé` in a note is
// not a consumer, and keeping the real file alive because of it defeats the point.
import { existsSync, readFileSync, statSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const SCAN_ROOTS = ['src', 'index.html', 'scripts', 'README.md', 'AGENTS.md', 'package.json', 'fletbox.config.json'];

const collect = (target, into) => {
    if (!existsSync(target)) return;
    const stack = [target];
    while (stack.length) {
        const p = stack.pop();
        if (statSync(p).isDirectory()) {
            for (const f of readdirSync(p)) stack.push(join(p, f));
        } else if (/\.(js|html|json|md|mjs|css)$/i.test(p)) {
            into.push(readFileSync(p, 'utf8'));
        }
    }
};

let cache = null;

export const referenceText = () => {
    if (cache) return cache;
    const corpus = [];
    for (const root of SCAN_ROOTS) collect(root, corpus);
    cache = corpus
        .join('\n')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .split('\n')
        .filter((l) => !/^\s*(\/\/|\*|#)/.test(l))
        .join('\n');
    return cache;
};

// A path relative to the project root, e.g. `assets/landing/door.webp`. The
// basename also counts: code built from scripts/ can hold a name the app loads.
export const isReferenced = (rel) => {
    const text = referenceText();
    return text.includes(rel) || text.includes(rel.split('/').pop());
};
