import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const dir = '/Users/gabrielpetelinkar/AIOSORIZA/outputs';
const files = readdirSync(dir).filter(f => /^aula-\d+.*\.html$/.test(f));

for (const file of files) {
  const path = join(dir, file);
  let html = readFileSync(path, 'utf-8');
  let changed = false;

  // Fix 1: Any element with inline background-image that also has a class
  // with a CSS background shorthand — we need to use !important
  // Replace all background-image:url( in style attributes with !important version
  html = html.replace(
    /style="([^"]*?)background-image:url\(([^)]+)\); background-size:cover; background-position:center;/g,
    (match, before, url) => {
      changed = true;
      return `style="${before}background:url(${url}) center/cover no-repeat !important;`;
    }
  );

  if (changed) {
    writeFileSync(path, html);
    console.log(`✓ ${file}`);
  } else {
    console.log(`- ${file} (no changes needed)`);
  }
}
