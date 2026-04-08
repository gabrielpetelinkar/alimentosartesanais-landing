---
task: Create Story Sequence
responsavel: "@content-creator"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - theme: Tema da sequencia
  - story_count: Numero de stories (3-10)
  - goal: Objetivo (engajamento, trafego, venda)
  - product: Produto relacionado (opcional)
Saida: |
  - stories: Lista de stories com texto, visual e interacao
  - stickers: Sugestoes de stickers interativos
  - link_placement: Onde colocar link/CTA
---

# Create Story Sequence

Cria sequência de Instagram Stories para a Chilli & Pig.

## Elicitacao

```
? Theme:
  1. Produto do dia (showcase)
  2. Processo de fabricação (bastidores)
  3. Receita rápida
  4. Quiz/enquete sobre pimentas
  5. Depoimento de cliente
  6. Promoção/oferta
  7. Custom: ___________

? Number of stories: (5)

? Goal:
  1. Engajamento (interação, respostas)
  2. Tráfego (levar ao site)
  3. Venda direta (converter)
  4. Educação (informar)
  5. Branding (fortalecer marca)
```

## Story Structure Pattern

```
Story 1: HOOK — Captura atenção (pergunta, dato curioso, visual impactante)
Story 2-3: CONTEÚDO — Entrega valor (informação, bastidor, receita)
Story 4: INTERAÇÃO — Sticker (enquete, quiz, pergunta, slider)
Story 5: CTA — Direcionamento (link, DM, site, perfil)
```

## Interactive Stickers

| Tipo | Uso | Exemplo |
|------|-----|---------|
| Enquete | Preferência | "Suave ou ardido?" |
| Quiz | Educação | "Qual pimenta é mais forte?" |
| Slider emoji | Opinião | "Quão apimentado você é? 🌶️" |
| Pergunta | Engajamento | "Qual molho você quer provar?" |
| Contagem regressiva | Lançamento | "Desperado volta em..." |
| Link | Conversão | "Compre aqui" |

## Output Format

```markdown
## 📱 Story Sequence — [Tema]

**Stories:** [N] | **Goal:** [objetivo] | **Produto:** [produto]

### Story 1 — Hook
- **Visual:** [descrição]
- **Texto:** [texto overlay]
- **Sticker:** [nenhum ou tipo]

### Story 2 — [nome]
...

### Story [N] — CTA
- **Visual:** [descrição]
- **Texto:** [texto]
- **Sticker:** Link / Swipe up
- **URL:** [link]
```
