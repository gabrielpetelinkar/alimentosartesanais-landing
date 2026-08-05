# Memória da Sessão — 04/08/2026 — Redesign das 5 LPs do Ecossistema

## O que foi feito

Auditoria dupla (skills `frontend-design` da Anthropic + `web-design-guidelines` da Vercel, instaladas nesta sessão) sobre as 5 LPs, seguida de correção completa em duas fases e deploy em produção.

### Fase 1 — Quick wins de acessibilidade (7 itens)
1. Zoom destravado: removido `maximumScale: 1` do `artesanal-na-pratica/src/app/layout.tsx`
2. `prefers-reduced-motion` nos 4 `globals.css` + `index.html` do ebook
3. `:focus-visible` (outline 3px terracota) replicado da Calculadora para os outros 3 projetos + ebook
4. Dourado `#D4A853` removido de fundos claros (contraste 1,76–2,20:1, reprovava AA)
5. `width`/`height` + `loading="lazy"` nas imagens sem atributos; hero com `fetchPriority="high"`
6. FAQ do ebook: `<div onclick>` → `<button aria-expanded>`
7. `aria-hidden="true"` em 73 SVGs decorativos; radar recebeu `role="img"` + `aria-label`

### Fase 2 — Estrutural (4 agentes em paralelo + trabalho direto)
- **Tokens unificados**: verde único `#5A7A42` (eram 3: #5B8C3E, #5A8A3A, #5A7A42), dark `#3D2B1F` (eliminado #2C1810 hardcoded), CTA terracota em TODAS as LPs (Tabela era verde), tokens danger terrosos na Tabela (`#B3402A`/`#FBEAE5`/`#F0C8BE`, fim dos `red-*` genéricos)
- **Heros reconstruídos ao redor do artefato de cada produto**:
  - Artesanal (R$127): radar chart no hero desktop; h1 duplicado eliminado; 12 eyebrows em JetBrains Mono; hero desktop convertido de background-image CSS para `<img>` real (melhora LCP)
  - Calculadora (R$47): mockup de custo (Geleia de Morango R$11,40) no hero; componente `CostBreakdownCard` compact/full; piso tipográfico 14px+; classe `safe-area-pb` que era usada mas nunca existiu foi criada
  - Tabela (R$37): selo ANVISA "ALTO EM" no hero (componente `WarningSeal` sm/md, vertical/horizontal); CTA terracota; multa movida para danger
  - Comunidade (R$257): mockup da plataforma em código puro como signature element; hero premium escuro+dourado; depoimentos com citações reais extraídas das imagens (2 da Lumiar são momentos distintos, rotulados)
- **Ebook (`index.html`)**: comentário aberto fechado, seções duplicadas removidas, numeração 01–05 real, grids inline sem media query viraram classes responsivas (mobile colapsava em 3 colunas espremidas), cores órfãs unificadas, sombras pretas → tingidas

### Verificação
- `tsc --noEmit` limpo nos 4 projetos; HTML do ebook validado (comentários balanceados, tags fechadas)
- 20 screenshots (full-page + hero, mobile 390/desktop 1440) em `outputs/lp-screenshots/`
- **Bug pego pelos screenshots**: h1/h2 do hero da Tabela invisíveis (dark sobre dark) — o `globals.css` dela força `color` em headings e o hero tem o mesmo fundo. Corrigido com cor inline.

### Deploy (todos READY, smoke test 200)
- alimentosartesanais.com.br (ebook, projeto Vercel `lp-deploy`)
- app.alimentosartesanais.com.br/lp (artesanal)
- calculadora-artesanal.vercel.app/lp · tabela-nutricional-artesanal.vercel.app/lp · comunidade-artesanal.vercel.app/lp

## Decisões de design (valem para trabalho futuro)
- Verde da marca: **só `#5A7A42`**. Dark: **só `#3D2B1F`**. CTA: **sempre terracota** `#B5563A` (verde = conformidade/aprovação)
- Dourado `#D4A853` **nunca como texto sobre fundo claro** (só sobre dark, 6,09:1)
- Danger: tons terrosos próprios, nunca `red-*` do Tailwind
- Piso tipográfico: 14px (público 40+ mobile); labels mono pequenos ok
- Cada LP abre o hero com o artefato do produto (radar/mockup/selo/plataforma), não com headline genérica

## Aprendizados técnicos
- **Tailwind 4**: CSS sem layer no `globals.css` (ex.: `h1 { color: ... }`) vence utilities de classe — corrigir com style inline ou movendo a regra para layer
- Screenshots full-page não disparam IntersectionObserver — rolar a página via `page.evaluate` antes de capturar
- Playwright MCP indisponível na sessão → `playwright-core` npm + `chrome-headless-shell` do cache resolve
- `git subtree`-shaped remoto: o GitHub `artesanal-na-pratica.git` contém só o projeto na raiz (4 commits), local é monorepo (129) — **push direto impossível**, deploy é via Vercel CLI

## Pendências
1. **GitHub do monorepo `mentorias`**: sem backup remoto do código real — criar repo do monorepo ou subtree por projeto
2. `WarningSeal` duplicado (LP + `NutritionCalculator.tsx`) — consolidar
3. `.env.local` do artesanal sem chaves Supabase — dev local dá 500 fora da LP
4. 5 erros de lint pré-existentes na Calculadora (`react-hooks/set-state-in-effect`)
5. Decisão em aberto: fundo do ebook `#EDE5D5` vs `#FFF9F0` oficial (1 linha, repinta tudo)
6. Untracked não versionados de propósito: `hotmart-mcp-patched/` (possíveis tokens), CSVs de compradores, screenshots
7. Acompanhar Meta Ads: CTR e custo por InitiateCheckout devem mudar com os heros novos
