---
task: Create Brand Voice Guide
responsavel: "@social-strategist"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - brand_name: Nome da marca
  - brand_values: Valores da marca
  - target_audience: Publico-alvo
  - existing_tone: Tom atual (se existir)
Saida: |
  - voice_guide: Guia completo de voz da marca
  - dos_and_donts: Lista de do's e don'ts
  - examples: Exemplos praticos por canal
---

# Create Brand Voice Guide

Cria guia de voz e tom da marca para garantir consistência em todas as comunicações.

## Elicitacao

```
? Brand name: ___________

? Brand values (select all that apply):
  1. Artesanal/handmade
  2. Autenticidade
  3. Tradição/raiz
  4. Inovação/ousadia
  5. Qualidade premium
  6. Sustentabilidade
  7. Comunidade/família
  8. Custom: ___________

? Target audience:
  1. Foodies/gastronômicos (25-45 anos)
  2. Chefs e cozinheiros amadores
  3. Amantes de pimenta/picante
  4. Consumidor gourmet premium
  5. Empreendedores do nicho alimentício
  6. Mix de perfis

? Current tone (if any):
  1. Ainda não definido
  2. Informal/descontraído
  3. Premium/sofisticado
  4. Educativo/didático
  5. Custom: ___________
```

## Output Format

```markdown
## 🎯 Brand Voice Guide — [Marca]

### Essência da Marca
[1-2 frases que capturam a alma da marca]

### Personalidade (3 adjetivos)
1. [adjetivo] — [explicação]
2. [adjetivo] — [explicação]
3. [adjetivo] — [explicação]

### Tom de Voz
**Somos:** [como falamos]
**Não somos:** [como NÃO falamos]

### Vocabulário
**Usamos:** [palavras, expressões]
**Evitamos:** [palavras, expressões]

### Por Canal
| Canal | Tom | Exemplo |
|-------|-----|---------|
| Instagram feed | [tom] | [exemplo] |
| Stories | [tom] | [exemplo] |
| WhatsApp | [tom] | [exemplo] |
| E-commerce | [tom] | [exemplo] |
| Email | [tom] | [exemplo] |

### Do's and Don'ts
✅ [fazer]
✅ [fazer]
❌ [não fazer]
❌ [não fazer]

### Exemplos Práticos
**Situação:** Cliente pergunta sobre picância
- ✅ [resposta no tom certo]
- ❌ [resposta no tom errado]
```
