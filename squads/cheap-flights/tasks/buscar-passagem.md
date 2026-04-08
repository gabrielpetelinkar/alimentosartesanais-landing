# Task: Buscar Passagem Barata

**Task ID:** buscar-passagem
**Version:** 1.0
**Execution Type:** Interactive
**Purpose:** Workflow completo para encontrar a passagem mais barata possível usando todas as estratégias disponíveis
**Orchestrator:** @cheap-flights:cheap-flights-chief

---

## Overview

```
INPUT (origem + destino + datas + recursos)
    ↓
[FASE 1: DIAGNÓSTICO]
    → Coletar parâmetros essenciais
    → Identificar recursos disponíveis (milhas, orçamento)
    ↓
[FASE 2: CLASSIFICAÇÃO]
    → Identificar estratégia dominante
    → Rotear para especialista correto
    ↓
[FASE 3: EXECUÇÃO]
    → Especialista aplica sua metodologia
    → Retorna opções concretas com preços/milhas
    ↓
[FASE 4: COMPARAÇÃO]
    → Comparar opções: cash vs milhas vs técnicas alternativas
    ↓
OUTPUT: Passagem encontrada com plano de ação
```

---

## FASE 1: DIAGNÓSTICO (elicit=true)

### Perguntas obrigatórias (máximo 5):

```yaml
questions:
  - id: Q1
    pergunta: "Qual é a rota? (origem → destino)"
    exemplo: "São Paulo → Lisboa" ou "Fortaleza → Recife"
    flexibility_probe: "Datas e/ou destino são flexíveis?"

  - id: Q2
    pergunta: "Qual a janela de viagem? (data específica ou período?)"
    note: "Flexibilidade = mais opções"

  - id: Q3
    pergunta: "Você tem milhas disponíveis? Quais programas? Quantas?"
    note: "SMILES, LATAM Pass, TudoAzul, United, etc."

  - id: Q4
    pergunta: "Qual é o orçamento máximo em cash (caso milhas não cubram)?"

  - id: Q5 (opcional)
    pergunta: "Quantas pessoas estão viajando?"
    note: "Múltiplos pax muda a estratégia de disponibilidade"
```

---

## FASE 2: CLASSIFICAÇÃO

```yaml
routing_logic:
  IF rota_nacional AND tem_milhas_BR:
    → "@paulo-mafra: verificar disponibilidade SMILES/LATAM/Azul"

  IF rota_internacional AND milhas_internacionais:
    → "@gary-leff: award booking avançado"

  IF preço_encontrado AND suspeita_tarifa_erro:
    → "@scott-keyes: protocolo de tarifa de erro"

  IF premium_cabin AND milhas_suficientes:
    → "@ben-schlappig: aspirational redemption"

  IF budget_limitado AND sem_milhas:
    → "@scott-keyes: cash fare + @chris-guillebeau: alternativas táticas"

  IF quer_acumular_milhas:
    → "@brian-kelly: estratégia de cartões"
```

---

## FASE 3: EXECUÇÃO POR ESPECIALISTA

Cada especialista entrega:
1. **Melhor opção** (preço / milhas + taxas)
2. **Opção backup** (alternativa)
3. **Plataforma exata** para comprar/emitir
4. **Urgência** (se tarifa de erro ou promoção relâmpago)

---

## FASE 4: COMPARAÇÃO E DECISÃO

```yaml
comparison_table:
  headers: [Estratégia, Custo Cash, Custo Milhas, Urgência, Confiança]
  rows:
    - [Tarifa normal GF, R$X.XXX, —, baixa, alta]
    - [Tarifa de erro, R$XXX, —, ALTA, média]
    - [Emissão SMILES, —, XXk milhas + R$XXX, média, alta]
    - [OTA alternativa, R$X.XXX, —, baixa, média]
```

---

## Outputs

| Output | Descrição |
|--------|-----------|
| Melhor opção com plano de ação | Estratégia + link + urgência |
| Comparativo completo | Cash vs milhas vs alternativas |
| Próximos passos | Exatamente o que fazer agora |

---

## Veto Conditions

- ❌ Não recomendar sem ter verificado disponibilidade real
- ❌ Não omitir riscos de técnicas não-convencionais
- ❌ Não recomendar transferência de pontos sem disponibilidade confirmada
- ❌ Não ignorar taxas ao apresentar emissão com milhas
