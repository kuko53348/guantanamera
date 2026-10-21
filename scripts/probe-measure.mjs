// Throwaway measurement probe for one selector-ish region. Pass a search string.
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PAGE_URL = process.env.PROBE_URL ?? 'http://127.0.0.1:8010/';
const PORT = Number(process.env.PROBE_PORT ?? 9334);
const W = Number(process.env.PROBE_W ?? 1440);
const H = Number(process.env.PROBE_H ?? 900);
const needle = process.argv[2] ?? '';

const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, '--no-first-run',
  '--disable-gpu', '--hide-scrollbars',
  `--user-data-dir=/tmp/probe-profile-${PORT}`, 'about:blank',
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
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: W < 700 });
await send('Page.navigate', { url: PAGE_URL });
await sleep(3500);

const out = await send('Runtime.evaluate', {
  returnByValue: true,
  expression: `(() => {
    const needle = ${JSON.stringify(needle)}.toLowerCase();
    const hits = [];
    for (const e of document.querySelectorAll('*')) {
      const t = (e.innerText || '').slice(0, 120).toLowerCase();
      if (!needle || !t.includes(needle)) continue;
      const s = getComputedStyle(e);
      const r = e.getBoundingClientRect();
      hits.push({
        tag: e.tagName,
        cls: String(e.className).slice(0, 30),
        kids: e.children.length,
        rect: [Math.round(r.width), Math.round(r.height)],
        scroll: [e.scrollWidth, e.scrollHeight],
        client: [e.clientWidth, e.clientHeight],
        overflow: s.overflow, overflowY: s.overflowY,
        pad: [s.paddingTop, s.paddingBottom],
        align: s.alignItems, wrap: s.flexWrap, height: s.height,
        text: (e.innerText || '').slice(0, 40).replace(/\\n/g, '|'),
      });
      if (hits.length > 14) break;
    }
    return hits;
  })()`,
});
console.log(JSON.stringify(out.result?.value ?? out, null, 2));
chrome.kill(); process.exit(0);
