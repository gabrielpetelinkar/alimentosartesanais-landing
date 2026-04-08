# Stories 10x

> De 1 historia autentica a 10+ pecas de conteudo em multiplas plataformas — guiado por 7 elite minds com frameworks documentados.

**Pattern:** SC-DP-003 (Squad README)

---

## Visao Geral

Stories 10x transforma historias autenticas em maquinas de conteudo escalavel. O squad orquestra 7 agentes baseados em elite minds reais, cada um especialista em uma fase da jornada de multiplicacao de conteudo.

O conceito central: pegar 1 historia autentica e multiplicar em 10+ formatos de conteudo em multiplas plataformas, mantendo autenticidade e gerando resultados de negocio.

### Proposito

Dar ao criador de conteudo um sistema completo e comprovado para:
- Descobrir historias autenticas que ressoam
- Estruturar narrativas para maximo impacto (SB7)
- Multiplicar 1 historia em 10+ pecas de conteudo
- Engenheirar hooks que capturam atencao nos primeiros 3 segundos
- Sistematizar producao de conteudo semanal repetivel
- Conectar conteudo diretamente a receita
- Criar storytelling visual autentico

### Dominio

Content Multiplication / Storytelling / Creator Economy / Content Systems

---

## Agents

| Agent | Icone | Tier | Papel | Framework Principal |
|-------|-------|------|-------|---------------------|
| @stories10x-chief | 📖 | Orchestrator | Orquestracao e diagnostico | Stories Journey (6 fases) |
| @donald-miller | 📕 | Tier 0 | Descoberta e estrutura de historias | StoryBrand SB7 Framework |
| @gary-vaynerchuk | 🔊 | Tier 1 | Multiplicacao de conteudo | Content Model Pyramid + Document Don't Create |
| @brendan-kane | 🪝 | Tier 1 | Engenharia de hooks e atencao | Hook Point Framework |
| @justin-welsh | ⚙️ | Tier 1 | Sistema de conteudo repetivel | Content Operating System |
| @casey-neistat | 🎬 | Tier 2 | Storytelling visual autentico | Vlog 3-Act Structure |
| @dan-koe | 💎 | Tier 2 | Ponte conteudo → receita | Content Monetization Flywheel |

---

## Stories Journey (6 Fases)

```
Fase 0: DISCOVER   → Donald Miller    → Descubra suas historias autenticas
     ↓
Fase 1: ARCHITECT  → Donald Miller    → Estruture para impacto (SB7)
     ↓
Fase 2: MULTIPLY   → Gary Vaynerchuk  → 1 historia → 10+ pecas de conteudo
     ↓
Fase 3: HOOK       → Brendan Kane     → Engenharia de atencao
     ↓
Fase 4: SYSTEMIZE  → Justin Welsh     → Sistema semanal repetivel
     ↓
Fase 5: MONETIZE   → Dan Koe          → Conecte conteudo a receita
         *
       VISUAL      → Casey Neistat    → Specialist cross-cutting (fases 1-4)
```

---

## Estrutura

```
squads/stories10x/
├── agents/                       # Definicoes de agents
│   ├── stories10x-chief.md       # Orchestrator
│   ├── donald-miller.md          # Tier 0: Story Discovery & Architecture
│   ├── gary-vaynerchuk.md        # Tier 1: Content Multiplication
│   ├── brendan-kane.md           # Tier 1: Hook Engineering
│   ├── justin-welsh.md           # Tier 1: Content System
│   ├── casey-neistat.md          # Tier 2: Visual Storytelling
│   └── dan-koe.md                # Tier 2: Content Monetization
├── tasks/                        # Tasks executaveis
│   ├── discover-stories.md
│   ├── architect-story.md
│   ├── multiply-content.md
│   ├── engineer-hooks.md
│   ├── build-content-system.md
│   ├── connect-revenue.md
│   └── create-visual-story.md
├── checklists/                   # Validacoes
│   └── journey-readiness.md
├── workflows/                    # Orquestracoes
│   └── wf-stories-journey.yaml
├── templates/                    # Templates reutilizaveis
├── data/                         # Dados e knowledge bases
├── docs/                         # Documentacao do squad
├── sops/                         # Procedimentos
├── config.yaml                   # Configuracao do squad
└── README.md                     # Este arquivo
```

---

## Quick Start

```bash
# 1. Ativar agent principal
@stories10x:stories10x-chief

# 2. Ver comandos disponiveis
*help

# 3. Diagnosticar sua fase atual
*diagnose

# 4. Ou iniciar jornada completa
*journey
```

### Exemplo de Uso

```
User: @stories10x:stories10x-chief
Agent: 📖 Stories 10x ready. Where are you in your content journey?

User: I have great knowledge but struggle to create consistent content
Agent: Based on your situation, start at Phase 0 with Donald Miller.
       Command: *diagnose

User: *diagnose
Agent: [Routes to @donald-miller for story discovery using StoryBrand SB7]
```

---

## Workflows Disponiveis

| Workflow | Arquivo | Trigger | Descricao |
|----------|---------|---------|-----------|
| Stories Journey | `workflows/wf-stories-journey.yaml` | `*journey` | Jornada completa de 6 fases |

---

## Comandos por Agent

### @stories10x-chief (Orchestrator)

| Comando | Descricao |
|---------|-----------|
| `*journey` | Iniciar jornada completa |
| `*diagnose` | Diagnosticar fase atual |
| `*status` | Ver progresso |
| `*help` | Lista todos os comandos |

### @donald-miller (Fases 0-1)

| Comando | Descricao |
|---------|-----------|
| `*discover-stories` | Descobrir suas historias autenticas |
| `*brand-script` | Criar BrandScript SB7 |
| `*architect-story` | Estruturar historia para impacto |
| `*pillar-story` | Identificar historia-pilar principal |

### @gary-vaynerchuk (Fase 2)

| Comando | Descricao |
|---------|-----------|
| `*multiply` | Multiplicar 1 historia em 10+ pecas |
| `*content-pyramid` | Criar Content Pyramid |
| `*platform-native` | Adaptar para cada plataforma |
| `*document` | Aplicar "Document Don't Create" |

### @brendan-kane (Fase 3)

| Comando | Descricao |
|---------|-----------|
| `*hook-library` | Gerar biblioteca de 50+ hooks |
| `*hook-test` | Testar e iterar hooks |
| `*pattern-interrupt` | Criar pattern interrupts |
| `*thumb-stop` | Engenheirar thumb-stopping moments |

### @justin-welsh (Fase 4)

| Comando | Descricao |
|---------|-----------|
| `*content-os` | Construir Content Operating System |
| `*weekly-system` | Criar sistema semanal repetivel |
| `*30-day-calendar` | Gerar calendario de 30 dias |
| `*templates` | Criar templates reutilizaveis |

### @casey-neistat (Visual Specialist)

| Comando | Descricao |
|---------|-----------|
| `*visual-story` | Criar estrutura de video storytelling |
| `*shot-list` | Gerar shot list |
| `*editing-rhythm` | Definir ritmo de edicao |
| `*b-roll` | Planejar B-roll strategy |

### @dan-koe (Fase 5)

| Comando | Descricao |
|---------|-----------|
| `*monetize` | Mapear monetizacao de conteudo |
| `*cta-strategy` | Criar estrategia de CTAs |
| `*flywheel` | Construir Content Monetization Flywheel |
| `*offer-content` | Alinhar conteudo com ofertas |

---

## Integracao com Creator-OS

| Direcao | Dados | Agente Origem → Destino |
|---------|-------|-------------------------|
| Recebe de | Produto, oferta, Epiphany Bridge, audiencia | Creator-OS → Stories10x |
| Entrega para | Content pipeline, leads, dados de performance | Stories10x → Creator-OS |

**Fluxo ideal:** Creator-OS monta produto → Stories10x amplifica com conteudo → Creator-OS converte em receita

---

## Veto Conditions

| Trigger | Acao | Agent |
|---------|------|-------|
| Nenhuma historia autentica identificada | Redirecionar para Phase 0 | @donald-miller |
| Historia sem estrutura narrativa | Bloquear multiplicacao | @donald-miller |
| Conteudo sem hooks | Bloquear publicacao | @brendan-kane |
| Sem pillar content definido | Bloquear sistema semanal | @justin-welsh |
| Sem produto/oferta para vender | Bloquear monetizacao | @dan-koe |
| Video sem estrutura narrativa | Bloquear producao | @casey-neistat |
| Sem sistema repetivel | Bloquear escala | @justin-welsh |

---

## Changelog

| Data | Versao | Mudancas |
|------|--------|----------|
| 2026-02-22 | 1.0.0 | Release inicial — 7 elite minds, 1 workflow |

---

*Squad criado seguindo SC-DP-003 (Squad README)*
*"One story, told well, can change everything."*
