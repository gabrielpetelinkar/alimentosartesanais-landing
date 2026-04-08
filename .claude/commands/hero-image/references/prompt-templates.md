# Hero Image Prompt Templates

## Prompt Architecture

Every hero image prompt follows a strict 4-section order. The model weights earlier tokens more heavily, so **identity lock MUST come first**.

```
[1. IDENTITY LOCK] → [2. LAYERS] → [3. LAYOUT] → [4. STYLE]
```

## 1. Symbol Bank

### Domain Symbols

Use 2-4 symbols max per image. Hierarchy: **primary** (large, semi-transparent) > **secondary** (smaller, supporting) > **subtle** (faint, far background).

| Domain | Primary Symbols | Secondary Symbols |
|--------|----------------|-------------------|
| Legal | Scales of justice, gavel | Leather-bound law volumes, classical columns, blind Justice statue |
| Finance | Ascending candlestick chart, golden coins | Stock ticker, vault door, calculator |
| Education | Open book (glowing pages), graduation cap | Lightbulb, chalkboard equations, telescope |
| Marketing | Data dashboard, growth arrows | Target bullseye, funnel diagram, megaphone |
| Technology | Circuit board pattern, holographic UI | Floating code, server racks, binary streams |
| Wellness | Lotus flower, gentle water ripples | Mountain peak, sunrise rays, tree of life |
| Event | Stage spotlights, microphone | LED screen glow, audience silhouettes |
| Consulting | City skyline silhouette, glass desk | Handshake gesture, presentation chart |

### Transformation Symbols (Universal — combine with any domain)

| Symbol | Meaning | Best Used As |
|--------|---------|-------------|
| Analog clock face (roman numerals) | Time mastery, urgency | Primary midground |
| Hourglass | Limited time, transformation window | Secondary |
| Ascending path / staircase | Growth, progress | Background element |
| Emerging from shadow into light | Transformation, breakthrough | Lighting effect |
| Curved arrows arc | Change cycle, evolution | Subtle background |
| Phoenix silhouette | Rebirth, comeback | Very subtle, far background |
| Compass | Direction, guidance | Secondary |

### Combining Rules

1. **Max 4 symbols** — more creates visual noise
2. **1 primary + 1-2 secondary + 0-1 subtle** is the ideal ratio
3. Primary symbol should relate to the **product domain**
4. Secondary symbols should reinforce **the transformation promise**
5. Subtle symbols add depth but should be nearly invisible
6. **Never combine competing focal points** (e.g., two large primary symbols)

### Symbol Style Descriptors

| Style | Prompt Language | When to Use |
|-------|----------------|-------------|
| Ethereal | "semi-transparent, glowing softly, ethereal" | Default for most symbols |
| Monumental | "large, golden, imposing" | Primary symbol, high-ticket |
| Ghostly | "very faint, barely visible, far background" | Subtle layer only |
| Metallic | "brushed gold/silver, reflective surface" | Premium, luxury contexts |
| Luminous | "emitting soft light, luminescent edges" | Energy, transformation |

## 2. Fidelity Anchor Templates

### Standard (1 Reference Photo)

```
IDENTITY LOCK — CRITICAL, HIGHEST PRIORITY:
The subject is [FULL_ENUMERATION]. You MUST preserve the subject's EXACT
facial features, bone structure, beard pattern, hair texture, skin tone,
body proportions, and clothing from the reference photo. DO NOT alter,
improve, idealize, or stylize any facial feature.
Camera: medium shot (waist-up), 85mm f/1.8 equivalent, subject looking
directly at camera with a confident, approachable expression. Sharp focus
on face and eyes.
```

### Enhanced (3+ Reference Photos)

```
IDENTITY LOCK — CRITICAL, HIGHEST PRIORITY:
The subject is [FULL_ENUMERATION]. Multiple reference photos are provided
showing different angles. You MUST preserve the subject's EXACT facial
features from ALL angles: bone structure, jawline shape, nose bridge width,
eye spacing, beard density and pattern, hair texture and cut, ear shape,
skin tone and texture, body proportions, and clothing details.
DO NOT average features across photos — match the FRONT-FACING reference
for the final composition. Side/angle photos are for feature confirmation
only.
Camera: medium shot (waist-up), 85mm f/1.8 equivalent, subject looking
directly at camera. Sharp focus on face and eyes, shallow DOF on background.
```

### Enumeration Technique

When describing the subject, enumerate features explicitly rather than using vague terms:

**Bad:** "a man with dark hair and a beard"
**Good:** "a Brazilian man in his early 30s with: (1) short dark brown hair, slightly wavy, parted to the right, (2) a full, well-groomed beard approximately 1cm length with defined cheekline, (3) warm olive skin tone, (4) brown eyes, (5) medium build, (6) wearing a fitted charcoal blazer over a black crew-neck t-shirt"

## 3. Layered Composition Examples

### Example A: Legal (v4 Virada Estrategica Pattern)

```
COMPOSITION LAYERS:
BACKGROUND — pure black (#000000) with very subtle smoke wisps.
MIDGROUND — a large analog clock face with roman numerals (golden,
semi-transparent, ethereal) as the dominant midground element, with
faint scales of justice (very subtle, barely visible) in the far
background behind the clock.
FOREGROUND — warm golden rim light on right edge of subject, separating
from background. Subtle dust particles catching the light.
```

**Why it works:** Black background eliminates distractions. Clock = time mastery (the core promise). Scales = legal career (the context). Golden rim light = premium feel.

### Example B: Marketing / Performance

```
COMPOSITION LAYERS:
BACKGROUND — deep navy gradient (#0a1628 to #1b3a5c) with subtle
data grid pattern fading into darkness.
MIDGROUND — a floating holographic dashboard (semi-transparent, blue-
tinted, showing abstract growth curves) as dominant element, with a
smaller target bullseye (luminous edges, secondary) below it.
FOREGROUND — cool blue ambient light with warm accent (#ff6b35) rim
light on subject. Thin floating data lines connecting dashboard to
subject.
```

### Example C: Wellness / Transformation

```
COMPOSITION LAYERS:
BACKGROUND — soft dawn gradient (warm amber to soft blue) with mountain
silhouette on horizon line.
MIDGROUND — gentle water ripples (semi-transparent, catching golden
light) as primary element, with a faint ascending path (ghostly, far
background) suggesting the journey.
FOREGROUND — warm golden sunlight from upper-left creating Rembrandt
triangle on subject's face. Soft lens flare. Subtle mist at lower edge.
```

## 4. Anti-Patterns

### Prompt Anti-Patterns

| Anti-Pattern | Why It Fails | Fix |
|-------------|-------------|-----|
| Subject description buried in middle of prompt | Model weights early tokens more; late identity = low fidelity | Move IDENTITY LOCK to position 1 |
| "a man" or "a person" without enumeration | Too vague, model invents features | Enumerate 5+ specific physical features |
| "make him look professional/handsome" | Invites the model to alter features | Describe EXISTING features; never ask to improve |
| Mixing symbols with scene props | Creates visual confusion | Symbols in MIDGROUND layer only; props in BACKGROUND |
| More than 4 symbols | Visual noise, nothing reads clearly | Pick 1 primary + 1-2 secondary max |
| Requesting specific text in the image | Gemini generates garbled text | Always include "ABSOLUTELY NO text" |

### Fidelity Anti-Patterns

| Anti-Pattern | Why It Fails | Fix |
|-------------|-------------|-----|
| No explicit "preserve EXACT" instruction | Model defaults to "inspired by" | Use IDENTITY LOCK template with EXACT/MUST/DO NOT |
| Using adjectives like "handsome, attractive" | Model alters features to match adjective | Describe what IS, never what SHOULD BE |
| Low-res reference photo (<500px face) | Not enough detail for model to lock onto | Use 1024px+ reference, well-lit, front-facing |
| Reference photo with sunglasses/hat | Occluded features get invented | Use unobstructed reference |
| No camera language | Model picks random framing | Specify mm, aperture, shot type explicitly |

### Composition Anti-Patterns

| Anti-Pattern | Why It Fails | Fix |
|-------------|-------------|-----|
| Centered subject | Kills the text-overlay zone | Always RIGHT-weighted (desktop) or TOP-weighted (mobile) |
| Busy background with many colors | Competes with text overlay area | Use dark/moody backgrounds, max 2-3 colors |
| Background brighter than subject | Eye drawn away from person | Subject should have brightest lighting in frame |
| No rim light / edge separation | Subject merges into background | Always specify rim/edge light in FOREGROUND layer |
| Flat, even lighting | Stock photo look | Use dramatic lighting: Rembrandt, rim, or split |

## 5. Negative Prompt Bank

### Standard (Always Include)

```
blurry, low quality, distorted face, extra limbs, deformed hands, text,
watermark, logo, signature, overexposed, underexposed, flat lighting,
stock photo look, clipart, cartoon, illustration, painting,
centered composition, symmetrical layout
```

### Fidelity-Specific (Add When Using Reference Photos)

```
wrong facial features, altered beard, different clothing than described,
changed hair style, modified body proportions, added accessories not described,
idealized features, beautified face, smoothed skin texture, enlarged eyes,
slimmed nose, whitened teeth, different skin tone, wrong age appearance
```

### Composition-Specific (Add When Using Symbols)

```
text on symbols, branded logos on objects, realistic product placement,
photo-realistic props competing with subject, cluttered midground,
symbols overlapping subject's face, symbols with sharp edges cutting composition
```

## 6. Camera & Lighting Reference

### Camera Settings (Prompt Language)

| Technique | Prompt Phrase | Effect |
|-----------|-------------|--------|
| Portrait compression | "85mm f/1.8, medium shot" | Flattering perspective, blurred bg |
| Environmental portrait | "35mm f/2.8, wide-medium shot" | More context visible |
| Dramatic close-up | "105mm f/1.4, close-up bust shot" | Intense, personal |
| Full presence | "50mm f/2.0, three-quarter shot" | Balanced, full body language |

### Lighting Styles

| Style | Prompt Phrase | Best For | Tone |
|-------|-------------|----------|------|
| Rembrandt | "Rembrandt lighting with triangle highlight on cheek" | Authority, depth | Serious, premium |
| Rim/Edge | "dramatic rim light creating glowing edge outline" | Separation, drama | Bold, cinematic |
| Butterfly | "overhead butterfly lighting, shadow under nose" | Elegance | Beauty, wellness |
| Split | "split lighting, half face illuminated" | Mystery, boldness | Creative, edgy |
| Broad | "broad, even front lighting with soft fill" | Approachability | Trust, corporate |
| Cinematic | "mixed colored lights with volumetric rays" | Events, energy | Dynamic, exciting |
| Golden hour | "warm golden sunlight from 45-degree angle" | Warmth, transformation | Personal, coaching |

### Color Temperature

| Temperature | Prompt Phrase | Mood |
|-------------|-------------|------|
| Warm (3200K) | "warm tungsten color temperature" | Intimate, personal, coaching |
| Neutral (5000K) | "balanced daylight color temperature" | Professional, corporate |
| Cool (6500K) | "cool blue-toned color temperature" | Tech, innovation, clinical |
| Mixed | "warm key light with cool fill light" | Cinematic, dramatic |

## Scene Context Map

| Product Type | Scene Context | Conceptual Symbols | Mood |
|-------------|---------------|-------------------|------|
| Online course / mentorship | Modern studio, bookshelf, screen | Open book, lightbulb, data viz | Authority, trust |
| Consulting / services | Executive office, skyline view | City silhouette, glass desk, charts | Premium, success |
| Event / workshop | Stage with spotlights, audience | Microphone, LED screens, spotlight | Energy, leadership |
| Digital product / SaaS | Tech lab, holographic UI | Circuit board, floating screens | Innovation, future |
| Health / wellness | Nature, zen garden, outdoor morning | Lotus, water ripples, sunrise | Calm, transformation |
| Finance / investment | Trading floor, charts on screens | Candlestick chart, golden coins | Precision, wealth |
| Legal / concursos | Law library, courtroom ambiance | Scales, gavel, law volumes | Credibility, knowledge |
| Marketing / traffic | Command center with dashboards | Dashboard, growth arrows, target | Data-driven, results |

## Aspect Ratio Guide

| Target | Aspect Ratio | Person Position | Text Zone |
|--------|-------------|-----------------|-----------|
| Desktop hero | 16:9 | RIGHT 40-45% | LEFT 55-60% |
| Tablet hero | 4:3 | RIGHT 40-45% | LEFT 55-60% |
| Mobile hero | 9:16 | TOP 45% | BOTTOM 55% |
| Social share | 1:1 | RIGHT-center | LEFT half |
