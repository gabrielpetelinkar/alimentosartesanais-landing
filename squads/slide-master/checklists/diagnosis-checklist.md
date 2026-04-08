# Diagnosis Checklist — Slide Master Squad

## Purpose
Structured checklist for the `*diagnose` command. Guides @edward-tufte and @richard-mayer through a systematic diagnostic of existing slides.

---

## 1. Data Visualization Diagnosis (Edward Tufte)

### Data-Ink Ratio
- [ ] Calculate: data-ink / total ink per chart
- [ ] Score > 0.8 = PASS, 0.5-0.8 = MEDIUM, < 0.5 = HIGH
- [ ] Identify specific non-data ink to remove

### Chartjunk Detection
- [ ] 3D effects present? → flag as HIGH
- [ ] Unnecessary gridlines? → flag as MEDIUM
- [ ] Decorative backgrounds on charts? → flag as HIGH
- [ ] Moiré patterns or excessive hatching? → flag as MEDIUM
- [ ] Redundant legends? (label data directly instead) → flag as LOW

### Graphical Integrity
- [ ] Lie Factor calculated: (visual effect size / data effect size)
- [ ] Lie Factor > 1.05 = CRITICAL (visual exaggeration)
- [ ] Lie Factor < 0.95 = HIGH (visual minimization)
- [ ] Truncated axes detected? → flag as HIGH
- [ ] Misleading scales? → flag as CRITICAL

### Chart Type Appropriateness
- [ ] Pie chart used? → recommend horizontal bar (always)
- [ ] Dual-axis chart? → recommend splitting into two charts
- [ ] Chart type matches data relationship? (comparison/time/composition/distribution)

---

## 2. Cognitive Load Diagnosis (Richard Mayer)

### Extraneous Load
- [ ] Count elements per slide that don't convey the key message
- [ ] > 3 extraneous elements = HIGH
- [ ] Decorative images with no informational value? → flag as MEDIUM

### Coherence Principle
- [ ] Extraneous material present on slides? → flag as HIGH
- [ ] Background music/sounds that don't support learning? → flag as MEDIUM

### Redundancy Principle
- [ ] Same information presented as both text AND narration? → flag as HIGH
- [ ] Slide text duplicates what speaker will say? → flag as HIGH

### Spatial Contiguity
- [ ] Labels far from their visual elements? → flag as MEDIUM
- [ ] Legends requiring eye movement to decode? → flag as MEDIUM

### Signaling Principle
- [ ] Key information highlighted or emphasized? → if not, flag as MEDIUM
- [ ] Visual hierarchy guides attention? → if not, flag as HIGH

### Segmenting Principle
- [ ] Complex information broken into manageable chunks? → if not, flag as HIGH
- [ ] Progressive disclosure used where appropriate? → if not, flag as MEDIUM

---

## 3. Style DNA Compliance

- [ ] Dark mode / high contrast applied?
- [ ] One idea per slide?
- [ ] No bullet point lists?
- [ ] Bold, modern sans-serif typography?
- [ ] No clip art or generic stock photos?
- [ ] No corporate template aesthetic?
- [ ] Images are high-resolution and purposeful?
- [ ] Animations guide attention (not distract)?

---

## Scoring

| Dimension | Weight | Score (0-10) |
|-----------|--------|:------------:|
| Data-Ink Ratio | 20% | __ |
| Chartjunk | 15% | __ |
| Graphical Integrity | 15% | __ |
| Cognitive Load | 25% | __ |
| Style DNA Compliance | 25% | __ |
| **TOTAL** | 100% | **__/10** |

## Severity Guide

| Severity | Definition | Action |
|----------|------------|--------|
| CRITICAL | Data misrepresentation or severe integrity issue | Must fix before proceeding |
| HIGH | Significant impact on comprehension or aesthetics | Fix in current iteration |
| MEDIUM | Noticeable issue, moderate impact | Fix recommended |
| LOW | Minor improvement opportunity | Log for refinement |

---

_Checklist Version: 1.0.0_
_Squad: slide-master_
_Used by: *diagnose command, wf-create-presentation PHASE-1_
