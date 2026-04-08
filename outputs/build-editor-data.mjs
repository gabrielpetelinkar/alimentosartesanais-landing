import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const outputsDir = '/Users/gabrielpetelinkar/AIOSORIZA/outputs';
const assetsDir = '/Users/gabrielpetelinkar/AIOSORIZA/assets/aulas';

// Get all images
const images = readdirSync(assetsDir).filter(f => /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(f)).sort();

// Get all slots from each aula
const aulaFiles = readdirSync(outputsDir).filter(f => /^aula-\d+.*\.html$/.test(f)).sort();
const slotsData = {};

for (const file of aulaFiles) {
  const html = readFileSync(join(outputsDir, file), 'utf-8');
  const lines = html.split('\n');
  const slots = [];

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    if (line.includes('class="photo-full') || line.includes('class="photo-area') || line.includes('class="photo-half')) {
      // Get current image
      const bgMatch = line.match(/background:url\('([^']+)'\)/);
      let currentImage = 'EMPTY';
      if (bgMatch) {
        currentImage = bgMatch[1].split('/').pop();
      }

      // Find nearest slide comment above
      let slideName = '';
      for (let j = idx; j >= Math.max(0, idx - 15); j--) {
        const m = lines[j].match(/<!-- (SLIDE \d+[^-]*)/);
        if (m) {
          slideName = m[1].trim();
          break;
        }
      }

      slots.push({ line: lineNum, currentImage, slideName });
    }
  });

  if (slots.length > 0) {
    slotsData[file] = slots;
  }
}

// Inject into editor HTML
let editor = readFileSync(join(outputsDir, 'editor-imagens.html'), 'utf-8');
editor = editor.replace(/const ALL_IMAGES = .*?;/, `const ALL_IMAGES = ${JSON.stringify(images)};`);
editor = editor.replace(/const SLOTS_DATA = [\s\S]*?;\n\n/, `const SLOTS_DATA = ${JSON.stringify(slotsData, null, 2)};\n\n`);
writeFileSync(join(outputsDir, 'editor-imagens.html'), editor);

console.log(`✓ Editor built with ${images.length} images and slots for ${Object.keys(slotsData).length} aulas`);
for (const [file, slots] of Object.entries(slotsData)) {
  console.log(`  ${file}: ${slots.length} slots`);
}
