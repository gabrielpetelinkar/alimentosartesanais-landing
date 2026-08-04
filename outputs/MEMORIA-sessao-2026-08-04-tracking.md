# Memória de sessão — 04/08/2026 · Correções de tracking

**Modelo:** Opus 5 (sessão seguinte deve rodar em Fable 5)
**Base:** `outputs/analise-ecossistema-vendas-2026-08-04.md` (plano priorizado, seção 5)

---

## Concluído e em produção

### 1. Pixel Meta corrigido (item 🔴 1 do plano)

O pixel `1653329678086878` usado nas LPs **não existe** — a Graph API retorna
"does not exist" para esse ID. Todo evento enviado a ele foi descartado desde
sempre. O endpoint `/tr` responde HTTP 200 para qualquer ID, o que mascarou o
erro no navegador por meses.

**Pixel correto: `2259771754833856`** ("Pixel Alimentos Artesanais 2").
Evidências convergentes:

| Evidência | Resultado |
|---|---|
| Pixels da conta | Só existem 2: `2259771754833856` e `1630329678088878` |
| Adsets ativos | 5 de 6 otimizam pelo `2259771754833856` |
| `1653329678086878` na Graph API | "does not exist" |

**Não houve perda de aprendizado de campanha** — como o ID não correspondia a
pixel algum, não havia histórico a preservar. Essa era a ressalva da análise
original ("verificar antes de corrigir"); ficou resolvida.

O pixel legado `1630329678088878` permanece em paralelo, sem alteração.

### 2. InitiateCheckout (item 🔴 2 do plano)

Adicionado nos 4 CTAs de cada LP. Antes, só `PageView` chegava ao Meta,
enquanto as campanhas otimizam para `PURCHASE`.

Decisões tomadas:
- **Sem guard de "dispara uma vez"** — quem volta do checkout e clica de novo é
  intenção real. Deduplicação via `eventID` único por clique, que é o mecanismo
  próprio do Meta e já prepara o terreno para a Conversions API.
- **`content_ids` por oferta** (`ebook-47` / `ebook-57`): mesmo produto Hotmart
  (`D105263783H`), ofertas distintas (`b1qff5rp` R$47, `q90ec1wq` R$57).

### Estado do deploy

- Branch: `fix/meta-pixel-initiate-checkout`, commit `26bb247`
- Push: OK (exigiu `gh auth switch --user gabrielpetelinkar` — o padrão local é
  `orizabrasil-bot`, sem permissão de escrita nesse repo)
- Deploy: `vercel --prod`, validado nas 3 rotas em produção
  (`/`, `/lp-57`, `/lp-47`): pixel novo presente, pixel inexistente ausente,
  `InitiateCheckout` presente
- **PR ainda não aberto** — a branch está no remoto, não mergeada em `main`

**Validação pendente (você):** confirmar no Gerenciador de Eventos que o
`2259771754833856` passou a receber `PageView` e `InitiateCheckout`.

---

## MCPs — estado real

### Meta Ads: sempre esteve OK
Usar **`mcp__meta-ads-gabriel__*`**, não o MCP genérico da claude.ai (que
autentica noutra conta e gerou o falso diagnóstico da análise).

- Usuário: Gabriel Petelinkar (`27253689267570101`)
- Conta: `act_1464087561595179` ("Gabriel"), business "Gabriel Petelinkar"
- **Token não expira** — corrige a nota do CLAUDE.md ("expira ~21/08/2026")

### Hotmart: estava quebrado por bugs do pacote, não por credenciais
`@theyahia/hotmart-mcp` tem 4 defeitos. Wrapper corrigido em
`~/mentorias/hotmart-mcp-patched/` (patches versionados + `postinstall` que os
reaplica; validado que sobrevivem a reinstalação). `.mcp.json` aponta para lá.

1. **Token 401** — não enviava `Authorization: Basic` e mandava os parâmetros no
   body; a Hotmart exige ambos na query string
2. **`list_products`** — usava `payments/api/v1`, que responde 200 com corpo
   vazio; o correto é `products/api/v1`
3. **Paginação** — enviava `page`/`limit` (HTTP 400); o correto é
   `max_results`/`page_token`, e `transaction_status` em vez de `status`
4. **`list_subscriptions`** — usava `/sales/subscriptions`; o correto é
   `/subscriptions`

As 5 ferramentas de leitura foram testadas e funcionam. As de escrita
(`refund_purchase`, `cancel_subscription`) **não** foram testadas — são
destrutivas e exigem autorização do Gabriel.

**Divergência a investigar:** a API reporta 42 vendas totais / 8 aprovadas, e as
aprovadas recentes são do Guia Equino. Não bate com o snapshot de jun/26 da
análise (69 compras). Conferir o padrão de filtro antes de usar esses números
para decisão.

---

## Aberto — próximos passos

### Decisão do Gabriel: aposentar a lp-47
"não vamos usar mais lp47, o preço de 57 já foi testado e aprovado".

**BLOQUEADO:** não consegui confirmar se algum anúncio ativo ainda aponta para a
`lp-47`. Os 12 anúncios ativos usam criativos do tipo `SHARE` (posts existentes),
e três tentativas pela Graph API não retornaram as URLs de destino.

Antes de remover a página, resolver por uma destas vias:
- Gabriel confere o destino dos 12 ativos no Gerenciador de Anúncios (mais
  confiável), **ou**
- tentar a API de preview dos anúncios, que às vezes expõe o link

Nota: as campanhas ativas incluem Tabela Nutricional (`TN2`, `TN3`) e Calculadora
(`CP2`) — nem todo tráfego é do ebook, então o impacto provavelmente é pequeno,
mas precisa ser confirmado, não presumido.

### Lote 2 — concluído e em produção (04/08, sessão Fable)

Toda a fila 🔴 restante de correções rápidas foi executada e validada:

- **Imagens → WebP** (AIOSORIZA, commit `359e24d`, pushed + deployado):
  mockup 2 MB → 54,8 KB (−97%), capa 439 KB → 39,8 KB (−91%), ambas com
  `loading=lazy` + `width/height`. `vercel.json` com cache immutable de 1 ano
  para imagens da raiz. **Atenção: atualizar imagem agora exige renomear o
  arquivo** (cache busting por nome).
- **Monorepo `~/mentorias`** (commit `bbbb242`, pushed + 3 projetos deployados
  via CLI — push NÃO dispara auto-deploy na Vercel):
  - link-bio: pixel de 17 dígitos `36292978087015933` → `2259771754833856`;
    UTMs (`utm_source=linkbio&utm_medium=bio&utm_campaign=<produto>`) nos 6
    links de produto
  - LP do app: "Pagamento seguro via Eduzz" → Hotmart
  - Calculadora: FAQ "e-mail com login e senha" → "link de acesso"

Validado em produção: link-bio (pixel ok, 6 UTMs), app (Hotmart), calculadora
(copy nova), LP ebook (WebP servido com cache immutable, 54.826 bytes).

### Lote 3 — Purchase via Conversions API (04/08, concluído e deployado)

Commit `c72a664` no monorepo mentorias, deployado em produção.

- **`src/lib/meta-capi.ts`** (novo): envia Purchase server-side ao pixel
  `2259771754833856`. Email/telefone hasheados (SHA-256, DDI 55),
  `event_id = purchase-{transaction}` deduplica retries e o par
  APPROVED/COMPLETE — e casa com o `eventID` do browser se um dia o
  checkout disparar Purchase por pixel. Nunca lança erro.
- **Webhook Hotmart**: dispara em `PURCHASE_APPROVED` e `PURCHASE_COMPLETE`,
  ANTES da lógica de conta — vale para qualquer produto que chegue ao
  webhook, mesmo com usuário já existente. Helpers estendidos (price,
  currency, product).
- **Eduzz saiu de cena** (decisão do Gabriel, 04/08) — webhook mantido no
  ar para eventos residuais, sem CAPI.
- Envs na Vercel (production): `META_PIXEL_ID`, `META_CAPI_ACCESS_TOKEN`.
  Token validado contra a CAPI com `test_event_code` → `events_received: 1`.
- Rota validada em produção: POST sem/com hottok inválido → 401.

**VALIDADO PONTA A PONTA (04/08 12:58):** a tela da Hotmart revelou que
NENHUM webhook apontava para o app (os existentes iam para Comunidade e
Guia Equino; o ebook não tinha nenhum). Gabriel cadastrou "Webhook_todos"
(todos os produtos, Compra aprovada + Compra completa). O teste inicial
deu 401 — o HOTMART_HOTTOK da Vercel (69 dias) estava errado; corrigido
com o hottok real da aba Autenticação + redeploy. Retentativa da Hotmart:
HTTP 200 + log "[meta-capi] Purchase enviado". Circuito fechado.

Arquitetura final (commit `dcc2b19`): CAPI para todos os produtos exceto
`META_CAPI_SKIP_PRODUCT_IDS` (=8015141, Guia Equino); conta da plataforma
só para `HOTMART_ACCOUNT_PRODUCT_ID` (não definido = nenhuma); reembolso
só desativa conta do produto da plataforma.

### Fila restante
- Nurture: comprador → `radar_leads` (1 linha no webhook), sequência de
  boas-vindas do Radar, email de depoimentos aos ~230 compradores
- Kit Legaliza R$27 como order bump na Hotmart (produto pronto)

### Achado lateral (não estava na análise)
`lp-47.html` e `lp-57.html` **não têm o bloco de injeção de UTM** que o
`index.html` tem — não repassam `sck`/`src` ao checkout, então vendas vindas
delas chegam sem atribuição. Não corrigido.

---

## Notas de processo

- `.mcp.json` está modificado (aponta para o wrapper do Hotmart) e **não foi
  commitado** — é infra local, mantido fora da correção da LP
- Push neste repo exige `gh auth switch --user gabrielpetelinkar`
- Backups dos HTML originais em `/tmp/*.bak` (voláteis)

### Lote 4 — Order bumps configurados (04/08, Gabriel no painel + Claude no material)

Kit Legaliza Artesanal cadastrado na Hotmart a **R$37** (subiu de R$27 na
hora do cadastro). PDF de entrega gerado do HTML (15 págs) com **~75 erros
de acentuação corrigidos** antes de publicar. Copy completa em
`outputs/bonus/kit-legaliza-hotmart-cadastro.md`.

Mapa final de bumps (montado pelo Gabriel no painel):

| Checkout | Bump 1 | Bump 2 |
|---|---|---|
| Ebook R$57 | Kit Legaliza R$37 | Calculadora R$37 (oferta) |
| Calculadora R$47 | Ebook R$39 (oferta) | Kit Legaliza R$37 |
| Tabela R$37 | Ebook R$39 (oferta) | Kit Legaliza R$37 |

- **Planilha R$17 descontinuada** — substituída pela Calculadora (o
  benchmark de 55% de conversão era dela; não vale mais como referência)
- Comunidade R$257 fora dos bumps (pós-compra/email)
- Toda venda de bump → Purchase no Meta via Webhook_todos (automático)

**Acompanhar em ~2 semanas:** conversão de cada bump no relatório Hotmart;
testar trocar Calculadora↔Tabela no checkout do ebook.

### Lote 5 — PR + base do Radar (04/08, final da sessão)

- **PR #1 aberto**: `fix/meta-pixel-initiate-checkout` →
  https://github.com/gabrielpetelinkar/alimentosartesanais-landing/pull/1
  (produção já roda o código; merge só alinha o main — aguarda Gabriel)
- **155 compradores importados no Radar** (`radar_leads`, `source=comprador`)
  e **edição #003 enviada: 155 ok, 0 falhas**. Base: 22 → 177 inscritos.
  - Lista final: 157 únicos (lista-ebook 100% contida na filtrada);
    2 já inscritos; 0 equinos (conferido contra 40 compradores da API)
  - A partir da #004 (segunda) entram no fluxo automático do Hermes
  - Acompanhar bounces no Resend; >5% → limpar inválidos
- Segmentação futura: `source=comprador` permite não ofertar o ebook a quem
  já comprou (gap da análise)

### Fila para próxima sessão
1. Sequência de boas-vindas do Radar (3 emails)
2. Email de depoimentos aos compradores (pronto em outputs/email-depoimento-radar.md)
3. lp-47: conferir destinos dos anúncios no Gerenciador antes de aposentar
4. Merge do PR #1 (decisão Gabriel)
5. Em ~2 semanas: conversão dos bumps na Hotmart; em 5-7 dias: ROAS real no Gerenciador
