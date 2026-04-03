# Template: Gap Analysis Report

**Template ID:** ER-TMPL-002
**Used by:** tasks/gap-analysis.md

---

## Formato

```markdown
## Gap Analysis — {{area}}

**Data:** {{data}}
**Especialista primario:** @{{agent-name}}
**Profundidade:** {{shallow/deep}}

---

### Estado da Arte

**Estabelecido (consenso):**
- ✅ {{fato_1}}
- ✅ {{fato_2}}

**Controverso (divergencias):**
- ⚠️ {{controversia_1}} — {{grupo_A}} vs {{grupo_B}}
- ⚠️ {{controversia_2}}

**Desconhecido (lacunas explicitas):**
- ❌ {{unknown_1}}
- ❌ {{unknown_2}}

---

### Gaps Identificados

| # | Gap | Tipo | Impacto | Viabilidade | Originalidade | Especialista Sugerido |
|---|-----|------|---------|-------------|---------------|----------------------|
| 1 | {{gap}} | {{Knowledge/Methodological/Connection/Translation/Temporal}} | {{Alto/Medio/Baixo}} | {{Alto/Medio/Baixo}} | {{Alto/Medio/Baixo}} | @{{agent}} |

---

### Oportunidades de Alto Impacto

#### Oportunidade 1: {{titulo}}
- **Gap:** {{gap_identificado}}
- **Hipotese:** {{hipotese_derivada}}
- **Abordagem:** {{metodologia_sugerida}}
- **Especialista:** @{{agent}} + @{{agent_complementar}}

---

### Proximos Passos Recomendados
1. {{recomendacao_1}}
2. {{recomendacao_2}}
3. {{recomendacao_3}}
```

---

## Tipos de Gap (Referencia)

| Tipo | Descricao | Exemplo |
|------|-----------|---------|
| **Knowledge** | Mecanismo nao elucidado | "Fatores ovidutais que completam capacitacao" |
| **Methodological** | Tecnica nao aplicada a equinos | "Metabolomica single-cell em sptz equinos" |
| **Connection** | Areas nao conectadas | "EMS ↔ qualidade espermatica" |
| **Translation** | Dados de outras especies nao validados | "SLC7A11 em equinos — extrapolacao de humanos" |
| **Temporal** | Estudos desatualizados | "Ultima revisao de X e de 2015" |

## Regras

- Minimo 5 gaps identificados
- Pelo menos 1 gap de cada tipo (Knowledge + Methodological obrigatorios)
- Pelo menos 1 Connection gap (cross-area)
- Impacto e viabilidade avaliados para todos
