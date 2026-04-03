# Template: Methodology Protocol

**Template ID:** ER-TMPL-004
**Used by:** tasks/methodology-consult.md

---

## Formato

```markdown
## Protocolo: {{tecnica}}

**Especialista:** @{{agent-name}} ({{instituicao}})
**Data:** {{data}}
**Nivel de complexidade:** {{Basico/Intermediario/Avancado}}

---

### Principio do Metodo
{{fundamentacao_teorica — por que esta tecnica funciona, base fisiologica/bioquimica}}

---

### Materiais Necessarios

**Equipamentos:**
- {{equipamento_1}}
- {{equipamento_2}}

**Reagentes:**
- {{reagente_1}} ({{fornecedor}}, cat# {{numero}})
- {{reagente_2}}

**Animais/Amostras:**
- {{modelo_animal_ou_tipo_de_amostra}}
- {{n_minimo_recomendado}}

---

### Protocolo Step-by-Step

**Preparacao (Dia anterior):**
1. {{passo_preparatorio_1}}
2. {{passo_preparatorio_2}}

**Execucao:**
1. {{passo_1}} — {{tempo}}, {{temperatura}}
2. {{passo_2}} — {{tempo}}, {{temperatura}}
3. {{passo_3}}

**Pos-processamento:**
1. {{analise_1}}
2. {{armazenamento}}

---

### Parametros Criticos
⚠️ {{parametro_1}} — {{por_que_e_critico}}
⚠️ {{parametro_2}} — {{faixa_aceitavel}}
⚠️ {{parametro_3}} — {{consequencia_se_errar}}

---

### Pitfalls Comuns
❌ **{{erro_1}}** → {{solucao_1}}
❌ **{{erro_2}}** → {{solucao_2}}
❌ **{{erro_3}}** → {{solucao_3}}

---

### Controles

| Tipo | Descricao | Resultado Esperado |
|------|-----------|-------------------|
| Positivo | {{controle_positivo}} | {{resultado}} |
| Negativo | {{controle_negativo}} | {{resultado}} |
| Interno | {{controle_interno}} | {{resultado}} |

---

### Analise de Dados
- **Software:** {{software_recomendado}}
- **Teste estatistico:** {{teste_adequado}}
- **Interpretacao:** {{como_interpretar_resultados}}

---

### Referencias-Base
📚 {{linha_de_pesquisa_1}}
📚 {{linha_de_pesquisa_2}}
📚 {{linha_de_pesquisa_3}}
```

---

## Regras

- Protocolo DEVE ser reproduzivel (outra pessoa consegue executar lendo apenas este documento)
- Temperaturas, tempos e concentracoes DEVEM ser especificos (nao "aquecer levemente")
- Reagentes com fornecedor e catalogo quando possivel
- Pitfalls baseados em experiencia real do especialista
- Referencias indicam linhas de pesquisa, NAO citacoes fabricadas
