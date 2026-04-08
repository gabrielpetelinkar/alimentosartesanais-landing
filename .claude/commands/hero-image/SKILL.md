---
name: hero-image
description: "Generate professional hero images for sales pages featuring a subject composited into contextual scenes with conceptual symbols and 3-layer composition. Uses Google Gemini API with identity-first prompting for maximum photo fidelity. Builds structured JSON configs from user inputs (product, offer, tone, context, symbols, layers) and generates high-end composited images. Supports desktop (16:9), tablet (4:3), mobile (9:16), and square (1:1) variants. Backward-compatible with legacy configs."
---

# Hero Image Generator

Generate high-end hero images for sales pages with a subject composited into contextual scenes via the Google Gemini API. Uses identity-first prompting, 3-layer composition, and conceptual symbols for maximum fidelity and visual impact.

## When to Use

- User requests a hero image, hero banner, or header image for a sales/landing page
- User mentions generating a sales page visual with a person's photo
- User needs a two-column hero layout (text left, person right)
- User wants to create marketing page imagery with a reference photo

## Prerequisites

1. **Gemini API key** in `.env` file as `GEMINI_API_KEY` or `GOOGLE_API_KEY`
2. **Subject's reference photo** provided by user (any format: jpg, png, webp) — front-facing, well-lit, 1024px+ recommended
3. **Python dependencies** installed: `pip install google-genai Pillow python-dotenv`

To install dependencies, run from the skill directory:
```bash
pip install -r scripts/requirements.txt
```

## Conceptual Framework

Hero images work best when they communicate meaning through **conceptual symbols** rather than generic scene decoration. Before generating, answer these 3 questions:

1. **What domain is the product in?** (legal, finance, marketing, etc.) — determines primary symbol
2. **What transformation does the product promise?** (time mastery, growth, breakthrough) — determines secondary symbol
3. **What emotion should the viewer feel?** (trust, urgency, aspiration) — determines lighting and palette

**Why conceptual > generic:** A clock face with roman numerals communicating "time mastery" is more powerful than generic bokeh particles. The v4 Virada Estrategica iteration proved this — hand-crafted symbols (clock + scales) outperformed all prior generic-background versions.

## Symbol Mapping

Quick reference for common domains. See `references/prompt-templates.md` for the full bank.

| Domain | Primary Symbol | Secondary Symbol |
|--------|---------------|-----------------|
| Legal | Scales of justice | Gavel, law volumes |
| Finance | Ascending chart | Golden coins |
| Education | Open book | Graduation cap, lightbulb |
| Marketing | Data dashboard | Growth arrows, target |
| Technology | Circuit board | Holographic UI |
| Wellness | Lotus flower | Water ripples |

**Transformation symbols** (combine with any domain): clock face, hourglass, ascending path, phoenix, compass.

**Rules:** Max 4 symbols. 1 primary (large, semi-transparent) + 1-2 secondary (smaller) + 0-1 subtle (barely visible).

## Layered Composition

Every hero image is built from 3 layers:

| Layer | Purpose | Default |
|-------|---------|---------|
| **Background** | Sets the world/environment | Scene from context preset |
| **Midground** | Conceptual symbols that communicate meaning | Auto-derived from symbols or domain library |
| **Foreground** | Lighting effects that separate subject | Rim light in accent color |

The `layers` config field lets you override any layer explicitly, or set `"midground": "auto"` to derive from symbols/domain.

## Fidelity Requirements

Photo fidelity is controlled entirely through prompt engineering (no API weight param exists). The system enforces:

1. **Identity lock comes FIRST in prompt** — model weights earlier tokens more heavily
2. **Enumeration technique** — describe 5+ specific physical features, never vague terms
3. **Negative constraints** — explicitly forbid alterations ("DO NOT alter, improve, idealize")
4. **Camera language** — specify mm, aperture, shot type (default: 85mm f/1.8 medium shot)
5. **`media_resolution_high`** — forces highest resolution processing of reference photo

For best results, provide a detailed `subject_description` that enumerates: hair, beard, skin tone, eye color, build, clothing.

## Workflow

### Step 1: Gather Inputs

Collect the following from the user (ask if not provided):

| Input | Required | Example |
|-------|----------|---------|
| `product` | Yes | "Curso Completo de Direito Penal" |
| `subject_photo` | Yes | Path to subject's reference photo |
| `offer` | No | "De R$1.997 por R$997" |
| `tone` | No (default: authority, trust, transformation) | "energy, urgency, exclusivity" |
| `context` | No (default: course) | One of: `course`, `consulting`, `event`, `saas`, `wellness`, `finance`, `legal`, `marketing` |
| `palette` | No (default: premium) | One of: `premium`, `trust`, `energy`, `growth`, `creative`, `warm` |
| `subject_description` | No (auto-generated) | Detailed physical description |
| `symbols` | No (auto-derived from context) | Array of symbol objects |
| `layers` | No (auto-derived) | Background/midground/foreground overrides |
| `seed` | No (default: 42) | Integer for reproducibility |
| `sizes` | No (default: all three) | `desktop`, `tablet`, `mobile`, `square` |
| `output_dir` | No (default: ./hero-output) | Custom output path |

### Step 2: Derive Concept

Before building the config, determine the conceptual approach:

1. Identify the **domain** from the product (legal? marketing? wellness?)
2. Pick 1-2 **symbols** that communicate the product's promise
3. Decide if background should be a **scene preset** or **pure color** (black works well for premium)
4. Choose **lighting style** that matches the tone (Rembrandt for authority, rim for drama, golden hour for warmth)

### Step 3: Build Config JSON

Assemble the structured config:

```json
{
  "product": "Virada Estrategica — Concursos Juridicos",
  "offer": "De R$1.997 por R$997",
  "tone": "authority, trust, transformation, time mastery",
  "subject_photo": "/path/to/reference.png",
  "subject_description": "a Brazilian man in his early 30s with: (1) short dark brown hair, slightly wavy, (2) full well-groomed beard ~1cm, (3) warm olive skin tone, (4) brown eyes, (5) medium build, (6) fitted charcoal blazer over black crew-neck t-shirt",
  "symbols": [
    {"object": "analog clock face (roman numerals)", "meaning": "time mastery", "style": "large, golden, semi-transparent"},
    {"object": "scales of justice", "meaning": "legal career", "style": "very faint, far background"}
  ],
  "layers": {
    "background": "pure black (#000000) with subtle smoke wisps",
    "midground": "auto",
    "foreground": "warm golden rim light on right edge"
  },
  "context": "legal",
  "palette": "warm",
  "seed": 42,
  "sizes": ["desktop"],
  "output_dir": "./hero-output-v5"
}
```

Save this config to a file (e.g., `hero-config.json`) for reproducibility.

**Backward compatibility:** Old configs with `pedro_photo` and `pedro_description` (without `symbols`/`layers`) still work — the script resolves aliases and derives defaults automatically.

### Step 4: Run Dry-Run (Recommended)

Preview the prompts without calling the API:

```bash
python scripts/generate_hero.py --config hero-config.json --dry-run
```

**Verify:** The IDENTITY LOCK section appears FIRST in the prompt output. Symbols appear in the LAYERS section. No text/logo instructions appear in STYLE.

### Step 5: Generate Images

Execute the generation:

```bash
python scripts/generate_hero.py --config hero-config.json
```

Or via CLI args:

```bash
python scripts/generate_hero.py \
  --subject-photo /path/to/reference.png \
  --product "Virada Estrategica" \
  --context legal \
  --palette warm \
  --seed 42 \
  --symbols '[{"object":"clock face","meaning":"time mastery","style":"large, golden"}]' \
  --sizes desktop \
  --output-dir ./hero-output-v5
```

### Step 6: Review Outputs

The script generates in the output directory:
- `hero-desktop.png` + `hero-desktop.jpg` (16:9) — **generated via Gemini**
- `hero-tablet.png` + `hero-tablet.jpg` (4:3) — **generated via Gemini** (if requested)
- `hero-mobile.png` + `hero-mobile.jpg` (9:16) — **derived from desktop via PIL** (NOT generated by Gemini)
- `prompt-config.json` (audit trail with full prompts, symbols, layers, API params, seed)

**Mobile derivation:** The script automatically takes the desktop image, scales it proportionally to occupy 30% of a 9:16 canvas, centers it horizontally at the top, and fills the remaining 70% with a smooth gradient sampled from the desktop's dark edges. This guarantees visual consistency.

If fidelity is poor, try: more detailed `subject_description`, higher-quality reference photo, or add `--seed` with a different value.

## Input Reference

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `product` | string | *required* | Product/offer being sold |
| `subject_photo` | string | *required* | Path to subject reference photo |
| `pedro_photo` | string | — | Alias for `subject_photo` (backward compat) |
| `offer` | string | "" | Offer details (pricing, discount) |
| `tone` | string | "authority, trust, transformation" | Comma-separated tone keywords |
| `context` | string | "course" | Scene context preset key or full description |
| `palette` | string | "premium" | Color palette preset key |
| `subject_description` | string | auto | Detailed enumeration of physical features |
| `pedro_description` | string | — | Alias for `subject_description` (backward compat) |
| `symbols` | array | auto from domain | Array of `{object, meaning, style}` objects |
| `layers` | object | auto | `{background, midground, foreground}` overrides |
| `seed` | integer | 42 | Seed for reproducible generation |
| `sizes` | array | ["desktop","tablet","mobile"] | Target sizes to generate |
| `output_dir` | string | "./hero-output" | Output directory path |

## Layout Rules

### Desktop/Tablet (Landscape)
```
+---------------------------+-------------------+
|                           |                   |
|   TEXT OVERLAY AREA       |   SUBJECT PHOTO   |
|   (clean, gradient bg)    |   (in context)    |
|   55% width               |   45% width       |
|                           |                   |
+---------------------------+-------------------+
```

### Mobile (Portrait) — DERIVED FROM DESKTOP

**RULE: Mobile is NEVER generated independently via Gemini.** Mobile is always derived from the desktop image using PIL post-processing. This ensures perfect visual consistency.

**Process:**
1. Generate ONLY the desktop image via Gemini API
2. Scale the desktop image proportionally to fit 30% of the mobile frame height
3. Center it horizontally at the top of a 9:16 canvas
4. Fill the canvas background with a smooth gradient sampled from the desktop image's dark edges
5. Apply a smooth fade transition (80px) at the bottom edge of the desktop crop into the gradient
6. Apply lateral edge feathering (30px) if the scaled image is narrower than the mobile canvas

```
+---------------------------+
|                           |
|   DESKTOP IMAGE SCALED    |
|   (centered, 30% height)  |
|   smooth fade at bottom   |
|                           |
+---------------------------+
|                           |
|                           |
|    TEXT OVERLAY AREA       |
|    (smooth dark gradient)  |
|    70% height              |
|                           |
|                           |
+---------------------------+
```

**Why not generate mobile separately:** Gemini cannot reliably control subject scale in portrait frames. Generating separately produces inconsistent compositions, different facial features, and unpredictable sizing. The desktop-derived approach guarantees identical visual identity across both formats.

## Context Presets

| Key | Scene |
|-----|-------|
| `course` | Modern teaching studio, data screens, bookshelves |
| `consulting` | Executive corner office, city skyline at dusk |
| `event` | Stage with spotlights, LED screens, audience silhouettes |
| `saas` | Futuristic tech workspace, holographic dashboards |
| `wellness` | Serene outdoor morning, lush greenery, golden sunlight |
| `finance` | Trading floor, multiple monitors with charts |
| `legal` | Elegant law library, leather-bound volumes |
| `marketing` | Command center with campaign metrics screens |

Custom contexts: pass a full scene description string instead of a preset key.

## Color Palettes

| Key | Primary | Secondary | Accent | Best For |
|-----|---------|-----------|--------|----------|
| `premium` | #1a1a2e | #16213e | #e94560 | Luxury, high-ticket |
| `trust` | #0a1628 | #1b3a5c | #4fc3f7 | Corporate, B2B |
| `energy` | #0d0d0d | #1a0a2e | #ff6b35 | Launches, events |
| `growth` | #0a2e1a | #1b4332 | #52b788 | Success, results |
| `creative` | #2d1b69 | #11001c | #ff00ff | Bold, disruptive |
| `warm` | #2c1810 | #4a2c17 | #f4a261 | Personal, coaching |

## API Model

Uses **Nano Banana 2** (`gemini-3.1-flash-image-preview`) — Google's actively supported image generation model.

Key API parameters:
- `media_resolution="media_resolution_high"` — highest fidelity for reference photo
- `image_size="2K"` — 2K output resolution
- `person_generation="ALLOW_ALL"` — required for person compositing
- `seed` — integer for reproducible results

**Note:** `gemini-3-pro-image-preview` (the prior model) shuts down March 9, 2026. Nano Banana 2 is the actively maintained successor.

## Prompt Engineering Reference

For detailed prompt templates, symbol banks, fidelity anchors, and anti-patterns, consult:
`references/prompt-templates.md`

Key sections:
- `Symbol Bank` — domain + transformation symbols with combining rules
- `Fidelity Anchor Templates` — standard and enhanced identity lock
- `Layered Composition Examples` — 3 worked examples (Legal, Marketing, Wellness)
- `Anti-Patterns` — organized by: prompt, fidelity, composition
- `Camera & Lighting Reference` — technique-to-prompt-language tables

## Troubleshooting

| Issue | Solution |
|-------|---------|
| Safety filter blocks generation | Ensure `person_generation="ALLOW_ALL"` is set (it's automatic); remove "person" from negative prompt |
| Subject's face doesn't match | Add more detail to `subject_description` using enumeration technique (5+ features); use higher-quality reference photo (front-facing, well-lit, 1024px+) |
| Symbols too prominent / distracting | Use "very faint, far background" or "barely visible" in symbol style; reduce to 1-2 symbols |
| Left side too cluttered | Switch to pure black background; reduce symbols; add "MINIMAL, CLEAN" to tone |
| Image looks like stock photo | Increase tone specificity; add "cinematic, editorial" to tone; use dramatic lighting |
| Prompt too long / truncated | Remove secondary symbols; simplify layer descriptions |
| Different results on re-run | Set `seed` to a fixed integer (default: 42) for reproducibility |
| Old config doesn't work | `pedro_photo`/`pedro_description` are still supported as aliases — check for typos |
| API key error | Verify `.env` has `GEMINI_API_KEY=your_key` and `python-dotenv` is installed |
