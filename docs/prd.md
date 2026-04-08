# Guia Estratégico para Produtores Artesanais — Product Requirements Document (PRD)

## 1. Goals and Background Context

### Goals

- Criar uma landing page de alta conversão para venda do ebook "Guia Estratégico para Produtores Artesanais" a R$ 97
- Converter visitantes (orgânicos e pagos) em compradores via checkout Hotmart
- Estabelecer presença digital no domínio alimentosartesanais.com.br
- Captar leads através da integração nativa do Hotmart

### Background Context

O mercado de alimentos artesanais no Brasil está em crescimento, com produtores de queijos, doces, geleias e molhos buscando profissionalizar seus negócios. Existe uma lacuna de conteúdo estratégico voltado para quem já produz artesanalmente ou deseja entrar nesse mercado. O ebook "Guia Estratégico para Produtores Artesanais" preenche essa lacuna, e a landing page será o principal canal de conversão, recebendo tráfego de Meta Ads e busca orgânica.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-22 | 0.1 | Initial PRD draft | Morgan (PM) |
| 2026-02-22 | 0.2 | Added Out of Scope, FR14 (LGPD cookie banner), NFR7 (LGPD compliance), updated Story 1.7 AC | Morgan (PM) |

---

## 2. Requirements

### Functional Requirements

- **FR1:** A landing page deve exibir uma seção Hero com headline persuasiva, subheadline e botão CTA direcionando ao checkout Hotmart
- **FR2:** A página deve conter seção de Dores/Problemas que identifique os desafios do público-alvo (produtores artesanais de alimentos)
- **FR3:** A página deve apresentar seção de Solução posicionando o ebook como resposta às dores identificadas
- **FR4:** A página deve listar o conteúdo do ebook em seção "O que você vai aprender" com itens específicos
- **FR5:** A página deve conter seção "Para quem é este guia" segmentando claramente o público-alvo
- **FR6:** A página deve exibir seção "Sobre o Autor" com foto e credenciais
- **FR7:** A página deve conter seção de Depoimentos (inicialmente com placeholders para adição futura)
- **FR8:** A página deve destacar a Garantia de 7 dias (padrão Hotmart) com selo visual
- **FR9:** A página deve incluir seção FAQ com perguntas frequentes sobre o ebook e o mercado artesanal
- **FR10:** A página deve ter CTA final com botão de compra e reforço de preço (R$ 97)
- **FR11:** Todos os botões CTA devem redirecionar para o link de checkout do Hotmart
- **FR12:** A página deve ser responsiva (mobile-first), otimizada para tráfego de Meta Ads (maioria mobile)
- **FR13:** A página deve conter meta tags para SEO (title, description, Open Graph, Twitter Cards)
- **FR14:** A página deve exibir banner de consentimento de cookies (LGPD) antes de ativar GA4 e Meta Pixel, com opções "Aceitar" e "Recusar"

### Non-Functional Requirements

- **NFR1:** A página deve carregar em menos de 3 segundos no PageSpeed Insights (score >= 90)
- **NFR2:** A página deve ser HTML/CSS/JS estático, sem dependência de frameworks ou servidores backend
- **NFR3:** A página deve seguir paleta de cores terrosa (verde oliva, marrom, creme) transmitindo artesanal/natural
- **NFR4:** A página deve funcionar corretamente nos navegadores Chrome, Safari, Firefox e Edge (últimas 2 versões)
- **NFR5:** A página deve ser hospedável em qualquer serviço de hospedagem estática (Vercel, Netlify, hospedagem compartilhada)
- **NFR6:** O código deve ser semântico (HTML5) e acessível (WCAG AA básico — contraste, alt em imagens, navegação por teclado)
- **NFR7:** A página deve estar em conformidade com a LGPD (Lei Geral de Proteção de Dados) no que tange ao uso de cookies de rastreamento

### Out of Scope

Os seguintes itens **não fazem parte** deste MVP e não devem ser implementados:

- **Blog ou seção de conteúdo** — não há necessidade de CMS ou páginas adicionais
- **Sistema de login ou área de membros** — o acesso ao ebook é gerenciado 100% pela Hotmart
- **Carrinho de compras ou checkout próprio** — o pagamento é processado exclusivamente na Hotmart
- **Múltiplos produtos ou upsell na página** — foco exclusivo no ebook único a R$ 97
- **Chat ao vivo ou chatbot** — não há suporte em tempo real neste MVP
- **Versão em outros idiomas** — página apenas em pt-BR
- **App mobile nativo** — apenas web responsivo
- **Integrações com CRM ou email marketing externo** — utiliza apenas o sistema de leads nativo da Hotmart
- **Testes A/B nativos** — podem ser feitos via Meta Ads (variações de anúncio), não na página em si
- **Página de obrigado (thank you page)** — a Hotmart já fornece página pós-compra

---

## 3. User Interface Design Goals

### Overall UX Vision

Experiência linear e persuasiva de scroll único (one-page), guiando o visitante da curiosidade à decisão de compra. Design limpo, artesanal e acolhedor que transmita autenticidade e confiança. Sem distrações — sem menu de navegação, sem links externos além do CTA de compra.

### Key Interaction Paradigms

- **Scroll contínuo:** Narrativa sequencial que constrói desejo progressivamente
- **CTAs repetidos:** Botões de compra posicionados no Hero, após "O que vai aprender", e no CTA final (mínimo 3 pontos de conversão)
- **Micro-interações:** Hover suave nos botões, fade-in dos blocos ao scroll (CSS puro, sem JS pesado)
- **Urgência sutil:** Destaque visual no preço e garantia, sem countdown falso ou escassez artificial

### Core Screens and Views

- **View única:** Landing page one-page com seções sequenciais (Hero > Dores > Solução > Conteúdo > Público > Autor > Depoimentos > Garantia > FAQ > CTA Final)
- **Sem navegação interna:** Scroll é o único mecanismo de progressão
- **Modal/Externo:** Checkout abre na Hotmart (página externa)

### Accessibility: WCAG AA

- Contraste mínimo 4.5:1 para texto sobre fundo
- Textos alternativos em todas as imagens
- Botões com área de toque mínima 44x44px
- Navegação funcional por teclado
- Fonte base mínima 16px para legibilidade

### Branding

- **Paleta:** Verde oliva (#556B2F), marrom terra (#8B4513), creme (#FFF8DC), branco (#FFFFFF), texto escuro (#2C1810)
- **Tipografia:** Sans-serif moderna para headlines (Montserrat), serif para corpo (Lora)
- **Imagética:** Fotos de alimentos artesanais, texturas naturais (madeira, tecido rústico), tons quentes
- **Tom visual:** Profissional mas acolhedor — não corporativo, não amador

### Target Device and Platforms: Web Responsive

- **Mobile-first** (prioridade #1 — tráfego de Meta Ads)
- **Breakpoints:** Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)
- **Sem app nativo** — apenas web responsivo

---

## 4. Technical Assumptions

### Repository Structure: Monorepo

- Repositório único contendo todo o código da landing page
- Estrutura simples e flat — não justifica polyrepo para um projeto de página única

### Service Architecture

- **Página estática pura** — zero backend, zero servidor
- HTML5 semântico + CSS3 (custom properties para tema) + JS vanilla mínimo (scroll animations, FAQ accordion)
- Checkout delegado 100% à Hotmart (link externo)
- Sem banco de dados, sem API própria, sem autenticação

### Testing Requirements

- **Visual/Manual:** Verificação cross-browser (Chrome, Safari, Firefox, Edge)
- **Performance:** Lighthouse/PageSpeed score >= 90
- **Responsividade:** Teste em 3 breakpoints (mobile, tablet, desktop)
- **Links:** Validação de todos os CTAs apontando para checkout Hotmart correto
- **Sem testes unitários** — não há lógica de negócio para testar

### Additional Technical Assumptions

- **Hospedagem:** Qualquer serviço estático (Vercel, Netlify ou hospedagem compartilhada do domínio alimentosartesanais.com.br)
- **Imagens:** Formato WebP com fallback JPG, comprimidas para < 100KB cada
- **Fontes:** Google Fonts (Montserrat + Lora) com font-display: swap para performance
- **Analytics:** Google Analytics 4 (GA4) + Meta Pixel para tracking de conversão
- **Sem dependências npm:** Zero build step — arquivos servidos diretamente
- **Favicon e Open Graph:** Imagem OG 1200x630 para compartilhamento social
- **SSL:** HTTPS obrigatório (padrão em Vercel/Netlify, necessário para Meta Ads)

---

## 5. Epic List

### Epic 1: Landing Page de Venda — Guia Estratégico para Produtores Artesanais

Construir e publicar a landing page completa de venda do ebook, com todas as seções de conversão, design responsivo, integração com Hotmart e tracking de analytics.

---

## 6. Epic 1: Landing Page de Venda — Guia Estratégico para Produtores Artesanais

**Goal:** Construir, otimizar e publicar uma landing page estática de alta conversão para venda do ebook "Guia Estratégico para Produtores Artesanais" a R$ 97 via Hotmart, com design responsivo mobile-first, identidade visual artesanal e tracking de conversão.

---

### Story 1.1: Project Foundation & Hero Section

> Como um visitante da página,
> Eu quero ver uma apresentação impactante do ebook ao acessar o site,
> Para que eu entenda imediatamente o valor do produto e tenha um caminho claro para comprar.

**Acceptance Criteria:**

1. Estrutura do projeto criada (index.html, styles.css, scripts.js, /assets)
2. HTML5 semântico com meta charset, viewport e lang="pt-BR"
3. CSS base implementado: reset, custom properties da paleta terrosa (verde oliva, marrom, creme), tipografia (Montserrat + Lora via Google Fonts)
4. Hero section implementada com: headline persuasiva, subheadline, imagem/mockup do ebook e botão CTA "Quero Meu Guia" linkando para checkout Hotmart
5. Botão CTA com hover state e destaque visual
6. Página renderiza corretamente no browser sem erros no console

---

### Story 1.2: Pain Points & Solution Sections

> Como um produtor artesanal ou aspirante,
> Eu quero me identificar com os desafios apresentados e ver que existe uma solução,
> Para que eu sinta que o ebook foi feito para resolver meus problemas específicos.

**Acceptance Criteria:**

1. Seção "Dores" implementada com 4-6 pain points relevantes (legalização, precificação, escala, distribuição, etc.)
2. Cada dor apresentada com ícone ou elemento visual e texto descritivo
3. Seção "Solução" posiciona o ebook como resposta direta às dores listadas
4. Transição visual coerente entre Hero > Dores > Solução
5. Seções seguem a paleta e tipografia definidas na Story 1.1

---

### Story 1.3: Content Overview & Target Audience Sections

> Como um visitante interessado,
> Eu quero saber exatamente o que vou aprender e confirmar que o conteúdo é para mim,
> Para que eu tenha confiança de que o investimento de R$ 97 vale a pena.

**Acceptance Criteria:**

1. Seção "O que você vai aprender" com 6-8 tópicos do ebook em formato de checklist ou cards
2. Cada tópico com título curto e descrição de 1 linha do benefício
3. Seção "Para quem é este guia" com 3-4 perfis de público-alvo (produtor iniciante, produtor que quer escalar, quem quer entrar no mercado, etc.)
4. Segundo CTA de compra posicionado após "O que vai aprender"
5. Layout visual distinto entre as duas seções (alternância de fundo claro/escuro)

---

### Story 1.4: Author, Testimonials & Guarantee Sections

> Como um potencial comprador,
> Eu quero saber quem criou o conteúdo e ter garantias de que minha compra é segura,
> Para que eu confie na qualidade do material e me sinta protegido para comprar.

**Acceptance Criteria:**

1. Seção "Sobre o Autor" com espaço para foto, nome, bio curta e credenciais
2. Seção "Depoimentos" com 3 cards placeholder (estrutura pronta para adição de depoimentos reais: foto, nome, texto, ocupação)
3. Seção "Garantia" destacando os 7 dias de garantia Hotmart com selo visual e texto de segurança
4. Design dos depoimentos com aspas estilizadas e layout em grid/carousel
5. Garantia com ícone de escudo ou selo e destaque visual (borda ou fundo diferenciado)

---

### Story 1.5: FAQ, Final CTA & Footer

> Como um visitante com dúvidas antes da compra,
> Eu quero encontrar respostas rápidas e ter um último estímulo claro para comprar,
> Para que eu supere minhas objeções finais e complete a compra.

**Acceptance Criteria:**

1. Seção FAQ com 5-7 perguntas frequentes em formato accordion (expandir/colapsar com JS vanilla)
2. Perguntas cobrindo: conteúdo do ebook, forma de acesso, garantia, para quem serve, forma de pagamento
3. CTA final com headline de fechamento, reforço do preço R$ 97, botão de compra e menção à garantia
4. Footer com copyright, link para política de privacidade (placeholder) e informações legais mínimas
5. Accordion funcional sem dependências externas (JS puro)

---

### Story 1.6: Responsive Design & Performance Optimization

> Como um visitante acessando pelo celular,
> Eu quero que a página carregue rápido e funcione perfeitamente no meu dispositivo,
> Para que eu tenha uma experiência fluida independente do dispositivo que uso.

**Acceptance Criteria:**

1. Layout responsivo mobile-first com breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)
2. Todas as seções testadas e funcionais nos 3 breakpoints
3. Imagens convertidas para WebP com fallback JPG, cada uma < 100KB
4. Fonts carregadas com font-display: swap
5. Lighthouse Performance score >= 90 em mobile
6. Botões CTA com área de toque mínima 44x44px em mobile
7. Sem scroll horizontal em nenhum breakpoint

---

### Story 1.7: SEO, Analytics & Deploy

> Como o dono do produto,
> Eu quero que a página esteja indexável, rastreável e publicada no domínio final,
> Para que eu possa direcionar tráfego pago e orgânico e medir conversões.

**Acceptance Criteria:**

1. Meta tags implementadas: title, description, canonical, robots
2. Open Graph tags para compartilhamento (og:title, og:description, og:image 1200x630)
3. Twitter Cards configurados
4. Google Analytics 4 (GA4) integrado com evento de pageview
5. Meta Pixel instalado com evento PageView e botão CTA configurado como evento ViewContent
6. Banner de consentimento de cookies (LGPD) implementado — GA4 e Meta Pixel só disparam após aceite do usuário (FR14, NFR7)
7. Favicon configurado
8. Arquivo robots.txt e sitemap.xml criados
9. Página deployada e acessível no domínio alimentosartesanais.com.br

---

## 7. Checklist Results Report

### Executive Summary

- **PRD Completeness:** 92%
- **MVP Scope:** Just Right
- **Readiness for Architecture:** READY FOR ARCHITECT

### Category Statuses

| Category | Status | Critical Issues |
|----------|--------|-----------------|
| 1. Problem Definition & Context | PASS | None |
| 2. MVP Scope Definition | PASS | Out of Scope added (v0.2) |
| 3. User Experience Requirements | PASS | None |
| 4. Functional Requirements | PASS | FR14 LGPD added (v0.2) |
| 5. Non-Functional Requirements | PASS | NFR7 LGPD added (v0.2) |
| 6. Epic & Story Structure | PASS | None |
| 7. Technical Guidance | PASS | None |
| 8. Cross-Functional Requirements | PASS | LGPD compliance addressed (v0.2) |
| 9. Clarity & Communication | PASS | None |

### Remaining Observations (Non-Blocking)

- **MEDIUM:** KPIs mensuráveis (taxa de conversão, CPA) a definir pós-launch com dados reais
- **MEDIUM:** Riscos documentáveis (dependência Hotmart, imagens do autor) — mitigáveis durante execução
- **LOW:** Diagrama de fluxo do visitante — opcional, fluxo é linear e autoexplicativo

### Final Decision

**READY FOR ARCHITECT** — PRD completo, com escopo definido, requisitos LGPD cobertos, e 7 stories sequenciais prontas para arquitetura e implementação.

---

## 8. Next Steps

### UX Expert Prompt

> @ux-design-expert Revisar o PRD em `docs/prd.md` e criar o design system e wireframes para a landing page de venda do ebook "Guia Estratégico para Produtores Artesanais". Foco em: paleta terrosa, tipografia Montserrat+Lora, layout one-page mobile-first com 10 seções de conversão. Iniciar em modo de criação de arquitetura UX.

### Architect Prompt

> @architect Revisar o PRD em `docs/prd.md` e criar a arquitetura técnica para a landing page estática (HTML/CSS/JS puro). Foco em: estrutura de arquivos, estratégia de CSS (custom properties), performance (Lighthouse >= 90), e plano de deploy para hospedagem estática. Iniciar em modo de criação de arquitetura.
