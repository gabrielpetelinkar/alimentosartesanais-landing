const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--font-render-hinting=none',
      '--disable-gpu'
    ]
  });

  const page = await browser.newPage();

  // Set viewport to A4-like dimensions for accurate rendering
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

  const htmlPath = path.resolve(__dirname, 'bonus-1-template-rotulo.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 60000 });

  // Wait for Google Fonts to fully load
  await page.evaluateHandle('document.fonts.ready');

  // Extra wait for font rendering to settle
  await new Promise(r => setTimeout(r, 4000));

  // Force all fonts loaded check
  const fontsLoaded = await page.evaluate(() => {
    return document.fonts.check('700 12px "Playfair Display"') &&
           document.fonts.check('400 12px "Inter"') &&
           document.fonts.check('500 12px "JetBrains Mono"');
  });
  console.log('Fonts loaded:', fontsLoaded);

  const outputPath = path.resolve(__dirname, 'Bonus-1-Template-Rotulo-ORIZA.pdf');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: false,
    displayHeaderFooter: false,
    scale: 1,
    margin: {
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px'
    },
    tagged: true
  });

  console.log(`PDF generated: ${outputPath}`);
  await browser.close();
})();
