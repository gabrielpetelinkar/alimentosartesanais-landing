# Task: Design Slides

**Task ID:** design-slides
**Version:** 1.0.0
**Status:** Active
**Responsible Executor:** @slide-master:garr-reynolds
**Execution Type:** Agent
**Squad:** slide-master

---

## Purpose

Create visual design specifications for presentation slides using Garr Reynolds' Presentation Zen methodology, enforced by the Style DNA. Takes narrative architecture as input and produces per-slide visual design direction.

---

## Input

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| narrative | text | Yes | Narrative architecture from *narrative task or user description |
| brand_constraints | text | No | Brand guidelines that must be respected |
| slide_count | number | No | Approximate number of slides |
| format | string | No | PowerPoint / Google Slides / Keynote |

---

## Output

A **Visual Design Specification** with:
- Color palette (Style DNA compliant)
- Typography system (fonts, sizes, weights)
- Layout grid definition
- Per-slide visual direction
- Image guidance per slide
- Animation recommendations

---

## Action Items

### Step 1: Establish Visual Language
Based on Style DNA defaults:

| Element | Specification |
|---------|---------------|
| Background | Dark (black #000000 or dark grey #1A1A1A) |
| Primary text | White (#FFFFFF) or off-white (#F5F5F5) |
| Accent color | Select ONE bold accent (yellow #FFD700, electric blue #00D4FF, neon green #39FF14) |
| Secondary accent | Muted version of primary accent at 40% opacity |
| Typography - Headers | Modern sans-serif, bold/black weight, 36-60pt |
| Typography - Body | Same family, regular weight, 24-32pt |
| Typography - Captions | Same family, light weight, 16-20pt |
| Grid | 12-column with 5% margins |
| Whitespace | Minimum 30% of slide area must be empty |

### Step 2: Define Slide Layouts
Create a set of reusable layouts:

1. **Title Slide** — Full-bleed dark background, centered bold headline, subtitle below
2. **Statement Slide** — One sentence centered, large typography, empty space
3. **Image + Text** — Full-bleed image (left/right) with text overlay or adjacent
4. **Data Slide** — Dark background, single chart/number, bold accent highlight
5. **Quote Slide** — Large quotation marks, speaker attribution
6. **Section Divider** — Bold accent color background, section title
7. **Comparison** — Split screen, two contrasting elements

### Step 3: Per-Slide Visual Direction
For each slide in the narrative:
- **Layout type** from the set above
- **Hero element** (image, number, statement, chart)
- **Image direction** (subject, mood, style — full-bleed, high-res)
- **Typography treatment** (which text is the headline, what's de-emphasized)
- **Accent usage** (where the bold color draws the eye)
- **Animation** (entrance type, timing, purpose)

### Step 4: Apply Presentation Zen Principles
Verify each slide against:
- **Amplification through Simplification** — less on slide = more impact
- **Signal-to-Noise Ratio** — every element must convey meaning
- **Picture Superiority Effect** — images beat text for retention
- **Restraint** — resist adding more; the slide earns its elements

### Step 5: Style DNA Compliance Check
- [ ] ALL backgrounds are dark mode (unless brand override documented)
- [ ] ONE idea per slide throughout
- [ ] Bold accent color used consistently
- [ ] Modern sans-serif typography with clear hierarchy
- [ ] Full-bleed, high-resolution images (no clip art, no generic stock)
- [ ] Animations are purposeful and subtle (0.3s)
- [ ] No bullet points anywhere
- [ ] No corporate template aesthetic

---

## Acceptance Criteria

- [ ] Color palette defined with hex codes
- [ ] Typography system defined with specific fonts and sizes
- [ ] Layout grid established
- [ ] Every slide has visual direction
- [ ] Image guidance is specific and actionable
- [ ] Style DNA compliance verified
- [ ] No bullet points in any slide design

---

## Veto Conditions

- DO NOT design without a narrative structure — narrative before visual, always
- DO NOT use light/white backgrounds as default
- DO NOT accept bullet point layouts
- DO NOT use decorative animations (no spinning, bouncing, flying)
- DO NOT use clip art or generic stock photography

---

## Output Example

```
## VISUAL DESIGN SPEC: FoodTech Investor Pitch

### Color Palette
- Background: #0D0D0D (near-black)
- Primary text: #FFFFFF
- Accent: #00D4FF (electric blue) — used for key numbers and CTAs
- Secondary: #00D4FF at 30% opacity — subtle highlights
- Alert: #FF4444 — Villain/problem slides only

### Typography
- Headers: Inter Black, 48pt (titles), 36pt (section headers)
- Body: Inter Regular, 24pt
- Data numbers: Inter Black, 120pt (hero numbers)
- Captions: Inter Light, 16pt

### Slide Direction

**Slide 1 — Hook (Conexao)**
- Layout: Full-bleed image
- Image: Aerial photograph of food waste landfill, desaturated with blue tint
- Text overlay: "Every second, 23 tons." in Inter Black 60pt, white
- Animation: Number counts up from 0 to 23 (0.3s per increment)
- Accent: "23 tons" in electric blue

**Slide 9 — S.T.A.R. Moment (Live Demo)**
- Layout: Data Slide
- Hero element: Dashboard screenshot on dark background
- Accent: Real-time prediction number in electric blue, 120pt
- Animation: Subtle pulse on the prediction number (0.3s)
```

---

## Handoff

| Condition | Route To |
|-----------|----------|
| Data slides need specialized design | @cole-nussbaumer-knaflic |
| Abstract concept needs visual form | @dan-roam |
| Need to verify cognitive load | @richard-mayer |
| Ready for quality review | @slide-master-chief (*review) |

---

_Task Version: 1.0.0_
_Squad: slide-master_
