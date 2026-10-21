// Throwaway CDP runner: loads a flet-box test harness and prints its global.
// usage: node scripts/probe-harness.mjs <path> <globalName> [filter]
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = process.env.PROBE_URL ?? 'http://127.0.0.1:8010/';
const PORT = Number(process.env.PROBE_PORT ?? 9340);
const [, , path, globalName, filter = ''] = process.argv;

const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, '--no-first-run', '--disable-gpu',
  `--user-data-dir=/tmp/harness-${PORT}`, 'about:blank',
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
const errors = [];
ws.addEventListener('message', (e) => {
  const msg = JSON.parse(e.data);
  if (msg.method === 'Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails.exception?.description ?? msg.params.exceptionDetails.text);
});

await send('Runtime.enable'); await send('Page.enable'); await send('Network.enable');
await send('Network.setCacheDisabled', { cacheDisabled: true });
await send('Page.navigate', { url: BASE + path });
await sleep(Number(process.env.PROBE_WAIT ?? 45000));

const out = await send('Runtime.evaluate', { returnByValue: true, expression: `JSON.stringify(window[${JSON.stringify(globalName)}] ?? null)` });
const data = JSON.parse(out.result?.value ?? 'null');
if (!data) { console.error('harness global never appeared', { errors }); chrome.kill(); process.exit(1); }
const results = data.results ?? [];
for (const r of results) {
  if (!r.ok || (filter && r.name.toLowerCase().includes(filter.toLowerCase()))) {
    console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? `\n      ${r.detail}` : ''}`);
  }
}
console.log(`\n${data.pass ?? results.filter(r => r.ok).length}/${data.total ?? results.length} OK`);
if (errors.length) console.log('page errors:', errors);
chrome.kill();
process.exit(results.some((r) => !r.ok) ? 1 : 0);
