import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const root = resolve(import.meta.dirname, '..');
const outputDir = join(root, 'docs', 'previews');
const profileDir = await mkdtemp(join(tmpdir(), 'indira-preview-'));
const port = 9334;
const baseUrl = 'http://127.0.0.1:4321/';
const sections = ['beranda', 'layanan', 'spesifikasi', 'tentang', 'alasan', 'proyek', 'kontak'];

await mkdir(outputDir, { recursive: true });

const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--no-first-run',
  '--no-default-browser-check',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profileDir}`,
  'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((resolvePromise) => setTimeout(resolvePromise, ms));

async function waitForDebugger() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch {}
    await sleep(100);
  }
  throw new Error('Chrome DevTools tidak dapat dihubungi.');
}

class CdpClient {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.nextId = 1;
    this.pending = new Map();
    this.socket.addEventListener('message', ({ data }) => {
      const message = JSON.parse(data);
      if (!message.id) return;
      const callback = this.pending.get(message.id);
      if (!callback) return;
      this.pending.delete(message.id);
      if (message.error) callback.reject(new Error(message.error.message));
      else callback.resolve(message.result);
    });
  }

  async open() {
    if (this.socket.readyState === WebSocket.OPEN) return;
    await new Promise((resolvePromise, reject) => {
      this.socket.addEventListener('open', resolvePromise, { once: true });
      this.socket.addEventListener('error', reject, { once: true });
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolvePromise, reject) => {
      this.pending.set(id, { resolve: resolvePromise, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.socket.close();
  }
}

async function preparePage(client, viewport) {
  await client.send('Emulation.setDeviceMetricsOverride', viewport);
  await client.send('Page.navigate', { url: baseUrl });
  await sleep(1800);
  await client.send('Runtime.evaluate', {
    expression: `(async () => {
      document.documentElement.style.scrollBehavior = 'auto';
      await document.fonts.ready;
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    })()`,
    awaitPromise: true,
  });
}

async function captureSet(client, name, viewport) {
  await preparePage(client, viewport);
  for (const section of sections) {
    await client.send('Runtime.evaluate', {
      expression: `(async () => {
        const element = document.getElementById(${JSON.stringify(section)});
        if (!element) throw new Error('Section tidak ditemukan: ${section}');
        window.scrollTo(0, element.offsetTop);
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        const images = [...element.querySelectorAll('img')];
        await Promise.race([
          Promise.all(images.map((image) => image.complete
            ? Promise.resolve()
            : new Promise((resolve) => { image.onload = image.onerror = resolve; }))),
          new Promise((resolve) => setTimeout(resolve, 4000)),
        ]);
      })()`,
      awaitPromise: true,
    });
    await sleep(250);
    const { data } = await client.send('Page.captureScreenshot', {
      format: 'png',
      fromSurface: true,
      captureBeyondViewport: false,
    });
    await writeFile(join(outputDir, `${name}-${section}.png`), Buffer.from(data, 'base64'));
  }
}

try {
  await waitForDebugger();
  const pageResponse = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(baseUrl)}`, { method: 'PUT' });
  const page = await pageResponse.json();
  const client = new CdpClient(page.webSocketDebuggerUrl);
  await client.open();
  await client.send('Page.enable');
  await client.send('Runtime.enable');

  await captureSet(client, 'desktop', {
    width: 1440,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await captureSet(client, 'mobile', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });

  client.close();
} finally {
  chrome.kill();
  await sleep(750);
  await rm(profileDir, { recursive: true, force: true }).catch(() => {});
}

console.log(`14 screenshot tersimpan di ${outputDir}`);
