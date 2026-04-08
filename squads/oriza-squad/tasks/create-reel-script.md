---
task: Create Reel Script
responsavel: "@content-creator"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - concept: Conceito do reel
  - duration: Duracao alvo (15s, 30s, 60s, 90s)
  - style: Estilo (tutorial, trending, storytelling, ASMR, comparativo)
  - product: Produto featured (opcional)
Saida: |
  - script: Roteiro completo com timecodes
  - hook: Gancho dos primeiros 3 segundos
  - audio_suggestion: Sugestao de audio/musica
  - caption: Legenda para o reel
  - hashtags: Hashtags relevantes
---

# Create Reel Script

Cria roteiro para Instagram Reel da Chilli & Pig.

## Elicitacao

```
? Reel concept:
  1. Receita rápida com molho
  2. Comparativo de molhos (lado a lado)
  3. Processo de fabricação (ASMR/bastidores)
  4. Trend adaptation (audio trending)
  5. Teste de picância (reação)
  6. Dica educativa (curiosidade sobre pimenta)
  7. Unboxing/reveal de produto
  8. Custom: ___________

? Duration:
  1. 15s (hook rápido, viral)
  2. 30s (tutorial curto)
  3. 60s (storytelling)
  4. 90s (tutorial completo)

? Style:
  1. Tutorial/How-to
  2. Trending audio
  3. Storytelling/narração
  4. ASMR/visual satisfying
  5. POV/primeira pessoa
  6. Before/After
```

## Reel Structure

### 15 segundos
```
[0-3s] HOOK VISUAL — parar o scroll
[3-12s] CONTEÚDO — valor rápido
[12-15s] CTA — "segue pra mais"
```

### 30 segundos
```
[0-3s] HOOK — pergunta ou visual impactante
[3-10s] SETUP — contexto rápido
[10-25s] CONTEÚDO — delivery principal
[25-30s] CTA — conversão
```

### 60 segundos
```
[0-3s] HOOK — os 3 segundos mais importantes
[3-15s] PROBLEMA/CONTEXTO — identificação
[15-45s] CONTEÚDO — solução, receita, processo
[45-55s] RESULTADO — antes/depois, prato pronto
[55-60s] CTA — ação clara
```

## Output Format

```markdown
## 🎬 Reel Script — [Conceito]

**Duração:** [Xs] | **Estilo:** [estilo] | **Produto:** [produto]

### Hook (0-3s)
**Visual:** [o que aparece]
**Texto/voz:** "[fala ou texto na tela]"

### Cena 1 ([Xs-Xs])
**Visual:** [descrição]
**Texto/voz:** "[conteúdo]"
**Transição:** [corte, zoom, slide]

...

### CTA Final
**Visual:** [produto ou logo]
**Texto:** "[CTA]"

### Audio
**Sugestão:** [música trending ou narração]

### Legenda
[legenda completa]

### Hashtags
[hashtags]
```
