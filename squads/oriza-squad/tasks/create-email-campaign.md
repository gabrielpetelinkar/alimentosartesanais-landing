---
task: Create Email Campaign
responsavel: "@copywriter"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - campaign_type: Tipo (lancamento, restock, promo, newsletter, carrinho abandonado)
  - product: Produto relacionado (opcional)
  - audience_segment: Segmento (todos, compradores, leads, inativos)
  - urgency_level: Nivel de urgencia (baixa, media, alta)
Saida: |
  - subject_line: Assunto do email (3 opcoes)
  - preview_text: Texto de preview
  - email_body: Corpo do email completo
  - cta: Call-to-action principal
---

# Create Email Campaign

Cria campanha de email/newsletter para a Chilli & Pig.

## Elicitacao

```
? Campaign type:
  1. Lançamento de produto
  2. Restock (produto voltou ao estoque)
  3. Promoção/desconto
  4. Newsletter educativa
  5. Carrinho abandonado
  6. Boas-vindas (welcome series)
  7. Reativação de clientes inativos
  8. Sazonal (Black Friday, Natal, etc.)

? Product (if applicable):
  [lista de produtos ou "geral"]

? Audience segment:
  1. Toda a base
  2. Compradores recentes
  3. Leads (nunca compraram)
  4. Clientes inativos (+90 dias)
  5. VIPs (compradores recorrentes)

? Urgency level:
  1. Baixa (informativo, sem prazo)
  2. Média (oferta com prazo)
  3. Alta (últimas unidades, expira hoje)
```

## Email Templates by Type

### Lançamento
```
Subject: [Produto] chegou. E você é o primeiro a saber.
Preview: [benefício principal em 1 frase]
Body: História → reveal → CTA
```

### Restock
```
Subject: Voltou! [Produto] de volta ao estoque
Preview: Mas corre, da última vez esgotou em [X] dias
Body: Escassez → produto → CTA urgente
```

### Carrinho Abandonado
```
Subject: Esqueceu algo? Seu [produto] está esperando
Preview: Finalize antes que esgote
Body: Lembrete sutil → benefício → CTA
```

## Output Format

```markdown
## 📧 Email Campaign — [Tipo]

**Segmento:** [audiência] | **Urgência:** [nível] | **Produto:** [produto]

### Subject Lines (3 opções)
1. [opção A]
2. [opção B]
3. [opção C]

### Preview Text
[max 90 chars]

### Email Body

**[Saudação]**

[corpo do email com storytelling, benefícios e CTA]

**[CTA Button]:** [texto do botão]

**[Assinatura]**

### Notas
- Melhor dia/horário para envio: [sugestão]
- Segmento recomendado: [detalhe]
- Follow-up sugerido: [sim/não + quando]
```
