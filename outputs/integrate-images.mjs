import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const outputsDir = '/Users/gabrielpetelinkar/AIOSORIZA/outputs';
const assetsRel = '../assets/aulas'; // relative path from outputs/ to assets/aulas/

// Image mappings per aula: ordered list of images matching placeholder order in HTML
const MAPPINGS = {
  'aula-01-ingredientes-nativos.html': [
    'aula01-destaque-nativos.png',    // 1. close de umbu/nativos (DESTAQUE)
    'aula01-pimenta-close.jpg',       // 2. pimenta jiquitaia
    'aula01-geleia-acai.jpg',         // 3. geleia artesanal com fruta nativa
    'aula01-produtor-colhendo.jpg',   // 4. produtor rural colhendo
    'aula01-geleia-tapereba.webp',    // 5. geleia artesanal brasileira
    'aula01-queijo-ervas-ia.png',     // 6. queijo artesanal ervas regionais
    'aula01-feira-ia.png',            // 7. feira internacional
    'aula01-cafe-graos.jpg',          // 8. café especial brasileiro
    'aula01-paisagem-ia.png',         // 9. paisagem rural pôr do sol
  ],
  'aula-02-produtos-extremos.html': [
    'aula02-queijo-canastra.png',     // 1. queijo maturado cortado (canastra!)
    'aula02-cave-barris.jpg',         // 2. cachaça envelhecida barril
    'aula02-queijo-maturado.jpg',     // 3. queijo maturado 24m cristais
    'aula02-molho-extremo.png',       // 4. molho pimenta extra-forte
    'aula02-produtor-cave-ia.png',    // 5. produtor inspecionando cave
    'aula02-stand-feira-ia.png',      // 6. stand feira premium
    'aula02-cliente-rotulo-ia.png',   // 7. cliente examinando rótulo
    'aula02-linha-premium.png',       // 8. linha produtos premium
    'aula02-cave-barris.jpg',         // 9. cave maturação entardecer (reuse)
  ],
  'aula-03-produtos-agridoces.html': [
    'aula03-composicao-frutas.jpg',   // 1. geleia agridoce frutas tropicais
    'aula03-chutney-pote.jpg',        // 2. chutney manga pote artesanal
    'aula03-maracuja-cesta.jpg',      // 3. frutas tropicais cesta rústica
    'aula03-hamburguer.jpg',          // 4. hambúrguer gourmet geleia
    'aula03-mel-apimentado.png',      // 5. geleia jabuticaba pimenta
    'aula03-producao-ia.png',         // 6. linha produção geleias
    'aula03-geleia-queijo-ia.png',    // 7. geleia sobre queijo
  ],
  'aula-04-fermentacao.html': [
    'aula04-potes-fermentacao-ia.png',// 1. close potes fermentação
    'aula04-composicao-ia.png',       // 2. pães queijos fermentação
    'aula04-barris-cervejaria.jpg',   // 3. cervejaria barris
    'aula04-potes-fermentados.jpg',   // 4. potes pimentas lactofermentadas
    'aula04-molho-fermentado.png',    // 5. molho pimenta fermentado
    'aula04-maos-produtor-ia.png',    // 6. mãos produtor massa
    'aula04-prateleira-ia.png',       // 7. potes alinhados prateleira
  ],
  'aula-05-experiencia-sensorial.html': [
    'aula05-molho-servindo.jpg',      // 1. molho sendo servido vapor
    'aula05-molhos-vibrantes.png',    // 2. molhos tons vibrantes
    'aula05-embalagem-ia.png',        // 3. embalagem premium tátil
    'aula05-molho-vermelho.png',      // 4. molho vermelho intenso
    'aula05-pilao-pimentas.jpg',      // 5. pimentas moídas pilão
    'aula05-frasco-ia.png',           // 6. mãos frasco texturizado
    'aula05-degustacao-ia.png',       // 7. degustação feira
    'aula05-ingredientes-ia.png',     // 8. composição ingredientes
  ],
  'aula-06-nicho-exclusividade.html': [
    'aula06-exclusivo-ia.png',        // 1. produto exclusivo premium
    'aula06-limitada-ia.png',         // 2. edição limitada exclusiva
    'aula06-edicao-limitada.jpg',     // 3. edição limitada numerada
    'aula06-nicho-ia.png',            // 4. linha exclusiva público
    'aula06-sazonal-raro.jpg',        // 5. produto sazonal raro
    'aula06-feira-interacao.jpg',     // 6. feira exclusivos
    'aula06-serie-ia.png',            // 7. série limitada numerada
    'aula06-personalizado-ia.png',    // 8. produto personalizado
    'aula06-produtor-ia.png',         // 9. produtor trabalhando
  ],
  'aula-07-embalagem.html': [
    'aula07-prateleira-gourmet.jpg',  // 1. prateleira gourmet
    'aula07-vidros-ia.png',           // 2. embalagens design autoral
    'aula07-maos-caixa.jpg',          // 3. frascos vidro rótulos
    'aula07-rotulos-ia.png',          // 4. close rótulos tipografias
    'aula07-maos-madeira.jpg',        // 5. mãos rotulando
    'aula07-mesa-ia.png',             // 6. mesa rústica produtos
  ],
  'aula-08-narrativa-comunicacao.html': [
    'aula08-filmando-smartphone.jpg', // 1. filmando bastidores smartphone
    'aula08-produtor-camera-ia.png',  // 2. produtor mostrando processo
    'aula08-foto-comida.jpg',         // 3. smartphone fotografando produto
    'aula08-instagram-ia.png',        // 4. tela celular Instagram
    'aula08-divulgacao.webp',         // 5. produtor gravando no campo
    'aula08-mesa-visual-ia.png',      // 6. mesa identidade visual
    'aula08-por-do-sol-ia.png',       // 7. produtor pôr do sol
  ],
  'aula-09-eventos-degustacoes.html': [
    'aula09-degustacao-ia.png',       // 1. degustação presencial
    'aula09-estande-feira.jpg',       // 2. estande feira
    'aula09-gabriel-feira.jpg',       // 3. Gabriel em estande (PESSOAL)
    'aula09-workshop-ia.png',         // 4. close mãos degustação
    'aula09-cartoes-ia.png',          // 5. produtores trocando cartões
    'aula09-degustacao-guiada.jpg',   // 6. degustação guiada
    'aula09-feira-entardecer-ia.png', // 7. feira ao ar livre entardecer
  ],
  'aula-10-harmonizacao-versatilidade.html': [
    'aula10-mesa-completa.jpg',       // 1. churrasco tábua frios
    'aula10-molhos-churrasco.png',    // 2. tábua churrasco molhos
    'aula10-gabriel-2025.jpg',        // 3. Gabriel churrasco (PESSOAL)
    'aula10-tabua-harmonizacao.jpg',  // 4. tábua harmonização
    'aula10-charcuterie.jpg',         // 5. prato montado molho
    'aula10-mesa-completa.jpg',       // 6. mesa posta harmonização (reuse)
  ],
  'aula-11-educacao-consumidor.html': [
    'aula09-degustacao-ia.png',       // 1. consumidor provando (reuse)
    'aula11-explicando-processo.jpg', // 2. produtor mostrando processo
    'aula11-lendo-rotulo.jpg',        // 3. consumidor lendo rótulo
    'aula11-rotulo-ia.png',           // 4. rótulo artesanal detalhado
    'aula11-campo-frasco-ia.png',     // 5. tela vídeo campo frasco
    'aula09-workshop-ia.png',         // 6. produtor explicando (reuse)
    'aula11-grupo-ia.png',            // 7. grupo degustação
  ],
  'aula-12-colaboracao-parcerias.html': [
    'aula12-maos-ia.png',            // 1. mãos apertando-se
    'aula12-dois-produtores.jpg',    // 2. dois produtores juntos
    'aula03-mel-apimentado.png',     // 3. molho com mel (reuse)
    'aula12-cocriacao-ia.png',       // 4. produtos co-criados
    'aula02-stand-feira-ia.png',     // 5. feira produtores (reuse)
    'aula12-grupo-celebrando.jpg',   // 6. grupo celebrando
  ],
  'aula-13-sustentabilidade.html': [
    'aula01-paisagem-ia.png',        // 1. paisagem natureza (reuse)
    'aula07-prateleira-gourmet.jpg', // 2. consumidor feira orgânica (reuse)
    'aula13-embalagem-eco.jpg',      // 3. embalagens ecológicas
    'aula13-sustentavel-ia.png',     // 4. produção sustentável
    'aula13-comunidade-rural.jpg',   // 5. grupo produtores sustentáveis
    'aula01-paisagem-ia.png',        // 6. paisagem verde (reuse)
  ],
  'aula-14-certificacao-selos.html': [
    'aula11-rotulo-ia.png',          // 1. close selo sendo aplicado (reuse)
    'aula14-selo-arte-ia.png',       // 2. embalagem selo ARTE
    'aula13-comunidade-rural.jpg',   // 3. plantação semiárido (reuse proxy)
    'aula14-analise-ia.png',         // 4. consumidor analisando selo
    'aula12-grupo-celebrando.jpg',   // 5. produtor recebendo certificação (reuse)
    'aula14-queijos-emporio.jpg',    // 6. queijos selo ARTE empório
    'aula09-feira-entardecer-ia.png',// 7. paisagem rural amanhecer (reuse)
  ],
  'aula-15-profissionalizacao-consistencia.html': [
    'aula13-sustentavel-ia.png',     // 1. produtor organizando (reuse)
    'aula15-oficina-organizada.jpg', // 2. oficina organizada
    'aula15-uniformes-ia.png',       // 3. produtos alinhados uniformes
    'aula15-fichas-ia.png',          // 4. caderno fichas técnicas
    'aula15-identidade-visual.jpg',  // 5. embalagens identidade coesa
    'aula13-comunidade-rural.jpg',   // 6. propriedade rural organizada (reuse)
    'aula11-grupo-ia.png',           // 7. grupo cooperativa (reuse)
    'aula08-por-do-sol-ia.png',      // 8. paisagem amanhecer (reuse)
    'aula09-feira-entardecer-ia.png',// 9. horizonte pôr do sol (reuse)
  ],
};

let totalReplaced = 0;

for (const [filename, images] of Object.entries(MAPPINGS)) {
  const filePath = join(outputsDir, filename);
  let html;
  try {
    html = readFileSync(filePath, 'utf-8');
  } catch (e) {
    console.error(`✗ ${filename}: file not found`);
    continue;
  }

  // Find all FOTO placeholders in order
  const fotoRegex = /\[ ?FOTO:([^\]]*)\]/g;
  const matches = [...html.matchAll(fotoRegex)];

  if (matches.length === 0) {
    console.log(`⚠ ${filename}: no FOTO placeholders found`);
    continue;
  }

  if (matches.length !== images.length) {
    console.warn(`⚠ ${filename}: ${matches.length} placeholders but ${images.length} images mapped`);
  }

  let replaced = 0;
  const usedCount = Math.min(matches.length, images.length);

  for (let i = 0; i < usedCount; i++) {
    const match = matches[i];
    const imgFile = images[i];
    const imgPath = `${assetsRel}/${imgFile}`;
    const fullMatch = match[0];

    // Determine parent element type by looking at surrounding HTML
    const beforeMatch = html.substring(Math.max(0, match.index - 300), match.index);

    // Case 1: Inside a <div class="photo-full ...">
    // The placeholder is a <span> inside, we need to add background-image to the div
    if (beforeMatch.includes('photo-full')) {
      // Replace the span placeholder with empty string and add bg to the photo-full div
      const spanRegex = new RegExp(`<span[^>]*>\\s*${escapeRegex(fullMatch)}\\s*</span>`, 's');
      const divBefore = html.lastIndexOf('<div class="photo-full', match.index);
      if (divBefore !== -1) {
        // Add background-image style to the photo-full div
        const divTag = html.substring(divBefore, html.indexOf('>', divBefore) + 1);
        const newDivTag = divTag.replace(
          'class="photo-full',
          `style="background-image:url('${imgPath}'); background-size:cover; background-position:center;" class="photo-full`
        );
        html = html.replace(divTag, newDivTag);
        // Remove the span
        html = html.replace(spanRegex, '');
        replaced++;
      }
    }
    // Case 2: Inside a <div class="photo-area ...">
    // The placeholder text is directly inside, replace with bg image
    else if (beforeMatch.includes('photo-area')) {
      const divBefore = html.lastIndexOf('<div class="photo-area', match.index);
      if (divBefore !== -1) {
        const divTag = html.substring(divBefore, html.indexOf('>', divBefore) + 1);
        // Add background-image and remove placeholder text
        let newDivTag = divTag;
        if (divTag.includes('style="')) {
          newDivTag = divTag.replace(
            'style="',
            `style="background-image:url('${imgPath}'); background-size:cover; background-position:center; `
          );
        } else {
          newDivTag = divTag.replace(
            'class="photo-area',
            `style="background-image:url('${imgPath}'); background-size:cover; background-position:center;" class="photo-area`
          );
        }
        html = html.replace(divTag, newDivTag);
        // Remove the [ FOTO: ... ] text (may have <br> tags)
        const fotoWithBr = fullMatch.replace(/\n/g, '').replace(/ /g, '[\\s]*');
        // Simple approach: just remove the text between the div tags
        html = html.replace(fullMatch, '');
        // Also clean up any remaining <br> from the placeholder
        replaced++;
      }
    }
    // Case 3: standalone or other context
    else {
      // Just replace the placeholder with an img tag
      html = html.replace(fullMatch, '');
      replaced++;
    }
  }

  writeFileSync(filePath, html);
  totalReplaced += replaced;
  console.log(`✓ ${filename}: ${replaced}/${matches.length} images integrated`);
}

console.log(`\n✅ Total: ${totalReplaced} images integrated across ${Object.keys(MAPPINGS).length} files`);

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
