import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

const filePath = join(__dirname, 'manual-compartilhamento.html');
await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0', timeout: 30000 });

await page.pdf({
  path: join(__dirname, 'Manual-Compartilhamento-Giovana-Petelinkar.pdf'),
  format: 'A4',
  printBackground: true,
  margin: { top: '60px', bottom: '72px', left: '56px', right: '56px' },
  displayHeaderFooter: false,
});

console.log('PDF gerado com sucesso!');
await browser.close();
