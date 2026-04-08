import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const files = fs.readdirSync(__dirname)
  .filter(f => f.startsWith('aula-') && f.endsWith('.html'))
  .sort();

// Elements that should NOT get periods (titles, labels, numbers, navigation)
const NO_PERIOD_CLASSES = [
  'label', 'title-huge', 'title-lg', 'number-huge',
  'course-tag', 'slide-number', 'caption', 'marker', 'item-title'
];

// Punctuation that counts as "already punctuated"
const ENDS_WITH_PUNCT = /[.!?;:—…»")\]]$/;
// ALL CAPS text (transitions, headers) — no period needed
const ALL_CAPS = /^[A-ZÀÁÂÃÉÊÍÓÔÕÚÇ0-9\s\-—\/.,!?:;()+<>&;#%$@'"]+$/;
// Photo placeholder
const PHOTO_PLACEHOLDER = /\[\s*FOTO:/;

let totalFixes = 0;

for (const file of files) {
  const filePath = path.join(__dirname, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  let fixes = 0;

  // ─────────────────────────────────────────────────────────────
  // PATTERN 1: body-text / item-desc / subtitle content missing period
  // e.g. <div class="body-text">Some text without period</div>
  // e.g. <div class="item-desc">Some text without period</div>
  // ─────────────────────────────────────────────────────────────
  html = html.replace(
    /(<div class="(?:body-text|item-desc|subtitle)"[^>]*>)([\s\S]*?)(<\/div>)/g,
    (match, open, content, close) => {
      if (PHOTO_PLACEHOLDER.test(content)) return match;
      const trimmed = content.trim();
      if (!trimmed || trimmed.length < 5) return match;
      if (ENDS_WITH_PUNCT.test(trimmed)) return match;
      if (ALL_CAPS.test(trimmed)) return match;

      // Check if ends with </span> — need to add period inside span
      if (trimmed.endsWith('</span>')) {
        const fixed = content.replace(/(<\/span>)(\s*)$/, '.$1$2');
        fixes++;
        return open + fixed + close;
      }

      // Add period before closing tag
      const fixed = content.replace(/(\S)(\s*)$/, '$1.$2');
      fixes++;
      return open + fixed + close;
    }
  );

  // ─────────────────────────────────────────────────────────────
  // PATTERN 2: Number slide descriptions (font-weight: 500/600, font-size: 20-22px)
  // These are the explanatory text under big numbers
  // ─────────────────────────────────────────────────────────────
  html = html.replace(
    /(<div style="[^"]*font-weight:\s*(?:500|600)[^"]*font-size:\s*(?:1[89]|2[0-2])px[^"]*">)([\s\S]*?)(<\/div>)/g,
    (match, open, content, close) => {
      const trimmed = content.trim();
      if (!trimmed || trimmed.length < 10) return match;
      if (ENDS_WITH_PUNCT.test(trimmed)) return match;
      if (ALL_CAPS.test(trimmed)) return match;
      if (PHOTO_PLACEHOLDER.test(content)) return match;

      if (trimmed.endsWith('</span>')) {
        const fixed = content.replace(/(<\/span>)(\s*)$/, '.$1$2');
        fixes++;
        return open + fixed + close;
      }
      const fixed = content.replace(/(\S)(\s*)$/, '$1.$2');
      fixes++;
      return open + fixed + close;
    }
  );

  // ─────────────────────────────────────────────────────────────
  // PATTERN 3: Concept / insight text (font-weight: 700, font-size: 34-38px)
  // Main content sentences in centered/split slides
  // ─────────────────────────────────────────────────────────────
  html = html.replace(
    /(<div style="[^"]*font-weight:\s*700[^"]*font-size:\s*(?:3[0-9]|4[0-2])px[^"]*">)([\s\S]*?)(<\/div>)/g,
    (match, open, content, close) => {
      const trimmed = content.trim();
      if (!trimmed || trimmed.length < 10) return match;
      if (ENDS_WITH_PUNCT.test(trimmed)) return match;
      if (ALL_CAPS.test(trimmed)) return match;
      if (PHOTO_PLACEHOLDER.test(content)) return match;
      // Skip if it contains <br> line breaks (visual formatting, not sentences)
      if (/<br\s*\/?>/.test(trimmed) && ALL_CAPS.test(trimmed.replace(/<[^>]+>/g, ''))) return match;

      if (trimmed.endsWith('</span>')) {
        const fixed = content.replace(/(<\/span>)(\s*)$/, '.$1$2');
        fixes++;
        return open + fixed + close;
      }
      const fixed = content.replace(/(\S)(\s*)$/, '$1.$2');
      fixes++;
      return open + fixed + close;
    }
  );

  // ─────────────────────────────────────────────────────────────
  // PATTERN 4: Bold concept text (font-weight: 800, font-size: 32-46px)
  // Hook text and large statements
  // ─────────────────────────────────────────────────────────────
  html = html.replace(
    /(<div style="[^"]*font-weight:\s*800[^"]*font-size:\s*(?:3[2-9]|4[0-6])px[^"]*">)([\s\S]*?)(<\/div>)/g,
    (match, open, content, close) => {
      const trimmed = content.trim();
      if (!trimmed || trimmed.length < 10) return match;
      if (ENDS_WITH_PUNCT.test(trimmed)) return match;
      // Check stripped version for ALL_CAPS
      const stripped = trimmed.replace(/<[^>]+>/g, '').trim();
      if (ALL_CAPS.test(stripped)) return match;
      if (PHOTO_PLACEHOLDER.test(content)) return match;

      if (trimmed.endsWith('</span>')) {
        const fixed = content.replace(/(<\/span>)(\s*)$/, '.$1$2');
        fixes++;
        return open + fixed + close;
      }
      const fixed = content.replace(/(\S)(\s*)$/, '$1.$2');
      fixes++;
      return open + fixed + close;
    }
  );

  // ─────────────────────────────────────────────────────────────
  // PATTERN 5: Case description text inside content-over
  // ─────────────────────────────────────────────────────────────
  html = html.replace(
    /(<div class="body-text" style="max-width:\s*700px;">)([\s\S]*?)(<\/div>)/g,
    (match, open, content, close) => {
      const trimmed = content.trim();
      if (!trimmed || trimmed.length < 10) return match;
      if (ENDS_WITH_PUNCT.test(trimmed)) return match;
      if (ALL_CAPS.test(trimmed)) return match;

      if (trimmed.endsWith('</span>')) {
        const fixed = content.replace(/(<\/span>)(\s*)$/, '.$1$2');
        fixes++;
        return open + fixed + close;
      }
      const fixed = content.replace(/(\S)(\s*)$/, '$1.$2');
      fixes++;
      return open + fixed + close;
    }
  );

  // ─────────────────────────────────────────────────────────────
  // PATTERN 6: body-text with inline style (font-size variants)
  // ─────────────────────────────────────────────────────────────
  html = html.replace(
    /(<div class="body-text" style="[^"]*">)([\s\S]*?)(<\/div>)/g,
    (match, open, content, close) => {
      const trimmed = content.trim();
      if (!trimmed || trimmed.length < 10) return match;
      if (ENDS_WITH_PUNCT.test(trimmed)) return match;
      const stripped = trimmed.replace(/<[^>]+>/g, '').trim();
      if (ALL_CAPS.test(stripped)) return match;
      if (PHOTO_PLACEHOLDER.test(content)) return match;

      if (trimmed.endsWith('</span>')) {
        const fixed = content.replace(/(<\/span>)(\s*)$/, '.$1$2');
        fixes++;
        return open + fixed + close;
      }
      const fixed = content.replace(/(\S)(\s*)$/, '$1.$2');
      fixes++;
      return open + fixed + close;
    }
  );

  // ─────────────────────────────────────────────────────────────
  // PATTERN 7: Exercise box paragraph text
  // ─────────────────────────────────────────────────────────────
  html = html.replace(
    /(<p style="[^"]*font-size:\s*(?:1[89]|2[0-4])px[^"]*">)([\s\S]*?)(<\/p>)/g,
    (match, open, content, close) => {
      const trimmed = content.trim();
      if (!trimmed || trimmed.length < 10) return match;
      if (ENDS_WITH_PUNCT.test(trimmed)) return match;
      if (ALL_CAPS.test(trimmed)) return match;

      if (trimmed.endsWith('</span>')) {
        const fixed = content.replace(/(<\/span>)(\s*)$/, '.$1$2');
        fixes++;
        return open + fixed + close;
      }
      const fixed = content.replace(/(\S)(\s*)$/, '$1.$2');
      fixes++;
      return open + fixed + close;
    }
  );

  // ─────────────────────────────────────────────────────────────
  // CLEANUP: Remove double periods that may have been introduced
  // ─────────────────────────────────────────────────────────────
  html = html.replace(/\.\.(?=<)/g, '.');
  html = html.replace(/\.\.(?=\s*$)/gm, '.');

  fs.writeFileSync(filePath, html, 'utf-8');
  totalFixes += fixes;
  console.log(`${file}: ${fixes} fixes`);
}

console.log(`\nTotal: ${totalFixes} punctuation fixes across ${files.length} files.`);
