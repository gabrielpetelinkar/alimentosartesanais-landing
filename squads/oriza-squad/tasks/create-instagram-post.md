---
task: Create Instagram Post
responsavel: "@content-creator"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - post_type: Tipo (single, carrossel, texto)
  - product: Produto relacionado (opcional)
  - pillar: Pilar de conteudo (produto, educacao, receita, bastidores, comunidade)
  - tone: Tom (educativo, promocional, storytelling, behind-the-scenes)
  - cta: Call-to-action desejado
Saida: |
  - caption: Legenda completa com CTA
  - visual_brief: Descricao do visual/foto
  - hashtags: 20-30 hashtags organizadas
  - carousel_slides: Textos por slide (se carrossel)
  - posting_notes: Horario e dicas de publicacao
---

# Create Instagram Post

Cria post completo para o feed do Instagram da Chilli & Pig.

## Elicitacao

```
? Post type:
  1. Single image (foto + legenda)
  2. Carrossel (até 10 slides)
  3. Texto/quote card

? Content pillar:
  1. Produto — showcase, lancamento, combo
  2. Educacao — Scoville, tipos de pimenta, curiosidades
  3. Receita — como usar o molho
  4. Bastidores — processo artesanal, colheita, fermentacao
  5. Comunidade — UGC, depoimento, repost

? Product featured (opcional):
  (lista dos produtos Chilli & Pig)

? Tone:
  1. Educativo (ensinar algo)
  2. Promocional (vender/converter)
  3. Storytelling (contar historia)
  4. Behind the scenes (mostrar bastidores)
  5. Engajamento (pergunta, enquete, interacao)

? Primary CTA:
  1. Compre agora (link na bio)
  2. Salve para depois
  3. Comente/interaja
  4. Compartilhe com um amigo
  5. Acesse o site
```

## Output Format

```markdown
## 📸 Post Instagram — [Título]

**Tipo:** [single/carrossel/texto]
**Pilar:** [pilar]
**Produto:** [produto ou N/A]

### Visual Brief
[Descrição detalhada da foto/imagem ideal]

### Legenda
[Legenda completa com formatação, emojis moderados, CTA]

### Slides do Carrossel (se aplicável)
- Slide 1: [capa/hook]
- Slide 2-9: [conteúdo]
- Slide 10: [CTA]

### Hashtags
**Branded:** #chilliepig ...
**Nicho:** #molhodepimenta ...
**Alcance:** #gastronomia ...

### Notas de Publicação
- Melhor horário: [sugestão]
- Story de apoio: [sim/não + sugestão]
```
