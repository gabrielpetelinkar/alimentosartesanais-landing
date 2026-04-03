# Task: Article Ideation

**Task ID:** ER-TP-001
**Type:** Research Consultation
**Executor:** equine-repro-chief → specialist(s)
**Elicit:** true

---

## Objetivo

Gerar ideias de artigos científicos originais em reprodução equina, identificando gaps na literatura e oportunidades de pesquisa de alto impacto.

## Input

- **Área de interesse** (obrigatório): uma das 6 sub-áreas ou tópico livre
- **Contexto do pesquisador** (opcional): instituição, recursos disponíveis, modelo animal
- **Restrições** (opcional): periódico-alvo, prazo, tipo de estudo

## Workflow

### Step 1 — Diagnóstico de Área
**Executor:** equine-repro-chief

1. Identificar domínio(s) relevante(s) via `data/specialist-registry.yaml`
2. Selecionar 2-4 especialistas com expertise complementar
3. Apresentar especialistas selecionados ao usuário

### Step 2 — Geração de Ideias por Especialista
**Executor:** cada especialista selecionado

Para cada especialista, gerar 3-5 ideias de artigo contendo:
- **Título provisório**
- **Gap identificado** — o que a literatura NÃO cobre
- **Hipótese central**
- **Metodologia sugerida** (2-3 linhas)
- **Novidade** (baixa/média/alta)
- **Viabilidade** (baixa/média/alta)
- **Periódicos sugeridos**

### Step 3 — Síntese e Ranking
**Executor:** equine-repro-chief

1. Consolidar todas as ideias em lista única
2. Ranquear por: Novidade × Viabilidade × Impacto
3. Identificar oportunidades de cross-pollination (ideias que combinam perspectivas de 2+ especialistas)
4. Apresentar top 10-15 ideias ranqueadas

### Step 4 — Refinamento (se solicitado)
**Executor:** especialista específico

Aprofundar 1-3 ideias selecionadas pelo usuário com:
- Revisão de literatura específica (papers-chave a consultar)
- Desenho experimental detalhado
- Análise estatística sugerida
- Potenciais colaborações

## Output

```markdown
## Ideias de Artigo — [Área]

### Top Ideas

| # | Título | Especialista | Gap | Novidade | Viabilidade |
|---|--------|-------------|-----|---------|-------------|
| 1 | ... | @fernando-pena | ... | Alta | Média |
| 2 | ... | @bart-leemans | ... | Alta | Alta |

### Cross-Pollination Opportunities
- Ideia X (Peña) + Ideia Y (Turner) = estudo combinado sobre...

### Periódicos Recomendados
- Theriogenology (IF ~2.5) — para estudos aplicados
- Biology of Reproduction (IF ~3.5) — para mecanismos moleculares
- Reproduction (IF ~3.0) — para reviews e estudos de capacitação
```

## Acceptance Criteria

- [ ] Mínimo 10 ideias geradas
- [ ] Cada ideia tem gap identificado na literatura
- [ ] Pelo menos 2 ideias de cross-pollination
- [ ] Periódicos sugeridos são adequados ao tipo de estudo
- [ ] Novidade e viabilidade avaliadas para cada ideia
