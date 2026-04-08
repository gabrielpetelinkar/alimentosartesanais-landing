---
task: Create Educational Content
responsavel: "@content-creator"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - topic: Tema educativo
  - depth: Profundidade (curiosidade rapida, explicacao, deep dive)
  - format: Formato (post, carrossel, reel, story, blog)
Saida: |
  - content: Conteudo educativo completo
  - visual_brief: Descricao do visual
  - product_tie: Conexao natural com produto (sem forcar)
---

# Create Educational Content

Cria conteúdo educativo sobre pimentas, molhos e gastronomia para a Chilli & Pig.

## Elicitacao

```
? Topic:
  1. Escala Scoville — como medir picância
  2. Tipos de pimenta (Habanero, Jalapeño, Chipotle, etc.)
  3. Fermentação — por que molho fermentado é diferente
  4. Harmonização — qual molho com qual comida
  5. Benefícios da capsaicina para saúde
  6. História das pimentas no Brasil/mundo
  7. Como armazenar e conservar molhos artesanais
  8. Diferença entre molho artesanal e industrial
  9. Agricultura familiar na Paraíba
  10. Custom: ___________

? Depth:
  1. Curiosidade rápida (1 dado surpreendente)
  2. Explicação (contexto + detalhes)
  3. Deep dive (análise completa)

? Format:
  1. Post carrossel educativo
  2. Reel explicativo
  3. Story quiz
  4. Blog post completo
```

## Topic Database

| Tema | Hook Sugerido | Produto Tie-in |
|------|--------------|----------------|
| Scoville | "Seu molho tem 50.000 SHU. Mas o que isso significa?" | Volcano (Habanero) |
| Fermentação | "Seu molho fermentou por semanas. O industrial, zero." | Sriracha |
| Habanero | "A pimenta mais perfumada do mundo é a mais forte da família" | Volcano |
| Capsaicina | "Pimenta vicia? A ciência diz que sim (e explica por quê)" | Qualquer |
| Artesanal vs Industrial | "Ingredientes frescos vs conservantes: a diferença que você sente" | Original |
| Harmonização | "Churrasco pede qual molho? Depende da carne." | HOT Barbecue |
| Sweet chilli | "Doce e ardido ao mesmo tempo? A ciência do sweet chilli" | Dainty |

## Output Format

```markdown
## 📚 Conteúdo Educativo — [Tema]

**Profundidade:** [nível] | **Formato:** [formato]
**Product tie-in:** [produto, natural, sem forçar]

### Hook
[frase de abertura que gera curiosidade]

### Conteúdo
[conteúdo educativo completo no formato escolhido]

### Produto Connection (sutil)
[como conectar naturalmente ao produto sem parecer propaganda]

### Visual Brief
[descrição do visual]

### CTA
[call-to-action educativo: "salve", "compartilhe com quem ama pimenta"]
```
