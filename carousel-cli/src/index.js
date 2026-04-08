#!/usr/bin/env node

import { readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { searchImages } from './images.js';
import { renderSlides } from './render.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '..', '.env') });

async function main() {
  const inputPath = process.argv[2];

  if (!inputPath) {
    console.error('Usage: node src/index.js <carousel-data.json>');
    console.error('Example: node src/index.js examples/sardinha.json');
    process.exit(1);
  }

  const absolutePath = resolve(inputPath);
  if (!existsSync(absolutePath)) {
    console.error(`File not found: ${absolutePath}`);
    process.exit(1);
  }

  console.log(`\n🎠 Carousel CLI — Generating carousel from ${inputPath}\n`);

  const raw = await readFile(absolutePath, 'utf-8');
  const data = JSON.parse(raw);

  // Ensure output directory exists
  const outputDir = resolve(__dirname, '..', 'output');
  await mkdir(outputDir, { recursive: true });

  // Step 1: Search images for slides that need them
  const hasImageKeys = process.env.UNSPLASH_ACCESS_KEY || process.env.PEXELS_API_KEY;

  if (hasImageKeys) {
    console.log('📷 Searching images...');
    for (const slide of data.slides) {
      if (slide.image_keywords && slide.image_keywords.length > 0 && !slide.image_url) {
        const query = slide.image_keywords.join(' ');
        console.log(`  Slide ${slide.position}: "${query}"`);
        const url = await searchImages(query);
        if (url) {
          slide.image_url = url;
          console.log(`  ✅ Found image`);
        } else {
          console.log(`  ⚠️ No image found — rendering text-only`);
        }
      }
    }
  } else {
    console.log('📷 No image API keys configured — using text-only mode');
    console.log('  Set UNSPLASH_ACCESS_KEY or PEXELS_API_KEY in .env for images\n');
  }

  // Step 2: Render all slides to PNG
  console.log('\n🖼️ Rendering slides...');
  const files = await renderSlides(data, outputDir);

  // Step 3: Write caption file
  if (data.caption) {
    const { writeFile } = await import('fs/promises');
    const captionContent = [
      data.caption,
      '',
      '---',
      '',
      data.hashtags ? data.hashtags.join(' ') : ''
    ].join('\n').trim();

    const captionPath = resolve(outputDir, 'legenda.txt');
    await writeFile(captionPath, captionContent, 'utf-8');
    console.log(`\n📝 Caption saved: legenda.txt`);
  }

  // Summary
  console.log(`\n✅ Done! ${files.length} slides generated in ./output/`);
  console.log('Files:');
  files.forEach(f => console.log(`  ${f}`));
  if (data.caption) console.log('  legenda.txt');
  console.log('');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
