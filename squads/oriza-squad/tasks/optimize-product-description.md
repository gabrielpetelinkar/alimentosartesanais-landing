---
task: Optimize Product Description
responsavel: "@copywriter"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - product_name: Nome do produto
  - current_description: Descricao atual (se existir)
  - key_features: Caracteristicas principais
  - target_emotion: Emocao alvo (ousadia, curiosidade, conforto)
Saida: |
  - headline: Titulo otimizado
  - description: Descricao completa (curta + longa)
  - bullets: Bullets de beneficios
  - seo_meta: Meta description para SEO
---

# Optimize Product Description

Cria ou otimiza descrição de produto para o e-commerce da Chilli & Pig.

## Elicitacao

```
? Product:
  1. Original
  2. Sriracha
  3. Dainty (sweet chilli)
  4. Volcano (habanero)
  5. Desperado (cachaça)
  6. Jalapeño
  7. Chipotle
  8. HOT Barbecue
  9. Maria Bonita
  10. Cabra da Peste
  11. Mel Picante
  12. Kit/Combo: ___________

? Current description available? (Y/n)
  [se sim, colar a atual]

? Target emotion:
  1. Ousadia/aventura ("pra quem não tem medo")
  2. Curiosidade ("descubra o sabor que...")
  3. Conforto/nostalgia ("o tempero que lembra...")
  4. Premium/sofisticação ("selecionado à mão...")
  5. Diversão ("quem aguenta?")
```

## Copywriting Formula

```
1. HEADLINE — sensorial, ativa imaginação (max 70 chars)
2. SUBHEAD — benefício principal em 1 frase
3. DESCRIÇÃO CURTA — 2-3 linhas, storytelling
4. DESCRIÇÃO LONGA — história + processo + resultado
5. BULLETS — max 5, benefício > feature
6. PROVA — origem, processo, selo
7. CTA — comprar + urgência natural
8. SEO META — max 160 chars, keyword-rich
```

## Output Format

```markdown
## ✍️ Product Copy — [Produto]

### Headline
[título sensorial]

### Subhead
[benefício em 1 frase]

### Descrição Curta (para listagem)
[2-3 linhas]

### Descrição Completa (para página de produto)
[storytelling + processo + resultado, 100-200 palavras]

### Bullets de Benefícios
- 🌶️ [benefício 1]
- 🔥 [benefício 2]
- 🌿 [benefício 3]
- 🏆 [benefício 4]
- 📦 [benefício 5]

### Selos/Provas
[artesanal, fermentado, Paraíba, agricultura familiar, etc.]

### SEO Meta Description
[max 160 chars]

### CTA Sugerido
[texto do botão + mensagem de urgência]
```
