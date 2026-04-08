import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const aulas = fs.readdirSync(__dirname)
  .filter(f => f.startsWith('aula-') && f.endsWith('.html'))
  .sort((a, b) => {
    const numA = parseInt(a.match(/aula-(\d+)/)[1]);
    const numB = parseInt(b.match(/aula-(\d+)/)[1]);
    return numA - numB;
  });

(async () => {
  console.log(`Found ${aulas.length} HTML files to convert.\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  for (const htmlFile of aulas) {
    const inputHTML = path.join(__dirname, htmlFile);
    const outputPDF = inputHTML.replace('.html', '.pdf');

    console.log(`[${aulas.indexOf(htmlFile) + 1}/${aulas.length}] ${htmlFile}`);

    await page.goto(`file://${inputHTML}`, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);

    await page.pdf({
      path: outputPDF,
      width: '1280px',
      height: '720px',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: true
    });

    const size = (fs.statSync(outputPDF).size / 1024).toFixed(0);
    console.log(`  -> ${path.basename(outputPDF)} (${size} KB)`);
  }

  await browser.close();
  console.log(`\nDone! ${aulas.length} PDFs generated.`);
})();
