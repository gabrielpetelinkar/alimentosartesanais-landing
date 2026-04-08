# Slide Layout Grid — Style DNA Compliant Layouts

## Template ID: slide-layout-grid
## Version: 1.0.0
## Used by: *design command, @garr-reynolds

---

## Grid System

All layouts use a **12-column grid** with:
- Margins: 5% on all sides
- Gutter: 2% between columns
- Safe area: Content within 90% of slide area
- Whitespace target: minimum 30% of slide area empty

**Slide dimensions:** 16:9 (1920×1080px standard)

---

## Layout 1: Title Slide

```
┌─────────────────────────────────────────────┐
│                                             │
│                                             │
│         [TITLE — Bold, 48-60pt]             │
│         centered, upper-third               │
│                                             │
│         [Subtitle — Regular, 24pt]          │
│         centered, below title               │
│                                             │
│                                             │
│                    [accent line]             │
│                                             │
└─────────────────────────────────────────────┘
```
- Background: Solid dark (#0D0D0D) or full-bleed image with dark overlay
- Title: White, Inter Black / Montserrat Bold, 48-60pt
- Subtitle: White at 70% opacity, Regular weight, 24pt
- Accent: Thin horizontal line in accent color below title

---

## Layout 2: Statement Slide (One Idea)

```
┌─────────────────────────────────────────────┐
│                                             │
│                                             │
│                                             │
│     [SINGLE STATEMENT — Bold, 36-48pt]      │
│     centered vertically and horizontally     │
│                                             │
│                                             │
│                                             │
│                                             │
└─────────────────────────────────────────────┘
```
- Background: Solid dark
- Text: White, centered, one sentence maximum
- Whitespace: 60%+ empty space
- Use for: Key messages, transitions, emotional beats

---

## Layout 3: Image + Text (Split)

```
┌──────────────────────┬──────────────────────┐
│                      │                      │
│                      │   [HEADLINE]         │
│   [FULL-BLEED        │   Bold, 28-36pt      │
│    IMAGE]            │                      │
│                      │   [Supporting text]   │
│   Columns 1-6       │   Regular, 20pt       │
│                      │                      │
│                      │   Columns 7-12       │
│                      │                      │
└──────────────────────┴──────────────────────┘
```
- Image: Full-bleed left half, high-resolution
- Text: Right half on dark background
- Can be mirrored (text left, image right)
- Headline in white, accent color for emphasis words

---

## Layout 4: Hero Number (Data)

```
┌─────────────────────────────────────────────┐
│                                             │
│              [HERO NUMBER]                  │
│              Bold, 96-120pt                 │
│              accent color                   │
│                                             │
│         [Context line — what it means]      │
│         Regular, 24pt, white                │
│                                             │
│   [Action title — top left, 20pt, white]    │
└─────────────────────────────────────────────┘
```
- Background: Solid dark
- Hero number: Accent color, oversized, centered
- Context: One line explaining the number
- Use for: S.T.A.R. moments, key statistics, proof points

---

## Layout 5: Chart Slide

```
┌─────────────────────────────────────────────┐
│  [Action Title — Bold, 24pt, white]         │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │                                     │    │
│  │         [CHART]                     │    │
│  │         Dark background             │    │
│  │         Accent on key data          │    │
│  │         No gridlines                │    │
│  │                                     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  [Annotation — 16pt, accent color]          │
└─────────────────────────────────────────────┘
```
- Action title: Tells the insight, not the topic
- Chart: Occupies 60-70% of slide area
- Labels: Directly on data (no separate legend)
- Key data point: Bold accent color

---

## Layout 6: Quote Slide

```
┌─────────────────────────────────────────────┐
│                                             │
│       [accent color oversized " ]           │
│                                             │
│       [Quote text — Italic, 28-36pt]        │
│       white, centered                       │
│                                             │
│       — [Attribution, 18pt, grey]           │
│                                             │
│                                             │
└─────────────────────────────────────────────┘
```
- Large quotation mark in accent color (decorative)
- Quote: White, italic or light weight
- Attribution: Grey (#999), smaller, right-aligned

---

## Layout 7: Section Divider

```
┌─────────────────────────────────────────────┐
│                                             │
│                                             │
│                                             │
│     [SECTION TITLE — Bold, 48pt]            │
│     accent color background                 │
│     or accent text on dark                  │
│                                             │
│     [Section number — 120pt, 10% opacity]   │
│                                             │
└─────────────────────────────────────────────┘
```
- Option A: Full accent color background with dark text
- Option B: Dark background with accent color text
- Large section number as watermark element

---

## Layout 8: Comparison (Split Screen)

```
┌──────────────────────┬──────────────────────┐
│                      │                      │
│   [BEFORE / LEFT]    │   [AFTER / RIGHT]    │
│                      │                      │
│   Muted colors       │   Accent colors      │
│   (#666 grey)        │   (vibrant accent)   │
│                      │                      │
│   Columns 1-6       │   Columns 7-12       │
│                      │                      │
└──────────────────────┴──────────────────────┘
```
- Left: Muted/desaturated (the "before" or "problem")
- Right: Vibrant accent (the "after" or "solution")
- Clear visual contrast between the two halves
- Thin divider line or gap between halves

---

## Color Quick Reference

| Element | Hex | Usage |
|---------|-----|-------|
| Background (primary) | #0D0D0D | Default slide background |
| Background (variant) | #1A1A1A | Subtle distinction |
| Text (primary) | #FFFFFF | Headlines, key text |
| Text (secondary) | #CCCCCC | Supporting text |
| Text (muted) | #999999 | Captions, attributions |
| Accent (select one) | #FFD700 | Gold — energy, premium |
| | #00D4FF | Electric blue — tech, clarity |
| | #39FF14 | Neon green — growth, innovation |
| | #FF6B35 | Warm orange — urgency, warmth |
| Supporting data | #666666 | Non-key data points |
| Alert/problem | #FF4444 | Villain slides, warnings |

---

## Typography Quick Reference

| Role | Font | Weight | Size |
|------|------|--------|------|
| Title | Inter / Montserrat | Black (900) | 48-60pt |
| Section header | Same family | Bold (700) | 36-48pt |
| Headline | Same family | Bold (700) | 28-36pt |
| Body | Same family | Regular (400) | 20-24pt |
| Caption | Same family | Light (300) | 16-18pt |
| Hero number | Same family | Black (900) | 96-120pt |

---

_Template Version: 1.0.0_
_Squad: slide-master_
_Style DNA: Escola Conquer + Perestroika + Pinho Fornari_
