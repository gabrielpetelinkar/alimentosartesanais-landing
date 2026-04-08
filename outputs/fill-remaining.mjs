import { readFileSync, writeFileSync } from 'fs';

const ASSETS = '../assets/aulas';
const BASE = '/Users/gabrielpetelinkar/AIOSORIZA/outputs';

function setImage(filePath, lineNum, imgFile) {
  const html = readFileSync(filePath, 'utf-8');
  const lines = html.split('\n');
  const line = lines[lineNum - 1];
  if (!line) { console.error(`  Line ${lineNum} not found in ${filePath}`); return; }
  if (line.includes('background:url(')) { console.log(`  Skip L${lineNum} (already has image)`); return; }

  const bg = `background:url('${ASSETS}/${imgFile}') center/cover no-repeat !important;`;
  if (line.includes('style="')) {
    lines[lineNum - 1] = line.replace('style="', `style="${bg} `);
  } else {
    lines[lineNum - 1] = line.replace('class="', `style="${bg}" class="`);
  }
  writeFileSync(filePath, lines.join('\n'));
}

// Aula 09
setImage(`${BASE}/aula-09-eventos-degustacoes.html`, 667, 'aula09-experiencia-feira.jpg');
setImage(`${BASE}/aula-09-eventos-degustacoes.html`, 841, 'aula09-conexao-cliente.jpg');
setImage(`${BASE}/aula-09-eventos-degustacoes.html`, 921, 'aula09-networking.jpg');
console.log('✓ aula-09');

// Aula 10
setImage(`${BASE}/aula-10-harmonizacao-versatilidade.html`, 649, 'aula10-mesa-produto.jpg');
setImage(`${BASE}/aula-10-harmonizacao-versatilidade.html`, 839, 'aula10-educativo.jpg');
setImage(`${BASE}/aula-10-harmonizacao-versatilidade.html`, 919, 'aula10-premium.jpg');
console.log('✓ aula-10');

// Aula 11
setImage(`${BASE}/aula-11-educacao-consumidor.html`, 676, 'aula11-consumidor-perfil.jpg');
setImage(`${BASE}/aula-11-educacao-consumidor.html`, 777, 'aula11-mercado.jpg');
setImage(`${BASE}/aula-11-educacao-consumidor.html`, 912, 'aula11-confianca.jpg');
setImage(`${BASE}/aula-11-educacao-consumidor.html`, 1177, 'aula11-reflexao.jpg');
console.log('✓ aula-11');

// Aula 13
setImage(`${BASE}/aula-13-sustentabilidade.html`, 677, 'aula13-consumidor-consciente.jpg');
setImage(`${BASE}/aula-13-sustentabilidade.html`, 818, 'aula13-mercado-sustentavel.jpg');
setImage(`${BASE}/aula-13-sustentabilidade.html`, 922, 'aula13-acoes-sustentaveis.jpg');
setImage(`${BASE}/aula-13-sustentabilidade.html`, 1032, 'aula13-reflexao-natureza.jpg');
console.log('✓ aula-13');

// Aula 15
setImage(`${BASE}/aula-15-profissionalizacao-consistencia.html`, 737, 'aula15-visao-negocio.jpg');
setImage(`${BASE}/aula-15-profissionalizacao-consistencia.html`, 944, 'aula15-processos.jpg');
setImage(`${BASE}/aula-15-profissionalizacao-consistencia.html`, 1020, 'aula15-marca.jpg');
setImage(`${BASE}/aula-15-profissionalizacao-consistencia.html`, 1165, 'aula15-gestao-territorio.jpg');
console.log('✓ aula-15');

console.log('\nDone! All 32 photo-half slots filled.');
