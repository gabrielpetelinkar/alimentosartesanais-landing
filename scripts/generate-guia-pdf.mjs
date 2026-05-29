import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const guiaPath = resolve('outputs/guia-campo-reproducao-equina.html');
const outputPath = resolve('outputs/guia-campo-hormonioterapia.pdf');
const imagesDir = resolve('outputs');

let html = readFileSync(guiaPath, 'utf-8');

// ══════════════════════════════════════════════════════
// 1. EXTRAIR CONTEÚDO — remover shell interativa, manter conteúdo
// ══════════════════════════════════════════════════════

// Converter imagens para paths absolutos
html = html.replace(/src="([^"]+\.(png|jpg|jpeg))"/g, (match, filename) => {
  if (filename.startsWith('file://') || filename.startsWith('http')) return match;
  return `src="file://${imagesDir}/${filename}"`;
});

// ══════════════════════════════════════════════════════
// 2. INJETAR CSS DE EBOOK — substituir todo o estilo visual
// ══════════════════════════════════════════════════════

const ebookCSS = `
<style id="ebook-override">
  /* ═══ RESET PARA EBOOK ═══ */
  body {
    background: #fff !important;
    color: #1a1a1a !important;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
    font-size: 10.5pt !important;
    line-height: 1.65 !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* ═══ VARIÁVEIS FORÇADAS LIGHT ═══ */
  :root, [data-theme="dark"] {
    --bg-main: #fff !important; --bg-card: #fff !important; --bg-card-alt: #f7f7f5 !important;
    --text-primary: #1a1a1a !important; --text-secondary: #444 !important; --text-muted: #666 !important;
    --border-light: #ddd !important; --border-card: #ddd !important;
    --green-900: #0f2b46 !important; --green-800: #163a5c !important; --green-700: #1b4a72 !important;
    --green-600: #1b4a72 !important; --green-500: #2d6a9f !important; --green-400: #c8a84e !important;
    --green-300: #d4b85c !important; --green-100: #eee8d5 !important; --green-50: #f5f2ea !important;
    --amber-700: #b45309 !important; --amber-600: #d97706 !important;
    --red-700: #991b1b !important; --red-600: #b91c1c !important;
    --blue-700: #1d4ed8 !important; --blue-600: #2563eb !important;
    --shadow-sm: none !important; --shadow-md: none !important; --shadow-lg: none !important;
    --radius: 8px !important; --radius-sm: 6px !important; --radius-lg: 12px !important;
  }

  /* ═══ ESCONDER TUDO INTERATIVO ═══ */
  .gate-overlay, .nav-bar, .back-top, .ch-bookmark, .progress-bar,
  .cover-install-wrap, .footer, .edit-toggle, .search-overlay,
  .search-btn, .font-controls, .pdf-fab, .toolbar, .fab,
  [onclick*="toggleBookmark"], [onclick*="toggleDark"],
  [onclick*="toggleFont"], [onclick*="toggleEdit"],
  [onclick*="toggleSearch"], [onclick*="handleInstall"],
  [style*="position:fixed"], [style*="position: fixed"],
  a[download], section#calc {
    display: none !important;
  }

  /* ═══ CONTAINER ═══ */
  .container { max-width: 100% !important; padding: 0 !important; margin: 0 !important; }

  /* ═══ CAPA — página inteira ═══ */
  .cover {
    background: linear-gradient(155deg, #0f1824 0%, #1b3a5c 40%, #1e4470 70%, #2d5a8e 100%) !important;
    min-height: 100vh !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 80px 60px !important;
    text-align: center !important;
    color: #fff !important;
    page-break-after: always !important;
  }
  .cover img { max-width: 140px !important; margin-bottom: 24px !important; }
  .cover h1 {
    font-size: 36pt !important; font-weight: 900 !important;
    letter-spacing: -0.5px !important; line-height: 1.15 !important;
    margin-bottom: 16px !important;
  }
  .cover .subtitle {
    font-size: 14pt !important; color: rgba(255,255,255,0.8) !important;
    max-width: 500px !important; line-height: 1.5 !important;
  }
  .cover .version, .cover .badge { display: none !important; }
  .cover .cover-author {
    margin-top: 40px !important; font-size: 11pt !important;
    color: rgba(255,255,255,0.7) !important;
  }
  .cover .cover-author a { color: rgba(255,255,255,0.7) !important; }

  /* ═══ CAPÍTULOS ═══ */
  .chapter {
    page-break-before: always !important;
    margin: 0 !important;
    padding: 0 !important;
    border: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    background: #fff !important;
  }

  .chapter-header {
    background: linear-gradient(135deg, #0f1824, #1b3a5c) !important;
    color: #fff !important;
    padding: 28px 32px !important;
    margin: 0 -14px 24px !important;
    border-radius: 0 !important;
  }
  .chapter-header .ch-num {
    font-size: 9pt !important; text-transform: uppercase !important;
    letter-spacing: 2px !important; opacity: 0.7 !important;
    color: #fff !important;
  }
  .chapter-header h2 {
    font-size: 22pt !important; font-weight: 800 !important;
    color: #fff !important; margin: 4px 0 0 !important;
  }
  .chapter-header .ch-icon svg { color: #c8a84e !important; }

  .chapter-body {
    padding: 0 !important;
  }

  /* ═══ TÍTULOS INTERNOS ═══ */
  h3 {
    font-size: 14pt !important; font-weight: 700 !important;
    color: #1b3a5c !important; margin: 28px 0 12px !important;
    padding-bottom: 6px !important;
    border-bottom: 2px solid #c8a84e !important;
  }
  h4 {
    font-size: 12pt !important; font-weight: 600 !important;
    color: #1b4a72 !important; margin: 20px 0 8px !important;
  }

  /* ═══ CARDS — estilo editorial ═══ */
  .card {
    border-radius: 8px !important;
    padding: 16px 18px !important;
    margin: 14px 0 !important;
    page-break-inside: avoid !important;
    box-shadow: none !important;
  }
  .card-title {
    font-size: 11pt !important; font-weight: 700 !important;
    margin-bottom: 8px !important;
  }
  .card-green {
    background: #f0f7f0 !important; border: 1px solid #b8d4b8 !important;
    border-left: 4px solid #2d7a3a !important;
  }
  .card-green .card-title { color: #1a5c2a !important; }
  .card-amber {
    background: #fdf6e8 !important; border: 1px solid #e8d5a0 !important;
    border-left: 4px solid #b45309 !important;
  }
  .card-amber .card-title { color: #92400e !important; }
  .card-red {
    background: #fef2f2 !important; border: 1px solid #f0b8b8 !important;
    border-left: 4px solid #b91c1c !important;
  }
  .card-red .card-title { color: #991b1b !important; }
  .card-blue {
    background: #eff6ff !important; border: 1px solid #b8d4f0 !important;
    border-left: 4px solid #1d4ed8 !important;
  }
  .card-blue .card-title { color: #1e40af !important; }

  /* ═══ TABELAS — limpas e legíveis ═══ */
  table {
    width: 100% !important; border-collapse: collapse !important;
    font-size: 9.5pt !important; margin: 12px 0 !important;
    page-break-inside: avoid !important;
  }
  th {
    background: #1b3a5c !important; color: #fff !important;
    padding: 8px 10px !important; font-weight: 600 !important;
    font-size: 9pt !important; text-align: left !important;
  }
  td {
    padding: 7px 10px !important;
    border-bottom: 1px solid #e5e5e5 !important;
    vertical-align: top !important;
  }
  tr:nth-child(even) td { background: #f9f9f7 !important; }
  .table-wrap { overflow: visible !important; }

  /* ═══ FICHAS DE HORMÔNIOS ═══ */
  .hormone-card {
    page-break-inside: avoid !important;
    margin: 16px 0 !important;
    border-radius: 8px !important;
    overflow: hidden !important;
    border: 1px solid #ddd !important;
  }
  .hormone-card-header {
    padding: 12px 16px !important;
    font-size: 12pt !important; font-weight: 700 !important;
    color: #fff !important;
  }
  .hormone-card-body {
    padding: 14px 16px !important;
    background: #fff !important;
  }
  .hc-row {
    padding: 6px 0 !important;
    border-bottom: 1px solid #f0f0f0 !important;
    font-size: 10pt !important;
  }
  .hc-label {
    font-weight: 600 !important; color: #1b3a5c !important;
    min-width: 120px !important;
  }

  /* ═══ CASOS DE CAMPO ═══ */
  .case-study {
    page-break-inside: avoid !important;
    margin: 16px 0 !important;
    border-radius: 8px !important;
    overflow: hidden !important;
    border: 1px solid #ddd !important;
  }
  .case-study-header {
    padding: 12px 16px !important;
    font-size: 11pt !important; font-weight: 700 !important;
    color: #fff !important;
    background: #1b3a5c !important;
  }
  .case-study-body {
    padding: 14px 16px !important;
    background: #fff !important;
  }
  .cs-section { margin: 8px 0 !important; }
  .cs-section-label {
    font-weight: 700 !important; color: #1b3a5c !important;
    font-size: 9.5pt !important; text-transform: uppercase !important;
    letter-spacing: 0.5px !important; margin-bottom: 4px !important;
  }

  /* ═══ FAQ ═══ */
  details.faq-item {
    border: 1px solid #e5e5e5 !important;
    border-radius: 8px !important;
    margin: 8px 0 !important;
    page-break-inside: avoid !important;
  }
  details.faq-item summary {
    padding: 12px 16px !important;
    font-weight: 600 !important;
    font-size: 10.5pt !important;
    color: #1b3a5c !important;
    background: #f7f7f5 !important;
    border-radius: 8px !important;
  }
  details.faq-item .faq-answer {
    padding: 12px 16px !important;
    font-size: 10pt !important;
    border-top: 1px solid #e5e5e5 !important;
  }

  /* ═══ IMAGENS ═══ */
  img {
    max-width: 100% !important;
    height: auto !important;
  }

  /* ═══ SOBRE/AUTORA ═══ */
  #sobre {
    page-break-before: always !important;
    background: #f7f7f5 !important;
    border: 1px solid #ddd !important;
    text-align: center !important;
    padding: 40px 32px !important;
  }

  /* ═══ LINKS ═══ */
  a { color: #1b4a72 !important; text-decoration: none !important; }

  /* ═══ PROTOCOL STEPS ═══ */
  .protocol-steps {
    counter-reset: step !important;
    list-style: none !important;
    padding: 0 !important;
  }
  .protocol-steps li {
    padding: 10px 14px 10px 50px !important;
    margin: 6px 0 !important;
    background: #f7f7f5 !important;
    border-radius: 8px !important;
    position: relative !important;
    page-break-inside: avoid !important;
    font-size: 10pt !important;
  }
  .protocol-steps li::before {
    content: attr(data-step) !important;
    position: absolute !important;
    left: 14px !important; top: 10px !important;
    width: 26px !important; height: 26px !important;
    background: #1b3a5c !important; color: #fff !important;
    border-radius: 50% !important;
    display: flex !important; align-items: center !important; justify-content: center !important;
    font-size: 11px !important; font-weight: 700 !important;
  }

  /* ═══ PRINT SPECIFIC ═══ */
  @page {
    size: A4;
    margin: 18mm 14mm 20mm 14mm;
  }
  @page :first { margin: 0; }
</style>
`;

html = html.replace('</head>', ebookCSS + '</head>');

// ══════════════════════════════════════════════════════
// 3. AJUSTES NO HTML
// ══════════════════════════════════════════════════════

// Forçar FAQs abertas
html = html.replace(/<details class="faq-item">/g, '<details class="faq-item" open>');

// Remover gate
html = html.replace(/class="gate-locked"/, '');

// Salvar temp
const tmpPath = resolve('/tmp/guia-ebook-render.html');
writeFileSync(tmpPath, html);

console.log('Renderizando ebook PDF...');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

await page.goto('file://' + tmpPath, { waitUntil: 'networkidle0', timeout: 60000 });
await new Promise(r => setTimeout(r, 4000));

// Manipular DOM para ebook
await page.evaluate(() => {
  // Expandir todas details
  document.querySelectorAll('details').forEach(d => d.setAttribute('open', ''));

  // Remover elementos interativos
  const selectors = [
    '[style*="position:fixed"]', '[style*="position: fixed"]',
    '.search-btn', '.font-controls', '.toolbar', '.fab', '.pdf-fab',
    '.gate-overlay', '.nav-bar', '.back-top', '.ch-bookmark',
    '.progress-bar', '.cover-install-wrap', '.footer',
    '.edit-toggle', 'a[download]', '#calc',
    'button[onclick*="toggle"]', 'button[onclick*="handleInstall"]'
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.remove());
  });

  // Remover seção calculadoras inteira
  const calcSection = document.querySelector('section:has(h2)');
  document.querySelectorAll('section').forEach(sec => {
    const h2 = sec.querySelector('h2');
    if (h2 && h2.textContent.includes('Calculadoras')) sec.remove();
  });

  // Remover fichas de download
  document.querySelectorAll('.card').forEach(card => {
    if (card.querySelector('a[download]') || card.textContent.includes('Fichas de Campo')) {
      card.remove();
    }
  });

  // Adicionar sumário após a capa
  const cover = document.querySelector('.cover');
  if (cover) {
    const toc = document.createElement('div');
    toc.style.cssText = 'page-break-before:always;page-break-after:always;padding:60px 40px;';
    toc.innerHTML = '<h2 style="font-size:24pt;color:#1b3a5c;margin-bottom:32px;border:none;text-align:center;">Sumário</h2>';
    const chapters = document.querySelectorAll('.chapter-header h2');
    const nums = document.querySelectorAll('.chapter-header .ch-num');
    let tocHTML = '<div style="max-width:400px;margin:0 auto;">';
    chapters.forEach((ch, i) => {
      const num = nums[i] ? nums[i].textContent : '';
      tocHTML += '<div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid #e5e5e5;font-size:12pt;">'
        + '<span style="color:#666;font-size:10pt;min-width:80px;">' + num + '</span>'
        + '<span style="font-weight:600;color:#1b3a5c;flex:1;">' + ch.textContent + '</span>'
        + '</div>';
    });
    tocHTML += '</div>';
    toc.innerHTML += tocHTML;
    cover.parentNode.insertBefore(toc, cover.nextSibling);
  }
});

await page.pdf({
  path: outputPath,
  format: 'A4',
  margin: { top: '18mm', bottom: '20mm', left: '14mm', right: '14mm' },
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: '<div style="font-size:7pt;color:#999;width:100%;text-align:center;padding-top:4mm;">Guia de Campo: Hormonioterapia em Éguas &nbsp;|&nbsp; IP Reprodução Equina</div>',
  footerTemplate: '<div style="font-size:7pt;color:#999;width:100%;padding-bottom:4mm;display:flex;justify-content:space-between;padding-left:14mm;padding-right:14mm;"><span>M.V. Dra. Iara Macedo Petelinkar</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
});

await browser.close();

const stats = readFileSync(outputPath);
console.log('PDF gerado:', outputPath);
console.log('Tamanho:', (stats.length / 1024 / 1024).toFixed(1) + ' MB');
