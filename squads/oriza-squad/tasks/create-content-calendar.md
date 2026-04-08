---
task: Create Content Calendar
responsavel: "@social-strategist"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - month: Mes do calendario
  - posts_per_week: Posts por semana (3-7)
  - focus: Foco do mes (lancamento, engajamento, vendas, branding)
  - promotions: Promocoes ou datas especiais
Saida: |
  - calendar: Calendario semanal com posts planejados
  - mix: Distribuicao por pilar de conteudo
  - key_dates: Datas importantes do mes
---

# Create Content Calendar

Cria calendário editorial mensal para a Chilli & Pig.

## Elicitacao

```
? Month: ___________

? Posts per week:
  1. 3x (mínimo sustentável)
  2. 4x (recomendado)
  3. 5x (agressivo)
  4. Diário (7x)

? Monthly focus:
  1. Lançamento de produto
  2. Engajamento e crescimento
  3. Vendas e conversão
  4. Branding e posicionamento
  5. Sazonal/datas especiais

? Special dates or promotions this month:
  ___________
```

## Content Mix (Regra 4-3-2-1)

| Tipo | Proporção | Objetivo |
|------|-----------|----------|
| Educativo/entretenimento | 40% | Valor, alcance, saves |
| Bastidores/storytelling | 30% | Conexão, humanizar |
| Produto/oferta | 20% | Conversão, vendas |
| Comunidade/UGC | 10% | Prova social |

## Datas Relevantes para o Nicho

| Data | Oportunidade |
|------|-------------|
| Janeiro 16 | Dia do Picante (internacional) |
| Fevereiro | Carnaval (petiscos + molho) |
| Março 15 | Dia do Consumidor |
| Maio | Dia das Mães (kits presente) |
| Junho | Festas juninas (comida + pimenta) |
| Agosto | Dia dos Pais (kits) |
| Outubro | Dia da Alimentação (16/10) |
| Novembro | Black Friday |
| Dezembro | Natal (kits presente) |

## Output Format

```markdown
## 📅 Calendário — [Mês/Ano]

**Posts/semana:** [N] | **Foco:** [foco] | **Total:** [N posts]

### Semana 1 (DD/MM - DD/MM)
| Dia | Formato | Pilar | Tema | Produto |
|-----|---------|-------|------|---------|
| Seg | Carrossel | Educação | [tema] | — |
| Qua | Reel | Receita | [tema] | [produto] |
| Sex | Single | Produto | [tema] | [produto] |

### Semana 2 ...
...

### Stories Diários (sugestões)
- Segunda: Bastidores da produção
- Terça: Quiz sobre pimentas
- Quarta: Receita rápida
- Quinta: Depoimento de cliente
- Sexta: Produto da semana
- Sábado: Dica de harmonização
- Domingo: Engajamento (caixinha de perguntas)

### Reels da Semana (2-3x)
[sugestões de reels alinhados ao calendário]

### Métricas Alvo
[metas do mês]
```
