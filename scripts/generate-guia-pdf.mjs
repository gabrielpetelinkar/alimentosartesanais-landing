import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const guiaPath = resolve('outputs/guia-campo-reproducao-equina.html');
const outputPath = resolve('outputs/guia-campo-hormonioterapia.pdf');
const imagesDir = resolve('outputs');

let html = readFileSync(guiaPath, 'utf-8');

// Converter imagens relativas para paths absolutos (file://)
html = html.replace(/src="([^"]+\.(png|jpg|jpeg|svg))"/g, (match, filename) => {
  return `src="file://${imagesDir}/${filename}"`;
});

// CSS para PDF
const pdfCSS = `
<style id="pdf-overrides">
  /* Forçar light mode */
  body, html { background: #fff !important; color: #1a1a1a !important; }
  :root {
    --bg-main: #fff !important; --bg-card: #fff !important; --bg-card-alt: #f8f8f8 !important;
    --text-primary: #1a1a1a !important; --text-secondary: #525252 !important; --text-muted: #6b6b6b !important;
    --border-light: #e0e0e0 !important; --border-card: #e0e0e0 !important;
    --green-700: #1e3254 !important; --green-400: #d4ab4c !important;
  }

  /* Esconder TUDO interativo */
  .gate-overlay, .nav-bar, .back-top, .ch-bookmark,
  .progress-bar, .cover-install-wrap, .footer,
  .edit-toggle, .search-overlay, .search-btn,
  .font-controls, .pdf-fab,
  [onclick*="toggleBookmark"], [onclick*="toggleDark"],
  [onclick*="toggleFont"], [onclick*="toggleEdit"],
  [onclick*="toggleSearch"], [onclick*="handleInstall"],
  button[style*="position:fixed"], a[style*="position:fixed"],
  div[style*="position:fixed"], .fab,
  [style*="position: fixed"] {
    display: none !important;
  }

  /* Esconder barra de busca/font */
  .toolbar, .search-bar, .font-bar {
    display: none !important;
  }

  /* Esconder seção de calculadoras e fichas download inteira */
  section#calc { display: none !important; }

  /* Esconder links de download de fichas */
  a[href$=".pdf"][download] { display: none !important; }
  div:has(> a[href$=".pdf"][download]) { display: none !important; }

  /* Cover */
  .cover {
    background: linear-gradient(145deg, #111e33, #1e3254, #274470) !important;
    min-height: auto !important;
    padding: 80px 40px !important;
    page-break-after: always;
    text-align: center;
  }
  .cover img { max-width: 120px !important; }

  /* Capítulos */
  .chapter { page-break-before: always; }

  /* Não quebrar cards e tabelas */
  .card, .case-study, table, .table-wrap, .hormone-card { page-break-inside: avoid; }

  /* Imagens */
  img { max-width: 100% !important; height: auto !important; }

  /* FAQ expandidas */
  details.faq-item { display: block !important; }
  details.faq-item > summary { font-weight: 700; }
  details.faq-item > .faq-answer { display: block !important; }

  /* Fontes */
  body { font-size: 10.5pt !important; line-height: 1.55 !important; }
  h2 { font-size: 17pt !important; }
  h3 { font-size: 13pt !important; }
  h4 { font-size: 11pt !important; }
  .container { max-width: 100% !important; padding: 0 !important; }

  /* Sobre/autora */
  #sobre { page-break-before: always; }

  @page { margin: 15mm 12mm; }
</style>
`;

html = html.replace('</head>', pdfCSS + '</head>');

// Forçar FAQs abertas
html = html.replace(/<details class="faq-item">/g, '<details class="faq-item" open>');

// Remover gate overlay completamente
html = html.replace(/<div class="gate-overlay"[\s\S]*?<\/div>\s*<\/div>/g, '');

// Remover botão PDF flutuante se existir
html = html.replace(/<[^>]*class="[^"]*pdf-fab[^"]*"[^>]*>[\s\S]*?<\/[^>]*>/g, '');
html = html.replace(/<a[^>]*download[^>]*guia-campo-hormonioterapia\.pdf[^>]*>[\s\S]*?<\/a>/g, '');

// Salvar temp
const tmpPath = resolve('/tmp/guia-pdf-render.html');
writeFileSync(tmpPath, html);

console.log('Gerando PDF...');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

// Navegar com base URL para imagens
await page.goto('file://' + tmpPath, { waitUntil: 'networkidle0', timeout: 60000 });

// Esperar imagens
await new Promise(r => setTimeout(r, 3000));

// Expandir todas as FAQ
await page.evaluate(() => {
  document.querySelectorAll('details').forEach(d => d.setAttribute('open', ''));
  // Remover elementos fixos
  document.querySelectorAll('[style*="position:fixed"],[style*="position: fixed"]').forEach(el => el.remove());
  // Remover seção calc se ainda existir
  const calc = document.getElementById('calc');
  if (calc) calc.remove();
  // Remover botões de busca/font
  document.querySelectorAll('.search-btn, .font-controls, .toolbar, .fab, .pdf-fab').forEach(el => el.remove());
  // Remover fichas de download
  document.querySelectorAll('a[download]').forEach(el => {
    const parent = el.closest('.card');
    if (parent) parent.remove();
  });
});

await page.pdf({
  path: outputPath,
  format: 'A4',
  margin: { top: '18mm', bottom: '18mm', left: '14mm', right: '14mm' },
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: '<div style="font-size:7px;color:#999;width:100%;text-align:center;padding-top:5mm;">Guia de Campo — Hormonioterapia em Éguas | IP Reprodução Equina</div>',
  footerTemplate: '<div style="font-size:7px;color:#999;width:100%;text-align:center;padding-bottom:5mm;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
});

await browser.close();
console.log('PDF gerado:', outputPath);
const stats = readFileSync(outputPath);
console.log('Tamanho:', (stats.length / 1024 / 1024).toFixed(1) + ' MB');
