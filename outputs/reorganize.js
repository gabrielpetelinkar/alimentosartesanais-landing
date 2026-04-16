#!/usr/bin/env node
/**
 * Script de reorganizacao da apostila
 * Le o HTML atual, extrai capitulos, reorganiza, insere conteudo novo
 */
const fs = require('fs');

const FILE = '/Users/gabrielpetelinkar/AIOSORIZA/outputs/apostila-reproducao-animal.html';
const NOVO = '/Users/gabrielpetelinkar/AIOSORIZA/outputs/conteudo-novo-caps.html';
const EXPANSOES = '/Users/gabrielpetelinkar/AIOSORIZA/outputs/conteudo-expansoes.html';

const html = fs.readFileSync(FILE, 'utf-8');
const novoHtml = fs.readFileSync(NOVO, 'utf-8');
const expHtml = fs.readFileSync(EXPANSOES, 'utf-8');

// === 1. EXTRAIR SECOES DO CONTEUDO NOVO ===
function extractSection(text, startMarker, endMarker) {
  const start = text.indexOf(startMarker);
  if (start === -1) return '';
  const afterComment = text.indexOf('-->', start) + 3;
  const end = endMarker ? text.indexOf(endMarker, afterComment) : text.length;
  const block = text.substring(afterComment, end === -1 ? text.length : end).trim();
  // Remove HTML comments
  return block.replace(/<!--[\s\S]*?-->/g, '').trim();
}

const SECAO_G = extractSection(novoHtml, 'SECAO 1:', 'SECAO 2:');
const SECAO_H = extractSection(novoHtml, 'SECAO 2:', 'SECAO 3:');
const SECAO_J = extractSection(novoHtml, 'SECAO 3:', 'SECAO 4:');
const SECAO_K = extractSection(novoHtml, 'SECAO 4:', 'SECAO 5:');
const SECAO_M = extractSection(novoHtml, 'SECAO 5:');

const EXP_C = extractSection(expHtml, 'EXPANSAO 1:', 'EXPANSAO 2:');
const EXP_D = extractSection(expHtml, 'EXPANSAO 2:', 'EXPANSAO 3:');
const EXP_E = extractSection(expHtml, 'EXPANSAO 3:', 'EXPANSAO 4:');
const EXP_F = extractSection(expHtml, 'EXPANSAO 4:', 'EXPANSAO 5:');
const EXP_I = extractSection(expHtml, 'EXPANSAO 5:', 'EXPANSAO 6:');
const EXP_L = extractSection(expHtml, 'EXPANSAO 6:');

console.log('Secoes extraidas:');
console.log('  G (Pelviologia):', SECAO_G.length, 'chars');
console.log('  H (Freemartinismo):', SECAO_H.length, 'chars');
console.log('  J (Mamaria):', SECAO_J.length, 'chars');
console.log('  K (Embrioes):', SECAO_K.length, 'chars');
console.log('  M (Metabolicos):', SECAO_M.length, 'chars');
console.log('  C (P4 cadela):', EXP_C.length, 'chars');
console.log('  D (Impotencias):', EXP_D.length, 'chars');
console.log('  E (Neonatal):', EXP_E.length, 'chars');
console.log('  F (Neuroendo):', EXP_F.length, 'chars');
console.log('  I (Ginecologico):', EXP_I.length, 'chars');
console.log('  L (Dose insem):', EXP_L.length, 'chars');

// === 2. EXTRAIR CAPITULOS EXISTENTES ===
// O array CHAPTERS esta entre "var CHAPTERS = [" e "];\n\nvar FLASHCARDS"
const chapStart = html.indexOf('var CHAPTERS = [');
const chapEnd = html.indexOf('];\n\nvar FLASHCARDS');
if (chapStart === -1 || chapEnd === -1) {
  console.error('ERRO: nao encontrou array CHAPTERS');
  process.exit(1);
}
const chapBlock = html.substring(chapStart + 'var CHAPTERS = ['.length, chapEnd);

// Parse individual chapters using regex
const chapRegex = /\{\s*id:\s*'([^']+)',\s*num:\s*(\d+),\s*title:\s*'([^']+)',\s*icon:\s*'([^']+)',\s*content:\s*`([\s\S]*?)`\s*\}/g;
const chapters = {};
let match;
while ((match = chapRegex.exec(chapBlock)) !== null) {
  chapters[match[1]] = {
    id: match[1],
    num: parseInt(match[2]),
    title: match[3],
    icon: match[4],
    content: match[5]
  };
}
console.log('\nCapitulos extraidos:', Object.keys(chapters).length);

// === 3. DEFINIR NOVA ORDEM ===
// Escape backticks in content for template literals
function esc(s) { return s.replace(/`/g, '\\`').replace(/\$\{/g, '\\${'); }

function buildChapter(id, num, title, icon, content) {
  return `{
  id: '${id}',
  num: ${num},
  title: '${title}',
  icon: '${icon}',
  content: \`
${content}
\`
}`;
}

const newChapters = [];
let n = 1;

// BLOCO 1 — BASES
// 1. Anatomia (mover do 19)
newChapters.push(buildChapter('anatomia-castracao', n++, 'Anatomia Reprodutiva e Castração', '#i-stethoscope', chapters['anatomia-castracao'].content));

// 2. Gametogenese (manter)
newChapters.push(buildChapter('gametogenese', n++, 'Gametogênese', '#i-microscope', chapters['gametogenese'].content));

// 3. Neuroendocrinologia (NOVO — expansao F no conteudo de gametogenese + conteudo novo)
newChapters.push(buildChapter('neuroendocrinologia', n++, 'Neuroendocrinologia da Reprodução', '#i-flask', `
<div class="sp-info">A neuroendocrinologia reprodutiva controla o eixo hipotálamo-hipófise-gônadas (HPG) e modula a reprodução através de mecanismos como fotoperiodismo, efeito macho e anestro lactacional.</div>
${EXP_F}
`));

// BLOCO 2 — FISIOLOGIA REPRODUTIVA
// 4. Ciclo Estral (manter)
newChapters.push(buildChapter('ciclo-estral', n++, 'Ciclo Estral Comparado', '#i-sync', chapters['ciclo-estral'].content));

// 5. Fertilizacao (manter)
newChapters.push(buildChapter('fertilizacao', n++, 'Fertilização e Desenvolvimento Embrionário', '#i-egg', chapters['fertilizacao'].content));

// 6. RMG (manter)
newChapters.push(buildChapter('rmg', n++, 'Reconhecimento Materno da Gestação', '#i-handshake', chapters['rmg'].content));

// 7. Implantacao + Placentacao (MERGE)
newChapters.push(buildChapter('implantacao-placentacao', n++, 'Implantação, Placentação e Anexos Fetais', '#i-pregnant',
  chapters['implantacao'].content + '\n\n' + chapters['placentacao'].content));

// BLOCO 3 — GESTACAO, PARTO E PUERPERIO
// 8. Gestacao: Periodo + Diagnostico (MERGE + expansao C)
newChapters.push(buildChapter('gestacao', n++, 'Gestação: Diagnóstico, Período e Fisiologia', '#i-calendar',
  chapters['periodo-gestacao'].content + '\n\n' + chapters['diagnostico-gestacao'].content + '\n\n' + EXP_C));

// 9. Pelviologia e Higiene (NOVO — Instrucao G)
newChapters.push(buildChapter('pelviologia-higiene', n++, 'Pelviologia e Higiene da Gestação e Parto', '#i-clipboard', SECAO_G));

// 10. Parto (manter)
newChapters.push(buildChapter('parto', n++, 'Parto: Fisiologia, Estática Fetal e Higiene', '#i-baby', chapters['parto'].content));

// 11. Distocias (manter)
newChapters.push(buildChapter('distocias', n++, 'Distocias e Auxílio ao Parto', '#i-alert', chapters['estatica-distocia'].content));

// 12. Puerperio + Neonatal (manter parto puerperio + add neonatal E)
newChapters.push(buildChapter('puerperio', n++, 'Puerpério, Involução Uterina e Neonato', '#i-heart', `
<h3>Puerpério e Involução Uterina</h3>
<p>O puerpério compreende o período entre a expulsão das membranas fetais e o retorno do aparelho reprodutor às condições pré-gestacionais. A duração varia entre espécies e é influenciada pelo tipo de parto, estado nutricional e lactação.</p>
<div class="sp-prova"><strong>Involução uterina por espécie:</strong> Vaca: 30-50 dias (completa ~45d). Égua: 7-14 dias (muito rápida). Cadela: 4-6 semanas. Porca: 21-28 dias. Ovelha: 25-30 dias.</div>

${EXP_E}
`));

// BLOCO 4 — ANDROLOGIA
// 13. Andrologico + Glandulas (MERGE)
newChapters.push(buildChapter('andrologico', n++, 'Exame Andrológico e Espermiograma', '#i-microscope',
  chapters['andrologico'].content + '\n\n' + chapters['glandulas-semen'].content));

// 14. Patologias do Macho + Impotencias (expandir com D)
newChapters.push(buildChapter('patologias-macho', n++, 'Patologias do Macho e Impotências', '#i-alert',
  chapters['patologias-macho'].content + '\n\n' + EXP_D));

// BLOCO 5 — PATOLOGIA REPRODUTIVA
// 15. Patologias da Femea + Exame Ginecologico (expandir com I)
newChapters.push(buildChapter('patologias-femea', n++, 'Patologias da Fêmea e Exame Ginecológico', '#i-stethoscope',
  EXP_I + '\n\n' + chapters['patologias-femea'].content));

// 16. Patologias da Gestacao + Metabolicos (expandir com M)
newChapters.push(buildChapter('patologias-gestacao', n++, 'Patologias da Gestação', '#i-virus',
  chapters['patologias-gestacao'].content + '\n\n' + SECAO_M));

// 17. Infecciosas (manter)
newChapters.push(buildChapter('infecciosas', n++, 'Doenças Infecciosas da Reprodução', '#i-virus', chapters['infecciosas'].content));

// 18. Freemartinismo (NOVO — Instrucao H)
newChapters.push(buildChapter('freemartinismo', n++, 'Freemartinismo e Anomalias Congênitas', '#i-ban', SECAO_H));

// BLOCO 6 — GLANDULA MAMARIA
// 19. Fisiologia Mamaria (NOVO — Instrucao J)
newChapters.push(buildChapter('fisiologia-mamaria', n++, 'Fisiologia da Glândula Mamária', '#i-heart', SECAO_J));

// BLOCO 7 — BIOTECNOLOGIAS
// 20. Biotecnologias (manter + add K e L)
newChapters.push(buildChapter('biotecnologias', n++, 'Biotecnologias da Reprodução', '#i-settings',
  chapters['biotecnologias'].content + '\n\n' + SECAO_K + '\n\n' + EXP_L));

// COMPLEMENTARES
// 21. Casos Clinicos
newChapters.push(buildChapter('casos-clinicos', n++, 'Casos Clínicos e Questões de Residência', '#i-clipboard', chapters['casos-clinicos'].content));

// BONUS
// 22. Saude Publica
newChapters.push(buildChapter('saude-publica', n++, 'Saúde Pública Veterinária', '#i-hospital', chapters['saude-publica'].content));

// 23. Conhecimentos Gerais
newChapters.push(buildChapter('conhecimentos-gerais', n++, 'Conhecimentos Gerais em Med. Vet.', '#i-stethoscope', chapters['conhecimentos-gerais'].content));

console.log('\nNova estrutura:', newChapters.length, 'capitulos');

// === 4. RECONSTRUIR O HTML ===
const before = html.substring(0, chapStart);
const after = html.substring(chapEnd + '];'.length);

const newArray = 'var CHAPTERS = [\n' + newChapters.join(',\n') + '\n];';

const newHtml = before + newArray + after;

// === 5. ATUALIZAR VERSAO ===
const finalHtml = newHtml.replace(/v4\.0 — 2026/g, 'v5.0 — 2026');

fs.writeFileSync(FILE, finalHtml, 'utf-8');
console.log('\nArquivo atualizado com sucesso!');
console.log('Tamanho:', (finalHtml.length / 1024).toFixed(0), 'KB');
console.log('Linhas:', finalHtml.split('\n').length);
