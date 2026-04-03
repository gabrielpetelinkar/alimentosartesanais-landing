# Template: Article Idea Card

**Template ID:** ER-TMPL-001
**Used by:** tasks/article-ideation.md, workflows/wf-article-pipeline.md

---

## Formato

```markdown
### Ideia #{{numero}}: {{titulo_provisorio}}

**Especialista:** @{{agent-name}} ({{instituicao}})
**Dominio:** {{dominio}}

**Gap na Literatura:**
{{descricao_do_gap — o que a literatura NAO cobre}}

**Hipotese Central:**
{{hipotese_testavel}}

**Metodologia Sugerida:**
{{2-3 linhas descrevendo abordagem experimental}}

**Avaliacao:**
| Criterio | Score |
|----------|-------|
| Novidade | {{Alta/Media/Baixa}} |
| Viabilidade | {{Alta/Media/Baixa}} |
| Impacto | {{Alto/Medio/Baixo}} |

**Periodicos Sugeridos:**
- {{periodico_1}} (IF ~{{valor}})
- {{periodico_2}} (IF ~{{valor}})

**Cross-Pollination:**
{{Se aplicavel: combinacao com ideia de outro especialista}}
```

---

## Regras de Preenchimento

- `titulo_provisorio`: Maximo 120 caracteres, descritivo
- `gap`: Deve ser verificavel — nao pode ser vago ("pouco estudado")
- `hipotese`: Deve ser testavel e falsificavel
- `metodologia`: Incluir modelo animal, tecnica principal, n estimado
- `periodicos`: Minimo 2 sugestoes com IF aproximado
- `cross-pollination`: Preencher apenas se houver combinacao genuina
