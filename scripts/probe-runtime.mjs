// Throwaway runtime probe: drives headless Chrome over raw CDP (Node 24 WebSocket).
// Captures console errors, failed requests, and screenshots at each breakpoint.
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PAGE_URL = process.env.PROBE_URL ?? 'http://127.0.0.1:8010/';
const OUT = new URL('../.fletbox/shots/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const PORT = 9333;
const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`,
  '--no-first-run', '--no-default-browser-check',
  '--disable-gpu', '--hide-scrollbars',
  '--user-data-dir=/tmp/guantanamera-probe-profile',
  'about:blank',
], { stdio: 'ignore' });

const json = async (p) => (await fetch(`http://127.0.0.1:${PORT}${p}`)).json();

let targets;
for (let i = 0; i < 40; i++) {
  try { targets = await json('/json/list'); if (targets.length) break; } catch {}
  await sleep(250);
}
if (!targets?.length) { console.error('chrome did not come up'); process.exit(1); }

const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let id = 0;
const pending = new Map();
const events = [];
ws.onmessage = (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  else if (msg.method) events.push(msg);
};
const send = (method, params = {}) => new Promise((res) => {
  const n = ++id;
  pending.set(n, (msg) => res(msg.result ?? { __error: msg.error }));
  ws.send(JSON.stringify({ id: n, method, params }));
});

const logs = [];
await send('Runtime.enable');
await send('Page.enable');
await send('Network.enable');
const messages = [];
const failed = [];
ws.addEventListener('message', (e) => {
  const msg = JSON.parse(e.data);
  if (msg.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(msg.params.type)) {
    messages.push(`${msg.params.type}: ${msg.params.args.map(a => a.value ?? a.description ?? a.type).join(' ')}`);
  }
  if (msg.method === 'Runtime.exceptionThrown') {
    messages.push(`exception: ${msg.params.exceptionDetails.exception?.description ?? msg.params.exceptionDetails.text}`);
  }
  if (msg.method === 'Network.loadingFailed') {
    failed.push(`${msg.params.errorText} ${msg.params.type}`);
  }
  if (msg.method === 'Network.responseReceived' && msg.params.response.status >= 400) {
    failed.push(`HTTP ${msg.params.response.status} ${msg.params.response.url.replace(PAGE_URL, '')}`);
  }
});

const size = process.argv[2] === 'mobile' ? [412, 892] : [1440, 900];
await send('Emulation.setDeviceMetricsOverride', {
  width: size[0], height: size[1], deviceScaleFactor: 1, mobile: size[0] < 700,
});
await send('Page.navigate', { url: PAGE_URL });
await sleep(3500);

const evalJs = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  return r?.result?.value;
};

const info = await evalJs(`(() => {
  const scroller = [...document.querySelectorAll('*')]
    .filter(e => e.scrollHeight > e.clientHeight + 200 && /auto|scroll/.test(getComputedStyle(e).overflowY))
    .sort((a,b) => b.scrollHeight - a.scrollHeight)[0];
  window.__probeScroller = scroller;
  const broken = [...document.images]
    .filter(i => !i.complete || i.naturalWidth === 0)
    .map(i => i.currentSrc || i.src);
  const clipped = [...document.querySelectorAll('*')].filter(e => {
    const s = getComputedStyle(e);
    return s.overflow === 'hidden' && e.scrollHeight - e.clientHeight > 4 && e.clientHeight > 0
      && e.children.length && [...e.children].some(c => c.offsetHeight > 0);
  }).slice(0, 20).map(e => ({
    tag: e.tagName, h: e.clientHeight, sh: e.scrollHeight,
    txt: (e.innerText || '').slice(0, 40).replace(/\\n/g, ' | '),
  }));
  const overflowX = [...document.querySelectorAll('*')].filter(e => e.scrollWidth > e.clientWidth + 4
      && getComputedStyle(e).overflowX !== 'auto' && getComputedStyle(e).overflowX !== 'scroll')
    .slice(0, 20).map(e => ({ tag: e.tagName, cls: String(e.className).slice(0,40), w: e.clientWidth, sw: e.scrollWidth }));
  return {
    innerWidth, innerHeight,
    hasScroller: !!scroller,
    scrollerSH: scroller?.scrollHeight, scrollerCH: scroller?.clientHeight,
    broken, clipped, overflowX,
    docOverflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    bodySH: document.body.scrollHeight,
  };
})()`);

console.log(JSON.stringify({ size, info, messages: [...new Set(messages)], failed: [...new Set(failed)] }, null, 2));

const total = info?.scrollerSH ?? 0;
const vh = info?.scrollerCH ?? size[1];
const steps = Math.ceil(total / vh);
for (let i = 0; i < steps; i++) {
  await evalJs(`(() => { const s = window.__probeScroller; if (s) s.scrollTop = ${i * vh}; window.scrollTo(0, ${i * vh}); return 1 })()`);
  await sleep(700);
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  if (shot?.data) writeFileSync(`${OUT}${size[0]}-${String(i).padStart(2, '0')}.png`, Buffer.from(shot.data, 'base64'));
}
console.log('shots written to ' + OUT);
chrome.kill();
process.exit(0);
