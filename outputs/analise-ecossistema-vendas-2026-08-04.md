# Análise Completa do Ecossistema de Vendas — Artesanal na Prática

**Data:** 04/08/2026 · **Método:** 5 agentes de exploração (LP/funil, plataforma, ferramentas, comunidade/link-bio, radar/mentoria) + segundo cérebro + dashboard de ads
**Objetivo:** vender mais, converter mais

---

## 1. Diagnóstico central

O ecossistema tem **produto demais e aproveitamento de menos**. A esteira está completa no papel (Quiz grátis → Tabela R$37 → Calculadora R$47 → Ebook R$57 → Legaliza R$97 → Comunidade R$257 → Mentoria R$4.700), os produtos são tecnicamente bons — mas o dinheiro vaza em três lugares:

1. **Tracking quebrado** — o Meta otimiza campanhas às cegas (pixel errado na LP principal, zero eventos `Purchase` no ecossistema inteiro, link-bio com pixel inválido).
2. **Backend inexistente** — nenhuma sequência de email, order bump pronto e não cadastrado, ~230 compradores sem nenhuma comunicação, mentoria de R$4.700 invisível.
3. **Funil que se canibaliza** — a LP do ebook oferece rota de fuga de R$257 ao indeciso de R$57; a LP do app manda tráfego para um quiz que vende outro produto 2x mais caro.

**Números de referência (snapshot jun/26, últimos 30d):** receita R$5.290 · gasto Meta R$4.934 (c/ taxa) · **lucro R$-286 · ROAS real 1.07** · 285 checkouts iniciados → 69 compras = **76% de abandono de checkout**. A operação pagava para vender. Com esse quadro, a alavanca não é mais tráfego — é aproveitamento do tráfego e da base que já existem.

---

## 2. Achados críticos (sangram dinheiro agora)

### 2.1 Pixel errado na LP do ebook — `index.html:592`
A LP principal inicializa o pixel `1653329678086878` — ID que **não corresponde a nenhum pixel documentado** (primário `2259771754833856`, legado `1630329678088878`). Parece erro de digitação. Propagado em 4 arquivos: `index.html:592`, `index-backup-12secoes.html:1391`, `lp-47.html:1353`, `lp-57.html:1353`.
**Antes de corrigir:** verificar no Gerenciador de Eventos qual ID está de fato recebendo dados — se o "errado" acumula histórico, a troca zera aprendizado de campanha.

### 2.2 Zero eventos `Purchase` em todo o ecossistema
Nenhum produto dispara `Purchase` ao Meta — nem por pixel, nem por Conversions API. Os webhooks Hotmart/Eduzz (`artesanal-na-pratica/src/app/api/webhooks/hotmart/route.ts`) recebem `PURCHASE_COMPLETE` com email e valor e não notificam o Meta. As campanhas otimizam para `InitiateCheckout` — um proxy com 76% de falso positivo. **É a maior alavanca de ROI de ads disponível.**

### 2.3 LP do ebook só dispara `PageView`
Sem `InitiateCheckout` nos 4 CTAs → sem público de remarketing "abandonou checkout", sem otimização por intenção. ~5 linhas de JS no bloco que já injeta UTMs (`index.html:1084`).

### 2.4 Link-bio com pixel de 17 dígitos
`link-bio/index.html:219` usa `36292978087015933` (IDs Meta têm 15-16 dígitos; não bate com nenhum documentado). O link-bio é a porta do Instagram — a jornada Instagram → bio → LP → checkout está partida no primeiro elo. Nenhum dos 7 links tem UTM.

### 2.5 Calculadora e Tabela sem nenhum controle de acesso
Nos dois apps a ferramenta paga fica na raiz (`/`) sem login, licença ou middleware — quem tiver a URL usa grátis para sempre; um link num grupo de WhatsApp zera as vendas. E o FAQ da calculadora promete "e-mail com login e senha" que não existe (`calculadora-artesanal/src/app/lp/page.tsx:167-169`).

### 2.6 Comunidade promete "acesso por 1 ano" que o código não implementa
A LP afirma em 4 lugares (`comunidade-artesanal/src/app/lp/page.tsx:32,52,366,630`), mas `ca_profiles` não tem campo de expiração e o webhook não grava validade. Acesso é vitalício na prática: receita de renovação incapturável + risco jurídico se cortar acesso depois.

### 2.7 Quiz canibaliza a LP do app (R$127)
`/lp` tem 3 CTAs mandando para o quiz (`src/app/lp/page.tsx:218,501,751` — um logo abaixo do botão de compra). O quiz vende a **Comunidade R$257** (`quiz/page.tsx:974`), sem caminho de volta para os R$127. O indeciso no preço recebe oferta 2x mais cara de outro produto. Decidir: segmentar oferta por score, ou remover os CTAs.

### 2.8 Comunidade entrega versões piores das ferramentas avulsas
As ferramentas foram **reimplementadas reduzidas** dentro da comunidade (582 vs 2.035 linhas; 889 vs 1.405): sem wizard, templates, multi-produto, recomendações, USDA. Quem paga R$257 recebe menos ferramenta que quem paga R$47. Proposta de valor invertida + 4 bases de código para 2 produtos.

---

## 3. Dinheiro pronto na mesa (produto existe, falta ligar)

| Ativo | Estado | Ação | Estimativa |
|---|---|---|---|
| **Kit Legaliza R$27** (order bump) | Produto 100% pronto: `outputs/bonus/kit-legaliza-artesanal.html` (2.450 linhas) + capas | Cadastrar bump na Hotmart | ~R$620/mês (pesquisa própria) |
| **~230 compradores em CSV** | `lista-compradores-ebook.csv` (73) + `lista-compradores-artesanal-filtrada.csv` (157) — zero comunicação | Sequência de emails via Resend (já configurado) | Monetização mais barata do funil |
| **Email de depoimentos** | Pronto em `outputs/email-depoimento-radar.md`, com filtro por PRODUCT_ID documentado | Enviar | Destrava prova social de TODO o ecossistema |
| **Curso completo (15 aulas)** | Gravado (`outputs/aula-01..15`), parado | Empacotar R$247-297 como upsell | Tier intermediário ausente |
| **Ficha técnica interativa** | `public/ferramentas/ficha-tecnica.html` (56KB), pública, sem link de entrada e sem captura | Linkar no link-bio/LP com captura de email | Lead magnet órfão |
| **Order bump Planilha R$17** | Ativo, 55% de conversão | Manter — é referência do que bump rende | — |

---

## 4. Análise por camada

### 4.1 Técnica

**Bom:** stack moderna e uniforme (Next 16/React 19/Tailwind 4/Supabase/Resend); webhooks idempotentes com filtro por PRODUCT_ID; RLS correta no Radar; LP do ebook com injeção de UTM funcionando; sticky CTAs com IntersectionObserver.

**Problemas:**
- `gabriel-ebook-mockup.png` com **2 MB**, sem lazy, exibido a 300px (`index.html:820`) → WebP 600px ≈ 70KB (-96%). `vercel.json` sem regra de cache para imagens na raiz. Público em 4G rural.
- Variáveis CSS inexistentes na LP (`--bg`, `--heading` usadas em 6 pontos, nunca definidas) → cards sem fundo, contraste quebrado silenciosamente.
- 3 grids com `grid-template-columns` inline sem media query (`index.html:722,756,826`) → esmagados em 360px.
- USDA com `DEMO_KEY` hardcoded (30 req/h) na Tabela Nutricional (`NutritionCalculator.tsx:67`).
- Açúcares totais aproximados = carboidratos totais → errado para amiláceos (pães, biscoitos).
- localStorage como único armazenamento nas ferramentas → troca de celular apaga tudo (risco de reembolso; oportunidade de upgrade com conta).
- Login da plataforma sem "esqueci minha senha" → comprador que perde o email de boas-vindas fica travado.
- Gamificação da comunidade **morta**: `gamification.ts` e `badges.ts` completos, nunca chamados; todo aluno vê 0 pontos e cadeados para sempre; barra de progresso com `width: '60%'` hardcoded.
- `last_seen_at` existe e nada o atualiza → impossível saber quem está inativo.
- Tokens CSS divergentes entre calculadora e tabela; `design-system/` existe e não é consumido.

### 4.2 Tracking e dados

| Ativo | PageView | Lead | InitiateCheckout | Purchase | UTM |
|---|---|---|---|---|---|
| LP ebook | ✅ (pixel ERRADO) | — | ❌ | ❌ | ✅ envia |
| Quiz | ✅ | ✅ (value 257) | ✅ | ❌ | ❌ não lê |
| LP app /lp | ✅ | — | ✅ | ❌ | ❌ |
| LPs ferramentas | ✅ | — | ✅ | ❌ | ❌ |
| LP comunidade | ✅ | — | ✅ | ❌ | ❌ |
| Link-bio | ✅ (pixel INVÁLIDO?) | ❌ | custom só | ❌ | ❌ |
| Radar LP | ✅ (pixel próprio?) | ✅ | — | ❌ | ❌ |

Sem CAPI, sem deduplicação (`eventID`), sem advanced matching (quiz tem email+telefone na mão e não passa ao pixel), sem GA4/analytics complementar. Coluna `quiz_leads.converted` criada para reconciliar venda e **nunca escrita**. Bases fragmentadas (radar_leads, quiz_leads, profiles, Hotmart, Eduzz) sem visão única.

### 4.3 Design

Identidade aplicada com consistência real em todo o ecossistema (#FFF9F0/#B5563A/#5A7A42/#D4A853/#3D2B1F, Montserrat+DM Sans+JetBrains Mono). Mobile bem resolvido em geral. Problemas pontuais:
- **Proof bar da LP do ebook escondida no mobile** (`index.html:442`) — apaga "12+ anos, jurado nacional" justamente para a maioria do tráfego.
- Numeração de seções quebrada na LP (01, 02, 03 → pula para 06) — resíduo de cortes.
- Depoimentos como print de imagem (LP ebook e comunidade) — sem transcrição, sem SEO, desequilibrados no layout.
- Duas âncoras de preço concorrentes na oferta do ebook (R$269 riscado E R$148 riscado na mesma caixa; nav e sticky usam só R$148).
- LP do ebook com fundo base `#EDE5D5` divergente do `#FFF9F0` do resto da marca (decisão consciente? registrar).
- Comentários HTML órfãos e um não fechado (`index.html:790`).

### 4.4 Copy e oferta

**Forte:** headline do ebook ("Seu produto já é bom. O problema é que o preço não mostra isso"); LP da Tabela com ângulo regulatório agressivo e disclaimer legal correto; link-bio com títulos por problema ("Regularizar meu rótulo"); propostas de mentoria excelentes (mas vistas por 2 pessoas).

**Fraco:**
- "Pagamento seguro via **Eduzz**" com checkout **Hotmart** na caixa de oferta da LP do app (`lp/page.tsx:746`).
- LP do ebook sem CTA final — termina em FAQ → seção Comunidade → footer; o leitor de alta intenção que lê o FAQ não encontra mais o botão do ebook. (O backup 12 seções tinha CTA final; foi cortado.)
- Seção Comunidade R$257 dentro da LP do ebook = rota de fuga do indeciso ("este ebook já está incluso na Comunidade"). Pertence à página de obrigado.
- Urgência prometida e não entregue ("preço promocional" sem deadline nem contador).
- Estatísticas sem fonte ("3x mais faturamento") — risco de compliance Hotmart.
- Apenas 4 CTAs em ~1.100 linhas; faltam nos picos emocionais (pós-Transformação, pós-Prova Social).
- LP do app posiciona a plataforma como substituta da consultoria ("80% do valor por 5% do investimento") — **compete com a própria mentoria**.
- FAQ sem a objeção nº 1 de ebook: "não tenho tempo de ler".

### 4.5 Funil e esteira

**Radar Artesanal** (21 inscritos): automação semanal FUNCIONA na VPS (cron Hermes seg 06h, Fase A automática + Fase B com aprovação — `RADAR-AUTOMACAO.md`; edição #003 enviada 03/08 com 0 falhas). Gaps: CTA comercial errático (muda nome e produto a cada edição, sem UTM, sem medir), zero segmentação (comprador recebe oferta do que já comprou), sem sequência de boas-vindas (pico de intenção desperdiçado), loop de indicação montado mas sem incentivo e sem leitura de `referred_by`, avaliação 👍/👎 coletada e nunca analisada, voto exige 2 cliques e 👎 não tem campo de texto.

**Quiz** (ativo mais bem construído do funil): 15 perguntas, captura obrigatória pré-resultado, email de follow-up bem feito. Gaps: leads morrem após 1 email; telefone coletado com promessa de WhatsApp **nunca cumprida**; sem nurture; sem Custom Audience.

**Comunidade**: plataforma grande e genuína (14 rotas, fórum, biblioteca, 42 fornecedores), mas **1 único email na vida do membro** (boas-vindas), gamificação morta, núcleo sem commits desde meados de junho, **zero cross-sell interno** — o membro (lead mais quente para os R$4.700) nunca vê a mentoria depois de comprar; o card de mentoria só existe na LP, mostrado a quem NÃO comprou.

**Mentoria R$4.700** (maior ticket): **nenhum ativo público de venda** — sem página, sem formulário de aplicação, sem depoimento publicado. Fluxo 100% artesanal (inbound → call → proposta manual). Entrega forte (painéis, squad de 8 agentes, metodologia CVE), mas: Queen of Peppers sem follow-up desde 24/06; pagamento da Carmen pendente desde junho; escopo divergente entre propostas (6 sessões vs 10); `programa-status.yaml` desatualizado.

**Emails/CRM**: Resend configurado, domínio verificado — e **zero sequências**. Só 3 transacionais. A Soap Opera Sequence de 5 emails especificada no `plano-otimizacao-funil.md` (maio) nunca saiu do papel. Comprador não vira assinante do Radar (1 linha no webhook resolveria).

---

## 5. Plano de ação priorizado

### 🔴 Agora (horas de trabalho — correções de hemorragia)
1. **Auditar pixels no Gerenciador de Eventos** (qual ID recebe dados?) → corrigir pixel da LP do ebook (4 arquivos) e do link-bio.
2. **`InitiateCheckout` na LP do ebook** (~5 linhas no bloco de UTM existente).
3. **`Purchase` via Conversions API nos webhooks** Hotmart/Eduzz (email + valor já estão lá; adicionar hash + eventID). Maior alavanca de ROI de ads.
4. **Mockup 2MB → WebP** + lazy + regra de cache p/ imagens no `vercel.json`.
5. **Corrigir copy**: "Eduzz"→Hotmart na LP do app; FAQ da calculadora que promete login inexistente.
6. **UTMs nos 7 links do link-bio.**

### 🟠 Esta semana (destravar dinheiro pronto)
7. **Cadastrar Kit Legaliza como order bump R$27** na Hotmart (produto pronto; ~R$620/mês).
8. **Enviar email de depoimentos** aos ~230 compradores (filtrar por PRODUCT_ID — não atingir a lista do Guia Equino!). Destrava prova social de tudo.
9. **Mover a seção Comunidade da LP do ebook para a página de obrigado** + **restaurar o CTA final** (existe no backup) + reativar proof bar no mobile em formato compacto.
10. **Decidir o conflito quiz × LP**: segmentar oferta por score (baixo → app R$127; alto → Comunidade R$257) ou remover os 3 CTAs de quiz da LP.
11. **Webhook de compra insere comprador em `radar_leads`** (1 linha, ganho permanente).
12. **Sequência de boas-vindas do Radar** (3 emails: quem é o Gabriel / ferramenta grátis / oferta ebook R$57).

### 🟡 Este mês (construir o backend)
13. **Página de vendas + formulário de aplicação da mentoria** — a copy já existe nas propostas ("Você é uma Ferrari andando na primeira marcha"); generalizar. + Follow-up da Queen of Peppers (parada desde 24/06) e cobrança da Carmen.
14. **Cross-sell interno na Comunidade** → card de mentoria no dashboard e no fim do `/diagnostico` (que já qualifica o gargalo).
15. **Sequência pós-compra de 5 emails** (já especificada no plano de maio) + nurture do quiz + cumprir a promessa do WhatsApp ou parar de coletar telefone.
16. **Gate de acesso nas ferramentas** (token na querystring → cookie; zero fricção p/ comprador legítimo) + trial com PDF marcado d'água como degustação.
17. **Resolver o "1 ano" da Comunidade**: implementar `access_expires_at` OU mudar copy para vitalício e usar como argumento. + Ligar gamificação (meio dia — chamar `awardSeeds`/`updateStreak` onde o progresso já grava) ou esconder as seções zeradas.
18. **Padronizar CTA comercial do Radar** em escada fixa com UTM e segmentação comprador/não-comprador.
19. **Reconciliação lead→venda**: escrever `quiz_leads.converted` a partir do webhook; unificar visão de base (radar + quiz + compradores).
20. **Empacotar o curso de 15 aulas** (R$247-297) como upsell/tier intermediário entre R$57 e R$257.

### Estratégia de fundo
Com ROAS 1.07 no front-end, o lucro do ecossistema virá do **LTV, não da primeira venda**: bump (7) + emails (8, 12, 15) + ascensão interna (13, 14) transformam o mesmo tráfego pago em margem. A regra de ouro do quadro atual: **antes de escalar tráfego, consertar tracking (1-3) e ligar o backend (7-15)** — senão cada real de mídia continua comprando prejuízo.

---

## 6. Pendências operacionais desta análise
- **Token Hotmart do MCP expirado** (401) — sem dados live de vendas; renovar (CLAUDE.md indica expiração ~21/08, chegou antes).
- **MCP Meta desta sessão** autenticado na conta Coelho e Dias — sem acesso à `act_1464087561595179`; dados de ads vieram do snapshot de jun/26. Reconectar com a conta certa para números atuais.
- **MCP Supabase** apontado para outra org — base de alunos da Comunidade não verificada.
- Confirmar com Gabriel/Isis antes de alterar preço, oferta, checkout ou comunicação externa (regra do domínio).
