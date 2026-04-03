# Workflow: Research Consultation

**Workflow ID:** ER-WF-001
**Version:** 1.0.0
**Description:** Workflow completo de consulta de pesquisa — do input do usuario ate a entrega formatada.

---

## Fases

### Phase 1 — Triagem e Roteamento
**Executor:** equine-repro-chief
**Input:** Pergunta do usuario (texto livre)

1. Classificar tipo de consulta:
   - `consult` → Consulta simples (1 especialista)
   - `roundtable` → Mesa redonda (3-5 especialistas)
   - `article-ideas` → Ideacao de artigos
   - `gap-analysis` → Analise de lacunas
   - `methodology` → Protocolo metodologico
2. Identificar dominios tocados via keyword_routing em `data/specialist-registry.yaml`
3. Selecionar especialista(s) adequado(s)
4. Apresentar painel ao usuario para confirmacao

**Output:** Tipo de consulta + especialistas selecionados

### Phase 2 — Execucao por Especialista(s)
**Executor:** especialista(s) selecionado(s)

Cada especialista responde IN CHARACTER, aplicando:
- Seus frameworks e heuristicas documentados
- Voice DNA (estilo de comunicacao proprio)
- Publicacoes e evidencias da sua area
- Citacoes de linhas de pesquisa (sem fabricar referencias)

**Regras:**
- Cada resposta deve citar o framework aplicado
- Discordancias entre especialistas sao VALORIZADAS, nao evitadas
- Especialistas devem sinalizar gaps quando identificam lacunas

**Output:** Perspectiva(s) individual(is) formatada(s)

### Phase 3 — Sintese e Integracao
**Executor:** equine-repro-chief

1. Consolidar respostas dos especialistas
2. Identificar convergencias e divergencias
3. Extrair insights emergentes (cross-pollination)
4. Formatar output usando template adequado ao tipo de consulta
5. Adicionar recomendacoes de proximos passos

**Output:** Documento final integrado

### Phase 4 — Refinamento (Opcional)
**Trigger:** Usuario solicita aprofundamento
**Executor:** especialista especifico

1. Aprofundar topico especifico solicitado
2. Expandir protocolo ou analise
3. Adicionar referencias adicionais
4. Atualizar documento final

**Output:** Documento refinado

---

## Checkpoint Rules

| Checkpoint | Condicao | Acao se falhar |
|-----------|----------|----------------|
| CP1 | Pelo menos 1 especialista identificado | Pedir esclarecimento ao usuario |
| CP2 | Resposta IN CHARACTER com framework | Reprocessar com instrucoes explicitas |
| CP3 | Sintese contem convergencias E divergencias | Adicionar analise comparativa |

## Veto Conditions

- Especialista responde FORA de sua area de expertise → VETO, redirecionar
- Citacao fabricada (paper inventado) → VETO, remover e sinalizar
- Resposta generica sem framework → VETO, reprocessar com heuristicas do agente
