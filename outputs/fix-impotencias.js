const fs = require('fs');
let html = fs.readFileSync('/Users/gabrielpetelinkar/AIOSORIZA/outputs/apostila-reproducao-animal.html', 'utf-8');

// 1. Extrair bloco de impotencias (h3 ate o sp-memo de fechamento)
const impStart = '<h3>Impotências Reprodutivas do Macho</h3>';
const impEnd = 'Azoospermia obstrutiva: testiculo normal, FSH normal | Secretora: testiculo pequeno, FSH alto</div></div>';

const startIdx = html.indexOf(impStart);
const endIdx = html.indexOf(impEnd);

if (startIdx === -1 || endIdx === -1) {
  console.error('Bloco de impotencias nao encontrado');
  process.exit(1);
}

const fullEndIdx = endIdx + impEnd.length;
const impBlock = html.substring(startIdx, fullEndIdx);
console.log('Bloco extraido:', impBlock.length, 'chars');

// 2. Remover da posicao atual
html = html.substring(0, startIdx) + html.substring(fullEndIdx);

// 3. Adicionar botao de tab antes do botao "Tabela geral"
const tabelaBtn = 'onclick="pmSetTab(\'tabela\',this)">Tabela geral</button>';
const tabelaBtnIdx = html.indexOf(tabelaBtn);
if (tabelaBtnIdx !== -1) {
  const btnInsert = '<button class="pm-tab" onclick="pmSetTab(\'impotencias\',this)">Impotências</button>\n  <button class="pm-tab" ';
  // Encontrar o inicio do <button que contem tabela
  let btnStart = html.lastIndexOf('<button', tabelaBtnIdx);
  html = html.substring(0, btnStart) + btnInsert + html.substring(btnStart + '<button class="pm-tab" '.length);
  console.log('OK: Tab button adicionado');
}

// 4. Inserir panel antes de pm-panel-tabela
const tabelaPanel = '<div class="pm-panel" id="pm-panel-tabela">';
const tabelaPanelIdx = html.indexOf(tabelaPanel);
if (tabelaPanelIdx !== -1) {
  const impContent = impBlock.replace(impStart, '');
  const panel = '<div class="pm-panel" id="pm-panel-impotencias">\n<h4>Classificação das Impotências Reprodutivas</h4>\n' + impContent + '\n</div>\n\n';
  html = html.substring(0, tabelaPanelIdx) + panel + html.substring(tabelaPanelIdx);
  console.log('OK: Panel impotencias inserido');
}

fs.writeFileSync('/Users/gabrielpetelinkar/AIOSORIZA/outputs/apostila-reproducao-animal.html', html, 'utf-8');
console.log('Concluido! Linhas:', html.split('\n').length);
