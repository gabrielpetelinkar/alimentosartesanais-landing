# Task: Gap Analysis

**Task ID:** ER-TP-002
**Type:** Research Consultation
**Executor:** equine-repro-chief → specialist(s)
**Elicit:** true

---

## Objetivo

Mapear sistematicamente lacunas na literatura de reprodução equina em uma área específica, identificando questões não respondidas, metodologias não aplicadas e conexões inexploradas.

## Input

- **Área de análise** (obrigatório): sub-área ou tópico específico
- **Profundidade** (opcional): shallow (top-level gaps) | deep (mechanistic gaps)

## Workflow

### Step 1 — Mapeamento do Estado da Arte
**Executor:** especialista primário da área

1. Listar o que SE SABE (established knowledge)
2. Listar o que é CONTROVERSO (divergent findings)
3. Listar o que NÃO SE SABE (explicit unknowns)

### Step 2 — Identificação de Gaps por Categoria

| Categoria | Descrição | Exemplo |
|-----------|-----------|---------|
| **Knowledge Gap** | Mecanismo não elucidado | "Fatores ovidutais que completam capacitação equina" |
| **Methodological Gap** | Técnica não aplicada a equinos | "Metabolômica single-cell em espermatozoides equinos" |
| **Connection Gap** | Áreas não conectadas | "EMS ↔ qualidade espermática — sem estudos diretos" |
| **Translation Gap** | Dados de outras espécies não validados | "SLC7A11 em equinos com SM — extrapolação de humanos" |
| **Temporal Gap** | Estudos desatualizados | "Última revisão de X é de 2015" |

### Step 3 — Priorização
**Executor:** equine-repro-chief

Ranquear gaps por:
- **Impacto potencial** (alto/médio/baixo)
- **Viabilidade de investigação** (alto/médio/baixo)
- **Originalidade** (alto/médio/baixo)
- **Especialista sugerido** para investigar

## Output

```markdown
## Gap Analysis — [Área]

### Estado da Arte
- ✅ Estabelecido: [lista]
- ⚠️ Controverso: [lista]
- ❌ Desconhecido: [lista]

### Gaps Identificados

| # | Gap | Tipo | Impacto | Viabilidade | Especialista |
|---|-----|------|---------|-------------|-------------|
| 1 | ... | Knowledge | Alto | Alto | @fernando-pena |

### Oportunidades de Alto Impacto
1. [Gap] → [Hipótese] → [Abordagem experimental]
```

## Acceptance Criteria

- [ ] Mínimo 5 gaps identificados
- [ ] Cada gap categorizado por tipo
- [ ] Impacto e viabilidade avaliados
- [ ] Pelo menos 1 gap de cross-area (connection gap)
