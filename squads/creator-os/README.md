# Creator OS

> De conhecimento a receita recorrente — guiado por 7 elite minds com frameworks documentados.

**Pattern:** SC-DP-003 (Squad README)

---

## Visao Geral

Creator OS transforma expertise em produtos digitais escalaveis. O squad orquestra 7 agentes baseados em elite minds reais, cada um especialista em uma fase da jornada do criador.

### Proposito

Dar ao criador de conteudo/conhecimento um sistema completo e comprovado para:
- Organizar conhecimento disperso
- Criar cursos e produtos digitais
- Desenhar ofertas irresistiveis
- Lancar com estrategia (nao na sorte)
- Construir audiencia com escrita digital
- Vender todo dia (nao so em lancamentos)
- Gerar receita recorrente com memberships

### Dominio

Creator Economy / Knowledge Productization / Digital Products

---

## Agents

| Agent | Icone | Tier | Papel | Framework Principal |
|-------|-------|------|-------|---------------------|
| @creator-os-chief | 🚀 | Orchestrator | Orquestracao e diagnostico | Creator Journey (7 fases) |
| @tiago-forte | 🧠 | Tier 0 | Organizacao do conhecimento | BASB + PARA |
| @amy-porterfield | 🎓 | Tier 1 | Criacao de cursos | Digital Course Academy |
| @russell-brunson | 🔥 | Tier 1 | Arquitetura de oferta | Expert Secrets + Value Ladder |
| @jeff-walker | 🎯 | Tier 1 | Lancamento de produtos | Product Launch Formula |
| @nicolas-cole | ✍️ | Tier 2 | Escrita digital e audiencia | Art & Business of Online Writing |
| @leandro-ladeira | 💰 | Tier 2 | Vendas perpetuas | VTSD + Stories 10x |
| @stu-mclaren | 🔄 | Tier 2 | Receita recorrente | The Membership Experience |

---

## Creator Journey (7 Fases)

```
Fase 0: ORGANIZAR   → Tiago Forte      → Organize o que esta na sua cabeca
     ↓
Fase 1: CRIAR       → Amy Porterfield  → Transforme em curso/produto
     ↓
Fase 2: OFERTA      → Russell Brunson  → Torne irresistivel
     ↓
Fase 3: LANCAR      → Jeff Walker      → Lance com estrategia
     ↓
Fase 4: AUDIENCIA   → Nicolas Cole     → Construa publico com escrita
     ↓
Fase 5: PERPETUO    → Leandro Ladeira  → Venda todo santo dia
     ↓
Fase 6: RECORRENTE  → Stu McLaren      → Crie receita previsivel
```

---

## Estrutura

```
squads/creator-os/
├── agents/                    # Definicoes de agents
│   ├── creator-os-chief.md    # Orchestrator
│   ├── tiago-forte.md         # Tier 0: Knowledge Organization
│   ├── amy-porterfield.md     # Tier 1: Course Creation
│   ├── russell-brunson.md     # Tier 1: Offer Architecture
│   ├── jeff-walker.md         # Tier 1: Launch Systems
│   ├── nicolas-cole.md        # Tier 2: Digital Writing
│   ├── leandro-ladeira.md     # Tier 2: Perpetual Sales
│   └── stu-mclaren.md         # Tier 2: Membership
├── tasks/                     # Tasks executaveis
│   ├── diagnose-knowledge.md
│   ├── create-course.md
│   ├── design-offer.md
│   ├── plan-launch.md
│   ├── write-content.md
│   ├── setup-perpetual.md
│   └── create-membership.md
├── checklists/                # Validacoes
│   └── journey-readiness.md
├── workflows/                 # Orquestracoes
│   └── wf-creator-journey.yaml
├── templates/                 # Templates reutilizaveis
├── data/                      # Dados e knowledge bases
├── docs/                      # Documentacao do squad
├── sops/                      # Procedimentos
├── config.yaml                # Configuracao do squad
└── README.md                  # Este arquivo
```

---

## Quick Start

```bash
# 1. Ativar agent principal
@creator-os:creator-os-chief

# 2. Ver comandos disponiveis
*help

# 3. Diagnosticar sua fase atual
*diagnose

# 4. Ou iniciar jornada completa
*journey
```

### Exemplo de Uso

```
User: @creator-os:creator-os-chief
Agent: 🚀 Creator OS ready. Where are you in your creator journey?

User: I have knowledge about artisanal food production but don't know where to start
Agent: Based on your situation, start at Phase 0 with Tiago Forte.
       Command: *diagnose

User: *diagnose
Agent: [Routes to @tiago-forte for knowledge organization using PARA + BASB]
```

---

## Workflows Disponiveis

| Workflow | Arquivo | Trigger | Descricao |
|----------|---------|---------|-----------|
| Creator Journey | `workflows/wf-creator-journey.yaml` | `*journey` | Jornada completa de 7 fases |

---

## Comandos por Agent

### @creator-os-chief (Orchestrator)

| Comando | Descricao |
|---------|-----------|
| `*journey` | Iniciar jornada completa |
| `*diagnose` | Diagnosticar fase atual |
| `*status` | Ver progresso |
| `*help` | Lista todos os comandos |

### @tiago-forte (Fase 0)

| Comando | Descricao |
|---------|-----------|
| `*organize` | Organizar conhecimento com PARA |
| `*capture` | Configurar sistema de captura |
| `*distill` | Aplicar Progressive Summarization |

### @amy-porterfield (Fase 1)

| Comando | Descricao |
|---------|-----------|
| `*validate-topic` | Validar topico do curso |
| `*outline` | Criar outline do curso |
| `*beta-launch` | Planejar beta/pre-venda |

### @russell-brunson (Fase 2)

| Comando | Descricao |
|---------|-----------|
| `*value-ladder` | Criar Value Ladder |
| `*epiphany-bridge` | Criar historia de origem |
| `*offer-stack` | Montar stack de oferta |

### @jeff-walker (Fase 3)

| Comando | Descricao |
|---------|-----------|
| `*plan-launch` | Planejar lancamento completo |
| `*pre-launch` | Criar conteudo pre-lancamento |
| `*launch-emails` | Criar sequencia de emails |

### @nicolas-cole (Fase 4)

| Comando | Descricao |
|---------|-----------|
| `*atomic-essay` | Escrever Atomic Essay |
| `*ship-30` | Iniciar desafio de 30 dias |
| `*content-plan` | Criar plano de conteudo |

### @leandro-ladeira (Fase 5)

| Comando | Descricao |
|---------|-----------|
| `*funil-perpetuo` | Criar funil perpetuo |
| `*stories-10x` | Aplicar metodologia Stories 10x |
| `*vtsd` | Setup Venda Todo Santo Dia |

### @stu-mclaren (Fase 6)

| Comando | Descricao |
|---------|-----------|
| `*success-path` | Definir Success Path |
| `*membership-plan` | Planejar membership |
| `*retention` | Configurar sistema de retencao |

---

## Veto Conditions

| Trigger | Acao | Agent |
|---------|------|-------|
| Conhecimento nao organizado | Redirecionar para Fase 0 | @tiago-forte |
| Sem validacao de audiencia | Bloquear criacao de curso | @amy-porterfield |
| Oferta sem diferenciacao | Bloquear lancamento | @russell-brunson |
| Sem lista de email | Bloquear abertura de carrinho | @jeff-walker |
| Sem publicacao consistente | Bloquear escala de conteudo | @nicolas-cole |
| Sem produto para vender | Bloquear funil perpetuo | @leandro-ladeira |
| Sem clientes existentes | Bloquear criacao de membership | @stu-mclaren |

---

## Changelog

| Data | Versao | Mudancas |
|------|--------|----------|
| 2026-02-22 | 1.0.0 | Release inicial — 7 elite minds, 1 workflow |

---

*Squad criado seguindo SC-DP-003 (Squad README)*
*"Knowledge is power, but only when productized."*
