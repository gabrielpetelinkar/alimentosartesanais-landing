---
task: Create UGC Campaign
responsavel: "@social-strategist"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - campaign_goal: Objetivo (awareness, vendas, engajamento)
  - duration: Duracao da campanha
  - incentive: Tipo de incentivo (desconto, repost, sorteio, nenhum)
  - hashtag: Hashtag da campanha
Saida: |
  - campaign_brief: Brief completo da campanha
  - rules: Regras de participacao
  - promotion_plan: Plano de divulgacao
  - templates: Templates de repost/story
---

# Create UGC Campaign

Cria campanha de User-Generated Content para a Chilli & Pig.

## Elicitacao

```
? Campaign goal:
  1. Awareness (mais pessoas conhecerem a marca)
  2. Vendas (converter seguidores em compradores)
  3. Engajamento (aumentar interação)
  4. Conteúdo (banco de fotos/vídeos de clientes)

? Duration:
  1. 1 semana (flash)
  2. 2 semanas (padrão)
  3. 1 mês (longa)
  4. Permanente (ongoing)

? Incentive:
  1. Desconto na próxima compra
  2. Repost no perfil oficial
  3. Sorteio de kit
  4. Destaque nos Stories
  5. Sem incentivo (orgânico)

? Campaign hashtag suggestion:
  ___________
```

## UGC Campaign Types

| Tipo | Mecânica | Exemplo |
|------|----------|---------|
| Foto com produto | Postar usando o molho + hashtag | #MeuChilliePig |
| Receita criativa | Compartilhar receita com o molho | #ReceitaChilliePig |
| Teste de picância | Filmar reação ao provar | #DesafioChilliePig |
| Story de cliente | Marcar nos stories usando | @chilliepig |
| Review | Postar avaliação sincera | #ReviewChilliePig |

## Output Format

```markdown
## 📣 UGC Campaign — [Nome da Campanha]

**Objetivo:** [goal] | **Duração:** [período] | **Hashtag:** [#hashtag]

### Conceito
[descrição da campanha em 2-3 frases]

### Mecânica
1. [passo do participante]
2. [passo]
3. [passo]

### Regras
- [regra 1]
- [regra 2]
...

### Incentivo
[descrição do que o participante ganha]

### Plano de Divulgação
- **Dia 1:** Post de lançamento (feed + stories)
- **Dia 2-3:** Stories mostrando como participar
- **Dia 4+:** Repost dos melhores conteúdos
- **Último dia:** Anúncio de resultado/destaque

### Posts de Divulgação
[sugestão de legenda para o post de lançamento]

### Critérios de Repost
[o que faz um conteúdo ser selecionado para repost]
```
