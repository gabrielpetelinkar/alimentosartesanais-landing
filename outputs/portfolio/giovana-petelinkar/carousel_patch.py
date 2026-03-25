with open('index.html', 'r') as f:
    html = f.read()

# 1. ADICIONAR CSS DO CARROSSEL antes de </style>
carousel_css = """
/* ============================================================
   CASE CAROUSEL — Slides horizontais
   ============================================================ */
.cases-carousel-wrapper {
  position: relative;
  margin-top: var(--space-lg);
}

.cases-carousel {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding: 8px 0 24px;
  scrollbar-width: none;
}
.cases-carousel::-webkit-scrollbar { display: none; }

.case-slide {
  flex: 0 0 min(480px, 85vw);
  scroll-snap-align: start;
  background: var(--white);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
}
.case-slide:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.10);
}

.case-slide.star-moment { border: 2px solid var(--terracota); }
.case-slide.star-moment::before {
  content: 'DESTAQUE';
  position: absolute;
  top: 16px;
  right: 16px;
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: var(--white);
  background: var(--terracota);
  padding: 4px 10px;
  border-radius: 4px;
  z-index: 2;
}

.case-slide-image {
  width: 100%;
  height: 240px;
  overflow: hidden;
  position: relative;
}
.case-slide-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.case-slide-image .slide-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--marfim-dark), var(--sage-light));
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--grafite);
  text-align: center;
  padding: 20px;
}

.case-slide-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.case-slide-body h3 {
  font-size: var(--text-lg);
  margin: 0;
}

.case-slide-body .case-subtitle {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--grafite);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.case-slide-body .case-desc {
  font-size: var(--text-sm);
  color: var(--onyx-90);
  line-height: 1.55;
  flex: 1;
}

.case-slide-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 8px;
  border-top: 1px solid var(--divider);
}

.case-slide-tags .tag {
  font-size: 10px;
  padding: 3px 8px;
}

.case-slide-results {
  display: flex;
  gap: 16px;
  padding: 16px 24px;
  background: var(--marfim);
  border-top: 1px solid var(--divider);
}
.case-slide-results .mini-metric {
  text-align: center;
  flex: 1;
}
.case-slide-results .mini-metric .val {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--terracota);
  line-height: 1.2;
}
.case-slide-results .mini-metric .lbl {
  font-family: var(--font-mono);
  font-size: 9px;
  color: var(--grafite);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

/* Carousel arrows */
.carousel-nav {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-bottom: 16px;
}
.carousel-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid var(--divider);
  background: var(--white);
  color: var(--onyx);
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.carousel-btn:hover {
  border-color: var(--terracota);
  color: var(--terracota);
}

/* Scroll indicator dots */
.carousel-dots {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;
}
.carousel-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--divider);
  transition: background 0.3s;
}
.carousel-dot.active { background: var(--terracota); }

@media (max-width: 768px) {
  .case-slide { flex: 0 0 90vw; }
  .case-slide-image { height: 180px; }
}

/* Hide old case styles */
.case-study { display: none !important; }
.case-transition { display: none !important; }
.narrative-bridge { display: none !important; }

"""

html = html.replace('</style>', carousel_css + '</style>')

# 2. SUBSTITUIR a seção de cases inteira por carrossel
old_cases_start = '<!-- Narrative Bridge: What Is'
old_cases_end = '</section>\n\n<!-- ============================================================\n     SECTION 6: SOBRE'

# Encontrar início e fim da seção
start_idx = html.find(old_cases_start)
end_marker = '<!-- ============================================================\n     SECTION 6: SOBRE'
end_idx = html.find(end_marker)

if start_idx > 0 and end_idx > start_idx:
    # Manter a seção antiga (agora hidden por CSS) e adicionar carrossel ANTES do SECTION 6
    new_carousel = """
<!-- ============================================================
     SECTION 5B: CASES CAROUSEL
     ============================================================ -->
<section class="cases" id="cases" style="display:block !important;">
  <div class="container">
    <div class="section-divider"></div>
    <h2>Histórias de marcas que encontraram sua voz</h2>
    <p class="section-subtitle" style="color:var(--grafite);margin-bottom:8px;">Cada projeto começa com um desafio e termina com uma transformação.</p>

    <div class="carousel-nav">
      <button class="carousel-btn" onclick="document.getElementById('casesCarousel').scrollBy({left:-504,behavior:'smooth'})">&larr;</button>
      <button class="carousel-btn" onclick="document.getElementById('casesCarousel').scrollBy({left:504,behavior:'smooth'})">&rarr;</button>
    </div>

    <div class="cases-carousel-wrapper">
      <div class="cases-carousel" id="casesCarousel">

        <!-- SLIDE 1: Renata Dias Atelier — STAR MOMENT -->
        <div class="case-slide star-moment" id="case-renata-dias">
          <div class="case-slide-image">
            <img src="img/rd-feed.png" alt="Renata Dias Atelier — Feed Instagram">
          </div>
          <div class="case-slide-body">
            <h3>Renata Dias Atelier</h3>
            <div class="case-subtitle">Moda Noiva &amp; Festa | Construção de marca completa</div>
            <p class="case-desc">O ateliê de vestidos sob medida com 10 anos de trajetória precisava integrar a marca da estilista e do ateliê em uma presença digital coerente. Assumi toda a comunicação: do planejamento estratégico à identidade visual, passando por vídeos institucionais, redes sociais e o lançamento da coleção "Essence" — criando conceito, naming e toda a produção visual do zero.</p>
            <div class="case-slide-tags">
              <span class="tag">Branding</span>
              <span class="tag">Vídeo</span>
              <span class="tag">Social Media</span>
              <span class="tag">Identidade Visual</span>
              <span class="tag">Conceito de Coleção</span>
            </div>
          </div>
          <div class="case-slide-results">
            <div class="mini-metric"><span class="val">100%</span><span class="lbl">Identidade unificada</span></div>
            <div class="mini-metric"><span class="val">8</span><span class="lbl">Tipos de entrega</span></div>
            <div class="mini-metric"><span class="val">1</span><span class="lbl">Coleção lançada</span></div>
          </div>
        </div>

        <!-- SLIDE 2: Lumos Decor -->
        <div class="case-slide" id="case-lumos">
          <div class="case-slide-image">
            <img src="img/lumos-objetivo.png" alt="Lumos Decor — Objetivo de Comunicação">
          </div>
          <div class="case-slide-body">
            <h3>Lumos Decor</h3>
            <div class="case-subtitle">Arquitetura &amp; Decoração | Planejamento estratégico</div>
            <p class="case-desc">Loja de decoração em desenvolvimento que precisava se posicionar como referência em design e lifestyle. Defini o objetivo de comunicação para os primeiros três meses, criei moodboard e identidade visual, estruturando quatro pilares estratégicos: qualidade, curadoria única, pertencimento e posicionamento além do varejo.</p>
            <div class="case-slide-tags">
              <span class="tag">Estratégia</span>
              <span class="tag">Branding</span>
              <span class="tag">Identidade Visual</span>
              <span class="tag">Moodboard</span>
            </div>
          </div>
          <div class="case-slide-results">
            <div class="mini-metric"><span class="val">4</span><span class="lbl">Pilares estratégicos</span></div>
            <div class="mini-metric"><span class="val">3 meses</span><span class="lbl">Roadmap</span></div>
          </div>
        </div>

        <!-- SLIDE 3: Reserva da Pipa -->
        <div class="case-slide" id="case-pipa">
          <div class="case-slide-image">
            <img src="img/pipa-feed.png" alt="Reserva da Pipa — Feed">
          </div>
          <div class="case-slide-body">
            <h3>Reserva da Pipa</h3>
            <div class="case-subtitle">Condomínio Resort | Campanha multi-canal</div>
            <p class="case-desc">O condomínio não queria vender lotes — queria vender um estilo de vida. Criei estratégia multi-canal integrando redes sociais, e-mail marketing e landing pages. Usei prova social do TripAdvisor como validação da região, e campanhas de indicação com CTAs claros para eventos e lançamentos.</p>
            <div class="case-slide-tags">
              <span class="tag">Social Media</span>
              <span class="tag">E-mail Marketing</span>
              <span class="tag">Landing Pages</span>
              <span class="tag">Copywriting</span>
            </div>
          </div>
          <div class="case-slide-results">
            <div class="mini-metric"><span class="val">3</span><span class="lbl">Canais integrados</span></div>
            <div class="mini-metric"><span class="val">5+</span><span class="lbl">Campanhas</span></div>
            <div class="mini-metric"><span class="val">Lifestyle</span><span class="lbl">Posicionamento</span></div>
          </div>
        </div>

        <!-- SLIDE 4: Bauten -->
        <div class="case-slide" id="case-bauten">
          <div class="case-slide-image">
            <img src="img/bauten-site.png" alt="Bauten — Website">
          </div>
          <div class="case-slide-body">
            <h3>Bauten</h3>
            <div class="case-subtitle">Incorporadora de Luxo | Website + narrativa de marca</div>
            <p class="case-desc">Incorporadora que alia design e sustentabilidade precisava de redação profissional para o site. Desenvolvi toda a copy — da "Nossa História" ao "Nosso Conceito" e "Quem Faz" — traduzindo propósito, missão e visão em linguagem que conecta emocionalmente com o público de luxo.</p>
            <div class="case-slide-tags">
              <span class="tag">Website</span>
              <span class="tag">Copywriting</span>
              <span class="tag">UX Writing</span>
              <span class="tag">Narrativa de Marca</span>
            </div>
          </div>
          <div class="case-slide-results">
            <div class="mini-metric"><span class="val">3</span><span class="lbl">Páginas escritas</span></div>
            <div class="mini-metric"><span class="val">Premium</span><span class="lbl">Tom de voz</span></div>
          </div>
        </div>

        <!-- SLIDE 5: Mentora + Coach -->
        <div class="case-slide" id="case-mentora">
          <div class="case-slide-image">
            <div class="slide-placeholder">Roteiros e direcionamento estratégico — conteúdo textual</div>
          </div>
          <div class="case-slide-body">
            <h3>Direcionamento de Conteúdo</h3>
            <div class="case-subtitle">Mentora Digital + Coach Autora | Roteiro e estratégia</div>
            <p class="case-desc">Duas profissionais com expertise profunda mas dificuldade em traduzir conhecimento em conteúdo digital. Criei roteiros completos de Reels com tema, cenário e CTA, além de estratégia de pré-lançamento de livro com cards de citações e legendas narrativas.</p>
            <div class="case-slide-tags">
              <span class="tag">Roteiro</span>
              <span class="tag">Estratégia de Conteúdo</span>
              <span class="tag">Direcionamento Criativo</span>
            </div>
          </div>
          <div class="case-slide-results">
            <div class="mini-metric"><span class="val">2</span><span class="lbl">Estratégias</span></div>
            <div class="mini-metric"><span class="val">Roteiros</span><span class="lbl">Prontos para gravação</span></div>
          </div>
        </div>

      </div>

      <div class="carousel-dots">
        <div class="carousel-dot active"></div>
        <div class="carousel-dot"></div>
        <div class="carousel-dot"></div>
        <div class="carousel-dot"></div>
        <div class="carousel-dot"></div>
      </div>
    </div>
  </div>
</section>

"""

    # Inserir carrossel antes do SECTION 6
    html = html[:end_idx] + new_carousel + html[end_idx:]

with open('index.html', 'w') as f:
    f.write(html)

print("Carrossel de cases aplicado")
