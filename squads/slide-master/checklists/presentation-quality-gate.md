# Presentation Quality Gate — Slide Master Squad

## Purpose
Final quality gate before a presentation is approved as complete. Used by `*review` command and at the end of `*create-presentation` workflow (PHASE-4). Extends the slide-quality-checklist with go/no-go decision criteria.

---

## Pre-Gate Requirements

Before running this gate, verify:
- [ ] Narrative architecture document exists (from *narrative)
- [ ] Visual design spec exists (from *design)
- [ ] Style DNA was loaded and enforced throughout

---

## Gate Checks

### G1: Narrative Integrity (BLOCKING)

| # | Check | Pass Criteria | Severity |
|---|-------|---------------|----------|
| G1.1 | Big Idea exists | Single sentence, clear, memorable | CRITICAL |
| G1.2 | Sparkline arc | Minimum 4 What Is / What Could Be oscillations | CRITICAL |
| G1.3 | Villain opens | Problem/tension before any solution | HIGH |
| G1.4 | Hook in 90 seconds | First slide captures attention | HIGH |
| G1.5 | Call to action | Clear next step at the end | HIGH |
| G1.6 | S.T.A.R. Moment | One moment designed to be unforgettable | MEDIUM |

**G1 Verdict:** ALL CRITICAL must pass. 2+ HIGH failures = BLOCK.

### G2: Visual Compliance (BLOCKING)

| # | Check | Pass Criteria | Severity |
|---|-------|---------------|----------|
| G2.1 | Dark mode applied | All slides have dark backgrounds | CRITICAL |
| G2.2 | One idea per slide | Zero multi-idea slides | CRITICAL |
| G2.3 | No bullet points | Zero bullet point lists in any slide | CRITICAL |
| G2.4 | Typography hierarchy | Consistent font system with clear hierarchy | HIGH |
| G2.5 | Accent color strategy | One bold accent used consistently | HIGH |
| G2.6 | Image quality | High-res, purposeful images (no clip art, no generic stock) | HIGH |
| G2.7 | Whitespace | Minimum 30% empty space per slide | MEDIUM |
| G2.8 | Animation purpose | All animations guide attention (no decorative motion) | MEDIUM |

**G2 Verdict:** ALL CRITICAL must pass. 2+ HIGH failures = BLOCK.

### G3: Data Integrity (CONDITIONAL — only if data slides exist)

| # | Check | Pass Criteria | Severity |
|---|-------|---------------|----------|
| G3.1 | No pie charts | Horizontal bars used instead | HIGH |
| G3.2 | No 3D charts | All charts are flat/2D | HIGH |
| G3.3 | Action titles | Titles tell the insight, not the topic | HIGH |
| G3.4 | Data-ink ratio | Maximum data, minimum decoration | MEDIUM |
| G3.5 | Preattentive attributes | Key data point visually highlighted | MEDIUM |
| G3.6 | Context provided | Numbers have comparison/baseline | MEDIUM |

**G3 Verdict:** ALL HIGH must pass. 2+ MEDIUM failures = CONCERNS.

### G4: Cognitive Compliance

| # | Check | Pass Criteria | Severity |
|---|-------|---------------|----------|
| G4.1 | Complete sentence headlines | No topic labels as titles | HIGH |
| G4.2 | No redundancy | Slides don't duplicate what speaker says | MEDIUM |
| G4.3 | Segmenting applied | Complex info broken into chunks | MEDIUM |
| G4.4 | Labels near elements | Spatial contiguity respected | LOW |

**G4 Verdict:** HIGH must pass. MEDIUM are recommendations.

### G5: Emotional Impact

| # | Check | Pass Criteria | Severity |
|---|-------|---------------|----------|
| G5.1 | Audience feels something | Emotional design evident | HIGH |
| G5.2 | Non-corporate aesthetic | Editorial/magazine quality | MEDIUM |
| G5.3 | Empathy in design | Choices serve the audience | MEDIUM |

**G5 Verdict:** HIGH must pass. MEDIUM are recommendations.

---

## Scoring

Use the scoring table from `checklists/slide-quality-checklist.md`:

| Section | Weight | Score (0-10) | Weighted |
|---------|--------|:------------:|----------|
| Narrative Structure | 25% | __ | __ |
| Visual Design | 25% | __ | __ |
| Data Visualization | 15% | __ | __ |
| Cognitive Load | 15% | __ | __ |
| Visual Thinking | 10% | __ | __ |
| Emotional Impact | 10% | __ | __ |
| **TOTAL** | 100% | | **__/10** |

---

## Verdicts

| Score | Verdict | Action | Gate Status |
|-------|---------|--------|-------------|
| 9-10 | MAGNIFICENT | Ready to present | ✅ APPROVED |
| 7-8.9 | STRONG | Minor refinements recommended | ✅ APPROVED with notes |
| 5-6.9 | NEEDS WORK | Specific sections need redesign | ❌ BLOCKED — fix required |
| <5 | REBUILD | Fundamental structural issues | ❌ BLOCKED — return to narrative |

---

## Post-Gate Actions

### On APPROVED (MAGNIFICENT or STRONG):
- Document final score and verdict
- List any optional improvements
- Presentation is ready to deliver

### On BLOCKED (NEEDS WORK):
- List all failing checks with specific fix recommendations
- Route each fix to the appropriate specialist
- Re-run gate after fixes applied

### On BLOCKED (REBUILD):
- Return to *narrative (PHASE-2 of workflow)
- Fundamental story structure needs rework
- Do not attempt visual fixes on a broken narrative

---

_Checklist Version: 1.0.0_
_Squad: slide-master_
_Used by: *review command, wf-create-presentation PHASE-4_
