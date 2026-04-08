# Task: Design Data Slide

**Task ID:** design-data-slide
**Version:** 1.0.0
**Status:** Active
**Responsible Executor:** @slide-master:cole-nussbaumer-knaflic
**Execution Type:** Agent
**Squad:** slide-master

---

## Purpose

Transform data-heavy slides into story-driven visualizations using Cole Nussbaumer Knaflic's Storytelling with Data (SWD) 6-Step Framework. Every data slide should communicate ONE insight with maximum clarity on a Style DNA-compliant dark background.

---

## Input

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| data | text/table | Yes | The data to visualize (numbers, table, existing chart) |
| key_message | string | Yes | The ONE insight this data should communicate |
| audience | string | No | Data literacy level of the audience |
| context | string | No | Where this slide sits in the narrative arc |

---

## Output

A **Data Slide Design** with:
- Chart type recommendation with rationale
- Decluttered visualization specification
- Preattentive attributes applied (color, size, position)
- Action title (tells the insight, not the topic)
- Style DNA-compliant color and layout

---

## Action Items

### Step 1: Understand the Context (SWD Step 1)
- What is the key message this data supports?
- Who is the audience and what is their data literacy?
- What action should the audience take after seeing this data?
- What is the emotional tone? (alarming, encouraging, neutral)

### Step 2: Choose Appropriate Visual (SWD Step 2)

| Data Relationship | Recommended Chart |
|-------------------|-------------------|
| Comparison (categories) | Horizontal bar chart |
| Comparison (time) | Line chart |
| Composition (parts of whole) | Stacked bar or waterfall |
| Distribution | Histogram or box plot |
| Single important number | Hero number (large typography) |
| Before/After | Side-by-side with accent color shift |

**Anti-patterns:**
- NEVER use pie charts (use horizontal bars instead)
- NEVER use 3D charts
- NEVER use dual-axis charts (split into two charts)

### Step 3: Eliminate Clutter (SWD Step 3)
Remove:
- Gridlines (or reduce to very faint if essential)
- Unnecessary axis labels
- Chart borders and boxes
- Legends (label directly on the data)
- Background colors (dark background IS the background)
- Decorative elements

### Step 4: Focus Attention (SWD Step 4)
Apply preattentive attributes:
- **Color:** Bold accent on the key data point, grey (#666) for supporting data
- **Size:** Make the key number/bar visually dominant
- **Position:** Key insight at eye-level (upper-left quadrant for text, center for charts)
- **Enclosure:** Use subtle highlight box only if needed

### Step 5: Think Like a Designer (SWD Step 5)
Apply Style DNA:
- Dark background (#0D0D0D or #1A1A1A)
- Chart elements in white or light grey
- ONE accent color for the key data point
- Clean sans-serif labels
- Generous whitespace around the chart
- Hero number treatment for the most important stat

### Step 6: Tell a Story (SWD Step 6)
- **Action title:** "Revenue grew 40% in Q3" NOT "Q3 Revenue"
- **Annotation:** Call out the key data point with a brief note
- **Context:** Include comparison baseline when relevant
- **Sequence:** If multiple data slides, build the story progressively

---

## Acceptance Criteria

- [ ] Chart type matches the data relationship
- [ ] Clutter eliminated (no chartjunk)
- [ ] Preattentive attributes direct attention to key insight
- [ ] Action title tells the insight (not the topic)
- [ ] Style DNA compliant (dark background, bold accent, one idea)
- [ ] Audience can understand the slide in < 5 seconds
- [ ] No pie charts, 3D charts, or dual-axis charts

---

## Veto Conditions

- DO NOT use pie charts — use horizontal bar charts instead
- DO NOT use 3D effects on any chart
- DO NOT put multiple charts on one slide
- DO NOT use light backgrounds for data slides
- DO NOT write topic titles ("Revenue") — write action titles ("Revenue grew 40%")

---

## Output Example

```
## DATA SLIDE DESIGN: Customer Growth

### Context
- Key message: "We grew from 100 to 10,000 users in 18 months"
- Audience: Investors (high data literacy)
- Emotional tone: Impressive, confident

### Chart Type: Line Chart
- Rationale: Time-series data showing growth trajectory

### Specification
- Background: #0D0D0D (near-black)
- Line color: #00D4FF (electric blue) — 3px weight
- Supporting gridlines: REMOVED
- X-axis: Months (every 3rd labeled), #999999
- Y-axis: REMOVED (numbers labeled directly on line at start and end)
- Hero number: "100x" in Inter Black, 96pt, electric blue, top-right

### Action Title
"From 100 to 10,000 Users in 18 Months"
- Font: Inter Bold, 28pt, white
- Position: Top-left

### Annotations
- Start point: "100 users" label, small, grey
- End point: "10,000 users" label, bold, electric blue
- Inflection point: "Product-market fit" callout at month 6

### Removed (decluttered)
- Y-axis labels (redundant with direct labels)
- Gridlines (add cognitive noise)
- Legend (only one data series)
- Chart border (unnecessary container)
```

---

## Handoff

| Condition | Route To |
|-----------|----------|
| Data integrity questionable | @edward-tufte (Lie Factor check) |
| Chart needs to fit visual design system | @garr-reynolds |
| Data tells a broader story | @nancy-duarte (integrate into narrative arc) |
| Ready for quality review | @slide-master-chief (*review) |

---

_Task Version: 1.0.0_
_Squad: slide-master_
