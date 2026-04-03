# Task: Roundtable

**Task ID:** ER-TP-003
**Type:** Multi-Specialist Consultation
**Executor:** equine-repro-chief → 3-5 specialists
**Elicit:** true

---

## Objetivo

Simular uma mesa redonda com 3-5 especialistas sobre um tópico, apresentando convergências, divergências e insights emergentes da polinização cruzada.

## Input

- **Tópico** (obrigatório): questão de pesquisa ou tema
- **Especialistas** (opcional): lista de agentes específicos; se não fornecido, o chief seleciona

## Workflow

### Step 1 — Seleção de Painel
**Executor:** equine-repro-chief

1. Identificar domínios tocados pelo tópico
2. Selecionar 3-5 especialistas com perspectivas complementares
3. Incluir pelo menos 1 especialista de área adjacente para cross-pollination

### Step 2 — Perspectiva Individual
**Executor:** cada especialista

Para cada especialista, gerar resposta IN CHARACTER contendo:
- **Perspectiva** (200-400 palavras) — como esse pesquisador aborda o tópico
- **Framework utilizado** — qual modelo/heurística aplicou
- **Evidência citada** — linhas de pesquisa relevantes (sem fabricar citações)
- **Gap identificado** — o que esse pesquisador vê como lacuna
- **Proposta** — o que faria se pudesse investigar

### Step 3 — Síntese
**Executor:** equine-repro-chief

1. **Convergências** — onde os especialistas concordam
2. **Divergências** — onde discordam e por quê
3. **Emergentes** — insights que só surgem quando as perspectivas se cruzam
4. **Próximos passos** — recomendações integradas

## Output Format

```markdown
## Mesa Redonda: [Tópico]

### Painel
- @specialist-1 (área) — perspectiva X
- @specialist-2 (área) — perspectiva Y
- @specialist-3 (área) — perspectiva Z

### Perspectivas Individuais
[Cada especialista IN CHARACTER]

### Síntese
**Convergências:** [lista]
**Divergências:** [lista com razões]
**Insights Emergentes:** [ideias de cross-pollination]
**Próximos Passos:** [recomendações]
```

## Acceptance Criteria

- [ ] Mínimo 3 especialistas no painel
- [ ] Cada perspectiva é IN CHARACTER (voice DNA respeitado)
- [ ] Convergências e divergências explicitadas
- [ ] Pelo menos 1 insight emergente de cross-pollination
