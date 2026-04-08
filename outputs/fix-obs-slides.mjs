import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const dir = '/Users/gabrielpetelinkar/AIOSORIZA/outputs';
const files = readdirSync(dir).filter(f => /^aula-\d+.*\.html$/.test(f));

const NEW_SCRIPT = `<div class="slide-counter" id="slideCounter">1 / ?</div>

<script>
(function() {
  var slides = document.querySelectorAll('.slide');
  var current = 0;
  var lastNav = 0;
  var DEBOUNCE = 300;
  var counter = document.getElementById('slideCounter');

  function showSlide(index) {
    if (index < 0 || index >= slides.length) return;
    for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = i === index ? 'flex' : 'none';
    }
    current = index;
    counter.textContent = (current + 1) + ' / ' + slides.length;
  }

  function next() {
    var now = Date.now();
    if (now - lastNav < DEBOUNCE) return;
    lastNav = now;
    if (current < slides.length - 1) showSlide(current + 1);
  }

  function prev() {
    var now = Date.now();
    if (now - lastNav < DEBOUNCE) return;
    lastNav = now;
    if (current > 0) showSlide(current - 1);
  }

  showSlide(0);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault(); next();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault(); prev();
    } else if (e.key === 'n' || e.key === 'N') {
      document.body.classList.toggle('show-notes');
    } else if (e.key === 'Home') {
      e.preventDefault(); showSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault(); showSlide(slides.length - 1);
    }
  });

  document.addEventListener('wheel', function(e) {
    e.preventDefault();
    if (e.deltaY > 0) next(); else prev();
  }, { passive: false });
})();
</script>`;

const COUNTER_CSS = `
.slide-counter {
  position: fixed; bottom: 20px; left: 30px; z-index: 50;
  font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 600;
  color: #7A7A7A; opacity: 0.5; letter-spacing: 1px;
}`;

for (const file of files) {
  const path = join(dir, file);
  let html = readFileSync(path, 'utf-8');

  // 1. Fix html tag: remove scroll-snap, set overflow hidden
  html = html.replace(
    /html\s*\{[^}]*\}/,
    'html { overflow: hidden; }'
  );

  // 2. Fix body tag: add overflow hidden, 100vw/100vh
  html = html.replace(
    /(body\s*\{)/,
    '$1\n    width: 100vw; height: 100vh; overflow: hidden; margin: 0;'
  );

  // 3. Fix .slide: replace fixed dimensions with viewport units, remove scroll-snap
  html = html.replace(
    /\.slide\s*\{([\s\S]*?)\}/,
    (match, inner) => {
      let fixed = inner
        .replace(/width:\s*1280px/g, 'width: 100vw')
        .replace(/height:\s*720px/g, 'height: 100vh')
        .replace(/scroll-snap-align:[^;]*;/g, '')
        .replace(/scroll-snap-stop:[^;]*;/g, '')
        .replace(/page-break-after:[^;]*;/g, '')
        .replace(/page-break-inside:[^;]*;/g, '');
      return `.slide {${fixed}}`;
    }
  );

  // 4. Add counter CSS before </style>
  html = html.replace('</style>', COUNTER_CSS + '\n</style>');

  // 5. Replace everything from the last <script> (or nav-hint) to </body>
  // Remove old nav-hint
  html = html.replace(/<div class="nav-hint">[^<]*<\/div>\s*/g, '');

  // Remove old script block(s) at the end and replace
  html = html.replace(
    /(<script>[\s\S]*<\/script>\s*)<\/body>/,
    NEW_SCRIPT + '\n</body>'
  );

  // If no script was found (like aula-02), add before </body>
  if (!html.includes('slideCounter')) {
    html = html.replace('</body>', NEW_SCRIPT + '\n</body>');
  }

  writeFileSync(path, html, 'utf-8');
  console.log(`✓ ${file}`);
}

console.log(`\nDone: ${files.length} files updated.`);
