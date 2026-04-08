import { readFileSync, writeFileSync } from 'fs';

const ASSETS = '../assets/aulas';

function setImage(filePath, lineNum, imgFile) {
  const html = readFileSync(filePath, 'utf-8');
  const lines = html.split('\n');
  const line = lines[lineNum - 1];
  if (!line) { console.error(`  Line ${lineNum} not found`); return; }

  const bg = `background:url('${ASSETS}/${imgFile}') center/cover no-repeat !important;`;

  if (line.includes('style="')) {
    lines[lineNum - 1] = line.replace('style="', `style="${bg} `);
  } else {
    lines[lineNum - 1] = line.replace('class="', `style="${bg}" class="`);
  }

  writeFileSync(filePath, lines.join('\n'));
}

const BASE = '/Users/gabrielpetelinkar/AIOSORIZA/outputs';

// AULA 02 — Produtos Extremos (user's photos)
setImage(`${BASE}/aula-02-produtos-extremos.html`, 689, 'jamon-iberico-de-bellota.jpg'); // Slide 4: produto extremo premium
setImage(`${BASE}/aula-02-produtos-extremos.html`, 844, 'queijo_(2).jpg'); // Slide 11: catalisadores de posicionamento
setImage(`${BASE}/aula-02-produtos-extremos.html`, 921, 'the-macallan-reach-de-81-anos-o-uisque-mais-antigo-do-mundo-em-2022-1644435542283_v2_900x506.jpg'); // Slide 15: cliente conhece a marca
setImage(`${BASE}/aula-02-produtos-extremos.html`, 1042, 'entretenimento-tacho-de-cobre-1jpeg-1709135549.jpg'); // Slide 21: reflexão
console.log('✓ aula-02: 4 photo-half preenchidos');

// AULA 03 — Agridoces (user's photos)
setImage(`${BASE}/aula-03-produtos-agridoces.html`, 716, 'Agridoce.jpg'); // Slide 4: insight agridoce
setImage(`${BASE}/aula-03-produtos-agridoces.html`, 784, 'banana-chips-agridoce-01-49af123b3f7012640b17629829045678-640-0.webp'); // Slide 7: frutas regionais
setImage(`${BASE}/aula-03-produtos-agridoces.html`, 879, 'X-Burger.jpg'); // Slide 12: mercado B2B
setImage(`${BASE}/aula-03-produtos-agridoces.html`, 974, 'pote-doce-de-leite-410gr---fundo-branco--1--ypz2ylvadn.webp'); // Slide 17: território
console.log('✓ aula-03: 4 photo-half preenchidos');

// AULA 08 — Narrativa (user's photos)
setImage(`${BASE}/aula-08-narrativa-comunicacao.html`, 720, 'WhatsApp Image 2026-03-23 at 14.58.20.jpeg'); // Slide 5: autenticidade
setImage(`${BASE}/aula-08-narrativa-comunicacao.html`, 873, 'mundo-do-marketing-1.png'); // Slide 12: redes sociais como vitrine
setImage(`${BASE}/aula-08-narrativa-comunicacao.html`, 975, 'WhatsApp Image 2026-03-23 at 14.58.20 (1).jpeg'); // Slide 17: experiências
console.log('✓ aula-08: 3 photo-half preenchidos');

// AULA 14 — Certificação (user's photos)
setImage(`${BASE}/aula-14-certificacao-selos.html`, 693, '2-5_Selos_governamentais.jpg'); // Slide 4: confiança
setImage(`${BASE}/aula-14-certificacao-selos.html`, 905, 'Captura de Tela 2026-03-23 às 16.12.17.png'); // Slide 14: decisão compra
setImage(`${BASE}/aula-14-certificacao-selos.html`, 985, 'Voce-conhece-o-selo-eureciclo-2.png'); // Slide 18: certificações regionais
console.log('✓ aula-14: 3 photo-half preenchidos');

console.log('\\nDone. Remaining empty photo-half need downloads.');
