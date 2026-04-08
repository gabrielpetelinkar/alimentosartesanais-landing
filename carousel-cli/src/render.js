import puppeteer from 'puppeteer';
import { resolve } from 'path';

/**
 * Build HTML for a single slide based on its variant
 */
function buildSlideHTML(slide, config) {
  const bgColor = slide.bg_color || '#E8E4E0';
  const textColor = slide.text_color || '#1A1A1A';
  const subtextColor = slide.subtext_color || '#666666';
  const accentColor = slide.accent_color || '#C45A3C';
  const handle = config.handle || '';

  const hasImage = slide.image_url && slide.image_url.trim() !== '';
  const variant = slide.variant || (hasImage ? 'image-full-overlay' : 'text-only');

  // Font sizes based on text length
  const headlineSize = (slide.headline && slide.headline.length > 60) ? '42px' : '52px';
  const subtextSize = '22px';

  let bodyContent = '';

  switch (variant) {
    case 'text-top-image-bottom':
      bodyContent = `
        <div style="display:flex; flex-direction:column; height:100%; padding:60px;">
          <div style="flex:1; display:flex; flex-direction:column; justify-content:center;">
            <h1 style="font-size:${headlineSize}; color:${textColor}; font-family:'Georgia',serif; font-weight:700; line-height:1.2; margin:0;">
              ${slide.headline || ''}
            </h1>
            ${slide.subtext ? `<p style="font-size:${subtextSize}; color:${subtextColor}; font-family:'Helvetica Neue',sans-serif; margin-top:20px; line-height:1.5;">${slide.subtext}</p>` : ''}
          </div>
          ${hasImage ? `
          <div style="flex:1; border-radius:16px; overflow:hidden; margin-top:30px;">
            <img src="${slide.image_url}" style="width:100%; height:100%; object-fit:cover;" />
          </div>` : ''}
        </div>
      `;
      break;

    case 'image-full-overlay':
      bodyContent = `
        <div style="position:relative; width:100%; height:100%;">
          ${hasImage ? `<img src="${slide.image_url}" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover;" />` : ''}
          <div style="position:absolute; top:0; left:0; width:100%; height:100%; background:linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%);"></div>
          <div style="position:absolute; bottom:0; left:0; right:0; padding:60px; z-index:2;">
            <h1 style="font-size:${headlineSize}; color:#FFFFFF; font-family:'Georgia',serif; font-weight:700; line-height:1.2; margin:0; text-shadow: 0 2px 8px rgba(0,0,0,0.3);">
              ${slide.headline || ''}
            </h1>
            ${slide.subtext ? `<p style="font-size:${subtextSize}; color:rgba(255,255,255,0.9); font-family:'Helvetica Neue',sans-serif; margin-top:16px; line-height:1.5;">${slide.subtext}</p>` : ''}
          </div>
        </div>
      `;
      break;

    case 'text-image-middle':
      bodyContent = `
        <div style="display:flex; flex-direction:column; height:100%; padding:60px; justify-content:space-between;">
          <h1 style="font-size:${headlineSize}; color:${textColor}; font-family:'Georgia',serif; font-weight:700; line-height:1.2; margin:0;">
            ${slide.headline || ''}
          </h1>
          ${hasImage ? `
          <div style="border-radius:16px; overflow:hidden; height:400px; margin:30px 0;">
            <img src="${slide.image_url}" style="width:100%; height:100%; object-fit:cover;" />
          </div>` : ''}
          ${slide.subtext ? `<p style="font-size:${subtextSize}; color:${subtextColor}; font-family:'Helvetica Neue',sans-serif; line-height:1.5; margin:0;">${slide.subtext}</p>` : ''}
        </div>
      `;
      break;

    case 'data-highlight':
      bodyContent = `
        <div style="display:flex; flex-direction:column; height:100%; padding:60px; justify-content:center; align-items:center; text-align:center;">
          ${slide.data_value ? `<div style="font-size:96px; color:${accentColor}; font-family:'Georgia',serif; font-weight:700; margin-bottom:20px;">${slide.data_value}</div>` : ''}
          <h1 style="font-size:${headlineSize}; color:${textColor}; font-family:'Georgia',serif; font-weight:700; line-height:1.2; margin:0;">
            ${slide.headline || ''}
          </h1>
          ${slide.subtext ? `<p style="font-size:${subtextSize}; color:${subtextColor}; font-family:'Helvetica Neue',sans-serif; margin-top:20px; line-height:1.5;">${slide.subtext}</p>` : ''}
        </div>
      `;
      break;

    case 'text-only':
    default:
      bodyContent = `
        <div style="display:flex; flex-direction:column; height:100%; padding:60px; justify-content:center;">
          <h1 style="font-size:${headlineSize}; color:${textColor}; font-family:'Georgia',serif; font-weight:700; line-height:1.2; margin:0;">
            ${slide.headline || ''}
          </h1>
          ${slide.subtext ? `<p style="font-size:${subtextSize}; color:${subtextColor}; font-family:'Helvetica Neue',sans-serif; margin-top:24px; line-height:1.5;">${slide.subtext}</p>` : ''}
        </div>
      `;
      break;
  }

  // Handle bar at top or bottom
  const handleBar = handle ? `
    <div style="position:absolute; bottom:30px; left:60px; right:60px; display:flex; justify-content:space-between; align-items:center; z-index:10;">
      <span style="font-size:16px; color:${variant === 'image-full-overlay' ? 'rgba(255,255,255,0.7)' : subtextColor}; font-family:'Helvetica Neue',sans-serif;">${handle}</span>
      <span style="font-size:16px; color:${variant === 'image-full-overlay' ? 'rgba(255,255,255,0.7)' : subtextColor}; font-family:'Helvetica Neue',sans-serif;">${slide.position}/${config.totalSlides || ''}</span>
    </div>
  ` : '';

  // Accent bar for cover slides
  const accentBar = slide.role === 'cover' ? `
    <div style="position:absolute; top:0; left:0; width:100%; height:6px; background:${accentColor}; z-index:10;"></div>
  ` : '';

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1080px;
    height: 1080px;
    overflow: hidden;
    background: ${bgColor};
    position: relative;
  }
</style>
</head>
<body>
  ${accentBar}
  ${bodyContent}
  ${handleBar}
</body>
</html>`;
}

/**
 * Render all slides to PNG using Puppeteer
 * @param {Object} data - Carousel data with slides array
 * @param {string} outputDir - Directory to save PNGs
 * @returns {string[]} List of generated filenames
 */
export async function renderSlides(data, outputDir) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const totalSlides = data.slides.length;
  const configWithTotal = { ...data.config, totalSlides };
  const files = [];

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 });

    for (const slide of data.slides) {
      const html = buildSlideHTML(slide, configWithTotal);
      await page.setContent(html, { waitUntil: 'networkidle0', timeout: 15000 });

      const filename = `slide-${String(slide.position).padStart(2, '0')}.png`;
      const filepath = resolve(outputDir, filename);

      await page.screenshot({ path: filepath, type: 'png' });
      files.push(filename);
      console.log(`  ✅ ${filename} (${slide.role || 'content'})`);
    }
  } finally {
    await browser.close();
  }

  return files;
}
