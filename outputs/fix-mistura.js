const fs = require('fs');
let html = fs.readFileSync('/Users/gabrielpetelinkar/AIOSORIZA/outputs/apostila-reproducao-animal.html', 'utf-8');

// === 1. MOVER CASTRACAO MACHO para DENTRO do pm-panel-castração ===
const castMachoH3 = '<h3>Castração do Macho — Técnicas Cirúrgicas e Timing</h3>';
const castMachoEnd = '</div><!-- /TAB 3: CASTRACAO DO MACHO -->';
let cmH3Idx = html.indexOf(castMachoH3);
let cmEndIdx = html.indexOf(castMachoEnd);

if (cmH3Idx !== -1 && cmEndIdx !== -1) {
  cmEndIdx += castMachoEnd.length;
  const castMachoBlock = html.substring(cmH3Idx, cmEndIdx);
  html = html.substring(0, cmH3Idx) + html.substring(cmEndIdx);

  const pmCastPanel = 'id="pm-panel-castração">';
  const pmCastIdx = html.indexOf(pmCastPanel);
  if (pmCastIdx !== -1) {
    const insertPos = pmCastIdx + pmCastPanel.length;
    const content = castMachoBlock.replace(castMachoH3, '').replace(/^\s+/, '');
    html = html.substring(0, insertPos) + '\n<h4>Técnicas Cirúrgicas</h4>\n' + content + '\n\n<h4>Timing — Quando Castrar</h4>\n' + html.substring(insertPos);
    console.log('OK: Castração macho movida para pm-panel-castração');
  }
}

// === 2. MOVER CASTRACAO FEMEA para DENTRO do pf-panel-castração ===
const castFemeaH3 = '<h3>Castração da Fêmea — Técnicas Cirúrgicas e Timing</h3>';
const castFemeaEnd = '</div><!-- /TAB 2: CASTRACAO DA FEMEA -->';
let cfH3Idx = html.indexOf(castFemeaH3);
let cfEndIdx = html.indexOf(castFemeaEnd);

if (cfH3Idx !== -1 && cfEndIdx !== -1) {
  cfEndIdx += castFemeaEnd.length;
  const castFemeaBlock = html.substring(cfH3Idx, cfEndIdx);
  html = html.substring(0, cfH3Idx) + html.substring(cfEndIdx);

  const pfCastPanel = 'id="pf-panel-castração">';
  const pfCastIdx = html.indexOf(pfCastPanel);
  if (pfCastIdx !== -1) {
    const insertPos = pfCastIdx + pfCastPanel.length;
    const content = castFemeaBlock.replace(castFemeaH3, '').replace(/^\s+/, '');
    html = html.substring(0, insertPos) + '\n<h4>Técnicas Cirúrgicas</h4>\n' + content + '\n\n<h4>Timing — Quando Castrar</h4>\n' + html.substring(insertPos);
    console.log('OK: Castração fêmea movida para pf-panel-castração');
  }
}

// === 3. MOVER IMPOTENCIAS para tab pm ===
const impH3 = '<h3>Impotências Reprodutivas do Macho</h3>';
const impIdx = html.indexOf(impH3);

if (impIdx !== -1) {
  // O bloco termina antes do proximo capitulo.
  // Buscar o fim: o sp-memo que fecha + proxima tag de chapter
  // Vamos buscar o pm-panel-tabela
  const pmTabelaPanel = '<div class="pm-panel" id="pm-panel-tabela">';
  const pmTabelaIdx = html.indexOf(pmTabelaPanel, impIdx);

  if (pmTabelaIdx !== -1) {
    const impBlock = html.substring(impIdx, pmTabelaIdx).trim();
    html = html.substring(0, impIdx) + html.substring(pmTabelaIdx);

    // Adicionar tab button
    const tabelaBtn = 'onclick="pmSetTab(\'tabela\',this)">Tabela geral</button>';
    const tabelaBtnIdx = html.indexOf(tabelaBtn);
    if (tabelaBtnIdx !== -1) {
      const impBtn = '\n  <button class="pm-tab" onclick="pmSetTab(\'impotencias\',this)">Impotências</button>\n  <button class="pm-tab" ';
      html = html.substring(0, tabelaBtnIdx - '<button class="pm-tab" '.length) + impBtn + html.substring(tabelaBtnIdx);
    }

    // Adicionar panel
    const pmTabelaIdx2 = html.indexOf(pmTabelaPanel);
    const impContent = impBlock.replace(impH3, '');
    const impPanel = '<div class="pm-panel" id="pm-panel-impotencias">\n' + impContent + '\n</div>\n\n';
    html = html.substring(0, pmTabelaIdx2) + impPanel + html.substring(pmTabelaIdx2);
    console.log('OK: Impotências movida para tab pm');
  }
}

// === 4. MOVER EXAME GINECOLOGICO para tab pf ===
const egH3 = '<h3>Exame Ginecológico — Sequência Clínica Completa</h3>';
const egIdx = html.indexOf(egH3);

if (egIdx !== -1) {
  // Bloco vai ate o <style> que define .pf-tabs
  const pfStyle = '.pf-tabs{display';
  const pfStyleIdx = html.indexOf(pfStyle, egIdx);

  if (pfStyleIdx !== -1) {
    // Voltar um pouco para pegar o <style>\n
    let styleStart = html.lastIndexOf('<style>', pfStyleIdx);
    if (styleStart === -1) styleStart = pfStyleIdx;

    const egBlock = html.substring(egIdx, styleStart).trim();
    html = html.substring(0, egIdx) + html.substring(styleStart);

    // Adicionar tab button como primeira
    const pfTabsDiv = '<div class="pf-tabs">';
    const pfTabsDivIdx = html.indexOf(pfTabsDiv);
    if (pfTabsDivIdx !== -1) {
      const insertPos = pfTabsDivIdx + pfTabsDiv.length;
      html = html.substring(0, insertPos) + '\n  <button class="pf-tab" onclick="pfSetTab(\'ginecologico\',this)">Exame Ginecológico</button>' + html.substring(insertPos);
    }

    // Adicionar panel antes do primeiro pf-panel
    const firstPfPanel = '<div class="pf-panel active" id="pf-panel-útero">';
    const firstPfPanelIdx = html.indexOf(firstPfPanel);
    if (firstPfPanelIdx !== -1) {
      const egContent = egBlock.replace(egH3, '');
      const egPanel = '<div class="pf-panel" id="pf-panel-ginecologico">\n<h4>Sequência Clínica Completa</h4>\n' + egContent + '\n</div>\n\n';
      html = html.substring(0, firstPfPanelIdx) + egPanel + html.substring(firstPfPanelIdx);
    }
    console.log('OK: Exame Ginecológico movido para tab pf');
  }
}

// === 5. RENOMEAR tabs de castração ===
html = html.replace(
  /⚠️ Castração — timing/g,
  'Castração (técnica + timing)'
);

fs.writeFileSync('/Users/gabrielpetelinkar/AIOSORIZA/outputs/apostila-reproducao-animal.html', html, 'utf-8');
console.log('\nConcluído! Linhas:', html.split('\n').length);
