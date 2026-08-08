# Plano de Tráfego Passo a Passo — Agosto 2026

**Prioridade de orçamento acordada:** Ebook > Tabela > Comunidade (remarketing) > resto.
**Premissa:** cada venda do ebook agora vale mais (bumps Kit R$37 + Calculadora R$37
no checkout) — o front-end paga o tráfego, o LTV dá o lucro.
**Referência de dados:** jun-ago — Carrossel TOP1 R$9,25/IC · TN R$12,9/IC no
melhor conjunto · CP com CTR bom e 0 IC (não escalar).

---

## FASE 0 — Pré-voo (hoje, 30 min — quase tudo já feito)

- [x] Pixel correto nas LPs (`2259771754833856`)
- [x] InitiateCheckout nos CTAs
- [x] Purchase via CAPI no webhook (validado ponta a ponta)
- [x] Order bumps no ar (AOV do ebook subiu)
- [ ] **Gerenciador de Eventos:** confirmar que Purchase apareceu (origem
  servidor) — 2 min, é o "go" da otimização por compra
- [ ] **Públicos (Audiências) — criar 4:**
  1. `Compradores` — Custom Audience por lista (CSV dos ~230; atualizar mensal)
  2. `Radar+Membros` — lista dos 178 do radar_leads
  3. `Engajou 90d` — IG + FB engagement
  4. `Visitou LP 30d sem IC` — pixel (agora que o IC dispara, esse público
     passa a se popular sozinho)
- [ ] **Encerrar o que não performa:** pausar conjuntos CP (0 IC histórico) e
  o adset legado que otimiza pelo pixel antigo (1630...) — um só conjunto
  ativo por produto durante o teste

## FASE 1 — Produção de criativos (D1-D3)

Ordem de produção (do que destrava mais rápido para o que depende de você):

| # | Peça | Quem faz | Esforço |
|---|---|---|---|
| 1 | **B1**: 3 variações do Carrossel TOP1 (só troca slide 1) | Claude escreve, você monta no Canva | 1h |
| 2 | **A5**: Email "membro fundador" à base (custo zero) | Claude escreve, dispara via Resend | 30 min |
| 3 | **A1**: Carrossel "Não é curso" (7 slides) | Claude escreve, você monta | 1h |
| 4 | **C1**: Reels TN "selo de lupa" — roteiro frame a frame | Claude roteiriza, você grava tela (5 min) | 1h |
| 5 | **A2**: Reels tour da Comunidade — roteiro frame a frame | idem | 1h |
| 6 | **B2**: Reels Hook 5 (você na câmera + B-roll) | Você grava (roteiro pronto na base) | 2h |

Regra: **subir com 1-4 já é suficiente para ligar as campanhas.** 5-6 entram
na semana 2 como refresh.

## FASE 2 — Estrutura de campanhas (D3-D4)

### Campanha 1 · EBOOK (R$50/dia — 55%)
- Objetivo: Vendas · Otimização: **Purchase** (agora existe!)
- Advantage+ (formato que já roda) · 1 conjunto
- Anúncios: Carrossel TOP1 original (mantém histórico) + 3 variações B1
- Destino: `alimentosartesanais.com.br` com UTM
  `?utm_source=meta&utm_campaign=ebook-agosto&sck=ebook-agosto`

### Campanha 2 · TABELA (R$25/dia — 27%)
- Objetivo: Vendas · Otimização: Purchase
- Manter o conjunto TN2 que fez R$12,9/IC; adicionar C1 (Reels selo) quando
  pronto; pausar TN duplicados
- Destino: `tabelanutricional.alimentosartesanais.com.br/lp` + UTM

### Campanha 3 · COMUNIDADE Remarketing (R$15/dia — 18%)
- Objetivo: Vendas · Otimização: Purchase (volume baixo — aceitar "aprendizado
  limitado"; o público é pequeno e quente, o Meta entrega mesmo assim)
- Público: soma dos 4 públicos da Fase 0 (excluir membros atuais)
- Anúncios: A1 + A4; A2 quando gravado
- Destino: `comunidade.alimentosartesanais.com.br/lp` + UTM
- **Só liga DEPOIS do email A5** — se o email vender bem, o remarketing
  amplifica; se não vender nada, o problema é oferta, não mídia

### O que NÃO fazer
- ❌ Campanha fria para a Comunidade (R$257 frio queima verba)
- ❌ Mídia nova para a Calculadora até a LP ser sequenciada
- ❌ Mexer nos criativos vencedores (TOP1 continua rodando intocado)
- ❌ Editar campanha durante a fase de aprendizado (reseta o aprendizado)

## FASE 3 — Rampa e leitura (D5-D18)

| Dia | Ação |
|---|---|
| D5 | Ligar Campanhas 1 e 2. Disparar email A5 à base |
| D6-D7 | Não mexer. Só monitorar entrega (impressões > 0, gasto fluindo) |
| D8 | Ligar Campanha 3 (com leitura do A5 em mãos) |
| D9-D12 | Não mexer. Fase de aprendizado |
| D12 | **Primeira leitura real** — agora com Purchase/ROAS por anúncio |
| D13-D18 | Cortes e realocação (critérios abaixo) |

### Critérios de decisão (D12+)
- **Ebook:** CPA alvo ≤ R$45 (AOV com bumps ≈ R$75-90 → margem real).
  Anúncio com custo/IC > R$25 após R$75 gastos → pausa
- **Tabela:** CPA alvo ≤ R$30. Custo/IC > R$25 → pausa
- **Comunidade:** CPA alvo ≤ R$120 (ticket R$257). Sem venda com R$150
  gastos → pausa e voltar para nutrição por email
- **Realocação:** o vencedor de cada campanha herda o orçamento dos pausados;
  aumento de orçamento sempre ≤ 20%/dia (não resetar aprendizado)

## FASE 4 — Escala e refresh (semana 3+)

1. Vencedor claro no ebook → duplicar conjunto com orçamento 2x (não editar
   o original)
2. Entrar B2 (Reels você na câmera) e A2 (tour) como sangue novo
3. Primeiro depoimento do Marcelo com resultado → criativo A6 (prova social
   real para a Comunidade)
4. Avaliar reativar Calculadora APÓS retrabalhar LP (sequenciamento próprio)
5. Radar semanal → notícias quentes podem virar criativo reativo ("a Anvisa
   mudou X — veja o que fazer") — CTR de notícia é barato

## Medição — onde olhar

- **Gerenciador:** coluna Compras + ROAS (agora reais via CAPI)
- **Hotmart:** vendas por oferta (bump attach rate — Kit e Calculadora)
- **Resend:** aberturas/cliques do A5
- **Regra:** decisão só em D12; antes disso é ruído

---

*Criativos detalhados: `outputs/criativos-comunidade-2026-08.md` ·
Base de hooks: `squads/stories10x/data/gabriel-petelinkar-criativos-trafego.md`*

---

## EXECUTADO EM 04/08 (via API — tudo PAUSADO, nada gastando)

| Objeto | ID | Estado |
|---|---|---|
| Campanha `[AGO26] Ebook — Purchase` | 120250961156550693 | PAUSED |
| └ Adset `Ebook — Advantage — R$50/dia` | 120250961164630693 | PAUSED, otimiza Purchase |
| Campanha `[AGO26] Comunidade — Remarketing` | 120250961157680693 | PAUSED |
| └ Adset `Comunidade — Quentes — R$15/dia` | 120250961165730693 | PAUSED, otimiza Purchase |
| Público `Visitou site 30d` | 120250961134790693 | criado (popula sozinho) |

Copies e roteiros prontos: `outputs/producao-criativos-lote1.md`
(3 variações TOP1 + carrossel Comunidade + roteiro Reels selo + email fundador).

### Pendências manuais (Gabriel)
1. **Aceitar os Termos de Público Personalizado** (1 clique, uma vez):
   https://business.facebook.com/ads/manage/customaudiences/tos/?act=1464087561595179
   → depois disso o Claude cria e sobe as 2 listas (Compradores + Radar) via API
2. **Público "Engajou Página 90d"** — criar na interface (Públicos → Criar →
   Engajamento → Página, 90 dias); a API rejeita o evento
3. **Montar os 4 carrosséis no Canva** (copies prontas no lote 1) e criar os
   anúncios dentro dos adsets pausados
4. **Aprovar o email A5** (texto pronto; falta definir o bônus de fundador)
5. Tabela: sem campanha nova — usar o conjunto TN2 vencedor; na ativação,
   pausar TN duplicados e conjuntos CP
