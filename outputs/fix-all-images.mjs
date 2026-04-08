import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const dir = '/Users/gabrielpetelinkar/AIOSORIZA/outputs';
const assetsRel = '../assets/aulas';

// Image mappings per aula: ordered list matching photo-full/photo-area divs in sequence
const MAPPINGS = {
  'aula-02-produtos-extremos.html': [
    'aula02-queijo-canastra.png',     // 1
    'aula02-cave-barris.jpg',         // 2
    'aula02-queijo-maturado.jpg',     // 3
    'aula02-molho-extremo.png',       // 4
    'aula02-produtor-cave-ia.png',    // 5
    'aula02-stand-feira-ia.png',      // 6
    'aula02-cliente-rotulo-ia.png',   // 7
    'aula02-linha-premium.png',       // 8
    'aula02-cave-barris.jpg',         // 9
  ],
  'aula-03-produtos-agridoces.html': [
    'aula03-composicao-frutas.jpg',
    'aula03-chutney-pote.jpg',
    'aula03-maracuja-cesta.jpg',
    'aula03-hamburguer.jpg',
    'aula03-mel-apimentado.png',
    'aula03-producao-ia.png',
    'aula03-geleia-queijo-ia.png',
  ],
  'aula-04-fermentacao.html': [
    'aula04-potes-fermentacao-ia.png',
    'aula04-composicao-ia.png',
    'aula04-barris-cervejaria.jpg',
    'aula04-potes-fermentados.jpg',
    'aula04-molho-fermentado.png',
    'aula04-maos-produtor-ia.png',
    'aula04-prateleira-ia.png',
  ],
  'aula-05-experiencia-sensorial.html': [
    'aula05-molho-servindo.jpg',
    'aula05-molhos-vibrantes.png',
    'aula05-embalagem-ia.png',
    'aula05-molho-vermelho.png',
    'aula05-pilao-pimentas.jpg',
    'aula05-frasco-ia.png',
    'aula05-degustacao-ia.png',
    'aula05-ingredientes-ia.png',
  ],
  'aula-06-nicho-exclusividade.html': [
    'aula06-exclusivo-ia.png',
    'aula06-limitada-ia.png',
    'aula06-edicao-limitada.jpg',
    'aula06-nicho-ia.png',
    'aula06-sazonal-raro.jpg',
    'aula06-feira-interacao.jpg',
    'aula06-serie-ia.png',
    'aula06-personalizado-ia.png',
    'aula06-produtor-ia.png',
  ],
  'aula-07-embalagem.html': [
    'aula07-prateleira-gourmet.jpg',
    'aula07-vidros-ia.png',
    'aula07-maos-caixa.jpg',
    'aula07-rotulos-ia.png',
    'aula07-maos-madeira.jpg',
    'aula07-mesa-ia.png',
  ],
  'aula-08-narrativa-comunicacao.html': [
    'aula08-filmando-smartphone.jpg',
    'aula08-produtor-camera-ia.png',
    'aula08-foto-comida.jpg',
    'aula08-instagram-ia.png',
    'aula08-divulgacao.webp',
    'aula08-mesa-visual-ia.png',
    'aula08-por-do-sol-ia.png',
  ],
  'aula-09-eventos-degustacoes.html': [
    'aula09-degustacao-ia.png',
    'aula09-estande-feira.jpg',
    'aula09-gabriel-feira.jpg',
    'aula09-workshop-ia.png',
    'aula09-cartoes-ia.png',
    'aula09-degustacao-guiada.jpg',
    'aula09-feira-entardecer-ia.png',
  ],
  'aula-10-harmonizacao-versatilidade.html': [
    'aula10-mesa-completa.jpg',
    'aula10-molhos-churrasco.png',
    'aula10-gabriel-2025.jpg',
    'aula10-tabua-harmonizacao.jpg',
    'aula10-charcuterie.jpg',
    'aula10-mesa-completa.jpg',
  ],
  'aula-11-educacao-consumidor.html': [
    'aula09-degustacao-ia.png',
    'aula11-explicando-processo.jpg',
    'aula11-lendo-rotulo.jpg',
    'aula11-rotulo-ia.png',
    'aula11-campo-frasco-ia.png',
    'aula09-workshop-ia.png',
    'aula11-grupo-ia.png',
  ],
  'aula-12-colaboracao-parcerias.html': [
    'aula12-maos-ia.png',
    'aula12-dois-produtores.jpg',
    'aula03-mel-apimentado.png',
    'aula12-cocriacao-ia.png',
    'aula02-stand-feira-ia.png',
    'aula12-grupo-celebrando.jpg',
  ],
  'aula-13-sustentabilidade.html': [
    'aula01-paisagem-ia.png',
    'aula07-prateleira-gourmet.jpg',
    'aula13-embalagem-eco.jpg',
    'aula13-sustentavel-ia.png',
    'aula13-comunidade-rural.jpg',
    'aula01-paisagem-ia.png',
  ],
  'aula-14-certificacao-selos.html': [
    'aula11-rotulo-ia.png',
    'aula14-selo-arte-ia.png',
    'aula13-comunidade-rural.jpg',
    'aula14-analise-ia.png',
    'aula12-grupo-celebrando.jpg',
    'aula14-queijos-emporio.jpg',
    'aula09-feira-entardecer-ia.png',
  ],
  'aula-15-profissionalizacao-consistencia.html': [
    'aula13-sustentavel-ia.png',
    'aula15-oficina-organizada.jpg',
    'aula15-uniformes-ia.png',
    'aula15-fichas-ia.png',
    'aula15-identidade-visual.jpg',
    'aula13-comunidade-rural.jpg',
    'aula11-grupo-ia.png',
    'aula08-por-do-sol-ia.png',
    'aula09-feira-entardecer-ia.png',
  ],
};

for (const [filename, images] of Object.entries(MAPPINGS)) {
  const filePath = join(dir, filename);
  let html;
  try {
    html = readFileSync(filePath, 'utf-8');
  } catch (e) {
    console.error(`✗ ${filename}: not found`);
    continue;
  }

  // Find ALL photo-full and photo-area divs in order of appearance
  const divRegex = /<div\b[^>]*class="(photo-full|photo-area)[^"]*"[^>]*>/g;
  const divMatches = [...html.matchAll(divRegex)];

  if (divMatches.length === 0) {
    console.log(`⚠ ${filename}: no photo divs found`);
    continue;
  }

  let replaced = 0;
  const usedCount = Math.min(divMatches.length, images.length);

  // Process in reverse order to preserve indices
  for (let i = usedCount - 1; i >= 0; i--) {
    const match = divMatches[i];
    const imgFile = images[i];
    const imgUrl = `${assetsRel}/${imgFile}`;
    const divTag = match[0];

    // Skip if already has a background:url or background-image:url
    if (divTag.includes('background:url(') || divTag.includes('background-image:url(')) {
      replaced++; // already done
      continue;
    }

    let newDivTag;
    const bgStyle = `background:url('${imgUrl}') center/cover no-repeat !important;`;

    if (divTag.includes('style="')) {
      // Has existing style — prepend background to it
      newDivTag = divTag.replace('style="', `style="${bgStyle} `);
    } else {
      // No style — add one before class
      newDivTag = divTag.replace('class="', `style="${bgStyle}" class="`);
    }

    html = html.substring(0, match.index) + newDivTag + html.substring(match.index + divTag.length);
    replaced++;
  }

  writeFileSync(filePath, html);
  console.log(`✓ ${filename}: ${replaced}/${divMatches.length} photo divs with images (${images.length} mapped)`);
}
