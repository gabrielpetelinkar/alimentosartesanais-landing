# Task: Methodology Consultation

**Task ID:** ER-TP-004
**Type:** Protocol Guidance
**Executor:** equine-repro-chief → specialist
**Elicit:** true

---

## Objetivo

Fornecer orientação metodológica detalhada e reproduzível de um especialista para técnicas específicas em reprodução equina.

## Input

- **Técnica/método** (obrigatório): o que o pesquisador quer fazer
- **Contexto** (opcional): espécie, modelo, recursos disponíveis

## Workflow

### Step 1 — Routing
**Executor:** equine-repro-chief

Identificar o especialista com expertise metodológica mais relevante via keyword_routing em specialist-registry.yaml.

### Step 2 — Protocolo
**Executor:** especialista

Fornecer IN CHARACTER:
1. **Princípio do método** — fundamentação teórica
2. **Materiais necessários** — equipamentos, reagentes, animais
3. **Protocolo step-by-step** — reproduzível
4. **Parâmetros críticos** — o que NÃO pode dar errado
5. **Pitfalls comuns** — erros frequentes e como evitar
6. **Controles** — positivos e negativos necessários
7. **Análise de dados** — como interpretar os resultados
8. **Referências-base** — linhas de pesquisa (sem fabricar citações)

## Output Format

```markdown
## Protocolo: [Técnica]
**Especialista:** @agent-name

### Princípio
[Fundamentação]

### Materiais
- [lista]

### Protocolo
1. [step]
2. [step]

### Parâmetros Críticos
⚠️ [lista de pontos que não podem falhar]

### Pitfalls
❌ [erros comuns e soluções]

### Referências
📚 [linhas de pesquisa]
```

## Acceptance Criteria

- [ ] Protocolo reproduzível (step-by-step)
- [ ] Parâmetros críticos identificados
- [ ] Pitfalls documentados
- [ ] Referências adequadas (sem fabricar)
