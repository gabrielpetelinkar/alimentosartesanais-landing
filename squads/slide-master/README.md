# Slide Master Squad

Squad de elite para criacao de slides magnificos para apresentacoes e aulas.

## Philosophy

> "Every slide is a scene. Every presentation is a film."

Combina 7 elite minds com metodologias documentadas + Style DNA inspirado na Escola Conquer, Perestroika (Chora PPT), e Pinho Fornari.

## Style DNA

Visual aesthetic definido por:
- **Dark mode first** — backgrounds escuros com cores de destaque vibrantes
- **Bold typography** — tipografia como elemento visual principal
- **One idea per slide** — simplicidade radical
- **Narrative-first** — historia antes do software
- **Emotion-driven** — "se nao sentir, nao lembra"
- **Anti-corporate** — editorial design, nao templates corporativos

Referencia completa: `data/style-dna.md`

## Agents

### Tier 0 — Diagnostic/Foundation
| Agent | Icon | Role | Framework |
|-------|------|------|-----------|
| `edward-tufte` | 🔬 | Data Visualization Diagnostician | 6 Principles, Data-Ink Ratio, Chartjunk Detection |
| `richard-mayer` | 🧠 | Learning Scientist | 12 Principles of Multimedia Learning, Cognitive Load Theory |

### Tier 1 — Masters
| Agent | Icon | Role | Framework |
|-------|------|------|-----------|
| `nancy-duarte` | ✨ | Narrative Architect | Sparkline, Slide:ology, DataStory |
| `garr-reynolds` | 🎋 | Visual Design Master | Presentation Zen, Signal-to-Noise Ratio |
| `cole-nussbaumer-knaflic` | 📊 | Data Storyteller | SWD 6-Step, Chart Selection, Preattentive Attributes |

### Tier 2 — Systematizers
| Agent | Icon | Role | Framework |
|-------|------|------|-----------|
| `dan-roam` | ✏️ | Visual Thinker | 4-Step Visual Thinking, 6x6 Framework, SQVID |
| `cliff-atkinson` | 🧩 | Cognitive Structuralist | Beyond Bullet Points 3-Step, BBP Story Template |

### Orchestrator
| Agent | Icon | Role |
|-------|------|------|
| `slide-master-chief` | 🎬 | Maestro — routes to right specialist |

## Activation

```
@slide-master:slide-master-chief   # Orchestrator (recommended)
@slide-master:nancy-duarte         # Direct access to Narrative Architect
@slide-master:garr-reynolds        # Direct access to Visual Design
@slide-master:edward-tufte         # Direct access to Data Diagnostic
@slide-master:richard-mayer        # Direct access to Learning Science
@slide-master:cole-nussbaumer-knaflic  # Direct access to Data Storytelling
@slide-master:dan-roam             # Direct access to Visual Thinking
@slide-master:cliff-atkinson       # Direct access to Cognitive Structure
```

## Typical Flow

```
User has a presentation need
        |
  slide-master-chief (Maestro)
        |
        +---> nancy-duarte (narrative structure)
        |         |
        +---> garr-reynolds (visual design)
        |         |
        +---> edward-tufte (data quality check)
        |         |
        +---> cole-nussbaumer-knaflic (data slides)
        |         |
        +---> dan-roam (concept visualization)
        |         |
        +---> cliff-atkinson (bullet point elimination)
        |         |
        +---> richard-mayer (learning validation)
        |
  Final quality review against Style DNA
```

## Commands (via Orchestrator)

| Command | Description |
|---------|-------------|
| `*create-presentation` | Full guided workflow |
| `*diagnose` | Analyze existing slides |
| `*narrative` | Structure presentation story |
| `*design` | Visual slide design |
| `*data-slide` | Design data-heavy slides |
| `*visualize` | Convert idea to visual |
| `*restructure` | Replace bullets with story |
| `*review` | Full quality review |
| `*style-guide` | Show Style DNA |
| `*help` | All commands |

## Style DNA Sources

| Source | Contribution |
|--------|-------------|
| **Escola Conquer** | Metodologia 3x4 (Conteudo + Forma + Empatia), 4 Story Moments (Conexao, Vilao, Solucao Matadora, Moral), dark mode aesthetic |
| **Perestroika** | Experience Learning (Conteudo + Forma + Emocao + Estrutura), Chora PPT methodology, anti-corporate editorial design |
| **Pinho Fornari** | Narrative architecture before software, every slide is a scene, contrast is king, images as transformers |

## File Structure

```
squads/slide-master/
├── config.yaml           # Squad configuration
├── README.md             # This file
├── agents/               # 7 elite minds + orchestrator
│   ├── slide-master-chief.md
│   ├── edward-tufte.md
│   ├── richard-mayer.md
│   ├── nancy-duarte.md
│   ├── garr-reynolds.md
│   ├── cole-nussbaumer-knaflic.md
│   ├── dan-roam.md
│   └── cliff-atkinson.md
├── data/
│   └── style-dna.md      # Conquer + Perestroika + Pinho DNA
├── tasks/
├── workflows/
├── templates/
├── checklists/
│   └── slide-quality-checklist.md
└── scripts/
```
