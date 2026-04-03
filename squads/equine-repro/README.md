# 🐴 Equine Reproduction Research Squad

Squad de consultoria especializada em reprodução equina baseado em **elite minds reais** — pesquisadores com frameworks documentados, milhares de citações e décadas de contribuições para o campo.

## Propósito

Fornecer consultoria virtual baseada nas perspectivas, metodologias e frameworks dos maiores pesquisadores mundiais em reprodução equina. Ideal para:

- **Ideação de artigos** — identificar gaps na literatura e oportunidades de pesquisa
- **Consultoria metodológica** — obter guidance sobre técnicas e protocolos
- **Mesa redonda** — ouvir múltiplas perspectivas sobre um tema
- **Análise de gaps** — mapear áreas inexploradas em cada sub-campo

## Quando Usar

- Precisa de ideias para artigos científicos
- Quer entender a perspectiva de um pesquisador específico sobre um tema
- Precisa de orientação metodológica para um experimento
- Quer comparar abordagens de diferentes escolas de pensamento
- Precisa identificar lacunas na literatura de reprodução equina

## Especialistas Disponíveis

### Orchestrator
| Agente | Comando | Função |
|--------|---------|--------|
| Equine Repro Chief | `@equine-repro:equine-repro-chief` | Roteamento e consultas multi-área |

### Tier 0 — Fundação
| Agente | Comando | Especialidade |
|--------|---------|--------------|
| Edward Squires | `@equine-repro:edward-squires` | Reprodução equina ampla, ICSI pioneiro, criopreservação |

### Tier 1 — Masters
| Agente | Comando | Especialidade |
|--------|---------|--------------|
| Fernando J. Peña | `@equine-repro:fernando-pena` | Estresse oxidativo, regulação redox, mitocôndrias |
| Frederico O. Papa | `@frederico-papa:frederico-papa` | Diluentes, criopreservação *(squad próprio)* |
| Katrin Hinrichs | `@equine-repro:katrin-hinrichs` | FIV/ICSI, breakthrough FIV convencional |
| Mats Troedsson | `@equine-repro:mats-troedsson` | Endometrite, imunologia reprodutiva da égua |
| Bart Leemans | `@equine-repro:bart-leemans` | Capacitação espermática equina |

### Tier 2 — Especialistas
| Agente | Comando | Especialidade |
|--------|---------|--------------|
| Elaine Carnevale | `@equine-repro:elaine-carnevale` | Envelhecimento oocitário, ICSI em éguas |
| Regina Turner | `@equine-repro:regina-turner` | Degeneração testicular, motilidade |
| Zamira Gibb | `@equine-repro:zamira-gibb` | ROS, armazenamento líquido 7 dias |
| Jane Morrell | `@equine-repro:jane-morrell` | SLC, seleção espermática, microbioma |
| Harald Sieme | `@equine-repro:harald-sieme` | Criopreservação, plasma seminal |
| Marco Alvarenga | `@equine-repro:marco-alvarenga` | Criopreservação, IA equina |
| Dell'Aqua Jr. | `@equine-repro:dell-aqua-jr` | Diluentes, bad coolers |
| Terttu Katila | `@equine-repro:terttu-katila` | Endometrite, diagnóstico |
| Christine Aurich | `@equine-repro:christine-aurich` | IA, sêmen refrigerado |
| Tom Stout | `@equine-repro:tom-stout` | Transferência de embrião, hub capacitação |
| Cesare Galli | `@equine-repro:cesare-galli` | OPU-ICSI escala clínica |
| Paula Maitan | `@equine-repro:paula-maitan` | Capacitação espermática (brasileira) |
| Matheus Felix | `@equine-repro:matheus-felix` | FIV com sêmen congelado |

## Sub-Áreas

```
🔬 GARANHÃO (Andrologia)
├── Estresse Oxidativo → fernando-pena, zamira-gibb
├── Diluentes/Criopreservação → frederico-papa, dell-aqua-jr, marco-alvarenga, harald-sieme
├── Degeneração Testicular → regina-turner
└── Seleção Espermática → jane-morrell

🐎 ÉGUA (Ginecologia)
├── Endometrite → mats-troedsson, terttu-katila
├── IA e Sêmen Refrigerado → christine-aurich
└── Envelhecimento Oocitário → elaine-carnevale

🧫 FIV / ICSI
├── FIV Convencional → katrin-hinrichs, matheus-felix
├── ICSI Clínica → cesare-galli, elaine-carnevale
└── ICSI Pioneira → edward-squires

⚡ CAPACITAÇÃO
├── Mecanismos Básicos → bart-leemans
├── Jornada do Espermatozoide → paula-maitan
└── Hub Multidisciplinar → tom-stout
```

## Quick Start

```bash
# Ativar o orchestrator (recomendado)
@equine-repro:equine-repro-chief

# Ou ativar um especialista diretamente
@equine-repro:fernando-pena

# Comandos do orchestrator
*consult "estresse oxidativo em garanhões obesos"
*roundtable "impacto da síndrome metabólica na fertilidade"
*article-ideas "capacitação espermática e dislipidemia"
*gap-analysis "diluentes"
*list-specialists
```

## Estrutura do Squad

```
squads/equine-repro/
├── agents/              # 20 agentes especialistas
├── tasks/               # Tasks atômicas
├── workflows/           # Workflows multi-fase
├── templates/           # Templates de output
├── checklists/          # Checklists de validação
├── data/
│   └── equine-repro-kb.md  # Knowledge base do domínio
├── docs/                # Documentação adicional
├── config.yaml          # Configuração do squad
└── README.md            # Este arquivo
```

## Contexto da Pesquisa

Este squad foi criado para apoiar pesquisa em reprodução equina com foco particular em:
- **Síndrome metabólica equina (EMS)** e seus efeitos na reprodução
- **Senescência reprodutiva** em garanhões
- **Qualidade espermática** e biomarcadores
- **Biotecnologia do sêmen** — diluentes, criopreservação, antioxidantes

---
*Equine Reproduction Research Squad v1.0 — Clone minds > create bots*
