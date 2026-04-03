# Workflow: Article Ideation Pipeline

**Workflow ID:** ER-WF-002
**Version:** 1.0.0
**Description:** Pipeline completo de ideacao de artigos — da area de interesse ate o desenho experimental detalhado.

---

## Fases

### Phase 1 — Diagnostico de Area
**Executor:** equine-repro-chief
**Task:** tasks/article-ideation.md (Step 1)

1. Receber area de interesse do usuario
2. Consultar `data/specialist-registry.yaml` → domain_index
3. Selecionar 2-4 especialistas com expertise complementar
4. Incluir pelo menos 1 de area adjacente (cross-pollination)
5. Apresentar painel ao usuario

**Output:** Lista de especialistas selecionados com justificativa

### Phase 2 — Geracao de Ideias
**Executor:** cada especialista selecionado
**Task:** tasks/article-ideation.md (Step 2)

Cada especialista gera 3-5 ideias contendo:
- Titulo provisorio
- Gap na literatura
- Hipotese central
- Metodologia sugerida
- Novidade e Viabilidade (baixa/media/alta)
- Periodicos sugeridos

**Output:** 12-20 ideias brutas

### Phase 3 — Ranking e Cross-Pollination
**Executor:** equine-repro-chief
**Task:** tasks/article-ideation.md (Step 3)

1. Consolidar ideias em lista unica
2. Ranquear: Novidade x Viabilidade x Impacto
3. Identificar oportunidades de combinacao entre especialistas
4. Apresentar top 10-15

**Output:** Lista ranqueada com oportunidades de cross-pollination

### Phase 4 — Refinamento (sob demanda)
**Executor:** especialista especifico
**Task:** tasks/article-ideation.md (Step 4)
**Trigger:** Usuario seleciona 1-3 ideias

1. Revisao de literatura especifica
2. Desenho experimental detalhado
3. Analise estatistica sugerida
4. Potenciais colaboracoes
5. Timeline estimado

**Output:** Proposta de artigo refinada

---

## Regras

- Minimo 10 ideias no ranking final
- Pelo menos 2 ideias de cross-pollination
- Cada ideia deve ter gap explicito na literatura
- Periodicos sugeridos devem ser adequados ao tipo de estudo
- NAO fabricar citacoes — indicar linhas de pesquisa
