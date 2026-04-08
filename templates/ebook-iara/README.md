# Pipeline Ebook Iara — Template Replicável

Template base para todos os ebooks/guias interativos da esteira de produtos da M.V. Dra. Iara Petelinkar.

## Arquitetura

Single-file HTML mini app (~100KB), zero dependências externas. Funciona offline após primeiro acesso.

### Stack
- **HTML** single-file com CSS + JS inline
- **Supabase** para controle de acesso (tokens por compra)
- **Hotmart** como plataforma de venda + webhook
- **Vercel** para hospedagem (deploy via CLI)

## Estrutura do Arquivo

```
┌─────────────────────────────────────────┐
│  <head>                                  │
│    <style>                               │
│      1. Reset + Body                     │
│      2. Design Tokens (CSS vars)         │
│      3. Dark Mode overrides              │
│      4. SVG Icon System                  │
│      5. Progress Bar                     │
│      6. Cover (hero)                     │
│      7. Install/Save Button              │
│      8. Access Gate (login)              │
│      9. Layout                           │
│     10. Nav Bar                          │
│     11. Toolbar (search, dark, font)     │
│     12. Search Overlay                   │
│     13. Chapter Styles                   │
│     14. Cards, Tables, Protocols         │
│     15. Chapter Notes                    │
│     16. Footer                           │
│     17. FAB Buttons                      │
│     18. Print Styles                     │
│    </style>                              │
│  </head>                                 │
│  <body class="gate-locked">             │
│    Access Gate Overlay                   │
│    SVG Sprite (hidden, 30+ icons)        │
│    Progress Bar                          │
│    Cover / Hero                          │
│    Nav Bar                               │
│    Toolbar                               │
│    Search Overlay                        │
│    TOC (Table of Contents)               │
│    Chapters (conteúdo principal)         │
│    Footer                                │
│    FAB Buttons (edit, PDF)               │
│    <script>                              │
│      1. Dark Mode Toggle                 │
│      2. Font Size Controls               │
│      3. Search + Highlight               │
│      4. Scroll Spy (IntersectionObserver)│
│      5. Bookmarks (star toggle)          │
│      6. Editor Mode (contenteditable)    │
│      7. PDF Export                        │
│      8. Chapter Notes (auto-save)        │
│      9. Install / Save to Home Screen    │
│     10. Access Gate (token validation)   │
│    </script>                             │
│  </body>                                 │
└─────────────────────────────────────────┘
```

## Funcionalidades Inclusas

| Feature | Descrição |
|---------|-----------|
| Access Gate | Token único por compra, máx 3 dispositivos |
| Dark Mode | Toggle com persistência em localStorage |
| Font Size | 4 tamanhos (SM/MD/LG/XL) |
| Search | Busca full-text com highlight nos resultados |
| Bookmarks | Estrela por capítulo, persiste em localStorage |
| Chapter Notes | Textarea por capítulo, auto-save com debounce |
| Editor Mode | contenteditable para anotações inline |
| PDF Export | Exporta com layout limpo, sem quebras excessivas |
| Install PWA | Botão na cover para salvar na tela inicial |
| Scroll Spy | Nav bar marca capítulo ativo automaticamente |
| Progress Bar | Barra de progresso de leitura no topo |

## Código Mestre (Teste)

**Token:** `MASTER-IARA-2026`

Funciona em **todos** os produtos. 50 dispositivos. Uso exclusivo para testes internos.

- Guia: https://guia-campo-reproducao-equina.vercel.app?token=MASTER-IARA-2026
- Apostila: https://apostila-reproducao-animal.vercel.app?token=MASTER-IARA-2026

Qualquer token que comece com `MASTER-` ignora a validação de `product_id` — funciona em qualquer ebook da esteira.

## Controle de Acesso

### Supabase (projeto: qfkzjhuuoudecxjfsigt)

**Tabelas:**

```sql
ebook_tokens
├── id (uuid, PK)
├── token (text, UNIQUE) — código entregue ao comprador
├── email (text)
├── product_id (text) — identifica qual ebook
├── hotmart_transaction (text)
├── max_devices (int, default 3)
├── devices_used (int, auto-updated via trigger)
├── active (boolean, default true)
├── created_at (timestamptz)
└── expires_at (timestamptz, nullable)

ebook_devices
├── id (uuid, PK)
├── token_id (uuid, FK → ebook_tokens)
├── fingerprint (text) — hash do navegador
├── user_agent (text)
└── created_at (timestamptz)
```

**Trigger:** `trg_update_devices_count` atualiza `devices_used` automaticamente ao inserir device.

**RLS:** anon pode SELECT em ambas tabelas e INSERT em ebook_devices.

### Fluxo de Acesso

```
1. Compra na Hotmart
2. Webhook → cria token no Supabase com product_id
3. Hotmart entrega link: ebook.vercel.app?token=XXXXX
4. JS lê ?token= da URL → valida no Supabase
5. Válido → salva no localStorage → desbloqueia
6. Próxima visita → lê localStorage → revalida silenciosamente
7. Limite: 3 dispositivos por token (fingerprint-based)
```

## Como Criar Novo Ebook

### 1. Copiar template

```bash
cp templates/ebook-iara/template.html outputs/NOME-DO-EBOOK.html
```

### 2. Configurar variáveis no arquivo

Buscar e substituir os placeholders:

| Placeholder | Exemplo |
|-------------|---------|
| `{{TITLE}}` | Guia de Campo |
| `{{SUBTITLE}}` | Reprodução Equina & Hormonioterapia |
| `{{DESCRIPTION}}` | Protocolos prontos... |
| `{{PRODUCT_ID}}` | guia-campo-reproducao-equina |
| `{{COVER_ICON}}` | #i-horse |
| `{{BADGE_TEXT}}` | Consulta Rápida no Campo |
| `{{AUTHOR_NAME}}` | M.V. Dra. Iara Petelinkar |
| `{{AUTHOR_INSTAGRAM}}` | iaranmacedo |
| `{{BUY_LINK}}` | https://hotmart.com/... |
| `{{VERSION}}` | v1.0 — 2026 |
| `{{NAV_ITEMS}}` | Links do nav bar |
| `{{TOC_ITEMS}}` | Itens do sumário |
| `{{CHAPTERS}}` | Conteúdo dos capítulos |

### 3. Personalizar tema (opcional)

Os design tokens em `:root` controlam todo o visual. Para mudar o tema de verde para outra cor, altere as variáveis `--green-*` para a paleta desejada.

### 4. Deploy

```bash
# Criar diretório de deploy
mkdir -p /tmp/ebook-deploy
cp outputs/NOME-DO-EBOOK.html /tmp/ebook-deploy/index.html

# Deploy no Vercel
cd /tmp/ebook-deploy
npx vercel --prod --public --yes
```

### 5. Configurar webhook Hotmart

Endpoint do webhook recebe POST da Hotmart na compra e cria token no Supabase.

## Env Variables

```env
IARA_SUPABASE_URL=https://qfkzjhuuoudecxjfsigt.supabase.co
IARA_SUPABASE_ANON_KEY=eyJhbG...  (pública, usada no frontend)
IARA_SUPABASE_SERVICE_ROLE_KEY=eyJhbG...  (secreta, usada no webhook)
IARA_SUPABASE_DB_PASSWORD=...  (para migrations)
HOTMART_CLIENT_ID=...
HOTMART_CLIENT_SECRET=...
```

## Produtos da Esteira

| # | Produto | product_id | Status |
|---|---------|------------|--------|
| 1 | Guia de Campo — Reprodução Equina & Hormonioterapia | guia-campo-reproducao-equina | ✅ Produção |
| 2 | Apostila — Reprodução Animal (Residência) | apostila-reproducao-animal | ✅ Produção |
| 3 | (próximos) | — | — |
