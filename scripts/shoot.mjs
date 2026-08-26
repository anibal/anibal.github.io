/**
 * Design-QA screenshots (handoff §9): full-page captures of both locales at
 * 360 / 768 / 1440 into ./shots/. Usage:
 *   npm run build && node scripts/shoot.mjs            # serves dist/ itself
 * Requires Chrome at $CHROME_PATH (or the macOS default).
 */
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

const CHROME =
  process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 8329;
const BASE = `http://localhost:${PORT}`;
const WIDTHS = [360, 768, 1440];
const ROUTES = [
  ['en', '/'],
  ['es', '/es/'],
  ['en-ideas', '/ideas/'],
  ['es-ideas', '/es/ideas/'],
  ['en-post', '/2025/10/20/hallucination-is-the-fundamental-feature-of-llms/'],
  ['es-post', '/2025/10/20/la-alucinacion-es-el-feature-fundamental-de-los-llms/'],
];

const server = spawn('python3', ['-m', 'http.server', String(PORT)], {
  cwd: 'dist',
  stdio: 'ignore',
});
await new Promise((r) => setTimeout(r, 800));

mkdirSync('shots', { recursive: true });
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars'],
});

try {
  for (const [name, route] of ROUTES) {
    for (const width of WIDTHS) {
      const page = await browser.newPage();
      // deterministic captures: reduced motion = content simply present,
      // no mid-animation frames
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ]);
      await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 });
      await page.goto(BASE + route, { waitUntil: 'networkidle0' });
      // scroll through so any lazy work happens, then back to top
      await page.evaluate(async () => {
        await new Promise((res) => {
          let y = 0;
          const step = () => {
            y += 600;
            scrollTo(0, y);
            if (y < document.body.scrollHeight) setTimeout(step, 60);
            else setTimeout(res, 300);
          };
          step();
        });
        scrollTo(0, 0);
      });
      await new Promise((r) => setTimeout(r, 300));
      await page.screenshot({ path: `shots/${name}-${width}.png`, fullPage: true });
      console.log(`shots/${name}-${width}.png`);
      // crisp crop of the header zone for wrap checks
      if (width === 360) {
        await page.setViewport({ width, height: 260, deviceScaleFactor: 2 });
        await new Promise((r) => setTimeout(r, 200));
        await page.screenshot({ path: `shots/${name}-360-header.png` });
        console.log(`shots/${name}-360-header.png`);
      }
      await page.close();
    }
  }
} finally {
  await browser.close();
  server.kill();
}
