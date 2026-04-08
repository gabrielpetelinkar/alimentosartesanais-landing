# Design System — Apresentacao Guia Estrategico para Produtores Artesanais

> **Version:** 1.0
> **Brand:** Oriza Agropecuaria, Educacao e Alimentos
> **Author:** Gabriel Petelinkar
> **Format:** 16:9 (1280x720px) dark-mode presentation
> **Inherits from:** Obsidian Gold Premium Theme (landing page / aula PDFs)

---

## 1. Color Palette

### 1.1 Foundation (Dark Mode)

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary` | `#0D0D0D` | Slide background default |
| `bg-secondary` | `#1A1A1A` | Cards, panels, inset areas |
| `bg-tertiary` | `#141414` | Alternate background for contrast |
| `bg-elevated` | `#222222` | Elevated surfaces (modals, tooltips) |
| `surface-glass` | `rgba(255,255,255,0.04)` | Frosted glass panels |

### 1.2 Text

| Token | Hex | Usage |
|-------|-----|-------|
| `text-primary` | `#FFFFFF` | Headlines, hero text |
| `text-secondary` | `#B0B0B0` | Body copy, subtitles |
| `text-muted` | `#7A7A7A` | Captions, footnotes, disabled |
| `text-warm` | `#FAF5EB` | Warm white (use sparingly for emphasis) |

### 1.3 Group Accent Colors

Each of the 3 sections has a primary accent, a glow variant, and a tint.

#### CRIAR (Chapters 1-7) — Gold / Amber

| Token | Hex | Meaning |
|-------|-----|---------|
| `criar-primary` | `#D4A843` | Primary gold — craft, warmth, ingredients |
| `criar-light` | `#E4BC6A` | Hover / highlight states |
| `criar-dark` | `#A08338` | Muted gold for backgrounds |
| `criar-glow` | `rgba(212,168,67,0.15)` | Glow behind hero numbers |
| `criar-tint` | `rgba(212,168,67,0.08)` | Panel background tint |

#### VENDER (Chapters 8-11) — Terracotta / Copper

| Token | Hex | Meaning |
|-------|-----|---------|
| `vender-primary` | `#C45B3A` | Terracotta — warmth, connection, communication |
| `vender-light` | `#D97B5E` | Hover / highlight states |
| `vender-dark` | `#9A4428` | Muted terracotta for backgrounds |
| `vender-glow` | `rgba(196,91,58,0.15)` | Glow behind hero numbers |
| `vender-tint` | `rgba(196,91,58,0.08)` | Panel background tint |

#### ESCALAR (Chapters 12-15) — Forest Green

| Token | Hex | Meaning |
|-------|-----|---------|
| `escalar-primary` | `#5B8C3E` | Forest green — growth, sustainability, trust |
| `escalar-light` | `#7AAF5A` | Hover / highlight states |
| `escalar-dark` | `#3D6228` | Muted green for backgrounds |
| `escalar-glow` | `rgba(91,140,62,0.15)` | Glow behind hero numbers |
| `escalar-tint` | `rgba(91,140,62,0.08)` | Panel background tint |

### 1.4 Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `success` | `#5B8C3E` | Checkmarks, positive indicators |
| `alert` | `#C45B3A` | Warnings, attention |
| `info` | `#4A90B8` | Info badges, links, tips |
| `neutral-border` | `rgba(255,255,255,0.08)` | Dividers, card borders |

### 1.5 Gradient Definitions

```css
/* Hero radial glow — place behind section title slides */
--gradient-criar:   radial-gradient(ellipse at 50% 60%, rgba(212,168,67,0.18) 0%, transparent 65%);
--gradient-vender:  radial-gradient(ellipse at 50% 60%, rgba(196,91,58,0.18) 0%, transparent 65%);
--gradient-escalar: radial-gradient(ellipse at 50% 60%, rgba(91,140,62,0.18) 0%, transparent 65%);

/* Subtle bottom fade for image overlays */
--overlay-bottom: linear-gradient(to top, #0D0D0D 0%, rgba(13,13,13,0.85) 30%, transparent 100%);

/* Horizontal accent stripe (1px) */
--stripe-criar:   linear-gradient(90deg, transparent 0%, #D4A843 50%, transparent 100%);
--stripe-vender:  linear-gradient(90deg, transparent 0%, #C45B3A 50%, transparent 100%);
--stripe-escalar: linear-gradient(90deg, transparent 0%, #5B8C3E 50%, transparent 100%);
```

---

## 2. Typography System

### 2.1 Font Stack

| Role | Font | Fallback | Google Fonts URL |
|------|------|----------|------------------|
| Display / Headlines | **Montserrat** | `'Helvetica Neue', Arial, sans-serif` | `Montserrat:wght@400;600;700;800;900` |
| Body / Reading | **Inter** | `'SF Pro Text', system-ui, sans-serif` | `Inter:wght@300;400;500;600` |
| Quotes / Editorial | **Playfair Display** | `'Georgia', serif` | `Playfair+Display:ital,wght@0,700;1,400;1,600` |
| Labels / Monospace | **JetBrains Mono** | `'SF Mono', 'Consolas', monospace` | `JetBrains+Mono:wght@500` |

### 2.2 Type Scale (at 1280x720)

| Class | Font | Weight | Size | Line Height | Letter Spacing | Usage |
|-------|------|--------|------|-------------|----------------|-------|
| `hero-number` | Montserrat | 900 | 180px | 1.0 | -4px | Chapter numbers ("01") |
| `title-hero` | Montserrat | 900 | 72px | 1.05 | -2px | Section openers (CRIAR, VENDER, ESCALAR) |
| `title-xl` | Montserrat | 800 | 48px | 1.15 | -1px | Chapter titles |
| `title-lg` | Montserrat | 700 | 40px | 1.2 | -0.5px | Slide headlines |
| `title-md` | Montserrat | 700 | 32px | 1.3 | 0 | Sub-section heads |
| `subtitle` | Montserrat | 400 | 24px | 1.4 | 0 | Subtitles, lead-ins |
| `body` | Inter | 400 | 20px | 1.5 | 0 | Paragraph text |
| `body-sm` | Inter | 400 | 18px | 1.5 | 0 | Dense body text |
| `caption` | Inter | 400 | 14px | 1.4 | 0 | Footnotes, image credits |
| `label` | Montserrat | 700 | 20px | 1.0 | 3px | UPPERCASE labels (CRIAR, etc.) |
| `label-sm` | Montserrat | 600 | 14px | 1.0 | 2px | Small uppercase labels |
| `stat-number` | Montserrat | 800 | 64px | 1.0 | -1px | Hero statistics ("87%") |
| `stat-label` | Inter | 500 | 16px | 1.3 | 1px | Stat descriptions |
| `quote` | Playfair Display | 400 italic | 32px | 1.4 | 0 | Pull quotes |
| `mono` | JetBrains Mono | 500 | 16px | 1.5 | 0 | Technical labels, data |

### 2.3 Weight Usage Rules

| Weight | Named | When to Use |
|--------|-------|-------------|
| 300 | Light | Never for headlines. Only for large decorative text (120px+) |
| 400 | Regular | Body copy, subtitles, quotes |
| 500 | Medium | Emphasis within body, stat labels |
| 600 | SemiBold | Strong body emphasis, small labels |
| 700 | Bold | All `title-*` classes, standard labels |
| 800 | ExtraBold | `title-xl`, stat numbers — confident energy |
| 900 | Black | `hero-number`, `title-hero` only — maximum impact |

### 2.4 Hierarchy Rules

1. **One hero element per slide.** Either a hero-number, a title-hero, or a stat-number. Never two.
2. **Maximum 3 type sizes per slide.** Example: `title-lg` + `body` + `caption`.
3. **Gold color reserved for labels and accent text.** Never color body text gold.
4. **All-caps only for `label` and `label-sm` classes.** Never uppercase titles.
5. **Playfair Display only for quotes.** Never for headlines or body.
6. **Inter never above 24px.** Switch to Montserrat for larger sizes.

---

## 3. Layout Grid

### 3.1 Grid System

- **Canvas:** 1280 x 720 px
- **Columns:** 12 columns, 80px each
- **Gutter:** 24px between columns
- **Margins:** 80px left/right, 60px top/bottom (safe zone)
- **Content area:** 1120 x 600 px

### 3.2 Eight Core Slide Layouts

#### Layout A — Section Divider (CRIAR / VENDER / ESCALAR)

```
+----------------------------------------------------------+
|                                                          |
|                                                          |
|            [LABEL-SM: "PARTE 1 DE 3"]                    |
|                                                          |
|                   C R I A R                               |
|             [title-hero, 72px, gold]                     |
|                                                          |
|            ~~~~~~~~ gold line ~~~~~~~~                    |
|                                                          |
|       "Diferenciacao de Produto"  [subtitle]             |
|       "Capitulos 1 a 7"          [caption]               |
|                                                          |
|                                                          |
|  [--- radial glow from center, group color ---]          |
+----------------------------------------------------------+
```

Full-bleed `bg-primary`. Centered content. Radial gradient glow in the group's accent color behind the title. Gold line (160px) separating title from subtitle. Minimal, cinematic.

#### Layout B — Chapter Opener

```
+----------------------------------------------------------+
|                                                          |
|  [label-sm: "CRIAR"]        [progress: *--o--------]    |
|                                                          |
|   01                                                     |
|   [hero-number, 180px, gold, opacity 0.3]               |
|                                                          |
|   Ingredientes Nativos:                                  |
|   Regionalismo com Pegada Global                         |
|   [title-xl, 48px, white]                                |
|                                                          |
|   ---- gold line (80px) ----                             |
|                                                          |
|   Descubra como transformar ingredientes                 |
|   regionais em diferenciais competitivos.                |
|   [subtitle, 24px, text-secondary]                       |
|                                                          |
+----------------------------------------------------------+
```

Hero number watermark at 30% opacity, positioned upper-left overlapping background. Left-aligned text block. Group label top-left. Progress indicator top-right.

#### Layout C — Content / Bullet Points

```
+----------------------------------------------------------+
|                                                          |
|  [label-sm: group]                  [ch badge: "01"]     |
|                                                          |
|   Titulo do Slide                                        |
|   [title-lg, 40px]                                       |
|                                                          |
|   ---- gold line (80px) ----                             |
|                                                          |
|   * Ponto um com explicacao breve              |
|   * Ponto dois com explicacao breve            |
|   * Ponto tres com explicacao breve            |
|   * Ponto quatro com explicacao breve          |
|   [body, 20px, text-secondary]                           |
|                                                          |
|                                                          |
+----------------------------------------------------------+
```

Bullet character: gold accent dot (not generic bullet). Maximum 5 bullets per slide. Left-aligned.

#### Layout D — Split Image + Text (50/50)

```
+----------------------------------------------------------+
|                          |                                |
|                          |  [label-sm: group]             |
|                          |                                |
|    [FULL-BLEED IMAGE]    |  Titulo do Slide               |
|    with bottom-fade      |  [title-lg]                    |
|    overlay               |                                |
|                          |  ---- gold line ----           |
|                          |                                |
|                          |  Corpo do texto aqui com       |
|                          |  descricao relevante.          |
|                          |  [body, text-secondary]        |
|                          |                                |
+----------------------------------------------------------+
```

Image fills left 50%. Slight overlay gradient on the image edge bleeding into the dark right side. Text on right with standard padding.

#### Layout E — Hero Statistic

```
+----------------------------------------------------------+
|                                                          |
|  [label-sm: group]                  [ch badge: "04"]     |
|                                                          |
|                                                          |
|                      87%                                 |
|               [stat-number, 64px, gold]                  |
|                                                          |
|          dos consumidores pagam mais                     |
|          por produtos artesanais                         |
|          [subtitle, 24px, text-secondary]                |
|                                                          |
|          [--- glow ring behind number ---]               |
|                                                          |
|   Fonte: Pesquisa SEBRAE 2024  [caption, muted]         |
|                                                          |
+----------------------------------------------------------+
```

Centered. Stat number with radial glow in group color behind it. Source citation always present. Can stack 2-3 stats side by side if needed (use 3-column grid).

#### Layout F — Quote

```
+----------------------------------------------------------+
|                                                          |
|                                                          |
|                          "                               |
|               [oversized gold quotation mark]            |
|                                                          |
|       "O produtor artesanal que nao                      |
|        conta sua historia esta                           |
|        vendendo apenas um produto."                      |
|        [quote, 32px, Playfair, italic, white]            |
|                                                          |
|               ---- gold line (80px) ----                 |
|                                                          |
|        — Gabriel Petelinkar  [body-sm, gold]             |
|                                                          |
|                                                          |
+----------------------------------------------------------+
```

Centered. Large decorative quotation mark in gold at ~120px opacity 20%. Quote in Playfair Display italic. Attribution below gold line separator.

#### Layout G — Three-Column Comparison

```
+----------------------------------------------------------+
|                                                          |
|  [label-sm: group]                  [ch badge]           |
|                                                          |
|  Titulo do Slide  [title-lg]                             |
|                                                          |
|  +----------------+  +----------------+  +-------------+ |
|  | [icon/emoji]   |  | [icon/emoji]   |  | [icon]      | |
|  |                |  |                |  |             | |
|  | Subtitulo      |  | Subtitulo      |  | Subtitulo   | |
|  | [title-md]     |  | [title-md]     |  | [title-md]  | |
|  |                |  |                |  |             | |
|  | Descricao do   |  | Descricao do   |  | Descricao   | |
|  | item aqui.     |  | item aqui.     |  | do item.    | |
|  | [body-sm]      |  | [body-sm]      |  | [body-sm]   | |
|  +----------------+  +----------------+  +-------------+ |
|                                                          |
+----------------------------------------------------------+
```

Cards with `bg-secondary` background, `neutral-border`, and `border-radius: 12px`. Each card takes 4 columns. Icon/emoji at top of each card. Max 3 cards.

#### Layout H — Full-Bleed Image with Text Overlay

```
+----------------------------------------------------------+
|                                                          |
|    [FULL BLEED PHOTOGRAPH]                               |
|                                                          |
|                                                          |
|                                                          |
|                                                          |
|  +-----------------------------------------------------+ |
|  | [overlay-bottom gradient]                            | |
|  |                                                     | |
|  |  [label-sm: group]                                  | |
|  |  Titulo sobre a imagem  [title-lg, white]           | |
|  |  Subtitulo aqui  [subtitle, text-warm]              | |
|  +-----------------------------------------------------+ |
+----------------------------------------------------------+
```

Image covers entire slide. Bottom 40% has gradient overlay from transparent to `bg-primary`. Text sits in the bottom safe zone over the overlay.

---

## 4. Image Direction Guide

### 4.1 Global Photography Rules

- **Aspect ratio:** 16:9 or crop to fit layout
- **Resolution:** Minimum 2560x1440 (2x for sharpness on screen)
- **Color treatment:** Desaturate 15-20% from reality, then warm the shadows slightly. The dark-mode slide should feel cohesive, not jarring against bright photos.
- **Overlay:** Always apply `overlay-bottom` gradient when text sits on image. For split layouts, apply a lateral fade on the image edge.
- **No stock cliches:** No handshakes, no suited people pointing at screens, no clipart. Real food, real hands, real workshops.

### 4.2 CRIAR Group — Chapters 1-7

**Mood:** Intimate, warm, close-up, raw ingredients, process, hands at work.
**Lighting:** Golden hour, side-lit, warm tungsten. Shadows are deep but not black.
**Color grade:** Warm amber cast. Rich earth tones. Shallow depth-of-field to isolate subjects.
**Treatment:** Full-bleed or split layouts. Images should feel like you could reach in and touch the food.

| Chapter | Subject Matter | Specific Image Ideas |
|---------|---------------|---------------------|
| **Ch 1 — Ingredientes Nativos** | Native Brazilian ingredients close-up | Baru nuts on dark slate. Acai berries with morning dew. Cumaru seeds in a wooden bowl. Hands holding tucupi in a glass jar. Cerrado fruits spread on burlap. |
| **Ch 2 — Produtos Extremos** | Aged, intense, and bold products | Wheel of Canastra cheese with crystallized rind. Habanero peppers glistening with oil. Aged cachaca in oak barrel close-up. A hand slicing coal-black aged salami. Dark chocolate with visible cacao nibs. |
| **Ch 3 — Produtos Agridoces** | Sweet-and-sour balance, preserves, chutneys | Spoonfull of mango chutney dripping amber. Jars of fruit preserves backlit by warm light. Goiabada cascao next to fresh guava halves. Vinegar reduction with herbs. |
| **Ch 4 — Fermentacao** | Fermentation vessels, bubbles, time | Close-up of kombucha SCOBY. Sourdough starter bubbling in a glass jar. Fermentation crocks with weights. Time-lapse feel: same jar at different stages. Blue cheese veins in macro. |
| **Ch 5 — Experiencia Sensorial** | Multi-sensory engagement | Steam rising from freshly baked bread. Hands breaking a cheese wheel open. Honey dripping in slow motion. Spices being ground in a stone mortar. A tasting board with multiple small portions. |
| **Ch 6 — Nicho e Exclusividade** | Scarcity, premium positioning | Single product spotlit on dark background (product-hero shot). Limited-edition numbered label close-up. Hand-stamped wax seal on a bottle. Velvet-lined gift box with artisan product. |
| **Ch 7 — Embalagem** | Packaging design, unboxing, labels | Kraft paper labels being applied by hand. Stack of branded jars in a workshop. Unboxing sequence from outer wrap to product. Macro on a well-designed label showing texture (letterpress, emboss). |

### 4.3 VENDER Group — Chapters 8-11

**Mood:** Connection, storytelling, people interacting with products. Warmer midtones shifting toward copper/terracotta.
**Lighting:** Mixed natural + ambient. Events, markets, tables with friends.
**Color grade:** Slightly warmer shadows than CRIAR, terracotta tones prominent.
**Treatment:** Mix of full-bleed and split. Include people more than in CRIAR.

| Chapter | Subject Matter | Specific Image Ideas |
|---------|---------------|---------------------|
| **Ch 8 — Narrativa e Comunicacao** | Storytelling, producer's journey | Producer behind a workbench, mid-process, looking at camera. Hands writing a label by hand. A wall of photos showing the farm-to-table journey. Instagram grid mockup on a phone screen. |
| **Ch 9 — Eventos e Degustacoes** | Live events, markets, tastings | Crowded artisan market booth with warm string lights. Tasting table with small numbered cups. Hands pouring samples at a feira. An audience watching a demo in a rustic setting. |
| **Ch 10 — Harmonizacao e Versatilidade** | Food pairing, serving suggestions | Cheese board with wine, honey, and bread. Geleia artesanal alongside a charcuterie spread. Split-shot: same product in 3 different recipe contexts. Chef's hands plating a dish with artisan ingredient as hero. |
| **Ch 11 — Educacao do Consumidor** | Teaching, guiding, informing | Workshop in progress — producer explaining to a small group. Infographic-style flat-lay of ingredient origins. Hands holding a printed guide/booklet at a market stand. QR code on a product leading to story page. |

### 4.4 ESCALAR Group — Chapters 12-15

**Mood:** Growth, structure, professionalism. Still warm but more composed and organized.
**Lighting:** Clean, even, balanced. Natural daylight in organized spaces.
**Color grade:** Greens and earth tones. Less dramatic shadow, more clarity.
**Treatment:** More structured layouts (3-column, stat-heavy). Images support rather than dominate.

| Chapter | Subject Matter | Specific Image Ideas |
|---------|---------------|---------------------|
| **Ch 12 — Colaboracao e Parcerias** | Teamwork, networks, shared spaces | Two producers shaking hands at a market. Shared kitchen/co-working production space. A shelf with multiple brands from the same cooperative. Business cards fanned out on a wooden table. |
| **Ch 13 — Sustentabilidade** | Eco-practices, nature, circularity | Compost bins next to a garden. Reusable glass jars being returned by a customer. Solar panels on a small farm shed. Hands planting in rich dark soil. Zero-waste packaging flat-lay. |
| **Ch 14 — Certificacao e Selos** | Official stamps, certificates, labels | Close-up of SIF/SIE/SUASA certification seal on a package. A framed certificate on a workshop wall. Side-by-side: before (no seal) vs after (certified label). Official document with a stamp. |
| **Ch 15 — Profissionalizacao** | Systems, consistency, scale | Organized production line (small-scale but professional). Spreadsheet/dashboard on a laptop in a kitchen office. Stacked boxes ready for shipment with branded labels. Calendar/planning board on a workshop wall. |

---

## 5. Component Library

### 5.1 Chapter Number Badge

```
+--------+
|   01   |   Montserrat 900, 180px, group accent color
+--------+   Opacity: 30% (watermark mode) or 100% (focused mode)
             Positioned upper-left of slide, bleeding off-canvas by ~20%
             Optional: radial glow ring (group-glow) behind it
```

- **Watermark mode** (Layout B): hero-number at 30% opacity, partially off-canvas
- **Focused mode** (Layout E): hero-number at 100%, centered, with glow ring
- **Badge mode** (Layout C/G): compact circle, 48px diameter, `bg-secondary` fill, group accent border, chapter number in `label-sm` centered

```
  Badge mode:
  +------+
  | (01) |   48x48 circle, 2px border in group color
  +------+   Number: Montserrat 600, 18px, white
              Position: top-right of slide, 80px from right, 40px from top
```

### 5.2 Group Label Treatment

```
  CRIAR
  ^^^^^^^^
  Montserrat 700, 20px, group accent color
  letter-spacing: 3px
  text-transform: uppercase

  Positioned: top-left of slide (80px from left, 40px from top)
  Optional left-border variant:
  |  CRIAR
  3px solid bar in group color, 8px left padding
```

Smaller variant for dense slides:

```
  CRIAR
  Montserrat 600, 14px, letter-spacing: 2px
  group accent color at 70% opacity
```

### 5.3 Stat / Number Callout Box

```
  +-----------------------------------+
  |                                   |
  |            87%                    |   stat-number: Montserrat 800, 64px
  |                                   |   group accent color
  |    dos consumidores preferem      |
  |    produtos com historia          |   stat-label: Inter 500, 16px
  |                                   |   text-secondary
  |    Fonte: SEBRAE 2024             |   caption: Inter 400, 12px
  |                                   |   text-muted
  +-----------------------------------+

  Background: bg-secondary
  Border: 1px solid neutral-border
  Border-top: 3px solid group accent
  Border-radius: 12px
  Padding: 32px
  Glow: optional radial group-glow behind number
```

For 2-3 stats side by side, use equal-width cards across 12-column grid.

### 5.4 Quote Treatment

Two variants:

**Variant A — Centered Pull Quote (Layout F)**
```
  Oversized decorative " in group accent, 120px, 20% opacity
  Quote text: Playfair Display italic, 32px, white
  Gold line separator (80px, 3px) below quote
  Attribution: Inter 500, 18px, group accent color
  Dash prefix: "— Gabriel Petelinkar"
```

**Variant B — Inline Sidebar Quote**
```
  Left border: 3px solid group accent
  Quote text: Playfair Display italic, 24px, white
  Padding-left: 24px
  Attribution: Inter 400, 14px, text-muted
  Used inside content slides next to bullet points
```

### 5.5 Icon Style Guidance

- **Style:** Line icons, 2px stroke, rounded caps and joins
- **Size:** 40x40px in cards, 32x32px inline with text
- **Color:** Group accent color (gold/terracotta/green depending on section)
- **Source recommendation:** Phosphor Icons (available at Google Fonts via Material Symbols, or as SVG)
- **Alternative:** Simple, single-color emoji can work for informal tone: use sparingly for bullet headers in content slides

**Prohibited:** Filled/solid icons, 3D icons, clipart, gradients on icons, multi-color icons.

### 5.6 Progress Indicator

Shows the viewer's position across the 3 sections.

```
  CRIAR -------- VENDER -------- ESCALAR
    *               o                o        (active section = filled dot)
```

**Implementation:**

```
  +---------------------------------------------------------+
  |  CRIAR  --------  VENDER  --------  ESCALAR             |
  |   [*]              [ ]               [ ]                |
  +---------------------------------------------------------+

  - Line: 2px, rgba(255,255,255,0.12)
  - Active section label: group accent color, Montserrat 600, 12px
  - Inactive section labels: text-muted, Montserrat 400, 12px
  - Active dot: 8px circle, filled with group accent color
  - Inactive dot: 8px circle, 2px stroke rgba(255,255,255,0.2), transparent fill
  - Position: top-right of slide OR bottom-center (choose one per presentation, stay consistent)
  - Only shown on content slides (not on section dividers or title/closing slides)
```

### 5.7 Gold Decorative Line

```
  ——————————
  Width: 80px (standard) or 160px (wide, centered)
  Height: 3px
  Color: group accent (gold for CRIAR, terracotta for VENDER, green for ESCALAR)
  Margin: 20px vertical
  Usage: separating title from body, separating quote from attribution
  NEVER: use full-width lines. Always feel intentional and restrained.
```

### 5.8 Card Component

```
  +------------------------------------------+
  |  [icon or emoji]                         |
  |                                          |
  |  Card Title                              |
  |  [title-md, 24-32px, white]              |
  |                                          |
  |  Description text goes here with         |
  |  two lines maximum.                      |
  |  [body-sm, 18px, text-secondary]         |
  |                                          |
  +------------------------------------------+

  Background: bg-secondary (#1A1A1A)
  Border: 1px solid neutral-border
  Border-radius: 12px
  Padding: 32px
  Max per slide: 3 (in 3-column layout)
  Min per slide: 2
```

---

## 6. Section-Specific Visual Treatments

### 6.1 CRIAR (Chapters 1-7) — "O Oficio"

**Visual DNA:**
- Warmth, intimacy, hands-on craft
- Close-up photography dominates
- Gold accents everywhere — the richest, most visually intense section
- Textures: wood grain, burlap, ceramic, raw ingredients

**Slide feel:**
- Higher image-to-text ratio (use Layout D and H frequently)
- More full-bleed photography
- Hero numbers prominent — these are the foundation chapters

**Unique elements:**
- Gold radial glow more pronounced than other sections
- Textured overlays (subtle grain/noise at 3-5% opacity) for artisanal feel
- Macro photography as background on select slides

**Color weighting:**
- 70% dark background, 15% gold accents, 10% text, 5% supporting image color

### 6.2 VENDER (Chapters 8-11) — "A Conexao"

**Visual DNA:**
- Human connection, storytelling, engagement
- People appear in photos (producers, consumers, events)
- Terracotta/copper warmth — less gold, more earth

**Slide feel:**
- Balanced image + text (Layout D as workhorse)
- More quote slides (Layout F) — this section is about narrative
- Statistics about consumer behavior featured prominently

**Unique elements:**
- Terracotta glow replaces gold glow
- Warmer overall tone — shadows shift from blue-black to brown-black
- Speech/narrative visual metaphors (quote marks, dialogue feel)

**Color weighting:**
- 70% dark background, 12% terracotta accents, 12% text, 6% image bleed

### 6.3 ESCALAR (Chapters 12-15) — "O Crescimento"

**Visual DNA:**
- Structure, reliability, professionalism
- Organized spaces, clean lines, growth metaphors
- Green as signal of maturity, sustainability, trust

**Slide feel:**
- More data-heavy (Layout E and G frequently)
- More 3-column comparison slides
- Fewer full-bleed images, more structured layouts

**Unique elements:**
- Green glow, more restrained than the gold of CRIAR
- Cleaner layouts with more whitespace (dark-space)
- Diagram-style visuals (flowcharts, timelines) using the component library
- Checkpoint/milestone treatment for process steps

**Color weighting:**
- 75% dark background, 10% green accents, 10% text, 5% supporting graphics

---

## 7. Anti-Patterns

### 7.1 Visual Anti-Patterns

| NEVER | WHY |
|-------|-----|
| White or light backgrounds | Breaks dark-mode premium feel. Every slide is `#0D0D0D`. |
| Gradient text on body copy | Unreadable. Gradient text only on decorative hero elements, if at all. |
| More than 5 bullet points | Cognitive overload. Split into 2 slides. |
| Centered body text longer than 2 lines | Unreadable. Left-align or split across cards. |
| Stock photos of generic "business people" | Destroys artisan authenticity. Real food or no photo at all. |
| Clipart, 3D renders, cartoon illustrations | Breaks premium aesthetic. Photography or clean line icons only. |
| Rainbow or multi-color palettes on a single slide | Max 2 accent colors per slide (group accent + one supporting). |
| Shadows behind text on images without overlay | Illegible. Always use gradient overlay, never text-shadow as the only solution. |
| Animation cues or transition instructions | This is a static PDF export. No builds, no transitions. |
| Logos watermarked on every slide | One logo placement: title slide and closing slide only. |

### 7.2 Content Anti-Patterns

| NEVER | WHY |
|-------|-----|
| Call artisan products "commodity" | The entire ebook is about differentiation. Never use commodity framing. |
| Use industrial food photography (conveyor belts, factories) | The audience is small-scale artisans. Industrial imagery is alienating. |
| Show perfect, sterile environments | Artisan spaces are real and lived-in. Over-polished imagery feels inauthentic. |
| Feature non-Brazilian ingredients/products as examples | The ebook is about Brazilian terroir. Keep references national: cerrado, caatinga, Mata Atlantica, etc. |
| Use English words without context | Audience is Portuguese-speaking. Avoid unexplained anglicisms. Excecao: termos tecnicos universais (marketing, branding, storytelling). |
| Show prices or specific commercial offers | The presentation is educational, not a sales pitch. No "R$ X" on content slides. |
| Use "artesanal" to mean "unprofessional" | The ebook's thesis is that artisanal = strategic advantage. Never imply it means amateur. |
| Include competitor brand names or logos | Focus on the producer's own brand building, not comparison with others. |

### 7.3 Typography Anti-Patterns

| NEVER | WHY |
|-------|-----|
| Mix more than 3 fonts on one slide | Max is Montserrat + Inter + Playfair. Never add a 4th. |
| Use Comic Sans, Papyrus, or script fonts | Obvious, but stated for completeness. Premium means restrained. |
| Underline text for emphasis | Use bold weight or gold color instead. Underlines look like hyperlinks. |
| Use text smaller than 14px | Unreadable in presentation format. 14px is the floor (captions only). |
| Stretch or compress type | Always use designed widths. If text doesn't fit, reduce copy, not font. |

### 7.4 Layout Anti-Patterns

| NEVER | WHY |
|-------|-----|
| Place text in the outer 40px margin | Safe zone exists for a reason — projectors and screens crop edges. |
| Use more than 3 columns | 3 columns is the max at 1280px width. 4+ columns are too narrow. |
| Stack cards vertically beyond 2 rows | Breaks visual flow. Use multiple slides instead. |
| Place important content in the bottom 60px | Footer zone. Only captions, sources, and page numbers. |
| Overlap text on high-detail image areas | If using image background, text must sit on overlay or on a solid panel. |

---

## 8. CSS Variable Reference (Implementation)

For HTML/CSS slide generation, use these root variables:

```css
:root {
  /* Foundation */
  --bg-primary: #0D0D0D;
  --bg-secondary: #1A1A1A;
  --bg-tertiary: #141414;
  --bg-elevated: #222222;
  --surface-glass: rgba(255,255,255,0.04);
  --neutral-border: rgba(255,255,255,0.08);

  /* Text */
  --text-primary: #FFFFFF;
  --text-secondary: #B0B0B0;
  --text-muted: #7A7A7A;
  --text-warm: #FAF5EB;

  /* CRIAR */
  --criar-primary: #D4A843;
  --criar-light: #E4BC6A;
  --criar-dark: #A08338;
  --criar-glow: rgba(212,168,67,0.15);
  --criar-tint: rgba(212,168,67,0.08);

  /* VENDER */
  --vender-primary: #C45B3A;
  --vender-light: #D97B5E;
  --vender-dark: #9A4428;
  --vender-glow: rgba(196,91,58,0.15);
  --vender-tint: rgba(196,91,58,0.08);

  /* ESCALAR */
  --escalar-primary: #5B8C3E;
  --escalar-light: #7AAF5A;
  --escalar-dark: #3D6228;
  --escalar-glow: rgba(91,140,62,0.15);
  --escalar-tint: rgba(91,140,62,0.08);

  /* Semantic */
  --success: #5B8C3E;
  --alert: #C45B3A;
  --info: #4A90B8;

  /* Typography */
  --font-display: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
  --font-body: 'Inter', 'SF Pro Text', system-ui, sans-serif;
  --font-editorial: 'Playfair Display', 'Georgia', serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', 'Consolas', monospace;

  /* Spacing */
  --slide-padding-x: 80px;
  --slide-padding-y: 60px;
  --content-gap: 24px;
  --card-padding: 32px;
  --card-radius: 12px;

  /* Gradients */
  --gradient-criar: radial-gradient(ellipse at 50% 60%, rgba(212,168,67,0.18) 0%, transparent 65%);
  --gradient-vender: radial-gradient(ellipse at 50% 60%, rgba(196,91,58,0.18) 0%, transparent 65%);
  --gradient-escalar: radial-gradient(ellipse at 50% 60%, rgba(91,140,62,0.18) 0%, transparent 65%);
  --overlay-bottom: linear-gradient(to top, #0D0D0D 0%, rgba(13,13,13,0.85) 30%, transparent 100%);
}
```

---

## 9. Slide Count Estimate by Layout

| Layout | Estimated Usage | Typical Slides |
|--------|----------------|----------------|
| A — Section Divider | 3 (one per group) | CRIAR, VENDER, ESCALAR openers |
| B — Chapter Opener | 15 (one per chapter) | Ch 1-15 title slides |
| C — Content / Bullets | ~30-40 | Core teaching content |
| D — Split Image + Text | ~15-20 | Visual storytelling |
| E — Hero Statistic | ~10-12 | Data-driven impact moments |
| F — Quote | ~8-10 | Author quotes, expert references |
| G — Three-Column | ~10-12 | Comparisons, frameworks, lists |
| H — Full-Bleed Image | ~8-10 | Opening/emotional impact |
| **Title + Closing** | 2 | Presentation bookends |
| **TOTAL** | **~95-120 slides** | |

---

*Design System v1.0 — Oriza Agropecuaria / Guia Estrategico para Produtores Artesanais*
