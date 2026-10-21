// Throwaway probe: report every flex row that holds >=2 children and whether its
// children (and their single card child) are the same height.
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PAGE_URL = process.env.PROBE_URL ?? 'http://127.0.0.1:8010/';
const PORT = Number(process.env.PROBE_PORT ?? 9361);
const W = Number(process.env.PROBE_W ?? 1440);
const H = Number(process.env.PROBE_H ?? 900);

const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, '--no-first-run',
  '--disable-gpu', '--hide-scrollbars',
  `--user-data-dir=/tmp/probe-cards-${PORT}`, 'about:blank',
], { stdio: 'ignore' });

let targets = [];
for (let i = 0; i < 40; i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); if (targets.length) break; } catch {}
  await sleep(250);
}
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pending = new Map();
ws.onmessage = (m) => { const msg = JSON.parse(m.data); if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); } };
const send = (method, params = {}) => new Promise((res) => { const n = ++id; pending.set(n, (msg) => res(msg.result ?? { __error: msg.error })); ws.send(JSON.stringify({ id: n, method, params })); });

await send('Runtime.enable'); await send('Page.enable');
await send('Network.enable');
await send('Network.setCacheDisabled', { cacheDisabled: true });
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: W < 700 });
await send('Page.navigate', { url: PAGE_URL });
await sleep(5000);

const out = await send('Runtime.evaluate', {
  returnByValue: true,
  expression: `(() => {
    const rows = [];
    for (const e of document.querySelectorAll('*')) {
      const s = getComputedStyle(e);
      if (s.display !== 'flex' || s.flexDirection !== 'row') continue;
      const kids = [...e.children].filter(c => c.offsetHeight > 0);
      if (kids.length < 2) continue;
      // Grid cells wrap exactly one card; anything else is a hand-built row
      // whose children are meant to differ.
      if (!kids.every((k) => k.children.length === 1)) continue;
      const hs = kids.map(k => k.offsetHeight);
      const inner = kids.map(k => k.firstElementChild.offsetHeight);
      const section = e.closest('[id]')?.id ?? '?';
      // A grid row is the only thing that must be even: cells stretch, and the
      // card inside each cell should stretch with it.
      const stretch = s.alignItems === 'stretch';
      const cellsUneven = new Set(hs).size > 1;
      const cardsUneven = new Set(inner).size > 1;
      if (!(cellsUneven || (stretch && cardsUneven))) continue;
      rows.push({
        section,
        cells: hs,
        cards: inner,
        align: s.alignItems,
        text: (e.innerText || '').slice(0, 46).replace(/\\n/g, ' | '),
      });
      if (rows.length > 25) break;
    }
    return rows;
  })()`,
});
console.log(JSON.stringify(out.result?.value ?? out, null, 2));
chrome.kill();
process.exit(0);
