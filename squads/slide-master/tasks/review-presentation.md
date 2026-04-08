# Task: Review Presentation

**Task ID:** review-presentation
**Version:** 1.0.0
**Status:** Active
**Responsible Executor:** @slide-master:slide-master-chief
**Execution Type:** Agent
**Squad:** slide-master

---

## Purpose

Conduct a comprehensive quality review of a presentation against all 7 expert frameworks and the Style DNA. Produces a multi-dimension scorecard with PASS / CONCERNS / FAIL verdict and specific improvement recommendations.

---

## Input

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| presentation | text/file | Yes | The presentation to review (deck or description) |
| narrative_doc | text | No | Narrative architecture document if available |
| focus_areas | string | No | Specific areas to prioritize in review |

---

## Output

A **Quality Review Scorecard** with:
- Per-dimension scores (6 dimensions)
- Weighted final score
- Verdict (MAGNIFICENT / STRONG / NEEDS WORK / REBUILD)
- Per-slide issues with severity
- Specific improvement recommendations
- Specialist routing for fixes

---

## Action Items

### Step 1: Narrative Structure Review (Nancy Duarte + Conquer + Pinho) — 25%

| Check | Pass Criteria |
|-------|---------------|
| Story arc exists | Clear beginning, middle, end |
| Audience as hero | Presentation serves audience, not presenter |
| Sparkline tension | "What Is" vs "What Could Be" alternations |
| S.T.A.R. Moment | One memorable moment identified |
| Hook in 90 seconds | Opening captures attention (Conexao) |
| Villain before solution | Problem established before answer |
| Call to action | Clear next step at end |
| Story before slides | Evidence of narrative planning |

### Step 2: Visual Design Review (Garr Reynolds + Style DNA) — 25%

| Check | Pass Criteria |
|-------|---------------|
| Dark mode / high contrast | Dark backgrounds throughout |
| One idea per slide | No multi-idea slides |
| Bold typography | Modern sans-serif with hierarchy |
| Intentional whitespace | 30%+ empty space per slide |
| Full-bleed images | High-res, purposeful images |
| Signal-to-noise ratio | Every element conveys meaning |
| Design consistency | Same visual language throughout |
| Strategic color use | Accent for emphasis, not decoration |
| No clip art / generic stock | Original or curated images |

### Step 3: Data Visualization Review (Edward Tufte + Cole Knaflic) — 15%

| Check | Pass Criteria |
|-------|---------------|
| Data-ink ratio | Maximum data, minimum decoration |
| No chartjunk | No 3D, moiré, unnecessary gridlines |
| Graphical integrity | Lie factor ≈ 1.0 |
| Correct chart type | Chart matches data relationship |
| Clutter eliminated | Only essential elements remain |
| Preattentive attributes | Color/size focus attention on key insight |
| Action titles | Titles tell the insight, not the topic |
| Context provided | Numbers have comparison baseline |

### Step 4: Cognitive Load Review (Richard Mayer + Cliff Atkinson) — 15%

| Check | Pass Criteria |
|-------|---------------|
| Extraneous load minimized | No unnecessary content |
| Coherence principle | No extraneous material |
| Spatial contiguity | Labels near their elements |
| No redundancy | No duplicate text + narration |
| Segmenting applied | Complex info chunked |
| Complete sentence headlines | Not topic labels |
| Max 3 key points per section | Cognitive limit respected |
| No bullet points | Each point is its own slide |

### Step 5: Visual Thinking Review (Dan Roam) — 10%

| Check | Pass Criteria |
|-------|---------------|
| Concepts visualized | Abstract ideas have visual form |
| Correct visual type | Matches the question type (6x6) |
| Simplest visual | Minimum complexity that works |
| 5-second comprehension | Audience gets it quickly |

### Step 6: Emotional Impact Review (Style DNA) — 10%

| Check | Pass Criteria |
|-------|---------------|
| Audience feels something | Emotional response designed |
| Empathy in design | Choices serve the audience |
| Bold aesthetic | Non-corporate, editorial quality |
| Typography carries emotion | Font choices reinforce tone |
| Images create resonance | Selected for emotion, not decoration |
| Purposeful animation | Guides attention, creates rhythm |

### Step 7: Compile Scorecard
Apply the scoring from `checklists/slide-quality-checklist.md`:

| Section | Weight | Score (0-10) |
|---------|--------|:------------:|
| 1. Narrative Structure | 25% | __ |
| 2. Visual Design | 25% | __ |
| 3. Data Visualization | 15% | __ |
| 4. Cognitive Load | 15% | __ |
| 5. Visual Thinking | 10% | __ |
| 6. Emotional Impact | 10% | __ |
| **TOTAL** | 100% | **__/10** |

### Verdicts

| Score | Verdict | Action |
|-------|---------|--------|
| 9-10 | MAGNIFICENT | Ready to present |
| 7-8.9 | STRONG | Minor refinements recommended |
| 5-6.9 | NEEDS WORK | Specific sections need redesign |
| <5 | REBUILD | Fundamental structural issues |

---

## Acceptance Criteria

- [ ] All 6 dimensions scored
- [ ] Per-slide issues documented with severity
- [ ] Specific fix recommendations for every issue
- [ ] Specialist routing for each fix area
- [ ] Final weighted score calculated
- [ ] Verdict issued with clear rationale

---

## Veto Conditions

- DO NOT give a PASS to presentations with bullet point lists
- DO NOT give a PASS to presentations with white/light backgrounds (unless brand override)
- DO NOT skip any of the 6 review dimensions
- DO NOT provide vague feedback — every issue must have a specific fix path

---

## Output Example

```
## QUALITY REVIEW: FoodTech Investor Pitch

### Scorecard

| Dimension | Score | Key Finding |
|-----------|-------|-------------|
| Narrative Structure | 9/10 | Strong Sparkline arc, clear Villain, S.T.A.R. moment |
| Visual Design | 8/10 | Dark mode, bold typography — Slide 7 has too much text |
| Data Visualization | 7/10 | Good SWD on growth chart — Slide 12 pie chart needs replacement |
| Cognitive Load | 8/10 | Clean segmenting — Slide 4 violates Redundancy principle |
| Visual Thinking | 9/10 | Customer journey visual is excellent |
| Emotional Impact | 9/10 | Opening hook is powerful, Villain is visceral |

**FINAL SCORE: 8.4/10 — STRONG**

### Issues

| # | Slide | Severity | Issue | Fix | Specialist |
|---|-------|----------|-------|-----|------------|
| 1 | 7 | MEDIUM | Two ideas on one slide | Split into Slide 7a and 7b | @garr-reynolds |
| 2 | 12 | HIGH | Pie chart — use horizontal bars instead | Redesign with SWD | @cole-nussbaumer-knaflic |
| 3 | 4 | MEDIUM | Text duplicates what speaker will say | Remove on-screen text, use image | @garr-reynolds |

### Verdict
STRONG — Ready to present with 3 minor refinements.
Estimated fix time: 30 minutes.
```

---

## Handoff

| Condition | Route To |
|-----------|----------|
| Narrative issues found | @nancy-duarte |
| Visual design issues | @garr-reynolds |
| Data visualization issues | @cole-nussbaumer-knaflic or @edward-tufte |
| Cognitive load issues | @richard-mayer or @cliff-atkinson |
| Visual thinking issues | @dan-roam |
| All clear — MAGNIFICENT | User (ready to present) |

---

_Task Version: 1.0.0_
_Squad: slide-master_
