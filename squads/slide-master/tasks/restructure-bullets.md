# Task: Restructure Bullet Points

**Task ID:** restructure-bullets
**Version:** 1.0.0
**Status:** Active
**Responsible Executor:** @slide-master:cliff-atkinson
**Execution Type:** Agent
**Squad:** slide-master

---

## Purpose

Transform bullet-point-heavy slides into narrative-driven presentations using Cliff Atkinson's Beyond Bullet Points methodology. Replaces lazy information dumps with structured 3-act storytelling where each slide is a scene with purpose, not a container for text.

---

## Input

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| slides | text/file | Yes | Existing bullet-heavy slides or content |
| audience | string | Yes | Target audience for the presentation |
| duration | string | No | Available presentation time |
| key_message | string | No | Core message (if already identified) |

---

## Output

A **Restructured Presentation** with:
- 3-Act structure (Setting, Conflict, Resolution)
- Complete sentence headlines replacing bullet topics
- One idea per slide (bullet points eliminated)
- Cognitive scaffolding for audience comprehension
- Style DNA-compliant slide specifications

---

## Action Items

### Step 1: Audit Current State
- Count total bullet points across all slides
- Identify the actual narrative hidden in the bullets
- Categorize content: essential (keep), supporting (reduce), redundant (cut)
- Calculate: total bullets × average words = cognitive load metric

### Step 2: Extract the Hidden Story
Every bullet-heavy deck contains a story — it's just buried. Find it:
- What is the SETTING (context the audience needs)?
- What is the CONFLICT (problem, challenge, gap)?
- What is the RESOLUTION (solution, recommendation, action)?

### Step 3: Apply Beyond Bullet Points 3-Act Structure

**Act I — Setting (Hook + Key Point)**
- Opening hook that captures attention (90 seconds)
- Key point that frames the entire presentation
- Slide count: ~15% of total

**Act II — Conflict (3 Key Explanations)**
- 3 major themes, ordered by importance
- Each theme has supporting evidence (NOT bullet points)
- Each supporting point becomes its OWN slide
- Slide count: ~70% of total

**Act III — Resolution (Call to Action)**
- Summary of transformation (before → after)
- Clear call to action
- Closing statement
- Slide count: ~15% of total

### Step 4: Transform Headlines
Every slide gets a **complete sentence headline** that tells the point:

| BEFORE (Topic Label) | AFTER (Complete Sentence) |
|-----------------------|--------------------------|
| "Q3 Revenue" | "Q3 revenue exceeded target by 12%" |
| "Market Trends" | "Three trends are reshaping our market" |
| "Next Steps" | "We need to act on these 3 priorities by March" |

### Step 5: One Idea Per Slide
Each former bullet point becomes its own slide:
- The bullet text becomes the complete sentence headline
- Supporting evidence becomes the visual (image, chart, example)
- Slide count WILL increase — that is correct and expected
- 40 bullet-heavy slides may become 60-80 image-driven slides

### Step 6: Style DNA Compliance
- [ ] All bullet points eliminated
- [ ] Complete sentence headlines on every slide
- [ ] One idea per slide
- [ ] Dark mode backgrounds
- [ ] Bold typography for headlines
- [ ] Visual support instead of text blocks

---

## Acceptance Criteria

- [ ] Zero bullet points remain in the final version
- [ ] 3-Act structure clearly defined
- [ ] Every slide has a complete sentence headline
- [ ] One idea per slide throughout
- [ ] Cognitive scaffolding helps audience follow the logic
- [ ] Story structure is clear (Setting → Conflict → Resolution)
- [ ] Style DNA compliance verified

---

## Veto Conditions

- DO NOT preserve any bullet point lists — transform ALL of them
- DO NOT use topic labels as headlines — complete sentences only
- DO NOT compress multiple ideas into one slide to reduce count
- DO NOT accept "the audience expects bullet points" — they expect clarity
- DO NOT start restructuring without identifying the 3-Act structure first

---

## Output Example

```
## RESTRUCTURED: Q3 Business Review

### BEFORE
- 40 slides, 280 bullet points
- Topic labels as titles ("Revenue", "Costs", "Next Steps")
- 6-8 bullets per slide
- Audience falls asleep by slide 5

### AFTER — 3-Act Structure

**ACT I: Setting (Slides 1-8)**
1. "This quarter tested everything we built" [full-bleed image: team at work]
2. "We set three ambitious goals in January" [3 goals as 3 separate statement slides]
3-5. One slide per goal with visual context

**ACT II: Conflict (Slides 9-42)**
Theme 1 — Revenue Performance (Slides 9-18)
9. "Revenue exceeded target by 12%" [hero number: 112%, electric blue]
10. "Enterprise deals drove the growth" [bar chart, enterprise bar highlighted]
11. "But SMB revenue declined for the second quarter" [line chart, red accent]
...

Theme 2 — Operational Efficiency (Slides 19-30)
Theme 3 — Market Position (Slides 31-42)

**ACT III: Resolution (Slides 43-50)**
43. "Three priorities will define Q4" [section divider]
44-46. One priority per slide with owner and deadline
47. "The bottom line: we're stronger than Q2, but Q4 needs focus" [closing statement]
48. "Here's what I need from each of you" [call to action]

### Metrics
- Bullets eliminated: 280 → 0
- Slides: 40 → 50 (but each one has PURPOSE)
- Estimated audience engagement: +300%
```

---

## Handoff

| Condition | Route To |
|-----------|----------|
| Structure complete, needs visual design | @garr-reynolds |
| Narrative arc needs refinement | @nancy-duarte |
| Data slides need SWD treatment | @cole-nussbaumer-knaflic |
| Cognitive load needs verification | @richard-mayer |
| Ready for quality review | @slide-master-chief (*review) |

---

_Task Version: 1.0.0_
_Squad: slide-master_
