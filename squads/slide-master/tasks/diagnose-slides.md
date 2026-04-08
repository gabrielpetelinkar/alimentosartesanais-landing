# Task: Diagnose Slides

**Task ID:** diagnose-slides
**Version:** 1.0.0
**Status:** Active
**Responsible Executor:** @slide-master:slide-master-chief (routes to @edward-tufte + @richard-mayer)
**Execution Type:** Agent
**Squad:** slide-master

---

## Purpose

Analyze existing slides for problems across two diagnostic dimensions: data visualization integrity (Tufte) and cognitive load (Mayer). Produces a diagnostic report with specific issues, severity ratings, and specialist routing recommendations.

---

## Input

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| slides | file/text | Yes | Existing slide deck or description of slides |
| audience | string | No | Target audience description |
| context | string | No | Presentation purpose and constraints |

---

## Output

A **Diagnostic Report** with:
- Data visualization analysis (Tufte framework)
- Cognitive load assessment (Mayer 12 Principles)
- Issue severity ratings (CRITICAL / HIGH / MEDIUM / LOW)
- Specialist routing recommendations
- Style DNA compliance check

---

## Action Items

### Step 1: Gather Context
- Ask for the slide deck or detailed description
- Identify the presentation's purpose, audience, and duration
- Note any constraints (corporate template, brand guidelines)

### Step 2: Tufte Diagnostic (@edward-tufte)
Apply the following checks to any data visualizations:

| Check | Framework | What to Look For |
|-------|-----------|------------------|
| Data-Ink Ratio | Tufte | What % of ink conveys data vs decoration? |
| Chartjunk | Tufte | 3D effects, moiré patterns, unnecessary gridlines? |
| Lie Factor | Tufte | Does visual representation distort the data? |
| Small Multiples | Tufte | Could comparison be improved with small multiples? |

**Scoring per chart:**
- Data-Ink Ratio > 0.8 = PASS
- Chartjunk detected = flag as HIGH
- Lie Factor > 1.05 = flag as CRITICAL

### Step 3: Mayer Diagnostic (@richard-mayer)
Apply the 12 Principles of Multimedia Learning:

| Principle | Check | Severity if Violated |
|-----------|-------|----------------------|
| Coherence | Extraneous material present? | HIGH |
| Signaling | Key info highlighted? | MEDIUM |
| Redundancy | Same info in text AND narration? | HIGH |
| Spatial Contiguity | Labels far from elements? | MEDIUM |
| Temporal Contiguity | Narration matches visuals? | MEDIUM |
| Segmenting | Complex info broken into chunks? | HIGH |
| Modality | On-screen text where narration works better? | MEDIUM |
| Multimedia | Words AND pictures used together? | MEDIUM |

### Step 4: Style DNA Compliance
Check against unified Style DNA rules:
- [ ] Dark mode / high contrast?
- [ ] One idea per slide?
- [ ] Bold, modern typography?
- [ ] No bullet point lists?
- [ ] No clip art or generic stock?
- [ ] No corporate template aesthetic?

### Step 5: Compile Report
Generate diagnostic report with:
1. Executive summary (1-2 sentences)
2. Issue list by severity (CRITICAL → LOW)
3. Per-slide or per-section analysis
4. Specialist routing recommendations
5. Estimated effort to fix

---

## Acceptance Criteria

- [ ] All data visualizations analyzed with Tufte framework
- [ ] Cognitive load assessed with Mayer principles
- [ ] Style DNA compliance checked
- [ ] Issues categorized by severity
- [ ] Specialist routing recommendations included
- [ ] Report is actionable (each issue has a clear fix path)

---

## Veto Conditions

- DO NOT prescribe visual design solutions (route to @garr-reynolds)
- DO NOT restructure narrative (route to @nancy-duarte)
- DO NOT redesign data charts (route to @cole-nussbaumer-knaflic)
- Diagnosis ONLY — prescriptions come from specialists

---

## Output Example

```
## DIAGNOSTIC REPORT: Q3 Sales Deck

**Summary:** 35-slide deck with 12 data charts and heavy text. Primary issues:
cognitive overload (Mayer Coherence violated on 28/35 slides) and low data-ink
ratio on 9/12 charts.

### CRITICAL (2)
1. **Slide 8:** Lie Factor 1.4 — 3D bar chart visually exaggerates Q3 growth by 40%
   → Route to @edward-tufte for correction
2. **Slides 1-28:** Average 7 bullet points per slide — extreme cognitive overload
   → Route to @cliff-atkinson for Beyond Bullet Points restructuring

### HIGH (5)
3. **Slides 3, 7, 15:** Redundancy — presenter reads exact slide text aloud
   → Route to @garr-reynolds for visual simplification
...

### Style DNA Violations: 31/35 slides
- White backgrounds (should be dark mode)
- Corporate template (blue headers, logo on every slide)
- Multiple ideas per slide throughout

### Routing Recommendations:
1. @cliff-atkinson — restructure 280 bullet points into narrative
2. @edward-tufte — fix 9 charts with low data-ink ratio
3. @garr-reynolds — apply Style DNA visual standards
4. @nancy-duarte — rebuild narrative arc
```

---

## Handoff

| Condition | Route To |
|-----------|----------|
| Data visualization issues found | @edward-tufte (deep analysis) or @cole-nussbaumer-knaflic (redesign) |
| Cognitive load issues found | @richard-mayer (detailed assessment) or @cliff-atkinson (restructure) |
| Narrative structure weak | @nancy-duarte |
| Visual design needs overhaul | @garr-reynolds |
| Ready for full redesign | @slide-master-chief (*create-presentation) |

---

_Task Version: 1.0.0_
_Squad: slide-master_
