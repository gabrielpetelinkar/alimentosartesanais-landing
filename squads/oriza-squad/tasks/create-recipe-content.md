---
task: Create Recipe Content
responsavel: "@content-creator"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - recipe_type: Tipo de receita
  - sauce: Molho Chilli & Pig usado
  - difficulty: Dificuldade (facil, medio, avancado)
  - format: Formato de saida (post, reel, story, blog)
Saida: |
  - recipe: Receita completa (ingredientes + modo de preparo)
  - content: Conteudo formatado para a plataforma escolhida
  - photo_brief: Descricao da foto ideal
  - cross_sell: Sugestao de outros molhos que combinam
---

# Create Recipe Content

Cria conteúdo de receita usando molhos Chilli & Pig.

## Elicitacao

```
? Recipe type:
  1. Petisco rápido (até 15min)
  2. Prato principal
  3. Molho/condimento derivado
  4. Drink/cocktail picante
  5. Sobremesa com pimenta
  6. Harmonização (molho + prato)

? Chilli & Pig sauce:
  1. Original (versátil, médio)
  2. Sriracha (fermentado, toque doce)
  3. Dainty (sweet chilli, suave)
  4. Volcano (habanero, ultra forte)
  5. Desperado (cachaça, forte)
  6. Jalapeño (clássico, médio)
  7. Chipotle (defumado, médio)
  8. HOT Barbecue (churrasco, forte)
  9. Maria Bonita (abacaxi + habanero)
  10. Cabra da Peste (coentro, forte)
  11. Mel Picante

? Difficulty:
  1. Fácil (5-15min, poucos ingredientes)
  2. Médio (15-30min)
  3. Avançado (30min+, técnica)

? Output format:
  1. Post carrossel (receita visual)
  2. Reel (tutorial rápido)
  3. Story sequence (passo a passo)
  4. Blog post (completo com SEO)
```

## Recipe Guidelines

- Ingredientes acessíveis (supermercado comum)
- Molho Chilli & Pig como protagonista ou toque especial
- Sempre mencionar nível de picância e sugestão de ajuste
- Incluir sugestão de substituição do molho por outro da linha
- Foto brief deve ser appetizing e Instagram-ready

## Output Format

```markdown
## 🍳 Receita — [Nome da Receita]

**Molho:** [produto Chilli & Pig]
**Dificuldade:** [nível] | **Tempo:** [Xmin] | **Porções:** [N]

### Ingredientes
- [lista]
- **Molho Chilli & Pig [nome]** — [quantidade]

### Modo de Preparo
1. [passo]
2. [passo]
...

### Dica do Chef 🌶️
[dica de como ajustar picância ou variação]

### Cross-sell
"Experimentou com [molho usado]? Testa também com [outro molho] para [efeito diferente]"

### Photo Brief
[descrição da foto ideal para o post]

### Conteúdo [formato]
[conteúdo formatado para a plataforma escolhida]
```
