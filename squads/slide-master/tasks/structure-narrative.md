# Task: Structure Narrative

**Task ID:** structure-narrative
**Version:** 1.0.0
**Status:** Active
**Responsible Executor:** @slide-master:nancy-duarte
**Execution Type:** Agent
**Squad:** slide-master

---

## Purpose

Build the narrative architecture for a presentation using Nancy Duarte's Sparkline methodology combined with the Conquer 4 Story Moments framework. Produces a complete story arc that drives the entire presentation before any visual design begins.

---

## Input

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| topic | string | Yes | Presentation topic or subject |
| audience | string | Yes | Who will watch this presentation |
| duration | string | Yes | Available presentation time |
| key_message | string | Yes | The ONE thing the audience should remember |
| context | string | No | Additional constraints or requirements |
| diagnostic_report | file | No | Output from *diagnose task (if existing deck) |

---

## Output

A **Narrative Architecture Document** with:
- Big Idea statement
- Sparkline arc (What Is / What Could Be alternations)
- 4 Story Moments mapping (Conexao → Vilao → Solucao Matadora → Moral)
- S.T.A.R. Moment identification
- Slide-by-slide story beats
- Emotional journey map

---

## Action Items

### Step 1: Extract the Big Idea
Elicit from user:
- "What is the ONE thing the audience should take away?"
- "What is the audience's current state vs desired state?"
- "What is at stake if the audience does NOT act?"

Format: **[Audience's desired outcome] by [your unique approach]**

### Step 2: Map the Sparkline
Build alternating tension between:
- **What Is** — the current reality (problems, limitations, status quo)
- **What Could Be** — the transformed future (possibilities, solutions, vision)

Structure:
```
What Is → What Could Be → What Is → What Could Be → ... → New Bliss
```

Each oscillation increases emotional intensity toward the climax.

### Step 3: Apply Conquer 4 Story Moments

| Moment | Timing | Purpose | Technique |
|--------|--------|---------|-----------|
| **Conexao** | First 90 seconds | Bond with audience | Hook: surprising stat, provocative question, short story, bold image |
| **Vilao** | After connection | Introduce the antagonist/problem | Make the audience FEEL the pain before offering any solution |
| **Solucao Matadora** | Middle-to-late | Present transformative answer | Show the contrast: Villain world vs Solution world |
| **Moral da Historia** | Final slides | Clear takeaway + CTA | One sentence the audience can repeat to others |

### Step 4: Identify the S.T.A.R. Moment
The **Something They'll Always Remember** moment:
- A dramatic visual, story, or demonstration
- Placed at the peak of the Sparkline
- The moment that defines whether the audience remembers this presentation

### Step 5: Create Slide-by-Slide Story Beats
For each slide, define:
- **Scene number** and title
- **Story function** (setup, tension, revelation, resolution)
- **Emotional state** the audience should feel
- **Key message** for this scene
- **Visual direction** (brief — detailed design comes from @garr-reynolds)

### Step 6: Validate Against Style DNA Narrative Defaults
- [ ] Hook in first 90 seconds (Conexao)
- [ ] Villain opens before solution
- [ ] 70% story / 30% data ratio
- [ ] Story was scripted BEFORE slides
- [ ] 60% planning / 40% executing
- [ ] Clear call to action at the end

---

## Acceptance Criteria

- [ ] Big Idea is a single clear statement
- [ ] Sparkline arc has minimum 4 oscillations
- [ ] All 4 Story Moments are mapped with timing
- [ ] S.T.A.R. Moment identified and placed in arc
- [ ] Slide-by-slide story beats complete
- [ ] Emotional journey flows logically
- [ ] Style DNA narrative defaults enforced

---

## Veto Conditions

- DO NOT start visual design — narrative comes first, always
- DO NOT skip the Villain — no solution without establishing the problem
- DO NOT accept "we don't have a story" — every presentation has one
- DO NOT produce more than 30% data slides — story ratio must hold

---

## Output Example

```
## NARRATIVE ARCHITECTURE: FoodTech Investor Pitch

### Big Idea
"We can cut food waste by 40% using AI-powered supply chain optimization
— and your investment makes it happen at scale."

### Sparkline Arc
1. WHAT IS: 1.3 billion tons of food wasted annually (shocking stat)
2. WHAT COULD BE: Imagine if we could predict demand and eliminate waste
3. WHAT IS: Current supply chains are blind — no real-time visibility
4. WHAT COULD BE: Our AI sees patterns humans can't — 40% reduction proven
5. WHAT IS: But we can only reach 200 suppliers alone
6. WHAT COULD BE: With your investment, we reach 10,000 by 2027
7. NEW BLISS: A world where food reaches people, not landfills

### 4 Story Moments
- CONEXAO (Slide 1-2): "Every second, 23 tons of food is thrown away.
  That's enough to fill a swimming pool. Every. Second." [full-bleed image of waste]
- VILAO (Slide 3-5): The broken supply chain — why existing solutions fail
- SOLUCAO MATADORA (Slide 6-12): The AI platform + 40% proof point
- MORAL (Slide 13-15): "Invest in the future of food. The swimming pool
  can be empty."

### S.T.A.R. Moment (Slide 9)
Live demo: show the dashboard predicting tomorrow's demand for a real supplier.
The audience sees the future in real-time.
```

---

## Handoff

| Condition | Route To |
|-----------|----------|
| Narrative complete, ready for visual design | @garr-reynolds |
| Data-heavy slides identified in narrative | @cole-nussbaumer-knaflic |
| Abstract concepts need visualization | @dan-roam |
| Full production pipeline | @slide-master-chief |

---

_Task Version: 1.0.0_
_Squad: slide-master_
