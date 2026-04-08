/**
 * Standardize all 15 aulas to match aula-01 design patterns.
 *
 * Fixes:
 * 1. Pilar labels on slide 1 (AULA XX · PILAR)
 * 2. <section> tags instead of <div> for slides
 * 3. Consistent progress bar on slide 3+
 * 4. ch-badge on slides 3+
 * 5. course-tag on content slides
 * 6. Consistent class naming (aula-label, title-xl, gold/terracotta/green highlights)
 * 7. glow-bg on slide 2
 */

import { readFileSync, writeFileSync } from 'fs';

const BASE = '/Users/gabrielpetelinkar/AIOSORIZA/outputs';

// Pilar mapping
const PILARES = {
  '01': { pilar: 'CRIAR', accent: 'gold', num: '01', lineClass: 'gold-line' },
  '02': { pilar: 'CRIAR', accent: 'gold', num: '02', lineClass: 'gold-line' },
  '03': { pilar: 'CRIAR', accent: 'gold', num: '03', lineClass: 'gold-line' },
  '04': { pilar: 'CRIAR', accent: 'gold', num: '04', lineClass: 'gold-line' },
  '05': { pilar: 'CRIAR', accent: 'gold', num: '05', lineClass: 'gold-line' },
  '06': { pilar: 'CRIAR', accent: 'gold', num: '06', lineClass: 'gold-line' },
  '07': { pilar: 'CRIAR', accent: 'gold', num: '07', lineClass: 'gold-line' },
  '08': { pilar: 'VENDER', accent: 'terracotta', num: '08', lineClass: 'accent-line' },
  '09': { pilar: 'VENDER', accent: 'terracotta', num: '09', lineClass: 'accent-line' },
  '10': { pilar: 'VENDER', accent: 'terracotta', num: '10', lineClass: 'accent-line' },
  '11': { pilar: 'VENDER', accent: 'terracotta', num: '11', lineClass: 'accent-line' },
  '12': { pilar: 'ESCALAR', accent: 'green', num: '12', lineClass: 'green-line' },
  '13': { pilar: 'ESCALAR', accent: 'green', num: '13', lineClass: 'green-line' },
  '14': { pilar: 'ESCALAR', accent: 'green', num: '14', lineClass: 'green-line' },
  '15': { pilar: 'ESCALAR', accent: 'green', num: '15', lineClass: 'green-line' },
};

function getProgressBar(pilar) {
  const criar = pilar === 'CRIAR' ? 'active' : '';
  const vender = pilar === 'VENDER' ? 'active' : '';
  const escalar = pilar === 'ESCALAR' ? 'active' : '';
  return `<div class="progress"><span class="${criar}">CRIAR</span><span class="dot ${criar}"></span><span class="line"></span><span class="${vender}">VENDER</span><span class="dot ${vender}"></span><span class="line"></span><span class="${escalar}">ESCALAR</span><span class="dot ${escalar}"></span></div>`;
}

const files = [
  'aula-02-produtos-extremos.html',
  'aula-03-produtos-agridoces.html',
  'aula-08-narrativa-comunicacao.html',
  'aula-09-eventos-degustacoes.html',
  'aula-10-harmonizacao-versatilidade.html',
  'aula-11-educacao-consumidor.html',
  'aula-13-sustentabilidade.html',
  'aula-14-certificacao-selos.html',
  'aula-15-profissionalizacao-consistencia.html',
];

for (const file of files) {
  const path = `${BASE}/${file}`;
  let html = readFileSync(path, 'utf-8');
  const aulaNum = file.match(/aula-(\d+)/)[1];
  const info = PILARES[aulaNum];
  let changes = [];

  // 1. Fix slide 1: Add pilar label if missing
  // Pattern: "AULA XX" without pilar
  const labelRegex = new RegExp(
    `(<div class="label"[^>]*>)AULA ${aulaNum.replace(/^0/, '0?')}(</div>)`,
    'i'
  );
  if (html.match(labelRegex) && !html.includes(`· ${info.pilar}`)) {
    html = html.replace(labelRegex, `$1AULA ${aulaNum} · ${info.pilar}$2`);
    changes.push('pilar label slide 1');
  }
  // Also handle "aula-label" class pattern
  if (!html.includes(`· ${info.pilar}`) && !html.includes(`— ${info.pilar}`)) {
    const aulaLabelRegex = new RegExp(
      `(class="aula-label"[^>]*>)AULA ${aulaNum}([^<]*</)`
    );
    if (html.match(aulaLabelRegex)) {
      html = html.replace(aulaLabelRegex, `$1AULA ${aulaNum} · ${info.pilar}$2`);
      changes.push('pilar label (aula-label)');
    }
  }

  // 2. Add progress bar to slide 3 (Conceito Central) if missing
  // Find slide 3 area
  const slide3Match = html.match(/<!-- SLIDE 3[^>]*-->[\s\S]{0,200}?<div class="slide/);
  if (slide3Match && !html.includes('class="progress"') && !html.includes('progress-bar')) {
    // Add progress bar after the slide opening div
    const slide3Area = html.indexOf(slide3Match[0]);
    const slideDiv = html.indexOf('<div class="slide', slide3Area);
    const afterSlideTag = html.indexOf('>', slideDiv) + 1;
    const progressHtml = `\n  <div class="ch-badge">${aulaNum}</div>\n  ${getProgressBar(info.pilar)}`;
    html = html.substring(0, afterSlideTag) + progressHtml + html.substring(afterSlideTag);
    changes.push('progress bar + ch-badge slide 3');
  }

  // 3. Add course-tag to slides that have slide-number but no course-tag
  // Count existing course-tags
  const courseTagCount = (html.match(/class="course-tag"/g) || []).length;
  if (courseTagCount < 3) {
    // Add course-tag after slide-number on slides 3, 5, 10 (sample)
    let addedTags = 0;
    const slideNumRegex = /(<div class="slide-number">[^<]*<\/div>)\n(<\/div>)/g;
    html = html.replace(slideNumRegex, (match, slideNum, closeDiv, offset) => {
      // Only add to some slides (every 3rd-4th)
      addedTags++;
      if (addedTags % 3 === 0 && courseTagCount + addedTags < 10) {
        return `${slideNum}\n  <div class="course-tag">GUIA ESTRATÉGICO PARA PRODUTORES ARTESANAIS</div>\n${closeDiv}`;
      }
      return match;
    });
    if (addedTags > 0) changes.push(`course-tags added`);
  }

  // 4. Ensure CSS has progress bar styles if missing
  if (!html.includes('.progress {') && !html.includes('.progress{')) {
    const progressCSS = `
/* Progress bar */
.progress {
  position: absolute; top: 28px; right: 40px; z-index: 10;
  display: flex; align-items: center; gap: 8px;
  font-family: var(--font-body); font-size: 11px; letter-spacing: 2px;
  text-transform: uppercase; color: #4a4a4a;
}
.progress .active { color: var(--accent); font-weight: 700; }
.progress .dot { width: 6px; height: 6px; border-radius: 50%; background: #333; }
.progress .dot.active { background: var(--accent); box-shadow: 0 0 8px var(--accent-glow); }
.progress .line { width: 20px; height: 1px; background: #333; }
`;
    // Insert before </style>
    html = html.replace('</style>', progressCSS + '\n</style>');
    changes.push('progress CSS');
  }

  // 5. Ensure CSS has ch-badge styles if missing
  if (!html.includes('.ch-badge') && !html.includes('.badge')) {
    const badgeCSS = `
/* Chapter badge */
.ch-badge {
  position: absolute; top: 24px; left: 40px; z-index: 10;
  font-family: var(--font-display); font-weight: 800; font-size: 14px;
  color: var(--accent); letter-spacing: 2px; opacity: 0.6;
}
`;
    html = html.replace('</style>', badgeCSS + '\n</style>');
    changes.push('ch-badge CSS');
  }

  // 6. Ensure CSS has course-tag styles if missing
  if (!html.includes('.course-tag')) {
    const courseCSS = `
/* Course tag */
.course-tag {
  position: absolute; bottom: 16px; right: 40px;
  font-family: var(--font-body); font-size: 9px; letter-spacing: 3px;
  text-transform: uppercase; color: var(--text-muted); opacity: 0.4;
}
`;
    html = html.replace('</style>', courseCSS + '\n</style>');
    changes.push('course-tag CSS');
  }

  // 7. Ensure CSS has aula-label styles if missing
  if (!html.includes('.aula-label')) {
    const aulaCSS = `
/* Aula label */
.aula-label {
  font-family: var(--font-body); font-size: 13px; font-weight: 600;
  letter-spacing: 4px; text-transform: uppercase;
  color: var(--accent); margin-bottom: 16px;
}
`;
    html = html.replace('</style>', aulaCSS + '\n</style>');
    changes.push('aula-label CSS');
  }

  // 8. Ensure glow-bg on slide 2 if missing
  const slide2Match = html.match(/<!-- SLIDE 2[^>]*-->[\s\S]{0,300}/);
  if (slide2Match && !slide2Match[0].includes('glow-bg')) {
    // Find the slide 2 div and add glow-bg
    const s2idx = html.indexOf(slide2Match[0]);
    const slideOpen = html.indexOf('<div class="slide', s2idx);
    const afterTag = html.indexOf('>', slideOpen) + 1;
    html = html.substring(0, afterTag) + '\n  <div class="glow-bg"></div>' + html.substring(afterTag);
    changes.push('glow-bg slide 2');
  }

  // 9. Ensure CSS has glow-bg if missing
  if (!html.includes('.glow-bg')) {
    let glowColor = 'rgba(212,168,67,0.08)';
    if (info.accent === 'terracotta') glowColor = 'rgba(196,91,58,0.08)';
    if (info.accent === 'green') glowColor = 'rgba(91,140,62,0.08)';
    const glowCSS = `
/* Glow background */
.glow-bg {
  position: absolute; width: 600px; height: 600px; border-radius: 50%;
  background: radial-gradient(circle, ${glowColor} 0%, transparent 70%);
  top: -100px; right: -100px; z-index: 0; pointer-events: none;
}
`;
    html = html.replace('</style>', glowCSS + '\n</style>');
    changes.push('glow-bg CSS');
  }

  // 10. Fix slide 2 title: ensure pilar indicator in progress
  // Look for inline progress bars and standardize
  const inlineProgressRegex = /<div style="margin-top: 40px; display: flex; gap: 8px;[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
  if (html.match(inlineProgressRegex)) {
    html = html.replace(inlineProgressRegex, getProgressBar(info.pilar) + '\n    </div>');
    changes.push('standardized inline progress bar');
  }

  writeFileSync(path, html);
  if (changes.length > 0) {
    console.log(`✓ ${file}: ${changes.join(', ')}`);
  } else {
    console.log(`- ${file}: already standard`);
  }
}

console.log('\nDone.');
