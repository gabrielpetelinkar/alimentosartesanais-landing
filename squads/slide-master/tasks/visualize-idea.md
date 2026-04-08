# Task: Visualize Idea

**Task ID:** visualize-idea
**Version:** 1.0.0
**Status:** Active
**Responsible Executor:** @slide-master:dan-roam
**Execution Type:** Agent
**Squad:** slide-master

---

## Purpose

Convert abstract ideas, concepts, and complex information into clear visual explanations using Dan Roam's visual thinking frameworks (Back of the Napkin, SQVID, 6x6 Framework). Takes raw ideas and produces visual concept specifications ready for slide design.

---

## Input

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| idea | text | Yes | The abstract idea or concept to visualize |
| complexity | string | No | Simple / Medium / Complex |
| audience | string | No | Who needs to understand this visual |
| slide_context | string | No | Where this visual sits in the presentation |

---

## Output

A **Visual Concept Specification** with:
- Problem type classification (6x6)
- Visual type recommendation
- SQVID analysis
- Napkin sketch description (text-based visual direction)
- Style DNA-compliant design notes

---

## Action Items

### Step 1: Classify the Problem (6x6 Framework)

| Question | Visual Type | Best For |
|----------|-------------|----------|
| **Who/What?** | Portrait (entity diagram) | People, objects, components |
| **How Much?** | Chart (bar, line, pie) | Quantities, metrics, comparisons |
| **Where?** | Map (spatial layout) | Locations, relationships, ecosystems |
| **When?** | Timeline | Sequences, schedules, evolution |
| **How?** | Flowchart | Processes, steps, decisions |
| **Why?** | Multi-variable plot | Cause-effect, correlations |

### Step 2: Apply SQVID Analysis

For the identified visual, determine:
- **S**imple vs Elaborate — How much detail does the audience need?
- **Q**uality vs Quantity — Focus on attributes or numbers?
- **V**ision vs Execution — Aspirational or practical?
- **I**ndividual vs Comparison — One thing or relative positioning?
- **D**elta (change) vs Status quo — Show transformation or current state?

### Step 3: Sketch the Visual Concept

Describe the visual in precise terms:
- Central element (what's the anchor?)
- Supporting elements (what surrounds it?)
- Relationships (how do elements connect?)
- Hierarchy (what's most important visually?)
- Labels (minimum text needed to understand)

### Step 4: Apply Style DNA

- Dark background for the visual
- Bold accent color for the key element
- Clean lines and shapes (no decorative complexity)
- Labels in modern sans-serif
- Maximum clarity in minimum elements
- The visual should be understood in < 5 seconds

---

## Acceptance Criteria

- [ ] Problem type classified using 6x6 Framework
- [ ] SQVID analysis completed
- [ ] Visual concept described with enough detail to design
- [ ] Simplest possible visual that communicates the idea
- [ ] Audience can understand the visual in < 5 seconds
- [ ] Style DNA compliance (dark mode, bold accent, clean)

---

## Veto Conditions

- DO NOT overcomplicate — the simplest visual that works is the right one
- DO NOT use text-heavy diagrams — if it needs a paragraph, it's not visual
- DO NOT skip the 6x6 classification — type of question determines type of visual
- DO NOT use decorative elements — every line and shape must convey meaning

---

## Output Example

```
## VISUAL CONCEPT: SaaS Customer Journey

### Classification
- Problem type: HOW (process) + WHEN (sequence)
- Visual type: Hybrid flowchart-timeline

### SQVID
- Simple (audience is non-technical executives)
- Quality (focus on experience attributes, not metrics)
- Vision (show the ideal journey, not current)
- Individual (one journey, not comparison)
- Delta (show transformation from prospect to advocate)

### Visual Concept
- Layout: Horizontal flow, left-to-right
- 5 stages as large circles on a timeline bar
  1. DISCOVER (magnifying glass icon)
  2. TRY (play button icon)
  3. BUY (handshake icon)
  4. USE (dashboard icon)
  5. ADVOCATE (megaphone icon)
- Connection: gradient line darkening from grey → electric blue
- Below each stage: single-word emotion (Curious → Excited → Confident → Engaged → Loyal)
- Hero element: Stage 5 circle is 1.5x larger with accent glow

### Style DNA
- Background: #0D0D0D
- Timeline bar: #333333
- Active stages: #00D4FF (electric blue)
- Future stages: #666666 (muted)
- Labels: Inter Regular, 18pt, white
- Stage titles: Inter Bold, 24pt, white
```

---

## Handoff

| Condition | Route To |
|-----------|----------|
| Visual concept ready for slide design | @garr-reynolds |
| Visual includes data that needs SWD treatment | @cole-nussbaumer-knaflic |
| Visual is part of a narrative arc | @nancy-duarte (integrate into story) |
| Ready for quality review | @slide-master-chief (*review) |

---

_Task Version: 1.0.0_
_Squad: slide-master_
